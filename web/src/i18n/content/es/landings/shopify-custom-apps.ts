import type { LandingTexts } from "@/lib/i18n/content/types";

export const shopifyCustomApps: LandingTexts = {
  h1: "Desarrollo de apps personalizadas para Shopify",
  subtitle:
    "Amplíe Shopify con apps a medida que automatizan flujos de trabajo, desbloquean nuevas experiencias y soportan el crecimiento.",
  heroBadge: "Ingeniería comercial personalizada",
  priceRange: "Desde $500",
  intro: [
    "Las apps de Shopify se vuelven esenciales cuando su negocio supera el comportamiento estándar de los plugins. A medida que crecen catálogos, equipos y canales, los procesos manuales y las herramientas desconectadas generan fricción que frena el crecimiento. Nuestro servicio de desarrollo de apps personalizadas para Shopify construye software enfocado en torno a sus operaciones reales, desde la sincronización de inventario y el enrutamiento de pedidos hasta experiencias de cliente personalizadas. En lugar de adaptar procesos a herramientas genéricas, diseñamos apps fiables que se alinean con su modelo de datos, flujos de trabajo y expectativas de rendimiento.",
    "Diseñamos apps personalizadas pensando en la mantenibilidad a largo plazo. Eso implica límites claros entre funciones del storefront, flujos de trabajo del admin y servicios backend, además de autenticación disciplinada y observabilidad desde el primer día. Evaluamos cuándo una app embebida en el admin, una extensión Shopify function o un servicio externo es la arquitectura adecuada para su caso de uso. Esto evita sobreconstruir y garantiza que la solución pueda manejar el crecimiento sin volverse frágil o costosa de mantener.",
    "Ya sea que necesite lógica de precios para escenarios B2B complejos, mecánicas avanzadas de bundles, orquestación de suscripciones o herramientas internas para un merchandising más ágil, entregamos aplicaciones listas para producción con documentación práctica. Nuestro equipo gestiona el descubrimiento técnico, la implementación, el QA y el soporte de despliegue para que su personal interno adopte la app con confianza. El resultado es un ecosistema Shopify adaptado a su modelo de negocio, que reduce la carga operativa y habilita nuevas oportunidades de ingresos.",
  ],
  sections: [
    {
      title: "Descubrimiento de casos de uso y viabilidad",
      paragraphs: [
        "Los proyectos de apps exitosos comienzan con claridad de proceso. Mapeamos sus flujos de trabajo actuales, puntos de dolor, rutas de excepción y métricas de éxito para definir dónde el software personalizado creará valor significativo. Esto incluye entrevistas con stakeholders de operaciones, merchandising, soporte y finanzas para asegurar que la app resuelva problemas transversales. Luego priorizamos oportunidades por impacto, complejidad y riesgo de dependencias antes de decidir el alcance final.",
        "Durante la evaluación de viabilidad, contrastamos las APIs de Shopify, los puntos de extensión y las restricciones de la plataforma con sus requisitos. Identificamos dónde las capacidades nativas son suficientes y dónde es necesaria lógica personalizada. Esto evita desarrollo innecesario y mantiene la arquitectura proporcional a los objetivos de negocio. El resultado es un blueprint práctico que detalla funciones, contratos de datos, permisos y etapas de despliegue que reducen la incertidumbre de entrega.",
      ],
    },
    {
      title: "Arquitectura de la app y diseño técnico",
      paragraphs: [
        "Las decisiones de arquitectura determinan tanto el rendimiento como la flexibilidad futura. Definimos con claridad los límites de servicio, los flujos de eventos y la propiedad de los datos para que la app permanezca predecible a medida que crece la complejidad. La UX de apps embebidas, los trabajos en segundo plano, el manejo de webhooks y las integraciones del storefront se diseñan como componentes coordinados en lugar de scripts aislados. Este enfoque sistémico soporta la fiabilidad y facilita la resolución de problemas bajo carga operativa real.",
        "La seguridad y el cumplimiento se integran en la etapa de diseño. Los scopes de OAuth se minimizan, los campos sensibles se gestionan con cuidado y los controles de acceso se modelan en torno a roles de usuario. También incluimos logging apto para auditoría y visibilidad de errores para que los equipos puedan diagnosticar incidentes con rapidez. Una base técnica sólida reduce el riesgo y hace que la expansión futura de funciones sea sustancialmente más sencilla.",
      ],
    },
    {
      title: "Apps embebidas en Shopify Admin",
      paragraphs: [
        "Muchos equipos necesitan mejores herramientas operativas directamente dentro de Shopify Admin. Construimos apps embebidas que agilizan tareas repetitivas como actualizaciones masivas de catálogo, reglas de precios, manejo de excepciones de pedidos y flujos de segmentación de clientes. Las interfaces se diseñan para velocidad, claridad y ejecución segura, ayudando al personal a completar acciones complejas con menos errores y menos cambios de contexto entre sistemas desconectados.",
        "Las apps embebidas también pueden centralizar datos de sistemas externos, ofreciendo a los equipos una vista operativa única mientras Shopify permanece como la plataforma comercial central. Diseñamos estos flujos con validación clara y feedback de estado para que los usuarios entiendan qué cambió, qué falló y qué requiere atención. Esta visibilidad operativa mejora la precisión y reduce la carga de soporte entre departamentos.",
      ],
    },
    {
      title: "Extensiones del storefront y lógica personalizada",
      paragraphs: [
        "Cuando los requisitos de experiencia de cliente superan las capacidades por defecto, implementamos lógica personalizada en el storefront con controles de rendimiento cuidadosos. Esto puede incluir bundling avanzado, configuración dinámica de productos, recomendaciones contextuales y reglas de merchandising personalizadas vinculadas a atributos o comportamiento del cliente. Nos aseguramos de que la funcionalidad personalizada mejore la conversión sin degradar la velocidad de página ni introducir dependencias frágiles.",
        "Nuestra estrategia de implementación enfatiza comportamiento de respaldo elegante y mejora progresiva. Si un servicio externo es lento o no está disponible, los flujos de compra principales siguen funcionando. Esta resiliencia es crítica en períodos de alto tráfico, donde una mejora rota puede convertirse rápidamente en un incidente de ingresos. Probamos casos límite a fondo y documentamos el comportamiento para que los equipos operen con confianza.",
      ],
    },
    {
      title: "Automatización y orquestación de flujos de trabajo",
      paragraphs: [
        "Las apps personalizadas frecuentemente ofrecen el mayor ROI mediante la automatización. Construimos motores de reglas y flujos de trabajo orientados a eventos que eliminan trabajo manual repetitivo de los equipos de merchandising, fulfillment y soporte. Ejemplos incluyen etiquetado automático, lógica de enrutamiento, disparadores de comunicación post-compra y sincronización de inventario entre canales. Estas automatizaciones reducen retrasos, mejoran la consistencia y liberan a los equipos para enfocarse en actividades de mayor valor.",
        "Diseñamos la automatización con transparencia y control, no como una caja negra. Los usuarios pueden ver reglas, anular resultados cuando sea necesario y entender por qué se tomaron decisiones. La monitorización y las alertas están incluidas para detectar fallos de forma temprana y gestionarlos con rapidez. Esta combinación de control y fiabilidad hace que la automatización sea práctica en entornos de negocio reales donde las excepciones son habituales.",
      ],
    },
    {
      title: "Integraciones con ERP, CRM y herramientas de datos",
      paragraphs: [
        "Las operaciones comerciales a menudo abarcan múltiples sistemas, y las integraciones débiles generan deriva de datos que daña los informes y la experiencia del cliente. Construimos conectores robustos entre Shopify y plataformas como ERP, CRM, PIM, fulfillment y stacks analíticos. Los mapeos de datos son explícitos, las reglas de transformación están documentadas y se implementa lógica de reintento para fiabilidad ante fallos intermitentes.",
        "El trabajo de integración también incluye estrategia de resolución de conflictos. Cuando los registros divergen, definimos reglas de fuente de verdad y flujos de reconciliación que mantienen la integridad a lo largo del tiempo. Esto reduce el trabajo de corrección manual y mejora la confianza en dashboards, pronósticos y comunicaciones con clientes. Una arquitectura de integración sólida convierte sistemas dispersos en una columna vertebral operativa coordinada.",
      ],
    },
    {
      title: "Rendimiento, escalabilidad y fiabilidad",
      paragraphs: [
        "Las apps personalizadas deben permanecer fiables a medida que aumentan el volumen de pedidos y el alcance de funciones. Diseñamos para escalabilidad con procesamiento basado en colas, uso eficiente de APIs y caché cuando corresponde. Las estrategias de rate limit y el comportamiento de backoff se integran en los flujos principales para evitar disrupciones durante picos de tráfico o ventanas intensas de procesamiento en segundo plano.",
        "La fiabilidad se refuerza mediante observabilidad, health checks y alertas accionables. Instrumentamos rutas críticas para que los equipos detecten anomalías de forma temprana y midan la calidad del servicio a lo largo del tiempo. Los playbooks de respuesta a incidentes y las estrategias de rollback se documentan para cambios de alto riesgo. Esta disciplina operativa mantiene estables los ecosistemas de apps personalizadas a medida que crece la demanda del negocio.",
      ],
    },
    {
      title: "Aseguramiento de calidad y gestión de releases",
      paragraphs: [
        "El QA para apps personalizadas va más allá de pruebas de UI del camino feliz. Validamos el manejo de webhooks, el comportamiento de trabajos en segundo plano, los límites de permisos y la recuperación ante fallos en condiciones realistas. Los escenarios de prueba incluyen payloads malformados, respuestas retrasadas de sistemas upstream y disponibilidad parcial de datos para asegurar que la app se comporte de forma segura cuando los sistemas externos son imperfectos.",
        "La planificación de release incluye despliegues por etapas, feature flags cuando es necesario y procedimientos claros de rollback. Coordinamos con los equipos operativos para que las actualizaciones de la app se alineen con calendarios de campaña y períodos pico de ventas. Esta estructura minimiza la disrupción del negocio y permite una respuesta rápida si el comportamiento se desvía de las expectativas tras el despliegue.",
      ],
    },
    {
      title: "Documentación y habilitación de equipos",
      paragraphs: [
        "El software personalizado crea valor duradero solo cuando los equipos pueden operarlo con confianza. Proporcionamos documentación técnica y de usuario concisa que cubre arquitectura, flujos de trabajo, permisos y procedimientos de recuperación. Las guías de admin se centran en el uso práctico, mientras que la documentación para desarrolladores soporta futuras mejoras y mantenimiento por equipos internos o externos.",
        "Las sesiones de habilitación están incluidas para guiar a los equipos por escenarios comunes, pasos de resolución de problemas y prácticas de gobernanza. Esta transferencia de conocimiento reduce la dependencia de contribuidores individuales y ayuda a las organizaciones a sostener el impulso tras el lanzamiento. Con propiedad clara y comprensión compartida, su inversión en apps personalizadas sigue generando valor a largo plazo.",
      ],
    },
    {
      title: "Soporte de hoja de ruta y mejora continua",
      paragraphs: [
        "Tras el release inicial, ayudamos a priorizar mejoras según feedback operativo e impacto comercial. Monitorizamos la adopción, identificamos puntos de fricción y convertimos insights en elementos estructurados del backlog. Este enfoque iterativo asegura que la app permanezca alineada con procesos de negocio en evolución en lugar de convertirse en software estático que pierde relevancia gradualmente.",
        "A medida que evolucionan las capacidades de Shopify, revisamos oportunidades para simplificar la arquitectura, reducir la carga de mantenimiento o mejorar el rendimiento mediante funciones más recientes de la plataforma. Este soporte orientado al futuro protege su inversión y mantiene las decisiones técnicas actuales. Con el tiempo, su ecosistema de apps se convierte en un activo estratégico que acelera el cambio en lugar de frenarlo.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🛠️",
      title: "Ajuste al negocio a medida",
      description:
        "Las apps se diseñan en torno a sus flujos de trabajo exactos, reduciendo trabajo manual y cuellos de botella operativos.",
    },
    {
      icon: "🔗",
      title: "Integraciones fiables",
      description:
        "La sincronización robusta de datos conecta Shopify con ERP, CRM, fulfillment y sistemas analíticos.",
    },
    {
      icon: "🤖",
      title: "Automatización a escala",
      description:
        "Las reglas orientadas a eventos automatizan tareas repetitivas preservando visibilidad y control de anulación humana.",
    },
    {
      icon: "📦",
      title: "Mejores operaciones de equipo",
      description:
        "Las herramientas embebidas en el admin agilizan procesos diarios de merchandising, soporte y gestión de pedidos.",
    },
    {
      icon: "🧠",
      title: "Arquitectura preparada para el futuro",
      description:
        "El diseño mantenible de la app soporta la expansión de funciones sin crear deuda técnica frágil.",
    },
    {
      icon: "🛡️",
      title: "Fiabilidad en producción",
      description:
        "La monitorización, el QA y las salvaguardas de release reducen incidentes durante períodos pico y actualizaciones importantes.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Mapeo de flujos de trabajo",
      description:
        "Documentamos los procesos actuales, puntos de dolor y objetivos de negocio para identificar dónde la lógica de apps personalizadas aporta más valor. Este descubrimiento alinea a los stakeholders en prioridades y crea una hoja de ruta de funciones clara con resultados medibles vinculados a eficiencia operativa e impacto en ingresos. Documentamos la propiedad operativa y los procedimientos de recuperación en cada release para que los equipos mantengan la confianza cuando los flujos de trabajo, las integraciones y el volumen de pedidos se vuelven más exigentes.",
    },
    {
      step: 2,
      title: "Arquitectura de la solución",
      description:
        "Nuestros ingenieros definen la arquitectura técnica, contratos de integración, scopes de seguridad y estrategia de despliegue. Elegimos la combinación adecuada de UI embebida, servicios en segundo plano y extensiones del storefront para que la solución sea performante, mantenible y alineada con las capacidades de la plataforma Shopify. Documentamos la propiedad operativa y los procedimientos de recuperación en cada release para que los equipos mantengan la confianza cuando los flujos de trabajo, las integraciones y el volumen de pedidos se vuelven más exigentes.",
    },
    {
      step: 3,
      title: "Desarrollo e integración",
      description:
        "Construimos funciones de la app de forma incremental, integrando con los sistemas relevantes y validando el comportamiento de forma continua. Las revisiones de código estructuradas, los controles de entorno y los estándares de logging aseguran que la app permanezca estable, comprensible y lista para iteración segura a medida que evolucionan los requisitos. Documentamos la propiedad operativa y los procedimientos de recuperación en cada release para que los equipos mantengan la confianza cuando los flujos de trabajo, las integraciones y el volumen de pedidos se vuelven más exigentes.",
    },
    {
      step: 4,
      title: "QA y despliegue controlado",
      description:
        "Las pruebas exhaustivas cubren flujos funcionales, casos límite y escenarios de recuperación ante fallos en APIs e interfaces de admin. Lanzamos mediante etapas controladas, monitorizamos el comportamiento en vivo y proporcionamos soporte rápido para asegurar una adopción fluida con mínima disrupción de las operaciones diarias. Documentamos la propiedad operativa y los procedimientos de recuperación en cada release para que los equipos mantengan la confianza cuando los flujos de trabajo, las integraciones y el volumen de pedidos se vuelven más exigentes.",
    },
    {
      step: 5,
      title: "Optimización y soporte",
      description:
        "Tras el lanzamiento, revisamos métricas de rendimiento, feedback de usuarios y resultados de negocio para priorizar mejoras. Este modelo de soporte iterativo mantiene la app alineada con flujos de trabajo en evolución, reduce la fricción operativa y protege el retorno a largo plazo de su inversión en software. Documentamos la propiedad operativa y los procedimientos de recuperación en cada release para que los equipos mantengan la confianza cuando los flujos de trabajo, las integraciones y el volumen de pedidos se vuelven más exigentes.",
    },
  ],
  faqs: [
    {
      question: "¿Cuándo necesito una app personalizada de Shopify en lugar de una app pública?",
      answer:
        "Si las apps existentes no pueden soportar de forma fiable su flujo de trabajo, integraciones o necesidades de rendimiento, una app personalizada suele ser la mejor opción a largo plazo.",
    },
    {
      question: "¿Pueden construir apps privadas para flujos de trabajo internos del equipo?",
      answer:
        "Sí. Construimos con frecuencia apps embebidas internas para agilizar operaciones, merchandising y tareas de gestión de pedidos.",
    },
    {
      question: "¿Integran apps personalizadas con sistemas ERP y CRM?",
      answer:
        "Sí. Diseñamos e implementamos integraciones seguras con sistemas externos preservando la consistencia y fiabilidad de los datos.",
    },
    {
      question: "¿Cómo gestionan los límites de la API de Shopify?",
      answer:
        "Implementamos batching, colas, lógica de reintento y diseño eficiente de consultas para operar de forma segura dentro de los límites de la plataforma.",
    },
    {
      question: "¿Pueden dar soporte a la app tras el lanzamiento?",
      answer:
        "Por supuesto. Ofrecemos mantenimiento continuo, iteración de funciones y soporte operativo según sus necesidades de crecimiento.",
    },
    {
      question: "¿La app afectará al rendimiento del storefront?",
      answer:
        "Diseñamos integraciones y extensiones con cuidado para minimizar la sobrecarga en tiempo de ejecución y proteger la velocidad orientada al cliente.",
    },
    {
      question: "¿Cuánto suele durar el desarrollo de una app personalizada?",
      answer:
        "Los plazos varían según la complejidad, pero la mayoría de proyectos abarcan de seis a dieciséis semanas, incluyendo descubrimiento, construcción, QA y despliegue.",
    },
  ],
  relatedServices: [
    {
      slug: "shopify-development",
      title: "Desarrollo Shopify",
      description:
        "Construya y optimice su storefront Shopify con arquitectura robusta e ingeniería orientada a la conversión.",
    },
    {
      slug: "shopify-store-design",
      title: "Diseño de tienda Shopify",
      description:
        "Cree experiencias Shopify pulidas que mejoren la confianza, la usabilidad y el rendimiento de conversión.",
    },
    {
      slug: "ai-business-automation",
      title: "Automatización empresarial con IA",
      description:
        "Automatice operaciones repetitivas y flujos de decisión con sistemas de procesos empresariales habilitados por IA.",
    },
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Desarrolle plataformas web personalizadas que soporten herramientas internas, integraciones y flujos de trabajo complejos.",
    },
  ],
  cta: {
    title: "¿Necesita funciones de Shopify que las apps públicas no pueden ofrecer?",
    description:
      "Permítanos diseñar y construir apps personalizadas de Shopify que agilicen operaciones y creen valor diferenciado para sus clientes.",
    primaryLabel: "Solicitar consulta gratuita",
    primaryHref: "/contact",
    secondaryLabel: "Ver todos los servicios",
    secondaryHref: "/services",
  },
};
