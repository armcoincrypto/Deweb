import type { LandingTexts } from "@/lib/i18n/content/types";

export const aiChatbotDevelopment: LandingTexts = {
  h1: "Servicios de desarrollo de chatbots con IA",
  subtitle:
    "Despliegue chatbots con IA que resuelven solicitudes de clientes, califican leads y reducen la carga de soporte.",
  heroBadge: "IA conversacional",
  priceRange: "Desde $300",
  intro: [
    "Los chatbots con IA pueden aportar valor comercial significativo cuando están conectados a flujos de trabajo reales, no tratados como un widget novedoso. Nuestro servicio de desarrollo de chatbots con IA se centra en resultados como una resolución de soporte más rápida, una mejor calificación de leads y mayor consistencia de respuesta entre canales. Diseñamos bots que entienden el lenguaje de su dominio, acceden a fuentes de conocimiento relevantes y escalan apropiadamente cuando se necesita intervención humana. Esto crea conversaciones útiles que generan confianza en lugar de frustrar a los usuarios.",
    "Combinamos diseño conversacional, arquitectura de recuperación, ingeniería de integración y controles de gobernanza en un único proceso de entrega. Eso significa que su bot hace más que responder preguntas genéricas. Puede consultar el estado de pedidos, sugerir productos relevantes, dirigir prospectos a equipos comerciales y capturar contexto estructurado para seguimiento. Al fundamentar las respuestas en datos aprobados y políticas claras, reducimos el riesgo de alucinaciones y mantenemos las interacciones alineadas con la voz de su marca y los estándares operativos.",
    "Ya sea que necesite un asistente de soporte para clientes existentes, un chatbot comercial para leads entrantes o un asistente de conocimiento interno para equipos, entregamos sistemas listos para producción con monitorización y bucles de mejora. Lanzamos con KPIs medibles como tasa de contención, calidad de respuesta, tiempo de resolución e impacto en conversión. El resultado es una capacidad de IA conversacional que mejora la eficiencia hoy y se vuelve más inteligente mediante optimización continua.",
  ],
  sections: [
    {
      title: "Definición de casos de uso y métricas de éxito",
      paragraphs: [
        "Los programas de chatbot más sólidos comienzan con casos de uso acotados y de alto valor. Identificamos escenarios conversacionales donde la automatización puede reducir carga de trabajo o mejorar la experiencia del cliente, como soporte de pedidos, reserva de citas, calificación de leads y orientación sobre políticas. Cada caso de uso se puntúa por volumen, complejidad, riesgo e impacto de negocio para que la implementación comience donde el valor es más claro y el riesgo operativo es manejable.",
        "Definimos KPIs antes del desarrollo para asegurar que el progreso sea medible. Las métricas suelen incluir velocidad de primera respuesta, tasa de resolución en autoservicio, calidad del traspaso, señales de satisfacción del cliente y rendimiento de conversión posterior. Estos benchmarks guían las decisiones de diseño y el ajuste del comportamiento del modelo. Con objetivos claros, los equipos pueden evaluar la efectividad del chatbot de forma objetiva y priorizar mejoras que produzcan resultados de negocio visibles.",
      ],
    },
    {
      title: "Diseño conversacional y estrategia de diálogo",
      paragraphs: [
        "Un chatbot útil requiere arquitectura conversacional reflexiva, no solo acceso al modelo. Diseñamos intenciones, prompts, comportamiento de respaldo y rutas de escalación para que los usuarios puedan completar tareas sin confusión. Los flujos de diálogo se estructuran en torno a objetivos habituales del usuario y variación del lenguaje natural, asegurando que el asistente pueda guiar conversaciones de forma productiva incluso cuando las solicitudes son incompletas o ambiguas.",
        "El tono y el estilo de respuesta se alinean con su marca manteniéndose concisos y accionables. Definimos formatos de respuesta para distintos contextos, desde comprobaciones rápidas de políticas hasta instrucciones de resolución de problemas en varios pasos. Esta consistencia mejora la confianza y la comprensión entre canales. A medida que crecen los datos de uso, los diseños conversacionales se refinan para reducir el abandono y mejorar las tasas de finalización en recorridos críticos.",
      ],
    },
    {
      title: "Base de conocimiento y arquitectura de recuperación",
      paragraphs: [
        "Las respuestas fiables dependen de una recuperación de conocimiento fundamentada. Estructuramos sus fuentes de contenido, incluyendo documentación, páginas de políticas, datos de producto y SOPs internos, en un sistema de recuperación optimizado para relevancia y actualidad. La estrategia de chunking, el etiquetado de metadatos y la lógica de indexación se ajustan a su dominio para que el bot pueda citar información precisa con rapidez.",
        "También implementamos gobernanza en torno a la calidad de las fuentes y los flujos de actualización. El contenido obsoleto o contradictorio se identifica de forma temprana, y los responsables de contenido reciben responsabilidades claras de mantenimiento. Este modelo operativo mantiene el chatbot útil con el tiempo y reduce el riesgo de respuestas desactualizadas. Las bases sólidas de recuperación son esenciales tanto para la precisión como para la confianza de los stakeholders.",
      ],
    },
    {
      title: "Integración de sistemas y acciones de flujo de trabajo",
      paragraphs: [
        "Los chatbots de alto impacto hacen más que responder preguntas. Integramos con CRM, helpdesk, ecommerce, programación y plataformas de ticketing para que el bot pueda realizar acciones como crear casos, consultar el estado de cuentas, reservar reuniones y pasar contexto estructurado de leads a equipos comerciales. Estas capacidades convierten conversaciones en resultados completados en lugar de interacciones sin salida.",
        "Los flujos de acción se diseñan con validación y permisos en mente. Aplicamos comprobaciones de entrada, restricciones de rol y trazas de auditoría para mantener la integridad operativa. Cuando aparece incertidumbre, el bot solicita aclaración o deriva a un humano en lugar de adivinar. Este enfoque equilibra la velocidad de automatización con fiabilidad y control de riesgo en entornos orientados al cliente.",
      ],
    },
    {
      title: "Estrategia de despliegue multicanal",
      paragraphs: [
        "Los usuarios esperan soporte consistente en chat web, apps de mensajería y portales internos. Diseñamos implementaciones específicas por canal que preservan la lógica central mientras adaptan el formato de interacción a cada plataforma. La longitud de respuesta, las affordances de UI y los patrones de escalación se ajustan al contexto para que la experiencia se sienta nativa en lugar de copiada de un canal a otro.",
        "El despliegue por canales se secuencia estratégicamente para controlar el riesgo y recopilar aprendizajes. A menudo lanzamos primero en un canal de alto volumen, refinamos el comportamiento y luego expandimos a superficies adicionales. Este despliegue por fases reduce la tensión operativa y mejora la calidad antes de una exposición más amplia. Los equipos ganan confianza mediante crecimiento medido en lugar de releases simultáneos.",
      ],
    },
    {
      title: "Seguridad, guardrails y cumplimiento",
      paragraphs: [
        "Los sistemas de IA necesitan límites claros para permanecer confiables. Implementamos guardrails para temas sensibles, requisitos de privacidad, acciones prohibidas y disparadores de escalación. Las restricciones de prompts, los filtros de respuesta y las comprobaciones de políticas trabajan juntos para minimizar salidas dañinas o no conformes. Esta capa de gobernanza es esencial para industrias reguladas y cualquier marca con estándares estrictos de comunicación.",
        "También definimos flujos de manejo de incidentes y revisión. Las interacciones potencialmente riesgosas se registran, marcan y derivan para revisión humana con criterios claros de severidad. Esto crea un modelo de supervisión práctico que soporta el uso responsable de IA en producción. Los guardrails se tratan como controles continuos, no como configuración única, y evolucionan con las necesidades del negocio.",
      ],
    },
    {
      title: "Traspaso humano y asistencia a agentes",
      paragraphs: [
        "Ningún chatbot debería intentar resolver todos los casos. Diseñamos rutas de traspaso fluidas que transfieren contexto, intención del usuario e historial conversacional relevante a agentes humanos sin obligar a los clientes a repetirse. Esto mejora la eficiencia de soporte y preserva la confianza cuando la automatización alcanza sus límites.",
        "Además de la automatización orientada al cliente, podemos implementar funciones de asistencia a agentes que sugieren respuestas, recuperan conocimiento o resumen tickets en tiempo real. Estas capacidades ayudan a los equipos a resolver problemas complejos con mayor rapidez manteniendo la calidad. Combinar contención del bot con aumento de agentes suele ofrecer los mejores resultados globales de servicio.",
      ],
    },
    {
      title: "Pruebas, evaluación y control de calidad",
      paragraphs: [
        "Probamos el comportamiento del chatbot con conjuntos de conversación representativos que incluyen intenciones comunes, formulaciones ambiguas y solicitudes de casos límite. Los marcos de evaluación puntúan utilidad, precisión, tono y cumplimiento de políticas. Esta prueba estructurada revela debilidades de forma temprana y soporta iteración disciplinada antes de un release amplio.",
        "La calidad en producción se mantiene mediante bucles de revisión continuos. Los registros de conversación se muestrean regularmente, los modos de fallo se categorizan y las mejoras de prompts o recuperación se despliegan en actualizaciones controladas. Al tratar la evaluación como un proceso continuo, los equipos evitan la degradación de calidad y mejoran progresivamente el rendimiento de la automatización.",
      ],
    },
    {
      title: "Analítica e informes de impacto de negocio",
      paragraphs: [
        "La analítica significativa de chatbots conecta la actividad conversacional con resultados operativos y comerciales. Rastreamos métricas como contención, velocidad de resolución, calidad de escalación, tasas de calificación de leads e influencia posterior en el pipeline. Los dashboards se adaptan tanto a equipos técnicos como a stakeholders de negocio para que las decisiones se tomen con rapidez y contexto compartido.",
        "También construimos vistas de informes que destacan oportunidades de mejora, incluyendo intenciones principales no resueltas, clusters de respuestas de baja confianza y brechas de rendimiento por canal. Este insight permite trabajo de optimización focalizado en lugar de conjeturas amplias. Con el tiempo, la analítica se convierte en el motor que mantiene su programa de chatbot responsable y orientado a resultados.",
      ],
    },
    {
      title: "Optimización y expansión del programa",
      paragraphs: [
        "Tras el lanzamiento, priorizamos mejoras según el comportamiento de usuarios e impacto de negocio. Las actualizaciones habituales incluyen nuevas intenciones, fuentes de recuperación mejoradas, acciones de sistema más profundas y soporte de localización ampliado. Cada iteración se define con criterios de aceptación claros para mantener la velocidad de entrega sin sacrificar estabilidad.",
        "A medida que crece la confianza, las organizaciones pueden expandirse de un único asistente a un ecosistema coordinado de IA conversacional en soporte, ventas y operaciones internas. Guiamos decisiones de arquitectura y gobernanza para que esta expansión permanezca manejable. El resultado es un programa de chatbot escalable que sigue aportando valor a medida que evolucionan sus necesidades.",
      ],
    },
  ],
  benefits: [
    {
      icon: "💬",
      title: "Respuestas más rápidas al cliente",
      description:
        "Las conversaciones automatizadas ofrecen respuestas inmediatas y reducen los tiempos de espera en canales de alto volumen.",
    },
    {
      icon: "🎯",
      title: "Mayor calidad de leads",
      description:
        "Los chatbots califican prospectos con preguntas estructuradas y dirigen compradores listos a equipos comerciales.",
    },
    {
      icon: "🧠",
      title: "Conocimiento a escala",
      description:
        "Las respuestas basadas en recuperación mantienen la información consistente entre productos, políticas y equipos.",
    },
    {
      icon: "🤝",
      title: "Mejores traspasos humanos",
      description:
        "Las escalaciones con contexto rico ayudan a los agentes de soporte a resolver solicitudes complejas con mayor eficiencia.",
    },
    {
      icon: "🛡️",
      title: "Operaciones de IA más seguras",
      description:
        "Los guardrails y controles de políticas reducen el riesgo de cumplimiento en interacciones sensibles con clientes.",
    },
    {
      icon: "📊",
      title: "ROI medible",
      description:
        "Métricas claras conectan el rendimiento del chatbot con ahorro de costos, satisfacción y resultados de ingresos.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Descubrimiento de intenciones y flujos de trabajo",
      description:
        "Identificamos los casos de uso conversacionales de mayor valor, mapeamos los flujos de trabajo existentes de soporte y ventas y definimos métricas de éxito. Esta fase alinea a stakeholders de negocio y equipos técnicos sobre dónde debe comenzar la automatización y qué resultados determinarán la preparación para el lanzamiento. También capturamos señales de calidad conversacional, patrones de intenciones no resueltas y feedback operativo para que las mejoras iterativas se prioricen por impacto comercial medible en lugar de suposiciones.",
    },
    {
      step: 2,
      title: "Diseño conversacional y de recuperación",
      description:
        "Nuestro equipo diseña estructuras de diálogo, estilos de respuesta y arquitectura de recuperación usando sus fuentes de conocimiento de confianza. Establecemos comportamiento de respaldo y lógica de escalación de forma temprana, asegurando que el asistente permanezca útil cuando las preguntas son ambiguas o requieren intervención humana. También capturamos señales de calidad conversacional, patrones de intenciones no resueltas y feedback operativo para que las mejoras iterativas se prioricen por impacto comercial medible en lugar de suposiciones.",
    },
    {
      step: 3,
      title: "Integración y construcción",
      description:
        "Implementamos la lógica del chatbot e integramos con los sistemas de negocio relevantes como helpdesk, CRM y plataformas ecommerce. Los flujos de acción se aseguran con validación y auditabilidad para que el asistente pueda realizar tareas útiles de forma segura en entornos de producción. También capturamos señales de calidad conversacional, patrones de intenciones no resueltas y feedback operativo para que las mejoras iterativas se prioricen por impacto comercial medible en lugar de suposiciones.",
    },
    {
      step: 4,
      title: "Pruebas y lanzamiento",
      description:
        "Antes del go-live, ejecutamos evaluaciones estructuradas en escenarios conversacionales representativos de precisión, tono y cumplimiento. El lanzamiento es por fases, se monitoriza de cerca y se apoya con procedimientos de ajuste rápido para mantener la calidad del servicio a medida que aumenta el volumen de usuarios. También capturamos señales de calidad conversacional, patrones de intenciones no resueltas y feedback operativo para que las mejoras iterativas se prioricen por impacto comercial medible en lugar de suposiciones.",
    },
    {
      step: 5,
      title: "Optimización y expansión",
      description:
        "Analizamos datos de conversación, priorizamos mejoras y expandimos capacidades según impacto medible. Este ciclo continuo aumenta la calidad de contención, mejora los resultados de negocio y ayuda a que su sistema de IA conversacional madure en un activo fiable a largo plazo. También capturamos señales de calidad conversacional, patrones de intenciones no resueltas y feedback operativo para que las mejoras iterativas se prioricen por impacto comercial medible en lugar de suposiciones.",
    },
  ],
  faqs: [
    {
      question: "¿Puede el chatbot conectarse con nuestro helpdesk y CRM?",
      answer:
        "Sí. Integramos chatbots con helpdesk, CRM, ecommerce y plataformas de programación según las necesidades de su flujo de trabajo.",
    },
    {
      question: "¿Cómo reducen las respuestas incorrectas de la IA?",
      answer:
        "Usamos fundamentación por recuperación, controles de prompts, guardrails de políticas y evaluación continua para mejorar la fiabilidad de las respuestas.",
    },
    {
      question: "¿Puede el bot transferir conversaciones a agentes humanos?",
      answer:
        "Por supuesto. Diseñamos flujos de traspaso fluidos con transferencia completa de contexto para minimizar la frustración del cliente.",
    },
    {
      question: "¿Soportan experiencias de chatbot multilingües?",
      answer:
        "Sí. Podemos diseñar y desplegar flujos conversacionales multilingües con soporte de localización apropiado para cada canal.",
    },
    {
      question: "¿Cuánto suele durar la implementación?",
      answer:
        "Los despliegues iniciales en producción suelen tomar de cuatro a diez semanas según integraciones y requisitos de gobernanza.",
    },
    {
      question: "¿Podemos empezar con un caso de uso y expandir después?",
      answer:
        "Sí. Recomendamos un despliegue por fases comenzando con intenciones de alto impacto y expandiendo según resultados medidos.",
    },
    {
      question: "¿Proporcionan monitorización y optimización post-lanzamiento?",
      answer:
        "Sí. Ofrecemos análisis continuo, ajuste y soporte de hoja de ruta para mejorar la calidad y el impacto de negocio con el tiempo.",
    },
  ],
  relatedServices: [
    {
      slug: "ai-business-automation",
      title: "Automatización empresarial con IA",
      description:
        "Automatice procesos entre equipos con flujos de trabajo de IA que reducen el esfuerzo manual y mejoran la velocidad operativa.",
    },
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Construya aplicaciones web y portales que se integren sin fricción con flujos de trabajo de asistentes de IA.",
    },
    {
      slug: "saas-development",
      title: "Desarrollo SaaS",
      description:
        "Cree productos SaaS escalables con capacidades de IA embebidas y arquitectura operativa multi-tenant.",
    },
    {
      slug: "shopify-custom-apps",
      title: "Apps personalizadas Shopify",
      description:
        "Desarrolle apps personalizadas y herramientas de automatización orientadas al comercio y adaptadas a operaciones Shopify.",
    },
  ],
  cta: {
    title: "¿Quiere un chatbot con IA que realmente resuelva problemas?",
    description:
      "Permítanos construir un chatbot fiable que mejore la experiencia del cliente, apoye a su equipo y ofrezca un ROI medible.",
    primaryLabel: "Solicitar consulta gratuita",
    primaryHref: "/contact",
    secondaryLabel: "Ver todos los servicios",
    secondaryHref: "/services",
  },
};
