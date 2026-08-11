(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-panel");
  if (toggle && panel) {
    const setOpen = (open) => {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", () => {
      setOpen(!panel.classList.contains("is-open"));
    });
    panel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Hero layers (matches diagram):
  //   Layer 1 — CSS soft base (.hero__base)  → never moves
  //   Layer 2 — multi-line wave canvas       → rolls up/down
  // Motion reference: Aceternity WavyBackground (noise + time)
  // Visual: fine parallel strands (blue / purple / pink), not solid blobs
  // ─────────────────────────────────────────────────────────────
  const canvas = document.getElementById("hero-waves");
  const hero = document.querySelector(".hero");

  if (canvas && hero && !reduce) {
    const ctx = canvas.getContext("2d", { alpha: true });
    const isSafari =
      typeof navigator !== "undefined" &&
      /Safari/i.test(navigator.userAgent) &&
      !/Chrome|Chromium|CriOS/i.test(navigator.userAgent);

    // Simplex 3D noise (same family as the wavy-background reference)
    const noise3D = (() => {
      const F3 = 1 / 3;
      const G3 = 1 / 6;
      const grad3 = [
        [1, 1, 0],
        [-1, 1, 0],
        [1, -1, 0],
        [-1, -1, 0],
        [1, 0, 1],
        [-1, 0, 1],
        [1, 0, -1],
        [-1, 0, -1],
        [0, 1, 1],
        [0, -1, 1],
        [0, 1, -1],
        [0, -1, -1],
      ];
      const p = new Uint8Array(256);
      for (let i = 0; i < 256; i++) p[i] = i;
      let s = 1337;
      const rand = () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const t = p[i];
        p[i] = p[j];
        p[j] = t;
      }
      const perm = new Uint8Array(512);
      const permMod12 = new Uint8Array(512);
      for (let i = 0; i < 512; i++) {
        perm[i] = p[i & 255];
        permMod12[i] = perm[i] % 12;
      }
      const dot = (g, x, y, z) => g[0] * x + g[1] * y + g[2] * z;
      return (xin, yin, zin) => {
        const s0 = (xin + yin + zin) * F3;
        const i = Math.floor(xin + s0);
        const j = Math.floor(yin + s0);
        const k = Math.floor(zin + s0);
        const t = (i + j + k) * G3;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        const z0 = zin - Z0;
        let i1, j1, k1, i2, j2, k2;
        if (x0 >= y0) {
          if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          }
        } else if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        }
        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2 * G3;
        const y2 = y0 - j2 + 2 * G3;
        const z2 = z0 - k2 + 2 * G3;
        const x3 = x0 - 1 + 3 * G3;
        const y3 = y0 - 1 + 3 * G3;
        const z3 = z0 - 1 + 3 * G3;
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const gi0 = permMod12[ii + perm[jj + perm[kk]]];
        const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
        const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
        const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]];
        let n0 = 0,
          n1 = 0,
          n2 = 0,
          n3 = 0;
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 >= 0) {
          t0 *= t0;
          n0 = t0 * t0 * dot(grad3[gi0], x0, y0, z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 >= 0) {
          t1 *= t1;
          n1 = t1 * t1 * dot(grad3[gi1], x1, y1, z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 >= 0) {
          t2 *= t2;
          n2 = t2 * t2 * dot(grad3[gi2], x2, y2, z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 >= 0) {
          t3 *= t3;
          n3 = t3 * t3 * dot(grad3[gi3], x3, y3, z3);
        }
        return 32 * (n0 + n1 + n2 + n3);
      };
    })();

    // Ribbon palettes (light blue → purple → pink), matches wave-elements ref
    const palettes = [
      ["#7dd3fc", "#93c5fd", "#a5b4fc", "#c4b5fd"],
      ["#a5b4fc", "#c4b5fd", "#e9d5ff", "#f0abfc"],
      ["#67e8f9", "#7dd3fc", "#a5b4fc", "#d8b4fe"],
      ["#c4b5fd", "#f0abfc", "#f9a8d4", "#93c5fd"],
      ["#93c5fd", "#bfdbfe", "#ddd6fe", "#fbcfe8"],
    ];

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nt = 0;
    let raf = 0;
    let running = true;
    const speed = 0.0018; // ~ WavyBackground "fast"

    // Each ribbon is a group of parallel fine strands
    const ribbons = [
      { y: 0.22, amp: 0.085, strands: 14, gap: 2.4, thick: 1.15, span: 1.05, phase: 0.0 },
      { y: 0.4, amp: 0.1, strands: 16, gap: 2.2, thick: 1.2, span: 1.1, phase: 0.7 },
      { y: 0.58, amp: 0.095, strands: 15, gap: 2.3, thick: 1.15, span: 1.0, phase: 1.4 },
      { y: 0.76, amp: 0.08, strands: 12, gap: 2.5, thick: 1.1, span: 1.05, phase: 2.1 },
      { y: 0.92, amp: 0.07, strands: 11, gap: 2.6, thick: 1.05, span: 0.95, phase: 2.8 },
    ];

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Soft blur like reference demo; Safari uses CSS filter
      if (!isSafari) ctx.filter = "blur(0.6px)";
      else {
        ctx.filter = "none";
        canvas.style.filter = "blur(0.8px)";
      }
    };

    const colorAt = (palette, t) => {
      const n = palette.length - 1;
      const x = Math.max(0, Math.min(1, t)) * n;
      const i = Math.floor(x);
      const f = x - i;
      const a = palette[i];
      const b = palette[Math.min(n, i + 1)];
      const parse = (hex) => [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ];
      const [r1, g1, b1] = parse(a);
      const [r2, g2, b2] = parse(b);
      const r = Math.round(r1 + (r2 - r1) * f);
      const g = Math.round(g1 + (g2 - g1) * f);
      const bl = Math.round(b1 + (b2 - b1) * f);
      return `rgb(${r},${g},${bl})`;
    };

    const drawWaves = () => {
      nt += speed;
      // Transparent clear — base stays in CSS layer under this
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Continuous vertical roll of the whole wave field
      const scroll = (nt * h * 0.42) % (h * 1.35);

      ribbons.forEach((rib, ri) => {
        const palette = palettes[ri % palettes.length];
        const half = (rib.strands - 1) / 2;

        // Ribbon center tracks upward and loops (上下滾動)
        const band =
          ((rib.y * h + rib.phase * 40 - scroll + h * 1.4) % (h * 1.4)) - h * 0.2;

        for (let s = 0; s < rib.strands; s++) {
          const offset = (s - half) * rib.gap;
          // slight stagger so strand bundle feels dimensional
          const strandNoise = s * 0.07;
          const mid = half === 0 ? 0.5 : s / (rib.strands - 1);

          ctx.beginPath();
          ctx.lineWidth = rib.thick;
          ctx.strokeStyle = colorAt(palette, mid);
          // Fade edges of each bundle slightly
          const edge = 1 - Math.abs(s - half) / (half + 0.5);
          ctx.globalAlpha = 0.22 + edge * 0.38;

          const step = w < 700 ? 5 : 4;
          for (let x = 0; x <= w; x += step) {
            // Core equation like wavy-background, multi-band:
            // y = noise(x/scale, bandId, time) * amp + rolling base
            const n1 = noise3D(x / 780 + rib.phase, 0.28 * ri + strandNoise, nt + rib.phase * 0.2);
            const n2 = noise3D(x / 420, 0.9 + ri * 0.15, nt * 0.65 + s * 0.01);
            const y =
              band +
              offset +
              n1 * (h * rib.amp) +
              n2 * (h * rib.amp * 0.35) +
              Math.sin(x * 0.006 + nt * 2.2 + rib.phase) * (h * 0.015);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
    };

    const render = () => {
      if (!running) {
        raf = 0;
        return;
      }
      drawWaves();
      raf = requestAnimationFrame(render);
    };

    resize();
    render();

    let resizeTimer = 0;
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          resize();
          if (running) drawWaves();
        }, 80);
      },
      { passive: true }
    );

    if ("IntersectionObserver" in window) {
      const ioHero = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              if (!raf) render();
            }
          } else {
            running = false;
            if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          }
        },
        { threshold: 0.04 }
      );
      ioHero.observe(hero);
    }
  }

  // Speaker entrance
  const speakers = document.querySelectorAll(".speaker");
  if (!speakers.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    speakers.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const i = Number(el.dataset.i || 0);
        el.style.animationDelay = `${i * 55}ms`;
        el.classList.add("is-in");
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  speakers.forEach((el, i) => {
    el.dataset.i = String(i);
    io.observe(el);
  });
})();
