// Media Uploads manager module for custom CMS
import { uploadMedia } from '../github-api.js';

export function initUploads(container, showToast) {
    container.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom: 1.5rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Asset Uploader</h3>
            
            <div class="form-group" style="margin-bottom: 2rem; max-width: 320px;">
                <label>Target Destination Folder</label>
                <select id="upload-destination" style="background: var(--input-bg);">
                    <option value="assets/images">Images Directory (assets/images/)</option>
                    <option value="assets/uploads">Uploads Directory (assets/uploads/)</option>
                    <option value="assets/resume">Resume Directory (assets/resume/)</option>
                </select>
            </div>

            <div class="uploader-box" id="drop-zone">
                <div class="uploader-icon"><i class="fa-solid fa-file-arrow-up"></i></div>
                <p>Drag & Drop your files here</p>
                <span>or click to browse from your computer</span>
                <input type="file" id="file-input" multiple class="hidden">
            </div>

            <h4 class="lang-header" style="margin-top: 2rem;"><i class="fa-solid fa-clock-rotate-left"></i> Uploaded Assets (This Session)</h4>
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Relative Path (Copy this for forms)</th>
                            <th style="width: 150px; text-align: right;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="uploads-tbody">
                        <tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No uploads during this session yet.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const destSelect = document.getElementById('upload-destination');
    const tbody = document.getElementById('uploads-tbody');
    
    // Store uploaded list in session or standard array
    const uploadedList = [];

    // Trigger click on browse
    dropZone.addEventListener('click', () => fileInput.click());

    // File selection listener
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    // Drag-and-drop listeners
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Processes selected/dropped files
    async function handleFiles(files) {
        if (files.length === 0) return;
        const targetDir = destSelect.value;

        for (const file of files) {
            showToast(`Uploading ${file.name}...`, 'loading');
            try {
                const path = await uploadMedia(file, targetDir);
                showToast(`Uploaded ${file.name} successfully!`, 'success');
                
                uploadedList.unshift({
                    name: file.name,
                    path: path
                });
                
                renderUploadsList();
            } catch (err) {
                showToast(`Failed to upload ${file.name}: ${err.message}`, 'error');
            }
        }
        
        // Reset file input
        fileInput.value = '';
    }

    // Renders session files list
    function renderUploadsList() {
        if (uploadedList.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No uploads during this session yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = '';
        uploadedList.forEach((item, idx) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="font-weight: 600;">${item.name}</td>
                <td><code style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-family: monospace;">${item.path}</code></td>
                <td style="text-align: right;">
                    <button type="button" class="btn btn-outline btn-sm btn-copy-path" data-path="${item.path}"><i class="fa-solid fa-copy"></i> Copy Path</button>
                </td>
            `;

            row.querySelector('.btn-copy-path').addEventListener('click', (e) => {
                const btn = e.currentTarget;
                const path = btn.getAttribute('data-path');
                
                navigator.clipboard.writeText(path).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<i class="fa-solid fa-check" style="color: var(--success-color);"></i> Copied!`;
                    btn.style.borderColor = 'var(--success-color)';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.borderColor = '';
                    }, 1500);
                }).catch(err => {
                    showToast("Failed to copy to clipboard", 'error');
                });
            });

            tbody.appendChild(row);
        });
    }
}
