/* =========================================================
   Flarewich — fx: курсор, магнитные кнопки, наклон, scramble,
   монтажный таймлайн, режим разработчика, пасхалка.
   ========================================================= */
(() => {
  const fine = matchMedia("(pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const t = (k) => (window.t ? window.t(k) : k);

  /* ---------- Console hello ---------- */
  console.log(
    "%c🔥 Flarewich %c Нравится, как сделано? Напиши мне: t.me/flarew1ch",
    "background:#ff5a1f;color:#160800;font-weight:800;padding:4px 8px",
    "color:#ff8a25;font-weight:700",
  );

  /* ---------- 3D mode name chip ---------- */
  const host3d = $("#hero3d");
  host3d?.addEventListener("modechange", (e) => {
    const el = $("#modeName");
    if (!el) return;
    el.textContent = e.detail;
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  });

  /* ---------- Custom cursor ---------- */
  if (fine && !reduce) {
    document.documentElement.classList.add("has-cursor");
    const ring = $("#cursor"), dot = $("#cursorDot"), label = $("#cursorLabel");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px,${y}px)`;
    }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    const modes = [
      ["#hero3d", "drag", "cur_drag"],
      [".case-img", "big", "cur_open"],
      ["#edTimeline", "big", "cur_play"],
      [".ed-monitor", "big", "cur_click"],
      ["a, button, summary, .clip", "link", ""],
    ];
    addEventListener("pointerover", (e) => {
      ring.className = "cursor"; label.textContent = "";
      for (const [sel, cls, key] of modes) {
        if (e.target.closest(sel)) {
          ring.classList.add("is-" + cls);
          if (key) label.textContent = t(key);
          break;
        }
      }
    });
    document.addEventListener("pointerleave", () => ring.classList.add("is-hidden"));
    document.addEventListener("pointerenter", () => ring.classList.remove("is-hidden"));
    addEventListener("pointerdown", () => ring.classList.add("is-down"));
    addEventListener("pointerup", () => ring.classList.remove("is-down"));
  }

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) {
    $$(".btn-flare, .btn-dark, .ed-play").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
      });
      b.addEventListener("pointerleave", () => (b.style.transform = ""));
    });
  }

  /* ---------- 3D tilt cards ---------- */
  if (fine && !reduce) {
    $$(".case, .plan, .svc").forEach((c) => {
      c.classList.add("tilt");
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const k = c.classList.contains("case") ? 3 : 6;
        c.style.transform = `perspective(900px) rotateX(${-py * k}deg) rotateY(${px * k}deg)`;
        c.style.setProperty("--mx", (px + 0.5) * 100 + "%");
        c.style.setProperty("--my", (py + 0.5) * 100 + "%");
      });
      c.addEventListener("pointerleave", () => (c.style.transform = ""));
    });
  }

  /* ---------- Scramble headings ---------- */
  const glyphs = "!<>-_\\/[]{}—=+*^?#01ABCDEF";
  function scramble(el) {
    if (reduce || el.dataset.scrambling) return;
    const final = el.textContent;
    el.dataset.scrambling = "1";
    const len = final.length;
    let frame = 0;
    const total = 26;
    (function step() {
      let out = "";
      for (let i = 0; i < len; i++) {
        const reveal = (frame / total) * len * 1.2 - i * 0.6;
        out += reveal > 1 || final[i] === " " ? final[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (++frame <= total + len * 0.5) requestAnimationFrame(step);
      else { el.textContent = final; delete el.dataset.scrambling; }
    })();
  }
  const heads = $$(".section-head h2, .gallery-head h3, .about-copy h2");
  const ioS = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { scramble(en.target); ioS.unobserve(en.target); }
  }), { threshold: 0.6 });
  heads.forEach((h) => ioS.observe(h));
  document.addEventListener("langchange", () => heads.forEach((h) => { delete h.dataset.scrambling; }));

  /* ---------- Editor timeline ---------- */
  const ed = $("#editor");
  if (ed) {
    const clips = $$(".clip", ed);
    const head = $("#edHead"), tl = $("#edTimeline"), clipsBox = $("#edClips");
    const frameImg = $("#edFrame"), cap = $("#edCap"), capTag = $("#edCapTag");
    const tc = $("#edTc"), type = $("#edType"), tool = $("#edTool"), watch = $("#edWatch");
    const playBtn = $("#edPlay");
    const DURATION = 18; // секунд на весь таймлайн
    let pos = 0, playing = !reduce, active = -1, scrubbing = false, inView = false;

    // ширины клипов → границы
    const weights = clips.map((c) => +getComputedStyle(c).getPropertyValue("--w") || 20);
    const sum = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    const bounds = weights.map((w) => { const s = acc / sum; acc += w; return [s, acc / sum]; });

    // waveform
    const wave = $("#edWave");
    let bars = "";
    for (let i = 0; i < 120; i++) {
      const h = 18 + Math.abs(Math.sin(i * 0.37) * 50 + Math.sin(i * 1.7) * 25 + (Math.random() - 0.5) * 30);
      bars += `<i style="height:${Math.min(h, 100)}%"></i>`;
    }
    wave.innerHTML = bars;

    function setActive(i) {
      if (i === active) return;
      active = i;
      const c = clips[i];
      clips.forEach((x, k) => x.classList.toggle("on", k === i));
      frameImg.classList.remove("cut"); void frameImg.offsetWidth; frameImg.classList.add("cut");
      frameImg.src = c.dataset.src;
      frameImg.style.objectPosition = c.dataset.pos === "top" ? "top" : "center";
      cap.dataset.i18n = c.dataset.cap;
      cap.textContent = t(c.dataset.cap);
      capTag.textContent = String(i + 1).padStart(2, "0");
      type.textContent = c.dataset.type;
      tool.textContent = c.dataset.tool;
      watch.hidden = !c.dataset.video;
    }
    function fmt(sec) {
      const f = Math.floor((sec % 1) * 60);
      const s = Math.floor(sec) % 60, m = Math.floor(sec / 60);
      return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function render() {
      const left = clipsBox.offsetLeft;
      const w = clipsBox.offsetWidth;
      head.style.transform = `translateX(${left + pos * w}px)`;
      tc.textContent = fmt(pos * DURATION);
      const i = bounds.findIndex(([a, b]) => pos >= a && pos < b);
      setActive(i < 0 ? clips.length - 1 : i);
    }
    function posFromEvent(e) {
      const r = clipsBox.getBoundingClientRect();
      return Math.min(0.9999, Math.max(0, (e.clientX - r.left) / r.width));
    }
    tl.addEventListener("pointerdown", (e) => {
      scrubbing = true; tl.setPointerCapture(e.pointerId);
      pos = posFromEvent(e); render();
      ed.classList.add("scrubbing");
    });
    tl.addEventListener("pointermove", (e) => { if (scrubbing) { pos = posFromEvent(e); render(); } });
    tl.addEventListener("pointerup", () => { scrubbing = false; ed.classList.remove("scrubbing"); });
    clips.forEach((c, i) => c.addEventListener("click", () => { pos = bounds[i][0] + 0.001; render(); }));
    $("#edMonitor").addEventListener("click", (e) => {
      if (e.target.closest(".ed-watch")) return;
      playing = !playing; ed.classList.toggle("paused", !playing);
    });
    playBtn.addEventListener("click", () => { playing = !playing; ed.classList.toggle("paused", !playing); });
    ed.classList.toggle("paused", !playing);

    new IntersectionObserver(([en]) => (inView = en.isIntersecting), { threshold: 0.2 }).observe(ed);
    let last = performance.now();
    (function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.1); last = now;
      if (playing && inView && !scrubbing) {
        pos += dt / DURATION;
        if (pos >= 1) pos = 0;
        render();
      }
      requestAnimationFrame(loop);
    })(last);
    addEventListener("resize", render);
    document.addEventListener("langchange", () => { cap.textContent = t(cap.dataset.i18n); });
    render();
  }

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg, ms = 4200) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* ---------- X-ray / developer mode ---------- */
  const xBtn = $("#xrayBtn");
  function labelXray() {
    $$("header, section, footer, article, aside, nav, .svc, .plan, .case, .editor, .audit, .final, .step, details").forEach((el) => {
      if (el.dataset.xr) return;
      const tag = el.tagName.toLowerCase();
      const id = el.id ? "#" + el.id : "";
      const cls = el.classList[0] ? "." + el.classList[0] : "";
      el.dataset.xr = `<${tag}${id}${cls}>`;
    });
  }
  xBtn.addEventListener("click", () => {
    labelXray();
    const on = document.body.classList.toggle("xray");
    xBtn.setAttribute("aria-pressed", String(on));
    if (on) toast(t("xray_on"), 3000);
  });

  /* ---------- Easter egg: «flare» / 5× logo ---------- */
  const fire = $("#fire");
  const ctx = fire.getContext("2d");
  let parts = [], burning = false;
  function sizeFire() { fire.width = innerWidth * devicePixelRatio; fire.height = innerHeight * devicePixelRatio; }
  sizeFire(); addEventListener("resize", sizeFire);

  function ignite(cx = innerWidth / 2, cy = innerHeight * 0.85) {
    const n = reduce ? 60 : 260;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const sp = 4 + Math.random() * 11;
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, s: 3 + Math.random() * 7, h: 15 + Math.random() * 30 });
    }
    document.body.classList.add("on-fire");
    setTimeout(() => document.body.classList.remove("on-fire"), 2600);
    toast(t("egg_toast"), 7000);
    if (!burning) { burning = true; requestAnimationFrame(burn); }
  }
  function burn() {
    const d = devicePixelRatio;
    ctx.clearRect(0, 0, fire.width, fire.height);
    ctx.globalCompositeOperation = "lighter";
    parts = parts.filter((p) => p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.99; p.life -= 0.012;
      const g = ctx.createRadialGradient(p.x * d, p.y * d, 0, p.x * d, p.y * d, p.s * d * 2);
      g.addColorStop(0, `hsla(${p.h + 20},100%,70%,${p.life})`);
      g.addColorStop(1, `hsla(${p.h},100%,50%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x * d, p.y * d, p.s * d * 2, 0, Math.PI * 2); ctx.fill();
    }
    if (parts.length) requestAnimationFrame(burn);
    else { burning = false; ctx.clearRect(0, 0, fire.width, fire.height); }
  }

  let typed = "";
  addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;
    typed = (typed + (e.key || "").toLowerCase()).slice(-8);
    if (typed.endsWith("flare") || typed.endsWith("огонь")) { typed = ""; ignite(); }
  });
  let taps = 0, tapTimer;
  $(".brand").addEventListener("click", (e) => {
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => (taps = 0), 1200);
    if (taps >= 5) {
      e.preventDefault(); taps = 0;
      const r = e.currentTarget.getBoundingClientRect();
      ignite(r.left + r.width / 2, r.top + r.height);
    }
  });
  window.flare = ignite; // для любопытных в консоли
})();
