// Profile Settings CRUD module for custom CMS
import { fetchFile, saveFile, uploadMedia } from '../github-api.js';

export async function initProfile(container, showToast) {
    container.innerHTML = `<div class="toast-loading"><i class="fa-solid fa-spinner"></i> Loading profile data...</div>`;

    try {
        const fileData = await fetchFile('data/profile.json');
        const profile = JSON.parse(fileData.content);
        const sha = fileData.sha;

        container.innerHTML = `
            <div class="admin-card">
                <form id="profile-form">
                    <h3 style="margin-bottom: 1.5rem;"><i class="fa-solid fa-user-gear"></i> Profile Settings</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="prof-name" value="${profile.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Profile Picture Path</label>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="prof-image" value="${profile.image || ''}" style="flex-grow: 1;" required>
                                <input type="file" id="prof-image-file" accept="image/*" class="hidden">
                                <button type="button" class="btn btn-outline btn-sm" id="btn-upload-avatar"><i class="fa-solid fa-upload"></i> Upload</button>
                            </div>
                        </div>
                    </div>

                    <h4 class="lang-header"><i class="fa-solid fa-share-nodes"></i> Social Links</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>GitHub Profile URL</label>
                            <input type="url" id="social-github" value="${profile.socials?.github || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>LinkedIn Profile URL</label>
                            <input type="url" id="social-linkedin" value="${profile.socials?.linkedin || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="social-email" value="${profile.socials?.email || ''}" required>
                        </div>
                    </div>

                    <div class="field-langs">
                        <div>
                            <h4 class="lang-header"><i class="fa-solid fa-earth-americas"></i> English Hero Content</h4>
                            <div class="form-group">
                                <label>Job Title</label>
                                <input type="text" id="prof-title-en" value="${profile.en?.title || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Motto / Description</label>
                                <textarea id="prof-motto-en" required>${profile.en?.motto || ''}</textarea>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="lang-header"><i class="fa-solid fa-earth-europe"></i> German Hero Content</h4>
                            <div class="form-group">
                                <label>Job Title (DE)</label>
                                <input type="text" id="prof-title-de" value="${profile.de?.title || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Motto / Description (DE)</label>
                                <textarea id="prof-motto-de" required>${profile.de?.motto || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <h4 class="lang-header"><i class="fa-solid fa-file-pdf"></i> Resumes / CVs</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>English Resume (PDF)</label>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="prof-resume-en" value="${profile.resume?.en || ''}" style="flex-grow: 1;" required>
                                <input type="file" id="prof-resume-en-file" accept="application/pdf" class="hidden">
                                <button type="button" class="btn btn-outline btn-sm" id="btn-upload-pdf-en"><i class="fa-solid fa-upload"></i> Upload</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>German Resume (PDF)</label>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="prof-resume-de" value="${profile.resume?.de || ''}" style="flex-grow: 1;" required>
                                <input type="file" id="prof-resume-de-file" accept="application/pdf" class="hidden">
                                <button type="button" class="btn btn-outline btn-sm" id="btn-upload-pdf-de"><i class="fa-solid fa-upload"></i> Upload</button>
                            </div>
                        </div>
                    </div>

                    <div class="actions-bar">
                        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Save Profile</button>
                    </div>
                </form>
            </div>
        `;

        // ─── Setup Upload Event Listeners ───
        const avatarInput = document.getElementById('prof-image');
        const avatarFile = document.getElementById('prof-image-file');
        document.getElementById('btn-upload-avatar').addEventListener('click', () => avatarFile.click());
        avatarFile.addEventListener('change', async () => {
            if (avatarFile.files.length === 0) return;
            const file = avatarFile.files[0];
            showToast(`Uploading avatar image: ${file.name}...`, 'loading');
            try {
                // Upload avatar to assets/images
                const path = await uploadMedia(file, 'assets/images');
                avatarInput.value = path;
                showToast("Avatar image uploaded successfully!", 'success');
            } catch (err) {
                showToast(`Upload failed: ${err.message}`, 'error');
            }
        });

        // English PDF Resume upload
        const resumeEnInput = document.getElementById('prof-resume-en');
        const resumeEnFile = document.getElementById('prof-resume-en-file');
        document.getElementById('btn-upload-pdf-en').addEventListener('click', () => resumeEnFile.click());
        resumeEnFile.addEventListener('change', async () => {
            if (resumeEnFile.files.length === 0) return;
            const file = resumeEnFile.files[0];
            showToast(`Uploading English CV: ${file.name}...`, 'loading');
            try {
                const path = await uploadMedia(file, 'assets/resume');
                resumeEnInput.value = path;
                showToast("English CV uploaded successfully!", 'success');
            } catch (err) {
                showToast(`Upload failed: ${err.message}`, 'error');
            }
        });

        // German PDF Resume upload
        const resumeDeInput = document.getElementById('prof-resume-de');
        const resumeDeFile = document.getElementById('prof-resume-de-file');
        document.getElementById('btn-upload-pdf-de').addEventListener('click', () => resumeDeFile.click());
        resumeDeFile.addEventListener('change', async () => {
            if (resumeDeFile.files.length === 0) return;
            const file = resumeDeFile.files[0];
            showToast(`Uploading German CV: ${file.name}...`, 'loading');
            try {
                const path = await uploadMedia(file, 'assets/resume');
                resumeDeInput.value = path;
                showToast("German CV uploaded successfully!", 'success');
            } catch (err) {
                showToast(`Upload failed: ${err.message}`, 'error');
            }
        });

        // ─── Setup Form Submit Listener ───
        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showToast("Saving profile details to GitHub...", 'loading');

            const updatedProfile = {
                name: document.getElementById('prof-name').value,
                image: document.getElementById('prof-image').value,
                socials: {
                    github: document.getElementById('social-github').value,
                    linkedin: document.getElementById('social-linkedin').value,
                    email: document.getElementById('social-email').value
                },
                en: {
                    title: document.getElementById('prof-title-en').value,
                    motto: document.getElementById('prof-motto-en').value
                },
                de: {
                    title: document.getElementById('prof-title-de').value,
                    motto: document.getElementById('prof-motto-de').value
                },
                resume: {
                    en: document.getElementById('prof-resume-en').value,
                    de: document.getElementById('prof-resume-de').value
                }
            };

            try {
                const newSha = await saveFile(
                    'data/profile.json',
                    JSON.stringify(updatedProfile, null, 2),
                    sha,
                    "Update profile settings via Custom CMS"
                );
                showToast("Profile settings saved successfully!", 'success');
                // Reload profile panel to refresh sha
                initProfile(container, showToast);
            } catch (err) {
                showToast(`Save failed: ${err.message}`, 'error');
            }
        });

    } catch (err) {
        container.innerHTML = `
            <div class="admin-card" style="border-color: var(--error-color);">
                <h3><i class="fa-solid fa-circle-exclamation" style="color: var(--error-color);"></i> Error Loading Profile</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">${err.message}</p>
                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()"><i class="fa-solid fa-arrows-rotate"></i> Retry</button>
            </div>
        `;
    }
}
