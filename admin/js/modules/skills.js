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
                    <h3 style="margin-bottom: 1.5rem;"><i class="fa-solid fa-code"></i> Tech Stack & Skills</h3>
                    
                    <div class="field-langs">
                        <!-- English Skills -->
                        <div>
                            <h4 class="lang-header"><i class="fa-solid fa-earth-americas"></i> English Skills Categories</h4>
                            <div id="en-categories-container" class="nested-list"></div>
                            <button type="button" class="btn btn-outline btn-sm" id="btn-add-cat-en" style="margin-top: 1rem;">
                                <i class="fa-solid fa-folder-plus"></i> Add English Category
                            </button>
                        </div>
                        
                        <!-- German Skills -->
                        <div>
                            <h4 class="lang-header"><i class="fa-solid fa-earth-europe"></i> German Skills Categories</h4>
                            <div id="de-categories-container" class="nested-list"></div>
                            <button type="button" class="btn btn-outline btn-sm" id="btn-add-cat-de" style="margin-top: 1rem;">
                                <i class="fa-solid fa-folder-plus"></i> Add German Category
                            </button>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Skills</button>
                    </div>
                </form>
            </div>
        `;

        const enContainer = document.getElementById('en-categories-container');
        const deContainer = document.getElementById('de-categories-container');

        // Render categories and skills for a language
        function renderLangCategories(langData, langContainer) {
            langContainer.innerHTML = '';
            langData.forEach((cat, catIdx) => {
                const catEl = document.createElement('div');
                catEl.className = 'admin-card';
                catEl.style.padding = '1.5rem';
                catEl.style.marginBottom = '1rem';
                catEl.style.background = 'rgba(255,255,255,0.01)';
                
                catEl.innerHTML = `
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 1rem;">
                        <input type="text" value="${cat.category}" placeholder="Category Name" class="cat-title-input" style="font-weight: 600; flex-grow: 1;">
                        <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-cat" title="Delete Category"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <div class="items-list-container" style="display: flex; flex-direction: column; gap: 8px;"></div>
                    <button type="button" class="btn btn-outline btn-sm btn-add-skill" style="margin-top: 0.8rem; font-size: 0.8rem;">
                        <i class="fa-solid fa-plus"></i> Add Skill
                    </button>
                `;

                // Render skills rows
                const itemsContainer = catEl.querySelector('.items-list-container');
                (cat.items || []).forEach((item, itemIdx) => {
                    const itemEl = document.createElement('div');
                    itemEl.className = 'nested-item';
                    itemEl.innerHTML = `
                        <input type="text" value="${item.name}" placeholder="Skill Name" class="skill-name-input" required>
                        <input type="text" value="${item.iconClass}" placeholder="Icon Class (e.g. fa-brands fa-python)" class="skill-icon-input" required>
                        <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-skill" title="Delete Skill"><i class="fa-solid fa-xmark"></i></button>
                    `;

                    // Delete Skill listener
                    itemEl.querySelector('.btn-delete-skill').addEventListener('click', () => {
                        cat.items.splice(itemIdx, 1);
                        renderLangCategories(langData, langContainer);
                    });

                    // Input listeners
                    itemEl.querySelector('.skill-name-input').addEventListener('input', (e) => {
                        item.name = e.target.value;
                    });
                    itemEl.querySelector('.skill-icon-input').addEventListener('input', (e) => {
                        item.iconClass = e.target.value;
                    });

                    itemsContainer.appendChild(itemEl);
                });

                // Delete Category listener
                catEl.querySelector('.btn-delete-cat').addEventListener('click', () => {
                    langData.splice(catIdx, 1);
                    renderLangCategories(langData, langContainer);
                });

                // Category Title listener
                catEl.querySelector('.cat-title-input').addEventListener('input', (e) => {
                    cat.category = e.target.value;
                });

                // Add Skill listener
                catEl.querySelector('.btn-add-skill').addEventListener('click', () => {
                    if (!cat.items) cat.items = [];
                    cat.items.push({ name: '', iconClass: 'fa-solid fa-code' });
                    renderLangCategories(langData, langContainer);
                });

                langContainer.appendChild(catEl);
            });
        }

        // Initialize lists
        const enData = skillsData.en || [];
        const deData = skillsData.de || [];

        renderLangCategories(enData, enContainer);
        renderLangCategories(deData, deContainer);

        // Add English Category button
        document.getElementById('btn-add-cat-en').addEventListener('click', () => {
            enData.push({ category: 'New Category', items: [] });
            renderLangCategories(enData, enContainer);
        });

        // Add German Category button
        document.getElementById('btn-add-cat-de').addEventListener('click', () => {
            deData.push({ category: 'Neue Kategorie', items: [] });
            renderLangCategories(deData, deContainer);
        });

        // Form Submission
        document.getElementById('skills-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showToast("Saving skills configuration...", 'loading');

            const payload = {
                en: enData,
                de: deData
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
