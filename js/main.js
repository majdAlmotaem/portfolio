import { portfolioData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Render Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        let projectsHTML = '';
        portfolioData.projects.forEach(project => {
            const statusClass = project.status === 'completed' ? 'status-completed' : 
                                project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';
            
            const techTags = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
            
            projectsHTML += `
                <div class="glass-card project-card">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-info">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <span class="project-status ${statusClass}">${project.status.replace('-', ' ')}</span>
                        </div>
                        <div class="project-tech">
                            ${techTags}
                        </div>
                        <a href="#" class="project-link view-project-btn" data-id="${project.id}">View Project <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        });
        projectsContainer.innerHTML = projectsHTML;
    }

    // 3. Render Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        let skillsHTML = '';
        portfolioData.skills.forEach(categoryGroup => {
            skillsHTML += `
                <div class="skill-category" style="margin-bottom: 3rem;">
                    <h3 style="margin-bottom: 1.5rem; color: var(--accent-color); font-size: 1.5rem;">${categoryGroup.category}</h3>
                    <div class="skills-grid">
            `;
            categoryGroup.items.forEach(skill => {
                skillsHTML += `
                    <div class="glass-card skill-card">
                        <i class="${skill.iconClass}"></i>
                        <span class="skill-name">${skill.name}</span>
                    </div>
                `;
            });
            skillsHTML += `
                    </div>
                </div>
            `;
        });
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

    // 5. Render Blogs
    const blogsContainer = document.getElementById('blogs-container');
    if (blogsContainer) {
        let blogsHTML = '';
        portfolioData.blogs.forEach(blog => {
            blogsHTML += `
                <div class="glass-card blog-card">
                    <span class="blog-date">${blog.date}</span>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                    <a href="${blog.link}" class="read-more">Read Article <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
        });
        blogsContainer.innerHTML = blogsHTML;
    }

    // 6. Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal && modalBody) {
        // Open Modal
        document.querySelectorAll('.view-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = parseInt(btn.getAttribute('data-id'));
                const project = portfolioData.projects.find(p => p.id === projectId);
                
                if (project) {
                    const statusClass = project.status === 'completed' ? 'status-completed' : 
                                    project.status === 'in-progress' ? 'status-in-progress' : 'status-canceled';
                    const techTags = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
                    
                    modalBody.innerHTML = `
                        <div class="modal-body-content">
                            <h2 style="text-align: left; margin-bottom: 0;">${project.title}</h2>
                            <img src="${project.image}" alt="${project.title}" class="modal-img">
                            <div class="project-header" style="margin-bottom: 0;">
                                <span class="project-status ${statusClass}">${project.status.replace('-', ' ')}</span>
                            </div>
                            <div class="project-tech">
                                ${techTags}
                            </div>
                            <p class="modal-desc">${project.description || 'No description available.'}</p>
                            <div class="modal-actions">
                                ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View Repo</a>` : ''}
                                <a href="${project.link}" target="_blank" class="btn btn-outline"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
                            </div>
                        </div>
                    `;
                    modal.classList.add('show');
                }
            });
        });

        // Close Modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});
