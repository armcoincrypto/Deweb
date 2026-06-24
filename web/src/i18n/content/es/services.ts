import type { LocaleContentModule } from "@/lib/i18n/content/types";

export const services: LocaleContentModule["services"] = {
  websites: {
    title: "Sitios web",
    desc: "Sitios corporativos, landing pages y aplicaciones web con stacks modernos.",
    timeline: "2–8 semanas",
    price: "Desde $400",
    overview:
      "Construimos sitios web rápidos y responsivos que convierten visitantes en clientes — desde landing pages sencillas hasta portales corporativos completos.",
    offering:
      "Diseño personalizado, desarrollo, configuración de CMS, orientación de hosting y soporte de lanzamiento con entrega por hitos.",
    meaning:
      "Un sitio web profesional es su escaparate digital: genera confianza, explica su valor y atrae leads las 24 horas.",
    includes: [
      "Interfaz responsiva para todos los dispositivos",
      "Estructura SEO y metaetiquetas listas",
      "Formularios de contacto y configuración de analítica",
      "CMS o panel de administración (si se necesita)",
      "Optimización de rendimiento",
      "Soporte post-lanzamiento de 30 días",
    ],
    deliverables: ["Diseños en Figma", "Sitio web en producción", "Documentación", "Sesión de formación"],
  },
  ecommerce: {
    title: "Desarrollo Shopify",
    desc: "Shopify Plus, temas personalizados y tiendas optimizadas para la conversión.",
    timeline: "4–12 semanas",
    price: "Desde $500",
    overview:
      "Tiendas online completas con catálogos de productos, checkout seguro, gestión de inventario y optimización de conversión.",
    offering:
      "Selección de plataforma, diseño de tienda, integración de pagos, configuración de envíos y páginas de producto listas para marketing.",
    meaning:
      "El comercio electrónico le permite vender productos globalmente con pagos automatizados, seguimiento de pedidos e inventario escalable.",
    includes: [
      "Catálogo de productos y categorías",
      "Pagos Stripe / PayPal / cripto",
      "Carrito y flujo de checkout",
      "Panel de gestión de pedidos",
      "Notificaciones por correo",
      "Experiencia de compra optimizada para móvil",
    ],
    deliverables: ["Diseño de tienda", "Tienda en vivo", "Formación de administración", "Guía de configuración de pagos"],
  },
  ai: {
    title: "Chatbots y automatización con IA",
    desc: "Agentes de IA, chatbots, flujos de trabajo, sincronización CRM y operaciones inteligentes.",
    timeline: "2–6 semanas",
    price: "Desde $300",
    overview:
      "Automatización inteligente que ahorra horas — agentes de IA, flujos inteligentes e integraciones CRM adaptadas a su negocio.",
    offering:
      "Detección de tareas repetitivas, diseño de agentes de IA personalizados, automatización de flujos y optimización continua.",
    meaning:
      "La automatización con IA sustituye el trabajo manual por sistemas inteligentes que aprenden, se adaptan y escalan con sus operaciones.",
    includes: [
      "Análisis de tareas y mapa de automatización",
      "Agente de IA o chatbot personalizado",
      "Integraciones CRM / herramientas",
      "Disparadores y alertas de flujos",
      "Panel de monitorización",
      "Documentación y traspaso",
    ],
    deliverables: ["Plan de automatización", "Sistema de IA en vivo", "Configuración de integraciones", "Guía de soporte"],
  },
  bots: {
    title: "Bots",
    desc: "Bots de Telegram, Discord y soporte con integraciones.",
    timeline: "1–4 semanas",
    price: "Desde $300",
    overview:
      "Bots personalizados para Telegram, Discord y chat web que gestionan soporte, notificaciones y engagement de usuarios.",
    offering:
      "Diseño de bots, integraciones API, paneles de administración y despliegue en su plataforma de mensajería preferida.",
    meaning:
      "Los bots ofrecen respuestas instantáneas 24/7, automatizan el soporte al cliente y mantienen activa su comunidad.",
    includes: [
      "Lógica y comandos personalizados del bot",
      "Integraciones API y bases de datos",
      "Panel de control de administración",
      "Soporte multilingüe",
      "Analítica y registro",
      "Hosting y despliegue",
    ],
    deliverables: ["Bot funcional", "Panel de administración", "Código fuente", "Documentación de configuración"],
  },
  saas: {
    title: "SaaS",
    desc: "Plataformas multi-tenant, paneles y facturación por suscripción.",
    timeline: "8–20 semanas",
    price: "Desde $1000",
    overview:
      "Productos SaaS completos con autenticación de usuarios, facturación por suscripción, paneles de administración y arquitectura escalable.",
    offering:
      "De MVP a SaaS en producción — desde diseño de arquitectura hasta pagos por suscripción y gestión de usuarios.",
    meaning:
      "El SaaS convierte su idea de software en un negocio de ingresos recurrentes con facturación automatizada y gestión de usuarios.",
    includes: [
      "Autenticación de usuarios y roles",
      "Facturación por suscripción (Stripe)",
      "Paneles de administración y usuario",
      "Arquitectura multi-tenant",
      "Diseño y documentación de API",
      "Despliegue y configuración de escalado",
    ],
    deliverables: ["Producto MVP", "Panel de administración", "Documentación de API", "Pipeline de despliegue"],
  },
  mobile: {
    title: "Aplicaciones móviles",
    desc: "Desarrollo de productos iOS, Android y multiplataforma.",
    timeline: "6–16 semanas",
    price: "Desde $1000",
    overview:
      "Aplicaciones móviles nativas y multiplataforma para iOS y Android con UX pulida e integración de backend.",
    offering:
      "Diseño UI/UX, desarrollo, envío a App Store / Play Store e integración de API de backend.",
    meaning:
      "Las apps móviles ponen su producto en el bolsillo del usuario — habilitando notificaciones push, acceso offline y engagement en movimiento.",
    includes: [
      "Builds iOS y Android",
      "Notificaciones push",
      "Integración de API de backend",
      "Envío a App Store",
      "Analítica e informes de fallos",
      "Actualizaciones post-lanzamiento (30 días)",
    ],
    deliverables: ["Diseños de app", "App publicada", "Código fuente", "Assets para tiendas"],
  },
  uiux: {
    title: "UI/UX",
    desc: "Diseño de producto, sistemas de diseño y prototipos de alta fidelidad.",
    timeline: "2–8 semanas",
    price: "Desde $400",
    overview:
      "Diseño centrado en el usuario que hace los productos intuitivos, atractivos y orientados a la conversión.",
    offering:
      "Investigación de usuarios, wireframes, prototipos de alta fidelidad, sistemas de diseño y entrega a desarrollo.",
    meaning:
      "Un gran UI/UX reduce la fricción, aumenta las conversiones y hace que los usuarios amen su producto desde el primer clic.",
    includes: [
      "Investigación de usuarios y personas",
      "Wireframes y flujos de usuario",
      "Diseños de alta fidelidad en Figma",
      "Prototipos interactivos",
      "Sistema de diseño y componentes",
      "Especificaciones de entrega a desarrollo",
    ],
    deliverables: ["Archivo Figma", "Enlace al prototipo", "Sistema de diseño", "Documentación de entrega"],
  },
  branding: {
    title: "Branding",
    desc: "Identidad, logotipos y guías de marca para productos digitales.",
    timeline: "2–6 semanas",
    price: "Desde $400",
    overview:
      "Identidad de marca completa — logotipo, colores, tipografía y guías que hacen memorable su negocio.",
    offering:
      "Estrategia de marca, diseño de logotipo, identidad visual, manual de marca y plantillas para redes sociales.",
    meaning:
      "Un branding sólido crea reconocimiento y confianza — cuenta su historia antes de que usted diga una palabra.",
    includes: [
      "Diseño de logotipo (varios conceptos)",
      "Paleta de colores y tipografía",
      "Documento de guías de marca",
      "Plantillas para redes sociales",
      "Tarjeta de visita y membrete",
      "Biblioteca de activos de marca",
    ],
    deliverables: ["Archivos de logotipo", "Manual de marca PDF", "Pack de plantillas", "Biblioteca de activos"],
  },
  seo: {
    title: "SEO",
    desc: "SEO técnico, estrategia de contenido y optimización de crecimiento.",
    timeline: "Continuo",
    price: "Desde $400",
    overview:
      "SEO basado en datos que mejora posiciones, impulsa tráfico orgánico y aumenta su visibilidad online.",
    offering:
      "Auditoría técnica, estrategia de palabras clave, optimización on-page, plan de contenido e informes mensuales.",
    meaning:
      "El SEO asegura que sus clientes objetivo le encuentren en Google — convirtiendo búsquedas en leads y ventas.",
    includes: [
      "Auditoría SEO técnica",
      "Investigación y estrategia de palabras clave",
      "Optimización on-page",
      "Calendario de contenido",
      "Estrategia de backlinks",
      "Informes mensuales de rendimiento",
    ],
    deliverables: ["Informe de auditoría SEO", "Mapa de palabras clave", "Páginas optimizadas", "Analítica mensual"],
  },
  marketing: {
    title: "Marketing",
    desc: "Anuncios de pago, embudos, email y campañas orientadas a la conversión.",
    timeline: "Continuo",
    price: "Desde $600",
    overview:
      "Campañas de marketing de rendimiento que generan leads, ventas y ROI medible en todos los canales.",
    offering:
      "Estrategia de anuncios, producción creativa, configuración de embudos, pruebas A/B y optimización de conversión.",
    meaning:
      "El marketing convierte la atención en ingresos — llegando a la audiencia correcta con el mensaje adecuado en el momento oportuno.",
    includes: [
      "Estrategia y configuración de campañas",
      "Producción creativa de anuncios",
      "Optimización de landing pages",
      "Secuencias de email marketing",
      "Pruebas A/B y analítica",
      "Informes semanales de rendimiento",
    ],
    deliverables: ["Plan de campaña", "Creatividades de anuncios", "Configuración de embudo", "Panel de rendimiento"],
  },
};
