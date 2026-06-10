// Certificates CRUD module for custom CMS
import { fetchFile, saveFile, uploadMedia } from '../github-api.js';

export async function initCertificates(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading certificates data...</div>`;

    try {
        const fileData = await fetchFile('data/certificates.json');
        const certData = JSON.parse(fileData.content);
        const sha = fileData.sha;
        const certs = certData.certificates || [];

        renderList(certs, sha, container, showToast);
    } catch (err) {
        container.innerHTML = `
            <div class="admin-card" style="border-color: var(--error-color);">
                <h3><i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i> Error Loading Certificates</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Retry</button>
            </div>
        `;
    }
}

// Renders certificates index list
function renderList(certs, sha, container, showToast) {
    let listHTML = `
        <div class="admin-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0;"><i class="fa-solid fa-award"></i> Certificates</h3>
                <button type="button" class="btn btn-primary" id="btn-add-cert"><i class="fa-solid fa-plus"></i> Add Certificate</button>
            </div>
            
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Certificate Title (EN)</th>
                            <th>Issuer</th>
                            <th>Icon</th>
                            <th style="width: 150px; text-align: right;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="certs-tbody">
    `;

    if (certs.length === 0) {
        listHTML += `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No certificates found. Click "Add Certificate" to create one.</td></tr>`;
    } else {
        certs.forEach((cert, idx) => {
            listHTML += `
                <tr>
                    <td>
                        ${cert.image ? `<img src="../${cert.image}" class="thumbnail" alt="Preview">` : `<div class="thumbnail" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);"><i class="fa-solid fa-image" style="color:var(--text-muted);"></i></div>`}
                    </td>
                    <td style="font-weight: 600;">${cert.en?.title || ''}</td>
                    <td style="color: var(--text-muted);">${cert.en?.issuer || ''}</td>
                    <td><i class="${cert.iconClass || 'fa-solid fa-award'}"></i></td>
                    <td style="text-align: right;">
                        <button type="button" class="btn btn-outline btn-sm btn-icon-only btn-edit-cert" data-idx="${idx}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-danger btn-sm btn-icon-only btn-delete-cert" data-idx="${idx}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
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

    // Attach list action listeners
    document.getElementById('btn-add-cert').addEventListener('click', () => {
        renderForm(null, certs, sha, container, showToast);
    });

    container.querySelectorAll('.btn-edit-cert').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            renderForm(idx, certs, sha, container, showToast);
        });
    });

    container.querySelectorAll('.btn-delete-cert').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const title = certs[idx].en?.title || 'this certificate';
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                certs.splice(idx, 1);
                await saveCertificatesList(certs, sha, showToast, () => initCertificates(container, showToast));
            }
        });
    });
}

