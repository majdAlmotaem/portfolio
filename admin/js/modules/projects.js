// Projects Markdown CRUD module for custom CMS
import { fetchFile, saveFile, deleteFile, listDirectory, uploadMedia } from '../github-api.js';

// Slugify text to safe filenames
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

// Parse YAML frontmatter and body
function parseFrontMatter(text) {
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = text.match(regex);
    if (!match) return { data: {}, body: text };
    
    const jsyaml = window.jsyaml;
    let data = {};
    if (jsyaml) {
        try {
            data = jsyaml.load(match[1]);
        } catch (e) {
            console.error("Failed to parse frontmatter: ", e);
        }
    }
    return { data, body: match[2] };
}

// Convert data + body to YAML frontmatter markdown string
function stringifyFrontMatter(data, body = "") {
    const jsyaml = window.jsyaml;
    if (!jsyaml) throw new Error("YAML parser not loaded");
    const yamlPart = jsyaml.dump(data);
    return `---\n${yamlPart}---\n${body.trim()}`;
}

export async function initProjects(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading projects list...</div>`;

    try {
        const files = await listDirectory('content/projects');
        
        // ─── PERFORMANCE: Fetch all projects in parallel (3-4x faster) ───
        const projectsData = await Promise.all(
            files.map(file =>
                fetchFile(file.path)
                    .then(fileData => {
                        const parsed = parseFrontMatter(fileData.content);
                        return {
                            filename: file.name,
                            path: file.path,
                            sha: fileData.sha,
                            data: parsed.data,
                            body: parsed.body
                        };
                    })
                    .catch(e => {
                        console.error(`Failed to load project file ${file.name}:`, e);
                        return null;
                    })
            )
        );
        
        const projects = projectsData.filter(p => p !== null);

        // Sort projects by ID descending
        projects.sort((a, b) => (b.data.id || 0) - (a.data.id || 0));

        renderList(projects, container, showToast);
    } catch (err) {
        container.innerHTML = `
            <div class="admin-card" style="border-color: var(--error-color);">
                <h3><i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i> Error Loading Projects</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Retry</button>
            </div>
        `;
    }
}

function renderList(projects, container, showToast) {
    let listHTML = `
        <div class="admin-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0;"><i class="fa-solid fa-laptop-code"></i> Projects</h3>
                <button type="button" class="btn btn-primary" id="btn-add-project"><i class="fa-solid fa-plus"></i> Create Project</button>
            </div>
            
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>ID</th>
                            <th>Title (EN)</th>
                            <th>Status</th>
                            <th>Tech Stack</th>
                            <th style="width: 150px; text-align: right;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    if (projects.length === 0) {
        listHTML += `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No projects found. Click "Create Project" to get started.</td></tr>`;
    } else {
        projects.forEach((proj, idx) => {
            const statusClass = proj.data.status === 'completed' ? 'completed' :
                              proj.data.status === 'in-progress' ? 'in-progress' : 'canceled';
            
            const techBadges = (proj.data.techStack || []).map(tech => tech.name).join(', ');

            // Check if preview image is video or image
            let previewHTML = '';
            if (proj.data.image) {
                const isVid = proj.data.image.toLowerCase().endsWith('.mp4') || proj.data.image.toLowerCase().endsWith('.webm');
                previewHTML = isVid 
                    ? `<video src="../${proj.data.image}" class="thumbnail" muted></video>`
                    : `<img src="../${proj.data.image}" class="thumbnail" alt="Preview">`;
            } else {
                previewHTML = `<div class="thumbnail" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);"><i class="fa-solid fa-image" style="color:var(--text-muted);"></i></div>`;
            }

            listHTML += `
                <tr>
                    <td>${previewHTML}</td>
                    <td>${proj.data.id || ''}</td>
                    <td style="font-weight: 600;">${proj.data.title_en || ''}</td>
                    <td><span class="status-badge ${statusClass}">${proj.data.status || ''}</span></td>
                    <td style="color: var(--text-muted); font-size: 0.9rem;">${techBadges}</td>
                    <td style="text-align: right;">
                        <button type="button" class="btn btn-outline btn-sm btn-icon-only btn-edit-project" data-idx="${idx}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-project" data-idx="${idx}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    listHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = listHTML;

    // Attach listeners
    document.getElementById('btn-add-project').addEventListener('click', () => {
        renderForm(null, projects, container, showToast);
    });

    container.querySelectorAll('.btn-edit-project').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            renderForm(idx, projects, container, showToast);
        });
    });

    container.querySelectorAll('.btn-delete-project').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const proj = projects[idx];
            if (confirm(`Are you sure you want to delete "${proj.data.title_en}"? This will delete the markdown file from GitHub.`)) {
                showToast(`Deleting ${proj.filename}...`, 'loading');
                try {
                    await deleteFile(proj.path, proj.sha, `Delete project ${proj.data.title_en} via Custom CMS`);
                    showToast("Project deleted successfully!", 'success');
                    initProjects(container, showToast);
                } catch (err) {
                    showToast(`Delete failed: ${err.message}`, 'error');
                }
            }
        });
    });
}

function renderForm(idx, projects, container, showToast) {
    const isEdit = idx !== null;
    const project = isEdit ? projects[idx] : {
        filename: '',
        path: '',
        sha: null,
        data: {
            id: projects.length > 0 ? Math.max(...projects.map(p => p.data.id || 0)) + 1 : 1,
            title_en: '',
            title_de: '',
            image: '',
            images: [],
            status: 'completed',
            link: '',
            githubLink: '',
            techStack: [],
            newTechLearned_en: [],
            newTechLearned_de: [],
            description_en: '',
            description_de: '',
            problem_en: '',
            problem_de: '',
            solution_en: '',
            solution_de: '',
            lessonsLearned_en: '',
            lessonsLearned_de: ''
        },
        body: ''
    };

    // Prepare deep clones of arrays to work on
    const techStack = JSON.parse(JSON.stringify(project.data.techStack || []));
    const images = JSON.parse(JSON.stringify(project.data.images || []));
    const newTech_en = JSON.parse(JSON.stringify(project.data.newTechLearned_en || []));
    const newTech_de = JSON.parse(JSON.stringify(project.data.newTechLearned_de || []));

    container.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom: 2rem;"><i class="fa-solid fa-laptop-code"></i> ${isEdit ? 'Edit' : 'Create'} Project</h3>
            
            <form id="project-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Main Image / Video Path</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="proj-image" value="${project.data.image || ''}" style="flex-grow: 1;" required>
                            <input type="file" id="proj-image-file" accept="image/*,video/*" class="hidden">
                            <button type="button" class="btn btn-outline btn-sm" id="btn-upload-proj-main"><i class="fa-solid fa-upload"></i> Upload</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Project Status</label>
                        <select id="proj-status" required>
                            <option value="completed" ${project.data.status === 'completed' ? 'selected' : ''}>Completed</option>
                            <option value="in-progress" ${project.data.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                            <option value="canceled" ${project.data.status === 'canceled' ? 'selected' : ''}>Canceled</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Live Demo URL</label>
                        <input type="text" id="proj-link" value="${project.data.link || ''}">
                    </div>
                    <div class="form-group">
                        <label>GitHub Repository URL</label>
                        <input type="url" id="proj-github" value="${project.data.githubLink || ''}">
                    </div>
                </div>

                <!-- ─── Multilingual Section ─── -->
                <div class="field-langs">
                    <div class="lang-field-en">
                        <h4 class="lang-header"><i class="fa-solid fa-earth-americas"></i> English Content</h4>
                        <div class="form-group">
                            <label>Project Title (EN)</label>
                            <input type="text" id="proj-title-en" value="${project.data.title_en || ''}">
                        </div>
                        <div class="form-group">
                            <label>Description / Excerpt (EN)</label>
                            <input type="text" id="proj-desc-en" value="${project.data.description_en || ''}">
                        </div>
                        <div class="form-group">
                            <label>The Problem (EN)</label>
                            <textarea id="proj-problem-en">${project.data.problem_en || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>The Solution (EN)</label>
                            <textarea id="proj-solution-en">${project.data.solution_en || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Lessons Learned (EN)</label>
                            <textarea id="proj-lessons-en">${project.data.lessonsLearned_en || ''}</textarea>
                        </div>
                    </div>

                    <div class="lang-field-de">
                        <h4 class="lang-header"><i class="fa-solid fa-earth-europe"></i> German Content</h4>
                        <div class="form-group">
                            <label>Zertifikat Titel (DE)</label>
                            <input type="text" id="proj-title-de" value="${project.data.title_de || ''}">
                        </div>
                        <div class="form-group">
                            <label>Beschreibung (DE)</label>
                            <input type="text" id="proj-desc-de" value="${project.data.description_de || ''}">
                        </div>
                        <div class="form-group">
                            <label>Das Problem (DE)</label>
                            <textarea id="proj-problem-de">${project.data.problem_de || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Die Lösung (DE)</label>
                            <textarea id="proj-solution-de">${project.data.solution_de || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Gelernte Lektionen (DE)</label>
                            <textarea id="proj-lessons-de">${project.data.lessonsLearned_de || ''}</textarea>
                        </div>
                    </div>
                </div>

                <!-- ─── Dynamic Arrays Editor ─── -->
                <div class="form-row">
                    <div class="form-group">
                        <label>Tech Stack Badges</label>
                        <div id="tech-list" class="nested-list"></div>
                        <button type="button" class="btn btn-outline btn-sm" id="btn-add-tech" style="margin-top: 0.5rem;"><i class="fa-solid fa-plus"></i> Add Tech Badge</button>
                    </div>
                    <div class="form-group">
                        <label>Additional Gallery Media</label>
                        <div id="gallery-list" class="nested-list"></div>
                        <button type="button" class="btn btn-outline btn-sm" id="btn-add-gallery" style="margin-top: 0.5rem;"><i class="fa-solid fa-plus"></i> Add Gallery Item</button>
                    </div>
                </div>

                <div class="actions-bar">
                    <button type="button" class="btn btn-outline" id="btn-cancel-project">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Project</button>
                </div>
            </form>
        </div>
    `;

    // ─── Setup Lists UI Functions ───
    const techContainer = document.getElementById('tech-list');
    function renderTech() {
        techContainer.innerHTML = '';
        techStack.forEach((t, i) => {
            const el = document.createElement('div');
            el.className = 'nested-item';
            el.innerHTML = `
                <input type="text" value="${t.name}" placeholder="Tech Name (e.g. Node.js)" required class="inp-tech-name" style="flex-grow: 1;">
                <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-del-tech"><i class="fa-solid fa-xmark"></i></button>
            `;
            el.querySelector('.inp-tech-name').addEventListener('input', (e) => t.name = e.target.value);
            el.querySelector('.btn-del-tech').addEventListener('click', () => {
                techStack.splice(i, 1);
                renderTech();
            });
            techContainer.appendChild(el);
        });
    }
    document.getElementById('btn-add-tech').addEventListener('click', () => {
        techStack.push({ name: '', iconClass: '' });
        renderTech();
    });
    renderTech();

    // Gallery List
    const galleryContainer = document.getElementById('gallery-list');
    function renderGallery() {
        galleryContainer.innerHTML = '';
        images.forEach((img, i) => {
            const el = document.createElement('div');
            el.className = 'nested-item';
            el.innerHTML = `
                <input type="text" value="${img}" placeholder="Media Path" required class="inp-gal-path">
                <input type="file" accept="image/*,video/*" class="hidden inp-gal-file">
                <button type="button" class="btn btn-outline btn-sm btn-up-gal"><i class="fa-solid fa-upload"></i></button>
                <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-del-gal"><i class="fa-solid fa-xmark"></i></button>
            `;
            el.querySelector('.inp-gal-path').addEventListener('input', (e) => images[i] = e.target.value);
            
            const fileInp = el.querySelector('.inp-gal-file');
            el.querySelector('.btn-up-gal').addEventListener('click', () => fileInp.click());
            fileInp.addEventListener('change', async () => {
                if (fileInp.files.length === 0) return;
                const file = fileInp.files[0];
                showToast(`Uploading gallery item: ${file.name}...`, 'loading');
                try {
                    const path = await uploadMedia(file, 'assets/images');
                    images[i] = path;
                    renderGallery();
                    showToast("Gallery item uploaded successfully!", 'success');
                } catch (e) {
                    showToast(`Upload failed: ${e.message}`, 'error');
                }
            });

            el.querySelector('.btn-del-gal').addEventListener('click', () => {
                images.splice(i, 1);
                renderGallery();
            });
            galleryContainer.appendChild(el);
        });
    }
    document.getElementById('btn-add-gallery').addEventListener('click', () => {
        images.push('');
        renderGallery();
    });
    renderGallery();

    // ─── Main image upload listener ───
    const mainImgInp = document.getElementById('proj-image');
    const mainImgFile = document.getElementById('proj-image-file');
    document.getElementById('btn-upload-proj-main').addEventListener('click', () => mainImgFile.click());
    mainImgFile.addEventListener('change', async () => {
        if (mainImgFile.files.length === 0) return;
        const file = mainImgFile.files[0];
        showToast(`Uploading main media: ${file.name}...`, 'loading');
        try {
            const path = await uploadMedia(file, 'assets/images');
            mainImgInp.value = path;
            showToast("Main media uploaded successfully!", 'success');
        } catch (e) {
            showToast(`Upload failed: ${e.message}`, 'error');
        }
    });

    // Helper for Tech Icons
    function getIconClassForTech(name) {
        const n = name.toLowerCase().trim();
        if (n.includes('python')) return 'fa-brands fa-python';
        if (n.includes('javascript') || (n.includes('js') && !n.includes('node'))) return 'fa-brands fa-js';
        if (n.includes('node')) return 'fa-brands fa-node-js';
        if (n.includes('react')) return 'fa-brands fa-react';
        if (n.includes('vue')) return 'fa-brands fa-vuejs';
        if (n.includes('angular')) return 'fa-brands fa-angular';
        if (n.includes('html')) return 'fa-brands fa-html5';
        if (n.includes('css')) return 'fa-brands fa-css3-alt';
        if (n.includes('sass') || n.includes('scss')) return 'fa-brands fa-sass';
        if (n.includes('database') || n.includes('sql') || n.includes('postgres') || n.includes('mongo')) return 'fa-solid fa-database';
        if (n.includes('aws') || n.includes('cloud')) return 'fa-brands fa-aws';
        if (n.includes('docker')) return 'fa-brands fa-docker';
        if (n.includes('git')) return 'fa-brands fa-git-alt';
        if (n.includes('github')) return 'fa-brands fa-github';
        if (n.includes('c#') || n.includes('dotnet')) return 'fa-solid fa-hashtag';
        if (n.includes('java')) return 'fa-brands fa-java';
        if (n.includes('php')) return 'fa-brands fa-php';
        if (n.includes('laravel')) return 'fa-brands fa-laravel';
        if (n.includes('award') || n.includes('certif')) return 'fa-solid fa-award';
        if (n.includes('gradua') || n.includes('school') || n.includes('stud')) return 'fa-solid fa-graduation-cap';
        return 'fa-solid fa-code';
    }

    // ─── Cancel and Submit listeners ───
    document.getElementById('btn-cancel-project').addEventListener('click', () => {
        renderList(projects, container, showToast);
    });

    document.getElementById('project-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const titleEn = document.getElementById('proj-title-en').value.trim();
        if (!titleEn) {
            showToast("English Project Title is required.", "error");
            return;
        }

        let filename = project.filename || (slugify(titleEn) + '.md');
        if (!filename.endsWith('.md')) filename += '.md';

        const filePath = `content/projects/${filename}`;
        
        // Auto-assign project ID if not editing
        const projectId = project.data.id || (projects.length > 0 ? Math.max(...projects.map(p => p.data.id || 0)) + 1 : 1);

        const payloadData = {
            id: projectId,
            title_en: titleEn,
            title_de: document.getElementById('proj-title-de').value || titleEn,
            image: document.getElementById('proj-image').value,
            images: images.filter(Boolean),
            status: document.getElementById('proj-status').value,
            link: document.getElementById('proj-link').value || "#",
            githubLink: document.getElementById('proj-github').value || "#",
            techStack: techStack.filter(t => t.name).map(t => ({
                name: t.name,
                iconClass: t.iconClass || getIconClassForTech(t.name)
            })),
            newTechLearned_en: [],
            newTechLearned_de: [],
            description_en: document.getElementById('proj-desc-en').value || "",
            description_de: document.getElementById('proj-desc-de').value || "",
            problem_en: document.getElementById('proj-problem-en').value || "",
            problem_de: document.getElementById('proj-problem-de').value || "",
            solution_en: document.getElementById('proj-solution-en').value || "",
            solution_de: document.getElementById('proj-solution-de').value || "",
            lessonsLearned_en: document.getElementById('proj-lessons-en').value || "",
            lessonsLearned_de: document.getElementById('proj-lessons-de').value || ""
        };

        const markdownText = stringifyFrontMatter(payloadData, project.body);

        showToast(`Staging project changes...`, 'success');
        try {
            await saveFile(
                filePath, 
                markdownText, 
                project.sha, 
                `Update project ${payloadData.title_en} via Custom CMS`
            );
            initProjects(container, showToast);
        } catch (err) {
            showToast(`Staging failed: ${err.message}`, 'error');
        }
    });
}
