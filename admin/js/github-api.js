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

// Fetch file metadata and content from GitHub
export async function fetchFile(path) {
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

// Create or update a file on GitHub
export async function saveFile(path, contentStr, sha = null, message = "Update file via CMS") {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const base64Content = encodeBase64UTF8(contentStr);

    const body = {
        message: message,
        content: base64Content,
        branch: auth.branch
    };

    if (sha) {
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
        throw new Error(errorData.message || `Failed to save file: ${response.statusText}`);
    }

    const resData = await response.json();
    return resData.content.sha; // Returns new sha
}

// Delete a file on GitHub
export async function deleteFile(path, sha, message = "Delete file via CMS") {
    const auth = getAuth();
    if (!auth) throw new Error("Not authenticated");

    const body = {
        message: message,
        sha: sha,
        branch: auth.branch
    };

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
        throw new Error(errorData.message || `Failed to delete file: ${response.statusText}`);
    }

    return true;
}

// List directory files on GitHub
export async function listDirectory(path) {
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
            return []; // Directory doesn't exist or is empty
        }
        throw new Error(`Failed to list directory: ${response.statusText}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) {
        return data.filter(item => item.type === 'file');
    }
    return [];
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

    // Detect if file exists to fetch sha and overwrite
    let sha = null;
    try {
        const existing = await fetchFile(filePath);
        if (existing && existing.sha) {
            sha = existing.sha;
        }
    } catch (e) {
        // Safe to ignore if 404
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

    return filePath;
}
