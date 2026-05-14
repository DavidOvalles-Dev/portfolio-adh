// Sections: Hero, About, Stack, Experience, Education, Projects, Contact
// Plus Nav

const T = (val, lang) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && (val[lang] !== undefined)) return val[lang];
  return String(val);
};

// Helper: split text into chars with stagger animation
function StaggerText({ text, baseDelay = 0, step = 0.025, className = "", as: As = "span" }) {
  const chars = Array.from(text);
  return (
    <As className={className} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="char"
          aria-hidden="true"
          style={{ "--d": `${baseDelay + i * step}s`, whiteSpace: c === " " ? "pre" : "normal" }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </As>
  );
}

// ============================================================ NAV
function Nav({ lang, setLang, theme, toggleTheme, direction }) {
  const data = window.PORTFOLIO_DATA;
  const sections = ["about", "stack", "experience", "education", "projects", "contact"];
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    const ids = sections;
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <a href="#top" className="nav-mark" aria-label="Home">
          <img src="logo-adh.png" alt="ADH" className="nav-mark-logo" />
        </a>
        <div className="nav-links">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={"nav-link" + (active === s ? " is-active" : "")}
            >
              {T(data.ui.nav[s], lang)}
            </a>
          ))}
        </div>
        <div className="nav-divider" />
        <button className="nav-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <svg className={"nav-icon nav-icon-sun" + (theme === "dark" ? "" : " is-active")} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg className={"nav-icon nav-icon-moon" + (theme === "dark" ? " is-active" : "")} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        <div className="nav-lang" role="group" aria-label="Language" data-lang={lang}>
          <button className={lang === "es" ? "is-active" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </nav>
  );
}

