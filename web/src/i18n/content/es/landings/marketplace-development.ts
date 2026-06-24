import type { LandingTexts } from "@/lib/i18n/content/types";
import { DEFAULT_CTA_ES } from "./shared";

export const marketplaceDevelopment: LandingTexts = {
  h1: "Servicios de desarrollo de marketplaces",
  subtitle:
    "Construya marketplaces multi-vendor escalables con flujos de transacción robustos y operaciones de plataforma fiables.",
  heroBadge: "Plataformas multi-vendor",
  priceRange: "Desde $2500",
  intro: [
    "Los negocios de marketplace tienen éxito cuando equilibran tres necesidades en competencia: experiencia fluida del comprador, operaciones eficientes del vendedor y gobernanza fiable de la plataforma. Nuestro servicio de desarrollo de marketplaces ayuda a las organizaciones a construir y escalar plataformas que respaldan este equilibrio desde el primer día. Diseñamos e implementamos sistemas para onboarding de vendedores, gestión de catálogo, descubrimiento, checkout, pagos y manejo de disputas manteniendo el recorrido del usuario intuitivo y la complejidad operativa manejable.",
    "A diferencia del ecommerce de un solo comerciante, los marketplaces requieren coordinación cuidadosa de identidad, permisos, incentivos y flujos financieros entre múltiples tipos de participantes. Arquitectamos plataformas con límites de rol explícitos, flujos de transacción auditables y componentes modulares que permiten evolución controlada a medida que cambian las dinámicas de oferta y demanda. Esta base ayuda a lanzar más rápido sin sacrificar la fiabilidad necesaria para credibilidad de marketplace a largo plazo.",
    "Ya sea que cree un marketplace B2B de nicho, se expanda a modelos de marketplace de servicios o modernice una plataforma existente con restricciones heredadas, proporcionamos entrega integral y soporte de optimización. Nuestros equipos combinan estrategia de producto, UX, ingeniería full-stack y analítica para asegurar que su marketplace crezca con confianza. El resultado es una plataforma resiliente que impulsa liquidez, mejora retención y respalda economía unitaria sostenible.",
  ],
  sections: [
    {
      title: "Validación del modelo de marketplace y estrategia",
      paragraphs: [
        "Antes de la implementación, clarificamos mecánicas de marketplace incluyendo roles de participantes, intercambio de valor, modelos de comisión y requisitos de confianza. Este trabajo estratégico asegura que el diseño de plataforma refleje su modelo de negocio específico, ya sea estructuras basadas en comisión, impulsadas por suscripción, marketplace de leads o híbridas. Identificamos suposiciones críticas en torno a liquidez, fricción de onboarding y frecuencia de transacciones para que las prioridades de hoja de ruta se alineen con viabilidad de negocio.",
        "La validación de estrategia también incluye definir métricas de éxito para lados de oferta y demanda. Seguimos señales como velocidad de activación de vendedores, comportamiento de recompra de compradores, velocidad de pedidos y fiabilidad de fulfillment. Estas métricas guían decisiones de producto y ayudan a la dirección a evaluar si las mecánicas de marketplace producen efectos de red saludables con el tiempo.",
      ],
    },
    {
      title: "UX basada en roles y arquitectura de información",
      paragraphs: [
        "Los marketplaces deben servir a múltiples grupos de usuarios sin abrumar a ninguno. Diseñamos experiencias distintas pero coherentes para compradores, vendedores y admins, cada una con navegación, permisos y flujos de tareas claros. Este enfoque UX basado en roles reduce confusión y ayuda a los participantes a completar acciones clave rápidamente, desde listar productos hasta resolver problemas de transacción.",
        "La arquitectura de información se moldea en torno a escala de marketplace y variabilidad de contenido. Estructuras de categorías, filtros de búsqueda y plantillas de listado se diseñan para respaldar descubribilidad preservando estándares de calidad. A medida que crece la amplitud del catálogo, esta estructura previene caos de navegación y mantiene rutas de conversión eficientes para compradores de alta intención.",
      ],
    },
    {
      title: "Onboarding de vendedores y activación de oferta",
      paragraphs: [
        "La calidad de oferta y velocidad de onboarding son fundamentales para el crecimiento del marketplace. Construimos flujos de onboarding que verifican vendedores, capturan datos de cumplimiento requeridos y guían la configuración de listados mediante hitos claros. Comprobaciones automatizadas y orientación contextual reducen abandono durante el registro preservando confianza y estándares de calidad.",
        "Más allá del registro inicial, diseñamos flujos de activación que ayudan a los vendedores a ser productivos rápidamente. Esto incluye prompts de calidad de listado, guía de precios, asistencia de configuración de fulfillment y dashboards de rendimiento. Sistemas de activación sólidos aumentan la velocidad hasta la primera transacción y mejoran retención de vendedores a largo plazo.",
      ],
    },
    {
      title: "Catálogo, listados y experiencia de búsqueda",
      paragraphs: [
        "La calidad del descubrimiento en marketplace depende de datos de listado estructurados y comportamiento de búsqueda robusto. Diseñamos esquemas de listado que estandarizan atributos críticos permitiendo flexibilidad específica por categoría. Esto mejora relevancia de filtros, claridad de comparación y confianza del comprador durante la evaluación, especialmente en categorías de alta consideración.",
        "La lógica de búsqueda y ranking se ajusta en torno a intención del comprador, calidad de oferta y prioridades de plataforma. Respaldamos controles de relevancia, reglas de posicionamiento impulsado y salvaguardas anti-spam que mantienen confianza en los resultados. Al equilibrar velocidad de descubrimiento con calidad de listado, los marketplaces mejoran conversión y reducen sesiones abandonadas.",
      ],
    },
    {
      title: "Flujos de transacción, checkout y pago",
      paragraphs: [
        "La infraestructura de transacción es donde se gana o pierde la confianza del marketplace. Construimos flujos de checkout que manejan carritos multi-vendor, lógica de envío, impuestos y reglas promocionales manteniendo la experiencia de usuario sencilla. La arquitectura de pago se diseña para fiabilidad, comisiones transparentes y procesamiento seguro entre tipos de participantes.",
        "También implementamos mecanismos para seguimiento de estado de pedido, políticas de cancelación y manejo de excepciones para reducir confusión post-compra. Compradores y vendedores necesitan visibilidad clara de estado y siguientes pasos predecibles durante todo el ciclo de vida de la transacción. Un diseño de transacción sólido mejora satisfacción y reduce carga de soporte.",
      ],
    },
    {
      title: "Pagos, comisiones y controles financieros",
      paragraphs: [
        "La economía de marketplace requiere cálculo preciso de comisiones, programación de pagos y reconciliación financiera. Implementamos flujos de pago con reglas de comisión configurables, controles de timing de liquidación e informes transparentes para vendedores y operadores de plataforma. Esta claridad financiera respalda confianza y reduce disputas relacionadas con visibilidad de ganancias.",
        "La reconciliación y auditabilidad se integran en la capa financiera desde el inicio. Diseñamos sistemas que rastrean eventos de transacción, ajustes, reembolsos y asignaciones de comisión con registros trazables. Estos controles mejoran confianza operativa y respaldan requisitos de cumplimiento a medida que crece el volumen de transacciones.",
      ],
    },
    {
      title: "Confianza, seguridad y resolución de disputas",
      paragraphs: [
        "Los marketplaces saludables dependen de sistemas creíbles de confianza y seguridad. Implementamos flujos de moderación, controles de reseñas y señales de riesgo de fraude adaptadas a su dominio. Las herramientas de aplicación de políticas ayudan a los equipos a abordar patrones de abuso rápidamente manteniendo equidad para participantes legítimos.",
        "Los flujos de resolución de disputas se diseñan para velocidad, transparencia y resultados consistentes. La recepción de casos, manejo de evidencia y registro de decisiones se estructuran para reducir ciclos de escalado y frustración del cliente. Operaciones de seguridad sólidas mejoran retención y protegen reputación de marca en mercados competitivos.",
      ],
    },
    {
      title: "Operaciones admin y gobernanza de plataforma",
      paragraphs: [
        "Los equipos de marketplace necesitan tooling operativo potente para gestionar escala eficientemente. Construimos interfaces admin para gestión de participantes, supervisión de listados, revisión de transacciones y aplicación de políticas con permisos basados en roles. Estas herramientas reducen esfuerzo manual y mejoran tiempos de respuesta para incidentes operativos.",
        "Las funciones de gobernanza incluyen reglas configurables, trazas de auditoría y dashboards de salud que detectan riesgos emergentes temprano. A medida que evolucionan requisitos de política y legales, esta base de gobernanza permite a los equipos adaptarse sin reescrituras disruptivas de plataforma. El control operativo se convierte en ventaja estratégica en lugar de cuello de botella.",
      ],
    },
    {
      title: "Escalabilidad, rendimiento y fiabilidad",
      paragraphs: [
        "Las plataformas de marketplace experimentan patrones de carga impredecibles ligados a promociones, estacionalidad y crecimiento de red. Diseñamos capas de infraestructura y aplicación para escalado resiliente, comportamiento eficiente de consultas y degradación elegante bajo estrés. Esto mantiene la experiencia de participantes estable incluso durante picos de demanda o actualizaciones grandes de catálogo.",
        "La fiabilidad se respalda mediante observabilidad, planificación de respuesta a incidentes y prácticas estructuradas de despliegue. Monitorizamos recorridos críticos como búsqueda, checkout y pagos con alertas proactivas y diagnósticos. Esta madurez operativa reduce riesgo de downtime y protege confianza en la plataforma a medida que aumenta la complejidad.",
      ],
    },
    {
      title: "Optimización de crecimiento y efectos de red",
      paragraphs: [
        "Después del lanzamiento, nos centramos en mecanismos que mejoran liquidez y retención en ambos lados del marketplace. Esto incluye experimentos de onboarding, mejoras de ranking, refinamiento de señales de confianza y diseño de incentivos focalizado. Las optimizaciones se priorizan por efecto medible en volumen de transacciones y comportamiento de recompra.",
        "También ayudamos a los equipos a construir marcos de experimentación que hacen sistemático el aprendizaje de crecimiento. Con analítica clara y métodos de despliegue controlado, su marketplace puede evolucionar con confianza sin desestabilizar operaciones centrales. Esta disciplina iterativa ayuda a transformar tracción inicial en efectos de red duraderos.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🛒",
      title: "UX equilibrada para comprador y vendedor",
      description:
        "Experiencias específicas por rol mejoran usabilidad para participantes preservando un recorrido de plataforma coherente.",
    },
    {
      icon: "💸",
      title: "Flujos financieros fiables",
      description:
        "Sistemas de comisión, pago y reconciliación mantienen la economía del marketplace transparente y precisa.",
    },
    {
      icon: "🔍",
      title: "Mejor descubrimiento y conversión",
      description:
        "Listados estructurados y ranking ajustado mejoran relevancia de búsqueda y tasas de finalización de transacciones.",
    },
    {
      icon: "🛡️",
      title: "Controles de confianza y seguridad",
      description:
        "Flujos de moderación y disputas protegen participantes y fortalecen credibilidad de la plataforma.",
    },
    {
      icon: "📊",
      title: "Visibilidad operativa",
      description:
        "Herramientas admin y dashboards analíticos respaldan decisiones más rápidas y respuesta a incidentes.",
    },
    {
      icon: "📈",
      title: "Crecimiento escalable del marketplace",
      description:
        "Arquitectura y marcos de optimización respaldan crecimiento de liquidez sin sacrificar fiabilidad.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Blueprint del marketplace",
      description:
        "Definimos roles de participantes, mecánicas de transacción, modelos de comisión y requisitos de confianza mediante descubrimiento estructurado. Este blueprint alinea producto, operaciones y dirección sobre cómo debe funcionar el marketplace y qué métricas indicarán tracción temprana saludable. Esta fase incluye comprobaciones de preparación multifuncional para soporte, finanzas y operaciones para asegurar que cada flujo orientado a participantes rinda de forma fiable bajo presión transaccional real. Comparamos satisfacción de participantes, latencia operativa y precisión financiera en cada etapa para asegurar que la confianza del marketplace permanezca sólida a medida que escalan actividad de vendedores y demanda de compradores. Esta disciplina protege la confianza de la red y reduce riesgo de churn de participantes.",
    },
    {
      step: 2,
      title: "Diseño y arquitectura de plataforma",
      description:
        "Nuestro equipo diseña recorridos de usuario basados en roles, modelos de datos y arquitectura técnica para catálogo, checkout, pagos y funciones de gobernanza. Esta etapa de planificación asegura que la plataforma sea escalable, segura y alineada con necesidades operativas a largo plazo antes de que comience la implementación. Esta fase incluye comprobaciones de preparación multifuncional para soporte, finanzas y operaciones para asegurar que cada flujo orientado a participantes rinda de forma fiable bajo presión transaccional real. Comparamos satisfacción de participantes, latencia operativa y precisión financiera en cada etapa para asegurar que la confianza del marketplace permanezca sólida a medida que escalan actividad de vendedores y demanda de compradores. Esta disciplina protege la confianza de la red y reduce riesgo de churn de participantes.",
    },
    {
      step: 3,
      title: "Desarrollo e integración",
      description:
        "Construimos módulos de marketplace de forma iterativa, incluyendo onboarding, gestión de listados, flujos de transacción y tooling admin. Las integraciones con pago, identidad y sistemas de comunicación se implementan con controles de fiabilidad para respaldar operaciones de grado producción. Esta fase incluye comprobaciones de preparación multifuncional para soporte, finanzas y operaciones para asegurar que cada flujo orientado a participantes rinda de forma fiable bajo presión transaccional real. Comparamos satisfacción de participantes, latencia operativa y precisión financiera en cada etapa para asegurar que la confianza del marketplace permanezca sólida a medida que escalan actividad de vendedores y demanda de compradores. Esta disciplina protege la confianza de la red y reduce riesgo de churn de participantes.",
    },
    {
      step: 4,
      title: "Pruebas y preparación para lanzamiento",
      description:
        "El QA exhaustivo valida recorridos críticos para compradores, vendedores y admins en condiciones realistas. Preparamos runbooks operativos, monitorización y procedimientos de rollback para asegurar confianza de lanzamiento y capacidad de respuesta rápida durante la actividad inicial del marketplace. Esta fase incluye comprobaciones de preparación multifuncional para soporte, finanzas y operaciones para asegurar que cada flujo orientado a participantes rinda de forma fiable bajo presión transaccional real. Comparamos satisfacción de participantes, latencia operativa y precisión financiera en cada etapa para asegurar que la confianza del marketplace permanezca sólida a medida que escalan actividad de vendedores y demanda de compradores. Esta disciplina protege la confianza de la red y reduce riesgo de churn de participantes.",
    },
    {
      step: 5,
      title: "Optimización y escala",
      description:
        "Post-lanzamiento, analizamos comportamiento de participantes, resultados de transacciones y cuellos de botella operativos para priorizar mejoras. La iteración continua fortalece liquidez, mejora retención y respalda crecimiento sostenible del marketplace a medida que aumentan volumen y complejidad. Esta fase incluye comprobaciones de preparación multifuncional para soporte, finanzas y operaciones para asegurar que cada flujo orientado a participantes rinda de forma fiable bajo presión transaccional real. Comparamos satisfacción de participantes, latencia operativa y precisión financiera en cada etapa para asegurar que la confianza del marketplace permanezca sólida a medida que escalan actividad de vendedores y demanda de compradores. Esta disciplina protege la confianza de la red y reduce riesgo de churn de participantes.",
    },
  ],
  faqs: [
    {
      question: "¿Construyen marketplaces de productos y de servicios?",
      answer:
        "Sí. Respaldamos modelos de marketplace B2C, B2B, de producto, de servicio e híbridos según sus objetivos de negocio.",
    },
    {
      question: "¿Pueden implementar checkout multi-vendor y pagos?",
      answer:
        "Por supuesto. Diseñamos flujos de transacción seguros para comisiones, liquidaciones y visibilidad financiera a nivel de participante.",
    },
    {
      question: "¿Cómo manejan funciones de confianza y resolución de disputas?",
      answer:
        "Implementamos moderación, flujos de políticas y manejo estructurado de disputas para proteger participantes e integridad de la plataforma.",
    },
    {
      question: "¿Podemos lanzar por fases?",
      answer:
        "Sí. A menudo comenzamos con un MVP enfocado y expandimos capacidades según liquidez e insights de comportamiento de usuario.",
    },
    {
      question: "¿Proporcionan herramientas admin para operadores de marketplace?",
      answer:
        "Sí. Construimos dashboards operativos e interfaces de gestión para listados, usuarios, transacciones y controles de política.",
    },
    {
      question: "¿Cuánto suele durar el desarrollo de un marketplace?",
      answer:
        "Los lanzamientos iniciales suelen ir de diez a veintiséis semanas según complejidad y alcance de integración.",
    },
    {
      question: "¿Pueden optimizar una plataforma de marketplace existente?",
      answer:
        "Sí. Podemos auditar, modernizar y mejorar sistemas de marketplace existentes para mejor rendimiento y resultados de crecimiento.",
    },
  ],
  relatedServices: [
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Desarrolle plataformas web robustas que respalden flujos multi-rol y procesos transaccionales complejos.",
    },
    {
      slug: "saas-development",
      title: "Desarrollo SaaS",
      description:
        "Construya bases SaaS escalables para tooling de marketplace, analítica y flujos de gestión de participantes.",
    },
    {
      slug: "shopify-development",
      title: "Desarrollo Shopify",
      description:
        "Lance y optimice tiendas de ecommerce que puedan complementar estrategias de canal de marketplace.",
    },
    {
      slug: "shopify-store-design",
      title: "Diseño de tiendas Shopify",
      description:
        "Mejore patrones UX de comercio que informen confianza del comprador y conversión en contextos de marketplace.",
    },
  ],
  cta: {
    title: "¿Construye una plataforma de marketplace?",
    description:
      "Asóciese con nosotros para diseñar y desarrollar un marketplace escalable con mecánicas sólidas de confianza, operaciones y crecimiento.",
    ...DEFAULT_CTA_ES,
  },
};
