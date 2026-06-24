import type { LandingTexts } from "@/lib/i18n/content/types";

export const shopifyDevelopment: LandingTexts = {
  h1: "Servicios de desarrollo Shopify",
  subtitle:
    "Construya, optimice y escale una tienda Shopify que convierta más visitantes en clientes leales.",
  heroBadge: "Ingeniería ecommerce",
  priceRange: "Desde $500",
  intro: [
    "Shopify ofrece a las marcas en crecimiento un excelente motor comercial, pero el crecimiento real exige más que instalar un tema y añadir productos. Las tiendas de alto rendimiento dependen de una arquitectura de información estructurada, integraciones de apps sólidas, renderizado rápido de páginas y un flujo de compra diseñado en torno al comportamiento real del cliente. Nuestro servicio de desarrollo Shopify combina ejecución técnica con estrategia ecommerce para que su tienda sea fiable el día del lanzamiento y lo suficientemente flexible para evolucionar a medida que su catálogo, canales y operaciones se vuelven más complejos.",
    "Empezamos por entender su oferta, objetivos de valor medio del pedido, restricciones de margen, modelo de fulfillment y flujos de trabajo del equipo interno. Ese contexto informa cada decisión de implementación, desde el modelado de variantes y reglas de colecciones hasta disparadores de automatización y diseño de eventos analíticos. En lugar de plantillas genéricas, construimos una base de tienda mantenible con estándares de código claros, bloques de contenido reutilizables y documentación práctica. Su equipo de marketing puede publicar campañas con rapidez mientras su equipo de operaciones confía en que promociones, impuestos y lógica de envío funcionan exactamente como se espera.",
    "Ya sea que migre desde WooCommerce, lance una nueva marca DTC o modernice una configuración legacy lenta de Shopify, gestionamos desde la planificación hasta la optimización post-lanzamiento. Obtiene QA disciplinado, mejoras de UX orientadas a la conversión y una hoja de ruta de implementación vinculada al impacto en ingresos. Nuestros desarrolladores colaboran estrechamente con diseñadores, redactores y equipos de paid media para que las decisiones técnicas respalden objetivos de adquisición y retención. El resultado es una tienda Shopify más rápida, más fácil de gestionar y mejor preparada para un crecimiento online sostenido.",
  ],
  sections: [
    {
      title: "Descubrimiento y planificación comercial",
      paragraphs: [
        "Cada proyecto exitoso comienza con claridad de negocio. Mapeamos sus familias de productos, segmentos de clientes, reglas de suscripción o compra única, alcance de envíos y estrategia promocional antes de iniciar el desarrollo. Esta fase de descubrimiento evita retrabajos costosos y ayuda a priorizar las funciones que más importan para los ingresos. Definimos métricas de éxito prácticas como tasa de conversión por dispositivo, finalización del checkout, valor medio del pedido y velocidad de recompra, y las usamos para guiar el alcance técnico y la secuencia de lanzamientos.",
        "Nuestro equipo traduce esa estrategia en un brief de implementación concreto que cubre colecciones, filtros, plantillas de producto y comportamiento del carrito. Identificamos dependencias de integración desde el principio, incluyendo ERP, CRM, reseñas, soporte y herramientas analíticas, para que las decisiones de arquitectura permanezcan estables durante todo el proyecto. Al final de la planificación, dispone de una hoja de ruta de entrega con hitos, responsables y criterios de aceptación que mantienen alineados a los stakeholders. Esto reduce la ambigüedad y permite decisiones más rápidas cuando surgen compromisos durante el desarrollo y las pruebas.",
      ],
    },
    {
      title: "Arquitectura del tema y rendimiento",
      paragraphs: [
        "La velocidad y la mantenibilidad de la tienda son inseparables. Construimos temas Shopify con secciones modulares, plantillas ligeras y convenciones de nomenclatura predecibles para que su equipo pueda ampliar páginas sin parches frágiles. Los componentes se estructuran para reutilizarse en landing pages, colecciones y campañas, reduciendo el esfuerzo duplicado. También eliminamos scripts innecesarios, optimizamos la carga de assets y gestionamos con cuidado el impacto de apps de terceros para que la calidad visual no comprometa el rendimiento, especialmente en redes móviles.",
        "Nuestro trabajo de rendimiento se centra en resultados prácticos: first contentful paint más rápido, mejor capacidad de respuesta en las interacciones y tendencias más limpias en Core Web Vitals a lo largo del tiempo. Optimizamos la entrega de imágenes, diferimos JavaScript no crítico y simplificamos patrones de CSS que bloquean el renderizado. En lugar de perseguir benchmarks aislados, conectamos las mejoras de velocidad con el comportamiento de conversión y la tasa de rebote por tipo de plantilla. Esto da a su equipo una comprensión clara de qué inversiones en rendimiento producen el mayor retorno comercial.",
      ],
    },
    {
      title: "Datos de producto y estructura del catálogo",
      paragraphs: [
        "La complejidad del catálogo suele ser donde los proyectos Shopify se atascan. Diseñamos estructuras de productos y variantes que soportan merchandising, filtrado e informes sin crear confusión operativa. Metafields, tipos de producto, etiquetas y reglas de colección se organizan en torno a cómo navegan los clientes y cómo su equipo actualiza el inventario. Este enfoque evita listados duplicados, etiquetas de opciones inconsistentes y comportamiento de búsqueda interna roto que puede erosionar la confianza y reducir la intención de compra.",
        "Cuando es necesario, construimos flujos de importación y normalización que limpian los datos de producto existentes antes del lanzamiento. Estandarizamos nombres de imágenes, definiciones de atributos y jerarquías de opciones para que su tienda presente la información de forma coherente en todas las plantillas. Esta consistencia mejora la relevancia SEO, simplifica la gestión de colecciones y ayuda a que el tráfico de pago llegue a páginas que responden rápidamente a las preguntas de compra. Unos cimientos de datos sólidos también facilitan futuras iniciativas de personalización y automatización con menos fallos en casos límite.",
      ],
    },
    {
      title: "Integraciones de apps y lógica personalizada",
      paragraphs: [
        "La mayoría de tiendas dependen de múltiples apps para suscripciones, fidelización, reseñas, upsells y operaciones. Evaluamos solapamientos del stack de apps y calidad de integración antes de la implementación para evitar conflictos que ralenticen páginas o generen un checkout frágil. Cuando es posible, consolidamos funcionalidad redundante e implementamos integraciones de forma que el código del tema siga siendo comprensible. Esto reduce la deuda técnica a largo plazo y mantiene abiertas las vías de actualización a medida que evolucionan sus requisitos de negocio.",
        "Para requisitos que van más allá de las apps estándar, implementamos lógica personalizada mediante extensiones de tema, app blocks y servicios backend seguros cuando es necesario. Ejemplos incluyen mecánicas de bundles personalizados, reglas de merchandising dinámico, visibilidad de precios B2B y contenido condicional por mercado. Cada función personalizada incluye comportamiento de respaldo y hooks de monitorización para facilitar el diagnóstico. Recibe una solución que soporta experiencias de cliente diferenciadas sin sacrificar la estabilidad de la plataforma ni la claridad operativa.",
      ],
    },
    {
      title: "Optimización de la experiencia de checkout",
      paragraphs: [
        "La etapa de checkout suele determinar si la adquisición de pago es rentable. Optimizamos los flujos previos al checkout y el propio checkout para reducir la hesitación, especialmente en dispositivos móviles donde la fricción se amplifica. El diseño del carrito, la visibilidad de estimaciones de envío, los mensajes de confianza y la priorización de métodos de pago se ajustan a la psicología del comprador y a su patrón típico de pedido. Pequeñas mejoras en estos momentos suelen producir aumentos desproporcionados en pedidos completados y menores tasas de carrito abandonado.",
        "También alineamos la configuración del checkout con sus realidades de fulfillment y financieras. El manejo de impuestos, zonas de envío, lógica de descuentos y etiquetado de pedidos se valida contra escenarios operativos reales, no solo pruebas del camino feliz. Esto evita costosos problemas de soporte post-compra y protege los márgenes durante promociones. Al combinar ajustes de UX con corrección operativa, las mejoras del checkout permanecen duraderas bajo picos de campaña, tráfico estacional y esfuerzos de expansión internacional.",
      ],
    },
    {
      title: "Merchandising orientado a la conversión",
      paragraphs: [
        "Una tienda bonita sigue rindiendo por debajo si el merchandising no es claro. Construimos páginas de colección, tarjetas de producto y módulos de recomendación que comunican valor rápidamente y soportan la navegación basada en intención. Ordenación, filtros, badges y bloques de contenido se configuran para ayudar a distintos tipos de compradores a descubrir productos adecuados sin sentirse abrumados. Esta estructura equilibrada soporta tanto el descubrimiento amplio como compradores de alta intención que necesitan rutas rápidas a variantes específicas.",
        "Las decisiones de merchandising se validan con analítica y comportamiento de sesión, no con suposiciones. Instrumentamos interacciones clave como uso de filtros, cambio de variantes y rutas de add-to-cart para que su equipo pueda refinar diseños con evidencia. Esto crea un ciclo de optimización repetible tras el lanzamiento en lugar de un rediseño puntual. Con el tiempo, su tienda guía mejor a los clientes desde la exploración hasta decisiones de compra seguras.",
      ],
    },
    {
      title: "SEO e infraestructura de contenido",
      paragraphs: [
        "El crecimiento orgánico depende de que los cimientos técnicos y de contenido trabajen juntos. Aseguramos que elementos SEO a nivel de plantilla como encabezados estructurados, manejo de canonical, patrones de metadatos y controles de indexación estén implementados correctamente. Las estructuras de blog, guías y colecciones se diseñan para la descubribilidad preservando el tono de marca. Esta configuración mejora su capacidad de posicionarse en consultas de alta intención y respalda campañas de pago con experiencias de landing más educativas.",
        "Más allá del lanzamiento, creamos módulos de contenido reutilizables que los equipos de marketing pueden ensamblar sin intervención de desarrolladores. Tablas comparativas, destacados de funciones, bloques de prueba social y componentes FAQ pueden desplegarse rápidamente en páginas de campaña. Esta flexibilidad mantiene alta la velocidad de ejecución durante impulsos estacionales y lanzamientos de producto. También mantiene consistencia de diseño y mensaje, lo que refuerza la confianza y mejora el rendimiento de conversión en todos los canales de adquisición.",
      ],
    },
    {
      title: "Analítica, atribución e informes",
      paragraphs: [
        "La toma de decisiones fiable requiere medición confiable. Implementamos analítica con definiciones explícitas de eventos para impresiones de producto, interacciones de engagement, acciones del carrito, progresión del checkout y resultados de compra. La configuración de tags se revisa en busca de duplicación, deriva de nomenclatura y distorsiones de atribución que aparecen comúnmente en entornos con mucha publicidad. Una medición limpia permite a los equipos de growth comparar canales con precisión e identificar qué experiencias de landing producen adquisición de clientes rentable.",
        "También diseñamos vistas de informes alineadas con preguntas operativas que los ejecutivos realmente hacen, como margen por cohorte, incremento de recompra por tipo de campaña e impacto de umbrales de envío en el valor del pedido. Los dashboards son intencionalmente prácticos, evitando métricas vanidosas que oscurecen el rendimiento. Con visibilidad clara del comportamiento y los resultados, su equipo puede priorizar el trabajo de optimización con confianza y evitar decisiones reactivas basadas en datos incompletos o engañosos.",
      ],
    },
    {
      title: "Aseguramiento de calidad y preparación para el lanzamiento",
      paragraphs: [
        "El riesgo de lanzamiento se reduce mediante QA disciplinado en lugar de comprobaciones manuales de último momento. Probamos recorridos críticos en dispositivos, navegadores y escenarios de cliente, incluyendo acumulación de descuentos, condiciones de bajo stock, casos límite de variantes y combinaciones de reglas de envío. Los flujos de pago y disparadores de notificación se validan con pedidos de prueba controlados para que los equipos operativos practiquen los traspasos antes de que lleguen clientes reales. Esta preparación minimiza sorpresas y protege la credibilidad de la marca en el go-live.",
        "Nuestra lista de verificación de lanzamiento incluye redirecciones, configuración de rastreo, permisos de apps, procedimientos de respaldo y contingencias de rollback. Coordinamos una ventana de lanzamiento controlada, monitorizamos el comportamiento en vivo de cerca y resolvemos problemas prioritarios con comunicación clara. Al estar estructurado el proceso de release, los stakeholders saben exactamente qué se validó y qué se monitoriza post-lanzamiento. Esta confianza permite a los equipos de marketing activar campañas sin dudar inmediatamente después del despliegue.",
      ],
    },
    {
      title: "Crecimiento e iteración post-lanzamiento",
      paragraphs: [
        "Los proyectos Shopify más valiosos siguen mejorando tras el release. Establecemos un backlog de iteración basado en fricción observada en el embudo, oportunidades de merchandising y tendencias de rendimiento de apps. Las mejoras se priorizan por impacto esperado en ingresos y esfuerzo de implementación, asegurando que la capacidad técnica se centre en resultados significativos. Este ritmo continuo ayuda a su tienda a adaptarse a nuevos productos, cambios de canal y presiones competitivas sin requerir reconstrucciones completas cada año.",
        "A medida que crece su negocio, respaldamos iniciativas de hoja de ruta como expansión de mercado, refinamiento de suscripciones, optimización de fidelización y personalización avanzada. Como la arquitectura subyacente de su tienda es limpia, estas mejoras se integran con fluidez y permanecen mantenibles. Conserva la propiedad mediante documentación y transferencia de conocimiento, con soporte experto cuando aumenta la complejidad. El resultado es una plataforma Shopify que sigue acumulando valor en lugar de volverse más difícil de cambiar con el tiempo.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🚀",
      title: "Desarrollo alineado con ingresos",
      description:
        "Las decisiones técnicas se priorizan por impacto en conversión, retención y margen en lugar de volumen genérico de funciones.",
    },
    {
      icon: "⚡",
      title: "Experiencia de tienda más rápida",
      description:
        "La optimización de rendimiento mejora la usabilidad móvil y reduce la tasa de rebote en sesiones de compra de alta intención.",
    },
    {
      icon: "🧩",
      title: "Stack de apps mantenible",
      description:
        "Las integraciones se implementan de forma limpia para reducir conflictos, simplificar actualizaciones y evitar soluciones frágiles.",
    },
    {
      icon: "📊",
      title: "Medición fiable",
      description:
        "La instrumentación analítica ofrece a la dirección visibilidad clara del comportamiento del embudo y la rentabilidad por canal.",
    },
    {
      icon: "🛡️",
      title: "Proceso de lanzamiento más seguro",
      description:
        "QA estructurado y planificación de despliegue minimizan disrupciones y protegen la confianza del cliente en el go-live.",
    },
    {
      icon: "🔁",
      title: "Optimización continua",
      description:
        "Una hoja de ruta post-lanzamiento mantiene la tienda evolucionando con mejoras basadas en datos y prioridades de negocio claras.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Descubrimiento comercial",
      description:
        "Realizamos workshops enfocados para clarificar objetivos, segmentos de clientes, restricciones operativas y requisitos de integración. Esta fase produce un brief de entrega compartido, criterios de éxito medibles y una hoja de ruta por fases que equilibra victorias rápidas con trabajo de cimientos, asegurando que los stakeholders acuerden el alcance antes de acelerar el desarrollo.",
    },
    {
      step: 2,
      title: "Arquitectura y construcción",
      description:
        "Nuestros desarrolladores implementan componentes de tema, estructuras de datos e integraciones de apps con patrones mantenibles. Documentamos decisiones clave, establecemos estándares de código y mantenemos quality gates activos durante toda la ejecución para que las nuevas funciones sigan siendo estables, testeables y fáciles de gestionar por su equipo interno tras el lanzamiento.",
    },
    {
      step: 3,
      title: "Refinamiento de la experiencia",
      description:
        "Optimizamos navegación, presentación de productos, comportamiento del carrito y rutas de checkout con mentalidad conversion-first. UX e ingeniería colaboran en mejoras basadas en evidencia que reducen fricción, mejoran la confianza y facilitan acciones críticas para compradores móviles, que representan una parte creciente de su tráfico.",
    },
    {
      step: 4,
      title: "QA y lanzamiento",
      description:
        "Antes del go-live, ejecutamos pruebas multi-dispositivo, validamos flujos operativos y ejecutamos escenarios de pedido controlados. El lanzamiento se gestiona mediante una lista de verificación coordinada con monitorización y preparación de rollback, permitiendo a su equipo desplegar con confianza mientras abordamos cualquier incidencia de producción con manejo claro de prioridades.",
    },
    {
      step: 5,
      title: "Iteraciones de crecimiento",
      description:
        "Tras el lanzamiento, seguimos tendencias de rendimiento, identificamos cuellos de botella y priorizamos sprints de mejora según impacto de negocio. Este ciclo de optimización continua ayuda a aumentar la conversión y el valor medio del pedido con el tiempo, preservando la estabilidad de la plataforma a medida que se expanden catálogo, canales y necesidades de campaña.",
    },
  ],
  faqs: [
    {
      question: "¿Trabajan con Shopify Plus y planes estándar de Shopify?",
      answer:
        "Sí. Soportamos implementaciones tanto de Shopify como de Shopify Plus, y adaptamos las decisiones de arquitectura a su plan actual, complejidad y hoja de ruta de crecimiento.",
    },
    {
      question: "¿Pueden migrar una tienda existente sin perjudicar el SEO?",
      answer:
        "Sí. Gestionamos redirecciones, continuidad de metadatos, comprobaciones de SEO técnico y QA estructurado para proteger la visibilidad orgánica durante la migración.",
    },
    {
      question: "¿Cuánto dura un proyecto típico de desarrollo Shopify?",
      answer:
        "La mayoría de proyectos duran entre cuatro y doce semanas según el tamaño del catálogo, integraciones y requisitos de funciones personalizadas.",
    },
    {
      question: "¿Ofrecen diseño, desarrollo y analítica juntos?",
      answer:
        "Sí. Nuestro modelo de entrega combina UX, desarrollo front-end, trabajo de integración y configuración de medición en un proceso coordinado.",
    },
    {
      question: "¿Pueden mejorar un tema existente en lugar de reconstruir?",
      answer:
        "Por supuesto. A menudo optimizamos temas Shopify existentes cuando la base actual es viable y las mejoras focalizadas ofrecen un ROI más fuerte.",
    },
    {
      question: "¿Podrá mi equipo gestionar el contenido tras el lanzamiento?",
      answer:
        "Sí. Construimos secciones reutilizables y proporcionamos documentación práctica para que equipos no técnicos actualicen contenido de forma segura y rápida.",
    },
    {
      question: "¿Ofrecen soporte continuo tras el go-live?",
      answer:
        "Sí. Proporcionamos optimización post-lanzamiento, mantenimiento y ejecución de hoja de ruta según su modelo de colaboración preferido.",
    },
  ],
  relatedServices: [
    {
      slug: "shopify-store-design",
      title: "Diseño de tienda Shopify",
      description:
        "Cree experiencias de tienda de alta conversión con UI coherente con la marca y estructura UX orientada a la conversión.",
    },
    {
      slug: "shopify-custom-apps",
      title: "Apps personalizadas Shopify",
      description:
        "Amplíe Shopify con aplicaciones a medida, automatización y flujos de trabajo personalizados en torno a sus operaciones.",
    },
    {
      slug: "marketplace-development",
      title: "Desarrollo de marketplaces",
      description:
        "Lance plataformas de comercio multi-vendor con arquitectura escalable, flujos de onboarding y gestión de transacciones.",
    },
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Construya plataformas web integradas que respalden operaciones ecommerce, herramientas internas y flujos orientados al cliente.",
    },
  ],
  cta: {
    title: "¿Listo para construir una mejor tienda Shopify?",
    description:
      "Convirtamos su tienda Shopify en un motor de ingresos más rápido y escalable, diseñado para un crecimiento medible.",
    primaryLabel: "Solicitar consulta gratuita",
    primaryHref: "/contact",
    secondaryLabel: "Ver todos los servicios",
    secondaryHref: "/services",
  },
};
