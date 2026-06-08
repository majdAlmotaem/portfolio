// Skills Management CRUD module for custom CMS
import { fetchFile, saveFile } from '../github-api.js';

export async function initSkills(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading skills data...</div>`;

    try {
        const fileData = await fetchFile('data/skills.json');
        const skillsData = JSON.parse(fileData.content);
        const sha = fileData.sha;

        container.innerHTML = `
            <div class="admin-card">
                <form id="skills-form">
                    <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-code"></i> Tech Stack & Skills</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">Manage your tech stack categories and skills. Edits made here will automatically be applied to both English and German views.</p>
                    
                    <div>
                        <div id="skills-categories-container" class="nested-list"></div>
                        <button type="button" class="btn btn-outline btn-sm" id="btn-add-category" style="margin-top: 1.5rem;">
                            <i class="fa-solid fa-folder-plus"></i> Add Category
                        </button>
                    </div>

                    <div class="actions-bar">
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Skills</button>
                    </div>
                </form>
            </div>
        `;

        const categoriesContainer = document.getElementById('skills-categories-container');

        // Render categories and skills for a language
        function renderCategories(langData, langContainer) {
            langContainer.innerHTML = '';
            langData.forEach((cat, catIdx) => {
                const catEl = document.createElement('div');
                catEl.className = 'admin-card';
                catEl.style.padding = '1.5rem';
                catEl.style.marginBottom = '1rem';
                catEl.style.background = 'rgba(255,255,255,0.01)';
                
                catEl.innerHTML = `
                    <div style="display: flex; gap: 12px; align-items: flex-end; margin-bottom: 1.5rem; width: 100%;">
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 4px;">
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-align: left;">Category Title</span>
                            <input type="text" value="${cat.category}" placeholder="e.g. Frontend Languages" class="cat-title-input" style="font-weight: 600; width: 100%; padding: 0.6rem 0.8rem; background: var(--input-bg); border: 1px solid var(--glass-border); border-radius: 0.5rem; color: white;">
                        </div>
                        <button type="button" class="btn btn-danger btn-delete-cat" title="Delete Category" style="padding: 0.65rem; border-radius: 0.5rem;"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <div class="items-list-container" style="display: flex; flex-direction: column; gap: 8px;"></div>
                    <button type="button" class="btn btn-outline btn-sm btn-add-skill" style="margin-top: 1rem; font-size: 0.8rem; border-radius: 0.4rem;">
                        <i class="fa-solid fa-plus"></i> Add Skill Item
                    </button>
                `;

                // Render skills rows
                const itemsContainer = catEl.querySelector('.items-list-container');
                (cat.items || []).forEach((item, itemIdx) => {
                    const itemEl = document.createElement('div');
                    itemEl.style.width = '100%';
                    itemEl.innerHTML = `
                        <div class="nested-item" style="display: flex; flex-direction: column; gap: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); padding: 1.25rem 1rem 1rem 1rem; border-radius: 0.75rem; margin-bottom: 0.5rem; position: relative; width: 100%;">
                            <!-- Absolute positioned Delete button in the top right -->
                            <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-skill" title="Delete Skill" style="position: absolute; top: 10px; right: 10px; height: 26px; width: 26px; border-radius: 0.35rem; display: flex; align-items: center; justify-content: center; padding: 0; min-height: 0;">
                                <i class="fa-solid fa-xmark" style="font-size: 0.8rem;"></i>
                            </button>

                            <!-- Skill Name Input (Stacked) -->
                            <div style="display: flex; flex-direction: column; gap: 4px; text-align: left; padding-right: 28px;">
                                <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">Skill Name</span>
                                <input type="text" value="${item.name}" placeholder="e.g. Python" class="skill-name-input" required style="padding: 0.5rem 0.75rem; font-size: 0.9rem; background: var(--input-bg); border: 1px solid var(--glass-border); border-radius: 0.4rem; color: white; width: 100%; box-sizing: border-box;">
                            </div>

                            <!-- Skill Icon Class Input (Stacked) -->
                            <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
                                <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">FontAwesome Icon Class</span>
                                <div style="display: flex; gap: 8px; align-items: center; width: 100%;">
                                    <div class="icon-preview-box" style="width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: var(--input-bg); border: 1px solid var(--glass-border); border-radius: 0.4rem; font-size: 1.15rem; color: var(--text-color); flex-shrink: 0;">
                                        <i class="${item.iconClass || 'fa-solid fa-code'}"></i>
                                    </div>
                                    <input type="text" value="${item.iconClass}" placeholder="e.g. fa-brands fa-python" class="skill-icon-input" required style="padding: 0.5rem 0.75rem; font-size: 0.9rem; background: var(--input-bg); border: 1px solid var(--glass-border); border-radius: 0.4rem; color: white; flex-grow: 1; box-sizing: border-box;">
                                </div>
                            </div>
                        </div>
                    `;

                    // Delete Skill listener
                    itemEl.querySelector('.btn-delete-skill').addEventListener('click', () => {
                        cat.items.splice(itemIdx, 1);
                        renderCategories(langData, langContainer);
                    });

                    // Input listeners
                    itemEl.querySelector('.skill-name-input').addEventListener('input', (e) => {
                        item.name = e.target.value;
                    });
                    itemEl.querySelector('.skill-icon-input').addEventListener('input', (e) => {
                        item.iconClass = e.target.value;
                        const previewIcon = itemEl.querySelector('.icon-preview-box i');
                        if (previewIcon) {
                            previewIcon.className = e.target.value || 'fa-solid fa-code';
                        }
                    });

                    itemsContainer.appendChild(itemEl);
                });

                // Delete Category listener
                catEl.querySelector('.btn-delete-cat').addEventListener('click', () => {
                    langData.splice(catIdx, 1);
                    renderCategories(langData, langContainer);
                });

                // Category Title listener
                catEl.querySelector('.cat-title-input').addEventListener('input', (e) => {
                    cat.category = e.target.value;
                });

                // Add Skill listener
                catEl.querySelector('.btn-add-skill').addEventListener('click', () => {
                    if (!cat.items) cat.items = [];
                    cat.items.push({ name: '', iconClass: 'fa-solid fa-code' });
                    renderCategories(langData, langContainer);
                });

                langContainer.appendChild(catEl);
            });
        }

        // Initialize lists using English skills as the master source
        const unifiedData = skillsData.en || skillsData.de || [];

        renderCategories(unifiedData, categoriesContainer);

        // Add Category button
        document.getElementById('btn-add-category').addEventListener('click', () => {
            unifiedData.push({ category: 'New Category', items: [] });
            renderCategories(unifiedData, categoriesContainer);
        });

        // Form Submission
        document.getElementById('skills-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showToast("Saving skills configuration...", 'loading');

            const payload = {
                en: unifiedData,
                de: unifiedData
            };

            try {
                const newSha = await saveFile(
                    'data/skills.json',
                    JSON.stringify(payload, null, 2),
                    sha,
                    "Update skills categories via Custom CMS"
                );
                showToast("Skills list saved successfully!", 'success');
                initSkills(container, showToast); // Reload panel
            } catch (err) {
                showToast(`Save failed: ${err.message}`, 'error');
            }
        });

    } catch (err) {
        container.innerHTML = `
            <div class="admin-card" style="border-color: var(--error-color);">
                <h3><i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i> Error Loading Skills</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Retry</button>
            </div>
        `;
    }
}
