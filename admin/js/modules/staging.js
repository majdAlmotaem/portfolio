// Staging Manager CRUD module for custom CMS
import { getPendingChanges, savePendingChanges, commitFileToGitHub, commitDeleteToGitHub } from '../github-api.js';

// Custom CSS-Driven Confirmation Modal Helper
function showConfirmModal({ title, message, confirmText = "Confirm", cancelText = "Cancel", type = "info" }) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        
        let confirmBtnClass = 'btn-primary';
        if (type === 'danger') confirmBtnClass = 'btn-danger';
        
        overlay.innerHTML = `
            <div class="modal-card">
                <div class="modal-header">
                    <h3 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-circle-question" style="color: ${type === 'danger' ? 'var(--error-color)' : 'var(--warning-color)'};"></i>
                        ${title}
                    </h3>
                </div>
                <div class="modal-body" style="margin-top: 1rem; line-height: 1.6; color: var(--text-color); font-size: 0.95rem;">
                    ${message}
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 2rem;">
                    <button type="button" class="btn btn-outline btn-sm btn-modal-cancel">${cancelText}</button>
                    <button type="button" class="btn btn-sm ${confirmBtnClass} btn-modal-confirm">${confirmText}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const cleanup = (value) => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
            resolve(value);
        };
        
        overlay.querySelector('.btn-modal-cancel').addEventListener('click', () => cleanup(false));
        overlay.querySelector('.btn-modal-confirm').addEventListener('click', () => cleanup(true));
        
        // Also close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cleanup(false);
        });
    });
}

// Frontmatter and content parser
function parseMarkdownYAML(text) {
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = text.match(regex);
    if (!match) return { data: {}, body: text };
    try {
        const data = window.jsyaml.load(match[1]) || {};
        return { data, body: match[2] };
    } catch (e) {
        return { data: {}, body: text };
    }
}

// Generate human-readable comparisons
function generateComparison(path, oldText, newText) {
    if (oldText === null) {
        return `🆕 [New File Added]\n\nThis is a brand new draft file that doesn't exist on live GitHub yet.\nAll content fields are newly staged.`;
    }

    try {
        if (path.endsWith('.json')) {
            const oldData = JSON.parse(oldText);
            const newData = JSON.parse(newText);
            const changes = [];

            if (path.includes('profile.json')) {
                const fields = [
                    { key: 'name', name: 'Name' },
                    { key: 'image', name: 'Profile Image' },
                    { key: 'socials.github', name: 'GitHub Social', path: true },
                    { key: 'socials.linkedin', name: 'LinkedIn Social', path: true },
                    { key: 'socials.email', name: 'Email Social', path: true },
                    { key: 'en.title', name: 'English Job Title', path: true },
                    { key: 'de.title', name: 'German Job Title', path: true },
                    { key: 'en.motto', name: 'English Motto', path: true },
                    { key: 'de.motto', name: 'German Motto', path: true },
                    { key: 'resume.en', name: 'English Resume Link', path: true },
                    { key: 'resume.de', name: 'German Resume Link', path: true }
                ];

                fields.forEach(f => {
                    let oldVal = '';
                    let newVal = '';
                    if (f.path) {
                        const parts = f.key.split('.');
                        oldVal = oldData[parts[0]]?.[parts[1]] || '';
                        newVal = newData[parts[0]]?.[parts[1]] || '';
                    } else {
                        oldVal = oldData[f.key] || '';
                        newVal = newData[f.key] || '';
                    }

                    if (oldVal !== newVal) {
                        changes.push(`• ${f.name}:\n  Before: "${oldVal}"\n  After : "${newVal}"`);
                    }
                });
            } else if (path.includes('skills.json')) {
                const oldCats = oldData.en || [];
                const newCats = newData.en || [];

                newCats.forEach(newC => {
                    const oldC = oldCats.find(o => o.category === newC.category);
                    if (!oldC) {
                        changes.push(`• Added Category "${newC.category}" with skills: [${newC.items.map(i => i.name).join(', ')}]`);
                    } else {
                        const oldSkillNames = oldC.items.map(i => i.name);
                        const newSkillNames = newC.items.map(i => i.name);
                        const added = newSkillNames.filter(n => !oldSkillNames.includes(n));
                        const removed = oldSkillNames.filter(n => !newSkillNames.includes(n));
                        if (added.length > 0 || removed.length > 0) {
                            let diff = `• Updated Category "${newC.category}":`;
                            if (added.length > 0) diff += `\n  Added skills  : [${added.join(', ')}]`;
                            if (removed.length > 0) diff += `\n  Removed skills: [${removed.join(', ')}]`;
                            changes.push(diff);
                        }
                    }
                });
                oldCats.forEach(oldC => {
                    if (!newCats.some(n => n.category === oldC.category)) {
                        changes.push(`• Removed Category "${oldC.category}"`);
                    }
                });
            } else if (path.includes('certificates.json')) {
                const oldCerts = oldData.certificates || [];
                const newCerts = newData.certificates || [];

                newCerts.forEach(newCert => {
                    const oldCert = oldCerts.find(o => (o.en?.title || o.title) === (newCert.en?.title || newCert.title));
                    if (!oldCert) {
                        changes.push(`• Added Certificate:\n  Title: "${newCert.en?.title || newCert.title}"\n  Issuer: "${newCert.en?.issuer || newCert.issuer}"`);
                    } else {
                        const fieldChanges = [];
                        const oldIssuer = oldCert.en?.issuer || oldCert.issuer || '';
                        const newIssuer = newCert.en?.issuer || newCert.issuer || '';
                        if (oldIssuer !== newIssuer) {
                            fieldChanges.push(`Issuer: "${oldIssuer}" ➔ "${newIssuer}"`);
                        }
                        if (oldCert.image !== newCert.image) {
                            fieldChanges.push(`Image : "${oldCert.image}" ➔ "${newCert.image}"`);
                        }
                        if (oldCert.iconClass !== newCert.iconClass) {
                            fieldChanges.push(`Icon  : "${oldCert.iconClass}" ➔ "${newCert.iconClass}"`);
                        }
                        if (fieldChanges.length > 0) {
                            changes.push(`• Updated Certificate "${newCert.en?.title || newCert.title}":\n  ` + fieldChanges.join('\n  '));
                        }
                    }
                });
                oldCerts.forEach(oldCert => {
                    const match = newCerts.some(n => (n.en?.title || n.title) === (oldCert.en?.title || oldCert.title));
                    if (!match) {
                        changes.push(`• Removed Certificate "${oldCert.en?.title || oldCert.title}"`);
                    }
                });
            }

            return changes.length > 0 ? changes.join('\n\n') : 'No differences detected in JSON configurations.';
        } else if (path.endsWith('.md')) {
            const oldParsed = parseMarkdownYAML(oldText);
            const newParsed = parseMarkdownYAML(newText);
            const oldProj = oldParsed.data;
            const newProj = newParsed.data;
            const changes = [];

            if (path.includes('projects/')) {
                const fields = [
                    { key: 'title_en', name: 'English Title' },
                    { key: 'title_de', name: 'German Title' },
                    { key: 'status', name: 'Status' },
                    { key: 'link', name: 'Demo Link' },
                    { key: 'githubLink', name: 'GitHub Link' },
                    { key: 'image', name: 'Primary Image' },
                    { key: 'description_en', name: 'English Description' },
                    { key: 'description_de', name: 'German Description' },
                    { key: 'problem_en', name: 'English Problem' },
                    { key: 'problem_de', name: 'German Problem' },
                    { key: 'solution_en', name: 'English Solution' },
                    { key: 'solution_de', name: 'German Solution' },
                    { key: 'lessonsLearned_en', name: 'English Lessons Learned' },
                    { key: 'lessonsLearned_de', name: 'German Lessons Learned' }
                ];

                fields.forEach(f => {
                    const oldVal = oldProj[f.key] || '';
                    const newVal = newProj[f.key] || '';
                    if (oldVal !== newVal) {
                        changes.push(`• ${f.name}:\n  Before: "${oldVal}"\n  After : "${newVal}"`);
                    }
                });

                const oldTech = (oldProj.techStack || []).map(t => t.name).join(', ');
                const newTech = (newProj.techStack || []).map(t => t.name).join(', ');
                if (oldTech !== newTech) {
                    changes.push(`• Tech Stack:\n  Before: [${oldTech}]\n  After : [${newTech}]`);
                }
            } else if (path.includes('blogs/')) {
                const fields = [
                    { key: 'title_en', name: 'English Title' },
                    { key: 'title_de', name: 'German Title' },
                    { key: 'date', name: 'Publication Date' },
                    { key: 'image', name: 'Blog Image' },
                    { key: 'excerpt_en', name: 'English Excerpt' },
                    { key: 'excerpt_de', name: 'German Excerpt' },
                    { key: 'content_en', name: 'English Content' },
                    { key: 'content_de', name: 'German Content' }
                ];

                fields.forEach(f => {
                    const oldVal = oldProj[f.key] || '';
                    const newVal = newProj[f.key] || '';
                    if (oldVal !== newVal) {
                        changes.push(`• ${f.name}:\n  Before: "${oldVal}"\n  After : "${newVal}"`);
                    }
                });

                const oldTags = (oldProj.tags_en || []).join(', ');
                const newTags = (newProj.tags_en || []).join(', ');
                if (oldTags !== newTags) {
                    changes.push(`• Tags:\n  Before: [${oldTags}]\n  After : [${newTags}]`);
                }
            }

            return changes.length > 0 ? changes.join('\n\n') : 'No differences detected in content properties.';
        }
    } catch (e) {
        console.error('Error generating comparison:', e);
        return `Unable to parse changes programmatically. Showing raw content:\n\n${newText}`;
    }

    return `Showing raw staged content:\n\n${newText}`;
}

