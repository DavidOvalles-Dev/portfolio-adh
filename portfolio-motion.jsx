// Portfolio motion effects: cursor, scroll progress, magnetic, scramble, counter, tilt

// ─────────────────────────────────────────────── Custom cursor
function CustomCursor() {
  React.useEffect(() => {
    if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf;
    const HOVER_SEL = "a, button, .stack-chip, .edu-card, .project, .nav-link, .nav-toggle, .nav-lang button, .contact-cta, .contact-cell, .btn";
    function move(e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }
    function tick() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    }
    function over(e) {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        ring.classList.add("is-hover");
        dot.classList.add("is-hover");
      }
    }
    function out(e) {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
      }
    }
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      dot.remove(); ring.remove();
    };
  }, []);
  return null;
}

// ─────────────────────────────────────────────── Scroll progress
function ScrollProgress() {
  React.useEffect(() => {
    const el = document.createElement("div");
    el.className = "scroll-progress";
    document.body.append(el);
    function update() {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? scrollTop / max : 0;
      el.style.setProperty("--p", p);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.remove();
    };
  }, []);
  return null;
}

// ─────────────────────────────────────────────── Magnetic hover
function useMagnetic(ref, strength = 0.35) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
    function move(e) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    }
    function leave() {
      el.style.transform = "translate(0,0)";
    }
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
}

// ─────────────────────────────────────────────── Scramble text
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
function useScramble(targetText, trigger) {
  const [text, setText] = React.useState(targetText);
  const rafRef = React.useRef();
  const queueRef = React.useRef([]);
  const frameRef = React.useRef(0);

  React.useEffect(() => {
    setText(targetText);
  }, [targetText]);

  function start() {
    cancelAnimationFrame(rafRef.current);
    const oldText = text;
    const newText = targetText;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const startF = Math.floor(Math.random() * 16);
      const endF = startF + Math.floor(Math.random() * 16);
      queue.push({ from, to, start: startF, end: endF, char: "" });
    }
    queueRef.current = queue;
    frameRef.current = 0;
    update();
  }

  function update() {
    let output = "";
    let complete = 0;
    const q = queueRef.current;
    const f = frameRef.current;
    for (let i = 0; i < q.length; i++) {
      const item = q[i];
      if (f >= item.end) {
        complete++;
        output += item.to;
      } else if (f >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        output += `<span class="scramble-glyph">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }
    if (complete === q.length) {
      setText(targetText);
      return;
    }
    setHTML(output);
    frameRef.current = f + 1;
    rafRef.current = requestAnimationFrame(update);
  }

  const [html, setHTML] = React.useState(null);

  return {
    onMouseEnter: start,
    rendered: html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : <span>{text}</span>,
  };
}

// Simpler scramble component
function ScrambleHover({ text, className, as: As = "span" }) {
  const [display, setDisplay] = React.useState(text);
  const rafRef = React.useRef();
  const ranRef = React.useRef(false);

  React.useEffect(() => {
    setDisplay(text);
    ranRef.current = false;
  }, [text]);

  function run() {
    cancelAnimationFrame(rafRef.current);
    const target = text;
    const length = target.length;
    const queue = [];
    for (let i = 0; i < length; i++) {
      const startF = Math.floor(Math.random() * 12);
      const endF = startF + Math.floor(Math.random() * 12) + 4;
      queue.push({ to: target[i], start: startF, end: endF, char: "" });
    }
    let frame = 0;
    function tick() {
      let out = "";
      let complete = 0;
      for (const item of queue) {
        if (frame >= item.end) {
          complete++;
          out += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.3) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          out += item.char;
        } else {
          out += item.to;
        }
      }
      setDisplay(out);
      if (complete === queue.length) return;
      frame++;
      rafRef.current = requestAnimationFrame(tick);
    }
    tick();
  }

  return (
    <As className={className} onMouseEnter={run}>
      {display}
    </As>
  );
}

// ─────────────────────────────────────────────── Number counter
function CountUp({ to, suffix = "", duration = 1600, prefix = "" }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          function step(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─────────────────────────────────────────────── 3D tilt
function useTilt(ref, max = 8) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(hover: none), (pointer: coarse)").matches) return;
    function move(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function leave() {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    }
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [max]);
}

// Magnetic button wrapper
function MagneticButton({ children, strength = 0.25, ...props }) {
  const ref = React.useRef(null);
  useMagnetic(ref, strength);
  return (
    <span ref={ref} className="magnetic" style={{ display: "inline-block" }}>
      {React.cloneElement(children, props)}
    </span>
  );
}

// Tilt card wrapper
function TiltCard({ children, max = 8, className = "", ...props }) {
  const ref = React.useRef(null);
  useTilt(ref, max);
  return (
    <div ref={ref} className={"tilt " + className} {...props}>
      {children}
    </div>
  );
}

Object.assign(window, {
  CustomCursor, ScrollProgress, useMagnetic, useTilt, useScramble,
  ScrambleHover, CountUp, MagneticButton, TiltCard
});
