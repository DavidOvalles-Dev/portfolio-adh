// Bilingual data store + i18n helper
window.PORTFOLIO_DATA = {
  profile: {
    name: "Ángel David Ovalles",
    surname: "Hamedani",
    handle: "@DavidOvalles-Dev",
    location: { es: "Santo Domingo Oeste, RD", en: "Santo Domingo Oeste, DR" },
    role: {
      es: "Desarrollador Full-stack · Lead Developer",
      en: "Full-stack Developer · Lead Developer",
    },
    tagline: {
      es: "Transformando requerimientos de negocio en software escalable y listo para el mercado.",
      en: "Turning business requirements into scalable, market-ready software.",
    },
    years: { es: "+4 años de experiencia", en: "4+ years of experience" },
    available: { es: "Disponible para colaborar", en: "Available for new work" },
  },
  contact: {
    email: "aovalles1155@gmail.com",
    phone: "+1 809 757 1580",
    github: "https://github.com/DavidOvalles-Dev",
    linkedin: "https://linkedin.com/in/angel-ovalles-a0450532a/",
  },
  about: {
    es: [
      "Desarrollador full-stack con liderazgo técnico en productos comerciales en producción. Trabajo en el ciclo completo: arquitectura, base de datos, lógica de negocio y experiencia de usuario.",
      "Mi fuerte está en el frontend: interfaces pulidas, sistemas de diseño coherentes, micro-interacciones y animaciones que respiran. Cuido la tipografía, el color, el ritmo visual y los detalles que separan un producto profesional de uno genérico.",
      "Construyo software pensado para escalar: APIs, integraciones y sistemas transaccionales que aguantan producción real, sin sacrificar el lado estético.",
    ],
    en: [
      "Full-stack developer with technical leadership on commercial products in production. I work the full loop: architecture, database, business logic and user experience.",
      "My strength is the frontend: polished interfaces, coherent design systems, micro-interactions and animations that breathe. I care about typography, color, visual rhythm and the details that separate a professional product from a generic one.",
      "I build software designed to scale: APIs, integrations and transactional systems that survive real production, without sacrificing the aesthetic side.",
    ],
  },
  stack: {
    languages: {
      label: { es: "Lenguajes", en: "Languages" },
      items: ["JavaScript", "TypeScript", "C#", "Java", "Python", "SQL"],
    },
    frontend: {
      label: { es: "Frontend", en: "Frontend" },
      items: ["React", "Electron", "Tailwind", "Bootstrap", "jQuery"],
    },
    backend: {
      label: { es: "Backend", en: "Backend" },
      items: ["Node.js", ".NET Core", "REST APIs", "Grok API"],
    },
    database: {
      label: { es: "Bases de datos", en: "Databases" },
      items: ["PostgreSQL", "SQL Server", "Oracle"],
    },
    devops: {
      label: { es: "Infra & DevOps", en: "Infra & DevOps" },
      items: ["AWS", "Azure", "Docker", "Kubernetes", "Git", "VMware", "VirtualBox"],
    },
    other: {
      label: { es: "Otros", en: "Other" },
      items: [
        { es: "Integración de IA", en: "AI integration" },
        { es: "Excel avanzado", en: "Advanced Excel" },
        { es: "Soporte bilingüe", en: "Bilingual support" },
      ],
    },
  },
  experience: [
    {
      company: "Hamedani",
      role: { es: "Lead Developer", en: "Lead Developer" },
      period: { es: "2024 — Presente", en: "2024 — Present" },
      bullets: {
        es: [
          "Liderazgo técnico del equipo y arquitectura del producto principal.",
          "Resolución de desafíos complejos de concurrencia en transacciones masivas.",
          "Lanzamiento del producto Contarix al mercado dominicano.",
        ],
        en: [
          "Technical leadership of the team and product architecture.",
          "Solved complex concurrency challenges in high-volume transactions.",
          "Shipped Contarix to the Dominican market.",
        ],
      },
    },
    {
      company: "Britzon Tax",
      role: { es: "Software Analyst", en: "Software Analyst" },
      period: { es: "2025 — 2026", en: "2025 — 2026" },
      bullets: {
        es: [
          "Gestión financiera bajo presión durante temporada fiscal.",
          "Auditoría de registros W-2 y EIN para clientes en EE.UU.",
          "Soporte técnico bilingüe (100% inglés) al mercado estadounidense.",
        ],
        en: [
          "Financial operations under tax-season pressure.",
          "Audited W-2 and EIN records for US clients.",
          "Bilingual technical support (100% English) for the US market.",
        ],
      },
    },
    {
      company: "INDOTEL",
      role: { es: "Tech Support", en: "Tech Support" },
      period: { es: "2024 — 2025", en: "2024 — 2025" },
      bullets: {
        es: [
          "Resolución de incidencias de infraestructura.",
          "Análisis operativo y reporte de datos.",
        ],
        en: [
          "Infrastructure incident resolution.",
          "Operational analysis and data reporting.",
        ],
      },
    },
  ],
  education: [
    {
      title: { es: "Desarrollador de Software", en: "Software Developer" },
      org: "ITLA",
      year: "2025",
      kind: "degree",
    },
    {
      title: { es: "Bachillerato Bilingüe", en: "Bilingual High School" },
      org: "New Connection Academy",
      year: "2023",
      kind: "degree",
    },
    {
      title: "JSA — Certified Associate JavaScript Programmer",
      org: { es: "Certificación", en: "Certification" },
      year: "—",
      kind: "cert",
    },
    {
      title: { es: "Estrategias TIC e Innovación Digital", en: "ICT Strategy & Digital Innovation" },
      org: { es: "Certificación", en: "Certification" },
      year: "—",
      kind: "cert",
    },
    {
      title: { es: "Especialista en .NET Core y Java", en: ".NET Core & Java Specialist" },
      org: { es: "Certificación", en: "Certification" },
      year: "—",
      kind: "cert",
    },
    {
      title: { es: "Python Básico", en: "Python Basics" },
      org: { es: "Certificación", en: "Certification" },
      year: "—",
      kind: "cert",
    },
  ],
  projects: [
    {
      id: "contarix",
      name: "Contarix",
      tag: { es: "Producto principal", en: "Flagship product" },
      company: "Hamedani",
      year: "2024",
      category: { es: "Ecosistema POS y Contable", en: "POS & Accounting Ecosystem" },
      arch: { es: "Software de escritorio", en: "Desktop software" },
      stack: ["React", "Node.js", "PostgreSQL", "Electron", "Grok API"],
      description: {
        es: "Ecosistema POS y contable para minoristas. Gestiona transacciones masivas, controla inventario en tiempo real e integra IA para categorización automática de productos.",
        en: "POS and accounting ecosystem for retail. Handles high-volume transactions, real-time inventory and integrates AI for automatic product categorization.",
      },
      features: {
        es: [
          "Gestión transaccional de alto volumen",
          "Inventario en tiempo real para colmados",
          "IA (Grok) para categorización automática",
          "Optimización de flujos operativos",
        ],
        en: [
          "High-volume transactional management",
          "Real-time inventory for retail stores",
          "AI (Grok) for automatic categorization",
          "Operational flow optimization",
        ],
      },
      links: {
        github: "https://github.com/DavidOvalles-Dev",
        youtube: "https://www.youtube.com/embed/3jsWuOMZG4A",
      },
      accent: "amber",
    },
    {
      id: "salones",
      name: { es: "Sistema de Gestión para Salones", en: "Salon Management System" },
      tag: { es: "Plataforma de servicios", en: "Service platform" },
      year: "2024",
      category: { es: "Flujo de Clientes y Ventas", en: "Customer Flow & Sales" },
      arch: { es: "Aplicación web", en: "Web application" },
      stack: ["React", "Node.js", "SQL Server"],
      description: {
        es: "Plataforma para salones de belleza con gestión de estados en vivo: registro, espera, atención. Asigna servicios dinámicamente por empleado y factura al cierre.",
        en: "Beauty salon platform with live state management: registration, waiting, service. Dynamically assigns services per employee and bills at close.",
      },
      features: {
        es: [
          "Estados en vivo (registro · espera · atención)",
          "Asignación dinámica de servicios por empleado",
          "Catálogo de servicios (corte, lavado, etc.)",
          "Facturación integrada",
        ],
        en: [
          "Live states (registration · waiting · service)",
          "Dynamic service assignment per employee",
          "Service catalog (cut, wash, etc.)",
          "Integrated billing",
        ],
      },
      links: {
        github: "https://github.com/DavidOvalles-Dev",
      },
      image: "uploads/SistemaSalonPrev.png",
      accent: "violet",
    },
    {
      id: "jeancarlos",
      name: "Jean Carlos · La Estampa",
      tag: { es: "Sitio web de atleta", en: "Athlete website" },
      year: "2025",
      category: { es: "Diseño & Marca Personal", en: "Design & Personal Brand" },
      arch: { es: "Página web", en: "Web page" },
      stack: ["HTML", "CSS", "JavaScript"],
      description: {
        es: "Página web de presentación para Jean Carlos, pelotero dominicano con proyección profesional. Diseño impactante centrado en la marca personal del atleta: galería, perfil, trayectoria y llamada a la acción para equipos y scouts.",
        en: "Promotional website for Jean Carlos, a Dominican baseball player with professional prospects. Bold design focused on the athlete's personal brand: gallery, profile, career stats and a call-to-action for teams and scouts.",
      },
      features: {
        es: [
          "Diseño visual de alto impacto centrado en el atleta",
          "Galería fotográfica y perfil del pelotero",
          "Trayectoria y estadísticas destacadas",
          "Contacto directo para equipos y scouts",
        ],
        en: [
          "High-impact visual design centered on the athlete",
          "Photo gallery and player profile",
          "Career highlights and stats",
          "Direct contact for teams and scouts",
        ],
      },
      links: {
        live: "https://davidovalles-dev.github.io/jean-carlos-laestampa/",
      },
      image: "uploads/JeanCarlosWebPreview.png",
      accent: "amber",
    },
    {
      id: "hotel",
      name: { es: "Gestión de Reservas Hoteleras", en: "Hotel Reservation System" },
      tag: { es: "Hotel Management System", en: "Hotel Management System" },
      year: "2023",
      category: "HMS",
      arch: { es: "Aplicación web", en: "Web application" },
      stack: ["React", "Node.js", "SQL Server", "Bootstrap"],
      description: {
        es: "Sistema de administración hotelera con control de disponibilidad de habitaciones, gestión de activos e integración con pasarelas de pago.",
        en: "Hotel administration system with room availability control, asset management and payment gateway integration.",
      },
      features: {
        es: [
          "Control de disponibilidad de habitaciones",
          "Administración de activos del hotel",
          "Pasarelas de pago integradas",
          "Reservas online",
        ],
        en: [
          "Room availability control",
          "Hotel asset management",
          "Integrated payment gateways",
          "Online reservations",
        ],
      },
      links: {
        github: "https://github.com/DavidOvalles-Dev",
      },
      image: "uploads/GestionReservasPrev.png",
      accent: "cyan",
    },
  ],
  ui: {
    nav: {
      about: { es: "Sobre mí", en: "About" },
      stack: { es: "Stack", en: "Stack" },
      experience: { es: "Experiencia", en: "Experience" },
      education: { es: "Educación", en: "Education" },
      projects: { es: "Proyectos", en: "Projects" },
      contact: { es: "Contacto", en: "Contact" },
    },
    hero: {
      kicker: { es: "Portafolio · 2026", en: "Portfolio · 2026" },
      scroll: { es: "Desplázate para explorar", en: "Scroll to explore" },
    },
    sections: {
      about: { es: "Sobre mí", en: "About" },
      stack: { es: "Stack tecnológico", en: "Tech stack" },
      experience: { es: "Experiencia", en: "Experience" },
      education: { es: "Educación & credenciales", en: "Education & credentials" },
      projects: { es: "Proyectos destacados", en: "Selected projects" },
      contact: { es: "Hablemos", en: "Let's talk" },
    },
    contact: {
      title: {
        es: "¿Tienes un proyecto?",
        en: "Got a project?",
      },
      subtitle: {
        es: "Trabajo con startups y empresas que necesitan llevar producto a producción.",
        en: "I work with startups and teams that need to ship product to production.",
      },
      cta: { es: "Escríbeme", en: "Get in touch" },
    },
    loading: { es: "Cargando portafolio", en: "Loading portfolio" },
    viewCode: { es: "Ver código", en: "View code" },
    watchDemo: { es: "Ver demo", en: "Watch demo" },
    viewSite: { es: "Ver sitio", en: "View site" },
  },
};
