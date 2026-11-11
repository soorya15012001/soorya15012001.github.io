/* ==========================================================================
   site.js — shared shell + renderers. All content lives in content.js
   (window.SITE); image sizes in media.js. Works from file:// (no fetch).
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var M = window.MEDIA || {};
  var doc = document, root = doc.documentElement;
  var page = doc.body.getAttribute("data-page") || "";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.remove("no-js");

  /* ---------------- helpers ---------------- */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var attr = esc;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function pad(n) { n = String(n); return n.length < 2 ? "0" + n : n; }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtMonth(ym) { var p = String(ym || "").split("-"); return p[1] ? MONTHS[+p[1] - 1] + " " + p[0] : p[0]; }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
  function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

  /* ---------------- icons ---------------- */
  var I = {
    mail: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="m3.5 6 8.5 7 8.5-7"/>',
    phone: '<path d="M5 3.5h3l1.5 4.5-2 1.3a12 12 0 0 0 7.2 7.2l1.3-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.7 2 2 0 0 1 5 3.5Z"/>',
    scholar: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
    cv: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h7M8.5 9.5h3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    prev: '<path d="m15 6-6 6 6 6"/>', next: '<path d="m9 6 6 6-6 6"/>',
    chat: '<path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M19 9h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-4-3h-3"/>',
    graph: '<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="5" r="2.2"/><circle cx="12" cy="18" r="2.2"/><circle cx="20" cy="16" r="1.6"/><path d="m6.8 7.4 4.2 8.6M7.2 5.8l9.6-.6M13.9 17.4l4.6-1.1M18.2 7l-5.2 9"/>',
    pulse: '<path d="M2 12h4l2.5-6 4 13 3-9 1.5 2H22"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.5c0 5.8-7.5 10.4-7.5 10.4Z"/><path d="M8.5 12.5h2l1-2 1.5 4 1-2h1.5"/>',
    watch: '<rect x="6" y="6" width="12" height="12" rx="3.5"/><path d="M9 6 9.5 2h5L15 6M9 18l.5 4h5l.5-4M12 9.5V12l1.8 1.2"/>',
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 10v4M12 17v3"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .8C5.8.8.8 5.8.8 12c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.2.8-.5v-1.9c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.1a10.7 10.7 0 0 1 5.6 0c2.1-1.4 3.1-1.1 3.1-1.1.6 1.6.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.6.8.5 4.4-1.5 7.6-5.7 7.6-10.6C23.2 5.8 18.2.8 12 .8Z"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.2h4V21H3zM9.4 9.2h3.8v1.6h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.6 4.78 6V21h-4v-5.5c0-1.3 0-3-1.86-3s-2.15 1.4-2.15 2.9V21h-4z"/>'
  };
  function icon(name, cls) { return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (I[name] || "") + "</svg>"; }
  var RIBBON = '<svg class="ribbon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9" r="2.2" fill="currentColor"/><path d="M8.6 13 6.5 21l3.4-1.6L12 22l2.1-2.6 3.4 1.6-2.1-8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  /* ---------------- images ---------------- */
  var IMG = "assets/img/";
  function img(key, o) {
    o = o || {};
    var m = M[key];
    if (!m) return "";
    var set = m.src2x ? ' srcset="' + IMG + m.src + " 640w, " + IMG + m.src2x + ' 1280w" sizes="' + attr(o.sizes || "(max-width: 860px) 100vw, 50vw") + '"' : "";
    return '<img src="' + IMG + m.src + '"' + set + ' width="' + m.w + '" height="' + m.h + '" alt="' + attr(o.alt || "") + '"' +
      (o.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  function full(key) { var m = M[key]; return m ? IMG + (m.src2x || m.src) : ""; }

  /* ---------------- theme ---------------- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  (function initTheme() {
    var q = /[?&]theme=(dark|light)\b/.exec(location.search); // ?theme=dark|light preview (not saved)
    var t = q ? q[1] : store("srs-theme");
    if (t === "dark" || t === "light") root.setAttribute("data-theme", t);
  })();

  /* ---------------- header + footer ---------------- */
  var NAV = [
    { id: "about", label: "About" },
    { id: "news", label: "News" },
    { id: "research", label: "Research" },
    { id: "publications", label: "Publications" },
    { id: "experience", label: "Experience" },
    { id: "teaching", label: "Teaching" },
    { id: "education", label: "Education" },
    { id: "cv", label: "CV" },
    { id: "life", label: "My Life" },
    { id: "contact", label: "Contact" }
  ];
  var P = S.profile || {};
  var MARK = '<svg class="brand__mark" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="9" fill="#003153"/>' +
    '<path d="M10 23 17 10 25 21 10 23" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="1.4"/>' +
    '<circle cx="10" cy="23" r="3.2" fill="#2ec4b6"/><circle cx="17" cy="10" r="3.2" fill="#f27c22"/><circle cx="25" cy="21" r="2.6" fill="#ffffff"/></svg>';

  function renderHeader() {
    var host = $("#site-header");
    if (!host) return;
    host.innerHTML = '<div class="wrap">' +
      '<a class="brand" href="#about" aria-label="' + attr(P.name) + ' — top of page">' + MARK + '<span class="brand__name">' + esc(P.name) + "</span></a>" +
      '<nav class="nav" aria-label="Sections"><ul class="nav__list" id="nav-list">' +
      NAV.map(function (n) { return '<li><a class="nav__link" href="#' + n.id + '">' + n.label + "</a></li>"; }).join("") +
      "</ul>" +
      '<button class="icon-btn theme-btn" type="button" aria-label="Switch to ' + (currentTheme() === "dark" ? "light" : "dark") + ' mode">' + icon(currentTheme() === "dark" ? "sun" : "moon") + "</button>" +
      '<button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="nav-list" aria-label="Open menu">' + icon("menu") + "</button>" +
      "</nav></div>";
    var tbtn = $(".theme-btn", host);
    tbtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store("srs-theme", next);
      tbtn.innerHTML = icon(next === "dark" ? "sun" : "moon");
      tbtn.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " mode");
      doc.dispatchEvent(new Event("themechange"));
    });
    var nav = $(".nav", host), mbtn = $(".menu-btn", host);
    function setMenu(open) {
      nav.classList.toggle("is-open", open);
      mbtn.setAttribute("aria-expanded", open ? "true" : "false");
      mbtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mbtn.innerHTML = icon(open ? "close" : "menu");
    }
    mbtn.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); mbtn.focus(); } });
    $$(".nav__link", host).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  }

  /* highlight the nav link of the section currently in view */
  function initScrollSpy() {
    var links = $$(".nav__link"), secs = links.map(function (a) { return doc.getElementById(a.getAttribute("href").slice(1)); }), current = null, ticking = false;
    function update() {
      ticking = false;
      var line = Math.min(window.innerHeight * .3, 260), idx = 0;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) idx = i; });
      if (window.innerHeight + window.scrollY >= doc.documentElement.scrollHeight - 4) idx = secs.length - 1;
      var a = links[idx];
      if (a === current) return;
      if (current) current.removeAttribute("aria-current");
      current = a; if (a) a.setAttribute("aria-current", "true");
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function renderFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var L = P.links;
    host.innerHTML = '<div class="wrap"><p>© 2026 ' + esc(P.name) + " · " + esc(P.affiliation) + " · Last updated " + esc(S.updated || "") + "</p>" +
      '<div class="footer-links"><a href="#" data-email>Email</a><a href="' + attr(L.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>' +
      '<a href="' + attr(L.github) + '" target="_blank" rel="noopener">GitHub</a><a href="' + attr(L.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="#cv">CV</a><a href="#about">Back to top ↑</a></div></div>';
  }

  function email() { return P.email ? P.email.user + "@" + P.email.domain : ""; }
  function wireEmail() { $$("[data-email]").forEach(function (a) { a.setAttribute("href", "mailto:" + email()); }); }

  /* ---------------- research-themed backgrounds ---------------- */
  var BG = {
    // neural-network layers (Research)
    layers: function (el) {
      var W = 1000, H = 420, cols = [4, 6, 6, 3], x0 = 560, dx = 120, s = "", nodes = [], r = rng(5);
      cols.forEach(function (n, c) {
        var col = [];
        for (var i = 0; i < n; i++) col.push([x0 + c * dx, H / 2 + (i - (n - 1) / 2) * 58]);
        nodes.push(col);
      });
      for (var c = 0; c < nodes.length - 1; c++) nodes[c].forEach(function (a) { nodes[c + 1].forEach(function (b) { s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>'; }); });
      nodes.forEach(function (col) { col.forEach(function (p) { var k = r(); s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11"' + (k > .8 ? ' class="hot"' : k > .55 ? ' class="cool"' : "") + "/>"; }); });
      el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">' + s + "</svg>";
    },
    // attention heat-map (Publications)
    attention: function (el) {
      var R = 12, C = 12, cell = 26, gap = 4, s = "", r = rng(9);
      for (var i = 0; i < R; i++) for (var j = 0; j < C; j++) {
        var d = Math.abs(i - j), v = Math.max(0, 1 - d / 4) * 0.85 + r() * 0.25 + (j === 0 ? .35 : 0);
        var fill = v > .9 ? "var(--orange)" : v > .6 ? "var(--turq)" : "currentColor";
        var op = fill === "currentColor" ? Math.min(.8, .2 + v * .6) : Math.min(.32, .1 + v * .22);
        s += '<rect x="' + (j * (cell + gap)) + '" y="' + (i * (cell + gap)) + '" width="' + cell + '" height="' + cell + '" rx="4" fill="' + fill + '" fill-opacity="' + op.toFixed(2) + '"/>';
      }
      var size = C * (cell + gap);
      el.innerHTML = '<svg viewBox="-' + (size * 1.6) + " -40 " + (size * 2.7) + " " + (size + 80) + '" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">' + s + "</svg>";
    },
    // graph paper with an axis (Experience)
    grid: function (el) {
      var W = 1000, H = 400, s = "";
      for (var x = 0; x <= W; x += 40) s += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>';
      for (var y = 0; y <= H; y += 40) s += '<line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>';
      var pts = [[520, 300], [600, 270], [680, 280], [760, 210], [840, 180], [920, 110], [1000, 80]];
      s += '<polyline points="' + pts.map(function (p) { return p.join(","); }).join(" ") + '" fill="none" stroke="var(--turq)" stroke-opacity=".7" stroke-width="2" vector-effect="non-scaling-stroke"/>';
      pts.forEach(function (p, i) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + (i === pts.length - 2 ? "var(--orange)" : "var(--bg)") + '" stroke="var(--turq)" stroke-width="2" vector-effect="non-scaling-stroke"/>'; });
      el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">' + s + "</svg>";
    },
    // ruled sheet (CV)
    ruled: function (el) {
      var W = 1000, H = 400, s = "";
      for (var y = 28; y < H; y += 28) s += '<line x1="0" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>';
      s += '<line x1="' + W * 0.84 + '" x2="' + W * 0.84 + '" y1="0" y2="' + H + '" stroke="var(--orange)" stroke-opacity=".45" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
      el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true">' + s + "</svg>";
    },
    // topographic contours (My Life)
    topo: function (el) {
      var C = 84, R = 40, W = 1000, H = 476, sx = W / C, sy = H / R, grid = [], d = "";
      function f(x, y) { return Math.sin(x * .11 + 1.3) * Math.cos(y * .17 - .4) + .6 * Math.sin((x + y) * .07 + 2.1) + .45 * Math.cos(x * .05 - y * .12 + .8) + .25 * Math.sin(x * .23 + y * .19); }
      for (var j = 0; j <= R; j++) { grid[j] = []; for (var i = 0; i <= C; i++) grid[j][i] = f(i, j); }
      function lerp(a, b, t) { return a + (b - a) * t; }
      for (var L = -1.6; L <= 1.8; L += .32) for (var y = 0; y < R; y++) for (var x = 0; x < C; x++) {
        var a = grid[y][x], b = grid[y][x + 1], c = grid[y + 1][x + 1], e = grid[y + 1][x];
        var idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        var top = [lerp(x, x + 1, (L - a) / (b - a)), y], right = [x + 1, lerp(y, y + 1, (L - b) / (c - b))],
          bot = [lerp(x, x + 1, (L - e) / (c - e)), y + 1], left = [x, lerp(y, y + 1, (L - a) / (e - a))];
        var segs = { 1: [[left, bot]], 2: [[bot, right]], 3: [[left, right]], 4: [[top, right]], 5: [[left, top], [bot, right]], 6: [[top, bot]], 7: [[left, top]], 8: [[left, top]], 9: [[top, bot]], 10: [[top, right], [left, bot]], 11: [[top, right]], 12: [[left, right]], 13: [[bot, right]], 14: [[left, bot]] }[idx];
        for (var q = 0; q < segs.length; q++) d += "M" + (segs[q][0][0] * sx).toFixed(1) + " " + (segs[q][0][1] * sy).toFixed(1) + "L" + (segs[q][1][0] * sx).toFixed(1) + " " + (segs[q][1][1] * sy).toFixed(1);
      }
      el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="' + d + '"/></svg>';
    },
    // live network graph (Home hero)
    network: function (el) {
      var cv = doc.createElement("canvas"); el.appendChild(cv);
      var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, nodes = [], colors = {}, mouse = null, running = false, raf = 0;
      var r = rng(3);
      function readColors() { colors = { turq: cssVar("--turq"), orange: cssVar("--orange"), prussian: cssVar("--prussian"), line: cssVar("--prussian") }; }
      function resize() {
        var b = el.getBoundingClientRect(); W = b.width; H = b.height;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.max(26, Math.min(70, Math.round(W * H / 16000)));
        nodes = [];
        for (var i = 0; i < n; i++) {
          var k = r();
          nodes.push({ x: r() * W, y: r() * H, vx: (r() - .5) * .22, vy: (r() - .5) * .22, rad: 1.6 + r() * 2.2, c: k > .86 ? "orange" : k > .55 ? "turq" : "prussian" });
        }
        draw();
      }
      function draw() {
        ctx.clearRect(0, 0, W, H);
        var maxD = Math.min(150, Math.max(110, W / 9));
        ctx.lineWidth = 1;
        for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) { ctx.globalAlpha = (1 - d / maxD) * .32; ctx.strokeStyle = colors.line; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        if (mouse) nodes.forEach(function (n) {
          var dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) { ctx.globalAlpha = (1 - d / 170) * .6; ctx.strokeStyle = colors.orange; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        });
        nodes.forEach(function (n) { ctx.globalAlpha = n.c === "prussian" ? .45 : .85; ctx.fillStyle = colors[n.c]; ctx.beginPath(); ctx.arc(n.x, n.y, n.rad, 0, 6.283); ctx.fill(); });
        ctx.globalAlpha = 1;
      }
      function step() {
        nodes.forEach(function (n) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = W + 10; if (n.x > W + 10) n.x = -10; if (n.y < -10) n.y = H + 10; if (n.y > H + 10) n.y = -10;
        });
        draw();
        if (running) raf = requestAnimationFrame(step);
      }
      function start() { if (!running && !reduceMotion) { running = true; raf = requestAnimationFrame(step); } }
      function stop() { running = false; cancelAnimationFrame(raf); }
      readColors(); resize();
      window.addEventListener("resize", function () { resize(); });
      doc.addEventListener("themechange", function () { readColors(); draw(); });
      var hero = el.parentNode;
      hero.addEventListener("pointermove", function (e) { var b = el.getBoundingClientRect(); mouse = { x: e.clientX - b.left, y: e.clientY - b.top }; if (!running) draw(); });
      hero.addEventListener("pointerleave", function () { mouse = null; if (!running) draw(); });
      if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }).observe(el); else start();
      doc.addEventListener("visibilitychange", function () { doc.hidden ? stop() : start(); });
    }
  };
  function renderBackgrounds() { $$("[data-bg]").forEach(function (el) { var k = el.getAttribute("data-bg"); if (BG[k]) BG[k](el); }); }

  /* ---------------- renderers ---------------- */
  var R = {};

  R.now = function (el) {
    el.innerHTML = '<div class="wrap"><div class="now__label"><i aria-hidden="true"></i>Now</div>' +
      (S.now || []).map(function (n) { return '<div class="now__item">' + n + "</div>"; }).join("") + "</div>";
  };

  R.news = function (el) {
    var limit = +el.getAttribute("data-limit") || 999, items = S.news || [];
    el.innerHTML = '<ul class="news">' + items.map(function (n, i) {
      return "<li" + (i >= limit ? " hidden" : "") + '><time datetime="' + attr(n.date) + '">' + fmtMonth(n.date) + '</time><div class="news__text">' + n.text + "</div></li>";
    }).join("") + "</ul>" + (items.length > limit ? '<p style="margin-top:16px"><button class="chip" type="button" data-more aria-expanded="false">Show all ' + items.length + " updates</button></p>" : "");
    var more = $("[data-more]", el);
    if (more) more.addEventListener("click", function () {
      var open = more.getAttribute("aria-expanded") === "true";
      $$("li", el).forEach(function (li, i) { if (i >= limit) li.hidden = open; });
      more.setAttribute("aria-expanded", open ? "false" : "true");
      more.textContent = open ? "Show all " + items.length + " updates" : "Show fewer";
    });
  };

  var THEME_STYLE = { llm: ["chat", "var(--orange)"], risk: ["graph", "var(--turq)"], support: ["heart", "var(--prussian)"] };
  R.themes = function (el) {
    var fullMode = el.getAttribute("data-mode") === "full";
    var themes = (S.themes || []).filter(function (t) { return t.card !== false; });
    var pubs = S.pubs || [];
    el.innerHTML = '<div class="grid grid--' + (el.getAttribute("data-cols") || "2") + '">' + themes.map(function (t) {
      var st = THEME_STYLE[t.id] || ["graph", "var(--turq)"];
      var list = fullMode ? pubs.filter(function (p) { return p.theme === t.id; }) : [];
      return '<article class="card theme-card reveal" id="theme-' + attr(t.id) + '" style="--tc:' + st[1] + '"><div class="theme-card__icon">' + icon(st[0]) + "</div>" +
        "<h3>" + esc(t.title) + "</h3><p>" + t.blurb + "</p>" +
        (list.length ? "<ul>" + list.map(function (p) { return '<li><a href="#' + attr(p.id) + '">' + esc(p.short || p.title) + '</a><span class="v">' + esc(p.venue) + "</span></li>"; }).join("") + "</ul>" : "") +
        "</article>";
    }).join("") + "</div>";
  };

  /* ---- publications ---- */
  var TOPICS = {
    ai: { label: "AI & LLMs", c: "#2ec4b6" }, mh: { label: "Mental Health & Wellbeing", c: "#f27c22" },
    online: { label: "Online Communities", c: "#3a7bd5" }, health: { label: "Healthcare & Clinical AI", c: "#4caf7a" },
    mobility: { label: "Transportation & Safety", c: "#c9962e" }, vision: { label: "Computer Vision", c: "#8b6cd1" }
  };
  var METHOD_COLORS = ["#5b8fd6", "#2ec4b6", "#f27c22", "#4caf7a", "#8b6cd1", "#c9962e", "#e05d7a", "#6b8796"];
  var methodColor = {};
  function mColor(m) { if (!methodColor[m]) methodColor[m] = METHOD_COLORS[Object.keys(methodColor).length % METHOD_COLORS.length]; return methodColor[m]; }
  function linkLabel(l) { return ({ Paper: "DL", Chapter: "DL", arXiv: "Preprint" })[l] || l; }
  function authorsHTML(list) {
    return list.map(function (a) {
      var star = /\*$/.test(a), name = a.replace(/\*$/, "");
      return (name.indexOf("Soorya Ram Shimgekar") === 0 ? '<span class="me">' + esc(name) + "</span>" : esc(name)) + (star ? "<sup>*</sup>" : "");
    }).join(", ");
  }
  function bibtex(p) {
    var authors = (p.authors || []).map(function (a) { return a.replace(/\*$/, ""); });
    var key = (authors[0] || "anon").split(" ").pop().toLowerCase().replace(/[^a-z]/g, "") + p.year + ((p.title.match(/[A-Za-z]{4,}/) || ["paper"])[0].toLowerCase());
    var type = p.bib || (p.kind === "Journal" ? "article" : p.kind === "Preprint" ? "misc" : "inproceedings");
    var f = ["  title     = {" + p.title + "}", "  author    = {" + authors.join(" and ") + "}"];
    if (type === "article") f.push("  journal   = {" + (p.container || p.venueFull || p.venue) + "}");
    else if (type === "inproceedings" || type === "incollection") f.push("  booktitle = {" + (p.container || p.venueFull || p.venue) + "}");
    else if (p.arxiv) { f.push("  eprint    = {" + p.arxiv + "}"); f.push("  archivePrefix = {arXiv}"); }
    else f.push("  howpublished = {" + (p.venueFull || p.venue) + "}");
    if (p.pages) f.push("  pages     = {" + p.pages + "}");
    if (p.volume) f.push("  volume    = {" + p.volume + "}");
    if (p.publisher) f.push("  publisher = {" + p.publisher + "}");
    f.push("  year      = {" + p.year + "}");
    if (p.doi) f.push("  doi       = {" + p.doi + "}");
    if ((p.links || [])[0]) f.push("  url       = {" + p.links[0].url + "}");
    return "@" + type + "{" + key + ",\n" + f.join(",\n") + "\n}";
  }
  function copyText(text, btn) {
    function done(ok) { var t = btn.textContent; btn.textContent = ok ? "Copied ✓" : "Select & copy"; setTimeout(function () { btn.textContent = t; }, 1600); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    else { var ta = doc.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; doc.body.appendChild(ta); ta.select(); var ok = false; try { ok = doc.execCommand("copy"); } catch (e) {} doc.body.removeChild(ta); done(ok); }
  }
  function pubNumber(p) { var all = S.pubs || []; return all.length - all.indexOf(p); }
  function pubHTML(p, o) {
    o = o || {};
    var btns = (p.links || []).map(function (l) { return '<a class="pbtn" href="' + attr(l.url) + '" target="_blank" rel="noopener">' + esc(linkLabel(l.label)) + "</a>"; }).join("") +
      (p.tldr ? '<button class="pbtn pbtn--ghost" type="button" data-toggle="tldr" aria-expanded="false">TL;DR</button>' : "") +
      '<button class="pbtn pbtn--ghost" type="button" data-toggle="bib" aria-expanded="false">Cite</button>';
    var venueLine = "<em>" + esc(p.venueFull || p.venue) + "</em>" +
      (p.award ? ' <span class="pub__award">' + esc(p.award) + RIBBON + "</span>" : "") +
      (p.accept ? ' <span class="pub__accept">Acceptance rate ' + esc(p.accept) + "</span>" : "");
    var shortV = p.venueUrl ? '<a href="' + attr(p.venueUrl) + '" target="_blank" rel="noopener">' + esc(p.venue) + "</a>" : "<span>" + esc(p.venue) + "</span>";
    var flags = [p.role, p.kind].filter(Boolean).map(function (f) { return '<span class="pub__flag">' + esc(f) + "</span>"; }).join("");
    var tags = (p.topics || []).map(function (t) { var T = TOPICS[t]; return T ? '<span class="ttag"><i style="background:' + T.c + '"></i>' + esc(T.label) + "</span>" : ""; }).join("") +
      (p.methods || []).map(function (m) { return '<span class="mtag"><i style="background:' + mColor(m) + '"></i>' + esc(m) + "</span>"; }).join("");
    return '<li class="pub"' + (o.anchor === false ? "" : ' id="' + attr(p.id) + '"') + ' data-topics="' + attr((p.topics || []).join(" ")) + '" data-first="' + (p.first ? 1 : 0) + '" data-award="' + (p.award ? 1 : 0) + '">' +
      '<div class="pub__no" aria-hidden="true">' + pubNumber(p) + ".</div><div class=\"pub__body\">" +
      '<div class="pub__head"><h4 class="pub__title">' + esc(p.title) + '</h4><div class="pub__btns">' + btns + "</div></div>" +
      (p.formerly ? '<p class="pub__formerly">Earlier version titled “' + esc(p.formerly) + "”</p>" : "") +
      '<p class="pub__authors">' + authorsHTML(p.authors || []) + "</p>" +
      '<p class="pub__venue">' + venueLine + "</p>" +
      '<p class="pub__short">' + shortV + flags + "</p>" +
      (tags ? '<div class="pub__tags">' + tags + "</div>" : "") +
      (p.tldr ? '<div class="pub__panel" data-panel="tldr" hidden><p>' + esc(p.tldr) + "</p>" + (p.finding ? '<p class="pub__finding">' + esc(p.finding) + "</p>" : "") + "</div>" : "") +
      '<div class="bib" data-panel="bib" hidden><pre><code>' + esc(bibtex(p)) + '</code></pre><button class="copy-btn" type="button" data-copy-bib>Copy BibTeX</button></div>' +
      "</div></li>";
  }
  function wirePubs(el) {
    $$("[data-toggle]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var panel = $('[data-panel="' + b.getAttribute("data-toggle") + '"]', b.closest(".pub__body"));
        var open = panel.hidden; panel.hidden = !open; b.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    $$("[data-copy-bib]", el).forEach(function (b) { b.addEventListener("click", function () { copyText($("code", b.parentNode).textContent, b); }); });
  }

  R.selected = function (el) {
    var pubs = (S.pubs || []).filter(function (p) { return p.selected; });
    el.innerHTML = '<ol class="pubs pubs--compact">' + pubs.map(function (p) { return pubHTML(p, { anchor: false }); }).join("") + "</ol>";
    wirePubs(el);
  };

  R.pubs = function (el) {
    var pubs = S.pubs || [], total = pubs.length, state = { topic: "all", first: false, award: false }, counts = {};
    pubs.forEach(function (p) { (p.topics || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    var awardCount = pubs.filter(function (p) { return p.award; }).length;
    var chips = '<div class="chip-row" role="group" aria-label="Filter by topic"><button class="chip" type="button" aria-pressed="true" data-topic="all">All <span class="n">' + total + "</span></button>" +
      Object.keys(TOPICS).filter(function (k) { return counts[k]; }).map(function (k) {
        return '<button class="chip" type="button" aria-pressed="false" data-topic="' + k + '"><i class="dot" style="background:' + TOPICS[k].c + '"></i>' + esc(TOPICS[k].label) + ' <span class="n">' + counts[k] + "</span></button>";
      }).join("") + '<button class="chip" type="button" aria-pressed="false" data-award>' + RIBBON + 'Awards <span class="n">' + awardCount + "</span></button></div>";
    var years = [];
    pubs.forEach(function (p) { if (years.indexOf(p.year) < 0) years.push(p.year); });
    var tools = '<div class="tracklist-tools">' + chips + '<label class="toggle"><input type="checkbox" data-first-filter> First / co-first author only</label></div>' +
      '<nav class="year-nav" aria-label="Jump to year"><span>Jump to:</span>' + years.map(function (y) { return '<a href="#year-' + y + '">' + y + "</a>"; }).join("") + "</nav>";
    var groups = years.map(function (y) {
      return '<section class="year-group" id="year-' + y + '"><h3 class="year-group__label">' + y + ' <small data-count></small></h3><ol class="pubs">' +
        pubs.filter(function (p) { return p.year === y; }).map(function (p) { return pubHTML(p); }).join("") + "</ol></section>";
    }).join("");
    el.innerHTML = tools + groups + '<p class="legend">My name is underlined in bold · <sup>*</sup> equal contribution · DL = publisher’s digital library · Cite = BibTeX</p>';
    function apply() {
      $$(".pub", el).forEach(function (t) {
        t.hidden = !((state.topic === "all" || (" " + t.getAttribute("data-topics") + " ").indexOf(" " + state.topic + " ") >= 0) &&
          (!state.first || t.getAttribute("data-first") === "1") && (!state.award || t.getAttribute("data-award") === "1"));
      });
      $$(".year-group", el).forEach(function (g) { var c = $$(".pub:not([hidden])", g).length; g.hidden = c === 0; $("[data-count]", g).textContent = c + (c === 1 ? " paper" : " papers"); });
    }
    $$("[data-topic]", el).forEach(function (b) {
      b.addEventListener("click", function () { state.topic = b.getAttribute("data-topic"); $$("[data-topic]", el).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); apply(); });
    });
    var ab = $("[data-award]", el);
    ab.addEventListener("click", function () { state.award = !state.award; ab.setAttribute("aria-pressed", state.award ? "true" : "false"); apply(); });
    $("[data-first-filter]", el).addEventListener("change", function (e) { state.first = e.target.checked; apply(); });
    wirePubs(el);
    apply();
    if (location.hash) { var t = doc.getElementById(location.hash.slice(1)); if (t && t.classList.contains("pub")) t.classList.add("is-target"); }
  };

  R.stats = function (el) {
    var s = S.scholar || {}, pubs = S.pubs || [];
    el.innerHTML = '<dl class="stats">' +
      '<div class="stat"><dt>Papers &amp; preprints</dt><dd>' + pubs.length + "</dd></div>" +
      '<div class="stat"><dt>First / co-first author</dt><dd>' + pubs.filter(function (p) { return p.first; }).length + "</dd></div>" +
      '<div class="stat"><dt>Citations</dt><dd>' + esc(s.citations) + "</dd></div>" +
      '<div class="stat"><dt>h-index</dt><dd>' + esc(s.h) + "</dd></div></dl>";
  };

  R.projects = function (el) {
    el.innerHTML = '<div class="grid grid--3">' + (S.projects || []).filter(function (p) { return p.featured; }).map(function (p) {
      var tag = p.url ? "a" : "article";
      return "<" + tag + ' class="card card--hover reveal"' + (p.url ? ' href="' + attr(p.url) + '" target="_blank" rel="noopener"' : "") + '><div class="card__kicker">' + esc(p.when || "") + "</div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + '</p><div class="card__foot">' +
        (p.tags || []).map(function (t) { return '<span class="badge">' + esc(t) + "</span>"; }).join("") + (p.url ? '<span class="badge badge--turq">Code on GitHub</span>' : "") + "</div></" + tag + ">";
    }).join("") + "</div>";
  };
  R.repos = function (el) {
    el.innerHTML = '<ul class="credits">' + (S.projects || []).filter(function (p) { return !p.featured; }).map(function (p) {
      return '<li><span class="what">' + (p.url ? '<a href="' + attr(p.url) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title)) + "<small>" + esc(p.text) + '</small></span><span class="dots" aria-hidden="true"></span><span class="when">' + esc(p.when || "") + "</span></li>";
    }).join("") + "</ul>";
  };

  R.experience = function (el) {
    el.innerHTML = '<ol class="timeline">' + (S.experience || []).map(function (x) {
      return '<li class="tl-item reveal' + (x.current ? " is-current" : "") + '"><div class="tl-when">' + esc(x.when) + '</div><div class="tl-body"><h3>' + esc(x.role) + "</h3>" +
        '<div class="tl-org">' + (x.url ? '<a href="' + attr(x.url) + '" target="_blank" rel="noopener">' + esc(x.org) + "</a>" : "<span>" + esc(x.org) + "</span>") + '<span class="where">' + esc(x.where) + "</span></div>" +
        (x.bullets && x.bullets.length ? "<ul>" + x.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" : "") +
        (x.tags ? '<div class="tl-tags">' + x.tags.map(function (t) { return '<span class="badge">' + esc(t) + "</span>"; }).join("") + "</div>" : "") + "</div></li>";
    }).join("") + "</ol>";
  };
  R.teaching = function (el) {
    el.innerHTML = '<ol class="teaching">' + (S.teaching || []).map(function (t) {
      return '<li class="reveal"><span class="teaching__term">' + esc(t.term) + '</span><span class="teaching__course"><span class="teaching__code">' + esc(t.code) + "</span>" +
        (t.url ? '<a href="' + attr(t.url) + '" target="_blank" rel="noopener">' + esc(t.title) + "</a>" : "<span>" + esc(t.title) + "</span>") +
        (t.instructor ? "<small>with " + esc(t.instructor) + "</small>" : "") + '</span><span class="teaching__role">' + esc(t.role) + "</span></li>";
    }).join("") + "</ol>" + (S.teachingNote ? '<p class="legend">' + S.teachingNote + "</p>" : "");
  };
  R.education = function (el) {
    el.innerHTML = '<div class="grid grid--3">' + (S.education || []).map(function (e) {
      return '<article class="card reveal"><div class="card__kicker">' + esc(e.when) + "</div><h3>" + esc(e.degree) + '</h3><p style="margin:0 0 .5em">' + esc(e.school) + "</p>" +
        (e.detail ? '<p class="small muted" style="margin:0">' + e.detail + "</p>" : "") + "</article>";
    }).join("") + "</div>";
  };
  R.awards = function (el) {
    el.innerHTML = '<ul class="credits">' + (S.awards || []).map(function (a) {
      return '<li><span class="what">' + esc(a.title) + (a.note ? "<small>" + a.note + "</small>" : "") + '</span><span class="dots" aria-hidden="true"></span><span class="when">' + esc(a.when) + "</span></li>";
    }).join("") + "</ul>";
  };
  R.skills = function (el) {
    var sk = S.skills || [];
    var groups = Array.isArray(sk) ? sk : Object.keys(sk).map(function (k) { return { group: k, items: sk[k] }; });
    el.innerHTML = '<dl class="skills">' + groups.map(function (g) {
      return '<div class="skills__row"><dt>' + esc(g.group) + "</dt><dd>" +
        g.items.map(function (t, i) { return "<span>" + esc(t) + (i < g.items.length - 1 ? '<i aria-hidden="true">·</i>' : "") + "</span>"; }).join(" ") + "</dd></div>";
    }).join("") + "</dl>";
  };
  R.glance = function (el) {
    var s = S.scholar || {};
    var rows = (S.glance || []).concat([["Publications", (S.pubs || []).length + " papers & preprints"], ["Citations", s.citations + " · h-index " + s.h], ["Teaching", (S.teaching || []).length + " TA terms"]]);
    el.innerHTML = rows.map(function (r) { return '<li><span class="what">' + esc(r[0]) + '</span><span class="dots" aria-hidden="true"></span><span class="when">' + esc(r[1]) + "</span></li>"; }).join("");
  };

  R.contact = function (el) {
    var L = P.links;
    var rows = [["Email", email(), "mail", "mailto:" + email()], ["Phone", P.phone, "phone", "tel:" + (P.phone || "").replace(/[^+\d]/g, "")],
      ["Scholar", "Google Scholar profile", "scholar", L.scholar], ["GitHub", L.github.replace(/^https?:\/\//, ""), "github", L.github],
      ["LinkedIn", L.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), "linkedin", L.linkedin], ["CV", "View or download", "cv", "#cv"]];
    el.innerHTML = '<ul class="contact-list">' + rows.map(function (r) {
      var ext = /^https?:/.test(r[3]);
      return '<li><a href="' + attr(r[3]) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + '><span class="k">' + r[0] + '</span><span class="v">' + esc(r[1]) + "</span>" + icon(r[2]) + "</a></li>";
    }).join("") + "</ul>";
  };
  R.address = function (el) { el.innerHTML = (P.address || []).map(esc).join("<br>"); };
  R.advisors = function (el) {
    el.innerHTML = '<div class="grid grid--2">' + (P.advisors || []).map(function (a) {
      return '<article class="card reveal"><div class="card__kicker">Advisor</div><h3><a href="' + attr(a.url) + '" target="_blank" rel="noopener">' + esc(a.name) + '</a></h3><p style="margin:0 0 .5em">' + esc(a.title) + "</p>" +
        '<p class="small" style="margin:0"><a href="' + attr(a.labUrl) + '" target="_blank" rel="noopener">' + esc(a.lab) + "</a> — " + esc(a.labNote) + "</p></article>";
    }).join("") + "</div>";
  };
  R.teaser = function (el) {
    el.innerHTML = '<div class="teaser">' + (S.teaser || []).map(function (t) {
      return '<a href="' + attr(t.href) + '">' + img(t.k, { alt: t.alt, sizes: "(max-width: 520px) 50vw, (max-width: 900px) 33vw, 20vw" }) + "<span>" + esc(t.title) + "<small>" + esc(t.sub) + "</small></span></a>";
    }).join("") + "</div>";
  };

  /* ---- photos ---- */
  function shot(s) {
    var m = M[s.k] || {};
    var ar = s.ar || (m.w && m.h ? m.w + "/" + m.h : "4/3");
    var meta = [s.p, s.d].filter(Boolean).join(" · ");
    return '<figure class="shot reveal" style="--span:' + (s.span || 4) + ";--span-md:" + (s.md || (s.span >= 8 ? 12 : 6)) + '">' +
      '<button class="shot__frame" type="button" style="--ar:' + ar + (s.pos ? ";--pos:" + s.pos : "") + '" data-lb="' + attr(full(s.k)) + '" data-lb-cap="' + attr(s.c) + '" data-lb-place="' + attr(meta) + '" aria-label="Enlarge photo: ' + attr(s.alt || s.c) + '">' +
      img(s.k, { alt: s.alt || s.c, sizes: s.span >= 8 ? "(max-width: 860px) 100vw, 66vw" : s.span >= 6 ? "(max-width: 860px) 100vw, 50vw" : "(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw" }) +
      '</button><figcaption><span class="c">' + esc(s.c) + "</span>" + (meta ? '<span class="p">' + esc(meta) + "</span>" : "") + "</figcaption></figure>";
  }
  function galleryHTML(set) { return '<div class="sheet">' + ((S.galleries || {})[set] || []).map(shot).join("") + "</div>"; }
  R.gallery = function (el) { el.innerHTML = galleryHTML(el.getAttribute("data-set")); };
  R.garage = function (el) { el.innerHTML = garageHTML(el.getAttribute("data-set")); };
  function garageHTML(set) {
    return '<div class="garage">' + ((S.garage || {})[set] || []).map(function (g) {
      return '<article class="machine reveal"><button class="machine__img" type="button" style="' + (g.pos ? "--pos:" + g.pos : "") + '" data-lb="' + attr(full(g.k)) + '" data-lb-cap="' + attr(g.name) + '" data-lb-place="' + attr(g.place || "") + '" aria-label="Enlarge photo of the ' + attr(g.name) + '">' +
        img(g.k, { alt: g.alt || g.name, sizes: "(max-width: 860px) 100vw, 33vw" }) + '</button><div class="machine__body"><h3>' + esc(g.name) + '</h3><div class="machine__spec">' +
        (g.spec || []).map(function (s) { return '<span class="badge">' + esc(s) + "</span>"; }).join("") + "</div><p>" + esc(g.text) + "</p></div></article>";
    }).join("") + "</div>";
  }

  /* ---- travel ---- */
  R.map = function (el) {
    var D = window.WORLD_DOTS;
    if (!D) return;
    var x0 = 28, x1 = 342, latTop = D.latMax, H = D.latMax - D.latMin, st = D.step, rr = (st * .3).toFixed(2);
    var s = '<svg viewBox="' + x0 + " 0 " + (x1 - x0) + " " + H + '" role="img" aria-labelledby="map-title"><title id="map-title">World map of places I have lived and travelled</title><g>';
    D.cells.split(";").forEach(function (cell) { var p = cell.split(","), cx = (+p[0] + .5) * st, cy = (+p[1] + .5) * st; if (cx >= x0 && cx <= x1) s += '<circle class="dot" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + rr + '"/>'; });
    s += "</g><g>";
    (S.places || []).forEach(function (pl) {
      s += '<g class="pin' + (pl.home ? " is-home" : "") + '" tabindex="0" role="button" data-region="' + attr(pl.region) + '" data-name="' + attr(pl.name + " · " + pl.when) + '" aria-label="' + attr(pl.name + ", " + pl.country + ", " + pl.when) + '" transform="translate(' + (pl.lon + 180).toFixed(2) + " " + (latTop - pl.lat).toFixed(2) + ')"><circle class="ring" r="2.4"/><circle class="core" r="2.4"/></g>';
    });
    el.innerHTML = '<div class="map">' + s + '</g></svg><div class="map__tip" aria-hidden="true"></div><div class="map__legend"><span><i class="h"></i>Home</span><span><i></i>Visited</span></div></div>';
    var tip = $(".map__tip", el), box = $(".map", el);
    $$(".pin", el).forEach(function (g) {
      function show() { var b = g.getBoundingClientRect(), mb = box.getBoundingClientRect(); tip.textContent = g.getAttribute("data-name"); tip.style.left = (b.left + b.width / 2 - mb.left) + "px"; tip.style.top = (b.top - mb.top) + "px"; tip.classList.add("is-on"); }
      function hide() { tip.classList.remove("is-on"); }
      function go() { var t = doc.getElementById("region-" + g.getAttribute("data-region")); if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
      g.addEventListener("mouseenter", show); g.addEventListener("mouseleave", hide); g.addEventListener("focus", show); g.addEventListener("blur", hide);
      g.addEventListener("click", go); g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  };
  R.stamps = function (el) {
    var places = S.places || [], countries = [];
    places.forEach(function (p) { if (countries.indexOf(p.country) < 0) countries.push(p.country); });
    el.innerHTML = '<div class="stamp-row">' + countries.map(function (c) { var n = places.filter(function (p) { return p.country === c; }).length; return '<span class="stamp"><b>' + esc(c) + "</b>" + n + (n === 1 ? " place" : " places") + "</span>"; }).join("") + "</div>";
  };
  R.regions = function (el) {
    el.innerHTML = '<div class="regions">' + (S.regions || []).map(function (rg) {
      return '<section class="region" id="region-' + attr(rg.id) + '"><div class="region__head"><h3>' + esc(rg.title) + '</h3><span class="places">' + esc(rg.places) + "</span></div>" +
        (rg.blurb ? '<p class="region__blurb">' + rg.blurb + "</p>" : "") + '<div class="sheet">' + rg.shots.map(shot).join("") + "</div></section>";
    }).join("") + "</div>";
  };

  /* ---- music ---- */
  var ACCENTS = ["var(--orange)", "var(--turq)", "var(--prussian)"];
  R.artists = function (el) {
    el.innerHTML = '<div class="artists">' + (S.artists || []).map(function (a, i) {
      return '<article class="artist reveal" style="--ac:' + ACCENTS[i % 3] + '"><h4>' + esc(a.name) + '</h4><div class="meta">' + esc(a.genre) + " · " + esc(a.from) + "</div><p>" + esc(a.line) + "</p>" +
        (a.works ? '<p class="works">' + a.works.map(esc).join(" · ") + "</p>" : "") +
        (a.url ? '<a href="' + attr(a.url) + '" target="_blank" rel="noopener">Listen / learn more →</a>' : "") + "</article>";
    }).join("") + "</div>";
  };
  /* ---- My Life albums: cover tiles that open an overlay ---- */
  function renderIn(container) {
    $$("[data-render]", container).forEach(function (el) { var k = el.getAttribute("data-render"); if (R[k]) { try { R[k](el); } catch (e) { if (window.console) console.error("render " + k, e); } } });
  }
  function albumCount(a) {
    var n = 0;
    (a.blocks || []).forEach(function (b) {
      if (b.gallery) n += ((S.galleries || {})[b.gallery] || []).length;
      if (b.garage) n += ((S.garage || {})[b.garage] || []).length;
      if (b.regions) (S.regions || []).forEach(function (r) { n += r.shots.length; });
    });
    return n;
  }
  R.albums = function (el) {
    var albums = S.albums || [];
    el.innerHTML = '<div class="albums">' + albums.map(function (a) {
      return '<button class="album-tile reveal" type="button" data-album="' + attr(a.id) + '" aria-haspopup="dialog">' +
        img(a.k, { alt: a.alt, sizes: "(max-width: 520px) 50vw, (max-width: 980px) 33vw, 18vw" }) +
        '<span class="album-tile__text"><b>' + esc(a.title) + "</b><small>" + esc(a.sub) + '</small></span><span class="album-tile__count">' + albumCount(a) + " photos</span></button>";
    }).join("") + "</div>";
    albums.forEach(function (a, i) {
      var dlg = doc.createElement("dialog");
      dlg.className = "album"; dlg.id = "album-" + a.id; dlg.setAttribute("data-lb-group", ""); dlg.setAttribute("aria-labelledby", "album-" + a.id + "-title");
      var nextA = albums[(i + 1) % albums.length], prevA = albums[(i - 1 + albums.length) % albums.length];
      var blocks = (a.blocks || []).map(function (b) {
        if (b.heading) return '<div class="subhead"><h3>' + esc(b.heading) + "</h3></div>";
        if (b.gallery) return '<div data-render="gallery" data-set="' + attr(b.gallery) + '"></div>';
        if (b.garage) return '<div data-render="garage" data-set="' + attr(b.garage) + '"></div>';
        if (b.map) return '<div data-render="map"></div>';
        if (b.stamps) return '<div data-render="stamps" style="margin-bottom:28px"></div>';
        if (b.regions) return '<div data-render="regions"></div>';
        if (b.genres) return '<div data-render="genres"></div>';
        if (b.artists) return '<div data-render="artists"></div>';
        return "";
      }).join("");
      dlg.innerHTML = '<div class="album__bar"><div class="wrap"><div><h2 class="sec-title" id="album-' + a.id + '-title">' + esc(a.title) + '</h2><p class="album__sub">' + esc(a.sub) + "</p></div>" +
        '<button class="icon-btn album__close" type="button" aria-label="Close album">' + icon("close") + "</button></div></div>" +
        '<div class="album__body"><div class="wrap">' + (a.blurb ? '<p class="album__blurb">' + esc(a.blurb) + "</p>" : "") + blocks +
        '<nav class="album__nav" aria-label="Other albums"><button type="button" class="btn btn--ghost" data-goto="' + attr(prevA.id) + '">← ' + esc(prevA.title) + '</button><button type="button" class="btn btn--ghost" data-goto="' + attr(nextA.id) + '">' + esc(nextA.title) + " →</button></nav></div></div>";
      doc.body.appendChild(dlg);
      renderIn(dlg);
      $$(".reveal", dlg).forEach(function (r) { r.classList.add("is-in"); });
      $(".album__close", dlg).addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("close", function () { doc.body.style.overflow = ""; var t = $('[data-album="' + a.id + '"]', el); if (t && !dlg.dataset.switching) t.focus(); dlg.dataset.switching = ""; });
      $$("[data-goto]", dlg).forEach(function (b) { b.addEventListener("click", function () { dlg.dataset.switching = "1"; dlg.close(); openAlbum(b.getAttribute("data-goto")); }); });
    });
    $$("[data-album]", el).forEach(function (t) { t.addEventListener("click", function () { openAlbum(t.getAttribute("data-album")); }); });
  };
  function openAlbum(id) {
    var dlg = doc.getElementById("album-" + id);
    if (!dlg) return;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    doc.body.style.overflow = "hidden";
    var body = $(".album__body", dlg); if (body) body.scrollTop = 0;
  }

  R.genres = function (el) { el.innerHTML = '<div class="genres">' + (S.genres || []).map(function (g) { return '<span class="genre-pill">' + esc(g) + "</span>"; }).join("") + "</div>"; };

  function renderAll() {
    $$("[data-render]").forEach(function (el) { var k = el.getAttribute("data-render"); if (R[k]) { try { R[k](el); } catch (e) { if (window.console) console.error("render " + k, e); } } });
  }

  /* ---------------- lightbox ---------------- */
  function initLightbox() {
    var triggers = $$("[data-lb]");
    if (!triggers.length) return;
    var dlg = doc.createElement("dialog");
    dlg.className = "lightbox"; dlg.setAttribute("aria-label", "Photo viewer");
    dlg.innerHTML = '<span class="lb-count"></span><div class="lightbox__stage"><img alt=""></div><div class="lightbox__cap"><span class="c"></span><span class="p"></span></div>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo">' + icon("prev") + '</button><button class="lb-btn lb-next" type="button" aria-label="Next photo">' + icon("next") + "</button>" +
      '<button class="lb-btn lb-close" type="button" aria-label="Close">' + icon("close") + "</button>";
    doc.body.appendChild(dlg);
    var im = $("img", dlg), cc = $(".c", dlg), pc = $(".p", dlg), cnt = $(".lb-count", dlg), idx = 0, opener = null, group = triggers;
    function show(i) {
      idx = (i + group.length) % group.length; var t = group[idx];
      im.src = t.getAttribute("data-lb"); im.alt = t.getAttribute("data-lb-cap") || "";
      cc.textContent = t.getAttribute("data-lb-cap") || ""; pc.textContent = t.getAttribute("data-lb-place") || ""; cnt.textContent = (idx + 1) + " / " + group.length;
    }
    triggers.forEach(function (t) {
      t.addEventListener("click", function () {
        var g = t.closest("[data-lb-group]");
        group = g ? $$("[data-lb]", g) : triggers.filter(function (x) { return !x.closest("[data-lb-group]"); });
        opener = t; show(group.indexOf(t));
        if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
        doc.body.style.overflow = "hidden";
      });
    });
    dlg.addEventListener("close", function () { if (!doc.querySelector("dialog.album[open]")) doc.body.style.overflow = ""; if (opener) opener.focus(); });
    $(".lb-close", dlg).addEventListener("click", function () { dlg.close(); });
    $(".lb-prev", dlg).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", dlg).addEventListener("click", function () { show(idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("lightbox__stage")) dlg.close(); });
    dlg.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1); });
    var x0 = null;
    dlg.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  /* ---------------- reveal + subnav ---------------- */
  function initReveal() {
    var els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }); }, { rootMargin: "0px 0px -6% 0px", threshold: .05 });
    els.forEach(function (e) { io.observe(e); });
  }
  function initSubnav() {
    var nav = $(".subnav");
    if (!nav) return;
    var links = $$('a[href^="#"]', nav), secs = links.map(function (a) { return doc.getElementById(a.getAttribute("href").slice(1)); }), current = null, ticking = false;
    function update() {
      ticking = false;
      var line = window.innerHeight * .35, idx = -1;
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) idx = i; });
      var a = idx >= 0 ? links[idx] : null;
      if (a === current) return;
      if (current) current.classList.remove("is-active");
      current = a;
      if (a) { a.classList.add("is-active"); var w = $(".wrap", nav); if (w) w.scrollLeft = Math.max(0, a.offsetLeft - w.clientWidth / 2 + a.offsetWidth / 2); }
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------- boot ---------------- */
  renderHeader();
  renderFooter();
  renderBackgrounds();
  renderAll();
  wireEmail();
  initLightbox();
  initReveal();
  initSubnav();
  initScrollSpy();
  $$("[data-updated]").forEach(function (e) { e.textContent = "Updated " + (S.updated || ""); });
  if (location.hash.length > 1) { // content is rendered by JS, so re-apply #fragment scrolling once it exists
    var hid = decodeURIComponent(location.hash.slice(1)), target = doc.getElementById(hid);
    if (target && target.tagName === "DIALOG") { var lifeSec = doc.getElementById("life"); if (lifeSec) lifeSec.scrollIntoView(); openAlbum(hid.replace(/^album-/, "")); }
    else if (target) { root.style.scrollBehavior = "auto"; target.scrollIntoView({ block: target.classList.contains("pub") ? "center" : "start" }); setTimeout(function () { root.style.scrollBehavior = ""; }, 50); }
  }
})();
