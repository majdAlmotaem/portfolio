// Main Orchestrator App for Custom CMS
import { isLoggedIn, getAuth, setAuth, clearAuth, validateCredentials } from './auth.js';
import { initProfile } from './modules/profile.js';
import { initProjects } from './modules/projects.js';
import { initSkills } from './modules/skills.js';
import { initCertificates } from './modules/certificates.js';
import { initBlogs } from './modules/blogs.js';
import { initStaging } from './modules/staging.js';
import { getPendingChanges, clearPendingChanges, commitFileToGitHub, commitDeleteToGitHub } from './github-api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loginOverlay = document.getElementById('login-screen');
    const adminContainer = document.getElementById('admin-container');
    const workspace = document.getElementById('workspace-container');
    const menuItems = document.querySelectorAll('.menu-item');
    const btnLogout = document.getElementById('btn-logout');
    const btnGithubLogin = document.getElementById('btn-github-login');
    
    // Default configs (will be overridden by config.json)
    let config = {
        owner: 'majdAlmotaem',
        repo: 'portfolio',
        branch: 'dynamic',
        clientId: '',
        authProxyUrl: ''
    };

    // Load configurations
    try {
        const configRes = await fetch('./config.json');
        if (configRes.ok) {
            const data = await configRes.json();
            config = { ...config, ...data };
        }
    } catch (e) {
        console.warn("Could not load config.json", e);
    }

    // ─── Initialize Auth Flow ───
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // Strip code parameter from URL immediately
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        showToast("Exchanging authorization code...", "loading");
        try {
            if (!config.authProxyUrl) {
                throw new Error("Auth Proxy URL is not configured in admin/config.json.");
            }

            // POST authorization code to our backend auth proxy
            const response = await fetch(config.authProxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });

            if (!response.ok) {
                let errorMsg = `Proxy returned error: ${response.statusText}`;
                try {
                    const errData = await response.json();
                    if (errData && errData.error) {
                        errorMsg = errData.error;
                    }
                } catch (e) {
                    console.error("Failed to parse error response JSON from auth proxy:", e);
                }
                throw new Error(errorMsg);
            }

            const resData = await response.json();
            const token = resData.token;

            if (!token) {
                throw new Error("No token returned from auth proxy server.");
            }

            showToast("Verifying identity and repository permissions...", "loading");
            // Validate user and repo write permissions
            await validateCredentials(token, config.owner, config.repo, config.branch);

            // Store credentials in sessionStorage
            setAuth(token, config.owner, config.repo, config.branch);

            showToast("Successfully authenticated!", "success");
            setupDashboard({ token, owner: config.owner, repo: config.repo, branch: config.branch });
        } catch (err) {
            console.error("OAuth Exchange Error details:", err);
            showToast(err.message || "Failed to exchange authorization token.", "error");
            showLoginOverlay();
        }
    } else if (isLoggedIn()) {
        const auth = getAuth();
        setupDashboard(auth);
    } else {
        showLoginOverlay();
    }

    function showLoginOverlay() {
        loginOverlay.classList.remove('hidden');
        adminContainer.classList.add('hidden');
        
        btnGithubLogin.onclick = () => {
            if (!config.clientId) {
                showToast("GitHub Client ID is not configured in admin/config.json.", "error");
                return;
            }
            
            const redirectUri = window.location.origin + window.location.pathname;
            const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=repo&redirect_uri=${encodeURIComponent(redirectUri)}`;
            
            showToast("Redirecting to GitHub...", "info");
            window.location.href = oauthUrl;
        };
    }

    // ─── Setup Workspace & Dashboard Controls ───
    function setupDashboard(auth) {
        // ─── SECURITY: Validate Owner ───
        if (auth.owner !== 'majdAlmotaem') {
            showToast("Unauthorized access. Only portfolio owner can access.", "error");
            setTimeout(() => {
                clearAuth();
                window.location.href = '/portfolio/';
            }, 2000);
            return;
        }
        
        loginOverlay.classList.add('hidden');
        adminContainer.classList.remove('hidden');
        
        // Update user profile metadata in sidebar footer
        const userFooter = document.getElementById('user-footer-meta');
        if (userFooter) {
            userFooter.innerHTML = `
                <div style="font-weight:600; font-size:0.9rem;">Repo: ${auth.owner}/${auth.repo}</div>
                <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-code-branch"></i> Branch: ${auth.branch}</div>
            `;
        }

        // ─── Language Selector Control ───
        let activeLang = localStorage.getItem('portfolio-lang') || 'en';
        document.body.className = `lang-${activeLang}`;

        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', lang === activeLang);
            btn.addEventListener('click', () => {
                activeLang = lang;
                localStorage.setItem('portfolio-lang', lang);
                document.body.className = `lang-${lang}`;
                langBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
            });
        });

        // ─── Live Preview Control ───
        const btnLivePreview = document.getElementById('btn-live-preview');
        btnLivePreview.addEventListener('click', () => {
            localStorage.setItem('cms_preview_mode', 'true');
            window.open('../index.html?preview=true', '_blank');
        });

        // ─── Commit Changes Control ───
        const btnCommit = document.getElementById('btn-commit-changes');
        const badgeCount = document.getElementById('pending-count-badge');

        function updatePendingBadge() {
            const changes = getPendingChanges();
            const count = Object.keys(changes).filter(p => !changes[p].isMedia).length;
            badgeCount.textContent = count;
            btnCommit.disabled = count === 0;
        }

        window.addEventListener('cms-pending-changes-updated', updatePendingBadge);
        updatePendingBadge(); // initial load

        btnCommit.addEventListener('click', () => {
            switchTab('staging');
        });

        // Setup menu item loaders
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetTab = item.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Setup logout button
        btnLogout.addEventListener('click', () => {
            clearAuth();
            showToast("Logged out successfully.", "info");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });

        // Load initial tab (Profile Settings)
        switchTab('profile');
    }

    // Tab switcher
    function switchTab(tabName) {
        // Update active class in menu
        menuItems.forEach(item => {
            if (item.getAttribute('data-tab') === tabName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Load correct module into workspace container
        switch (tabName) {
            case 'profile':
                initProfile(workspace, showToast);
                break;
            case 'projects':
                initProjects(workspace, showToast);
                break;
            case 'skills':
                initSkills(workspace, showToast);
                break;
            case 'certs':
                initCertificates(workspace, showToast);
                break;
            case 'blogs':
                initBlogs(workspace, showToast);
                break;
            case 'staging':
                initStaging(workspace, showToast);
                break;
            default:
                workspace.innerHTML = `<h3>Tab not found</h3>`;
        }
    }
});

// ─── Toast System ───
let loadingToast = null;
export function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Remove existing loading toast if any new toast is shown
    if (loadingToast) {
        loadingToast.remove();
        loadingToast = null;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    else if (type === 'error') iconClass = 'fa-circle-xmark';
    else if (type === 'loading') iconClass = 'fa-spinner';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <div class="toast-body">${message}</div>
    `;

    container.appendChild(toast);

    if (type === 'loading') {
        loadingToast = toast;
    } else {
        // Auto-remove standard toasts after 3.5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3500);
    }
}
