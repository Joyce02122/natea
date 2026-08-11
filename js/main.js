(function () {
  "use strict";

  /* —— Header —— */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* —— Nav —— */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* —— Year —— */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* —— Speakers reveal —— */
  (function initSpeakersReveal() {
    var cards = document.querySelectorAll(".speaker");
    if (!cards.length) return;

    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      cards.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var idx = Array.prototype.indexOf.call(cards, el);
          el.style.animationDelay = Math.max(0, idx) * 0.07 + "s";
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    cards.forEach(function (el) {
      io.observe(el);
    });
  })();

  /*
   * Hero: single full-bleed photo, one canvas surface only.
   * Soft liquid warp on mid–right bands; left (type) + lower seam stay nearly still.
   * No ribbon overlay layer — avoids double edges / stacked cut-outs.
   */
  function initHeroWaves() {
    var hero = document.querySelector(".hero");
    var canvas = document.getElementById("hero-waves");
    var imgEl = document.getElementById("hero-bg-src");
    if (!hero || !canvas || !imgEl) return;

    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    var ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0;
    var H = 0;
    var t0 = performance.now();
    var raf = 0;
    var cover = { sx: 0, sy: 0, sw: 0, sh: 0 };
    var ready = false;
    var nw = 0;
    var nh = 0;

    function smoothstep(a, b, x) {
      var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }

    function updateCover() {
      if (!nw || !nh || !W || !H) return;
      var scale = Math.max(W / nw, H / nh);
      var sw = W / scale;
      var sh = H / scale;
      var posX = W < 768 ? 0.75 : W < 900 ? 0.7 : 0.62;
      var posY = 0.48;
      cover.sw = sw;
      cover.sh = sh;
      cover.sx = Math.max(0, Math.min(nw - sw, (nw - sw) * posX));
      cover.sy = Math.max(0, Math.min(nh - sh, (nh - sh) * posY));
    }

    function resize() {
      var rect = hero.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width * 1.04));
      H = Math.max(1, Math.floor(rect.height * 1.04));
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      if ("imageSmoothingQuality" in ctx) ctx.imageSmoothingQuality = "high";
      updateCover();
    }

    /** Spatial mask: 0 left/bottom (type + seam), soft rise into ribbon zone */
    function influence(nx, ny) {
      var hx = smoothstep(0.24, 0.68, nx);
      var hy = smoothstep(0.06, 0.24, ny) * (1 - smoothstep(0.76, 0.93, ny));
      return hx * hy;
    }

    function frame(now) {
      if (!ready) {
        raf = requestAnimationFrame(frame);
        return;
      }

      var t = (now - t0) * 0.001;
      /* Dense grid softens banding / "stacked strip" look */
      var rowStep = Math.max(3, Math.round(H / 160));
      var colStep = Math.max(4, Math.round(W / 120));
      var scale = cover.sw / W;
      var ampMax = Math.min(24, H * 0.032);

      ctx.fillStyle = "#f9f7fd";
      ctx.fillRect(0, 0, W, H);

      for (var y = 0; y < H; y += rowStep) {
        var hCell = Math.min(rowStep + 1.25, H - y);
        var ny = (y + hCell * 0.5) / H;

        for (var x = 0; x < W; x += colStep) {
          var wCell = Math.min(colStep + 1.25, W - x);
          var nx = (x + wCell * 0.5) / W;
          var inf = influence(nx, ny);

          /*
           * Slow dual-frequency drift — noticeable on waves, soft overall.
           * At inf≈0 sample is identity (no ghost double from a second plate).
           */
          var wobble =
            Math.sin(t * 0.95 + nx * 2.6 + ny * 3.8) * 0.7 +
            Math.sin(t * 1.4 + nx * 4.2 - ny * 2.4) * 0.4;
          var amp = ampMax * inf * (0.9 + 0.2 * Math.sin(t * 0.5 + ny * 2.2));
          var dx = Math.cos(t * 0.7 + nx * 1.7 + ny * 3) * amp * 0.55;
          var dy = wobble * amp;

          var sx = cover.sx + (x + dx) * scale;
          var sy = cover.sy + (y + dy) * scale;
          var sw = wCell * scale;
          var sh = hCell * scale;

          if (sx < 0) {
            sw += sx;
            sx = 0;
          }
          if (sy < 0) {
            sh += sy;
            sy = 0;
          }
          if (sx + sw > nw) sw = nw - sx;
          if (sy + sh > nh) sh = nh - sy;
          if (sw <= 0.5 || sh <= 0.5) continue;

          try {
            ctx.drawImage(imgEl, sx, sy, sw, sh, x, y, wCell, hCell);
          } catch (e) {
            /* decode race */
          }
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      nw = imgEl.naturalWidth;
      nh = imgEl.naturalHeight;
      if (!nw) return;
      ready = true;
      resize();
      hero.classList.add("is-warping");
      cancelAnimationFrame(raf);
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }

    if (imgEl.complete && imgEl.naturalWidth) {
      start();
    } else {
      imgEl.addEventListener("load", start, { once: true });
      imgEl.addEventListener(
        "error",
        function () {
          hero.classList.remove("is-warping");
        },
        { once: true }
      );
    }

    window.addEventListener(
      "resize",
      function () {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        resize();
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (ready) {
        t0 = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroWaves);
  } else {
    initHeroWaves();
  }
})();
