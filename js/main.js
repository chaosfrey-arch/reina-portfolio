/* ============================================================
   OBSIDIAN PORTAL — Main Application
   He Rui / 贺睿 — Personal Portal v1.0
   ============================================================ */

'use strict';

/* ── State ── */
let currentLang   = 'en';
let currentRadarModels = new Set(RADAR_DATA.models.map(m => m.name));
let currentPulseTab = 'llm';
let sortCol = 'elo';
let sortDir = 'desc';
let githubCache = {};

/* ================================================================
   1. CANVAS BACKGROUND — Neural directional flow
   ================================================================ */
const Canvas = (() => {
  let canvas, ctx, w, h;
  const NODES    = [];
  const PACKETS  = [];  // data packets travelling along edges
  const RIPPLES  = [];  // click ripples
  const N        = 85;
  const MAX_D    = 160;
  const FLOW_ANG = Math.PI * 0.12; // gentle rightward-downward flow
  const FLOW_SPD = 0.28;

  function init() {
    canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    spawnNodes();
    canvas.addEventListener('click', onCanvasClick);
    window.addEventListener('resize', () => { resize(); spawnNodes(); });
    tick();
  }

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function spawnNodes() {
    NODES.length = 0;
    for (let i = 0; i < N; i++) {
      NODES.push({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: Math.cos(FLOW_ANG) * FLOW_SPD + (Math.random() - 0.5) * 0.12,
        vy: Math.sin(FLOW_ANG) * FLOW_SPD + (Math.random() - 0.5) * 0.12,
        r:  Math.random() * 1.1 + 0.35,
        a:  Math.random() * 0.35 + 0.08
      });
    }
  }

  /* Spawn a data-packet travelling from node i → nearest reachable node */
  function spawnPacket() {
    if (PACKETS.length >= 18) return;
    const i = Math.floor(Math.random() * N);
    const pi = NODES[i];
    let best = -1, bd = Infinity;
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = NODES[j].x - pi.x, dy = NODES[j].y - pi.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_D && d > 30 && d < bd) { bd = d; best = j; }
    }
    if (best < 0) return;
    PACKETS.push({ from: i, to: best, t: 0, spd: 0.013 + Math.random() * 0.009 });
  }

  /* Ripple on canvas click */
  function onCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    RIPPLES.push({ x: e.clientX - rect.left, y: e.clientY - rect.top,
                   r: 0, maxR: 200, a: 0.65, spd: 3.2 });
    // Spawn a burst of packets near click
    for (let k = 0; k < 4; k++) setTimeout(spawnPacket, k * 80);
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // Occasionally spawn new packet
    if (Math.random() < 0.04) spawnPacket();

    /* ── Nodes ── */
    for (let i = 0; i < N; i++) {
      const p = NODES[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,150,80,${p.a})`;
      ctx.fill();
    }

    /* ── Edges ── */
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = NODES[i].x - NODES[j].x;
        const dy = NODES[i].y - NODES[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_D) {
          const a = (1 - d / MAX_D) * 0.07;
          ctx.beginPath();
          ctx.moveTo(NODES[i].x, NODES[i].y);
          ctx.lineTo(NODES[j].x, NODES[j].y);
          ctx.strokeStyle = `rgba(100,140,200,${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    /* ── Packets (data dots travelling along edges) ── */
    for (let i = PACKETS.length - 1; i >= 0; i--) {
      const pk = PACKETS[i];
      pk.t += pk.spd;
      if (pk.t >= 1) { PACKETS.splice(i, 1); continue; }

      const A = NODES[pk.from], B = NODES[pk.to];
      if (!A || !B) { PACKETS.splice(i, 1); continue; }

      const x = A.x + (B.x - A.x) * pk.t;
      const y = A.y + (B.y - A.y) * pk.t;

      // Bright active edge
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = 'rgba(210,160,80,0.28)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Glowing dot
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 5);
      grd.addColorStop(0, 'rgba(240,180,80,0.95)');
      grd.addColorStop(1, 'rgba(240,180,80,0)');
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    /* ── Ripples ── */
    for (let i = RIPPLES.length - 1; i >= 0; i--) {
      const rp = RIPPLES[i];
      rp.r += rp.spd; rp.a *= 0.94;
      if (rp.a < 0.01 || rp.r > rp.maxR) { RIPPLES.splice(i, 1); continue; }

      // Outer ring
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(210,160,80,${rp.a})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second inner ring
      if (rp.r > 30) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(210,160,80,${rp.a * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Centre dot flash
      if (rp.r < 20) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,180,80,${rp.a * 1.4})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(tick);
  }

  return { init };
})();

/* ================================================================
   2. LANGUAGE SYSTEM
   ================================================================ */
const Lang = (() => {
  function init() {
    const stored = localStorage.getItem('hr-lang');
    if (stored === 'zh') setLang('zh', false);
    else render();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  function setLang(lang, save = true) {
    currentLang = lang;
    if (save) localStorage.setItem('hr-lang', lang);
    document.body.classList.toggle('zh', lang === 'zh');
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    render();
  }

  function render() {
    const C = CONTENT[currentLang];
    // Nav links
    const navLinks = document.querySelectorAll('.nav-link[data-idx]');
    navLinks.forEach(a => { a.textContent = C.nav.links[+a.dataset.idx]; });
    // Hero
    const hero = C.hero;
    setText('hero-eyebrow-text', hero.eyebrow);
    // Multi-line desc
    const descEl = document.getElementById('hero-desc');
    if (descEl && hero.desc_line1) {
      descEl.innerHTML = `${hero.desc_line1}<br>${hero.desc_line2}<br>${hero.desc_line3}<br><span class="hero-desc-accent" id="hero-desc-accent">${hero.desc_accent}</span>`;
    }
    setText('cta-primary-text', hero.cta_primary);
    setText('cta-ghost-text', hero.cta_ghost);
    // Section titles & subtitles
    setText('journey-title', C.journey.title);
    setText('journey-subtitle', C.journey.subtitle);
    setText('projects-title', C.projects.title);
    setText('projects-subtitle', C.projects.subtitle);
    setText('llm-title', C.llm.title);
    setText('llm-subtitle', C.llm.subtitle);
    setText('feed-title', C.feed.title);
    setText('feed-subtitle', C.feed.subtitle);
    setText('github-title', C.github.title);
    setText('github-subtitle', C.github.subtitle);
    // Footer
    setText('footer-copy', C.footer.copy);
    // Tab labels
    setText('tab-arena', C.llm.tab_arena);
    setText('tab-bench', C.llm.tab_bench);
    setText('tab-llm',   C.github.tab_llm);
    setText('tab-agent', C.github.tab_agent);
    setText('tab-mm',    C.github.tab_multimodal);
    setText('llm-footnote', C.llm.footnote);
    // Journey items
    renderJourney(C.journey.items);
    // Projects
    renderProjects(C.projects.items);
    // Feed labels
    setText('feed-heading-people',   C.feed.heading_people);
    setText('feed-heading-podcasts', C.feed.heading_podcasts);
    // Radar label
    setText('radar-label', C.llm.radar_title);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  return { init, setLang };
})();

/* ================================================================
   3. JOURNEY TIMELINE
   ================================================================ */
function renderJourney(items) {
  const container = document.getElementById('timeline-items');
  if (!container) return;
  container.innerHTML = items.map((item, i) => `
    <div class="tl-item${item.current ? ' current' : ''}" style="transition-delay:${i * 80}ms">
      <div class="tl-node"></div>
      <div class="tl-date">${item.date}</div>
      <div class="tl-org">${item.org}</div>
      <div class="tl-role">${item.role}</div>
      <div class="tl-body">${item.body}</div>
      <div class="tl-metrics">
        ${item.metrics.map(m => `<span class="metric">${m}</span>`).join('')}
      </div>
    </div>
  `).join('');
  // Re-observe after re-render
  observeTimeline();
}

function observeTimeline() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.15 });

  document.querySelectorAll('.tl-item').forEach(el => io.observe(el));
  // Timeline progress spine
  updateTimelineProgress();
}

function updateTimelineProgress() {
  const spine = document.querySelector('.timeline-progress-bar');
  if (!spine) return;
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const scrollHandler = () => {
    const rect = timeline.getBoundingClientRect();
    const total = timeline.offsetHeight;
    const visible = window.innerHeight - rect.top;
    const pct = Math.max(0, Math.min(1, visible / total));
    spine.style.height = (pct * 100) + '%';
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();
}

/* ================================================================
   4. PROJECTS
   ================================================================ */
function renderProjects(items) {
  // Featured project
  const feat = items[0];
  setProjectContent('feat-label', 'feat-title', 'feat-desc', 'feat-tech', feat);
  const featLink = document.getElementById('feat-link');
  if (featLink) {
    if (feat.link_href) featLink.href = feat.link_href;
    if (feat.link_text) featLink.textContent = feat.link_text;
  }

  // Secondary projects
  const secondaryItems = items.slice(1);
  secondaryItems.forEach((item, i) => {
    setProjectContent(
      `proj-label-${i}`, `proj-title-${i}`, `proj-desc-${i}`, `proj-tech-${i}`, item
    );
  });
}

function setProjectContent(labelId, titleId, descId, techId, item) {
  const label = document.getElementById(labelId);
  const title = document.getElementById(titleId);
  const desc  = document.getElementById(descId);
  const tech  = document.getElementById(techId);
  if (label) label.textContent = item.label;
  if (title) title.textContent = item.title;
  if (desc)  desc.textContent  = item.desc;
  if (tech)  tech.innerHTML    = item.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');
}

/* ================================================================
   5. RADAR CHART
   ================================================================ */
const Radar = (() => {
  let canvas, ctx, size;

  function init() {
    canvas = document.getElementById('radar-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    buildLegend();
    draw();
    window.addEventListener('resize', draw);
  }

  function buildLegend() {
    const container = document.getElementById('radar-legend');
    if (!container) return;
    container.innerHTML = RADAR_DATA.models.map(m => `
      <div class="legend-item active" data-model="${m.name}" onclick="Radar.toggle('${m.name}', this)">
        <div class="legend-dot" style="background:${m.color}"></div>
        <span>${m.name}</span>
      </div>
    `).join('');
  }

  function toggle(name, el) {
    if (currentRadarModels.has(name)) {
      if (currentRadarModels.size <= 2) return; // Keep at least 2
      currentRadarModels.delete(name);
      el.classList.remove('active');
      el.classList.add('inactive');
    } else {
      currentRadarModels.add(name);
      el.classList.add('active');
      el.classList.remove('inactive');
    }
    draw();
  }

  function draw() {
    if (!canvas) return;
    size = canvas.offsetWidth;
    canvas.width  = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2;
    const radius = size * 0.38;
    const n = RADAR_DATA.axes.length;

    // Draw web rings
    for (let ring = 1; ring <= 5; ring++) {
      const r = radius * (ring / 5);
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 5 ? 'oklch(22% 0.018 255)' : 'oklch(18% 0.015 255)';
      ctx.lineWidth = ring === 5 ? 1.5 : 0.8;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.strokeStyle = 'oklch(22% 0.018 255)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Axis labels
      const lx = cx + (radius + 20) * Math.cos(angle);
      const ly = cy + (radius + 20) * Math.sin(angle);
      ctx.fillStyle  = 'oklch(48% 0.012 255)';
      ctx.font       = `${Math.round(size * 0.03)}px 'JetBrains Mono', monospace`;
      ctx.textAlign  = lx < cx - 4 ? 'right' : lx > cx + 4 ? 'left' : 'center';
      ctx.textBaseline = ly < cy - 4 ? 'bottom' : ly > cy + 4 ? 'top' : 'middle';
      ctx.fillText(RADAR_DATA.axes[i], lx, ly);
    }

    // Draw model polygons
    RADAR_DATA.models.forEach(model => {
      if (!currentRadarModels.has(model.name)) return;
      ctx.beginPath();
      model.values.forEach((val, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const r = radius * (val / 100);
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle   = model.color + '1a'; // ~10% opacity
      ctx.fill();
      ctx.strokeStyle = model.color;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    });
  }

  return { init, toggle, draw };
})();

/* Expose globally for inline onclick */
window.Radar = Radar;

/* ================================================================
   6. LLM TABLE
   ================================================================ */
const LLMTable = (() => {
  function init() {
    renderArena();
    setupTabSwitcher();
  }

  function renderArena() {
    const tbody = document.getElementById('llm-tbody');
    if (!tbody) return;
    const data = sortData([...LLM_ARENA]);
    tbody.innerHTML = data.map((m, i) => `
      <tr>
        <td>#${i + 1} ${m.name}</td>
        <td>${m.org}</td>
        <td><span class="elo-val">${m.elo}</span></td>
        <td class="score-cell">
          <span>${m.mmlu}%</span>
          <div class="score-track"><div class="score-fill" style="--pct:${(m.mmlu / 100).toFixed(3)}"></div></div>
        </td>
        <td class="score-cell">
          <span>${m.humaneval}%</span>
          <div class="score-track"><div class="score-fill" style="--pct:${(m.humaneval / 100).toFixed(3)}"></div></div>
        </td>
        <td class="score-cell">
          <span>${m.math}%</span>
          <div class="score-track"><div class="score-fill" style="--pct:${(m.math / 100).toFixed(3)}"></div></div>
        </td>
      </tr>
    `).join('');
    setupSortHeaders();
  }

  function sortData(data) {
    const key = sortCol;
    return data.sort((a, b) => {
      const va = a[key], vb = b[key];
      if (typeof va === 'string') {
        return sortDir === 'desc' ? vb.localeCompare(va) : va.localeCompare(vb);
      }
      return sortDir === 'desc' ? vb - va : va - vb;
    });
  }

  function setupSortHeaders() {
    document.querySelectorAll('.bench-table thead th[data-col]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.col;
        if (sortCol === col) {
          sortDir = sortDir === 'desc' ? 'asc' : 'desc';
        } else {
          sortCol = col;
          sortDir = 'desc';
        }
        document.querySelectorAll('.bench-table thead th').forEach(t => t.classList.remove('sorted'));
        th.classList.add('sorted');
        th.querySelector('.sort-arrow').textContent = sortDir === 'desc' ? '↓' : '↑';
        renderArena();
      });
    });
    // Set initial sorted indicator
    const initTh = document.querySelector('.bench-table thead th[data-col="elo"]');
    if (initTh) initTh.classList.add('sorted');
  }

  function setupTabSwitcher() {
    document.querySelectorAll('.llm-tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.llm-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Both tabs show same table (arena data), tab is cosmetic here
      });
    });
  }

  return { init };
})();

