import type { LandingTexts } from "@/lib/i18n/content/types";
import { DEFAULT_CTA_ES } from "./shared";

export const aiBusinessAutomation: LandingTexts = {
  h1: "Servicios de automatización empresarial con IA",
  subtitle:
    "Automatice operaciones repetitivas con flujos de IA que mejoran velocidad, calidad y consistencia de decisiones.",
  heroBadge: "IA operativa",
  priceRange: "Desde $600",
  intro: [
    "La mayoría de las organizaciones saben dónde vive la ineficiencia: aprobaciones repetitivas, transferencia manual de datos, informes retrasados y manejo inconsistente de decisiones entre equipos. Nuestro servicio de automatización empresarial con IA ayuda a reemplazar estos cuellos de botella con flujos fiables que combinan razonamiento de IA, control basado en reglas e integración de sistemas. Nos centramos en oportunidades de automatización prácticas que reducen el tiempo de ciclo, mejoran la calidad del output y liberan a su equipo para dedicar más esfuerzo a trabajo de alto valor.",
    "La automatización efectiva no es solo selección de modelos. Requiere rediseño de procesos, gobernanza clara e integración fiable con las herramientas que sus equipos ya usan. Mapeamos flujos actuales, identificamos puntos de fallo y construimos rutas de automatización con supervisión humana donde sea necesario. Este enfoque equilibrado aumenta el throughput preservando responsabilidad, cumplimiento y confianza operativa entre departamentos.",
    "Desde triaje de soporte y operaciones financieras hasta habilitación de ventas e informes internos, implementamos programas de automatización con IA que producen resultados de negocio medibles. Obtiene una hoja de ruta, flujos listos para producción y sistemas de monitorización que hacen visible el rendimiento. A medida que su organización madura, ayudamos a expandir la automatización de forma segura, asegurando que cada nuevo despliegue aporte valor real en lugar de introducir complejidad no gestionada.",
  ],
  sections: [
    {
      title: "Descubrimiento de procesos y mapeo de oportunidades",
      paragraphs: [
        "Las iniciativas de automatización tienen éxito cuando comienzan con la verdad del proceso. Analizamos cómo el trabajo realmente fluye por su organización, incluyendo traspasos, excepciones, retrasos y patrones de retrabajo. Esta fase de descubrimiento incluye entrevistas, revisión de datos y observación de flujos para identificar dónde la IA puede mejorar velocidad o calidad sin crear nuevo riesgo operativo.",
        "Cada proceso candidato se puntúa por volumen, complejidad, impacto de negocio y sensibilidad de gobernanza. Priorizamos casos de uso con potencial claro de ROI y dependencias manejables, luego definimos criterios de éxito medibles. Este marco evita experimentación dispersa y canaliza el esfuerzo hacia programas de automatización que producen ganancias operativas visibles.",
      ],
    },
    {
      title: "Arquitectura de automatización y modelo de control",
      paragraphs: [
        "Diseñamos arquitectura de automatización que combina soporte de decisión de IA con controles deterministas. Las capas de reglas definen límites, disparadores de escalado y umbrales de confianza, asegurando que los flujos permanezcan predecibles cuando las entradas son ruidosas o ambiguas. Este modelo híbrido reduce riesgo de error mientras ofrece la velocidad y adaptabilidad que hacen valiosa a la IA.",
        "La planificación de arquitectura también cubre flujo de datos, límites de identidad, auditabilidad y requisitos de resiliencia. Documentamos dónde se inician acciones, cómo se registran decisiones y cuándo intervienen humanos. Estos controles son críticos para la confianza de las partes interesadas, especialmente en operaciones de finanzas, legal e impacto al cliente donde la trazabilidad es innegociable.",
      ],
    },
    {
      title: "Automatización de procesamiento de documentos y datos",
      paragraphs: [
        "Muchos equipos dedican tiempo significativo a extraer, validar y enrutar información de documentos e inputs no estructurados. Automatizamos esta carga con pipelines de IA que clasifican contenido, extraen campos clave y disparan acciones posteriores en sistemas de negocio. Esto reduce entrada manual de datos y acorta tiempos de ciclo para tareas operativas de alto volumen.",
        "Para mantener calidad, implementamos reglas de validación, puntuación de confianza y colas de excepción para revisión humana. Los equipos pueden verificar rápidamente casos inciertos en lugar de procesar todo manualmente. Con el tiempo, este modelo mejora tanto precisión como throughput mientras crea datasets limpios que respaldan mejor informes y toma de decisiones.",
      ],
    },
    {
      title: "Orquestación de flujos entre sistemas",
      paragraphs: [
        "El valor de la automatización aumenta cuando los flujos conectan herramientas entre departamentos. Construimos capas de orquestación que mueven datos y decisiones entre CRM, ERP, plataformas de soporte, herramientas de comunicación y apps internas. Esto elimina operaciones de copiar-pegar y reduce retrasos causados por sistemas desconectados y límites de propiedad poco claros.",
        "Nuestro enfoque de orquestación enfatiza idempotencia, lógica de reintento y visibilidad de estado para que los flujos automatizados permanezcan estables bajo condiciones reales de fallo. Los equipos pueden ver dónde está un proceso, qué falló y qué acción se requiere. Esta transparencia operativa es esencial para confianza y adopción sostenida.",
      ],
    },
    {
      title: "Flujos de decisión asistidos por IA",
      paragraphs: [
        "No todo proceso debe automatizarse por completo. Para escenarios complejos, implementamos flujos asistidos por IA que preparan recomendaciones, resúmenes o señales de riesgo mientras la aprobación final permanece con personal cualificado. Este patrón acelera ciclos de decisión y mejora consistencia sin eliminar el juicio humano necesario en resultados sensibles.",
        "Los sistemas de asistencia a decisiones se configuran con explicabilidad y alineación de políticas en mente. Estructuramos prompts y recuperación de evidencia para que los outputs sean transparentes y revisables. Los equipos ganan productividad sin sacrificar responsabilidad, y la dirección gana confianza de que la automatización respalda la gobernanza en lugar de debilitarla.",
      ],
    },
    {
      title: "Operaciones de soporte al cliente y servicio",
      paragraphs: [
        "Los equipos de soporte a menudo enfrentan alto volumen de solicitudes, patrones repetitivos de tickets y calidad de respuesta desigual. Automatizamos triaje, categorización, respuestas sugeridas y enrutamiento de escalado para mejorar velocidad y consistencia del servicio. Los flujos de IA pueden prellenar contexto, recomendar siguientes acciones y enrutar automáticamente problemas de alta prioridad según lógica de políticas.",
        "Estas mejoras reducen tiempo de manejo mientras permiten a los agentes centrarse en necesidades complejas del cliente. Integramos con sistemas de helpdesk y marcos de calidad para que la automatización mejore operaciones existentes en lugar de evitarlas. El resultado es mejor experiencia del cliente y gestión de carga de trabajo más sostenible para el equipo.",
      ],
    },
    {
      title: "Automatización de ventas y operaciones de ingresos",
      paragraphs: [
        "Los equipos de ingresos pierden impulso cuando el procesamiento de leads y los flujos de seguimiento son inconsistentes. Automatizamos puntuación de calificación, soporte de secuencias de outreach, resúmenes de preparación de reuniones y tareas de higiene de datos en CRM. Esto asegura que las oportunidades prometedoras reciban atención oportuna mientras se reduce la carga administrativa manual del personal de ventas.",
        "Las reglas de automatización se ajustan a sus etapas de embudo y expectativas de traspaso entre marketing, SDR y equipos de cuentas. También implementamos seguimiento de rendimiento para mostrar impacto en velocidad de conversión, calidad de pipeline y consistencia de seguimiento. Esto aporta estructura y predictibilidad a las operaciones de ingresos.",
      ],
    },
    {
      title: "Gobernanza, riesgo y controles de cumplimiento",
      paragraphs: [
        "La IA operativa debe gobernarse con políticas claras. Definimos marcos de control que cubren manejo de datos, permisos de acceso, restricciones de acción y requisitos de revisión. Las salvaguardas se integran en la lógica de flujo para que acciones restringidas se bloqueen o escalen automáticamente cuando no se cumplen condiciones de política.",
        "También establecemos protocolos de monitorización para deriva, anomalías y degradación de calidad. Alertas, logs de auditoría y flujos de incidentes hacen que los sistemas automatizados sean más fáciles de gestionar en entornos regulados o de alta responsabilidad. Una gobernanza sólida permite escalar reduciendo incertidumbre y manteniendo confianza de las partes interesadas.",
      ],
    },
    {
      title: "Medición y mejora continua",
      paragraphs: [
        "La automatización debe medirse por resultados de negocio, no solo por conteos de actividad. Definimos dashboards que siguen reducción de tiempo de ciclo, tasas de error, ganancias de capacidad y métricas de impacto al cliente relevantes para cada flujo. Esta visibilidad ayuda a los líderes a validar ROI y asignar recursos a las oportunidades de mayor retorno.",
        "Los bucles de mejora continua se integran en el modelo operativo. Análisis de excepciones, feedback de usuarios y tendencias de rendimiento alimentan un backlog de mejoras priorizado. Al iterar deliberadamente, las organizaciones evitan estancamiento y mantienen la automatización alineada con requisitos de proceso y objetivos estratégicos en evolución.",
      ],
    },
    {
      title: "Gestión del cambio y habilitación de adopción",
      paragraphs: [
        "La automatización falla cuando los equipos no saben cómo confiar o usar nuevos flujos. Respaldamos la adopción mediante formación específica por rol, documentación de procesos y modelos claros de propiedad. Los equipos aprenden cuándo confiar en resultados automatizados, cuándo intervenir y cómo escalar anomalías de forma efectiva.",
        "También ayudamos a la dirección a comunicar el propósito de la automatización como amplificación de capacidad en lugar de ansiedad por reemplazo. Esto mejora adopción y colaboración durante el despliegue. Con gestión del cambio sólida, los programas de automatización generan valor duradero y se convierten en parte del ritmo operativo normal.",
      ],
    },
  ],
  benefits: [
    {
      icon: "⏱️",
      title: "Ciclos de proceso más rápidos",
      description:
        "Los flujos automatizados reducen retrasos en traspasos y aceleran tareas operativas de alto volumen.",
    },
    {
      icon: "✅",
      title: "Mayor consistencia",
      description:
        "La ejecución de IA guiada por reglas mejora la calidad del output y reduce varianza entre equipos.",
    },
    {
      icon: "🔄",
      title: "Operaciones conectadas",
      description:
        "La orquestación de sistemas elimina trabajo manual de transferencia entre herramientas de negocio desconectadas.",
    },
    {
      icon: "👥",
      title: "Mejor capacidad de equipo",
      description:
        "El personal dedica menos tiempo a acciones repetitivas y más a trabajo estratégico de alto valor.",
    },
    {
      icon: "🛡️",
      title: "Automatización gobernada",
      description:
        "Controles de política, logs de auditoría y rutas de escalado mantienen los flujos de IA responsables y seguros.",
    },
    {
      icon: "📉",
      title: "ROI medible",
      description:
        "Los dashboards de rendimiento muestran ganancias de tiempo de ciclo, calidad y eficiencia de cada iniciativa de automatización.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Evaluación operativa",
      description:
        "Analizamos sus flujos de extremo a extremo, identificamos cuellos de botella y priorizamos oportunidades de automatización con impacto de negocio claro. Esta fase establece métricas base y alinea equipos sobre dónde la IA puede aportar valor inmediato manteniendo gobernanza e integridad del proceso. Cada paso incluye checkpoints con partes interesadas, validación de calidad de datos y revisión de impacto del cambio para que la automatización permanezca transparente, conforme y confiable entre equipos a medida que se expande la adopción. Los equipos reciben runbooks prácticos, umbrales de aprobación y definiciones de propiedad de escalado para que la fiabilidad operativa se preserve durante períodos pico y dependencias entre departamentos. Los equipos pueden así estandarizar la calidad de ejecución entre regiones y turnos.",
    },
    {
      step: 2,
      title: "Blueprint de automatización",
      description:
        "Nuestro equipo diseña arquitectura, reglas de control, lógica de escalado y planes de integración para casos de uso seleccionados. Definimos propiedad de datos, límites de riesgo y requisitos de monitorización para que la automatización se comporte de forma predecible en producción y permanezca manejable a medida que se expande el alcance. Cada paso incluye checkpoints con partes interesadas, validación de calidad de datos y revisión de impacto del cambio para que la automatización permanezca transparente, conforme y confiable entre equipos a medida que se expande la adopción. Los equipos reciben runbooks prácticos, umbrales de aprobación y definiciones de propiedad de escalado para que la fiabilidad operativa se preserve durante períodos pico y dependencias entre departamentos. Los equipos pueden así estandarizar la calidad de ejecución entre regiones y turnos.",
    },
    {
      step: 3,
      title: "Implementación e integración",
      description:
        "Construimos automatizaciones de flujo, conectamos sistemas de negocio y configuramos capas de decisión de IA con salvaguardas de política. La entrega incremental y las pruebas aseguran que cada componente sea fiable antes de un despliegue más amplio, reduciendo disrupción a operaciones en curso. Cada paso incluye checkpoints con partes interesadas, validación de calidad de datos y revisión de impacto del cambio para que la automatización permanezca transparente, conforme y confiable entre equipos a medida que se expande la adopción. Los equipos reciben runbooks prácticos, umbrales de aprobación y definiciones de propiedad de escalado para que la fiabilidad operativa se preserve durante períodos pico y dependencias entre departamentos. Los equipos pueden así estandarizar la calidad de ejecución entre regiones y turnos.",
    },
    {
      step: 4,
      title: "Despliegue y habilitación",
      description:
        "La automatización se lanza por fases controladas con formación por rol, documentación y soporte. Los equipos aprenden a operar nuevos flujos con confianza, incluyendo manejo de excepciones y procedimientos de escalado, lo que impulsa adopción más fuerte y confianza operativa. Cada paso incluye checkpoints con partes interesadas, validación de calidad de datos y revisión de impacto del cambio para que la automatización permanezca transparente, conforme y confiable entre equipos a medida que se expande la adopción. Los equipos reciben runbooks prácticos, umbrales de aprobación y definiciones de propiedad de escalado para que la fiabilidad operativa se preserve durante períodos pico y dependencias entre departamentos. Los equipos pueden así estandarizar la calidad de ejecución entre regiones y turnos.",
    },
    {
      step: 5,
      title: "Optimización y expansión",
      description:
        "Monitorizamos métricas de resultados, revisamos patrones de excepción y priorizamos mejoras que aumentan el impacto. A medida que crece la confianza, extendemos la automatización a procesos adicionales preservando disciplina de gobernanza y alineación con prioridades de negocio en evolución. Cada paso incluye checkpoints con partes interesadas, validación de calidad de datos y revisión de impacto del cambio para que la automatización permanezca transparente, conforme y confiable entre equipos a medida que se expande la adopción. Los equipos reciben runbooks prácticos, umbrales de aprobación y definiciones de propiedad de escalado para que la fiabilidad operativa se preserve durante períodos pico y dependencias entre departamentos. Los equipos pueden así estandarizar la calidad de ejecución entre regiones y turnos.",
    },
  ],
  faqs: [
    {
      question: "¿Qué funciones de negocio pueden beneficiarse primero de la automatización con IA?",
      answer:
        "Soporte, operaciones financieras, operaciones de ventas y flujos con muchos documentos suelen ser puntos de partida sólidos con ROI claro.",
    },
    {
      question: "¿Reemplazan equipos con automatización?",
      answer:
        "No. Nuestro enfoque es amplificación de capacidad y mejora de consistencia, manteniendo supervisión humana para decisiones sensibles.",
    },
    {
      question: "¿Puede la automatización integrarse con nuestras herramientas existentes?",
      answer:
        "Sí. Diseñamos flujos que conectan con CRM, ERP, helpdesk, comunicación y sistemas internos personalizados.",
    },
    {
      question: "¿Cómo manejan requisitos de cumplimiento y gobernanza?",
      answer:
        "Implementamos controles de política, límites de acceso, logs de auditoría y mecanismos de escalado alineados con sus requisitos.",
    },
    {
      question: "¿Cuánto dura un proyecto típico de automatización?",
      answer:
        "Los flujos iniciales de alto impacto suelen entregarse en seis a doce semanas, según complejidad de integración.",
    },
    {
      question: "¿Podemos empezar en pequeño antes de un despliegue completo?",
      answer:
        "Por supuesto. Recomendamos despliegue por fases con hitos medibles antes de expandir a procesos adicionales.",
    },
    {
      question: "¿Ofrecen soporte de optimización continua?",
      answer:
        "Sí. Ofrecemos monitorización continua, planificación de mejoras y soporte de gobernanza para sostener valor a largo plazo.",
    },
  ],
  relatedServices: [
    {
      slug: "ai-chatbot-development",
      title: "Desarrollo de chatbots con IA",
      description:
        "Construya sistemas de IA conversacional que mejoren calidad de respuesta de soporte y eficiencia de manejo de leads.",
    },
    {
      slug: "web-application-development",
      title: "Desarrollo de aplicaciones web",
      description:
        "Desarrolle plataformas web personalizadas que impulsen orquestación de flujos, herramientas internas y automatización de procesos.",
    },
    {
      slug: "saas-development",
      title: "Desarrollo SaaS",
      description:
        "Cree productos SaaS escalables con arquitectura preparada para automatización y funciones de inteligencia operativa.",
    },
    {
      slug: "shopify-custom-apps",
      title: "Apps personalizadas para Shopify",
      description:
        "Automatice operaciones de ecommerce y construya flujos Shopify a medida con ingeniería de apps personalizadas.",
    },
  ],
  cta: {
    title: "¿Listo para eliminar cuellos de botella operativos con IA?",
    description:
        "Diseñemos y despleguemos flujos de automatización con IA que mejoren velocidad, consistencia y rendimiento de negocio.",
    ...DEFAULT_CTA_ES,
  },
};
