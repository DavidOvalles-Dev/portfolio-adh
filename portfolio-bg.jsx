// Animated background — blobs (CSS) + particle canvas
function ParticleField() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const dpr = 1; // Always 1x — no Retina for particles, saves 4x fill cost
    let particles = [];
    let w = 0, h = 0;
    let lastTime = 0;
    const FRAME_MS = 1000 / 30; // 30fps cap

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const count = Math.min(40, Math.floor((w * h) / 40000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.4 + 0.15,
      }));
    }

    function getInk() {
      const theme = document.documentElement.getAttribute("data-theme");
      return theme === "light" ? "20, 17, 11" : "246, 241, 230";
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (now - lastTime < FRAME_MS) return; // skip frame — throttle to 30fps
      lastTime = now;
      ctx.clearRect(0, 0, w, h);
      const ink = getInk();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.fillStyle = `rgba(${ink}, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-particles" />;
}

function AnimatedBackground() {
  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <ParticleField />
      <div className="bg-grain" />
    </div>
  );
}

// Reveal-on-scroll: intersection observer that adds .is-in
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-text");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// Loader
function Loader({ done, lang }) {
  const data = window.PORTFOLIO_DATA;
  return (
    <div className={"loader" + (done ? " is-done" : "")}>
      <div className="loader-mark"><span>A</span></div>
      <div className="loader-bar" />
      <div className="loader-text">{data.ui.loading[lang]} · {data.profile.name}</div>
    </div>
  );
}

Object.assign(window, { ParticleField, AnimatedBackground, Loader, useReveal });