export async function initStaging(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading staging manager...</div>`;

    const changes = getPendingChanges();
    const paths = Object.keys(changes).filter(p => !changes[p].isMedia);

    if (paths.length === 0) {
        container.innerHTML = `
            <div class="admin-card" style="text-align: center; padding: 4rem 2rem;">
                <i class="fa-solid fa-folder-open" style="font-size: 3.5rem; color: var(--text-muted); margin-bottom: 1.5rem; display: block;"></i>
                <h3>No Staged Changes</h3>
                <p style="margin-top: 1rem; color: var(--text-muted); max-width: 450px; margin-left: auto; margin-right: auto;">
                    All files are in sync with the live GitHub repository. Start editing sections, projects, or blogs to queue up local drafts!
                </p>
                <a href="../index.html" target="_blank" class="btn btn-outline" style="margin-top: 2rem;">
                    <i class="fa-solid fa-house"></i> View Live Site
                </a>
            </div>
        `;
        return;
    }

    let listHTML = '';

    paths.forEach((path, idx) => {
        const change = changes[path];
        
        let statusClass = 'modified';
        let statusLabel = 'Modified';
        
        if (change.deleted) {
            statusClass = 'deleted';
            statusLabel = 'Deleted';
        } else if (!change.sha || change.sha.includes('draft_sha_')) {
            statusClass = 'added';
            statusLabel = 'Added';
        }

        let fileIcon = 'fa-file';
        if (path.includes('projects/')) fileIcon = 'fa-diagram-project';
        else if (path.includes('blogs/')) fileIcon = 'fa-newspaper';
        else if (path.includes('profile.json')) fileIcon = 'fa-user-gear';
        else if (path.includes('skills.json')) fileIcon = 'fa-code';
        else if (path.includes('certificates.json')) fileIcon = 'fa-award';

        // Generate human-friendly display name
        let displayName = path;
        if (path === 'data/profile.json') {
            displayName = 'Profile & Hero Settings';
        } else if (path === 'data/skills.json') {
            displayName = 'Tech Stack & Skills';
        } else if (path === 'data/certificates.json') {
            displayName = 'Certificates List';
        } else if (path.includes('content/projects/')) {
            const filename = path.split('/').pop();
            let title = '';
            if (change.content) {
                try {
                    const projData = parseMarkdownYAML(change.content).data;
                    title = projData.title_en;
                } catch (e) {}
            }
            if (!title) {
                title = filename.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            displayName = `Project: ${title}`;
        } else if (path.includes('content/blogs/')) {
            const filename = path.split('/').pop();
            let title = '';
            if (change.content) {
                try {
                    const blogData = parseMarkdownYAML(change.content).data;
                    title = blogData.title_en;
                } catch (e) {}
            }
            if (!title) {
                title = filename.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            displayName = `Blog Post: ${title}`;
        }

        listHTML += `
            <div class="staging-item" data-path="${path}">
                <div class="staging-item-header">
                    <div class="staging-file-info" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.2rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                            <i class="fa-solid ${fileIcon}" style="color: var(--text-muted); font-size: 1.1rem;"></i>
                            <span class="staging-file-name" style="font-weight: 600; font-size: 1.05rem;">${displayName}</span>
                            <span class="staging-status-badge ${statusClass}">${statusLabel}</span>
                        </div>
                        <span class="staging-file-path" style="font-family: monospace; font-size: 0.75rem; color: var(--text-muted); margin-left: 2rem;">${path}</span>
                    </div>
                    
                    <div class="staging-item-actions">
                        <button type="button" class="btn btn-outline btn-sm btn-preview" data-idx="${idx}">
                            <i class="fa-solid fa-magnifying-glass"></i> View Changes
                        </button>
                        <button type="button" class="btn btn-outline btn-sm btn-discard" data-path="${path}" style="border-color: rgba(239, 68, 68, 0.3); color: var(--error-color);">
                            <i class="fa-solid fa-trash-can"></i> Discard
                        </button>
                        <button type="button" class="btn btn-primary btn-sm btn-commit-single" data-path="${path}">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Commit
                        </button>
                    </div>
                </div>
                
                <!-- Collapsible Human-Readable Comparison Pane -->
                <div id="preview-panel-${idx}" class="staging-preview-pane hidden">
                    <pre><code id="preview-code-${idx}"><i class="fa-solid fa-spinner fa-spin"></i> Analyzing changes...</code></pre>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="content-header">
            <div class="content-title">
                <h2><i class="fa-solid fa-list-check"></i> Staging Manager</h2>
                <p>Review and commit staged changes to GitHub.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button type="button" class="btn btn-outline btn-sm" id="btn-discard-all" style="border-color: rgba(239,68,68,0.4); color: var(--error-color);">
                    <i class="fa-solid fa-trash-arrow-up"></i> Discard All
                </button>
                <button type="button" class="btn btn-primary btn-sm" id="btn-commit-all" style="background: var(--success-color); color: black;">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Commit All (${paths.length})
                </button>
            </div>
        </div>

        <div class="staging-list">
            ${listHTML}
        </div>
    `;

    // ─── Setup Event Listeners ───

    // Toggle human-readable preview
    container.querySelectorAll('.btn-preview').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = btn.getAttribute('data-idx');
            const panel = document.getElementById(`preview-panel-${idx}`);
            const codeEl = document.getElementById(`preview-code-${idx}`);
            const path = paths[idx];
            const change = changes[path];

            if (panel.classList.contains('hidden')) {
                panel.classList.remove('hidden');
                btn.innerHTML = `<i class="fa-solid fa-angle-up"></i> Hide Changes`;
                btn.classList.add('active');

                // Generate human-readable comparison by fetching original content first
                let oldText = null;
                try {
                    const res = await fetch('../' + path);
                    if (res.ok) {
                        oldText = await res.text();
                    }
                } catch (err) {
                    console.warn(`Could not load original file for path ${path}:`, err);
                }

                const readableComparison = generateComparison(path, oldText, change.content);
                codeEl.textContent = readableComparison;
            } else {
                panel.classList.add('hidden');
                btn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> View Changes`;
                btn.classList.remove('active');
            }
        });
    });

    // Discard single change
    container.querySelectorAll('.btn-discard').forEach(btn => {
        btn.addEventListener('click', async () => {
            const path = btn.getAttribute('data-path');
            const filename = path.split('/').pop();
            
            const confirmed = await showConfirmModal({
                title: "Discard Draft Changes",
                message: `Are you sure you want to discard your local staged changes for <strong>${filename}</strong>? This will revert this item to its live GitHub version. This action cannot be undone.`,
                confirmText: "Discard Draft",
                cancelText: "Keep Staged",
                type: "danger"
            });

            if (confirmed) {
                const currentChanges = getPendingChanges();
                delete currentChanges[path];
                savePendingChanges(currentChanges);
                
                showToast(`Discarded staging for ${filename}`, 'info');
                initStaging(container, showToast);
            }
        });
    });

    // Commit single change
    container.querySelectorAll('.btn-commit-single').forEach(btn => {
        btn.addEventListener('click', async () => {
            const path = btn.getAttribute('data-path');
            const filename = path.split('/').pop();
            const change = changes[path];

            showToast(`Committing ${filename} to GitHub...`, 'loading');
            btn.disabled = true;

            try {
                if (change.deleted) {
                    await commitDeleteToGitHub(path, change.sha, change.message);
                } else {
                    await commitFileToGitHub(path, change.content, change.sha, change.message);
                }

                const currentChanges = getPendingChanges();
                delete currentChanges[path];
                savePendingChanges(currentChanges);

                showToast(`"${filename}" committed successfully!`, 'success');
                initStaging(container, showToast);
            } catch (err) {
                console.error(`Commit failed for ${path}:`, err);
                showToast(`Commit failed: ${err.message}`, 'error');
                btn.disabled = false;
            }
        });
    });

    // Discard All
    document.getElementById('btn-discard-all').addEventListener('click', async () => {
        const confirmed = await showConfirmModal({
            title: "Discard All Changes",
            message: "Are you sure you want to discard <strong>ALL</strong> staged changes? This will revert your entire website back to the live GitHub repository state. <strong>This action cannot be undone.</strong>",
            confirmText: "Discard All Drafts",
            cancelText: "Keep Drafts",
            type: "danger"
        });

        if (confirmed) {
            localStorage.removeItem('cms_pending_changes');
            window.dispatchEvent(new Event('cms-pending-changes-updated'));
            showToast("All staged changes discarded.", 'info');
            initStaging(container, showToast);
        }
    });

    // Commit All
    document.getElementById('btn-commit-all').addEventListener('click', async () => {
        const confirmed = await showConfirmModal({
            title: "Commit All Staged Changes",
            message: `Are you sure you want to commit all <strong>${paths.length}</strong> changed files to your live GitHub repository?`,
            confirmText: "Publish to GitHub",
            cancelText: "Cancel",
            type: "info"
        });

        if (!confirmed) return;

        const btnAll = document.getElementById('btn-commit-all');
        btnAll.disabled = true;
        showToast(`Committing ${paths.length} changes to GitHub...`, 'loading');

        try {
            for (const path of paths) {
                const change = changes[path];
                if (change.deleted) {
                    await commitDeleteToGitHub(path, change.sha, change.message);
                } else {
                    await commitFileToGitHub(path, change.content, change.sha, change.message);
                }

                const currentChanges = getPendingChanges();
                delete currentChanges[path];
                savePendingChanges(currentChanges);
            }

            // Also clean up any staged media preview caches
            const finalChanges = getPendingChanges();
            Object.keys(finalChanges).forEach(k => {
                if (finalChanges[k].isMedia) {
                    delete finalChanges[k];
                }
            });
            savePendingChanges(finalChanges);

            showToast("All changes committed successfully!", 'success');
            initStaging(container, showToast);
        } catch (err) {
            console.error("Batch commit failed:", err);
            showToast(`Failed to commit changes: ${err.message}`, 'error');
            btnAll.disabled = false;
        }
    });
}