/* ================================================================
   7. GITHUB PULSE
   ================================================================ */
const GitHub = (() => {
  const TOPICS = {
    llm:        'topic:llm',
    agent:      'topic:llm-agent',
    multimodal: 'topic:multimodal'
  };

  const FALLBACK = [
    { full_name: 'langchain-ai/langchain',        description: 'Build context-aware reasoning applications.', stargazers_count: 97800, language: 'Python' },
    { full_name: 'ollama/ollama',                 description: 'Get up and running with large language models.', stargazers_count: 115000, language: 'Go' },
    { full_name: 'microsoft/autogen',             description: 'A programming framework for agentic AI.', stargazers_count: 38200, language: 'Python' },
    { full_name: 'karpathy/minGPT',               description: 'A minimal PyTorch re-implementation of OpenAI GPT.', stargazers_count: 21100, language: 'Python' },
    { full_name: 'deepseek-ai/DeepSeek-R1',       description: 'DeepSeek R1: reasoning model via reinforcement learning.', stargazers_count: 28400, language: 'Python' },
    { full_name: 'huggingface/transformers',      description: 'State-of-the-art ML for Jax, PyTorch, TensorFlow.', stargazers_count: 137000, language: 'Python' },
    { full_name: 'vllm-project/vllm',             description: 'Easy, fast and cheap LLM serving.', stargazers_count: 42500, language: 'Python' },
    { full_name: 'ggerganov/llama.cpp',           description: 'LLM inference in C/C++.', stargazers_count: 72800, language: 'C++' },
    { full_name: 'openai/openai-python',          description: 'The official Python library for the OpenAI API.', stargazers_count: 24100, language: 'Python' }
  ];

  function init() {
    setupTabs();
    loadTopic(currentPulseTab);
  }

  function setupTabs() {
    document.querySelectorAll('.pulse-tab[data-topic]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pulse-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentPulseTab = tab.dataset.topic;
        loadTopic(currentPulseTab);
      });
    });
  }

  async function loadTopic(topic) {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;
    if (githubCache[topic]) {
      renderRepos(githubCache[topic]);
      return;
    }
    renderSkeletons(grid);
    try {
      const q    = TOPICS[topic] || TOPICS.llm;
      const url  = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=9`;
      const res  = await fetch(url, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      githubCache[topic] = data.items || [];
      renderRepos(githubCache[topic]);
    } catch (err) {
      renderRepos(FALLBACK);
    }
  }

  function renderSkeletons(grid) {
    grid.innerHTML = Array.from({ length: 9 }, () => `
      <div class="skeleton-card">
        <div class="skel h14 w55" style="margin-bottom:12px"></div>
        <div class="skel h12 w95"></div>
        <div class="skel h12 w80" style="margin-bottom:16px"></div>
        <div class="skel h12 w30"></div>
      </div>
    `).join('');
  }

  function renderRepos(repos) {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;
    grid.innerHTML = repos.slice(0, 9).map((r, i) => {
      const [owner, repo] = (r.full_name || '').split('/');
      const stars = formatStars(r.stargazers_count);
      const lang  = r.language || 'Unknown';
      const color = LANG_COLORS[lang] || LANG_COLORS.default;
      return `
        <div class="repo-card" style="transition-delay:${i * 45}ms">
          <div class="repo-name">
            <span class="repo-owner">${owner}</span>
            <span class="repo-repo">${repo}</span>
          </div>
          <div class="repo-desc">${r.description || 'No description.'}</div>
          <div class="repo-meta">
            <span class="repo-stars">${stars}</span>
            <span class="repo-lang">
              <span class="lang-pip" style="background:${color}"></span>
              ${lang}
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Animate in
    requestAnimationFrame(() => {
      document.querySelectorAll('.repo-card').forEach(card => {
        setTimeout(() => card.classList.add('show'), 10);
      });
    });
  }

  function formatStars(n) {
    if (!n) return '0';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }

  return { init };
})();

