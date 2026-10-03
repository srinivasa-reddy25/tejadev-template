(() => {
  const C = window.CUES;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const P = (t, a, b) => clamp((t - a) / (b - a));
  const lerp = (a, b, x) => a + (b - a) * x;
  const E = {
    outExpo: x => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    inExpo: x => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
    outCubic: x => 1 - Math.pow(1 - x, 3),
    inCubic: x => x * x * x,
    inOutCubic: x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    inOutSine: x => -(Math.cos(Math.PI * x) - 1) / 2,
    outBack: (x, s = 1.7) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  };
  const h = html => {
    const d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const px = n => `${n.toFixed(2)}px`;
  const show = (el, on) => el.classList.toggle('hidden', !on);
  const fx = (el, o = 1, blur = 0) => {
    el.style.opacity = o.toFixed(4);
    el.style.filter = 'none';
  };
  function tf(el, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s = 1, w = 0, hh = 0 }) {
    el.style.transform = `translate3d(${px(x - w / 2)},${px(y - hh / 2)},${px(z)}) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${s.toFixed(4)})`;
  }
  const words = (txt, cls = 'w') => txt.split(' ').map(w => `<span class="${cls}">${w}</span>`).join(' ');
  const rise = (el, t, a, dy = 60, blur = 14, dur = 0.6, extraO = 1) => {
    const p = E.outExpo(P(t, a, a + dur));
    el.style.transform = `translateY(${px(lerp(dy, 0, p))})`;
    fx(el, P(t, a, a + 0.22) * extraO, 0);
  };

  const stage = $('#stage');
  const add = (id, cls) => {
    const el = h(`<div id="${id}" class="${cls}"></div>`);
    stage.appendChild(el);
    return el;
  };
  const bgDark = add('bgDark', 'layer');
  const bgCream = add('bgCream', 'layer');
  const s1 = add('s1', 'scene');
  const s2 = add('s2', 'scene');
  const s3 = add('s3', 'scene');
  const s4 = add('s4', 'scene');
  const s5 = add('s5', 'scene');
  const flash = add('flash', 'layer');
  const fade = add('fade', 'layer');
  document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute">${['mb3', 'mb4']
    .map(id => `<filter id="${id}" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0 0"/></filter>`)
    .join('')}</svg>`);
  let SMP = { n: 1, shutter: 0.5 };
  function motionBlur(el, id, vx, vy) {
    const exp = SMP.shutter / 60 / SMP.n;
    const sx = Math.abs(vx) * exp * 0.55;
    const sy = Math.abs(vy) * exp * 0.55;
    if (Math.max(sx, sy) < 0.6) return void (el.style.filter = 'none');
    $(`#${id} feGaussianBlur`).setAttribute('stdDeviation', `${sx.toFixed(2)} ${sy.toFixed(2)}`);
    el.style.filter = `url(#${id})`;
  }
  const vel = (fn, t) => {
    const d = 1 / 600;
    const a = fn(t - d);
    const b = fn(t + d);
    return { vx: (b.x - a.x) / (2 * d), vy: (b.y - a.y) / (2 * d) };
  };

  // ============================================================ S1 — the setup tax
  const CHORES = ['Set up auth', 'Wire the database', 'Configure the monorepo', 'Fight ESLint &amp; Prettier', 'Copy the login page. Again.'];
  s1.innerHTML = `<div class="glow" id="g1" style="left:300px;top:120px;width:1320px;height:840px;background:radial-gradient(closest-side,rgba(226,126,96,.13),rgba(226,126,96,0))"></div>
    <div class="cam" id="c1">
      <div class="caps" id="lbl1" style="position:absolute;left:400px;top:178px;font-size:24px;color:rgba(245,228,200,.6)">Day 1 &nbsp;·&nbsp; every new project</div>
      ${CHORES.map((c, i) => `<div class="chore" data-i="${i}"><div class="box"></div><span>${c}</span><div class="strike"></div></div>`).join('')}
    </div>`;
  const c1 = $('#c1');
  const lbl1 = $('#lbl1');
  const g1 = $('#g1');
  const chores = $$('.chore', s1).map(el => ({ el, strike: $('.strike', el), span: $('span', el) }));

  function renderS1(t) {
    const on = t < C.drop + 0.02;
    show(s1, on);
    show(bgDark, t < C.drop || t >= C.endHit);
    if (!on) return;
    const col = E.inOutSine(P(t, C.drop - 0.22, C.drop));
    tf(c1, { x: 960, y: 540, s: 1, w: 1920, hh: 1080 });
    fx(c1, 1 - col, 0);
    rise(lbl1, t, C.beats[0] - 0.05, 20, 8);
    chores.forEach((c, i) => {
      const a = C.chores[i] - 0.06;
      const p = E.outExpo(P(t, a, a + 0.55));
      tf(c.el, { x: 400 + lerp(70, 0, p), y: 300 + i * 112 });
      c.el.style.transform += ' translateY(-38px)';
      const struck = P(t, C.strike + i * 0.035, C.strike + i * 0.035 + 0.22);
      fx(c.el, P(t, a, a + 0.16) * lerp(1, 0.45, struck), 12 * (1 - p));
      c.strike.style.width = px(c.span.offsetWidth + 16);
      c.strike.style.transform = `scaleX(${E.outCubic(struck).toFixed(4)})`;
      c.strike.style.opacity = struck > 0 ? 1 : 0;
    });
    g1.style.opacity = (0.5 + 0.5 * P(t, 2.5, C.drop)).toFixed(3);
  }

  // ============================================================ S2 — reveal
  const PILLS = [
    ['auth', 300, 250, 0, 60], ['database', 1600, 300, 1.5, 0], ['ui', 1530, 820, 0, 80], ['logging', 380, 830, 2.5, -40],
    ['lint', 1150, 150, 4, -200], ['ci', 760, 935, 4, -160], ['api', 1800, 590, 6, -260], ['types', 130, 560, 6.5, -300],
  ];
  s2.innerHTML = `<div class="cam" id="c2">
      ${PILLS.map(([n]) => `<div class="pill" style="position:absolute;left:0;top:0;display:flex;align-items:center;gap:12px;padding:14px 24px 14px 18px;border-radius:999px;background:#FFFBF2;
        box-shadow:0 26px 50px -24px rgba(80,50,10,.35);font-family:M,monospace;font-size:26px;color:#3B342A;white-space:nowrap"><i style="width:14px;height:14px;border-radius:50%;background:#2D4F1D"></i>${n}<span style="color:#2D4F1D;font-weight:600">✓</span></div>`).join('')}
      <div class="disp" id="wm1" style="position:absolute;left:0;width:1920px;top:228px;text-align:center;color:#1E1C19;font-size:250px">${'TejaDev'.split('').map(c => `<span class="mask"><span class="w lt">${c}</span></span>`).join('')}</div>
      <div class="serif" id="wm2" style="position:absolute;left:0;width:1920px;top:452px;text-align:center;color:#A39E94;font-size:250px;line-height:.95">Template</div>
      <div id="tag2" style="position:absolute;left:0;width:1920px;top:742px;text-align:center;color:#6E6A63;font-size:44px;font-weight:500;letter-spacing:-.01em">${words('All wired before you write a single line.')}</div>
    </div>`;
  const c2 = $('#c2');
  const wmL = $$('.lt', s2);
  const wm2 = $('#wm2');
  const tag2 = $$('#tag2 .w', s2);
  const pills = $$('.pill', s2);

  function renderS2(t) {
    const on = t >= C.drop && t < 7.75;
    show(s2, on);
    show(bgCream, t >= C.drop && t < C.endHit);
    if (!on) return;
    const out = E.inCubic(P(t, 7.1, 7.48));
    tf(c2, { x: 960, y: 540 - 60 * out, s: 1, w: 1920, hh: 1080 });
    fx(c2, 1 - out, 0);
    wmL.forEach((l, i) => {
      const p = E.outExpo(P(t, C.drop + i * 0.04, C.drop + i * 0.04 + 0.7));
      l.style.transform = `translateY(${lerp(108, 0, p).toFixed(2)}%)`;
    });
    const p2 = E.outExpo(P(t, C.drop + 0.27, C.drop + 0.95));
    wm2.style.transform = `translateY(${px(lerp(50, 0, p2))}) scale(${lerp(0.94, 1, p2).toFixed(4)})`;
    fx(wm2, P(t, C.drop + 0.27, C.drop + 0.45), 16 * (1 - p2));
    tag2.forEach((w, i) => rise(w, t, C.tag + i * 0.05, 24, 10, 0.6));
    pills.forEach((el, i) => {
      const [, x, y, blur, z] = PILLS[i];
      const pop = P(t, C.drop + 0.08 + i * 0.05, C.drop + 0.08 + i * 0.05 + 0.7);
      if (!el._w) { el._w = el.offsetWidth; el._h = el.offsetHeight; }
      tf(el, { x: x + Math.cos(t * 0.7 + i * 1.7) * 10, y: y + Math.sin(t * 0.9 + i) * 12 - 30 * E.outExpo(pop), z, rz: Math.sin(t * 0.6 + i) * 5,
        s: pop <= 0 ? 0.001 : E.outBack(pop), w: el._w, hh: el._h });
      fx(el, P(pop, 0, 0.15), blur);
    });
  }

  // ============================================================ S3 — clone it, fill .env, build the feature
  const CMDS = ['git clone github.com/srinivasa-reddy25/tejadev-template', 'cp .env.example .env', 'bun run dev'];
  s3.innerHTML = `<div class="glow" style="left:760px;top:60px;width:1100px;height:960px;background:radial-gradient(closest-side,rgba(45,79,29,.13),rgba(45,79,29,0))"></div>
    <div class="cam" id="c3">
      <div class="term" id="term"><div class="tbar"><i style="background:#E5685A"></i><i style="background:#E7B54A"></i><i style="background:#69B65A"></i><span>~/code — zsh</span></div>
        <div class="tbody">
          <div data-l="0"><span class="ps">➜ </span><span class="ty"></span><span class="caret"></span></div>
          <div data-l="1" class="dim">Cloning into 'tejadev-template'... done.</div>
          <div data-l="2"><span class="ps">➜ </span><span class="ty"></span><span class="caret"></span></div>
          <div data-l="3"><span class="ps">➜ </span><span class="ty"></span><span class="caret"></span></div>
          <div data-l="4"><span class="dim">@tejadev/web&nbsp;&nbsp;</span><span class="ok">✓ Ready</span> on <span class="url">http://localhost:3000</span></div>
          <div data-l="5"><span class="dim">@tejadev/api&nbsp;&nbsp;</span><span class="ok">✓ Listening</span> on <span class="url">http://localhost:8000</span></div>
        </div></div>
      <div class="feat disp" style="left:140px;top:232px"><span class="w">Clone it.</span></div>
      <div class="feat disp" style="left:140px;top:376px"><span class="w">Fill .env.</span></div>
      <div class="feat disp" style="left:140px;top:520px"><span class="w">Build the</span></div>
      <div class="feat disp" style="left:140px;top:650px"><span class="w serif">feature.</span></div>
    </div>`;
  const c3 = $('#c3');
  const term = $('#term');
  const tl = $$('[data-l]', term);
  const s3w = $$('.feat', s3);
  function termPose(t) {
    const enter = E.outExpo(P(t, C.term, C.term + 0.85));
    const q = E.inOutSine(P(t, C.term + 0.8, 11.9));
    const whip = E.inCubic(P(t, 11.85, 12.2));
    return { x: 1255, y: lerp(1500, 540, enter) - 1500 * whip, z: 0, rx: 0, ry: 0, rz: 0, s: 0.95 };
  }
  function renderS3(t) {
    const on = t >= C.term - 0.05 && t < 12.25;
    show(s3, on);
    if (!on) return;
    const o = termPose(t);
    tf(term, { ...o, w: 1060, hh: 462 });
    const v = vel(termPose, t);
    motionBlur(s3, 'mb3', v.vx, v.vy);
    const whip = E.inCubic(P(t, 11.85, 12.2));
    // typing
    const typed = i => Math.floor(CMDS[i].length * P(t, C.cmds[i], C.cmds[i] + (i === 0 ? 0.62 : 0.3)));
    const lineOn = [true, t >= C.cmds[0] + 0.72, t >= C.cmds[1] - 0.12, t >= C.cmds[2] - 0.12, t >= C.ready[0], t >= C.ready[1]];
    tl.forEach((el, i) => (el.style.visibility = lineOn[i] ? 'visible' : 'hidden'));
    [0, 2, 3].forEach((li, k) => {
      $('.ty', tl[li]).textContent = CMDS[k].slice(0, typed(k));
      const active = k === 2 ? t < C.ready[0] : t < C.cmds[k + 1] - 0.12;
      const blink = Math.floor(t * 2.4) % 2 === 0;
      $('.caret', tl[li]).style.opacity = active && (blink || P(t, C.cmds[k], C.cmds[k] + 0.7) < 1) ? 1 : 0;
    });
    [4, 5].forEach((li, k) => {
      const p = E.outExpo(P(t, C.ready[k], C.ready[k] + 0.4));
      tl[li].style.transform = `translateX(${px(lerp(-18, 0, p))})`;
      tl[li].style.opacity = p.toFixed(3);
    });
    // words on the downbeats
    const T = [C.cmds[0], C.cmds[1], C.cmds[2], C.cmds[2] + 0.27];
    s3w.forEach((w, i) => {
      const a = T[i] - 0.06;
      const p = E.outExpo(P(t, a, a + 0.6));
      const dim = i < 2 ? 1 - 0.68 * E.outCubic(P(t, T[i + 1] - 0.05, T[i + 1] + 0.3)) : 1;
      w.style.transform = `translate3d(0,${px(lerp(64, 0, p) - 1500 * whip)},0)`;
      fx(w, P(t, a, a + 0.18) * dim, 16 * (1 - p));
    });
  }

  // ============================================================ S4 — already wired
  const STACK = [
    ['web', 'apps · Next.js 16 app'], ['api', 'apps · Express API, port 8000'], ['db', 'packages · Mongoose + models'], ['ui', 'packages · shadcn/ui library'],
    ['logging', 'packages · Axiom logger'], ['shared', 'packages · types + constants'], ['eslint-config', 'packages · base, next, node'], ['typescript-config', 'packages · tsconfig presets'],
  ];
  s4.innerHTML = `<div class="glow" style="left:260px;top:180px;width:1400px;height:900px;background:radial-gradient(closest-side,rgba(45,79,29,.10),rgba(45,79,29,0))"></div>
    <div class="cam" id="c4">
      <div class="disp" id="h4" style="position:absolute;left:0;width:1920px;top:118px;text-align:center;color:#141412;font-size:124px">${words('Already')} <span class="w serif" style="color:#2D4F1D">wired.</span></div>
      <div id="n4" style="position:absolute;left:0;width:1920px;top:262px;text-align:center;font-family:M,monospace;font-size:26px;color:#7A6E5A"></div>
      <div class="cam" id="grid" style="transform-style:preserve-3d">${STACK.map(([a, b]) => `<div class="tile"><b>${a}</b><em>${b}</em><div class="dot"></div><div class="bar"><i></i></div></div>`).join('')}</div>
    </div>`;
  const c4 = $('#c4');
  const grid = $('#grid');
  const h4w = $$('#h4 .w', s4);
  const n4 = $('#n4');
  const tiles = $$('.tile', s4).map(el => ({ el, dot: $('.dot', el), bar: $('.bar i', el) }));
  const TILE_T = i => C.tiles0 + i * 0.1365;
  function s4Off(t) {
    return { x: 0, y: 1500 * (1 - E.outCubic(P(t, 11.95, 12.42))) };
  }
  function renderS4(t) {
    const on = t >= 11.95 && t < C.endHit + 0.05;
    show(s4, on);
    if (!on) return;
    const off = s4Off(t);
    const v = vel(s4Off, t);
    motionBlur(s4, 'mb4', v.vx, v.vy);
    const zoom = E.inExpo(P(t, C.end + 0.1, C.endHit));
    tf(c4, { x: 960, y: 540 + off.y, s: 1, w: 1920, hh: 1080 });
    c4.style.opacity = (1 - E.inOutSine(P(t, C.endHit - 0.3, C.endHit))).toFixed(3);
    h4w.forEach((w, i) => rise(w, t, C.grid + 0.12 + i * 0.08, 60, 16, 0.65));
    const lit = tiles.filter((_, i) => t >= TILE_T(i) + 0.25).length;
    n4.textContent = '';
    n4.style.opacity = P(t, C.tiles0, C.tiles0 + 0.2).toFixed(3);
    tf(grid, { x: 960, y: 600, w: 1920, hh: 1080 });
    const hit = 0;
    tiles.forEach((tile, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const a = TILE_T(i);
      const p = E.outExpo(P(t, a, a + 0.7));
      const x = 255 + col * 360 + 165;
      const y = 410 + row * 160 + 66;
      if (t < a) {
        tile.el.style.opacity = 0;
        return;
      }
      tf(tile.el, { x, y: y + lerp(28, 0, p), w: 330, hh: 132 });
      fx(tile.el, P(t, a, a + 0.25), 0);
      const fill = E.outExpo(P(t, a + 0.08, a + 0.65));
      tile.bar.style.width = `${(100 * fill).toFixed(2)}%`;
      
      tile.dot.style.boxShadow = `0 0 0 ${(8 * hit).toFixed(1)}px rgba(45,79,29,${(0.18 * hit).toFixed(3)})`;
    });
  }

  // ============================================================ S5 — end card
  s5.innerHTML = `<div class="glow" id="g5" style="left:260px;top:120px;width:1400px;height:900px;background:radial-gradient(closest-side,rgba(166,219,123,.20),rgba(166,219,123,0))"></div>
    <div class="cam" id="c5">
      <div class="disp" style="position:absolute;left:0;width:1920px;top:196px;text-align:center;color:#EDEAE3;font-size:236px">${'TejaDev'.split('').map(c => `<span class="mask"><span class="w lt">${c}</span></span>`).join('')}</div>
      <div class="serif" id="e2" style="position:absolute;left:0;width:1920px;top:414px;text-align:center;color:#6E6A63;font-size:236px;line-height:.95">Template</div>
      <div id="e3" style="position:absolute;left:0;width:1920px;top:690px;text-align:center;color:rgba(237,234,227,.72);font-size:42px;font-weight:500;letter-spacing:-.01em">${words('Clone it. Fill .env. Build the feature.')}</div>
      <div id="e4" style="position:absolute;left:0;width:1920px;top:792px;text-align:center;font-family:M,monospace;font-size:26px;color:#8B877F">github.com/srinivasa-reddy25/tejadev-template</div>
    </div>`;
  const c5 = $('#c5');
  const eL = $$('.lt', s5);
  const e2 = $('#e2');
  const e3 = $$('#e3 .w', s5);
  const e4 = $('#e4');
  const g5 = $('#g5');
  function renderS5(t) {
    const on = t >= C.endHit;
    show(s5, on);
    if (!on) return;
    tf(c5, { x: 960, y: 540, s: 1, w: 1920, hh: 1080 });
    eL.forEach((l, i) => {
      const p = E.outExpo(P(t, C.endHit + i * 0.04, C.endHit + i * 0.04 + 0.75));
      l.style.transform = `translateY(${lerp(108, 0, p).toFixed(2)}%)`;
    });
    const p2 = E.outExpo(P(t, C.endHit + 0.27, C.endHit + 0.95));
    e2.style.transform = `translateY(${px(lerp(46, 0, p2))}) scale(${lerp(0.94, 1, p2).toFixed(4)})`;
    fx(e2, P(t, C.endHit + 0.27, C.endHit + 0.45), 16 * (1 - p2));
    e3.forEach((w, i) => rise(w, t, C.endHit + 0.75 + i * 0.06, 22, 10, 0.6));
    rise(e4, t, C.endHit + 1.35, 16, 8, 0.6);
    g5.style.opacity = E.outCubic(P(t, C.endHit, C.endHit + 1.4)).toFixed(3);
  }

  function renderAt(t, smp) {
    SMP = smp || samplesAt(t);
    flash.style.opacity = '0';
    if (t >= C.endHit) flash.style.opacity = (0.0).toFixed(3);
    fade.style.opacity = E.inOutSine(P(t, C.fade, C.duration)).toFixed(3);
    renderS1(t);
    renderS2(t);
    renderS3(t);
    renderS4(t);
    renderS5(t);
  }
  const WIN = [
    [C.term, C.term + 0.5, 4, 0.5], [11.8, 12.45, 5, 0.7],
  ];
  function samplesAt(t) {
    let n = 1;
    let shutter = 0.5;
    for (const [a, b, k, sh] of WIN) if (t >= a && t <= b && k > n) { n = k; shutter = sh; }
    return { n, shutter };
  }
  window.renderAt = renderAt;
  window.samplesAt = samplesAt;
  (async () => {
    await document.fonts.ready;
    await Promise.all(['800 100px H', '700 40px H', '500 40px H', '400 100px S', '400 30px M', '600 30px M'].map(f => document.fonts.load(f, 'aA0✓')));
    renderAt(0);
    window.READY = true;
  })();
})();
