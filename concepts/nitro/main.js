(function () {
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const FLAVOURS = [
    { id: 'green', name: 'GREEN', color: '#DFEA0A', tag: 'Original lime surge · High intensity', desc: 'The one that started it all. Sharp lime, a hint of citrus peel and a clean, electric finish.', price: '12.00 $', kcal: 12 },
    { id: 'red',   name: 'RED',   color: '#FF2E45', tag: 'Cherry rush · High intensity', desc: 'Dark cherry and wild berries with a sharp, tingling kick. Made for late nights and last rounds.', price: '11.00 $', kcal: 14 },
    { id: 'sky',   name: 'SKY',   color: '#27D3FF', tag: 'Ice mint · Medium intensity', desc: 'Frozen mint and white grape. Ice-cold focus that hits like a breath of mountain air.', price: '11.00 $', kcal: 10 },
    { id: 'blue',  name: 'BLUE',  color: '#6A6BFF', tag: 'Blue raspberry · High intensity', desc: 'Blue raspberry and blackcurrant with a deep violet glow. Our gamers’ favourite since 2019.', price: '10.58 $', kcal: 12 },
    { id: 'eng',   name: 'ENG',   color: '#FFA51F', tag: 'Mango-orange blast · Extreme intensity', desc: 'Sun-ripe mango, blood orange and our strongest charge yet. Handle with care.', price: '10.58 $', kcal: 15 }
  ];
  FLAVOURS.forEach(f => { const i = new Image(); i.src = `img/can-${f.id}.webp`; });

  /* ---------- colour theme ---------- */
  let colorProxy = { c: FLAVOURS[0].color };
  function setColor(hex) {
    gsap.to(colorProxy, { c: hex, duration: .7, ease: 'power2.out', onUpdate: () => root.style.setProperty('--c', colorProxy.c) });
  }

  /* ---------- header / burger ---------- */
  const header = $('#header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });
  const burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); nav.classList.toggle('open'); });
  $$('.nav a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); nav.classList.remove('open'); }));

  /* ---------- cursor + sparks ---------- */
  const cur = $('#cursor');
  if (matchMedia('(hover:hover)').matches) {
    const xTo = gsap.quickTo(cur, 'x', { duration: .6, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: .6, ease: 'power3' });
    addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
  } else cur.style.display = 'none';

  const cv = $('#sparks'), ctx = cv.getContext('2d');
  let W, H, parts = [];
  function size() { W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio; }
  size(); addEventListener('resize', size);
  for (let i = 0; i < (innerWidth < 700 ? 35 : 70); i++) parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .4, s: Math.random() * .0012 + .0004, a: Math.random() * .6 + .2, w: Math.random() * 6 });
  let scrollBoost = 0;
  (function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const col = getComputedStyle(root).getPropertyValue('--c').trim() || '#DFEA0A';
    ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 8 * devicePixelRatio;
    parts.forEach(p => {
      p.y -= p.s * (1 + scrollBoost); if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      const x = (p.x + Math.sin(t / 1600 + p.w) * .006) * W, y = p.y * H;
      ctx.globalAlpha = p.a; ctx.beginPath(); ctx.arc(x, y, p.r * devicePixelRatio, 0, 7); ctx.fill();
    });
    scrollBoost *= .92;
    if (!reduce) requestAnimationFrame(draw);
  })(0);

  /* ---------- can spin & flavour switch ---------- */
  const can = $('#can'), can3d = $('#can3d'), shine = $('#shine'), bolt = $('#bolt'), panel = $('#panel'), fword = $('#flavorWord');
  const setMask = src => { shine.style.webkitMaskImage = shine.style.maskImage = `url(${src})`; };
  setMask(can.src);
  let cur_i = 0, spinning = null;
  const dots = $('#fdots');
  dots.innerHTML = FLAVOURS.map((f, i) => `<button aria-label="${f.name}" data-i="${i}" class="${i ? '' : 'on'}"></button>`).join('');

  function setFlavour(i, instant) {
    if (i === cur_i && !instant) return;
    const dir = i > cur_i ? 1 : -1; cur_i = i;
    const f = FLAVOURS[i], src = `img/can-${f.id}.webp`;
    setColor(f.color);
    $$('button', dots).forEach((b, k) => b.classList.toggle('on', k === i));
    // panel text
    panel.classList.add('out');
    setTimeout(() => {
      $('#pIdx').textContent = String(i + 1).padStart(2, '0');
      $('#pName').textContent = f.name; $('#pTag').textContent = f.tag; $('#pDesc').textContent = f.desc;
      $('#pPrice').textContent = f.price; $('#pKcal').textContent = f.kcal;
      panel.classList.remove('out');
    }, 260);
    gsap.fromTo(fword, { yPercent: -50, y: 50 * dir, opacity: 0 }, { y: 0, opacity: .9, duration: .6, ease: 'power3.out', onStart: () => { fword.textContent = f.name; } });
    if (instant) { can.src = src; setMask(src); return; }
    // spin: turn the can edge-on, swap the label, spin back with overshoot
    if (spinning) spinning.progress(1);
    spinning = gsap.timeline({ onComplete: () => spinning = null })
      .to(can3d, { rotationY: 90 * dir, scaleX: .75, filter: 'brightness(1.8) blur(1.5px)', duration: .22, ease: 'power2.in' })
      .add(() => { can.src = src; setMask(src); })
      .set(can3d, { rotationY: -90 * dir })
      .to(can3d, { rotationY: 0, scaleX: 1, filter: 'brightness(1) blur(0px)', duration: .7, ease: 'back.out(1.7)' })
      .fromTo(shine, { backgroundPosition: '120% 0' }, { backgroundPosition: '-30% 0', duration: .8, ease: 'power2.out' }, .2)
      .fromTo(bolt, { opacity: 0, scale: .5, rotation: -8 * dir }, { opacity: .9, scale: 1.15, rotation: 0, duration: .18, ease: 'power2.out' }, .12)
      .to(bolt, { opacity: 0, scale: 1.35, duration: .5, ease: 'power2.in' }, .32);
  }

  /* ---------- pinned story timeline ---------- */
  const isMobile = () => innerWidth <= 900;
  const canWrap = $('#canWrap'), letters = $$('#bigword span'), sinceLn = $$('#since .ln>span');
  gsap.set(canWrap, { rotation: 90 });
  let tl, st;
  const ZONE = 4.5, TOTAL = 10;
  function buildStory() {
    if (st) { st.kill(); tl.kill(); }
    const m = isMobile();
    gsap.set(canWrap, { rotation: 90, x: 0, y: 0, scale: m ? .5 : 1 });
    tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.to({}, { duration: 1 }) // hold hero
      // phase B — NITRO breaks apart, football + SINCE 2002 come in, can grows
      .to(letters, { yPercent: -130, opacity: 0, rotation: () => gsap.utils.random(-12, 12), stagger: .08, duration: 1, ease: 'power2.in' }, 1)
      .to('#heroBottom', { opacity: 0, y: 40, duration: .6 }, 1)
      .to('#hint', { opacity: 0, duration: .3 }, 1)
      .fromTo('#photo', { opacity: 0, xPercent: -40, rotation: -4 }, { opacity: 1, xPercent: 0, rotation: 0, duration: 1.1, ease: 'power3.out' }, 1.3)
      .fromTo('#photo img', { scale: 1.3 }, { scale: 1, duration: 2.6 }, 1.3)
      .to(sinceLn, { yPercent: -110, duration: .8, stagger: .12, ease: 'power3.out' }, 1.6)
      .to(canWrap, { rotation: m ? 90 : 78, scale: m ? .72 : 1.25, x: m ? 0 : '-6vw', y: m ? '-6vh' : 0, duration: 1.5, ease: 'power2.inOut' }, 1.1)
      // phase C — can stands up, flavour panel appears
      .to('#photo', { opacity: 0, xPercent: -30, duration: .8, ease: 'power2.in' }, 3)
      .to(sinceLn, { yPercent: -220, duration: .7, stagger: .08, ease: 'power2.in' }, 3)
      .to(canWrap, { rotation: 0, scale: m ? .78 : 1.1, x: m ? 0 : '18vw', y: m ? '-14vh' : 0, duration: 1.4, ease: 'power3.inOut' }, 3.1)
      .to('#glow', { opacity: 1, duration: 1 }, 3.4)
      .fromTo('#panel', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, 3.8)
      .fromTo(fword, { opacity: 0 }, { opacity: .9, duration: .8 }, 3.8)
      .to({}, { duration: TOTAL - 4.8 });
    st = ScrollTrigger.create({
      trigger: '.story', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 1, animation: tl,
      onUpdate: self => {
        $('#prog').style.transform = `scaleY(${self.progress})`;
        scrollBoost = Math.min(8, Math.abs(self.getVelocity()) / 300);
        const t = self.progress * TOTAL;
        if (t >= ZONE) {
          const i = Math.min(FLAVOURS.length - 1, Math.floor((t - ZONE) / ((TOTAL - ZONE) / FLAVOURS.length)));
          setFlavour(i);
        } else if (cur_i !== 0) setFlavour(0);
      }
    });
  }
  buildStory();
  let rw; addEventListener('resize', () => { clearTimeout(rw); rw = setTimeout(() => { buildStory(); ScrollTrigger.refresh(); }, 250); });

  function scrollToFlavour(i) {
    const t = ZONE + (i + .5) * ((TOTAL - ZONE) / FLAVOURS.length);
    scrollTo({ top: st.start + (st.end - st.start) * (t / TOTAL), behavior: 'smooth' });
  }
  dots.addEventListener('click', e => { if (e.target.dataset.i) scrollToFlavour(+e.target.dataset.i); });
  $('[data-flav]').addEventListener('click', e => { e.preventDefault(); scrollToFlavour(0); });

  /* ---------- intro on load ---------- */
  gsap.from(letters, { yPercent: 120, opacity: 0, duration: 1.1, stagger: .07, ease: 'power4.out', delay: .15 });
  gsap.from(can3d, { scale: .25, rotation: -540, opacity: 0, duration: 1.6, ease: 'expo.out', delay: .35 });
  gsap.from('#heroBottom .wrap > *', { y: 40, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out', delay: .9 });
  gsap.from('#header', { yPercent: -100, opacity: 0, duration: .9, ease: 'power3.out', delay: .2 });

  // mouse tilt of the can in hero
  if (matchMedia('(hover:hover)').matches && !reduce) {
    const rx = gsap.quickTo('.can-float', 'rotationX', { duration: .8 }), ry = gsap.quickTo('.can-float', 'rotationY', { duration: .8 });
    const lx = gsap.quickTo('#bigword', 'x', { duration: 1 });
    addEventListener('mousemove', e => {
      const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5;
      rx(-dy * 14); ry(dx * 18); lx(-dx * 40);
    });
  }

  /* ---------- marquee driven by scroll velocity ---------- */
  const mq = $('#mq');
  const loop = gsap.to(mq, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
  ScrollTrigger.create({ onUpdate: s => { const v = s.getVelocity(); gsap.to(loop, { timeScale: (v < 0 ? -1 : 1) * (1 + Math.min(6, Math.abs(v) / 400)), duration: .3, overwrite: true, onComplete: () => gsap.to(loop, { timeScale: v < 0 ? -1 : 1, duration: 1 }) }); } });

  /* ---------- split headings, reveals, counters ---------- */
  $$('.split').forEach(h => {
    const walk = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(w => {
          if (!w.trim()) { frag.append(w); return; }
          const o = document.createElement('span'); o.className = 'w'; const i = document.createElement('span'); i.textContent = w; o.append(i); frag.append(o);
        });
        c.replaceWith(frag);
      } else walk(c);
    });
    walk(h);
  });
  $$('.w>span').forEach(s => gsap.set(s, { yPercent: 105, y: 0 }));
  $$('.split').forEach(h => gsap.to($$('.w>span', h), { yPercent: 0, duration: 1, stagger: .05, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' }, overwrite: true }));
  $$('.rv').forEach(el => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  $$('[data-n]').forEach(el => {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.n, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => el.textContent = Math.round(o.v) + (el.dataset.n === '40' ? '+' : '') });
  });

  /* ---------- shop lineup carousel ---------- */
  const lineup = $('#lineup');
  const ORDER = ['eng', 'red', 'green', 'sky', 'blue'];
  const items = ORDER.map(id => {
    const f = FLAVOURS.find(x => x.id === id);
    const el = document.createElement('div'); el.className = 'item';
    el.innerHTML = `<div class="ci"><img src="img/can-${id}.webp" alt="NITRO ${f.name}"></div><div class="meta"><h4>NITRO ${f.name}</h4><small>${f.tag.split('·')[1].trim()}</small><div class="p">${f.price}</div></div>`;
    lineup.append(el); return { el, f };
  });
  let active = 2;
  function spacing() { return innerWidth <= 900 ? Math.min(150, innerWidth * .28) : Math.min(330, innerWidth * .17); }
  function layout(spinIdx) {
    const n = items.length, sp = spacing();
    items.forEach((it, i) => {
      const off = ((i - active + n + 2) % n) - 2, a = Math.abs(off);
      gsap.to(it.el, { x: off * sp, scale: a === 0 ? 1.25 : a === 1 ? .82 : .66, opacity: innerWidth <= 900 && a === 2 ? 0 : 1, zIndex: 10 - a, duration: .9, ease: 'power3.out' });
      gsap.to($('.meta', it.el), { opacity: a === 0 ? 1 : .55, duration: .5 });
    });
    if (spinIdx !== undefined) {
      const img = $('img', items[spinIdx].el);
      gsap.timeline()
        .to(img, { rotationY: 90, scaleX: .8, filter: 'brightness(1.8)', duration: .18, ease: 'power2.in' })
        .set(img, { rotationY: -90 })
        .to(img, { rotationY: 0, scaleX: 1, filter: 'brightness(1)', duration: .25, ease: 'none' })
        .to(img, { rotationY: 90, scaleX: .8, duration: .18, ease: 'power2.in' })
        .set(img, { rotationY: -90 })
        .to(img, { rotationY: 0, scaleX: 1, duration: .7, ease: 'back.out(1.8)' });
    }
    if (ScrollTrigger.isInViewport(lineup, .3)) setColor(items[active].f.color);
  }
  layout();
  items.forEach((it, i) => it.el.addEventListener('click', () => { if (i !== active) { active = i; layout(i); } else layout(i); }));
  $('#lPrev').addEventListener('click', () => { active = (active - 1 + items.length) % items.length; layout(active); });
  $('#lNext').addEventListener('click', () => { active = (active + 1) % items.length; layout(active); });
  addEventListener('resize', () => layout());
  ScrollTrigger.create({ trigger: '#shop', start: 'top 60%', end: 'bottom 40%', onEnter: () => setColor(items[active].f.color), onEnterBack: () => setColor(items[active].f.color), onLeaveBack: () => setColor(FLAVOURS[cur_i].color) });
  gsap.from(items.map(i => $('.ci', i.el)), { y: 160, opacity: 0, duration: 1.2, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: lineup, start: 'top 75%' } });

  /* ---------- cart + subscribe ---------- */
  let cart = 0; const toast = $('#toast'); let tt;
  function say(msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2000); }
  $$('[data-add]').forEach(b => b.addEventListener('click', () => {
    cart++; const n = $('#cartN'); n.textContent = cart; gsap.fromTo(n, { scale: 1.8 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
    const name = b.closest('.panel') ? FLAVOURS[cur_i].name : items[active].f.name;
    say(`NITRO ${name} added to cart ⚡`);
  }));
  $('#sub').addEventListener('submit', e => { e.preventDefault(); say('You’re in! Check your inbox ⚡'); e.target.reset(); });

  // nav active state
  ['home', 'about', 'shop', 'contact'].forEach(id => ScrollTrigger.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: s => { if (s.isActive) $$('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id)); } }));
})();
