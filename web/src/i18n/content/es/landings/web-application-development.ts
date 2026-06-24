import type { LandingTexts } from "@/lib/i18n/content/types";
import { DEFAULT_CTA_ES } from "./shared";

export const webApplicationDevelopment: LandingTexts = {
  h1: "Servicios de desarrollo de aplicaciones web",
  subtitle:
    "Diseñe y construya aplicaciones web seguras y escalables adaptadas a sus flujos de trabajo y objetivos de crecimiento.",
  heroBadge: "Ingeniería de producto personalizado",
  priceRange: "Desde $400",
  intro: [
    "Las aplicaciones web personalizadas se convierten en activos estratégicos cuando se diseñan en torno a flujos de trabajo reales de negocio y objetivos de producto a largo plazo. Nuestro servicio de desarrollo de aplicaciones web ayuda a las organizaciones a ir más allá de hojas de cálculo frágiles, herramientas desconectadas y limitaciones de soluciones estándar construyendo software que encaja con cómo trabajan realmente equipos y clientes. Combinamos estrategia de producto, UX, ingeniería y disciplina de entrega para crear aplicaciones fiables, mantenibles y listas para escalar con sus operaciones.",
    "Cada compromiso comienza con claridad de resultados. Alineamos a las partes interesadas en roles de usuario, cuellos de botella de proceso, dependencias de integración y criterios de éxito medibles antes de escribir código de producción. Esta fase de planificación reduce incertidumbre y asegura que las decisiones de arquitectura respalden tanto la entrega inmediata como la expansión futura. Ya sea que necesite una plataforma operativa interna, un portal orientado al cliente o una aplicación B2B con flujos complejos, construimos con gobernanza práctica y realidades operativas en mente.",
    "Nuestros equipos ofrecen soporte integral desde el descubrimiento hasta la optimización post-lanzamiento. Enfatizamos arquitectura limpia, implementación segura y prácticas de calidad sólidas para que su aplicación rinda de forma consistente bajo uso real. Con handoff estructurado y opciones de soporte continuo, su organización obtiene software que impulsa eficiencia hoy y permanece adaptable a medida que evolucionan los requisitos. El resultado es una base de aplicación web construida para impacto de negocio sostenido, no valor temporal de solución provisional.",
  ],
  sections: [
    {
      title: "Descubrimiento de producto y definición de alcance",
      paragraphs: [
        "Los grandes resultados de aplicación comienzan con un encuadre preciso del problema. Trabajamos con partes interesadas para definir usuarios objetivo, trabajos clave a realizar, restricciones de proceso y objetivos de negocio medibles. Las sesiones de descubrimiento clarifican qué debe lanzarse primero, qué puede fasearse después y dónde el riesgo de integración o cumplimiento puede afectar el cronograma. Esta alineación evita redefinición costosa a mitad de proyecto.",
        "Traducimos insights de descubrimiento en un alcance de producto estructurado con capacidades priorizadas, historias de usuario y criterios de aceptación. Los equipos obtienen una hoja de ruta compartida que conecta hitos de entrega técnica con resultados de negocio. Esta claridad mejora la velocidad de decisión y mantiene el desarrollo enfocado en funciones que aportan valor operativo o de ingresos real.",
      ],
    },
    {
      title: "Arquitectura de sistema y planificación tecnológica",
      paragraphs: [
        "La arquitectura determina qué tan bien su aplicación maneja crecimiento, complejidad y cambio. Diseñamos sistemas con límites claros entre experiencia front-end, servicios backend, capas de datos y flujos de integración. Esta estructura modular respalda mantenibilidad, pruebas y colaboración de equipos mientras reduce el riesgo de componentes fuertemente acoplados que se vuelven difíciles de evolucionar.",
        "La planificación tecnológica se guía por requisitos, no por perseguir tendencias. Evaluamos ajuste de framework, restricciones de infraestructura, capacidad del equipo y escala esperada antes de finalizar decisiones de stack. Preocupaciones de seguridad, rendimiento y observabilidad se integran en la arquitectura desde el principio para que la fiabilidad no dependa de retrofit post-lanzamiento.",
      ],
    },
    {
      title: "Diseño UX y modelado de interacción",
      paragraphs: [
        "Las aplicaciones web tienen éxito cuando los usuarios pueden completar tareas importantes con rapidez y confianza. Diseñamos interfaces en torno a flujos de tareas, permisos de rol y prioridad de información para que cada pantalla respalde acciones siguientes claras. Wireflows y modelos de interacción ayudan a validar suposiciones temprano, reduciendo esfuerzo de rediseño de última hora y mejorando alineación entre producto e ingeniería.",
        "Nuestro proceso UX equilibra eficiencia con usabilidad en contextos diversos de usuario, desde flujos de escritorio intensivos en admin hasta interacciones móviles amigables para trabajo de campo. Definimos comportamiento de componentes, manejo de errores y estados vacíos explícitamente para reducir ambigüedad durante la implementación. Esta disciplina mejora adopción y reduce carga de soporte después del lanzamiento.",
      ],
    },
    {
      title: "Ingeniería front-end y sistemas UI",
      paragraphs: [
        "La implementación front-end enfatiza rendimiento, accesibilidad y arquitectura de componentes mantenible. Construimos patrones UI reutilizables con contratos claros para que los equipos iteren rápidamente sin introducir comportamiento inconsistente. Estrategias de gestión de estado, validación y obtención de datos se seleccionan por claridad y fiabilidad, especialmente en flujos multi-paso complejos.",
        "También optimizamos para condiciones de uso reales incluyendo dispositivos más lentos, conectividad variable e interfaces de datos de alta densidad. Carga progresiva, estrategia de caché y comportamiento responsivo se ajustan para velocidad y usabilidad prácticas. El resultado es una interfaz pulida que permanece fiable bajo presión operativa.",
      ],
    },
    {
      title: "Servicios backend y diseño de API",
      paragraphs: [
        "Los sistemas backend se diseñan para respaldar lógica de negocio, integridad de datos e integración segura a escala. Diseñamos APIs con contratos explícitos, validación robusta y estrategia clara de versionado para que aplicaciones cliente y sistemas externos evolucionen de forma segura. Esta disciplina de API reduce roturas de integración y simplifica mantenimiento a largo plazo.",
        "La implementación de servicios incluye autenticación, autorización, auditabilidad y manejo de fallos apropiados para su perfil de riesgo. Procesamiento en segundo plano, flujos de eventos y salvaguardas transaccionales se añaden donde la complejidad del proceso lo requiere. Un diseño backend sólido asegura que rendimiento y corrección permanezcan estables a medida que aumentan tráfico y alcance de funciones.",
      ],
    },
    {
      title: "Modelado de datos y estrategia de persistencia",
      paragraphs: [
        "Un diseño de datos limpio es esencial para comportamiento fiable de la aplicación e informes útiles. Modelamos entidades, relaciones y estados del ciclo de vida para reflejar reglas de negocio con precisión manteniendo patrones de consulta eficientes. La estrategia de migración y planificación de evolución de esquema se incluyen para que los equipos añadan funcionalidad sin desestabilizar flujos de datos existentes.",
        "También abordamos requisitos de gobernanza como retención de datos, controles de acceso y visibilidad de auditoría cuando corresponde. Esto asegura que su aplicación respalde cumplimiento y transparencia operativa desde el primer día. Una capa de datos duradera permite mejor analítica, resolución de problemas más fácil y menor costo de cambio futuro.",
      ],
    },
    {
      title: "Integraciones y conectividad de flujos de trabajo",
      paragraphs: [
        "La mayoría de aplicaciones de negocio dependen de servicios externos, desde proveedores de identidad y pasarelas de pago hasta CRMs y sistemas ERP. Implementamos integraciones con lógica de reintento clara, operaciones idempotentes y observabilidad de estado para que los fallos se manejen de forma predecible. Esto reduce intervención manual y mejora confianza en flujos automatizados.",
        "La planificación de integración también incluye decisiones de propiedad y fuente de verdad para evitar actualizaciones conflictivas entre sistemas. Documentamos reglas de transformación, límites de validación y rutas de escalado para manejo de excepciones. Una arquitectura de conectividad sólida convierte su aplicación web en un hub operativo fiable en lugar de otra herramienta aislada.",
      ],
    },
    {
      title: "Seguridad, cumplimiento y gestión de riesgos",
      paragraphs: [
        "La seguridad se trata como requisito central del producto, no como checklist cerca del release. Implementamos patrones de acceso de mínimo privilegio, manejo seguro de secretos, validación de entrada y controles de defensa en profundidad en todo el stack. El modelado de amenazas ayuda a identificar escenarios de alto riesgo temprano para que las mitigaciones se diseñen intencionalmente en lugar de reactivamente.",
        "Para flujos regulados, alineamos la implementación con expectativas de cumplimiento relevantes y requisitos de evidencia. Logging, trazas de auditoría y mecanismos de aplicación de políticas se incluyen donde sea necesario. Esta postura de seguridad proactiva protege usuarios, reduce exposición a incidentes y fortalece la confianza de las partes interesadas en la preparación para producción.",
      ],
    },
    {
      title: "Pruebas, QA e ingeniería de release",
      paragraphs: [
        "El aseguramiento de calidad combina pruebas automatizadas con validación orientada a escenarios de flujos críticos. Probamos lógica de negocio, permisos, casos límite e integraciones en entornos representativos para reducir riesgo de lanzamiento. Los pipelines CI aplican controles de calidad y detectan regresiones temprano, ayudando a los equipos a enviar más rápido con menos defectos en producción.",
        "La ingeniería de release incluye automatización de despliegue, comprobaciones de paridad de entornos y estrategia de rollback. Planificamos el go-live en torno a ventanas operativas y monitorizamos el uso inicial de cerca. Este modelo de release estructurado reduce disrupción y respalda adopción confiada por equipos internos y usuarios externos por igual.",
      ],
    },
    {
      title: "Optimización post-lanzamiento y evolución del producto",
      paragraphs: [
        "El lanzamiento es el comienzo del aprendizaje del producto, no la meta final. Establecemos bucles de feedback usando analítica, input de usuarios e insights de soporte para priorizar mejoras de alto impacto. Las hojas de ruta de mejora se vinculan a resultados medibles como velocidad de finalización de tareas, reducción de errores e impacto en retención de clientes.",
        "A medida que su organización crece, ayudamos a escalar arquitectura, expandir capacidades y mejorar rendimiento operativo sin sacrificar mantenibilidad. Documentación y transferencia de conocimiento aseguran que su equipo conserve propiedad mientras sigue beneficiándose de soporte experto cuando sea necesario. Este enfoque mantiene su aplicación adaptable y valiosa a largo plazo.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🏗️",
      title: "Construido para su flujo de trabajo",
      description:
        "La arquitectura personalizada se alinea con sus procesos de negocio en lugar de forzar equipos a herramientas genéricas rígidas.",
    },
    {
      icon: "🔐",
      title: "Seguro por diseño",
      description:
        "Los controles de seguridad se integran durante todo el desarrollo para proteger usuarios, datos y operaciones.",
    },
    {
      icon: "📈",
      title: "Base escalable",
      description:
        "Los sistemas modulares respaldan crecimiento en usuarios, volumen de datos y complejidad de funciones sin reescrituras mayores.",
    },
    {
      icon: "🔌",
      title: "Operaciones integradas",
      description:
        "APIs y conectores fiables unifican flujos entre CRM, ERP y otros sistemas centrales de negocio.",
    },
    {
      icon: "🧪",
      title: "Mayor confianza en la entrega",
      description:
        "Pruebas estructuradas y prácticas de release reducen defectos y mejoran estabilidad en producción.",
    },
    {
      icon: "🔁",
      title: "Mejora continua del producto",
      description:
        "La optimización post-lanzamiento asegura que su aplicación siga generando valor a medida que evolucionan las necesidades.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Descubrimiento y planificación",
      description:
        "Definimos necesidades de usuario, objetivos de negocio y requisitos de flujo mediante descubrimiento estructurado. Esta fase produce una hoja de ruta priorizada, métricas de éxito claras y alcance de entrega que alinea a las partes interesadas antes de que comience la ingeniería. También validamos preparación de adopción con habilitación por rol y salvaguardas operativas para que los equipos usen nuevas capacidades con confianza a medida que crece la complejidad del proceso. Mapeamos el impacto del release a KPIs operativos y métricas de productividad de usuario para que las mejoras aporten mejora medible en lugar de añadir complejidad innecesaria al proceso.",
    },
    {
      step: 2,
      title: "Arquitectura y diseño UX",
      description:
        "Nuestro equipo diseña arquitectura de sistema, modelos de datos y flujos de usuario para respaldar rendimiento, seguridad y usabilidad. Prototipos tempranos y planificación de interfaz reducen ambigüedad y ayudan a validar suposiciones antes de comprometer esfuerzo completo de desarrollo. También validamos preparación de adopción con habilitación por rol y salvaguardas operativas para que los equipos usen nuevas capacidades con confianza a medida que crece la complejidad del proceso. Mapeamos el impacto del release a KPIs operativos y métricas de productividad de usuario para que las mejoras aporten mejora medible en lugar de añadir complejidad innecesaria al proceso.",
    },
    {
      step: 3,
      title: "Desarrollo full-stack",
      description:
        "Construimos componentes front-end y backend en sprints iterativos, integrando servicios externos y aplicando estándares de calidad continuamente. El progreso permanece transparente y cada incremento de release se evalúa contra criterios de aceptación y objetivos de negocio. También validamos preparación de adopción con habilitación por rol y salvaguardas operativas para que los equipos usen nuevas capacidades con confianza a medida que crece la complejidad del proceso. Mapeamos el impacto del release a KPIs operativos y métricas de productividad de usuario para que las mejoras aporten mejora medible en lugar de añadir complejidad innecesaria al proceso.",
    },
    {
      step: 4,
      title: "Pruebas y lanzamiento en producción",
      description:
        "El QA exhaustivo verifica comportamiento funcional, manejo de casos límite y fiabilidad operativa en todos los entornos. El despliegue se gestiona mediante procedimientos de release estructurados con monitorización, planificación de respaldo y soporte de respuesta rápida durante el uso inicial en producción. También validamos preparación de adopción con habilitación por rol y salvaguardas operativas para que los equipos usen nuevas capacidades con confianza a medida que crece la complejidad del proceso. Mapeamos el impacto del release a KPIs operativos y métricas de productividad de usuario para que las mejoras aporten mejora medible en lugar de añadir complejidad innecesaria al proceso.",
    },
    {
      step: 5,
      title: "Optimización y escalado",
      description:
        "Después del lanzamiento, analizamos datos de uso y feedback de usuarios para priorizar refinamientos. Seguimos mejorando rendimiento, eficiencia de flujo y profundidad de funciones para que la aplicación permanezca alineada con el crecimiento del negocio y demandas operativas en evolución. También validamos preparación de adopción con habilitación por rol y salvaguardas operativas para que los equipos usen nuevas capacidades con confianza a medida que crece la complejidad del proceso. Mapeamos el impacto del release a KPIs operativos y métricas de productividad de usuario para que las mejoras aporten mejora medible en lugar de añadir complejidad innecesaria al proceso.",
    },
  ],
  faqs: [
    {
      question: "¿Pueden construir tanto herramientas internas como apps web orientadas al cliente?",
      answer:
        "Sí. Desarrollamos plataformas operativas internas, portales de clientes externos y soluciones híbridas con servicios compartidos.",
    },
    {
      question: "¿Trabajan con sistemas y bases de datos existentes?",
      answer:
        "Por supuesto. Podemos modernizar y ampliar sistemas existentes integrándonos con su panorama actual de datos y herramientas.",
    },
    {
      question: "¿Cómo aseguran la seguridad de la aplicación?",
      answer:
        "Implementamos prácticas de desarrollo seguro incluyendo acceso basado en roles, capas de validación, monitorización y decisiones de arquitectura conscientes de amenazas.",
    },
    {
      question: "¿Qué metodología de desarrollo siguen?",
      answer:
        "Usamos entrega iterativa con hitos claros, demos frecuentes y priorización transparente del backlog.",
    },
    {
      question: "¿Pueden proporcionar mantenimiento continuo después del lanzamiento?",
      answer:
        "Sí. Ofrecemos soporte, optimización y servicios de expansión de funciones según su hoja de ruta a largo plazo.",
    },
    {
      question: "¿Cuánto dura un proyecto típico de app web?",
      answer:
        "Los plazos varían según alcance, pero muchos proyectos van de ocho a veinticuatro semanas desde descubrimiento hasta lanzamiento.",
    },
    {
      question: "¿Recibiremos documentación y soporte de handoff?",
      answer:
        "Sí. Proporcionamos documentación práctica y habilitación para ayudar a su equipo a gestionar y evolucionar la aplicación con confianza.",
    },
  ],
  relatedServices: [
    {
      slug: "saas-development",
      title: "Desarrollo SaaS",
      description:
        "Construya plataformas SaaS multi-tenant con arquitectura segura, sistemas de facturación y analítica de producto.",
    },
    {
      slug: "marketplace-development",
      title: "Desarrollo de marketplaces",
      description:
        "Desarrolle ecosistemas de marketplace escalables con flujos de vendedores e infraestructura de transacciones.",
    },
    {
      slug: "ai-business-automation",
      title: "Automatización empresarial con IA",
      description:
        "Mejore operaciones con automatización de flujos impulsada por IA y sistemas de soporte a decisiones gobernados.",
    },
    {
      slug: "ai-chatbot-development",
      title: "Desarrollo de chatbots con IA",
      description:
        "Lance asistentes conversacionales que se integren con flujos de su aplicación web y stack de soporte.",
    },
  ],
  cta: {
    title: "¿Planifica una iniciativa de aplicación web personalizada?",
    description:
      "Hable con nuestro equipo sobre construir una plataforma web segura y escalable adaptada a sus flujos de negocio.",
    ...DEFAULT_CTA_ES,
  },
};
