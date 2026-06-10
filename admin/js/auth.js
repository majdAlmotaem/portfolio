// Authentication state manager for custom CMS

// Token expires after 2 hours for security
const TOKEN_TTL = 2 * 60 * 60 * 1000;

export function getAuth() {
    const expiresAt = sessionStorage.getItem('cms_github_token_expires');
    
    // Check if token has expired
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
        clearAuth();
        return null;
    }
    
    const token = sessionStorage.getItem('cms_github_token');
    const owner = sessionStorage.getItem('cms_github_owner') || 'majdAlmotaem';
    const repo = sessionStorage.getItem('cms_github_repo') || 'portfolio';
    const branch = sessionStorage.getItem('cms_github_branch') || 'dynamic';
    
    if (!token) return null;
    return { token, owner, repo, branch };
}

export function setAuth(token, owner, repo, branch) {
    sessionStorage.setItem('cms_github_token', token.trim());
    sessionStorage.setItem('cms_github_token_expires', Date.now() + TOKEN_TTL);
    sessionStorage.setItem('cms_github_owner', owner.trim());
    sessionStorage.setItem('cms_github_repo', repo.trim());
    sessionStorage.setItem('cms_github_branch', branch.trim());
}

export function clearAuth() {
    sessionStorage.removeItem('cms_github_token');
    sessionStorage.removeItem('cms_github_token_expires');
    sessionStorage.removeItem('cms_github_owner');
    sessionStorage.removeItem('cms_github_repo');
    sessionStorage.removeItem('cms_github_branch');
}

export function isLoggedIn() {
    return !!getAuth();
}

export async function validateCredentials(token, owner, repo, branch) {
    const cleanToken = token.trim();
    const cleanOwner = owner.trim();
    const cleanRepo = repo.trim();
    const cleanBranch = branch.trim();

    try {
        // 1. Fetch Authenticated User details to enforce identity checks
        const userResponse = await fetch(`https://api.github.com/user`, {
            headers: {
                'Authorization': `token ${cleanToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!userResponse.ok) {
            if (userResponse.status === 401 || userResponse.status === 403) {
                throw new Error("Invalid GitHub Token or authorization failed.");
            }
            throw new Error(`Connection error fetching user profile: ${userResponse.statusText}`);
        }
        
        const userData = await userResponse.json();
        if (userData.login.toLowerCase() !== cleanOwner.toLowerCase()) {
            throw new Error(`Access Denied: GitHub user '${userData.login}' is not authorized to edit this portfolio.`);
        }

        // 2. Fetch Repository Details to verify existence & write permissions
        const response = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}`, {
            headers: {
                'Authorization': `token ${cleanToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Repository not found. Verify owner and repository names in config.json.");
            }
            throw new Error(`Connection error: ${response.statusText}`);
        }
        
        const repoData = await response.json();
        
        // Check if token has write permission (permissions.push)
        if (!repoData.permissions || !repoData.permissions.push) {
            throw new Error("Write access denied. Ensure your GitHub App has write access to repository contents.");
        }
        
        // 3. Fetch Branch Details to verify it exists
        const branchResponse = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/branches/${cleanBranch}`, {
            headers: {
                'Authorization': `token ${cleanToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!branchResponse.ok) {
            throw new Error(`Branch '${cleanBranch}' not found in this repository.`);
        }
        
        return true;
    } catch (error) {
        console.error("Auth validation failed:", error);
        throw error;
    }
}
