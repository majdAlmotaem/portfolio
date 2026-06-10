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
    // 1. Load dependencies from CDN
    let jsyaml, marked;
    try {
        jsyaml = await loadScript('https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js', 'jsyaml');
        marked = await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', 'marked');
    } catch (err) {
        console.error("Failed to load parsing libraries from CDN. Falling back to text rendering.", err);
    }

    const base = getBaseUrl();

    // Fetch config.json to detect branch, owner, and repo dynamically
    let branch = 'main';
    let configOwner = 'majdAlmotaem';
    let configRepo = 'portfolio';
    try {
        const configRes = await fetch(`${base}admin/config.json`);
        if (configRes.ok) {
            const configData = await configRes.json();
            if (configData) {
                if (configData.branch) branch = configData.branch;
                if (configData.owner) configOwner = configData.owner;
                if (configData.repo) configRepo = configData.repo;
            }
        }
    } catch (e) {
        console.warn("Could not retrieve config from config.json, defaulting branch to 'main'.", e);
    }

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

    // 2. Fetch profile, skills, and certificates JSON data
    let profileData = {};
    let skillsData = { en: [], de: [] };
    let certificatesData = { certificates: [] };

    // Profile
    if (isPreview && changes['data/profile.json'] && !changes['data/profile.json'].deleted) {
        try {
            profileData = JSON.parse(changes['data/profile.json'].content);
        } catch (err) {
            console.error("Error parsing profile draft: ", err);
        }
    } else {
        try {
            const profileRes = await fetch(`${base}data/profile.json`);
            profileData = await profileRes.json();
        } catch (err) {
            console.error("Error loading profile.json: ", err);
        }
    }

    // Skills
    if (isPreview && changes['data/skills.json'] && !changes['data/skills.json'].deleted) {
        try {
            skillsData = JSON.parse(changes['data/skills.json'].content);
        } catch (err) {
            console.error("Error parsing skills draft: ", err);
        }
    } else {
        try {
            const skillsRes = await fetch(`${base}data/skills.json`);
            skillsData = await skillsRes.json();
        } catch (err) {
            console.error("Error loading skills.json: ", err);
        }
    }

    // Certificates
    if (isPreview && changes['data/certificates.json'] && !changes['data/certificates.json'].deleted) {
        try {
            certificatesData = JSON.parse(changes['data/certificates.json'].content);
        } catch (err) {
            console.error("Error parsing certificates draft: ", err);
        }
    } else {
        try {
            const certsRes = await fetch(`${base}data/certificates.json`);
            certificatesData = await certsRes.json();
        } catch (err) {
            console.error("Error loading certificates.json: ", err);
        }
    }

    // 3. Load Project Files
    let { owner, repo } = getGitHubRepoDetails();
    if (!window.location.hostname.endsWith('.github.io')) {
        owner = configOwner;
        repo = configRepo;
    }
    let projectFiles = FALLBACK_PROJECT_FILES;
    
    try {
        // Attempt to fetch file list dynamically from GitHub API (using correct branch ref)
        const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/content/projects?ref=${branch}`);
        if (apiRes.ok) {
            const apiData = await apiRes.json();
            projectFiles = apiData.filter(f => f.name.endsWith('.md')).map(f => f.name);
        } else {
            console.warn(`GitHub API project list responded with ${apiRes.status}. Using fallback project list.`);
        }
    } catch (err) {
        console.warn("Could not retrieve project list dynamically via GitHub API. Using fallback project list.", err);
    }

    if (isPreview) {
        // Remove staged deletions from the file list
        projectFiles = projectFiles.filter(filename => {
            const path = `content/projects/${filename}`;
            return !(changes[path] && changes[path].deleted);
        });

        // Add staged new project files that are not already in projectFiles list
        Object.keys(changes).forEach(path => {
            if (path.startsWith('content/projects/') && path.endsWith('.md')) {
                const filename = path.substring('content/projects/'.length);
                if (!changes[path].deleted && !projectFiles.includes(filename)) {
                    projectFiles.push(filename);
                }
            }
        });
    }

    const rawProjects = [];
    for (const filename of projectFiles) {
        try {
            const path = `content/projects/${filename}`;
            let text = null;

            if (isPreview && changes[path]) {
                if (!changes[path].deleted) {
                    text = changes[path].content;
                } else {
                    continue; // Skip if deleted
                }
            }

            if (text === null) {
                const res = await fetch(`${base}content/projects/${filename}`);
                if (res.ok) {
                    text = await res.text();
                }
            }

            if (text !== null) {
                const parsed = parseFrontMatterAndMarkdown(text, jsyaml, marked);
                if (parsed.data && parsed.data.id) {
                    rawProjects.push(parsed.data);
                }
            }
        } catch (err) {
            console.error(`Error loading project file ${filename}: `, err);
        }
    }

    // Sort projects to match original layout or place new ones at top
    const projectOrder = [7, 1, 2, 3];
    rawProjects.sort((a, b) => {
        const idxA = projectOrder.indexOf(a.id);
        const idxB = projectOrder.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return b.id - a.id;
    });

    // 4. Load Blog Files
    let blogFiles = FALLBACK_BLOG_FILES;
    try {
        // Attempt to fetch file list dynamically from GitHub API (using correct branch ref)
        const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/content/blogs?ref=${branch}`);
        if (apiRes.ok) {
            const apiData = await apiRes.json();
            blogFiles = apiData.filter(f => f.name.endsWith('.md')).map(f => f.name);
        } else {
            console.warn(`GitHub API blog list responded with ${apiRes.status}. Using fallback blog list.`);
        }
    } catch (err) {
        console.warn("Could not retrieve blog list dynamically via GitHub API. Using fallback blog list.", err);
    }

    if (isPreview) {
        // Remove staged deletions from the file list
        blogFiles = blogFiles.filter(filename => {
            const path = `content/blogs/${filename}`;
            return !(changes[path] && changes[path].deleted);
        });

        // Add staged new blog files that are not already in blogFiles list
        Object.keys(changes).forEach(path => {
            if (path.startsWith('content/blogs/') && path.endsWith('.md')) {
                const filename = path.substring('content/blogs/'.length);
                if (!changes[path].deleted && !blogFiles.includes(filename)) {
                    blogFiles.push(filename);
                }
            }
        });
    }

    const rawBlogs = [];
    for (const filename of blogFiles) {
        try {
            const path = `content/blogs/${filename}`;
            let text = null;

            if (isPreview && changes[path]) {
                if (!changes[path].deleted) {
                    text = changes[path].content;
                } else {
                    continue; // Skip if deleted
                }
            }

            if (text === null) {
                const res = await fetch(`${base}content/blogs/${filename}`);
                if (res.ok) {
                    text = await res.text();
                }
            }

            if (text !== null) {
                const parsed = parseFrontMatterAndMarkdown(text, jsyaml, marked);
                if (parsed.data && parsed.data.id) {
                    // Pre-parse Markdown contents for translation fields if any
                    if (marked && marked.parse) {
                        if (parsed.data.content_en) {
                            parsed.data.content_en = marked.parse(parsed.data.content_en);
                        }
                        if (parsed.data.content_de) {
                            parsed.data.content_de = marked.parse(parsed.data.content_de);
                        }
                    }
                    rawBlogs.push(parsed.data);
                }
            }
        } catch (err) {
            console.error(`Error loading blog file ${filename}: `, err);
        }
    }

    // Sort blogs by ID ascending (matching the original chronological order)
    rawBlogs.sort((a, b) => a.id - b.id);

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
            image: resolvePreviewImage(profileData.image || "")
        },
        en: {
            projects: rawProjects.map(proj => ({
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
            blogs: rawBlogs.map(blog => ({
                id: blog.id,
                title: blog.title_en || blog.title || "",
                date: blog.date || "",
                excerpt: blog.excerpt_en || "",
                content: blog.content_en || blog.content || "",
                image: resolvePreviewImage(blog.image || ""),
                tags: blog.tags_en || blog.tags || []
            }))
        },
        de: {
            projects: rawProjects.map(proj => ({
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
            blogs: rawBlogs.map(blog => ({
                id: blog.id,
                title: blog.title_de || blog.title || "",
                date: blog.date || "",
                excerpt: blog.excerpt_de || "",
                content: blog.content_de || blog.content || "",
                image: resolvePreviewImage(blog.image || ""),
                tags: blog.tags_de || blog.tags || []
            }))
        }
    };

    return portfolioData;
}
