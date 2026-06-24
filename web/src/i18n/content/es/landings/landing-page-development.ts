import type { LandingTexts } from "@/lib/i18n/content/types";

export const landingPageDevelopment: LandingTexts = {
  h1: "Desarrollo de landing pages",
  subtitle:
    "Landing pages de alta conversión para anuncios, lanzamientos y generación de leads — rápidas y mobile-first.",
  heroBadge: "Páginas de conversión",
  priceRange: "Desde $200",
  intro: [
    "Una landing page sólida le da a su campaña un mensaje claro, una oferta enfocada y una acción sencilla para los visitantes.",
    "Construimos landing pages que ayudan a las empresas a convertir tráfico de pago, lanzamientos de producto y promociones en consultas reales en lugar de clics desperdiciados.",
    "Cada página se estructura en torno a la claridad: titular, propuesta de valor, prueba social, beneficios y un CTA fuerte. Diseñamos mobile-first, mantenemos la velocidad de carga alta y facilitamos el formulario o el flujo de reserva.",
  ],
  sections: [
    {
      title: "Qué incluye",
      paragraphs: [
        "Una landing page personalizada con estructura de copy orientada a la conversión, diseño responsivo, integración de formulario de leads, configuración lista para analítica y soporte de lanzamiento.",
      ],
    },
    {
      title: "Ideal para",
      paragraphs: [
        "Empresas que ejecutan anuncios en Google o Meta, lanzan un nuevo servicio, promocionan una oferta limitada o recopilan leads para seguimiento comercial.",
      ],
    },
  ],
  benefits: [
    { icon: "🎯", title: "Enfocada en campañas", description: "Una página, un objetivo, un camino de conversión claro." },
    { icon: "📱", title: "Mobile-first", description: "Diseñada para móviles, donde llega la mayor parte del tráfico de anuncios." },
    { icon: "⚡", title: "Lanzamiento rápido", description: "La mayoría de landing pages se entregan en días, no en semanas." },
    { icon: "📈", title: "Mejor ROI de anuncios", description: "Envíe tráfico a una página diseñada para convertir, no a una homepage genérica." },
    { icon: "🧩", title: "Fácil de actualizar", description: "Estructura sencilla para futuras ofertas y campañas estacionales." },
    { icon: "🔍", title: "Lista para tracking", description: "Preparada para analítica, formularios y medición de campañas." },
  ],
  process: [
    { step: 1, title: "Claridad de la oferta", description: "Definimos audiencia, oferta, CTA y objetivo de la campaña." },
    { step: 2, title: "Estructura de la página", description: "Planificamos secciones, prueba social, flujo del formulario y diseño móvil." },
    { step: 3, title: "Diseño y desarrollo", description: "Creamos la página con visuales premium y carga rápida." },
    { step: 4, title: "Pruebas", description: "Verificamos formularios, UX móvil, velocidad y flujo de conversión." },
    { step: 5, title: "Lanzamiento", description: "Desplegamos y conectamos el tracking para su campaña." },
  ],
  faqs: [
    {
      question: "¿Cuánto cuesta una landing page?",
      answer: "Las landing pages empiezan desde $200. El precio final depende de la complejidad del diseño, número de secciones, integraciones y plazos.",
    },
    {
      question: "¿Qué tan rápido pueden entregar?",
      answer: "Muchas landing pages se completan en 3–10 días según la disponibilidad de contenido y rondas de revisión.",
    },
    {
      question: "¿Pueden diseñar para anuncios?",
      answer: "Sí. Construimos landing pages específicamente para campañas de pago, promociones y embudos de generación de leads.",
    },
    {
      question: "¿Pueden conectar formularios y analítica?",
      answer: "Sí. Podemos conectar formularios de leads, notificaciones por correo, traspaso a CRM y seguimiento analítico.",
    },
  ],
  relatedServices: [
    { slug: "web-application-development", title: "Sitios web empresariales", description: "Sitios corporativos completos con múltiples páginas de servicios." },
    { slug: "shopify-development", title: "Desarrollo Shopify", description: "Tiendas de comercio electrónico diseñadas para vender productos online." },
    { slug: "ai-chatbot-development", title: "Chatbots de IA", description: "Capture y responda leads automáticamente 24/7." },
    { slug: "saas-development", title: "SaaS / Apps web", description: "Productos web escalables y paneles de control." },
  ],
  cta: {
    title: "¿Necesita una landing page que convierta?",
    description: "Cuéntenos sobre su campaña y le propondremos una estructura de página clara, plazos y precio inicial.",
    primaryLabel: "Enviar solicitud de proyecto",
    primaryHref: "/contact",
    secondaryLabel: "Ver todos los servicios",
    secondaryHref: "/services",
  },
};
