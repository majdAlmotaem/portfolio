// Blogs Markdown CRUD module for custom CMS
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

export async function initBlogs(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading blog posts list...</div>`;

    try {
        const files = await listDirectory('content/blogs');
        const blogs = [];

        for (const file of files) {
            try {
                const fileData = await fetchFile(file.path);
                const parsed = parseFrontMatter(fileData.content);
                blogs.push({
                    filename: file.name,
                    path: file.path,
                    sha: fileData.sha,
                    data: parsed.data,
                    body: parsed.body
                });
            } catch (e) {
                console.error(`Failed to load blog file ${file.name}:`, e);
            }
        }

        // Sort blogs by ID descending
        blogs.sort((a, b) => (b.data.id || 0) - (a.data.id || 0));

        renderList(blogs, container, showToast);
    } catch (err) {
        container.innerHTML = `
            <div class="admin-card" style="border-color: var(--error-color);">
                <h3><i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i> Error Loading Blogs</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Retry</button>
            </div>
        `;
    }
}

function renderList(blogs, container, showToast) {
    let listHTML = `
        <div class="admin-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0;"><i class="fa-solid fa-newspaper"></i> Blog Posts</h3>
                <button type="button" class="btn btn-primary" id="btn-add-blog"><i class="fa-solid fa-plus"></i> Create Post</button>
            </div>
            
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Date</th>
                            <th>Title (EN)</th>
                            <th>Tags</th>
                            <th style="width: 150px; text-align: right;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    if (blogs.length === 0) {
        listHTML += `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No blog posts found. Click "Create Post" to write one.</td></tr>`;
    } else {
        blogs.forEach((blog, idx) => {
            const tags = (blog.data.tags_en || []).join(', ');

            listHTML += `
                <tr>
                    <td>
                        ${blog.data.image ? `<img src="../${blog.data.image}" class="thumbnail" alt="Preview">` : `<div class="thumbnail" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);"><i class="fa-solid fa-image" style="color:var(--text-muted);"></i></div>`}
                    </td>
                    <td>${blog.data.date || ''}</td>
                    <td style="font-weight: 600;">${blog.data.title_en || ''}</td>
                    <td style="color: var(--text-muted); font-size: 0.95rem;">${tags}</td>
                    <td style="text-align: right;">
                        <button type="button" class="btn btn-outline btn-sm btn-icon-only btn-edit-blog" data-idx="${idx}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-blog" data-idx="${idx}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
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
    document.getElementById('btn-add-blog').addEventListener('click', () => {
        renderForm(null, blogs, container, showToast);
    });

    container.querySelectorAll('.btn-edit-blog').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            renderForm(idx, blogs, container, showToast);
        });
    });

    container.querySelectorAll('.btn-delete-blog').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const blog = blogs[idx];
            if (confirm(`Are you sure you want to delete "${blog.data.title_en}"?`)) {
                showToast(`Deleting ${blog.filename}...`, 'loading');
                try {
                    await deleteFile(blog.path, blog.sha, `Delete blog post ${blog.data.title_en} via Custom CMS`);
                    showToast("Blog post deleted successfully!", 'success');
                    initBlogs(container, showToast);
                } catch (err) {
                    showToast(`Delete failed: ${err.message}`, 'error');
                }
            }
        });
    });
}