// Renders the add/edit form for a certificate
function renderForm(idx, certs, sha, container, showToast) {
    const isEdit = idx !== null;
    const cert = isEdit ? certs[idx] : {
        iconClass: 'fa-solid fa-graduation-cap',
        image: '',
        en: { title: '', issuer: '' },
        de: { title: '', issuer: '' }
    };

    container.innerHTML = `
        <div class="admin-card">
            <h3 style="margin-bottom: 2rem;"><i class="fa-solid fa-award"></i> ${isEdit ? 'Edit' : 'Add'} Certificate</h3>
            
            <form id="cert-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Certificate Image Path</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" id="cert-image" value="${cert.image || ''}" style="flex-grow: 1;" required>
                            <input type="file" id="cert-image-file" accept="image/*" class="hidden">
                            <button type="button" class="btn btn-outline btn-sm" id="btn-upload-cert-img"><i class="fa-solid fa-upload"></i> Upload</button>
                        </div>
                    </div>
                </div>

                <div class="field-langs">
                    <div class="lang-field-en">
                        <h4 class="lang-header"><i class="fa-solid fa-earth-americas"></i> English Certificate Details</h4>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" id="cert-title-en" value="${cert.en?.title || ''}">
                        </div>
                        <div class="form-group">
                            <label>Issuer</label>
                            <input type="text" id="cert-issuer-en" value="${cert.en?.issuer || ''}">
                        </div>
                    </div>
                    
                    <div class="lang-field-de">
                        <h4 class="lang-header"><i class="fa-solid fa-earth-europe"></i> German Certificate Details</h4>
                        <div class="form-group">
                            <label>Zertifikat Titel (DE)</label>
                            <input type="text" id="cert-title-de" value="${cert.de?.title || ''}">
                        </div>
                        <div class="form-group">
                            <label>Aussteller (DE)</label>
                            <input type="text" id="cert-issuer-de" value="${cert.de?.issuer || ''}">
                        </div>
                    </div>
                </div>

                <div class="actions-bar">
                    <button type="button" class="btn btn-outline" id="btn-cancel-cert">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Certificate</button>
                </div>
            </form>
        </div>
    `;

    // Upload Listener
    const imageInput = document.getElementById('cert-image');
    const fileInput = document.getElementById('cert-image-file');
    document.getElementById('btn-upload-cert-img').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
        if (fileInput.files.length === 0) return;
        const file = fileInput.files[0];
        showToast(`Uploading certificate image: ${file.name}...`, 'loading');
        try {
            const path = await uploadMedia(file, 'assets/images');
            imageInput.value = path;
            showToast("Certificate image uploaded successfully!", 'success');
        } catch (err) {
            showToast(`Upload failed: ${err.message}`, 'error');
        }
    });

    // Helper for Cert Icons
    function getIconClassForCert(title) {
        const t = title.toLowerCase();
        if (t.includes('aws') || t.includes('cloud')) return 'fa-brands fa-aws';
        if (t.includes('python')) return 'fa-brands fa-python';
        if (t.includes('cisco') || t.includes('network')) return 'fa-solid fa-network-wired';
        if (t.includes('generative') || t.includes('ai') || t.includes('artificial')) return 'fa-solid fa-brain';
        if (t.includes('uml') || t.includes('class diagram') || t.includes('design')) return 'fa-solid fa-diagram-project';
        if (t.includes('data science') || t.includes('analysis')) return 'fa-solid fa-chart-line';
        if (t.includes('prompt')) return 'fa-solid fa-comment-dots';
        if (t.includes('it specialist') || t.includes('application') || t.includes('develop')) return 'fa-solid fa-graduation-cap';
        return 'fa-solid fa-award'; // default fallback
    }

    // Cancel Listener
    document.getElementById('btn-cancel-cert').addEventListener('click', () => {
        renderList(certs, sha, container, showToast);
    });

    // Form Submit Listener
    document.getElementById('cert-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        showToast("Saving certificate list...", 'loading');

        const titleEn = document.getElementById('cert-title-en').value;
        const updatedCert = {
            iconClass: getIconClassForCert(titleEn),
            image: document.getElementById('cert-image').value,
            en: {
                title: titleEn,
                issuer: document.getElementById('cert-issuer-en').value || ""
            },
            de: {
                title: document.getElementById('cert-title-de').value || titleEn,
                issuer: document.getElementById('cert-issuer-de').value || ""
            }
        };

        if (isEdit) {
            certs[idx] = updatedCert;
        } else {
            certs.push(updatedCert);
        }

        await saveCertificatesList(certs, sha, showToast, () => initCertificates(container, showToast));
    });
}

// Saves list back to GitHub
async function saveCertificatesList(certsList, sha, showToast, onSuccess) {
    const payload = {
        certificates: certsList
    };

    try {
        await saveFile(
            'data/certificates.json',
            JSON.stringify(payload, null, 2),
            sha,
            "Update certificates list via Custom CMS"
        );
        showToast("Certificates saved successfully!", 'success');
        onSuccess();
    } catch (err) {
        showToast(`Save failed: ${err.message}`, 'error');
    }
}
