# Custom CMS & Dynamic Portfolio Architecture Documentation

This document explains how your portfolio website now works dynamically using your custom Admin CMS panel, the GitHub API, and your Cloudflare Worker proxy.

---

## 1. High-Level Architecture Overview

Your portfolio is a **fully static website** hosted on GitHub Pages (which does not have a database or a backend server). To make it dynamic without hosting costs, we use **GitHub itself as the database and backend**:

```
[ Public Portfolio Site ] <───(Fetch static JSON/MD)───┐
                                                       │
                                            [ GitHub Repository ]
                                                       ▲
[ Admin CMS Dashboard ] ───(OAuth Token)───> [ GitHub API ]
       │                                               ▲
 (Login Code)                                    (Commit changes)
       ▼                                               │
[ Cloudflare Worker Proxy ] ───(Exchange Secret)───────┘
```

1. **The CMS Panel (`/admin`)** authenticates you and communicates directly with the **GitHub Contents API**.
2. When you make edits in the CMS, the changes are committed directly into your repository as JSON or Markdown files.
3. Once committed, **GitHub Pages automatically redeploys** your site with the updated files.
4. **The Public Portfolio** fetches these JSON and Markdown files dynamically at runtime using Javascript, compiles them, and renders them to the screen.

---

## 2. Authentication Flow ("Login with GitHub")

Because your website is static and visible to everyone, we cannot hardcode your GitHub credentials. We use GitHub OAuth:

```
1. Admin clicks "Login with GitHub"
   ➔ Browser redirects to GitHub: 
     https://github.com/login/oauth/authorize?client_id=Ov23liCfEc85oTqWAOtb

2. Admin authorizes the application
   ➔ GitHub redirects back to: http://127.0.0.1:5500/admin/?code=AUTH_CODE

3. Exchange Authorization Code
   ➔ JS extracts 'AUTH_CODE' and immediately wipes it from the URL bar (security).
   ➔ JS sends a POST request to your Cloudflare Worker: 
     https://portfolio-auth.majdalmotaem1998.workers.dev/
   ➔ Cloudflare Worker forwards the code along with GITHUB_CLIENT_SECRET (hidden from public) to GitHub.
   ➔ GitHub returns an 'access_token' to the Worker, which forwards it to the browser.

4. Identity & Permissions Verification
   ➔ JS stores the token in 'sessionStorage' (wiped on tab close).
   ➔ JS fetches your profile details: GET https://api.github.com/user
   ➔ Assert username: Enforces that the user is 'majdAlmotaem' (Access Denied for others).
   ➔ Assert write permission: Confirms token has write permissions to the repository.
   ➔ Boot Dashboard: CMS is unlocked.
```

---

## 3. How the Public Portfolio Site Loads Data

When a user visits your homepage, [js/cms-loader.js](file:///c:/Users/PCUser/Documents/GitHub/portfolio/js/cms-loader.js) is executed. It handles the dynamic loading:

1. **Configuration Resolution**:
   Loads `/admin/config.json` relative to the domain to fetch the active branch (`dynamic` or `main`), owner, and repository name.
2. **Fetch Structured Data JSONs**:
   Fetches the JSON files directly using relative HTTP requests (very fast):
   * `/data/profile.json` (Titles, Mottos, Social Links, Resume Paths)
   * `/data/skills.json` (Tech Stack Categories)
   * `/data/certificates.json` (Achievements Grid)
3. **Fetch Markdown Collections (Projects & Blogs)**:
   * Queries the GitHub API directory contents list (e.g. `GET https://api.github.com/repos/majdAlmotaem/portfolio/contents/content/projects?ref=main`).
   * *Fallback*: If offline or GitHub API is rate-limited, it falls back to a preset list of filenames.
   * Loops through the file list and performs a relative fetch for each file (e.g. `/content/projects/clickshare.md`).
4. **Parse and Compile Content**:
   * Uses **`js-yaml`** (via CDN) to separate the YAML metadata (ID, date, image path) from the text body.
   * Uses **`marked`** (via CDN) to compile Markdown text bodies into raw HTML strings.
5. **DOM Injection**:
   Returns the compiled data to [js/main.js](file:///c:/Users/PCUser/Documents/GitHub/portfolio/js/main.js), which dynamically overrides job titles, CV download buttons, avatar images, projects cards, and blog grids before the user sees the page.

---

## 4. How the CMS Dashboard Saves Data

When you edit profile, skills, certificates, projects, or blogs in `/admin`, the modules communicate using `/admin/js/github-api.js`:

1. **UTF-8 Safe Serialization**:
   JavaScript's standard `btoa` and `atob` fail on special German characters (ä, ö, ü, ß). We use `TextEncoder` and byte arrays to safely serialize text into base64.
2. **Fetch Existing SHA**:
   Every file update on GitHub requires sending the current file's Git hash (`sha`). The API wrapper first fetches the file details to retrieve the `sha`.
3. **Commit to GitHub**:
   Sends a `PUT` request containing the commit message, base64 payload, and target branch:
   `PUT https://api.github.com/repos/majdAlmotaem/portfolio/contents/{path}`
   * Headers: `Authorization: token YOUR_ACCESS_TOKEN`

---

## 5. Summary of Libraries Used

Both the admin panel and public loaders import the following lightweight libraries via CDN:

| Library | Version | CDN Link | Purpose |
| :--- | :--- | :--- | :--- |
| **js-yaml** | 4.1.0 | `https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js` | Parses frontmatter meta blocks from Markdown files and dumps updated metadata back to YAML on save. |
| **marked** | 4.x | `https://cdn.jsdelivr.net/npm/marked/marked.min.js` | Parses Markdown text into HTML strings for the dynamic blogs and projects details pages. |