function renderForm(idx, blogs, container, showToast) {
    const isEdit = idx !== null;
    const blog = isEdit ? blogs[idx] : {
        filename: '',
        path: '',
        sha: null,
        data: {
            id: blogs.length > 0 ? Math.max(...blogs.map(b => b.data.id || 0)) + 1 : 1,
            date: '',
            image: '',
            tags_en: [],
            tags_de: [],
            title_en: '',
            title_de: '',
            excerpt_en: '',
            excerpt_de: '',
            content_en: '',
            content_de: ''
        },
        body: ''
    };

    // Deep clones of arrays
    const tags_en = JSON.parse(JSON.stringify(blog.data.tags_en || []));
    const tags_de = JSON.parse(JSON.stringify(blog.data.tags_de || []));

    container.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom: 2rem;"><i class="fa-solid fa-newspaper"></i> ${isEdit ? 'Edit' : 'Create'} Blog Post</h3>
            
            <form id="blog-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Filename (Auto-generated from English Title)</label>
                        <input type="text" id="blog-filename" value="${blog.filename}" placeholder="Will auto-generate..." readonly style="background:rgba(255,255,255,0.02);color:var(--text-muted);" required>
                    </div>
                    <div class="form-group">
                        <label>Unique Numeric ID (Auto-generated)</label>
                        <input type="number" id="blog-id" value="${blog.data.id || 1}" readonly style="background:rgba(255,255,255,0.02);color:var(--text-muted);" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Featured Image Path</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="blog-image" value="${blog.data.image || ''}" style="flex-grow: 1;" required>
                            <input type="file" id="blog-image-file" accept="image/*" class="hidden">
                            <button type="button" class="btn btn-outline btn-sm" id="btn-upload-blog-img"><i class="fa-solid fa-upload"></i> Upload</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Date Label (e.g. Jan 2026, 2025)</label>
                        <input type="text" id="blog-date" value="${blog.data.date || ''}" required>
                    </div>
                </div>

                <!-- ─── Multilingual Content ─── -->
                <div class="field-langs">
                    <div>
                        <h4 class="lang-header"><i class="fa-solid fa-earth-americas"></i> English Post Details</h4>
                        <div class="form-group">
                            <label>English Title</label>
                            <input type="text" id="blog-title-en" value="${blog.data.title_en || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Excerpt (EN)</label>
                            <textarea id="blog-excerpt-en" style="min-height: 80px;" required>${blog.data.excerpt_en || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Content (EN, HTML/Markdown)</label>
                            <textarea id="blog-content-en" style="min-height: 250px;" required>${blog.data.content_en || ''}</textarea>
                        </div>
                    </div>

                    <div>
                        <h4 class="lang-header"><i class="fa-solid fa-earth-europe"></i> German Post Details</h4>
                        <div class="form-group">
                            <label>Zertifikat Titel (DE)</label>
                            <input type="text" id="blog-title-de" value="${blog.data.title_de || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Beschreibung (DE)</label>
                            <textarea id="blog-excerpt-de" style="min-height: 80px;" required>${blog.data.excerpt_de || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Inhalt (DE, HTML/Markdown)</label>
                            <textarea id="blog-content-de" style="min-height: 250px;" required>${blog.data.content_de || ''}</textarea>
                        </div>
                    </div>
                </div>

                <!-- ─── Tags Editing ─── -->
                <div class="form-row">
                    <div class="form-group">
                        <label>Tags (English list)</label>
                        <div id="tags-en-list" class="nested-list"></div>
                        <button type="button" class="btn btn-outline btn-sm" id="btn-add-tag-en" style="margin-top: 0.5rem;"><i class="fa-solid fa-plus"></i> Add Tag</button>
                    </div>
                    <div class="form-group">
                        <label>Tags (German list)</label>
                        <div id="tags-de-list" class="nested-list"></div>
                        <button type="button" class="btn btn-outline btn-sm" id="btn-add-tag-de" style="margin-top: 0.5rem;"><i class="fa-solid fa-plus"></i> Add Tag</button>
                    </div>
                </div>

                <div class="actions-bar">
                    <button type="button" class="btn btn-outline" id="btn-cancel-blog">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Post</button>
                </div>
            </form>
        </div>
    `;

    // English tags
    const tagsEnContainer = document.getElementById('tags-en-list');
    function renderTagsEn() {
        tagsEnContainer.innerHTML = '';
        tags_en.forEach((tag, i) => {
            const el = document.createElement('div');
            el.className = 'nested-item';
            el.innerHTML = `
                <input type="text" value="${tag}" placeholder="Tag Name" required class="inp-tag-str">
                <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-del-tag"><i class="fa-solid fa-xmark"></i></button>
            `;
            el.querySelector('.inp-tag-str').addEventListener('input', (e) => tags_en[i] = e.target.value);
            el.querySelector('.btn-del-tag').addEventListener('click', () => {
                tags_en.splice(i, 1);
                renderTagsEn();
            });
            tagsEnContainer.appendChild(el);
        });
    }
    document.getElementById('btn-add-tag-en').addEventListener('click', () => {
        tags_en.push('');
        renderTagsEn();
    });
    renderTagsEn();

    // German tags
    const tagsDeContainer = document.getElementById('tags-de-list');
    function renderTagsDe() {
        tagsDeContainer.innerHTML = '';
        tags_de.forEach((tag, i) => {
            const el = document.createElement('div');
            el.className = 'nested-item';
            el.innerHTML = `
                <input type="text" value="${tag}" placeholder="Tag Name" required class="inp-tag-str">
                <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-del-tag"><i class="fa-solid fa-xmark"></i></button>
            `;
            el.querySelector('.inp-tag-str').addEventListener('input', (e) => tags_de[i] = e.target.value);
            el.querySelector('.btn-del-tag').addEventListener('click', () => {
                tags_de.splice(i, 1);
                renderTagsDe();
            });
            tagsDeContainer.appendChild(el);
        });
    }
    document.getElementById('btn-add-tag-de').addEventListener('click', () => {
        tags_de.push('');
        renderTagsDe();
    });
    renderTagsDe();

    // Image Upload handler
    const imgInp = document.getElementById('blog-image');
    const fileInp = document.getElementById('blog-image-file');
    document.getElementById('btn-upload-blog-img').addEventListener('click', () => fileInp.click());
    fileInp.addEventListener('change', async () => {
        if (fileInp.files.length === 0) return;
        const file = fileInp.files[0];
        showToast(`Uploading featured image: ${file.name}...`, 'loading');
        try {
            const path = await uploadMedia(file, 'assets/images');
            imgInp.value = path;
            showToast("Featured image uploaded successfully!", 'success');
        } catch (e) {
            showToast(`Upload failed: ${e.message}`, 'error');
        }
    });

    // Dynamic filename generator from English Title in Create mode
    const titleEnInp = document.getElementById('blog-title-en');
    const filenameInp = document.getElementById('blog-filename');
    if (titleEnInp && filenameInp && !isEdit) {
        titleEnInp.addEventListener('input', (e) => {
            const slug = slugify(e.target.value);
            filenameInp.value = slug ? `${slug}.md` : '';
        });
    }

    // Cancel and Submit listeners
    document.getElementById('btn-cancel-blog').addEventListener('click', () => {
        renderList(blogs, container, showToast);
    });

    document.getElementById('blog-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        let filename = document.getElementById('blog-filename').value.trim();
        if (!filename.endsWith('.md')) filename += '.md';

        const filePath = `content/blogs/${filename}`;

        const payloadData = {
            id: parseInt(document.getElementById('blog-id').value),
            date: document.getElementById('blog-date').value,
            image: document.getElementById('blog-image').value,
            tags_en: tags_en.filter(Boolean),
            tags_de: tags_de.filter(Boolean),
            title_en: document.getElementById('blog-title-en').value,
            title_de: document.getElementById('blog-title-de').value,
            excerpt_en: document.getElementById('blog-excerpt-en').value,
            excerpt_de: document.getElementById('blog-excerpt-de').value,
            content_en: document.getElementById('blog-content-en').value,
            content_de: document.getElementById('blog-content-de').value
        };

        const markdownText = stringifyFrontMatter(payloadData, blog.body);

        showToast(`Saving blog post ${filename} on GitHub...`, 'loading');
        try {
            await saveFile(
                filePath,
                markdownText,
                blog.sha,
                `Update blog post ${payloadData.title_en} via Custom CMS`
            );
            showToast("Blog post saved successfully!", 'success');
            initBlogs(container, showToast);
        } catch (err) {
            showToast(`Save failed: ${err.message}`, 'error');
        }
    });
}
