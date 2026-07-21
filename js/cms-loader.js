// Dynamic Script Loader Utility
async function loadScript(url, globalName) {
    if (window[globalName]) return window[globalName];
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve(window[globalName]);
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}

// Fallback lists in case GitHub API rate limit is reached or offline
const FALLBACK_PROJECT_FILES = [
    'clickshare.md',
    'password-manager.md',
    'lazy-controller.md',
    'ai-news-digest.md'
];

const FALLBACK_BLOG_FILES = [
    'it-tutoring-job-search.md',
    'graduation-milestone.md',
    '2025-year-in-review.md',
    'itcs-cologne-networking.md',
    'n8n-ai-workshop.md',
    'mindset-on-ai.md',
    'digital-wellness-short-form.md',
    'avoiding-fomo-trends.md',
    'digital-balance-mental-health.md'
];

// Determine the base path for relative URLs depending on repo location
function getBaseUrl() {
    return window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
}

// Extract Owner and Repo from current URL if on github.io, otherwise use defaults
function getGitHubRepoDetails() {
    let owner = 'majdAlmotaem';
    let repo = 'portfolio';
    
    if (window.location.hostname.endsWith('.github.io')) {
        owner = window.location.hostname.split('.')[0];
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0 && pathParts[0] !== 'index.html') {
            repo = pathParts[0];
        }
    }
    return { owner, repo };
}

// Parse YAML frontmatter and content from markdown text
function parseFrontMatterAndMarkdown(text, jsyaml, marked) {
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = text.match(regex);
    if (!match) {
        return { data: {}, content: text };
    }
    const yamlPart = match[1];
    const markdownPart = match[2];
    
    let data = {};
    try {
        data = jsyaml.load(yamlPart);
    } catch (e) {
        console.error("Error parsing YAML frontmatter: ", e);
    }
    
    let htmlContent = markdownPart;
    if (marked && marked.parse) {
        try {
            htmlContent = marked.parse(markdownPart);
        } catch (e) {
            console.error("Error parsing Markdown content: ", e);
        }
    }
    
    return { data, content: htmlContent };
}