/* ================================================================
   8. NAVIGATION & SCROLLSPY
   ================================================================ */
const Nav = (() => {
  const SECTIONS = ['hero', 'journey', 'projects', 'llm-hub', 'ai-feed', 'github-pulse'];

  function init() {
    const nav = document.querySelector('.nav');
    const dots = document.querySelectorAll('.section-dot[data-target]');

    // Dots click
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Nav links click
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Scroll events
    window.addEventListener('scroll', () => {
      // Nav shadow on scroll
      nav?.classList.toggle('scrolled', window.scrollY > 40);

      // Scrollspy
      let active = 'hero';
      SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.4) active = id;
      });

      dots.forEach(d => d.classList.toggle('active', d.dataset.target === active));
      document.querySelectorAll('.nav-link[data-section]').forEach(l => {
        l.classList.toggle('active', l.dataset.section === active);
      });
    }, { passive: true });
  }

  return { init };
})();

/* ================================================================
   9. FADE-UP INTERSECTION OBSERVER
   ================================================================ */
function initFadeUps() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
}

/* ================================================================
   9b. PHOTO METADATA SCAN TAGS
   ================================================================ */
function initPhotoMetadata() {
  const frame = document.querySelector('.hero-photo-frame');
  if (!frame) return;

  const TAGS = [
    { pct: 14, zh: '专注度',   en: 'Focus',      score: 94 },
    { pct: 30, zh: '好奇心',   en: 'Curiosity',  score: 99 },
    { pct: 50, zh: '数据直觉', en: 'Data Sense', score: 97 },
    { pct: 68, zh: 'Taste',    en: 'Taste',      score: 91 },
    { pct: 84, zh: '工程力',   en: 'Build',      score: 88 },
  ];

  const SCAN_MS   = 5000; // must match CSS animation duration
  const INIT_DELAY = 2000; // must match CSS animation-delay
  const SHOW_MS   = 2300;  // tag visible duration

  // Create DOM elements
  const tagEls = TAGS.map(t => {
    const el = document.createElement('div');
    el.className = 'photo-tag';
    el.style.top = t.pct + '%';
    el.innerHTML = `<span class="tag-name">${currentLang === 'zh' ? t.zh : t.en}</span><span class="tag-score">0</span>`;
    frame.appendChild(el);
    return { el, ...t };
  });

  /* Count score from 0 → target in ~550ms */
  function countUp(scoreEl, target) {
    const DUR = 550, start = performance.now();
    const run = (now) => {
      const p = Math.min((now - start) / DUR, 1);
      const v = Math.round((1 - Math.pow(1 - p, 2)) * target);
      scoreEl.textContent = v;
      if (p < 1) requestAnimationFrame(run);
      else scoreEl.textContent = target;
    };
    requestAnimationFrame(run);
  }

  /* One scan cycle — show each tag when scanline reaches it */
  function runCycle() {
    tagEls.forEach(t => {
      const delay = (t.pct / 100) * SCAN_MS;
      setTimeout(() => {
        // Update label for current lang
        t.el.querySelector('.tag-name').textContent =
          currentLang === 'zh' ? t.zh : t.en;
        t.el.querySelector('.tag-score').textContent = '0';
        t.el.classList.add('show');
        countUp(t.el.querySelector('.tag-score'), t.score);
        setTimeout(() => t.el.classList.remove('show'), SHOW_MS);
      }, delay);
    });
  }

  // Sync with CSS scan animation
  setTimeout(() => {
    runCycle();
    setInterval(runCycle, SCAN_MS);
  }, INIT_DELAY);
}

