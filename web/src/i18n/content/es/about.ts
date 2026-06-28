import type { LocaleContentModule } from "@/lib/i18n/content/types";

export const about: LocaleContentModule["about"] = {
  stats: [
    { label: "Entrega de software en producción" },
    { label: "Infraestructura de pagos cripto" },
    { label: "Arquitectura de marketplaces" },
    { label: "Sistemas de automatización" },
    { label: "Plataformas web multilingües" },
    { label: "Ingeniería respaldada por portfolio" },
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
      desc: "Aplicaciones web modernas con APIs, dashboards y rendimiento para crecer.",
      bullets: ["Next.js y React", "Paneles de administración", "Diseño de API", "Despliegue en la nube"],
    },
    {
      id: "mobile",
      title: "Desarrollo de apps móviles",
      desc: "Apps nativas y multiplataforma con UX pulida y backends fiables.",
      bullets: ["iOS y Android", "React Native", "Notificaciones push", "Lanzamiento en App Store"],
    },
    {
      id: "ai-automation",
      title: "Automatización con IA",
      desc: "Automatización de flujos, agentes inteligentes y operaciones continuas.",
      bullets: ["Workflows n8n", "Agentes OpenAI", "Automatización CRM", "Mapeo de procesos"],
    },
    {
      id: "marketplace",
      title: "Desarrollo de marketplaces",
      desc: "Plataformas multi-vendedor con pujas, depósito en garantía y dashboards de proveedores.",
      bullets: ["Onboarding de vendedores", "Pagos en depósito", "Motor de pujas", "Analítica admin"],
    },
    {
      id: "telegram",
      title: "Bots de Telegram",
      desc: "Bots de ventas, soporte y comunidad en Telegram y Discord.",
      bullets: ["Automatización de ventas", "Herramientas de comunidad", "Integraciones API", "Paneles admin"],
    },
    {
      id: "saas",
      title: "Plataformas SaaS",
      desc: "Productos por suscripción con auth, facturación y arquitectura multi-tenant.",
      bullets: ["Facturación Stripe", "Roles de usuario", "Multi-tenant", "Infra escalable"],
    },
    {
      id: "uiux",
      title: "Diseño UI/UX",
      desc: "Diseño de producto, design systems y prototipos orientados a conversión.",
      bullets: ["Diseño Figma", "Design systems", "Investigación de usuarios", "Handoff a desarrollo"],
    },
    {
      id: "seo",
      title: "SEO y crecimiento",
      desc: "SEO técnico, estrategia de contenido y crecimiento orientado a conversión.",
      bullets: ["Auditorías técnicas", "Core Web Vitals", "Estrategia de contenido", "Analítica"],
    },
  ],
  process: [
    { title: "Consulta", desc: "Definimos objetivos, presupuesto y plazos con nuestro equipo." },
    { title: "Competencia de proveedores", desc: "Proveedores verificados envían ofertas competitivas." },
    { title: "Planificación", desc: "Definimos hitos y condiciones con depósito en garantía." },
    { title: "Desarrollo", desc: "Construcción en sprints con progreso transparente." },
    { title: "Lanzamiento", desc: "Despliegue, pruebas y entrega con documentación." },
    { title: "Soporte y crecimiento", desc: "Escala con optimización y soporte continuo." },
  ],
  platformModules: [
    { label: "Marketplace" },
    { label: "Shopify" },
    { label: "Web Apps" },
    { label: "Mobile Apps" },
    { label: "AI" },
    { label: "Automation" },
    { label: "Cloud Solutions" },
  ],
  heroFloatIcons: [
    { label: "Shopify" },
    { label: "AI" },
    { label: "Web" },
    { label: "Mobile" },
    { label: "Automation" },
  ],
};
