import { portfolioData } from './data.js';

const getHue = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar (hide on scroll down, show on scroll up)
    const nav = document.getElementById('navbar');
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    });

    // 2. Render Projects (with Show More / Show Less)
    const projectsContainer = document.getElementById('projects-container');
    let projectsExpanded = false;

    function renderProjects() {
        if (!projectsContainer) return;
        const limit = projectsExpanded ? portfolioData.projects.length : 3;
        const projectsToRender = portfolioData.projects.slice(0, limit);
        let projectsHTML = '';

        projectsToRender.forEach(project => {
            const statusClass = project.status === 'completed' ? 'status-completed' :
                project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';

            const techTags = project.techStack.map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech.name)};"><i class="${tech.iconClass}"></i> ${tech.name}</span>`).join('');

            projectsHTML += `
                <a href="project-details.html?id=${project.id}" class="glass-card project-card" style="text-decoration: none; color: inherit; display: block;">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-info">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <span class="project-status ${statusClass}">${project.status.replace('-', ' ')}</span>
                        </div>
                        <p class="project-description" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4; flex-grow: 1;">${project.description}</p>
                        <div class="project-tech">
                            ${techTags}
                        </div>
                    </div>
                </a>
            `;
        });

        // Add 'More coming soon' card if expanded
        if (projectsExpanded) {
            projectsHTML += `
                <div class="glass-card project-card coming-soon-card" style="display: flex; align-items: center; justify-content: center; text-align: center; border-style: dashed; opacity: 0.7; height: 100%;">
                    <div class="project-info" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-rocket" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1.5rem; animation: float 3s ease-in-out infinite;"></i>
                        <h3 class="project-title">More Coming Soon...</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.4;">Stay tuned for more exciting projects and experiments!</p>
                    </div>
                </div>
            `;
        }

        projectsContainer.innerHTML = projectsHTML;
    }
    renderProjects();

    const toggleProjectsBtn = document.getElementById('toggle-projects');
    if (toggleProjectsBtn) {
        toggleProjectsBtn.addEventListener('click', () => {
            projectsExpanded = !projectsExpanded;
            renderProjects();
            toggleProjectsBtn.textContent = projectsExpanded ? 'Show Less' : 'Show More';
        });
    }

    // 3. Render Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        let skillsHTML = '<div class="skills-table">';
        portfolioData.skills.forEach(categoryGroup => {
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
                <p><i class="fa-solid fa-infinity" style="color: var(--primary-color); margin-right: 0.5rem;"></i> I'm always ready to learn more and more....</p>
            </div>
        `;
        skillsContainer.innerHTML = skillsHTML;
    }

    // 4. Render Certificates
    const certsContainer = document.getElementById('certificates-container');
    if (certsContainer) {
        let certsHTML = '';
        portfolioData.certificates.forEach(cert => {
            certsHTML += `
                <div class="glass-card cert-card">
                    <div class="cert-icon">
                        <i class="${cert.iconClass}"></i>
                    </div>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <p>${cert.issuer}</p>
                    </div>
                </div>
            `;
        });
        certsContainer.innerHTML = certsHTML;
    }

    // 5. Render Blogs (with Show More / Show Less)
    const blogsContainer = document.getElementById('blogs-container');
    let blogsExpanded = false;

    function renderBlogs() {
        if (!blogsContainer) return;
        const limit = blogsExpanded ? portfolioData.blogs.length : 3;
        const blogsToRender = portfolioData.blogs.slice(0, limit);
        let blogsHTML = '';

        blogsToRender.forEach(blog => {
            blogsHTML += `
                <a href="blog-details.html?id=${blog.id}" class="glass-card blog-card" style="text-decoration: none; color: inherit; display: flex; flex-direction: column;">
                    <img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <span class="blog-date" style="color: var(--accent-color); font-weight: 600; font-size: 0.9rem;">${blog.date}</span>
                    <h3 class="blog-title" style="margin: 0.5rem 0;">${blog.title}</h3>
                    <p class="blog-excerpt" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.4; flex-grow: 1;">${blog.excerpt}</p>
                </a>
            `;
        });
        blogsContainer.innerHTML = blogsHTML;
    }
    renderBlogs();

    const toggleBlogsBtn = document.getElementById('toggle-blogs');
    if (toggleBlogsBtn) {
        toggleBlogsBtn.addEventListener('click', () => {
            blogsExpanded = !blogsExpanded;
            renderBlogs();
            toggleBlogsBtn.textContent = blogsExpanded ? 'Show Less' : 'Show More';
        });
    }

    // 6. Project Details Page Logic
    const projectDetailsContainer = document.getElementById('project-details-container');
    if (projectDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = parseInt(urlParams.get('id'));
        const project = portfolioData.projects.find(p => p.id === projectId);

        if (project) {
            const statusClass = project.status === 'completed' ? 'status-completed' :
                project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';
            const techTags = project.techStack.map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech.name)}; font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="${tech.iconClass}" style="margin-right: 0.5rem;"></i> ${tech.name}</span>`).join('');
            const newTechTags = (project.newTechLearned || []).map(tech => `<span class="tech-badge" style="--badge-hue: ${getHue(tech)};">${tech}</span>`).join('');

            // Image gallery
            let imagesHTML = '';
            if (project.images && project.images.length > 0) {
                imagesHTML = `<div class="project-gallery" style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem; margin-bottom: 2rem;">`;
                project.images.forEach(img => {
                    imagesHTML += `<img src="${img}" alt="${project.title}" style="height: 400px; max-width: 100%; object-fit: contain; border-radius: 1rem; background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border);">`;
                });
                imagesHTML += `</div>`;
            } else {
                imagesHTML = `<img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 500px; object-fit: contain; background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border); border-radius: 1rem; margin-bottom: 2rem;">`;
            }

            projectDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; margin-top: 2rem;">
                    ${imagesHTML}
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 0;">${project.title}</h1>
                        <span class="project-status ${statusClass}" style="font-size: 1rem;">${project.status.replace('-', ' ')}</span>
                    </div>

                    <div class="project-tech" style="margin-bottom: 2rem; gap: 1rem;">
                        ${techTags}
                    </div>
                    
                    <div class="modal-desc-section" style="margin-bottom: 1.5rem;">
                        <h4><i class="fa-solid fa-circle-question"></i> The Problem</h4>
                        <p class="modal-desc">${project.problem || project.description || 'No description available.'}</p>
                    </div>
                    <div class="modal-desc-section" style="margin-bottom: 1.5rem;">
                        <h4><i class="fa-solid fa-lightbulb"></i> The Solution</h4>
                        <p class="modal-desc">${project.solution || 'See GitHub for details.'}</p>
                    </div>
                    <div class="modal-desc-section" style="margin-bottom: 2rem;">
                        <h4><i class="fa-solid fa-graduation-cap"></i> Lessons Learned</h4>
                        <p class="modal-desc">${project.lessonsLearned || 'See GitHub for details.'}</p>
                        ${newTechTags ? `
                            <div style="margin-top: 1rem;">
                                <h5 style="margin-bottom: 0.5rem; color: var(--text-color);">New Tech Learned:</h5>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                    ${newTechTags}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View Repo</a>` : ''}
                        <a href="${project.link}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
                        <a href="index.html#projects" class="btn btn-outline" style="margin-left: auto;">Back to Projects</a>
                    </div>
                </div>
            `;
        } else {
            projectDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; text-align: center;">
                    <h2>Project not found.</h2>
                    <a href="index.html#projects" class="btn btn-primary" style="margin-top: 1rem;">Back to Projects</a>
                </div>
            `;
        }
    }

    // 7. Blog Details Page Logic
    const blogDetailsContainer = document.getElementById('blog-details-container');
    if (blogDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = parseInt(urlParams.get('id'));
        const blog = portfolioData.blogs.find(b => b.id === blogId);

        if (blog) {
            const tagsHTML = (blog.tags || []).map(tag => `<span class="tech-badge" style="--badge-hue: ${getHue(tag)}; font-size: 0.9rem; padding: 0.4rem 1rem;">#${tag}</span>`).join('');

            blogDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; margin-top: 2rem;">
                    <img src="${blog.image}" alt="${blog.title}" style="width: 100%; max-height: 500px; object-fit: contain; background: rgba(0,0,0,0.5); border: 1px solid var(--glass-border); border-radius: 1rem; margin-bottom: 2rem;">
                    
                    <div style="margin-bottom: 1.5rem;">
                        <span style="color: var(--accent-color); font-weight: 600; display: block; margin-bottom: 0.5rem;">${blog.date}</span>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--text-color);">${blog.title}</h1>
                    </div>

                    <div class="blog-content" style="color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; margin-bottom: 2rem;">
                        ${blog.content}
                    </div>
                    
                    ${tagsHTML ? `
                        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <h5 style="margin-bottom: 1rem; color: var(--text-color);">Topics:</h5>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${tagsHTML}
                            </div>
                        </div>
                    ` : ''}

                    <div style="margin-top: 2rem; display: flex;">
                        <a href="index.html#blog" class="btn btn-outline" style="margin-left: auto;">Back to Blogs</a>
                    </div>
                </div>
            `;
        } else {
            blogDetailsContainer.innerHTML = `
                <div class="glass-card" style="padding: 3rem; text-align: center;">
                    <h2>Blog post not found.</h2>
                    <a href="index.html#blog" class="btn btn-primary" style="margin-top: 1rem;">Back to Blogs</a>
                </div>
            `;
        }
    }

    // 8. Scroll to Top Button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 9. Contact Form (mailto)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:majdalmotaem1998@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // 10. Mobile Hamburger Menu
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

    // 11. Stats Counter Animation
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

    // Run counters
    animateCounter('project-counter', portfolioData.projects.length);
    animateCounter('visitor-counter', 12);
    animateCounter('coffee-counter', 420);
});