/* ================================================================
   10. SCROLL PROGRESS BAR
   ================================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ================================================================
   10b. STAT COUNTERS
   ================================================================ */
function initStatCounters() {
  const items = document.querySelectorAll('.stat-val[data-target]');
  if (!items.length) return;

  function countUp(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start    = performance.now();
    const run = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(run);
      else el.textContent = target;
    };
    requestAnimationFrame(run);
  }

  // Trigger when hero stats come into view
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;
  let triggered = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      items.forEach((el, i) => setTimeout(() => countUp(el), i * 120));
    }
  }, { threshold: 0.5 }).observe(statsEl);
}

/* ================================================================
   10c. SECTION TITLE LINE REVEAL
   ================================================================ */
function initTitleLines() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('line-reveal');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-title').forEach(el => io.observe(el));
}

/* ================================================================
   11. TYPEWRITER HERO
   ================================================================ */
function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;
  const C = CONTENT[currentLang];
  const roles = C.hero.roles;
  let roleIdx = 0, charIdx = 0, deleting = false;
  const PAUSE = 1800, TYPE_MS = 80, DEL_MS = 45;

  function tick() {
    const text = roles[roleIdx];
    if (!deleting) {
      el.textContent = text.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === text.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      el.textContent = text.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? DEL_MS : TYPE_MS);
  }
  tick();
}

