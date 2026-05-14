// Main app: state for theme/lang/direction/font/density/radius/speed/bg + tweaks panel

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "direction": "A",
    "theme": "dark",
    "lang": "es",
    "font": "modern",
    "accent": "#d4af37",
    "density": "regular",
    "radius": "rounded",
    "speed": "normal",
    "bg": "off",
    "scrollBar": true,
    "cursor": false,
    "loopAnims": false
  }/*EDITMODE-END*/;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-direction", t.direction);
    html.setAttribute("data-theme", t.theme);
    html.setAttribute("data-font", t.font);
    html.setAttribute("data-density", t.density);
    html.setAttribute("data-radius", t.radius);
    html.setAttribute("data-speed", t.speed);
    html.setAttribute("data-bg", t.bg);
    html.setAttribute("data-cursor", t.cursor ? "custom" : "default");
    html.style.setProperty("--accent", t.accent);
  }, [t.direction, t.theme, t.font, t.accent, t.density, t.radius, t.speed, t.bg, t.cursor]);

  React.useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(id);
  }, []);

  // Reveal observer — catches BOTH .reveal and .reveal-card; re-runs on prop changes
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            if (!t.loopAnims) io.unobserve(e.target);
          } else if (t.loopAnims) {
            e.target.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [t.lang, t.direction, t.font, t.loopAnims]);

  const setLang = (l) => setTweak("lang", l);
  const toggleTheme = () => setTweak("theme", t.theme === "dark" ? "light" : "dark");
  const L = t.lang === "es";

  return (
    <React.Fragment>
      <Loader done={loaded} lang={t.lang} />
      {t.bg === "on" && <AnimatedBackground />}
      {t.scrollBar && <ScrollProgress />}
      {t.cursor && <CustomCursor />}      <Nav
        lang={t.lang}
        setLang={setLang}
        theme={t.theme}
        toggleTheme={toggleTheme}
        direction={t.direction}
      />

      <main className="app">
        <Hero lang={t.lang} />
        <About lang={t.lang} />
        <Stack lang={t.lang} />
        <Experience lang={t.lang} />
        <Education lang={t.lang} />
        <Projects lang={t.lang} />
        <Contact lang={t.lang} />
        <Footer lang={t.lang} />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label={L ? "Fondo" : "Background"} />
        <TweakRadio
          label={L ? "Animado" : "Animated"}
          value={t.bg}
          options={[
            { value: "on", label: L ? "Sí" : "On" },
            { value: "off", label: L ? "No" : "Off" },
          ]}
          onChange={(v) => setTweak("bg", v)}
        />
        <TweakSection label={L ? "Cursor" : "Cursor"} />
        <TweakRadio
          label={L ? "Personalizado" : "Custom"}
          value={t.cursor ? "on" : "off"}
          options={[
            { value: "on", label: L ? "Sí" : "On" },
            { value: "off", label: L ? "No" : "Off" },
          ]}
          onChange={(v) => setTweak("cursor", v === "on")}
        />
        <TweakSection label={L ? "Animaciones" : "Animations"} />
        <TweakRadio
          label={L ? "Repetir al scrollear" : "Repeat on scroll"}
          value={t.loopAnims ? "on" : "off"}
          options={[
            { value: "off", label: L ? "Una vez" : "Once" },
            { value: "on", label: L ? "Siempre" : "Always" },
          ]}
          onChange={(v) => setTweak("loopAnims", v === "on")}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
