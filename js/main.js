import { loadPortfolioData } from './cms-loader.js';
import { initNeuralBg } from './neural-bg.js';

const getHue = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
};

function injectPreviewBanner() {
    if (document.getElementById('cms-preview-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cms-preview-banner';
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(90deg, #0f0f15, #1d1d28);
        border-bottom: 2px solid #e5a93b;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        z-index: 100000;
        font-family: 'Outfit', 'Inter', sans-serif;
        color: #ffffff;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;

    const leftSide = document.createElement('div');
    leftSide.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: 0.5px;
    `;

    const pulseDot = document.createElement('span');
    pulseDot.style.cssText = `
        width: 10px;
        height: 10px;
        background-color: #e5a93b;
        border-radius: 50%;
        display: inline-block;
        box-shadow: 0 0 8px #e5a93b;
        animation: preview-pulse 1.5s infinite alternate;
    `;

    // Inject keyframes style
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes preview-pulse {
            from { transform: scale(0.9); opacity: 0.6; box-shadow: 0 0 4px #e5a93b; }
            to { transform: scale(1.25); opacity: 1; box-shadow: 0 0 12px #e5a93b; }
        }
        .cms-preview-btn {
            padding: 0.45rem 1.1rem;
            font-size: 0.85rem;
            font-weight: 600;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: inherit;
        }
        .cms-preview-btn-primary {
            background: #e5a93b;
            color: #050505;
            border: 1px solid #e5a93b;
        }
        .cms-preview-btn-primary:hover {
            background: #f0bd5a;
            box-shadow: 0 0 12px rgba(229, 169, 59, 0.4);
            transform: translateY(-1px);
        }
        .cms-preview-btn-secondary {
            background: transparent;
            color: #cccccc;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .cms-preview-btn-secondary:hover {
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-1px);
        }
        .cms-preview-btn-secondary:hover .fa-rotate {
            transform: rotate(180deg);
        }
        .fa-rotate {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    leftSide.appendChild(pulseDot);
    const textSpan = document.createElement('span');
    textSpan.innerHTML = `⚡ <span style="color: #e5a93b;">PREVIEW MODE</span> ACTIVE &nbsp;<span style="color: #888888; font-weight: normal; font-size: 0.85rem;">(Showing local staged changes)</span>`;
    leftSide.appendChild(textSpan);

    const rightSide = document.createElement('div');
    rightSide.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;

    const btnAdmin = document.createElement('a');
    btnAdmin.href = 'admin/index.html';
    btnAdmin.className = 'cms-preview-btn cms-preview-btn-primary';
    btnAdmin.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Return to CMS`;

    const btnRefresh = document.createElement('button');
    btnRefresh.className = 'cms-preview-btn cms-preview-btn-secondary';
    btnRefresh.innerHTML = `<i class="fa-solid fa-rotate"></i> Refresh`;
    btnRefresh.addEventListener('click', () => {
        window.location.reload();
    });

    const btnExit = document.createElement('button');
    btnExit.className = 'cms-preview-btn cms-preview-btn-secondary';
    btnExit.innerHTML = `<i class="fa-solid fa-xmark"></i> Exit Preview`;
    btnExit.addEventListener('click', () => {
        localStorage.removeItem('cms_preview_mode');
        const url = new URL(window.location.href);
        url.searchParams.delete('preview');
        window.location.href = url.pathname + url.search;
    });

    rightSide.appendChild(btnAdmin);
    rightSide.appendChild(btnRefresh);
    rightSide.appendChild(btnExit);

    banner.appendChild(leftSide);
    banner.appendChild(rightSide);

    document.body.appendChild(banner);
    document.body.style.paddingTop = '50px';

    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.top = '50px';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Check if preview mode is active
    const isPreview = window.location.search.includes('preview=true') || localStorage.getItem('cms_preview_mode') === 'true';
    if (isPreview) {
        injectPreviewBanner();
    }

    // Neural Network Background
    initNeuralBg();

    // Load CMS & JSON content
    const portfolioData = await loadPortfolioData();

    // 1. Language Configuration & State Management
    let currentLang = localStorage.getItem('portfolio-lang') || 'en';

    const translations = {
        nav_home: { en: "Home", de: "Startseite" },
        nav_projects: { en: "Projects", de: "Projekte" },
        nav_skills: { en: "Skills", de: "Skills" },
        nav_certs: { en: "Certificates", de: "Zertifikate" },
        nav_blog: { en: "Blog", de: "Blog" },
        nav_contact: { en: "Contact", de: "Kontakt" },
        hero_greet: {
            en: 'Majd <span class="highlight">Almotaem</span>',
            de: 'Majd <span class="highlight">Almotaem</span>'
        },
        hero_title: { en: "Fullstack Developer", de: "Fullstack-Entwickler" },
        hero_motto: {
            en: "I build backend solutions and Python-based automations using SQL, JavaScript, cloud technologies and modern AI tools. I focus on clean code, structured problem-solving and continuous learning.",
            de: "Ich entwickle Backend-Lösungen und Python-basierte Automatisierungen mit SQL, JavaScript, Cloud-Technologien und modernen KI-Tools. Mein Fokus liegt auf sauberem Code, strukturiertem Problemlösen und kontinuierlicher Weiterentwicklung."
        },
        hero_btn_explore: { en: "Explore My Work", de: "Projekte ansehen" },
        hero_btn_resume: { en: "Download Resume", de: "Lebenslauf" },
        cv_modal_title: { en: "Select Resume Language", de: "Lebenslauf-Sprache wählen" },
        cv_modal_subtitle: { en: "Choose your preferred language version to download:", de: "Wähle deine bevorzugte Sprachversion zum Herunterladen:" },
        cv_btn_english: { en: "English (CV)", de: "Englisch (CV)" },
        cv_btn_german: { en: "German (Lebenslauf)", de: "Deutsch (Lebenslauf)" },
        stats_projects: { en: "Projects", de: "Projekte" },
        stats_visitors: { en: "Site Visitors", de: "Seitenbesucher" },
        projects_title: { en: "Projects", de: "Projekte" },
        projects_btn_more: { en: "Show More", de: "Mehr anzeigen" },
        projects_btn_less: { en: "Show Less", de: "Weniger anzeigen" },
        projects_coming_soon_title: { en: "More Coming Soon...", de: "Mehr in Kürze..." },
        projects_coming_soon_desc: {
            en: "Stay tuned for more exciting projects and experiments!",
            de: "Bleib gespannt auf weitere spannende Projekte und Experimente!"
        },
        skills_title: { en: "Tech Stack & Skills", de: "Tech Stack & Fähigkeiten" },
        skills_footer: {
            en: '<i class="fa-solid fa-infinity" style="color: var(--primary-color); margin-right: 0.5rem;"></i> I\'m always ready to learn more and more....',
            de: '<i class="fa-solid fa-infinity" style="color: var(--primary-color); margin-right: 0.5rem;"></i> Ich bin immer bereit, noch mehr zu lernen....'
        },
        certs_title: { en: "Certifications", de: "Zertifizierungen" },
        blog_title: { en: "Latest Insights", de: "Neueste Einblicke" },
        blog_btn_more: { en: "Show More", de: "Mehr anzeigen" },
        blog_btn_less: { en: "Show Less", de: "Weniger anzeigen" },
        contact_title: { en: "Get In Touch", de: "Kontakt aufnehmen" },
        contact_subtitle: { en: "Let's work together", de: "Lass uns zusammenarbeiten" },
        contact_text: {
            en: "I'm currently available for freelance work and full-time opportunities. If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch.",
            de: "Ich bin derzeit für freiberufliche Tätigkeiten und Vollzeitstellen verfügbar. Wenn du ein Projekt starten möchtest, Hilfe brauchst oder einfach nur Hallo sagen willst, melde dich gerne."
        },
        contact_placeholder_name: { en: "Your Name", de: "Dein Name" },
        contact_placeholder_email: { en: "Your Email", de: "Deine E-Mail" },
        contact_placeholder_msg: { en: "Your Message", de: "Deine Nachricht" },
        contact_btn_send: { en: "Send Message", de: "Nachricht senden" },
        footer_text: {
            en: "&copy; 2026 Majd Almotaem.",
            de: "&copy; 2026 Majd Almotaem."
        },
        details_problem: { en: "The Problem", de: "Das Problem" },
        details_solution: { en: "The Solution", de: "Die Lösung" },
        details_lessons: { en: "Lessons Learned", de: "Gelernte Lektionen" },
        details_new_tech: { en: "New Tech Learned:", de: "Neue Technologien:" },
        details_btn_repo: { en: "View Repo", de: "Repository ansehen" },
        details_btn_demo: { en: "Live Demo", de: "Live-Demo" },
        details_btn_back_projects: { en: "Back to Projects", de: "Zurück zu Projekten" },
        details_btn_back_blogs: { en: "Back to Blogs", de: "Zurück zum Blog" },
        details_topics: { en: "Topics:", de: "Themen:" },
        details_project_not_found: { en: "Project not found.", de: "Projekt nicht gefunden." },
        details_blog_not_found: { en: "Blog post not found.", de: "Blogbeitrag nicht gefunden." }
    };



    const getStatusTranslation = (status) => {
        const statusMap = {
            'completed': { en: 'Completed', de: 'Abgeschlossen' },
            'in-progress': { en: 'In Progress', de: 'In Bearbeitung' },
            'canceled': { en: 'Canceled', de: 'Abgebrochen' }
        };
        return (statusMap[status] && statusMap[status][currentLang]) || status.replace('-', ' ');
    };

    // 2. Static UI Translation Engine
    function translateStaticUI() {
        // Translate normal elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][currentLang]) {
                el.innerHTML = translations[key][currentLang];
            }
        });

        // Translate inputs and placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][currentLang]) {
                el.setAttribute('placeholder', translations[key][currentLang]);
            }
        });
    }

    // Sticky Navigation: Handles navbar visibility and scrolling effects
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Project Gallery: Renders projects with expand/collapse functionality
    const projectsContainer = document.getElementById('projects-container');
    const toggleProjectsBtn = document.getElementById('toggle-projects');
    let projectsExpanded = false;

    function renderProjects() {
        if (!projectsContainer) return;
        const limit = projectsExpanded ? portfolioData[currentLang].projects.length : 3;
        const projectsToRender = portfolioData[currentLang].projects.slice(0, limit);
        let projectsHTML = '';

        projectsToRender.forEach(project => {
            const statusClass = project.status === 'completed' ? 'status-completed' :
                project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';

            const techTags = project.techStack.map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech.name)};"><i class="${tech.iconClass}"></i> ${tech.name}</span>`).join('');

            const isVideo = project.image.toLowerCase().endsWith('.mp4') || project.image.toLowerCase().endsWith('.webm');
            const mediaHTML = isVideo
                ? `<video src="${project.image}" class="project-img" autoplay muted loop playsinline></video>`
                : `<img src="${project.image}" alt="${project.title}" class="project-img">`;

            projectsHTML += `
                <a href="project-details.html?id=${project.id}" class="glass-card project-card" style="text-decoration: none; color: inherit; display: block;">
                    ${mediaHTML}
                    <div class="project-info">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <span class="project-status ${statusClass}">${getStatusTranslation(project.status)}</span>
                        </div>
                        <p class="project-description" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4; flex-grow: 1;">${project.description}</p>
                        <div class="project-tech">
                            ${techTags}
                        </div>
                    </div>
                </a>
            `;
        });

        // Placeholder for future project expansion
        if (projectsExpanded) {
            projectsHTML += `
                <div class="glass-card project-card coming-soon-card" style="display: flex; align-items: center; justify-content: center; text-align: center; border-style: dashed; height: 100%;">
                    <div class="project-info" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-rocket" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1.5rem; animation: float 3s ease-in-out infinite;"></i>
                        <h3 class="project-title">${translations.projects_coming_soon_title[currentLang]}</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.4;">${translations.projects_coming_soon_desc[currentLang]}</p>
                    </div>
                </div>
            `;
        }

        projectsContainer.innerHTML = projectsHTML;

        if (toggleProjectsBtn) {
            toggleProjectsBtn.textContent = projectsExpanded
                ? translations.projects_btn_less[currentLang]
                : translations.projects_btn_more[currentLang];
        }
    }

    if (toggleProjectsBtn) {
        toggleProjectsBtn.addEventListener('click', () => {
            projectsExpanded = !projectsExpanded;
            renderProjects();
        });
    }

    // Skills Visualization: Dynamic rendering of technical expertise categories
    const skillsContainer = document.getElementById('skills-container');
    function renderSkills() {
        if (!skillsContainer) return;
        let skillsHTML = '<div class="skills-table">';
        portfolioData[currentLang].skills.forEach(categoryGroup => {
            skillsHTML += `
                <div class="skill-row">
                    <div class="skill-category-title">
                        <i class="fa-solid fa-layer-group" style="color: var(--accent-color);"></i> ${categoryGroup.category}
                    </div>
                    <div class="skill-badges">
            `;
            categoryGroup.items.forEach(skill => {
                skillsHTML += `
                        <span class="tech-badge" style="--badge-hue: ${getHue(skill.name)};">
                            <i class="${skill.iconClass}"></i> ${skill.name}
                        </span>
                `;
            });
            skillsHTML += `
                    </div>
                </div>
            `;
        });
        skillsHTML += '</div>';
        skillsHTML += `
            <div class="skills-footer" style="text-align: center; margin-top: 3rem; color: var(--text-muted); font-style: italic; opacity: 0.8;">
                <p>${translations.skills_footer[currentLang]}</p>
            </div>
        `;
        skillsContainer.innerHTML = skillsHTML;
    }

    // Certifications Display: Lists professional and academic achievements
    const certsContainer = document.getElementById('certificates-container');
    function renderCertificates() {
        if (!certsContainer) return;
        let certsHTML = '';
        portfolioData[currentLang].certificates.forEach(cert => {
            const hasImage = !!cert.image;
            const clickableClass = hasImage ? 'clickable-cert' : '';
            const dataAttr = hasImage ? `data-cert-img="${cert.image}" data-cert-title="${cert.title}"` : '';

            certsHTML += `
                <div class="glass-card cert-card ${clickableClass}" ${dataAttr}>
                    <div class="cert-icon">
                        <i class="${cert.iconClass}"></i>
                    </div>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <p>${cert.issuer}</p>
                    </div>
                    ${hasImage ? `<div class="cert-preview-badge"><i class="fa-solid fa-magnifying-glass-plus"></i></div>` : ''}
                </div>
            `;
        });
        certsContainer.innerHTML = certsHTML;
    }

    // Blog Integration: Manages the display and expansion of insight posts
    const blogsContainer = document.getElementById('blogs-container');
    const toggleBlogsBtn = document.getElementById('toggle-blogs');
    let blogsExpanded = false;

    function renderBlogs() {
        if (!blogsContainer) return;
        const limit = blogsExpanded ? portfolioData[currentLang].blogs.length : 3;
        const blogsToRender = portfolioData[currentLang].blogs.slice(0, limit);
        let blogsHTML = '';

        blogsToRender.forEach(blog => {
            const isVideo = blog.image && (blog.image.endsWith('.mp4') || blog.image.endsWith('.webm'));
            const mediaTag = isVideo
                ? `<video src="${blog.image}" autoplay loop muted playsinline style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;"></video>`
                : `<img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">`;

            blogsHTML += `
                <a href="blog-details.html?id=${blog.id}" class="glass-card blog-card" style="text-decoration: none; color: inherit; display: flex; flex-direction: column;">
                    ${mediaTag}
                    <span class="blog-date" style="color: var(--accent-color); font-weight: 600; font-size: 0.9rem;">${blog.date}</span>
                    <h3 class="blog-title" style="margin: 0.5rem 0;">${blog.title}</h3>
                    <p class="blog-excerpt" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.4; flex-grow: 1;">${blog.excerpt}</p>
                </a>
            `;
        });
        blogsContainer.innerHTML = blogsHTML;

        if (toggleBlogsBtn) {
            toggleBlogsBtn.textContent = blogsExpanded
                ? translations.blog_btn_less[currentLang]
                : translations.blog_btn_more[currentLang];
        }
    }

    if (toggleBlogsBtn) {
        toggleBlogsBtn.addEventListener('click', () => {
            blogsExpanded = !blogsExpanded;
            renderBlogs();
        });
    }

    // Detailed View Logic: Handles specific project and blog page rendering via URL parameters
    const projectDetailsContainer = document.getElementById('project-details-container');
    function renderProjectDetails() {
        if (!projectDetailsContainer) return;
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('id'));
        const project = portfolioData[currentLang].projects.find(p => p.id === projectId);

        if (project) {
            const statusClass = project.status === 'completed' ? 'status-completed' :
                project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';
            const techTags = project.techStack.map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech.name)}; font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="${tech.iconClass}" style="margin-right: 0.5rem;"></i> ${tech.name}</span>`).join('');
            const newTechTags = (project.newTechLearned || []).map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech)};">${tech}</span>`).join('');

            // Image gallery
            let imagesHTML = '';
            const allImages = project.images && project.images.length > 0 ? project.images : [project.image];

            if (allImages.length > 0) {
                imagesHTML = `
                    <div class="project-slider-wrapper">
                        <div class="main-preview-container">
                            ${allImages.length > 1 ? `<button class="slider-arrow prev-arrow" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>` : ''}
                            <div class="main-preview-viewport">
                                <!-- Injected dynamically -->
                            </div>
                            ${allImages.length > 1 ? `<button class="slider-arrow next-arrow" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
                        </div>
                        ${allImages.length > 1 ? `
                            <div class="thumbnail-strip">
                                ${allImages.map((img, idx) => {
                    const isVid = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm');
                    return `
                                        <div class="thumbnail-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                                            ${isVid
                            ? `<video src="${img}" muted playsinline></video>`
                            : `<img src="${img}" alt="Thumbnail ${idx + 1}">`
                        }
                                        </div>
                                    `;
                }).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            projectDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; margin-top: 2rem;">
                    ${imagesHTML}
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 0;">${project.title}</h1>
                        <span class="project-status ${statusClass}" style="font-size: 1rem;">${getStatusTranslation(project.status)}</span>
                    </div>

                    <div class="project-tech" style="margin-bottom: 2rem; gap: 1rem;">
                        ${techTags}
                    </div>
                    
                    <div class="modal-desc-section" style="margin-bottom: 1.5rem;">
                        <h4><i class="fa-solid fa-circle-question"></i> ${translations.details_problem[currentLang]}</h4>
                        <p class="modal-desc">${project.problem || project.description || 'N/A'}</p>
                    </div>
                    <div class="modal-desc-section" style="margin-bottom: 1.5rem;">
                        <h4><i class="fa-solid fa-lightbulb"></i> ${translations.details_solution[currentLang]}</h4>
                        <p class="modal-desc">${project.solution || 'N/A'}</p>
                    </div>
                    <div class="modal-desc-section" style="margin-bottom: 2rem;">
                        <h4><i class="fa-solid fa-graduation-cap"></i> ${translations.details_lessons[currentLang]}</h4>
                        <p class="modal-desc">${project.lessonsLearned || 'N/A'}</p>
                        ${newTechTags ? `
                            <div style="margin-top: 1rem;">
                                <h5 style="margin-bottom: 0.5rem; color: var(--text-color);">${translations.details_new_tech[currentLang]}</h5>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                    ${newTechTags}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${project.githubLink && project.githubLink !== '#' ? `<a href="${project.githubLink}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> ${translations.details_btn_repo[currentLang]}</a>` : ''}
                        ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${translations.details_btn_demo[currentLang]}</a>` : ''}
                        <a href="index.html#projects" class="btn btn-outline" style="margin-left: auto;">${translations.details_btn_back_projects[currentLang]}</a>
                    </div>
                </div>
            `;

            // Initialize slider logic if elements exist
            const sliderWrapper = projectDetailsContainer.querySelector('.project-slider-wrapper');
            if (sliderWrapper && allImages.length > 1) {
                let currentIndex = 0;
                const viewport = sliderWrapper.querySelector('.main-preview-viewport');
                const thumbnails = sliderWrapper.querySelectorAll('.thumbnail-item');
                const prevBtn = sliderWrapper.querySelector('.prev-arrow');
                const nextBtn = sliderWrapper.querySelector('.next-arrow');

                function updateActiveMedia(index) {
                    currentIndex = (index + allImages.length) % allImages.length;
                    const activeMedia = allImages[currentIndex];
                    const isVid = activeMedia.toLowerCase().endsWith('.mp4') || activeMedia.toLowerCase().endsWith('.webm');

                    viewport.style.opacity = '0';

                    setTimeout(() => {
                        if (isVid) {
                            viewport.innerHTML = `<video src="${activeMedia}" autoplay muted loop playsinline class="slider-media-content"></video>`;
                        } else {
                            viewport.innerHTML = `<img src="${activeMedia}" alt="${project.title}" class="slider-media-content">`;
                        }
                        viewport.style.opacity = '1';
                    }, 150);

                    thumbnails.forEach((thumb, idx) => {
                        if (idx === currentIndex) {
                            thumb.classList.add('active');
                        } else {
                            thumb.classList.remove('active');
                        }
                    });
                }

                updateActiveMedia(0);

                if (prevBtn) {
                    prevBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        updateActiveMedia(currentIndex - 1);
                    });
                }
                if (nextBtn) {
                    nextBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        updateActiveMedia(currentIndex + 1);
                    });
                }

                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', () => {
                        const idx = parseInt(thumb.getAttribute('data-index'));
                        updateActiveMedia(idx);
                    });
                });
            } else if (sliderWrapper) {
                const viewport = sliderWrapper.querySelector('.main-preview-viewport');
                if (viewport) {
                    const activeMedia = allImages[0];
                    const isVid = activeMedia.toLowerCase().endsWith('.mp4') || activeMedia.toLowerCase().endsWith('.webm');
                    if (isVid) {
                        viewport.innerHTML = `<video src="${activeMedia}" autoplay muted loop playsinline class="slider-media-content"></video>`;
                    } else {
                        viewport.innerHTML = `<img src="${activeMedia}" alt="${project.title}" class="slider-media-content">`;
                    }
                }
            }
        } else {
            projectDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; text-align: center;">
                    <h2>${translations.details_project_not_found[currentLang]}</h2>
                    <a href="index.html#projects" class="btn btn-primary" style="margin-top: 1rem;">${translations.details_btn_back_projects[currentLang]}</a>
                </div>
            `;
        }
    }

    // Blog Content Loading: Fetches and displays detailed blog post content
    const blogDetailsContainer = document.getElementById('blog-details-container');
    function renderBlogDetails() {
        if (!blogDetailsContainer) return;
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = parseInt(urlParams.get('id'));
        const blog = portfolioData[currentLang].blogs.find(b => b.id === blogId);

        if (blog) {
            const tagsHTML = (blog.tags || []).map(tag => `<span class="tech-badge" style="--badge-hue: ${getHue(tag)}; font-size: 0.9rem; padding: 0.4rem 1rem;">#${tag}</span>`).join('');

            const mediaList = (blog.images && blog.images.length > 0) ? blog.images : (blog.image ? [blog.image] : []);
            const renderMediaItem = (src, alt, style) => {
                if (src.endsWith('.mp4') || src.endsWith('.webm')) {
                    return `<video src="${src}" autoplay loop muted playsinline controls style="${style}"></video>`;
                }
                return `<img src="${src}" alt="${alt}" style="${style}">`;
            };

            let mediaHTML = '';
            if (mediaList.length > 1) {
                mediaHTML = `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${mediaList.map(src => renderMediaItem(src, blog.title, "width: 100%; max-height: 450px; object-fit: contain; background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border); border-radius: 1rem;")).join('')}
                    </div>
                `;
            } else if (mediaList.length === 1) {
                mediaHTML = renderMediaItem(mediaList[0], blog.title, "width: 100%; max-height: 500px; object-fit: contain; background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border); border-radius: 1rem; margin-bottom: 2rem;");
            }

            blogDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; margin-top: 2rem;">
                    ${mediaHTML}
                    
                    <div style="margin-bottom: 1.5rem;">
                        <span style="color: var(--accent-color); font-weight: 600; display: block; margin-bottom: 0.5rem;">${blog.date}</span>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--text-color);">${blog.title}</h1>
                    </div>

                    <div class="blog-content" style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; margin-bottom: 2rem;">
                        ${blog.content}
                    </div>
                    
                    ${tagsHTML ? `
                        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <h5 style="margin-bottom: 1rem; color: var(--text-color);">${translations.details_topics[currentLang]}</h5>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${tagsHTML}
                            </div>
                        </div>
                    ` : ''}

                    <div style="margin-top: 2rem; display: flex;">
                        <a href="index.html#blog" class="btn btn-outline" style="margin-left: auto;">${translations.details_btn_back_blogs[currentLang]}</a>
                    </div>
                </div>
            `;
        } else {
            blogDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; text-align: center;">
                    <h2>${translations.details_blog_not_found[currentLang]}</h2>
                    <a href="index.html#blog" class="btn btn-primary" style="margin-top: 1rem;">${translations.details_btn_back_blogs[currentLang]}</a>
                </div>
            `;
        }
    }



    // Communication: Contact form submission handling via mailto protocol
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            const subjectText = currentLang === 'en'
                ? `Portfolio Contact from ${name}`
                : `Portfolio-Kontakt von ${name}`;

            const bodyText = currentLang === 'en'
                ? `Name: ${name}\nEmail: ${email}\n\n${message}`
                : `Name: ${name}\nE-Mail: ${email}\n\n${message}`;

            const subject = encodeURIComponent(subjectText);
            const body = encodeURIComponent(bodyText);
            window.location.href = `mailto:majdalmotaem1998@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // Mobile Interaction: Hamburger menu toggle for responsive navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Visual Polish: Animated counters for performance and social metrics
    const animateCounter = (id, target) => {
        const counter = document.getElementById(id);
        if (!counter) return;

        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // ~60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };



    // 3. Language Switcher Interactive Logic
    function setupLanguageSwitcher() {
        const switchers = document.querySelectorAll('.lang-switcher');

        const updateSwitcherUI = () => {
            document.querySelectorAll('.lang-btn').forEach(btn => {
                if (btn.getAttribute('data-lang') === currentLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        };

        switchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                const btn = e.target.closest('.lang-btn');
                if (!btn) return;

                const lang = btn.getAttribute('data-lang');
                if (lang === currentLang) return;

                currentLang = lang;
                localStorage.setItem('portfolio-lang', currentLang);

                updateSwitcherUI();
                translateStaticUI();

                // Re-render dynamic elements
                renderProjects();
                renderSkills();
                renderCertificates();
                renderBlogs();
                renderProjectDetails();
                renderBlogDetails();
            });
        });

        updateSwitcherUI();
    }

    // 3.5 CV Modal Interactive Logic
    function setupCVModal() {
        const cvModal = document.getElementById('cv-modal');
        const downloadCvBtn = document.getElementById('download-cv-btn');
        const cvModalCloseBtn = document.getElementById('cv-modal-close-btn');
        const cvDownloadLinks = document.querySelectorAll('.cv-btn');

        if (downloadCvBtn && cvModal) {
            downloadCvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                cvModal.classList.add('active');
                document.body.classList.add('modal-open');
            });
        }

        const closeCvModal = () => {
            if (cvModal) {
                cvModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        };

        if (cvModalCloseBtn) {
            cvModalCloseBtn.addEventListener('click', closeCvModal);
        }

        if (cvModal) {
            cvModal.addEventListener('click', (e) => {
                if (e.target === cvModal) {
                    closeCvModal();
                }
            });
        }

        // Close modal when a download link is clicked (with a slight delay so download initiates smoothly)
        cvDownloadLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeCvModal, 400);
            });
        });
    }

    // 3.7 Certificate Preview Modal Logic
    function setupCertificatePreview() {
        const previewModal = document.getElementById('preview-modal');
        const previewImg = document.getElementById('preview-modal-img');
        const previewCaption = document.getElementById('preview-modal-caption');
        const previewCloseBtn = document.getElementById('preview-modal-close-btn');

        // Since certificate cards are rendered dynamically, we use event delegation on the container
        const certsContainer = document.getElementById('certificates-container');
        if (certsContainer && previewModal && previewImg && previewCaption) {
            certsContainer.addEventListener('click', (e) => {
                const certCard = e.target.closest('.clickable-cert');
                if (!certCard) return;

                const imgUrl = certCard.getAttribute('data-cert-img');
                const title = certCard.getAttribute('data-cert-title');

                if (imgUrl) {
                    previewImg.src = imgUrl;
                    previewCaption.textContent = title || '';
                    previewModal.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        }

        const closePreviewModal = () => {
            if (previewModal) {
                previewModal.classList.remove('active');
                document.body.classList.remove('modal-open');
                // Clear the image source after transition to prevent flicker on reopen
                setTimeout(() => {
                    previewImg.src = '';
                }, 400);
            }
        };

        if (previewCloseBtn) {
            previewCloseBtn.addEventListener('click', closePreviewModal);
        }

        if (previewModal) {
            previewModal.addEventListener('click', (e) => {
                if (e.target === previewModal) {
                    closePreviewModal();
                }
            });
        }
    }

    // 4. Initial Bootstrap Execution
    // Update translations and UI dynamically from loaded profile data
    if (portfolioData.profile) {
        const profile = portfolioData.profile;
        if (profile.name) {
            const nameParts = profile.name.split(' ');
            let highlightedName = profile.name;
            if (nameParts.length > 1) {
                const last = nameParts.pop();
                highlightedName = `${nameParts.join(' ')} <span class="highlight">${last}</span>`;
            } else {
                highlightedName = `<span class="highlight">${profile.name}</span>`;
            }
            translations.hero_greet.en = highlightedName;
            translations.hero_greet.de = highlightedName;
        }
        if (profile.en?.title) translations.hero_title.en = profile.en.title;
        if (profile.de?.title) translations.hero_title.de = profile.de.title;
        if (profile.en?.motto) translations.hero_motto.en = profile.en.motto;
        if (profile.de?.motto) translations.hero_motto.de = profile.de.motto;

        // Dynamic Profile Image
        const heroImg = document.querySelector('.hero-image-container img');
        if (heroImg && profile.image) {
            heroImg.src = profile.image;
        }

        // Dynamic Social Links
        if (profile.socials) {
            const githubLink = document.querySelector('a[href*="github.com"]');
            if (githubLink && profile.socials.github) githubLink.href = profile.socials.github;

            const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
            if (linkedinLink && profile.socials.linkedin) linkedinLink.href = profile.socials.linkedin;

            const emailLink = document.querySelector('a[href^="mailto:"]');
            if (emailLink && profile.socials.email) {
                emailLink.href = `mailto:${profile.socials.email}`;
            }
        }

        // Dynamic Resumes
        if (profile.resume) {
            const resumeLinks = document.querySelectorAll('.cv-modal-options a');
            if (resumeLinks.length >= 2) {
                if (profile.resume.en) resumeLinks[0].href = profile.resume.en;
                if (profile.resume.de) resumeLinks[1].href = profile.resume.de;
            }
        }
    }

    translateStaticUI();
    renderProjects();
    renderSkills();
    renderCertificates();
    renderBlogs();
    renderProjectDetails();
    renderBlogDetails();
    setupLanguageSwitcher();
    setupCVModal();
    setupCertificatePreview();

    // Real Visitor Counter Integration (Unique sessions - increments once per session)
    async function updateVisitorCounter() {
        const namespace = 'majdalmotaem-portfolio';
        const key = 'visitors';
        const fallbackCount = 154;

        // Check if already counted in this browser session
        const alreadyCounted = sessionStorage.getItem('counted-this-session') === 'true';

        try {
            // If already counted, just GET the current value. Otherwise, increment using /up
            const url = alreadyCounted
                ? `https://api.counterapi.dev/v1/${namespace}/${key}/`
                : `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('API response not OK');
            }
            const data = await response.json();

            // Extract count value from the API response
            const realCount = data.value || data.count;
            if (typeof realCount === 'number') {
                if (!alreadyCounted) {
                    sessionStorage.setItem('counted-this-session', 'true');
                }
                animateCounter('visitor-counter', realCount);
            } else {
                throw new Error('Invalid counter value structure');
            }
        } catch (error) {
            console.warn('Real visitor counter failed, using resilient fallback:', error);
            // Robust local storage fallback to track visits if API is offline
            let localCount = parseInt(localStorage.getItem('portfolio-visits')) || fallbackCount;
            if (!sessionStorage.getItem('counted-this-session')) {
                localCount += 1;
                localStorage.setItem('portfolio-visits', localCount);
                sessionStorage.setItem('counted-this-session', 'true');
            }
            animateCounter('visitor-counter', localCount);
        }
    }

    // Run counters once initially
    animateCounter('project-counter', portfolioData[currentLang].projects.length);
    updateVisitorCounter();
});
