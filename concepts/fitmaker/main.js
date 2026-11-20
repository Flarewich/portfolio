(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;

  /* ---------- data ---------- */
  const trainers = [
    ['Sam Cole', 'Personal Trainer', 'tr-sam'],
    ['Michael Harris', 'Personal Trainer', 'tr-michael'],
    ['John Anderson', 'Personal Trainer', 'tr-john'],
    ['Tom Blake', 'Personal Trainer', 'tr-tom'],
    ['Alex Turner', 'Strength Coach', 'tr-john'],
    ['Ryan Moore', 'Nutrition Coach', 'tr-sam'],
    ['Chris Evans', 'Cardio Coach', 'tr-tom'],
    ['Leo Grant', 'Mobility Coach', 'tr-michael']
  ];
  $('#trTrack').innerHTML = trainers.map(t => `
    <article class="tr-card"><div class="ph"><img src="img/${t[2]}.webp" alt="${t[0]}"></div>
    <div class="info"><h4>${t[0]}</h4><div class="role">${t[1]}</div>
    <a href="#join" class="more">Learn More <svg width="32" height="10" viewBox="0 0 32 10" fill="none" stroke="#DC0D15" stroke-width="1.5"><path d="M0 5h30M26 1l4 4-4 4"/></svg></a></div></article>`).join('');

  const faq = [
    ['What Is FitMaker And How Can It Help Me Reach My Fitness Goals?', 'FitMaker Is An Online Fitness Platform That Offers Personalized Workout Plans, Expert Coaching, And Comprehensive Nutritional Guidance. Whether You\'re Looking To Lose Weight, Build Muscle, Or Simply Stay Fit, Our Tailored Programs And Community Support Will Help You Achieve Your Fitness Goals.'],
    ['How Do I Get Started With A Workout Plan On FitMaker?', 'Create A Free Account, Answer A Short Questionnaire About Your Goals And Experience, And Choose A Plan. Your First Personalized Program Will Be Ready In Minutes.'],
    ['What Is Included In The Custom Plan?', 'A Dedicated Trainer, A Fully Customized Workout And Nutrition Plan, Weekly Check-Ins, Access To All Platform Features And Exclusive Gear Discounts.'],
    ['Can I Change My Plan After Signing Up?', 'Yes. You Can Upgrade, Downgrade Or Switch Between Monthly And Annual Billing At Any Time From Your Account Settings.'],
    ['What Kind Of Support Can I Expect From My Trainer?', 'Your Trainer Reviews Your Progress, Adjusts Your Program, Answers Questions In Chat And Runs Video Sessions Depending On Your Plan.']
  ];
  $('#faqList').innerHTML = faq.map((q, i) => `
    <div class="qa rv ${i === 0 ? 'open' : ''}" style="transition-delay:${i * 0.06}s">
      <button aria-expanded="${i === 0}">${q[0]}<svg width="30" height="18" viewBox="0 0 30 18" fill="none" stroke="${i === 0 ? '#DC0D15' : '#CF5418'}" stroke-width="2.5"><path d="M2 2l13 13L28 2"/></svg></button>
      <div class="ans"><div><p>${q[1]}</p></div></div></div>`).join('');

  /* ---------- loader ---------- */
  function start() {
    $('#loader').classList.add('hide');
    document.body.classList.remove('pre');
    document.body.classList.add('loaded');
    setTimeout(() => $$('.hero [data-count]').forEach(countUp), 700);
  }
  if (document.readyState === 'complete') setTimeout(start, 300);
  else addEventListener('load', () => setTimeout(start, 300));
  setTimeout(start, 3500);

  /* ---------- counters ---------- */
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const end = +el.dataset.count, dur = 1600, t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    };
    reduce ? (el.textContent = end) : requestAnimationFrame(step);
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------- scroll: header, progress, totop, active nav, parallax ---------- */
  const header = $('#header'), prog = $('#progress'), totop = $('#totop');
  const links = $$('.nav a');
  const secs = ['home', 'services', 'trainers', 'plans', 'join'].map(id => document.getElementById(id));
  const heroVisual = $('#heroVisual');
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 30);
    prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    totop.classList.toggle('show', y > 800);
    let cur = 0;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === cur));
    if (!reduce && y < 1000) heroVisual.style.transform = `translateY(${y * 0.18}px)`;
  }
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  onScroll();
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- hero mouse parallax ---------- */
  if (!reduce && !touch) {
    const layers = $$('[data-depth]', heroVisual);
    let tx = 0, ty = 0, cx = 0, cy = 0;
    $('.hero').addEventListener('mousemove', e => {
      tx = (e.clientX / innerWidth - .5); ty = (e.clientY / innerHeight - .5);
    });
    (function loop() {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      layers.forEach(l => {
        const d = +l.dataset.depth;
        l.style.translate = `${(-cx * d).toFixed(2)}px ${(-cy * d).toFixed(2)}px`;
      });
      requestAnimationFrame(loop);
    })();

    /* cursor glow */
    const g = $('#cglow'); let gx = innerWidth / 2, gy = innerHeight / 2, px = gx, py = gy;
    addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
    (function gl() { px += (gx - px) * .12; py += (gy - py) * .12; g.style.transform = `translate(${px}px,${py}px)`; requestAnimationFrame(gl); })();
  } else $('#cglow').style.display = 'none';

  /* ---------- burger ---------- */
  const burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); nav.classList.toggle('open'); });
  links.forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); nav.classList.remove('open'); }));

  /* ---------- 3D tilt cards ---------- */
  if (!touch && !reduce) $$('[data-tilt]').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 14}deg) translateZ(10px) scale(1.03)`;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
    });
    c.addEventListener('mouseleave', () => { c.style.transform = ''; });
  });

  /* ---------- billing toggle ---------- */
  const bill = $('#billing');
  $$('button', bill).forEach(b => b.addEventListener('click', () => {
    const annual = b.dataset.b === 'a';
    if (annual === bill.classList.contains('annual')) return;
    bill.classList.toggle('annual', annual);
    $$('.plan .price b').forEach(p => {
      p.classList.add('flip');
      setTimeout(() => { p.textContent = annual ? p.dataset.a : p.dataset.m; p.classList.remove('flip'); }, 250);
    });
    $$('.plan .per').forEach(s => s.textContent = annual ? 'year' : 'month');
  }));

  /* ---------- carousels ---------- */
  function carousel(name) {
    const track = $(`[data-track="${name}"]`), dotsEl = $(`[data-dots="${name}"]`);
    const prev = $(`[data-prev="${name}"]`), next = $(`[data-next="${name}"]`);
    let i = 0, timer;
    const perView = () => {
      const w = innerWidth, base = +track.dataset.per;
      if (w <= 640) return name === 'tools' ? 2 : 1;
      if (w <= 1024) return name === 'tools' ? 3 : 2;
      return base;
    };
    const pages = () => Math.max(1, track.children.length - perView() + 1);
    function render() {
      const n = pages(); i = Math.max(0, Math.min(i, n - 1));
      const item = track.children[0], gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(${-i * (item.offsetWidth + gap)}px)`;
      dotsEl.innerHTML = Array.from({ length: n }, (_, k) => `<i class="${k === i ? 'on' : ''}" data-k="${k}"></i>`).join('');
    }
    const go = d => { i = (i + d + pages()) % pages(); render(); };
    prev.addEventListener('click', () => { go(-1); restart(); });
    next.addEventListener('click', () => { go(1); restart(); });
    dotsEl.addEventListener('click', e => { if (e.target.dataset.k) { i = +e.target.dataset.k; render(); restart(); } });
    // swipe
    let sx = null;
    track.addEventListener('pointerdown', e => { sx = e.clientX; });
    addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) { go(dx < 0 ? 1 : -1); restart(); } });
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(() => go(1), 5000); }
    addEventListener('resize', render);
    render(); restart();
  }
  carousel('tools'); carousel('tr');

  /* ---------- reviews ---------- */
  const reviews = [
    { n: 'Steven Haward', r: 'Our Trainer', img: 'img/rev-steven.webp', t: $('#revText').textContent },
    { n: 'Josh Oliver', r: 'Member Since 2024', img: 'img/rev-josh.webp', t: 'I Lost 12 Kg In Four Months With The Losing Weight Program. The Workouts Are Short But Intense, And The Nutrition Tips Are Easy To Follow Even With A Busy Schedule. The Progress Tracking Kept Me Honest And The Community Kept Me Going On Days I Wanted To Quit. Best Investment I Have Made In Myself.' },
    { n: 'Edward Hawley', r: 'Pro Plan Member', img: 'img/rev-edward.webp', t: 'As Someone Who Has Trained For Years, I Was Surprised How Much I Still Learned. My Coach Rebuilt My Program Around Proper Recovery, My Lifts Went Up Across The Board And My Old Shoulder Pain Is Gone. Weekly Check-Ins Are Detailed And Genuinely Helpful. FitMaker Is The Real Deal.' }
  ];
  let ri = 0;
  const card = $('#revCard'), rImg = $('#revImg'), thumbs = $$('#revThumbs button');
  function showRev(k) {
    ri = (k + reviews.length) % reviews.length;
    card.classList.add('out'); rImg.classList.add('out');
    setTimeout(() => {
      const r = reviews[ri];
      $('#revName').textContent = r.n; $('#revRole').textContent = r.r; $('#revText').textContent = r.t;
      rImg.src = r.img; rImg.alt = r.n;
      card.classList.remove('out'); rImg.classList.remove('out');
    }, 380);
    thumbs.forEach(b => b.classList.toggle('on', +b.dataset.i === ri));
  }
  $('#revPrev').addEventListener('click', () => showRev(ri - 1));
  $('#revNext').addEventListener('click', () => showRev(ri + 1));
  thumbs.forEach(b => b.addEventListener('click', () => showRev(+b.dataset.i)));

  /* ---------- auth tabs ---------- */
  const tabs = $('#tabs'), bar = $('.bar', tabs);
  function setTab(t) {
    $$('button', tabs).forEach(b => b.classList.toggle('on', b.dataset.t === t));
    $$('.pane').forEach(p => p.classList.toggle('on', p.dataset.p === t));
    const on = $('button.on', tabs);
    bar.style.left = on.offsetLeft + 'px'; bar.style.width = on.offsetWidth + 'px';
  }
  $$('button', tabs).forEach(b => b.addEventListener('click', () => setTab(b.dataset.t)));
  $$('[data-tab]').forEach(a => a.addEventListener('click', () => setTimeout(() => setTab(a.dataset.tab), 50)));
  addEventListener('load', () => setTab('signup')); setTab('signup');
  $$('.pane').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const ok = $('.ok', f), inputs = $$('input', f);
    const bad = inputs.find(i => !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)));
    if (bad) { ok.textContent = 'Please fill in all fields correctly.'; bad.parentElement.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return; }
    ok.textContent = f.dataset.p === 'signup' ? 'Welcome to FitMaker! Check your inbox 💪' : 'Logged in — demo mode.';
    f.reset();
  }));

  /* ---------- faq ---------- */
  $$('.qa').forEach(q => $('button', q).addEventListener('click', () => {
    const open = !q.classList.contains('open');
    $$('.qa').forEach(o => { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); $('path', o).parentElement.setAttribute('stroke', '#CF5418'); });
    if (open) { q.classList.add('open'); $('button', q).setAttribute('aria-expanded', 'true'); $('svg', q).setAttribute('stroke', '#DC0D15'); }
  }));
})();