// Main loader function
export async function loadPortfolioData() {
    const base = getBaseUrl();

    // 1. Kick off CDN loading for marked in parallel (js-yaml is not needed on frontend!)
    const markedPromise = loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', 'marked')
        .catch(err => { console.warn("Failed to load marked from CDN:", err); return null; });

    // Fetch config.json to detect branch, owner, and repo dynamically
    const configPromise = fetch(`${base}admin/config.json?t=${Date.now()}`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null);

    // Detect preview mode
    const isPreview = window.location.search.includes('preview=true') || localStorage.getItem('cms_preview_mode') === 'true';
    let changes = {};
    if (isPreview) {
        try {
            changes = JSON.parse(localStorage.getItem('cms_pending_changes')) || {};
            console.log("CMS Preview Mode Active. Staged changes:", changes);
        } catch (e) {
            console.warn("Could not load pending CMS changes from localStorage:", e);
        }
    }

    // 2. Fetch profile, skills, certificates, projects, and blogs concurrently
    const profilePromise = (isPreview && changes['data/profile.json'] && !changes['data/profile.json'].deleted)
        ? Promise.resolve(JSON.parse(changes['data/profile.json'].content))
        : fetch(`${base}data/profile.json?t=${Date.now()}`).then(r => r.json()).catch(err => { console.error("Error loading profile.json: ", err); return {}; });

    const skillsPromise = (isPreview && changes['data/skills.json'] && !changes['data/skills.json'].deleted)
        ? Promise.resolve(JSON.parse(changes['data/skills.json'].content))
        : fetch(`${base}data/skills.json?t=${Date.now()}`).then(r => r.json()).catch(err => { console.error("Error loading skills.json: ", err); return { en: [], de: [] }; });

    const certsPromise = (isPreview && changes['data/certificates.json'] && !changes['data/certificates.json'].deleted)
        ? Promise.resolve(JSON.parse(changes['data/certificates.json'].content))
        : fetch(`${base}data/certificates.json?t=${Date.now()}`).then(r => r.json()).catch(err => { console.error("Error loading certificates.json: ", err); return { certificates: [] }; });

    const projectsPromise = (isPreview && changes['data/projects.json'] && !changes['data/projects.json'].deleted)
        ? Promise.resolve(JSON.parse(changes['data/projects.json'].content))
        : fetch(`${base}data/projects.json?t=${Date.now()}`).then(r => r.json()).catch(err => { console.error("Error loading projects.json: ", err); return []; });

    const blogsPromise = (isPreview && changes['data/blogs.json'] && !changes['data/blogs.json'].deleted)
        ? Promise.resolve(JSON.parse(changes['data/blogs.json'].content))
        : fetch(`${base}data/blogs.json?t=${Date.now()}`).then(r => r.json()).catch(err => { console.error("Error loading blogs.json: ", err); return []; });

    // Wait for all CDN loading and static file fetches to resolve concurrently
    const [marked, configData, profileData, skillsData, certificatesData, projectsData, blogsData] = await Promise.all([
        markedPromise,
        configPromise,
        profilePromise,
        skillsPromise,
        certsPromise,
        projectsPromise,
        blogsPromise
    ]);

    // Ensure blogs are sorted descending by ID (newest first)
    blogsData.sort((a, b) => (b.id || 0) - (a.id || 0));

    // Helper to resolve images in preview mode
    function resolvePreviewImage(path) {
        if (!path) return "";
        const normalized = path.replace(/^\//, "");
        if (isPreview && changes[normalized] && changes[normalized].isMedia) {
            return changes[normalized].content;
        }
        return path;
    }

    // 5. Structure final portfolioData for the app
    const portfolioData = {
        profile: {
            ...profileData,
            image: resolvePreviewImage(profileData.image || ""),
            resume: profileData.resume ? {
                en: resolvePreviewImage(profileData.resume.en || ""),
                de: resolvePreviewImage(profileData.resume.de || "")
            } : undefined
        },
        en: {
            projects: projectsData.map(proj => ({
                id: proj.id,
                title: proj.title_en || proj.title || "",
                image: resolvePreviewImage(proj.image || ""),
                images: (proj.images && proj.images.length > 0 ? proj.images : [proj.image]).map(img => resolvePreviewImage(img || "")),
                description: proj.description_en || "",
                techStack: proj.techStack || [],
                status: proj.status || "",
                link: proj.link || "",
                githubLink: proj.githubLink || "",
                problem: proj.problem_en || "",
                solution: proj.solution_en || "",
                lessonsLearned: proj.lessonsLearned_en || "",
                newTechLearned: proj.newTechLearned_en || []
            })),
            skills: skillsData.en || [],
            certificates: (certificatesData.certificates || []).map(cert => ({
                title: cert.en?.title || cert.title || "",
                issuer: cert.en?.issuer || cert.issuer || "",
                iconClass: cert.iconClass || "",
                image: resolvePreviewImage(cert.image || "")
            })),
            blogs: blogsData.map(blog => {
                let contentEnHTML = blog.content_en || "";
                if (marked && marked.parse) {
                    try { contentEnHTML = marked.parse(contentEnHTML); } catch(e) {}
                }
                return {
                    id: blog.id,
                    title: blog.title_en || blog.title || "",
                    date: blog.date || "",
                    excerpt: blog.excerpt_en || "",
                    content: contentEnHTML,
                    image: resolvePreviewImage(blog.image || ""),
                    tags: blog.tags_en || blog.tags || []
                };
            })
        },
        de: {
            projects: projectsData.map(proj => ({
                id: proj.id,
                title: proj.title_de || proj.title || "",
                image: resolvePreviewImage(proj.image || ""),
                images: (proj.images && proj.images.length > 0 ? proj.images : [proj.image]).map(img => resolvePreviewImage(img || "")),
                description: proj.description_de || "",
                techStack: proj.techStack || [],
                status: proj.status || "",
                link: proj.link || "",
                githubLink: proj.githubLink || "",
                problem: proj.problem_de || "",
                solution: proj.solution_de || "",
                lessonsLearned: proj.lessonsLearned_de || "",
                newTechLearned: proj.newTechLearned_de || []
            })),
            skills: skillsData.de || [],
            certificates: (certificatesData.certificates || []).map(cert => ({
                title: cert.de?.title || cert.title || "",
                issuer: cert.de?.issuer || cert.issuer || "",
                iconClass: cert.iconClass || "",
                image: resolvePreviewImage(cert.image || "")
            })),
            blogs: blogsData.map(blog => {
                let contentDeHTML = blog.content_de || "";
                if (marked && marked.parse) {
                    try { contentDeHTML = marked.parse(contentDeHTML); } catch(e) {}
                }
                return {
                    id: blog.id,
                    title: blog.title_de || blog.title || "",
                    date: blog.date || "",
                    excerpt: blog.excerpt_de || "",
                    content: contentDeHTML,
                    image: resolvePreviewImage(blog.image || ""),
                    tags: blog.tags_de || blog.tags || []
                };
            })
        }
    };

    return portfolioData;
}
