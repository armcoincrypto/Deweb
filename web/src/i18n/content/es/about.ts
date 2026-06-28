import type { LocaleContentModule } from "@/lib/i18n/content/types";

export const about: LocaleContentModule["about"] = {
  stats: [
    { label: "Experiencia en desarrollo a medida" },
    { label: "Web, mobile, IA y automatización" },
    { label: "Entrega EN · ES · RU · AM" },
    { label: "Modelo de pujas de proveedores" },
    { label: "Soporte post-lanzamiento" },
    { label: "Condiciones estructuradas con escrow" },
  ],
  services: [
    {
      id: "shopify",
      title: "Desarrollo Shopify",
      desc: "Tiendas Shopify de alta conversión, migraciones Plus y experiencias de comercio personalizadas diseñadas para escalar.",
      bullets: [
        "Shopify Plus y temas personalizados",
        "Optimización de velocidad y CRO",
        "Integraciones de pago y envío",
        "Automatización de inventario y fulfillment",
      ],
    },
    {
      id: "ai-chatbots",
      title: "Chatbots de IA",
      desc: "Asistentes inteligentes que califican leads, atienden clientes e integran su stack 24/7.",
      bullets: ["Calificación de leads", "Sincronización CRM", "Soporte multilingüe", "Entrenamiento personalizado"],
    },
    {
      id: "web-apps",
      title: "Aplicaciones web a medida",
      desc: "Aplicaciones web modernas con APIs, paneles y rendimiento diseñado para crecer.",
      bullets: ["Next.js y React", "Paneles de administración", "Diseño de APIs", "Despliegue en la nube"],
    },
    {
      id: "mobile",
      title: "Desarrollo de aplicaciones móviles",
      desc: "Apps nativas y multiplataforma con UX pulida y backends fiables.",
      bullets: ["iOS y Android", "React Native", "Notificaciones push", "Lanzamiento en App Store"],
    },
    {
      id: "ai-automation",
      title: "Automatización con IA",
      desc: "Automatización de flujos de trabajo, agentes inteligentes y operaciones que funcionan mientras usted descansa.",
      bullets: ["Flujos n8n", "Agentes OpenAI", "Automatización CRM", "Mapeo de procesos"],
    },
    {
      id: "marketplace",
      title: "Desarrollo de marketplaces",
      desc: "Plataformas multi-vendedor con pujas, depósito en garantía y paneles de proveedores.",
      bullets: ["Onboarding de vendedores", "Pagos en depósito", "Motor de pujas", "Analítica de administración"],
    },
    {
      id: "telegram",
      title: "Bots de Telegram",
      desc: "Bots de ventas, soporte y comunidad en Telegram y Discord.",
      bullets: ["Automatización de ventas", "Herramientas de comunidad", "Integraciones API", "Paneles de administración"],
    },
    {
      id: "saas",
      title: "Plataformas SaaS",
      desc: "Productos por suscripción con autenticación, facturación y arquitectura multi-tenant.",
      bullets: ["Facturación Stripe", "Roles de usuario", "Multi-tenant", "Infraestructura escalable"],
    },
    {
      id: "uiux",
      title: "Diseño UI/UX",
      desc: "Diseño de producto, sistemas de diseño y prototipos que convierten.",
      bullets: ["Diseño en Figma", "Sistemas de diseño", "Investigación de usuarios", "Entrega a desarrollo"],
    },
    {
      id: "seo",
      title: "SEO y crecimiento",
      desc: "SEO técnico, estrategia de contenido y crecimiento orientado a la conversión.",
      bullets: ["Auditorías técnicas", "Core Web Vitals", "Estrategia de contenido", "Analítica"],
    },
  ],
  process: [
    { title: "Consulta", desc: "Definimos objetivos, presupuesto y plazos con nuestro equipo." },
    { title: "Competencia de proveedores", desc: "Proveedores verificados envían ofertas competitivas." },
    { title: "Planificación", desc: "Definimos hitos y fijamos términos con depósito en garantía." },
    { title: "Desarrollo", desc: "Construimos en sprints con progreso transparente." },
    { title: "Lanzamiento", desc: "Desplegamos, probamos y entregamos con documentación." },
    { title: "Soporte y crecimiento", desc: "Escalamos con optimización y soporte continuos." },
  ],
  platformModules: [
    { label: "Marketplace" },
    { label: "Shopify" },
    { label: "Aplicaciones web" },
    { label: "Apps móviles" },
    { label: "IA" },
    { label: "Automatización" },
    { label: "Soluciones en la nube" },
  ],
  heroFloatIcons: [
    { label: "Shopify" },
    { label: "IA" },
    { label: "Web" },
    { label: "Móvil" },
    { label: "Automatización" },
  ],
};