/* ================================================================
   11. AI PEOPLE & PODCASTS RENDER
   ================================================================ */
function renderPeople() {
  const grid = document.getElementById('thinkers-grid');
  if (!grid) return;
  grid.innerHTML = AI_PEOPLE.map(p => `
    <a href="${p.url}" target="_blank" rel="noopener" class="thinker-card">
      <div class="thinker-avatar">${p.initials}</div>
      <div>
        <div class="thinker-name">${p.name}</div>
        <div class="thinker-org">${p.org}</div>
        <div class="thinker-desc">${p.desc}</div>
      </div>
    </a>
  `).join('');
}

function renderPodcasts() {
  const list = document.getElementById('podcast-list');
  if (!list) return;
  list.innerHTML = AI_PODCASTS.map(p => `
    <div class="podcast-row">
      <div class="podcast-art">${p.emoji}</div>
      <div>
        <div class="podcast-name">${p.name}</div>
        <div class="podcast-host">${p.host}</div>
      </div>
      <span class="podcast-badge">${p.tag}</span>
    </div>
  `).join('');
}

/* ================================================================
   12. INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Background canvas
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Canvas.init();
  }

  // Core systems
  Nav.init();
  Lang.init();
  LLMTable.init();
  Radar.init();
  GitHub.init();
  renderPeople();
  renderPodcasts();
  initFadeUps();
  initScrollProgress();
  initStatCounters();
  initTitleLines();
  initPhotoMetadata();

  // Hero entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('hero')?.classList.add('hero-loaded');
    });
  });

  // LLM score bars animate when section scrolls into view
  const llmSection = document.getElementById('llm-hub');
  if (llmSection) {
    let barsAnimated = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll('.score-fill').forEach((el, i) => {
          setTimeout(() => el.classList.add('animate'), i * 40 + 100);
        });
      }
    }, { threshold: 0.15 }).observe(llmSection);
  }
});