// ============================================================ HERO
function Hero({ lang }) {
  const d = window.PORTFOLIO_DATA;
  const firstName = "Ángel";
  const middleName = "David";
  const surname = "Ovalles";

  return (
    <header className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-kicker reveal">
        <div>
          <span className="dot" />
          {T(d.profile.available, lang)}
        </div>
        <div>{T(d.ui.hero.kicker, lang)}</div>
      </div>

      <div>
        <div className="hero-title-row">
          <div className="meta-stack">
            <div>{T(d.profile.location, lang)}</div>
          </div>
        </div>
        <h1 className="hero-title">
          <StaggerText text={firstName} baseDelay={0.1} />
          <br />
          <StaggerText text={middleName} baseDelay={0.5} className="ital" />
          <br />
          <span className="accent">
            <StaggerText text={surname} baseDelay={0.9} />
          </span>
        </h1>
        <p className="hero-tagline reveal" data-delay="3">
          {T(d.profile.tagline, lang)}
        </p>
        <div className="stat-block reveal" data-delay="4">
          <div className="stat">
            <span className="stat-num"><CountUp to={4} suffix="+" /></span>
            <span className="stat-label">{lang === "es" ? "años de experiencia" : "years experience"}</span>
          </div>
          <div className="stat">
            <span className="stat-num"><CountUp to={6} /></span>
            <span className="stat-label">{lang === "es" ? "lenguajes & frameworks" : "languages & frameworks"}</span>
          </div>
          <div className="stat">
            <span className="stat-num"><CountUp to={100} suffix="%" /></span>
            <span className="stat-label">{lang === "es" ? "soporte bilingüe" : "bilingual support"}</span>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div>{T(d.profile.role, lang)}</div>
        <div>
          <a href={d.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          {" · "}
          <a href={d.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <div>{T(d.ui.hero.scroll, lang)}</div>
          <div className="hero-scroll-line" />
        </div>
      </div>

    </header>
  );
}

// ============================================================ ABOUT
function About({ lang }) {
  const d = window.PORTFOLIO_DATA;
  const wrapRef = React.useRef(null);
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    function onScroll() {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Reserve last 60vh of section as "linger" — animation reaches p=1 early, then holds
      const total = r.height - vh * 1.6;
      const passed = -r.top;
      const v = Math.max(0, Math.min(1, passed / total));
      setP(v);
      el.style.setProperty("--p", v);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="about-scrolly" id="about" ref={wrapRef} data-screen-label="02 About">
      <div className="about-stage">
        <h2 className="about-bigtitle">
          <span>{T(d.ui.sections.about, lang)}</span>
        </h2>
        <div className="about-portrait" style={{ "--p": p }}>
          <div className="about-portrait-aura" aria-hidden="true" />
          <div className="about-portrait-frame">
            <img src="angel-portrait.jpg" alt="Ángel David Ovalles" />
            <div className="about-portrait-shine" aria-hidden="true" />
          </div>
        </div>
        <div className="about-text">
          {d.about[lang].map((paragraph, i) => (
            <p key={i} style={{ transitionDelay: `${i * 80}ms` }}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================ STACK
function StackCard({ group, idx, lang }) {
  const ref = React.useRef(null);
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="stack-card reveal-card"
      data-delay={(idx % 6) + 1}
    >
      <span className="stack-card-num">{String(idx + 1).padStart(2, "0")} / 06</span>
      <div className="stack-card-label">{T(group.label, lang)}</div>
      <div className="stack-chips">
        {group.items.map((item, i) => (
          <div key={i} className="stack-chip">
            {typeof item === "string" ? item : T(item, lang)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack({ lang }) {
  const d = window.PORTFOLIO_DATA;
  const groups = ["languages", "frontend", "backend", "database", "devops", "other"];
  return (
    <section className="section" id="stack" data-screen-label="03 Stack">
      <div className="section-head reveal">
        <h2 className="section-title">{T(d.ui.sections.stack, lang)}</h2>
        <span className="section-meta">{lang === "es" ? "Herramientas del oficio" : "Tools of the trade"}</span>
      </div>
      <div className="stack-grid">
        {groups.map((key, gi) => (
          <StackCard key={key} group={d.stack[key]} idx={gi} lang={lang} />
        ))}
      </div>
    </section>
  );
}

// ============================================================ INTERLUDE (fullscreen)
const INTERLUDE_SLIDES = {
  stack: [
    {
      label: { es: "Lenguajes", en: "Languages" },
      sub: "JS · C# · Java · Python",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=70",
    },
    {
      label: { es: "Frontend", en: "Frontend" },
      sub: "React · Tailwind · Electron",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=70",
    },
    {
      label: { es: "Backend", en: "Backend" },
      sub: "Node.js · .NET Core · APIs",
      img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=70",
    },
    {
      label: { es: "Bases de datos", en: "Databases" },
      sub: "PostgreSQL · SQL Server · Oracle",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=70",
    },
    {
      label: { es: "DevOps & Cloud", en: "DevOps & Cloud" },
      sub: "AWS · Azure · Docker · Kubernetes",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=70",
    },
  ],
  education: [
    {
      label: { es: "ITLA", en: "ITLA" },
      sub: { es: "Desarrollador de Software · 2025", en: "Software Developer · 2025" },
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=70",
    },
    {
      label: { es: "Bilingüe", en: "Bilingual" },
      sub: { es: "New Connection Academy · 2023", en: "New Connection Academy · 2023" },
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=70",
    },
    {
      label: "JSA",
      sub: { es: "Certified JavaScript Programmer", en: "Certified JavaScript Programmer" },
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=70",
    },
    {
      label: { es: ".NET & Java", en: ".NET & Java" },
      sub: { es: "Especialista", en: "Specialist" },
      img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1600&q=70",
    },
    {
      label: "Python",
      sub: { es: "Certificación básica", en: "Basics certification" },
      img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&q=70",
    },
  ],
};

function Interlude({ lang, mode = "stack" }) {
  const ref = React.useRef(null);
  const stageRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const passed = -r.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
      // Reveal stage only when section top reaches viewport top (truly pinned)
      if (stageRef.current) {
        const pinned = r.top <= 0 && r.bottom > vh;
        stageRef.current.classList.toggle("is-pinned", pinned);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slides = INTERLUDE_SLIDES[mode] || INTERLUDE_SLIDES.stack;
  const N = slides.length;
  // Quantize: pick exactly one active slide, no half-states
  const activeIdx = Math.min(N - 1, Math.max(0, Math.round(progress * (N - 1))));

  const kicker = mode === "stack"
    ? (lang === "es" ? "Stack tecnológico" : "Tech stack")
    : (lang === "es" ? "Educación" : "Education");

  return (
    <section className="interlude" ref={ref} data-mode={mode} data-screen-label="03b Interlude">
      {/* Preload images so they crossfade smoothly */}
      <div className="interlude-preload" aria-hidden="true">
        {slides.map((s, i) => <img key={i} src={s.img} alt="" />)}
      </div>
      <div className="interlude-stage" ref={stageRef}>
        {slides.map((s, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={i}
              className={"interlude-slide" + (isActive ? " is-active" : "")}
              style={{ zIndex: isActive ? 10 : 1 }}
            >
              <div
                className="interlude-img"
                style={{ backgroundImage: `url("${s.img}")` }}
              />
              <div className="interlude-shade" />
              <div className="interlude-caption">
                <div className="interlude-kicker">{kicker} · {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</div>
                <div className="interlude-label">{T(s.label, lang)}</div>
                <div className="interlude-sub">{T(s.sub, lang)}</div>
              </div>
            </div>
          );
        })}
        <div className="interlude-bar"><span style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </section>
  );
}

// ============================================================ EXPERIENCE
function Experience({ lang }) {
  const d = window.PORTFOLIO_DATA;
  return (
    <section className="section" id="experience" data-screen-label="04 Experience">
      <div className="section-head reveal">
        <h2 className="section-title">{T(d.ui.sections.experience, lang)}</h2>
        <span className="section-meta">{lang === "es" ? "Trayectoria" : "Track record"}</span>
      </div>
      <ul className="exp-list">
        {d.experience.map((e, i) => (
          <li key={i} className="exp-item reveal-card" data-delay={(i % 5) + 1}>
            <div className="exp-period">{T(e.period, lang)}</div>
            <div>
              <h3 className="exp-company">{e.company}</h3>
              <div className="exp-role">{T(e.role, lang)}</div>
              <ul className="exp-bullets">
                {e.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ============================================================ EDUCATION
function Education({ lang }) {
  const d = window.PORTFOLIO_DATA;
  return (
    <section className="section" id="education" data-screen-label="05 Education">
      <div className="section-head reveal">
        <h2 className="section-title">{T(d.ui.sections.education, lang)}</h2>
        <span className="section-meta">{lang === "es" ? "Formación" : "Credentials"}</span>
      </div>
      <div className="edu-grid">
        {d.education.map((e, i) => (
          <div key={i} className="edu-card reveal-card" data-delay={(i % 5) + 1}>
            <div className="edu-kind">
              <span>{e.kind === "degree" ? (lang === "es" ? "Grado" : "Degree") : (lang === "es" ? "Cert." : "Cert.")}</span>
              <span>{e.year}</span>
            </div>
            <h3 className="edu-title">{T(e.title, lang)}</h3>
            <div className="edu-org">{T(e.org, lang)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================ PROJECTS
function ProjectCard({ project, idx, lang }) {
  const d = window.PORTFOLIO_DATA;
  const ref = React.useRef(null);
  const hasVideo = !!project.links?.youtube;

  function onMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  }

  const initial = T(project.name, lang).charAt(0);

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      data-accent={project.accent}
      className={"project reveal-card" + (hasVideo ? " project--has-video project-feature" : "")}
      data-delay={(idx % 3) + 1}
    >
      <div className="project-grid">
        <div className="project-content">
          <div className="project-meta">
            <span>{String(idx + 1).padStart(2, "0")}</span>
            <span>·</span>
            <span className="project-tag">{T(project.tag, lang)}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <ScrambleHover as="h3" className="project-name" text={T(project.name, lang)} />
          <p className="project-desc">{T(project.description, lang)}</p>
          <ul className="project-features">
            {project.features[lang].map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <div className="project-stack">
            {project.stack.map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="project-actions">
            {hasVideo ? (
              <a className="btn btn--solid" href={project.links.youtube.replace("/embed/", "/watch?v=")} target="_blank" rel="noreferrer">
                {T(d.ui.watchDemo, lang)} ↗
              </a>
            ) : (
              <a className="btn btn--solid" href={project.links.github} target="_blank" rel="noreferrer">
                {T(d.ui.viewCode, lang)} →
              </a>
            )}
          </div>
        </div>
        <div className={"project-visual" + (hasVideo ? " project-visual--video" : "")}>
          {hasVideo ? (
            <iframe
              src={project.links.youtube}
              title={T(project.name, lang) + " demo"}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="project-visual-placeholder">
              <span className="project-visual-mark">{initial}</span>
              <div className="project-visual-pill">{T(project.arch, lang)}</div>
              <div className="project-visual-label">
                {lang === "es" ? "Pendiente · screenshot" : "Coming · screenshot"}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects({ lang }) {
  const d = window.PORTFOLIO_DATA;
  return (
    <section className="section" id="projects" data-screen-label="06 Projects">
      <div className="section-head reveal">
        <h2 className="section-title">{T(d.ui.sections.projects, lang)}</h2>
        <span className="section-meta">{lang === "es" ? "Productos · 2023–2024" : "Products · 2023–2024"}</span>
      </div>
      <div className="projects-list">
        {d.projects.map((p, i) => <ProjectCard key={p.id} project={p} idx={i} lang={lang} />)}
      </div>
    </section>
  );
}

// ============================================================ CONTACT
function Contact({ lang }) {
  const d = window.PORTFOLIO_DATA;
  return (
    <section className="contact" id="contact" data-screen-label="07 Contact">
      <div className="reveal">
        <div className="section-num" style={{ marginBottom: 16 }}>{T(d.ui.sections.contact, lang)}</div>
        <h2 className="contact-title">{T(d.ui.contact.title, lang)}</h2>
        <p className="contact-sub">{T(d.ui.contact.subtitle, lang)}</p>
        <a className="contact-cta" href={`mailto:${d.contact.email}`}>
          {T(d.ui.contact.cta, lang)}
        </a>
      </div>

      <div className="contact-grid reveal" data-delay="2">
        <a className="contact-cell" href={`mailto:${d.contact.email}`}>
          <span className="contact-cell-label">Email</span>
          <span className="contact-cell-value">{d.contact.email}</span>
        </a>
        <a className="contact-cell" href={`tel:${d.contact.phone.replace(/\s/g, "")}`}>
          <span className="contact-cell-label">{lang === "es" ? "Teléfono" : "Phone"}</span>
          <span className="contact-cell-value">{d.contact.phone}</span>
        </a>
        <a className="contact-cell" href={d.contact.github} target="_blank" rel="noreferrer">
          <span className="contact-cell-label">GitHub</span>
          <span className="contact-cell-value">{d.profile.handle}</span>
        </a>
        <a className="contact-cell" href={d.contact.linkedin} target="_blank" rel="noreferrer">
          <span className="contact-cell-label">LinkedIn</span>
          <span className="contact-cell-value">/in/angel-ovalles</span>
        </a>
      </div>
    </section>
  );
}

// ============================================================ FOOTER
function Footer({ lang }) {
  return (
    <footer className="footer">
      <div>© 2026 Ángel Ovalles · {lang === "es" ? "Hecho con código y café" : "Built with code & coffee"}</div>
      <div>{lang === "es" ? "Santo Domingo · República Dominicana" : "Santo Domingo · Dominican Republic"}</div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, About, Stack, Interlude, Experience, Education, Projects, Contact, Footer, StaggerText
});
