/* Robot Dog Canvas Animation
 * Walk-in intro with dragged banner, idle tail-wag, cursor-proximity jump.
 */
(function () {
  'use strict';

  const THEME = {
    light: {
      body: '#5a5aaa',
      bodyStroke: '#3a3a88',
      legs: '#4a4a99',
      legsBack: '#3a3a77',
      joints: '#9090cc',
      eyes: '#00e5aa',
      eyeGlow: 'rgba(0,229,170,0.35)',
      ground: 'rgba(90,90,180,0.12)',
      rope: '#999aaa',
      bannerBg: 'rgba(245,245,255,0.92)',
      bannerBorder: '#9090cc',
      bannerText: '#222240',
      shadow: 'rgba(0,0,0,0.12)',
      paw: '#7070bb',
    },
    dark: {
      body: '#8888dd',
      bodyStroke: '#aaaaff',
      legs: '#7777cc',
      legsBack: '#5555aa',
      joints: '#bbbbee',
      eyes: '#00ffbb',
      eyeGlow: 'rgba(0,255,187,0.4)',
      ground: 'rgba(140,140,220,0.1)',
      rope: '#aaaacc',
      bannerBg: 'rgba(28,28,58,0.92)',
      bannerBorder: '#aaaaee',
      bannerText: '#eeeeff',
      shadow: 'rgba(0,0,0,0.3)',
      paw: '#9090cc',
    },
  };

  function theme() {
    const html = document.documentElement;
    return html.getAttribute('data-bs-theme') === 'dark' ||
      html.classList.contains('dark-mode') ||
      html.dataset.theme === 'dark'
      ? 'dark'
      : 'light';
  }

  // ─── Leg helper ───────────────────────────────────────────────────────────

  function drawLeg(ctx, hipX, hipY, walkPhase, s, c, isNear, isIdle) {
    const swingAmt = isIdle ? 2 * s : 13 * s;
    const liftAmt = isIdle ? 0 : 10 * s;
    const swing = Math.sin(walkPhase) * swingAmt;
    const lift = Math.max(0, Math.sin(walkPhase)) * liftAmt;

    // Far-leg perspective nudge
    const px = isNear ? 0 : 3 * s;
    const py = isNear ? 0 : 2 * s;
    const col = isNear ? c.legs : c.legsBack;
    const lw = isNear ? 5.5 * s : 4.5 * s;

    const kx = hipX + px + swing * 0.45;
    const ky = hipY + py + 18 * s - lift * 0.4;
    const fx = hipX + px + swing;
    const fy = hipY + py + 38 * s - lift;

    ctx.lineCap = 'round';

    // Upper segment
    ctx.beginPath();
    ctx.moveTo(hipX + px, hipY + py);
    ctx.lineTo(kx, ky);
    ctx.strokeStyle = col;
    ctx.lineWidth = lw;
    ctx.stroke();

    // Lower segment
    ctx.beginPath();
    ctx.moveTo(kx, ky);
    ctx.lineTo(fx, fy);
    ctx.lineWidth = lw - s;
    ctx.stroke();

    // Knee dot
    ctx.beginPath();
    ctx.arc(kx, ky, 3 * s, 0, Math.PI * 2);
    ctx.fillStyle = c.joints;
    ctx.fill();

    // Paw
    ctx.beginPath();
    ctx.ellipse(fx, fy, 4 * s, 2.5 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = c.paw;
    ctx.fill();
  }

  // ─── RobotDog class ───────────────────────────────────────────────────────

  class RobotDog {
    constructor(canvas, name) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.name = name;

      this.w = 0;
      this.h = 0;
      this.groundY = 0;
      this.targetX = 0;
      this.s = 1; // scale

      this.x = 0;
      this.walkCycle = 0;
      this.phase = 'init'; // init | walking-in | idle
      this.phaseTimer = 0;

      this.jumpY = 0;
      this.jumpVel = 0;
      this.isJumping = false;
      this.jumpCooldown = 0;

      this.mouseX = -9999;
      this.mouseY = -9999;

      this.lastTime = 0;
      this.raf = null;
    }

    // ── Sizing ──────────────────────────────────────────────────────────────

    resize() {
      const dpr = window.devicePixelRatio || 1;
      const parentW = this.canvas.parentElement.clientWidth || 600;
      const h = 190;

      this.canvas.style.width = parentW + 'px';
      this.canvas.style.height = h + 'px';
      this.canvas.width = Math.round(parentW * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.w = parentW;
      this.h = h;
      this.groundY = h - 28;
      this.s = Math.min(1.35, Math.max(0.7, parentW / 560));
      this.targetX = Math.max(110 * this.s, parentW * 0.17);
    }

    // ── Lifecycle ────────────────────────────────────────────────────────────

    start() {
      this.resize();
      this.x = -130 * this.s;
      this.phase = 'walking-in';
      this.walkCycle = 0;
      this.lastTime = performance.now();
      this._loop();
    }

    stop() {
      if (this.raf) cancelAnimationFrame(this.raf);
    }

    setMouse(x, y) {
      this.mouseX = x;
      this.mouseY = y;
    }

    jump() {
      if (this.isJumping || this.jumpCooldown > 0) return;
      this.isJumping = true;
      this.jumpVel = -340 * this.s;
    }

    // ── Update ───────────────────────────────────────────────────────────────

    _update(dt) {
      const s = this.s;
      const walkSpeed = 100 * s;

      if (this.phase === 'walking-in') {
        this.x += walkSpeed * dt;
        this.walkCycle += 5 * dt;
        if (this.x >= this.targetX) {
          this.x = this.targetX;
          this.phase = 'idle';
          this.walkCycle = 0;
        }
      } else if (this.phase === 'idle') {
        this.walkCycle += 1.8 * dt;

        // Jump when cursor is close
        if (!this.isJumping && this.jumpCooldown <= 0) {
          const dx = this.mouseX - this.x;
          const dy = this.mouseY - (this.groundY - 45 * s);
          if (Math.hypot(dx, dy) < 72 * s) {
            this.jump();
          }
        }
      }

      // Jump physics
      if (this.isJumping) {
        const gravity = 820 * s;
        this.jumpVel += gravity * dt;
        this.jumpY -= this.jumpVel * dt;
        if (this.jumpY <= 0) {
          this.jumpY = 0;
          this.isJumping = false;
          this.jumpCooldown = 2.2;
        }
      }
      if (this.jumpCooldown > 0) this.jumpCooldown -= dt;
    }

    // ── Draw ─────────────────────────────────────────────────────────────────

    _draw() {
      const ctx = this.ctx;
      const { w, h, groundY, x, s } = this;
      const c = THEME[theme()];

      ctx.clearRect(0, 0, w, h);

      // Ground line
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(w, groundY);
      ctx.strokeStyle = c.ground;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Shadow under dog (and jump shadow shrinks)
      const shadowScale = Math.max(0.2, 1 - this.jumpY / (80 * s));
      ctx.beginPath();
      ctx.ellipse(x, groundY + 3, 28 * s * shadowScale, 5 * s * shadowScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = c.shadow;
      ctx.fill();

      // Banner progress: 0 at start, 1 when fully walked in
      const walkTotal = this.targetX - (-130 * s);
      const walked = Math.min(1, Math.max(0, (x - (-130 * s)) / walkTotal));
      this._drawBanner(x, groundY, walked, c);

      const isIdle = this.phase === 'idle';
      this._drawDog(x, groundY, this.walkCycle, this.jumpY, c, isIdle);
    }

    _drawBanner(dogX, groundY, progress, c) {
      if (progress <= 0.01) return;
      const ctx = this.ctx;
      const s = this.s;

      // Rope attaches to dog collar area
      const ropeStartX = dogX - 20 * s;
      const ropeStartY = groundY - 52 * s;

      // Banner trails behind dog (to the left)
      const bannerW = Math.min(180 * s, 160);
      const bannerH = 34 * s;
      const bannerCX = dogX - 195 * s;
      const bannerLeft = bannerCX - bannerW / 2;
      const bannerTop = groundY - 85 * s;

      const ropeEndX = bannerLeft + bannerW;
      const ropeEndY = bannerTop + bannerH / 2;

      ctx.save();
      ctx.globalAlpha = Math.min(1, progress * 1.6);

      // Rope (catenary curve)
      ctx.beginPath();
      ctx.moveTo(ropeEndX, ropeEndY);
      const catX = (ropeEndX + ropeStartX) / 2;
      const catY = Math.max(ropeEndY, ropeStartY) + 14 * s;
      ctx.quadraticCurveTo(catX, catY, ropeStartX, ropeStartY);
      ctx.strokeStyle = c.rope;
      ctx.lineWidth = 1.8 * s;
      ctx.setLineDash([]);
      ctx.lineCap = 'round';
      ctx.stroke();

      // Banner shadow
      ctx.beginPath();
      this._roundRect(ctx, bannerLeft + 3 * s, bannerTop + 3 * s, bannerW, bannerH, 5 * s);
      ctx.fillStyle = 'rgba(0,0,0,0.13)';
      ctx.fill();

      // Banner background
      ctx.beginPath();
      this._roundRect(ctx, bannerLeft, bannerTop, bannerW, bannerH, 5 * s);
      ctx.fillStyle = c.bannerBg;
      ctx.fill();
      ctx.strokeStyle = c.bannerBorder;
      ctx.lineWidth = 1.8 * s;
      ctx.stroke();

      // Banner text
      const fontSize = Math.round(Math.min(18, 15 * s + 4));
      ctx.font = `bold ${fontSize}px 'Source Sans Pro', 'Helvetica Neue', sans-serif`;
      ctx.fillStyle = c.bannerText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.name, bannerLeft + bannerW / 2, bannerTop + bannerH / 2);

      // Small hook at rope attach point on banner
      ctx.beginPath();
      ctx.arc(ropeEndX, ropeEndY, 3 * s, 0, Math.PI * 2);
      ctx.fillStyle = c.joints;
      ctx.fill();

      ctx.restore();
    }

    _drawDog(cx, groundY, walkPhase, jumpOff, c, isIdle) {
      const ctx = this.ctx;
      const s = this.s;

      ctx.save();
      ctx.translate(cx, groundY - jumpOff);

      const bW = 66 * s;
      const bH = 17 * s;
      const bX = -bW / 2;
      const bY = -(42 * s + bH); // top of body

      const hipY = bY + bH; // bottom of body = hip line

      // ── Back-side legs (drawn first, behind body) ───────────────────────
      // Trot: FL+BR share phase 0, FR+BL share phase π
      // Front-far (right): phase = π → out of phase with front-near
      drawLeg(ctx, bX + bW * 0.72, hipY, walkPhase + Math.PI, s, c, false, isIdle);
      // Back-far (right): phase = 0
      drawLeg(ctx, bX + bW * 0.28, hipY, walkPhase, s, c, false, isIdle);

      // ── Body ─────────────────────────────────────────────────────────────
      ctx.beginPath();
      this._roundRect(ctx, bX, bY, bW, bH, 4 * s);
      ctx.fillStyle = c.body;
      ctx.fill();
      ctx.strokeStyle = c.bodyStroke;
      ctx.lineWidth = 1.4 * s;
      ctx.stroke();

      // Body centre seam detail
      ctx.beginPath();
      ctx.moveTo(0, bY + 3 * s);
      ctx.lineTo(0, bY + bH - 3 * s);
      ctx.strokeStyle = c.joints;
      ctx.lineWidth = 0.9 * s;
      ctx.stroke();

      // ── Near-side legs (in front of body) ────────────────────────────────
      // Front-near (left): phase = 0
      drawLeg(ctx, bX + bW * 0.72, hipY, walkPhase, s, c, true, isIdle);
      // Back-near (left): phase = π
      drawLeg(ctx, bX + bW * 0.28, hipY, walkPhase + Math.PI, s, c, true, isIdle);

      // ── Tail ─────────────────────────────────────────────────────────────
      const wag = isIdle ? Math.sin(walkPhase * 2.8) * 22 : Math.sin(walkPhase) * 14;
      const tBX = bX + 3 * s;
      const tBY = bY + bH * 0.25;
      ctx.beginPath();
      ctx.moveTo(tBX, tBY);
      ctx.quadraticCurveTo(
        tBX - 12 * s,
        tBY - 18 * s + wag * 0.4,
        tBX - 8 * s,
        tBY - 32 * s + wag
      );
      ctx.strokeStyle = c.body;
      ctx.lineWidth = 5.5 * s;
      ctx.lineCap = 'round';
      ctx.stroke();
      // Tail tip
      ctx.beginPath();
      ctx.arc(tBX - 8 * s, tBY - 32 * s + wag, 3.5 * s, 0, Math.PI * 2);
      ctx.fillStyle = c.joints;
      ctx.fill();

      // ── Head ─────────────────────────────────────────────────────────────
      const hW = 28 * s;
      const hH = 20 * s;
      const hX = bX + bW - hW * 0.35;
      const hY = bY - hH + 5 * s;

      ctx.beginPath();
      this._roundRect(ctx, hX, hY, hW, hH, [5 * s, 8 * s, 5 * s, 3 * s]);
      ctx.fillStyle = c.body;
      ctx.fill();
      ctx.strokeStyle = c.bodyStroke;
      ctx.lineWidth = 1.4 * s;
      ctx.stroke();

      // Snout
      ctx.beginPath();
      this._roundRect(ctx, hX + hW - 1 * s, hY + hH * 0.45, 6 * s, 8 * s, 2 * s);
      ctx.fillStyle = c.legsBack;
      ctx.fill();
      ctx.strokeStyle = c.bodyStroke;
      ctx.lineWidth = 1 * s;
      ctx.stroke();

      // Eye glow
      const eX = hX + hW * 0.55;
      const eY = hY + hH * 0.38;
      const grd = ctx.createRadialGradient(eX, eY, 0, eX, eY, 9 * s);
      grd.addColorStop(0, c.eyes);
      grd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(eX, eY, 9 * s, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Eye core
      ctx.beginPath();
      ctx.arc(eX, eY, 3.2 * s, 0, Math.PI * 2);
      ctx.fillStyle = c.eyes;
      ctx.fill();

      // Antenna
      const aX = hX + hW * 0.28;
      const aTopY = hY - 11 * s;
      ctx.beginPath();
      ctx.moveTo(aX, hY - 1 * s);
      ctx.lineTo(aX, aTopY);
      ctx.strokeStyle = c.joints;
      ctx.lineWidth = 2.2 * s;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(aX, aTopY, 3 * s, 0, Math.PI * 2);
      ctx.fillStyle = c.eyes;
      ctx.fill();

      // Collar ring at rope-attach point
      ctx.beginPath();
      ctx.arc(-10 * s, bY + 4 * s, 4 * s, 0, Math.PI * 2);
      ctx.strokeStyle = c.joints;
      ctx.lineWidth = 2 * s;
      ctx.stroke();

      ctx.restore();
    }

    // ── Util ──────────────────────────────────────────────────────────────────

    _roundRect(ctx, x, y, w, h, r) {
      if (typeof r === 'number') r = [r, r, r, r];
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        const [tl, tr, br, bl] = r;
        ctx.moveTo(x + tl, y);
        ctx.lineTo(x + w - tr, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
        ctx.lineTo(x + w, y + h - br);
        ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
        ctx.lineTo(x + bl, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
        ctx.lineTo(x, y + tl);
        ctx.quadraticCurveTo(x, y, x + tl, y);
        ctx.closePath();
      }
    }

    // ── Loop ──────────────────────────────────────────────────────────────────

    _loop() {
      const now = performance.now();
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      this._update(dt);
      this._draw();
      this.raf = requestAnimationFrame(() => this._loop());
    }
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  function init() {
    const canvas = document.getElementById('robot-dog-canvas');
    if (!canvas) return;

    // Grab name from page h1, fallback to site author
    const h1 = document.querySelector('.post-title');
    const name = h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : 'Jonas Frey';

    const dog = new RobotDog(canvas, name);
    dog.start();

    // Mouse tracking (relative to canvas)
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      dog.setMouse(e.clientX - r.left, e.clientY - r.top);
    });
    canvas.addEventListener('mouseleave', () => dog.setMouse(-9999, -9999));
    canvas.addEventListener('click', () => dog.jump());

    // Touch support
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      dog.setMouse(t.clientX - r.left, t.clientY - r.top);
    }, { passive: false });
    canvas.addEventListener('touchend', () => dog.jump());

    window.addEventListener('resize', () => dog.resize());

    // Re-init on theme change (observe class/attr mutations)
    const obs = new MutationObserver(() => { /* theme() reads live, nothing to do */ });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme', 'class', 'data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
