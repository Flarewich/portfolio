// Flarewich hero 3D — собирается в один файл: npx esbuild hero3d.js --bundle --minify --format=iife --outfile=../site/new/hero3d.js
import * as THREE from "three";

const host = document.getElementById("hero3d");
if (host) init(host);

function init(host) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    return; // нет WebGL — останется запасной коллаж
  }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  host.closest(".hero-visual")?.classList.add("has-3d");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  const world = new THREE.Group();
  scene.add(world);

  /* ---------- Core: «пламя» на шейдере ---------- */
  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.32 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColA: { value: new THREE.Color("#ff4a12") },
    uColB: { value: new THREE.Color("#ffb02e") },
    uColC: { value: new THREE.Color("#2a0d03") },
  };

  const noise = /* glsl */ `
    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
      vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
      float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
      return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const vert = /* glsl */ `
    uniform float uTime; uniform float uAmp; uniform float uHover; uniform vec2 uMouse;
    varying float vN; varying vec3 vNormalW; varying vec3 vView;
    ${noise}
    float field(vec3 p){
      float t = uTime*.35;
      float n = snoise(p*1.1 + vec3(0., t, t*.6));
      n += .5*snoise(p*2.3 - vec3(t*.8, 0., t));
      // «языки пламени» тянутся вверх
      n += .35*max(p.y,0.)*snoise(p*3. + vec3(0., -t*2.5, 0.));
      return n;
    }
    void main(){
      vec3 p = position;
      float amp = uAmp + uHover*.22;
      float n = field(normalize(p) + vec3(uMouse*.35, 0.));
      vec3 displaced = p + normal * n * amp;
      // приближённая нормаль через соседние точки
      vec3 tng = normalize(cross(normal, vec3(0.,1.,0.)) + 1e-4);
      vec3 btg = normalize(cross(normal, tng));
      float e = .02;
      vec3 pa = p + tng*e; vec3 pb = p + btg*e;
      vec3 da = pa + normal * field(normalize(pa) + vec3(uMouse*.35,0.)) * amp;
      vec3 db = pb + normal * field(normalize(pb) + vec3(uMouse*.35,0.)) * amp;
      vec3 nrm = normalize(cross(da - displaced, db - displaced));
      vN = n;
      vec4 wp = modelMatrix * vec4(displaced, 1.);
      vNormalW = normalize(mat3(modelMatrix) * nrm);
      vView = normalize(cameraPosition - wp.xyz);
      gl_Position = projectionMatrix * viewMatrix * wp;
      gl_PointSize = 2.2;
    }`;

  const frag = /* glsl */ `
    uniform vec3 uColA; uniform vec3 uColB; uniform vec3 uColC; uniform float uHover;
    varying float vN; varying vec3 vNormalW; varying vec3 vView;
    void main(){
      float fres = pow(1. - max(dot(normalize(vNormalW), vView), 0.), 2.2);
      float k = smoothstep(-.6, .9, vN);
      vec3 col = mix(uColC, uColA, k);
      col = mix(col, uColB, smoothstep(.35, 1.1, vN));
      col += fres * mix(uColA, uColB, .6) * (1.2 + uHover*.8);
      float light = clamp(dot(normalize(vNormalW), normalize(vec3(.4,.8,.6))), 0., 1.);
      col *= .55 + .65*light;
      gl_FragColor = vec4(col, 1.);
    }`;

  const coreMat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag });
  const coreGeo = new THREE.IcosahedronGeometry(1.35, isTouch ? 40 : 64);
  const core = new THREE.Mesh(coreGeo, coreMat);
  world.add(core);

  // режимы материала: solid → wireframe → points (клик по объекту)
  const wireMat = coreMat.clone();
  wireMat.wireframe = true;
  wireMat.uniforms = uniforms;
  const pointsMat = new THREE.ShaderMaterial({
    uniforms, vertexShader: vert,
    fragmentShader: `uniform vec3 uColA; uniform vec3 uColB; varying float vN;
      void main(){ vec2 c = gl_PointCoord-.5; if(dot(c,c)>.25) discard; gl_FragColor = vec4(mix(uColA,uColB,smoothstep(-.4,.9,vN)),1.); }`,
    transparent: true,
  });
  const corePoints = new THREE.Points(coreGeo, pointsMat);
  corePoints.visible = false;
  world.add(corePoints);
  let mode = 0;
  const modeNames = ["solid", "wire", "points"];
  function setMode(m) {
    mode = m % 3;
    core.visible = mode !== 2;
    corePoints.visible = mode === 2;
    core.material = mode === 1 ? wireMat : coreMat;
    host.dispatchEvent(new CustomEvent("modechange", { detail: modeNames[mode] }));
  }

  /* ---------- Satellites: навыки на орбитах ---------- */
  const sats = [];
  const satDefs = [
    { key: "sat_web", target: "#services", geo: new THREE.BoxGeometry(0.42, 0.42, 0.42), r: 2.55, speed: 0.32, tilt: 0.35, phase: 0 },
    { key: "sat_3d", target: "#services", geo: new THREE.OctahedronGeometry(0.3), r: 2.25, speed: -0.42, tilt: -0.55, phase: 1.6 },
    { key: "sat_video", target: "#work", geo: new THREE.TorusGeometry(0.22, 0.08, 12, 32), r: 2.75, speed: 0.26, tilt: 0.9, phase: 3.2 },
    { key: "sat_photo", target: "#work", geo: new THREE.TetrahedronGeometry(0.32), r: 2.4, speed: -0.3, tilt: -0.15, phase: 4.7 },
  ];
  const labelsLayer = document.createElement("div");
  labelsLayer.className = "sat-labels";
  host.appendChild(labelsLayer);

  satDefs.forEach((d) => {
    const g = new THREE.Group();
    const mesh = new THREE.Mesh(d.geo, new THREE.MeshBasicMaterial({ color: 0x1a120c }));
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(d.geo),
      new THREE.LineBasicMaterial({ color: 0xff7a2a }),
    );
    g.add(mesh, edges);
    world.add(g);
    // орбита-кольцо
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(d.r - 0.004, d.r + 0.004, 128),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07, side: THREE.DoubleSide }),
    );
    ring.rotation.x = Math.PI / 2 + d.tilt;
    world.add(ring);

    const label = document.createElement("button");
    label.type = "button";
    label.className = "sat-label";
    label.dataset.i18nDyn = d.key;
    label.textContent = (window.t && window.t(d.key)) || d.key;
    label.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelector(d.target)?.scrollIntoView({ behavior: "smooth" });
    });
    labelsLayer.appendChild(label);
    sats.push({ ...d, g, mesh, label });
  });

  /* ---------- Sparks: искры вверх ---------- */
  const SPARKS = isTouch ? 120 : 260;
  const sPos = new Float32Array(SPARKS * 3);
  const sSeed = new Float32Array(SPARKS);
  for (let i = 0; i < SPARKS; i++) {
    sSeed[i] = Math.random();
    sPos[i * 3] = (Math.random() - 0.5) * 3;
    sPos[i * 3 + 1] = Math.random() * 4 - 2;
    sPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute("seed", new THREE.BufferAttribute(sSeed, 1));
  const sparks = new THREE.Points(
    sGeo,
    new THREE.ShaderMaterial({
      uniforms: { uTime: uniforms.uTime, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `uniform float uTime; uniform float uPR; attribute float seed; varying float vA;
        void main(){
          vec3 p = position;
          float life = fract(seed + uTime*(.06 + seed*.08));
          p.y = -1.6 + life*4.2;
          p.x += sin(uTime*.8 + seed*20.)*.25*life;
          p.xz *= 1. - life*.35;
          vA = sin(life*3.1415);
          vec4 mv = modelViewMatrix * vec4(p,1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2. + seed*3.) * uPR * (6. / -mv.z);
        }`,
      fragmentShader: `varying float vA; void main(){ vec2 c=gl_PointCoord-.5; float d=dot(c,c); if(d>.25) discard;
        gl_FragColor = vec4(1., .6, .2, vA*(1.-d*4.)); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }),
  );
  scene.add(sparks);

  /* ---------- Interaction ---------- */
  const mouse = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  let targetRotX = 0, targetRotY = 0, dragging = false, lastX = 0, lastY = 0, spin = 0, velX = 0, velY = 0;
  let hover = 0, hoverTarget = 0;

  function ndc(e) {
    const r = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }
  function hitCore() {
    ray.setFromCamera(mouse, camera);
    return ray.intersectObject(core.visible ? core : corePoints).length > 0 || Math.hypot(mouse.x, mouse.y) < 0.35;
  }

  window.addEventListener("pointermove", (e) => {
    ndc(e);
    if (dragging) {
      velY = (e.clientX - lastX) * 0.008;
      velX = (e.clientY - lastY) * 0.008;
      targetRotY += velY;
      targetRotX += velX;
      lastX = e.clientX; lastY = e.clientY;
    }
  }, { passive: true });

  let downX = 0, downY = 0;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    dragging = true; lastX = downX = e.clientX; lastY = downY = e.clientY;
    renderer.domElement.setPointerCapture(e.pointerId);
    host.classList.add("grabbing");
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    dragging = false; host.classList.remove("grabbing");
    const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moved < 6) {
      ndc(e);
      if (hitCore()) { setMode(mode + 1); spin = 1; }
    }
  });
  renderer.domElement.addEventListener("pointerleave", () => (hoverTarget = 0));
  renderer.domElement.style.touchAction = "pan-y";

  /* ---------- Resize / visibility ---------- */
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // на узких экранах отъезжаем, чтобы орбиты влезали
    camera.position.z = w < 560 ? 10.8 : w / h < 1 ? 9.5 : 8;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(host);

  /* ---------- Loop ---------- */
  let lastT = performance.now();
  const v = new THREE.Vector3();
  let scrollY = window.scrollY;
  window.addEventListener("scroll", () => (scrollY = window.scrollY), { passive: true });

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const nowT = performance.now(); const dt = Math.min((nowT - lastT) / 1000, 0.05); lastT = nowT;
    const t = (uniforms.uTime.value += reduce ? 0 : dt);

    hoverTarget = !isTouch && Math.abs(mouse.x) < 1.2 && Math.abs(mouse.y) < 1.2 && hitCore() ? 1 : 0;
    hover += (hoverTarget - hover) * 0.08;
    uniforms.uHover.value = hover;
    uniforms.uMouse.value.lerp(mouse, 0.05);
    host.classList.toggle("over-core", hoverTarget === 1);

    if (!dragging) {
      targetRotY += velY *= 0.94;
      targetRotX += velX *= 0.94;
      targetRotX *= 0.97;
      if (!reduce) targetRotY += dt * 0.12;
    }
    spin *= 0.92;
    world.rotation.y += (targetRotY + mouse.x * 0.25 - world.rotation.y) * 0.08;
    world.rotation.x += (targetRotX - mouse.y * 0.15 + scrollY * 0.0008 - world.rotation.x) * 0.08;
    core.rotation.y = corePoints.rotation.y = t * 0.15 + spin * 6;
    core.scale.setScalar(1 + hover * 0.06 + spin * 0.12);
    corePoints.scale.copy(core.scale);

    const r = renderer.domElement.getBoundingClientRect();
    sats.forEach((s) => {
      const a = s.phase + t * s.speed;
      s.g.position.set(Math.cos(a) * s.r, 0, Math.sin(a) * s.r);
      s.g.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), s.tilt);
      s.g.rotation.x = t * 0.8; s.g.rotation.y = t * 0.6;
      // HTML-подпись над объектом
      s.g.getWorldPosition(v);
      const depth = v.z;
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * r.width;
      const y = (-v.y * 0.5 + 0.5) * r.height;
      s.label.style.transform = `translate(${x}px, ${y - 30}px) translate(-50%, -50%)`;
      s.label.style.opacity = depth < -0.6 ? 0.25 : 1;
      s.label.style.zIndex = depth < 0 ? 1 : 3;
    });

    renderer.render(scene, camera);
  }
  frame();

  // смена языка — обновляем подписи
  document.addEventListener("langchange", () => {
    sats.forEach((s) => (s.label.textContent = window.t(s.key)));
  });
}
