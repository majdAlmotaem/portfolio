// GitHub Contents API Client Wrapper for custom CMS
import { getAuth } from './auth.js';

// UTF-8 safe base64 decoding
function decodeBase64UTF8(base64Str) {
    const raw = window.atob(base64Str.replace(/\s/g, ''));
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
        bytes[i] = raw.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}

// UTF-8 safe base64 encoding
function encodeBase64UTF8(str) {
    const bytes = new TextEncoder().encode(str);
    let binString = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binString += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binString);
}

// Local draft storage key
const DRAFT_KEY = 'cms_pending_changes';

export function getPendingChanges() {
    try {
        return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {};
    } catch (e) {
        return {};
    }
}

export function savePendingChanges(changes) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(changes));
    // Dispatch custom event to notify listeners
    window.dispatchEvent(new Event('cms-pending-changes-updated'));
}

export function clearPendingChanges() {
    localStorage.removeItem(DRAFT_KEY);
    window.dispatchEvent(new Event('cms-pending-changes-updated'));
}

// Fetch file metadata and content, checking local drafts first
export async function fetchFile(path) {
    const changes = getPendingChanges();
    if (changes[path]) {
        if (changes[path].deleted) {
            throw new Error(`File not found: ${path} (staged for deletion)`);
        }
        return {
            content: changes[path].content,
            sha: changes[path].sha,
            path: path,
            name: path.split('/').pop()
        };
    }

    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${path}?ref=${auth.branch}`, {
        headers: {
            'Authorization': `token ${auth.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`File not found: ${path}`);
        }
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const fileData = await response.json();
    const content = decodeBase64UTF8(fileData.content);
    
    return {
        content: content,
        sha: fileData.sha,
        path: fileData.path,
        name: fileData.name
    };
}

// Stage a save locally
export async function saveFile(path, contentStr, sha = null, message = "Update file via CMS") {
    const changes = getPendingChanges();
    changes[path] = {
        content: contentStr,
        sha: sha || (changes[path] ? changes[path].sha : null),
        message: message,
        deleted: false
    };
    savePendingChanges(changes);
    
    const mockSha = sha ? `${sha}_draft_${Date.now()}` : `draft_sha_${Date.now()}`;
    return mockSha;
}

// Stage a deletion locally
export async function deleteFile(path, sha, message = "Delete file via CMS") {
    const changes = getPendingChanges();
    changes[path] = {
        deleted: true,
        sha: sha,
        message: message
    };
    savePendingChanges(changes);
    return true;
}

// List directory merging staged additions and filtering staged deletions
export async function listDirectory(path) {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${path}?ref=${auth.branch}`, {
        headers: {
            'Authorization': `token ${auth.token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    let files = [];
    if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
            files = data.filter(item => item.type === 'file');
        }
    }

    // Apply staged draft changes
    const changes = getPendingChanges();
    const prefix = path.endsWith('/') ? path : `${path}/`;
    
    // Map existing files and filter deleted ones
    let result = files.map(f => {
        const draft = changes[f.path];
        if (draft && draft.deleted) return null;
        return f;
    }).filter(Boolean);

    // Add new files from pendingChanges that aren't in the GitHub response
    Object.keys(changes).forEach(filePath => {
        if (filePath.startsWith(prefix)) {
            const fileName = filePath.substring(prefix.length);
            if (!changes[filePath].deleted && !result.some(f => f.path === filePath)) {
                result.push({
                    name: fileName,
                    path: filePath,
                    type: 'file'
                });
            }
        }
    });

    return result;
}

// Actual GitHub Committing logic for when Save & Commit is clicked
export async function commitFileToGitHub(path, contentStr, sha = null, message = "Update file via CMS") {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const base64Content = encodeBase64UTF8(contentStr);

    const body = {
        message: message,
        content: base64Content,
        branch: auth.branch
    };

    if (sha && !sha.includes('draft')) {
        body.sha = sha;
    }

    const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${auth.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to commit file: ${response.statusText}`);
    }

    const resData = await response.json();
    return resData.content.sha;
}

export async function commitDeleteToGitHub(path, sha, message = "Delete file via CMS") {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const body = {
        message: message,
        branch: auth.branch
    };

    if (sha && !sha.includes('draft')) {
        body.sha = sha;
    }

    const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `token ${auth.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to commit delete: ${response.statusText}`);
    }

    return true;
}

// Upload a binary file (Image / PDF) to GitHub
export async function uploadMedia(file, targetDir) {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const base64Content = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        // FileReader converts to dataurl base64
        reader.onload = () => {
            const dataUrl = reader.result;
            const base64 = dataUrl.substring(dataUrl.indexOf(',') + 1);
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const filePath = `${targetDir}/${file.name}`;

    // Detect if file exists to fetch sha and overwrite (using direct metadata fetch to avoid binary decode errors)
    let sha = null;
    try {
        const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${filePath}?ref=${auth.branch}`, {
            headers: {
                'Authorization': `token ${auth.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (response.ok) {
            const fileData = await response.json();
            if (fileData && fileData.sha) {
                sha = fileData.sha;
            }
        }
    } catch (e) {
        console.warn("Failed to check existing file metadata:", e);
    }

    const body = {
        message: `Upload media: ${file.name} via CMS`,
        content: base64Content,
        branch: auth.branch
    };

    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(`https://api.github.com/repos/${auth.owner}/${auth.repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${auth.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Media upload failed: ${response.statusText}`);
    }

    // Stage locally for instant preview
    try {
        const changes = getPendingChanges();
        changes[filePath] = {
            content: `data:${file.type};base64,${base64Content}`,
            sha: sha || null,
            message: `Upload media: ${file.name} via CMS`,
            deleted: false,
            isMedia: true
        };
        savePendingChanges(changes);
    } catch (e) {
        console.warn("Could not stage uploaded media to localStorage:", e);
    }

    return filePath;
}
