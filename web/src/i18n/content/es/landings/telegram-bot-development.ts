import type { LandingTexts } from "@/lib/i18n/content/types";

export const telegramBotDevelopment: LandingTexts = {
  h1: "Servicios de desarrollo de bots de Telegram",
  subtitle:
    "Construya bots de Telegram, Mini Apps, flujos de pago, integraciones CRM y asistentes con IA que automaticen soporte, ventas y operaciones.",
  heroBadge: "Automatización en mensajería",
  priceRange: "Desde $300",
  intro: [
    "Telegram es una de las formas más rápidas de llegar a clientes donde ya se comunican. Un bot de Telegram bien construido puede responder preguntas al instante, capturar leads, procesar pedidos y derivar casos complejos a su equipo sin obligar a los usuarios a instalar otra aplicación. Nuestros servicios de desarrollo de bots de Telegram se centran en resultados empresariales prácticos: tiempos de respuesta más rápidos, traspasos más limpios y automatización en la que su equipo de operaciones puede confiar en producción.",
    "Los bots profesionales de Telegram son más que respuestas predefinidas. Requieren arquitectura de webhooks fiable, manejo seguro de tokens, flujos conversacionales estructurados e integraciones con los sistemas que ya utiliza: CRM, ecommerce, APIs internas y proveedores de pago. Diseñamos bots con la Telegram Bot API oficial y backends mantenibles en Node.js o Python, para que su producto pueda escalar a medida que crecen el volumen de mensajes y el alcance funcional.",
    "Ya sea que necesite un asistente de soporte al cliente, un bot de calificación comercial, una tienda con pagos habilitados o una experiencia Telegram Mini App, DEWEB entrega de extremo a extremo: descubrimiento, flujos UX, ingeniería, despliegue y soporte post-lanzamiento. Puede trabajar directamente con nuestro equipo de agencia o publicar su proyecto en DEWEB Marketplace para comparar propuestas de desarrolladores de bots verificados.",
  ],
  sections: [
    {
      title: "Qué construimos para Telegram",
      paragraphs: [
        "Desarrollamos bots de Telegram para soporte, ventas, operaciones y gestión de comunidades. Los desarrollos habituales incluyen bots de FAQ y enrutamiento de tickets, flujos de captura de leads con calificación estructurada, bots de notificación conectados a su producto o back office, y bots de flujo de trabajo admin que ayudan a equipos internos a aprobar solicitudes o monitorizar actividad. Cada proyecto comienza con recorridos de usuario claros para que la automatización reduzca el trabajo manual en lugar de generar confusión.",
        "Para ecommerce y negocios de servicios, también construimos bots de pago y pedidos, flujos de suscripción y experiencias de navegación de catálogo dentro de Telegram. Cuando se necesita una interfaz más rica, implementamos Telegram Mini Apps que combinan puntos de entrada conversacionales con componentes de UI web completos. El alcance se adapta a su embudo, desde MVPs ligeros hasta plataformas multi-módulo con analítica y paneles admin.",
      ],
    },
    {
      title: "Arquitectura de la Telegram Bot API",
      paragraphs: [
        "Los bots de Telegram en producción necesitan procesamiento asíncrono, seguridad de webhooks y manejo predecible de errores. Configuramos webhooks con endpoints HTTPS, validamos payloads de actualizaciones y encolamos trabajo pesado para que su bot permanezca ágil bajo carga. Los servicios backend se estructuran para manejo idempotente de mensajes, lógica de reintentos y registro claro cuando fallan APIs de terceros o aplican límites de tasa.",
        "Elegimos stacks como Node.js con grammY o Telegraf, o Python con aiogram, según su infraestructura existente y requisitos de integración. El diseño de base de datos cubre estado de usuario, contexto conversacional, permisos y trazas de auditoría. Esta base facilita añadir funciones después — nuevos comandos, campañas de broadcast o herramientas admin basadas en roles — sin reconstruir el núcleo del bot.",
      ],
    },
    {
      title: "Pagos, suscripciones y flujos de checkout",
      paragraphs: [
        "Telegram soporta experiencias de pago mediante integraciones con proveedores y flujos de checkout estructurados. Implementamos bots de pago que presentan productos o planes, generan facturas y confirman transacciones exitosas mediante manejo seguro de webhooks. Los modelos de suscripción y membresía pueden respaldarse cuando su proveedor y reglas de negocio permiten facturación recurrente dentro del recorrido del bot.",
        "Los flujos de pago se diseñan con pasos claros de confirmación para el usuario, recuperación de errores y visibilidad para administradores. Conectamos eventos de pedido con su proceso de fulfillment, ya sea entrega digital, actualizaciones de CRM o notificaciones al personal de operaciones. Si ya utiliza Stripe o proveedores similares en la web, evaluamos cómo esos sistemas pueden alinearse con los requisitos de pago de Telegram para su mercado y caso de uso.",
      ],
    },
    {
      title: "Integraciones con CRM, sitio web y backend",
      paragraphs: [
        "Los bots aportan más valor cuando se sincronizan con sus sistemas de negocio. Integramos bots de Telegram con plataformas CRM, herramientas de helpdesk, backends de ecommerce y APIs personalizadas para que las conversaciones generen registros estructurados en lugar de logs de chat aislados. Datos de leads, tickets de soporte, estado de pedidos y atributos de usuario pueden fluir automáticamente entre Telegram y sus sistemas fuente de verdad.",
        "Las integraciones con sitio web y producto permiten que los usuarios comiencen en su sitio y continúen en Telegram, o viceversa. Enlaces profundos, sesiones autenticadas y sincronización de eventos basada en webhooks mantienen experiencias consistentes entre canales. Para equipos que necesitan herramientas internas, construimos paneles admin o dashboards ligeros para gestionar contenido del bot, monitorizar conversaciones y ajustar reglas de automatización sin redesplegar código por cada cambio de copy.",
      ],
    },
    {
      title: "Telegram Mini Apps y experiencias web",
      paragraphs: [
        "Las Telegram Mini Apps (Web Apps) le permiten ofrecer interfaces tipo app dentro de Telegram — formularios, catálogos, flujos de reserva o áreas de cuenta — manteniendo Telegram como punto de entrada. Diseñamos Mini Apps cuando los menús conversacionales por sí solos no son suficientes para la tarea, especialmente para ecommerce, onboarding o interacciones con muchos datos que se benefician de una UI más rica.",
        "Los proyectos Mini App incluyen implementación frontend, comunicación segura con su API y alineación con eventos del ciclo de vida de Telegram Web App. Planificamos autenticación, manejo de sesiones y diseño mobile-first para que la experiencia se sienta nativa dentro de clientes de Telegram. Este enfoque es útil cuando desea menor fricción que una app móvil independiente pero más capacidad que un bot solo de texto.",
      ],
    },
    {
      title: "Seguridad, fiabilidad y operaciones",
      paragraphs: [
        "Los tokens de bot, datos de usuario y eventos de pago requieren prácticas de seguridad disciplinadas. Almacenamos secretos de forma segura, restringimos comandos admin, validamos webhooks entrantes y aplicamos limitación de tasa donde sea necesario. El control de acceso separa flujos públicos de usuario de herramientas de operador, y las acciones sensibles pueden requerir verificación adicional o aprobación humana.",
        "La fiabilidad operativa incluye monitorización, alertas, rutinas de respaldo y prácticas de despliegue que soportan actualizaciones sin tiempo de inactividad. Documentamos requisitos de hosting, consideraciones de escalado y pasos de respuesta a incidentes para que su equipo entienda cómo funciona el bot tras el lanzamiento. Para necesidades continuas, ofrecemos opciones de mantenimiento que cubren actualizaciones de dependencias, cambios de la Telegram API e iteraciones de funcionalidades.",
      ],
    },
    {
      title: "Asistentes de Telegram con IA",
      paragraphs: [
        "Muchos equipos quieren bots de Telegram que combinen flujos estructurados con respuestas generadas por IA. Construimos asistentes que usan respuestas fundamentadas por recuperación, guardrails de políticas y escalación humana cuando la confianza es baja. Esto es ideal para bots de soporte que deben referenciar documentación de producto, políticas internas o datos dinámicos de catálogo manteniéndose dentro de límites aprobados.",
        "Los bots de Telegram con IA se definen por separado de chatbots genéricos cuando importan la calidad conversacional y la profundidad de integración. Si su necesidad principal es soporte con IA multicanal, nuestro servicio de desarrollo de chatbots con IA también puede aplicar; para automatización nativa de Telegram con comandos, pagos y Mini Apps, esta vía dedicada de ingeniería de bots suele ser la mejor opción. Le ayudamos a elegir la arquitectura correcta antes de que comience el desarrollo.",
      ],
    },
    {
      title: "Entrega de agencia y contratación en marketplace",
      paragraphs: [
        "DEWEB ofrece dos vías para proyectos de bots de Telegram. Puede solicitar una propuesta acotada de nuestro equipo de entrega para ingeniería de bots de extremo a extremo, o publicar requisitos en DEWEB Marketplace para comparar especialistas con experiencia relevante en Telegram y backend. Los listados de marketplace funcionan bien cuando tiene un brief definido, rango de presupuesto y cronograma; la entrega de agencia encaja con integraciones complejas, Mini Apps y hojas de ruta multi-fase.",
        "Ambas vías usan los mismos estándares de calidad para claridad y comunicación técnica. Los briefs sólidos describen usuarios objetivo, flujos centrales, integraciones, idiomas y métricas de éxito. Ya sea que contrate a través del marketplace o contacte a DEWEB directamente, requisitos claros conducen a estimaciones más rápidas y mejor alineación de implementación.",
      ],
    },
  ],
  benefits: [
    {
      icon: "💬",
      title: "Respuesta al cliente 24/7",
      description:
        "Automatice respuestas, enrutamiento y notificaciones para que los clientes reciban ayuda inmediata en Telegram.",
    },
    {
      icon: "🎯",
      title: "Captura de leads en el chat",
      description:
        "Los flujos de calificación estructurada convierten conversaciones en leads listos para CRM y tareas de seguimiento.",
    },
    {
      icon: "💳",
      title: "Pagos dentro de Telegram",
      description:
        "Soporte para catálogos de productos, facturas y flujos de checkout alineados con su configuración de pago.",
    },
    {
      icon: "🔗",
      title: "Conectado a su stack",
      description:
        "Integre CRM, sitios web, APIs y herramientas internas para que la actividad del bot alimente operaciones reales.",
    },
    {
      icon: "📱",
      title: "Experiencias Mini App",
      description:
        "Lance interfaces Telegram Web App más ricas cuando menús y texto por sí solos no son suficientes.",
    },
    {
      icon: "🛡️",
      title: "Operaciones listas para producción",
      description:
        "Webhooks seguros, logging y backends mantenibles construidos para tráfico real y actualizaciones.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Descubrimiento y diseño de flujos",
      description:
        "Mapeamos recorridos de usuario, definimos comandos y pantallas del bot, y confirmamos integraciones, idiomas y métricas de éxito antes de que comience el desarrollo.",
    },
    {
      step: 2,
      title: "Arquitectura y prototipado",
      description:
        "Planificamos infraestructura de webhooks, modelos de datos y límites de seguridad, luego validamos flujos críticos con prototipos clicables o scriptados.",
    },
    {
      step: 3,
      title: "Desarrollo e integraciones",
      description:
        "Implementamos lógica del bot, herramientas admin, conexiones CRM o de pago e interfaces Mini App con pruebas estructuradas en cada hito.",
    },
    {
      step: 4,
      title: "QA, revisión de seguridad y lanzamiento",
      description:
        "Probamos casos límite, rutas de pago y manejo de fallos, luego desplegamos en producción con monitorización y documentación de traspaso.",
    },
    {
      step: 5,
      title: "Soporte e iteración",
      description:
        "Le ayudamos a monitorizar uso, corregir incidencias y planificar expansiones de funcionalidades como broadcasts, nuevos idiomas o automatización avanzada.",
    },
  ],
  faqs: [
    {
      question: "¿Qué es el desarrollo de bots de Telegram?",
      answer:
        "El desarrollo de bots de Telegram es el proceso de diseñar, construir y desplegar software que interactúa con usuarios a través de la Telegram Bot API, incluyendo comandos, menús, pagos, integraciones y Mini Apps opcionales.",
    },
    {
      question: "¿Puede DEWEB construir Telegram Mini Apps?",
      answer:
        "Sí. Desarrollamos Telegram Mini Apps cuando su proyecto necesita una UI más rica que un bot basado en texto, como catálogos, formularios, flujos de reserva o áreas de cuenta dentro de Telegram.",
    },
    {
      question: "¿Puede un bot de Telegram aceptar pagos?",
      answer:
        "En muchos casos, sí. Implementamos flujos de pago usando mecanismos de pago soportados por Telegram y proveedores compatibles, con manejo seguro de webhooks y pasos de confirmación de pedido.",
    },
    {
      question: "¿Puede un bot conectarse con mi CRM o sitio web?",
      answer:
        "Sí. Integramos bots con sistemas CRM, sitios web, plataformas de ecommerce y APIs personalizadas para que las conversaciones se sincronicen con sus herramientas de negocio existentes.",
    },
    {
      question: "¿Pueden construir bots de Telegram con IA?",
      answer:
        "Sí. Construimos asistentes que combinan flujos de Telegram con IA basada en recuperación, guardrails y escalación humana. También ofrecemos desarrollo dedicado de chatbots con IA para necesidades multicanal más amplias.",
    },
    {
      question: "¿Cuánto tarda el desarrollo de un bot de Telegram?",
      answer:
        "Los bots simples suelen tomar de una a tres semanas. Los bots con pagos, integraciones CRM, paneles admin o Mini Apps suelen tomar de tres a ocho semanas según el alcance.",
    },
    {
      question: "¿Dan soporte a bots existentes?",
      answer:
        "Sí. Podemos auditar, refactorizar o ampliar bots de Telegram existentes, mejorar fiabilidad, añadir integraciones y migrar hosting o configuraciones de webhook.",
    },
    {
      question: "¿Puedo contratar desarrolladores de bots de Telegram a través del marketplace?",
      answer:
        "Sí. Puede publicar su proyecto de bot de Telegram en DEWEB Marketplace para recibir propuestas de especialistas, o contactar a DEWEB para entrega liderada por agencia.",
    },
  ],
  relatedServices: [
    {
      slug: "ai-chatbot-development",
      title: "Desarrollo de chatbots con IA",
      description:
        "Construya asistentes con IA multicanal con recuperación, guardrails y flujos conectados al CRM.",
    },
    {
      slug: "ai-business-automation",
      title: "Automatización empresarial con IA",
      description:
        "Automatice operaciones con flujos de IA en soporte, ventas, finanzas y equipos internos.",
    },
    {
      slug: "marketplace-development",
      title: "Desarrollo de marketplaces",
      description:
        "Ingeniería de plataformas de dos lados con arquitectura de mensajería, pujas y pagos.",
    },
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Desarrolle APIs, paneles admin y backends que impulsen experiencias de bots y Mini Apps.",
    },
  ],
  cta: {
    title: "¿Listo para construir su bot de Telegram?",
    description:
      "Cuéntenos sobre sus flujos, integraciones y cronograma, o publique su proyecto en DEWEB Marketplace para comparar propuestas de desarrolladores.",
    primaryLabel: "Solicitar consulta gratuita",
    primaryHref: "/contact",
    secondaryLabel: "Publicar un proyecto en DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
};
