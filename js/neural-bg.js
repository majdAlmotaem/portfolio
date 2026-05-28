/**
 * Interactive Neural Network Background
 * - Tech-labeled nodes drift slowly across the canvas
 * - Connections (synapses) drawn between nearby nodes
 * - Mouse cursor acts as an attractor / repulsor
 * - Everything runs on a fixed canvas behind all page content
 */

const TECH_WORDS = [
    'Python', 'JavaScript', 'SQL', 'C#', 'HTML', 'CSS',
    'Vue.js', 'React', 'Node.js', 'Express', 'REST API',
    'PostgreSQL', 'SQLite', 'Docker', 'Linux', 'AWS',
    'Observer', 'Factory Method', 'MVC', 'Design Pattern',
    'n8n', 'Power BI', 'Pandas', 'Whisper AI', 'Stable Diff',
    'Claude', 'Prompt Eng.', 'Git', 'GitHub', 'Agile', 'Scrum',
    'OAuth', 'Sockets', 'Android', 'BeeWare', 'Toga',
    'Automation', 'CI/CD', 'Diffusers', 'Ollama', 'UML',
    'Networking', 'CISCO', 'Coursera', 'Data Science',
];

const CONFIG = {
    nodeCount: 26,
    connectionDist: 160,
    mouseInfluenceRadius: 180,
    mouseAttractStrength: 0.18,
    nodeSpeed: 0.10,
    nodeSizeMin: 1.5,
    nodeSizeMax: 2.8,
    lineOpacityMax: 0.22,       // was 0.07
    nodeOpacity: 0.25,          // was 0.22
    labelOpacity: 0.2,
    labelOpacityMouse: 0.62,    // was 0.28 — labels pop a bit more near cursor
    labelFontSize: 9,
};

let canvas, ctx;
let nodes = [];
let mouse = { x: -9999, y: -9999 };
let animFrameId = null;
let resizeTimeout = null;

/* ─────────────────────────── Node class ─────────────────────────── */
class Node {
    constructor(w, h, word) {
        this.reset(w, h);
        this.word = word;
        // randomise starting phase so nodes don't all pulse together
        this.phase = Math.random() * Math.PI * 2;
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.nodeSpeed * (0.5 + Math.random());
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = CONFIG.nodeSizeMin + Math.random() * (CONFIG.nodeSizeMax - CONFIG.nodeSizeMin);
        // subtle brightness variation per node (all near-white to stay monochrome)
        const brightness = 180 + Math.floor(Math.random() * 75);
        this.color = `rgb(${brightness},${brightness},${brightness})`;
    }

    update(w, h, dt) {
        // Drift
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Wrap around edges
        if (this.x < -10) this.x = w + 10;
        if (this.x > w + 10) this.x = -10;
        if (this.y < -10) this.y = h + 10;
        if (this.y > h + 10) this.y = -10;

        // Mouse attraction - pull nodes toward the cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseInfluenceRadius && dist > 0) {
            const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseAttractStrength;
            this.x += (dx / dist) * force * dt;
            this.y += (dy / dist) * force * dt;
        }

        this.phase += 0.003; // very slow pulse
    }

    draw(ctx) {
        // Subtle pulse on node size
        const pulse = 1 + 0.15 * Math.sin(this.phase);
        const r = this.radius * pulse;

        // Soft glow — only a hint
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 3);
        grd.addColorStop(0, `rgba(255,255,255,${CONFIG.nodeOpacity})`);
        grd.addColorStop(0.5, `rgba(200,200,200,${CONFIG.nodeOpacity * 0.3})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${CONFIG.nodeOpacity})`;
        ctx.fill();

        // Label – fade in as the mouse approaches
        const distToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        const proximity = Math.max(0, 1 - distToMouse / CONFIG.mouseInfluenceRadius);
        const finalLabelOpacity = CONFIG.labelOpacity + proximity * CONFIG.labelOpacityMouse;
        if (finalLabelOpacity > 0.01) {
            ctx.save();
            ctx.font = `${CONFIG.labelFontSize}px 'Outfit', monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(200,200,200,${finalLabelOpacity})`;
            ctx.fillText(this.word, this.x, this.y - r * 3 - 3);
            ctx.restore();
        }
    }
}

/* ─────────────────────────── Synapse drawing ─────────────────────── */
function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONFIG.connectionDist) {
                // Fade out as nodes get further apart
                const alpha = CONFIG.lineOpacityMax * (1 - dist / CONFIG.connectionDist);

                // Boost alpha when one of the nodes is near the mouse
                const distA = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                const distB = Math.hypot(b.x - mouse.x, b.y - mouse.y);
                const nearMouse = Math.min(distA, distB) < CONFIG.mouseInfluenceRadius;
                const finalAlpha = nearMouse ? Math.min(alpha * 3, 0.45) : alpha;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(200,200,200,${finalAlpha})`;
                ctx.lineWidth = nearMouse ? 0.8 : 0.4;
                ctx.stroke();
            }
        }
    }

    // Connect mouse cursor to nearby nodes to form a cohesive network hub
    if (mouse.x > -1000 && mouse.y > -1000) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
            if (dist < CONFIG.mouseInfluenceRadius) {
                const proximity = 1 - dist / CONFIG.mouseInfluenceRadius;
                // Double the standard opacity max to make mouse synapses pop elegantly
                const alpha = Math.min(CONFIG.lineOpacityMax * 2 * proximity, 0.45);

                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = `rgba(200,200,200,${alpha})`;
                ctx.lineWidth = 0.5 + proximity * 0.5; // subtle thickening as it gets closer
                ctx.stroke();
            }
        }
    }
}

/* ─────────────────────────── Animation loop ──────────────────────── */
let lastTime = 0;
function loop(ts) {
    const dt = Math.min((ts - lastTime) / 16.67, 3); // normalise to ~60fps units
    lastTime = ts;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawConnections();
    nodes.forEach(n => {
        n.update(canvas.width, canvas.height, dt);
        n.draw(ctx);
    });

    animFrameId = requestAnimationFrame(loop);
}

/* ─────────────────────────── Init & resize ───────────────────────── */
function initNodes() {
    nodes = [];
    // Shuffle words and assign one per node (wrap if more nodes than words)
    const shuffled = [...TECH_WORDS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < CONFIG.nodeCount; i++) {
        const word = shuffled[i % shuffled.length];
        nodes.push(new Node(canvas.width, canvas.height, word));
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initNodes();
}

export function initNeuralBg() {
    canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();

    // Mouse tracking
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // Debounced resize
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 200);
    });

    // Start loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    lastTime = performance.now();
    animFrameId = requestAnimationFrame(loop);
}
