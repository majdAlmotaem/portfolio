/**
 * Interactive CLI Developer Mode Module
 * Provides an authentic Unix-like terminal environment to explore the portfolio.
 */

export function initTerminal(portfolioData, getLang) {
    const devBtn = document.getElementById('dev-mode-btn');
    const overlay = document.getElementById('dev-terminal');
    const terminalWindow = overlay ? overlay.querySelector('.terminal-window') : null;
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const closeDot = document.getElementById('terminal-close-dot');
    const maxDot = document.getElementById('terminal-max-dot');
    const exitBtn = document.getElementById('terminal-exit-btn');

    if (!overlay || !input || !output) return;

    let isDevMode = false;
    const commandHistory = [];
    let historyIndex = -1;

    // ASCII Art & MOTD Banner
    const BANNER_ART = `
███╗   ███╗ █████╗      ██╗██████╗      ██████╗ ██╗     ██╗
████╗ ████║██╔══██╗     ██║██╔══██╗    ██╔════╝ ██║     ██║
██╔████╔██║███████║     ██║██║  ██║    ██║      ██║     ██║
██║╚██╔╝██║██╔══██║██   ██║██║  ██║    ██║      ██║     ██║
██║ ╚═╝ ██║██║  ██║╚█████╔╝██████╔╝    ╚██████╗ ███████╗██║
╚═╝     ╚═╝╚═╝  ╚═╝ ╚════╝ ╚═════╝      ╚═════╝ ╚══════╝╚═╝
`;

    function getWelcomeMessage() {
        const lang = getLang();
        const isDe = lang === 'de';

        return `
<pre class="terminal-banner">${BANNER_ART}</pre>
<div class="terminal-welcome-text">
    <strong>${isDe ? 'Willkommen im Entwicklermodus!' : 'Welcome to Developer Mode!'}</strong><br>
    ${isDe 
        ? 'Dieses interaktive CLI-Terminal ermöglicht es dir, das Portfolio über Unix-Befehle zu steuern.<br>Tippe <span class="cmd-highlight">help</span> ein, um alle verfügbaren Befehle anzuzeigen, oder <span class="cmd-highlight">exit</span> zum Beenden.'
        : 'This interactive CLI terminal lets you explore the portfolio via Unix commands.<br>Type <span class="cmd-highlight">help</span> to view all available commands, or <span class="cmd-highlight">exit</span> to return to the GUI.'}
</div>
<div class="terminal-shortcut-bar">
    <span><kbd>Tab</kbd> Autocomplete</span>
    <span><kbd>↑</kbd> / <kbd>↓</kbd> History</span>
    <span><kbd>Ctrl + L</kbd> Clear</span>
    <span><kbd>ESC</kbd> Exit</span>
</div>
<br>
`;
    }

    // Toggle Developer Mode
    function setDevMode(active) {
        isDevMode = active;
        if (isDevMode) {
            overlay.style.display = 'flex';
            // Trigger animation frame
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
            document.body.classList.add('modal-open');
            if (devBtn) devBtn.classList.add('active');

            if (output.children.length === 0) {
                output.innerHTML = getWelcomeMessage();
            }
            setTimeout(() => input.focus(), 50);
        } else {
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            if (devBtn) devBtn.classList.remove('active');
            setTimeout(() => {
                if (!isDevMode) overlay.style.display = 'none';
            }, 300);
        }
    }

    // Toggle trigger bindings
    if (devBtn) {
        devBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setDevMode(!isDevMode);
        });
    }

    if (exitBtn) {
        exitBtn.addEventListener('click', () => setDevMode(false));
    }

    if (closeDot) {
        closeDot.addEventListener('click', () => setDevMode(false));
    }

    if (maxDot && terminalWindow) {
        maxDot.addEventListener('click', () => {
            terminalWindow.classList.toggle('fullscreen');
        });
    }

    // Close when clicking on backdrop
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            setDevMode(false);
        }
    });

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        // Toggle with Ctrl + K or ` (backtick) if not focused on another input
        if ((e.ctrlKey && e.key.toLowerCase() === 'k')) {
            e.preventDefault();
            setDevMode(!isDevMode);
            return;
        }

        if (isDevMode && e.key === 'Escape') {
            e.preventDefault();
            setDevMode(false);
        }
    });

    // Keep focus inside terminal input when clicking terminal window
    overlay.addEventListener('click', () => {
        if (isDevMode) input.focus();
    });

    // ─── Command Registry ───
    const commands = {
        help: {
            desc: {
                en: "Display all available terminal commands",
                de: "Zeigt alle verfügbaren Terminal-Befehle an"
            },
            exec: () => {
                const lang = getLang();
                let tableHtml = '<div class="cmd-table">';
                Object.keys(commands).sort().forEach(cmd => {
                    tableHtml += `
                        <div><span class="cmd-pill">${cmd}</span></div>
                        <div class="cmd-desc">${commands[cmd].desc[lang]}</div>
                    `;
                });
                tableHtml += '</div>';
                return tableHtml;
            }
        },

        about: {
            desc: {
                en: "Overview of background, education, and development focus",
                de: "Überblick zu Werdegang, Ausbildung und Entwickler-Fokus"
            },
            exec: () => {
                const lang = getLang();
                const profile = portfolioData.profile || {};
                const name = profile.name || 'Majd Almotaem';
                const title = profile[lang]?.title || (lang === 'de' ? 'Softwareentwickler' : 'Software Developer');
                const motto = profile[lang]?.motto || '';

                return `
<div class="terminal-card">
    <div class="terminal-card-title">
        <span><i class="fa-solid fa-user-astronaut"></i> ${name}</span>
        <span class="terminal-badge">${title}</span>
    </div>
    <p class="terminal-card-desc" style="margin-top: 0.5rem; line-height: 1.6;">${motto}</p>
    <div style="margin-top: 0.75rem; font-size: 0.88rem; color: #a0a6b5;">
        <div>🎓 <strong>${lang === 'de' ? 'Abschluss' : 'Degree'}:</strong> Fachinformatiker für Anwendungsentwicklung (IHK Duisburg-Wesel-Kleve)</div>
        <div>☁️ <strong>Cloud:</strong> AWS Certified Solutions Architect – Associate (SAA)</div>
        <div>💡 <strong>${lang === 'de' ? 'Spezialisierung' : 'Specialization'}:</strong> Python, JavaScript, RBAC Security, Automation (n8n), REST APIs</div>
    </div>
</div>
`;
            }
        },

        skills: {
            desc: {
                en: "List technical stack, frameworks, and tools",
                de: "Listet Tech-Stack, Frameworks und Tools auf"
            },
            exec: () => {
                const lang = getLang();
                const skillCategories = portfolioData[lang]?.skills || [];

                if (skillCategories.length === 0) {
                    return '<div class="terminal-warning">No skills data loaded.</div>';
                }

                let html = '<div style="margin-top: 0.5rem;">';
                skillCategories.forEach(cat => {
                    const items = (cat.items || []).map(i => `<span class="cmd-pill" style="margin-right: 0.35rem; margin-bottom: 0.35rem;">${i.name}</span>`).join('');
                    html += `
                        <div style="margin-bottom: 0.85rem;">
                            <div style="color: #e5a93b; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.35rem;">▸ ${cat.category}</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">${items}</div>
                        </div>
                    `;
                });
                html += '</div>';
                return html;
            }
        },

        projects: {
            desc: {
                en: "Show portfolio projects with tech stack and links",
                de: "Zeigt Portfolio-Projekte mit Tech-Stack und Links"
            },
            exec: () => {
                const lang = getLang();
                const projects = portfolioData[lang]?.projects || [];

                if (projects.length === 0) {
                    return '<div class="terminal-warning">No projects found.</div>';
                }

                let html = '<div style="margin-top: 0.5rem;">';
                projects.forEach(p => {
                    const tech = (p.techStack || []).map(t => `<span class="cmd-pill" style="font-size: 0.75rem;">${t.name}</span>`).join(' ');
                    const links = [];
                    if (p.githubLink && p.githubLink !== '#') {
                        links.push(`<a href="${p.githubLink}" target="_blank" class="terminal-link"><i class="fa-brands fa-github"></i> GitHub</a>`);
                    }
                    if (p.link && p.link !== '#') {
                        links.push(`<a href="${p.link}" target="_blank" class="terminal-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>`);
                    }

                    html += `
                        <div class="terminal-card">
                            <div class="terminal-card-title">
                                <span>#${p.id} ${p.title}</span>
                                <span class="terminal-badge" style="text-transform: capitalize;">${p.status}</span>
                            </div>
                            <p class="terminal-card-desc">${p.description}</p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">${tech}</div>
                            <div style="display: flex; gap: 1rem; font-size: 0.85rem;">${links.join(' | ')}</div>
                        </div>
                    `;
                });
                html += '</div>';
                return html;
            }
        },

        experience: {
            desc: {
                en: "Show professional work experience and career timeline",
                de: "Zeigt den beruflichen Werdegang und Meilensteine"
            },
            exec: () => {
                const lang = getLang();
                const experience = portfolioData[lang]?.experience || [];

                if (experience.length === 0) {
                    return '<div class="terminal-warning">No experience entries found.</div>';
                }

                let html = '<div style="margin-top: 0.5rem;">';
                experience.forEach(exp => {
                    const tech = (exp.tech || []).map(t => `<span class="cmd-pill" style="font-size: 0.75rem;">${t}</span>`).join(' ');
                    html += `
                        <div class="terminal-card" style="margin-bottom: 0.75rem;">
                            <div class="terminal-card-title">
                                <span><i class="${exp.iconClass || 'fa-solid fa-briefcase'}"></i> ${exp.role} <span style="font-weight: normal; opacity: 0.85;">@ ${exp.company}</span></span>
                                <span class="terminal-badge">${exp.period}</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.88rem; margin: 0.4rem 0;">${exp.description}</div>
                            ${tech ? `<div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem;">${tech}</div>` : ''}
                        </div>
                    `;
                });
                html += '</div>';
                return html;
            }
        },

        certs: {
            desc: {
                en: "List official qualifications and certifications",
                de: "Listet offizielle Abschlüsse und Zertifikate auf"
            },
            exec: () => {
                const lang = getLang();
                const certs = portfolioData[lang]?.certificates || [];

                if (certs.length === 0) {
                    return '<div class="terminal-warning">No certifications found.</div>';
                }

                const official = certs.filter(c => c.category === 'official');
                const courses = certs.filter(c => c.category !== 'official');

                let html = '<div style="margin-top: 0.5rem;">';
                
                if (official.length > 0) {
                    html += `<div style="color: #e5a93b; font-weight: 700; margin-bottom: 0.5rem;">★ ${lang === 'de' ? 'Offizielle Zertifizierungen & Abschlüsse' : 'Official Certifications & Degrees'}:</div>`;
                    official.forEach(c => {
                        html += `
                            <div class="terminal-card" style="border-color: rgba(229, 169, 59, 0.3);">
                                <div class="terminal-card-title">
                                    <span><i class="fa-solid fa-award" style="color: #e5a93b;"></i> ${c.title}</span>
                                    <span class="terminal-badge">${c.badge || 'Official'}</span>
                                </div>
                                <div style="color: #9ca3af; font-size: 0.88rem;">Issuer: ${c.issuer}</div>
                            </div>
                        `;
                    });
                }

                if (courses.length > 0) {
                    html += `<div style="color: #38bdf8; font-weight: 700; margin: 1rem 0 0.5rem 0;">★ ${lang === 'de' ? 'Weiterbildungen & Kurse' : 'Continuous Learning & Courses'}:</div>`;
                    courses.forEach(c => {
                        html += `
                            <div style="padding: 0.35rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; justify-content: space-between; gap: 1rem; font-size: 0.88rem;">
                                <span>• ${c.title}</span>
                                <span style="color: #9ca3af;">(${c.issuer})</span>
                            </div>
                        `;
                    });
                }

                html += '</div>';
                return html;
            }
        },

        contact: {
            desc: {
                en: "Direct communication channels and social profiles",
                de: "Direkte Kontaktmöglichkeiten und Profile"
            },
            exec: () => {
                const profile = portfolioData.profile || {};
                const socials = profile.socials || {};
                const email = socials.email || 'majdalmotaem1998@gmail.com';
                const github = socials.github || 'https://github.com/majdAlmotaem';
                const linkedin = socials.linkedin || 'https://www.linkedin.com/in/majd-almotaem-5105b4266/';

                return `
<div class="terminal-card">
    <div class="terminal-card-title"><i class="fa-solid fa-address-book"></i> Connect & Contact</div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; font-size: 0.9rem;">
        <div>✉️ <strong>Email:</strong> <a href="mailto:${email}" class="terminal-link">${email}</a></div>
        <div>💻 <strong>GitHub:</strong> <a href="${github}" target="_blank" class="terminal-link">${github}</a></div>
        <div>💼 <strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="terminal-link">${linkedin}</a></div>
    </div>
</div>
`;
            }
        },

        whoami: {
            desc: {
                en: "Display current user identity",
                de: "Zeigt die aktuelle Benutzer-Identität"
            },
            exec: () => {
                const lang = getLang();
                return lang === 'de'
                    ? '<div class="terminal-success">guest@majd-portfolio — Willkommen, IT Recruiter / Tech Lead!</div>'
                    : '<div class="terminal-success">guest@majd-portfolio — Welcome, IT Recruiter / Tech Lead!</div>';
            }
        },

        date: {
            desc: {
                en: "Print current system date and time",
                de: "Gibt das aktuelle Systemdatum und die Uhrzeit aus"
            },
            exec: () => {
                return `<div>${new Date().toLocaleString()}</div>`;
            }
        },

        history: {
            desc: {
                en: "Show session command history",
                de: "Zeigt den Befehlsverlauf dieser Sitzung"
            },
            exec: () => {
                if (commandHistory.length === 0) {
                    return '<div class="cmd-desc">No commands executed yet.</div>';
                }
                return commandHistory.map((cmd, i) => `<div>${i + 1}  ${cmd}</div>`).join('');
            }
        },

        sudo: {
            desc: {
                en: "Administrative action easter egg (e.g. 'sudo hire majd')",
                de: "Administratives Easter Egg (z.B. 'sudo hire majd')"
            },
            exec: (args) => {
                const fullArgs = args.join(' ').toLowerCase();
                const lang = getLang();

                if (fullArgs.includes('hire')) {
                    return `
<div class="terminal-card" style="border-color: #10b981; background: rgba(16, 185, 129, 0.08);">
    <div class="terminal-card-title" style="color: #10b981;">
        <span><i class="fa-solid fa-check-circle"></i> [PERMISSION GRANTED]</span>
    </div>
    <p style="margin: 0.5rem 0; color: #f3f4f6;">
        ${lang === 'de' 
            ? 'Hervorragende Entscheidung! Majd Almotaem ist bereit für neue Herausforderungen als Junior Softwareentwickler.<br>Lass uns ein Gespräch vereinbaren:'
            : 'Outstanding decision! Majd Almotaem is ready to join your team as a Junior Software Developer.<br>Let us schedule an interview:'}
    </p>
    <a href="mailto:majdalmotaem1998@gmail.com?subject=Interview%20Invitation" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; padding: 0.4rem 0.9rem; font-size: 0.85rem;">
        <i class="fa-solid fa-envelope"></i> ${lang === 'de' ? 'Einladung versenden' : 'Send Invitation'}
    </a>
</div>
`;
                }

                if (fullArgs.includes('rm -rf') || fullArgs.includes('destroy')) {
                    return '<div class="terminal-error">Nice try! Safe mode is active: System root is immutable.</div>';
                }

                return '<div class="terminal-warning">User is not in the sudoers file. This incident will be reported to Santa Claus. (Try: <span class="cmd-highlight">sudo hire majd</span>)</div>';
            }
        },

        clear: {
            desc: {
                en: "Clear the terminal screen",
                de: "Leert den Bildschirminhalt"
            },
            exec: () => {
                output.innerHTML = getWelcomeMessage();
                return null;
            }
        },

        exit: {
            desc: {
                en: "Exit Developer Mode and return to GUI portfolio",
                de: "Beendet den Entwicklermodus und kehrt zum Portfolio zurück"
            },
            exec: () => {
                setTimeout(() => setDevMode(false), 250);
                return '<div class="terminal-success">Exiting Developer Mode... Welcome back to GUI!</div>';
            }
        }
    };

    // Aliases
    commands.quit = commands.exit;
    commands.gui = commands.exit;
    commands.cls = commands.clear;

    // Handle command submission
    function handleCommand(rawInput) {
        const trimmed = rawInput.trim();
        if (!trimmed) return;

        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        const parts = trimmed.split(' ');
        const cmdName = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Append executed command to output
        const entryDiv = document.createElement('div');
        entryDiv.className = 'terminal-entry';
        entryDiv.innerHTML = `
            <div class="terminal-cmd-line">
                <span class="terminal-prompt"><span class="prompt-user">guest</span><span class="prompt-at">@</span><span class="prompt-host">majd</span>:<span class="prompt-path">~</span>$</span>
                <span>${escapeHtml(trimmed)}</span>
            </div>
        `;

        // Execute command
        if (commands[cmdName]) {
            try {
                const res = commands[cmdName].exec(args);
                if (res !== null) {
                    const resDiv = document.createElement('div');
                    resDiv.className = 'terminal-result';
                    resDiv.innerHTML = res;
                    entryDiv.appendChild(resDiv);
                }
            } catch (err) {
                const errDiv = document.createElement('div');
                errDiv.className = 'terminal-result terminal-error';
                errDiv.textContent = `Error executing command '${cmdName}': ${err.message}`;
                entryDiv.appendChild(errDiv);
            }
        } else {
            const unknownDiv = document.createElement('div');
            unknownDiv.className = 'terminal-result terminal-error';
            unknownDiv.innerHTML = `command not found: <strong>${escapeHtml(cmdName)}</strong>. Type <span class="cmd-highlight">help</span> to view all commands.`;
            entryDiv.appendChild(unknownDiv);
        }

        output.appendChild(entryDiv);
        output.scrollTop = output.scrollHeight;
    }

    // Input listeners (History, Submit, Tab completion)
    input.addEventListener('keydown', (e) => {
        // Submit on Enter
        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            handleCommand(val);
            return;
        }

        // History Navigation: Up Arrow
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
            return;
        }

        // History Navigation: Down Arrow
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
            return;
        }

        // Tab Autocompletion
        if (e.key === 'Tab') {
            e.preventDefault();
            const current = input.value.trim().toLowerCase();
            if (!current) return;

            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(current));
            if (matches.length === 1) {
                input.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                const hintDiv = document.createElement('div');
                hintDiv.className = 'terminal-entry';
                hintDiv.innerHTML = `<div class="cmd-desc" style="color: #38bdf8;">${matches.join('   ')}</div>`;
                output.appendChild(hintDiv);
                output.scrollTop = output.scrollHeight;
            }
            return;
        }

        // Clear with Ctrl + L
        if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            output.innerHTML = getWelcomeMessage();
        }
    });

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    return {
        open: () => setDevMode(true),
        close: () => setDevMode(false),
        toggle: () => setDevMode(!isDevMode)
    };
}
