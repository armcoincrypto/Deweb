import type { LegalContentPack } from "@/lib/i18n/content/types";

const LEGAL_CONTACT_EMAIL = "gagikpoghosyandev@gmail.com";

export const legal: LegalContentPack = {
  privacyPolicySections: [
    {
      title: "Introducción",
      paragraphs: [
        `DEWEB («nosotros», «nos», «nuestro») opera dewebam.com — un marketplace de TI y estudio de desarrollo que conecta empresas con desarrolladores verificados para proyectos de Shopify, IA, SaaS, web y marketplaces.`,
        "Esta Política de privacidad explica qué datos personales recopilamos, cómo los usamos, cuánto tiempo los conservamos y qué derechos tiene usted. Al usar nuestro sitio web o crear una cuenta, acepta esta política.",
      ],
    },
    {
      id: "information-we-collect",
      title: "1. Información que recopilamos",
      list: [
        "Datos de cuenta: nombre de usuario, dirección de correo electrónico, contraseña (almacenada cifrada), detalles del perfil e información opcional de vendedor o empresa.",
        "Datos de proyectos y leads: mensajes de formularios de contacto, consultas de servicios, ofertas, propuestas, anuncios y contenido de chats de acuerdos.",
        "Comunicaciones: mensajes de soporte, verificación de correo electrónico y preferencias opcionales de newsletter.",
        "Datos técnicos: dirección IP, tipo de navegador, información del dispositivo, páginas visitadas y preferencias de cookies.",
        "Interacciones con IA y blog: si utiliza nuestras herramientas de contacto o consulta, procesamos el texto que envía para dirigir su solicitud.",
      ],
    },
    {
      id: "how-we-use",
      title: "2. Cómo usamos su información",
      list: [
        "Crear y proteger su cuenta.",
        "Emparejar clientes con desarrolladores y procesar consultas de proyectos.",
        "Responder a solicitudes de contacto, tickets de soporte y envíos de leads.",
        "Enviar correos relacionados con el servicio, como verificación y restablecimiento de contraseña.",
        "Mejorar el rendimiento, la seguridad y la experiencia del sitio web.",
        "Cumplir obligaciones legales y prevenir fraude o abuso.",
      ],
    },
    {
      id: "legal-basis",
      title: "3. Base legal del tratamiento",
      paragraphs: [
        "Cuando corresponda según el RGPD y leyes similares, tratamos los datos con base en: (a) ejecución de un contrato cuando utiliza nuestra plataforma; (b) intereses legítimos en operar y proteger nuestros servicios; (c) su consentimiento para marketing opcional o cookies no esenciales; y (d) obligaciones legales.",
      ],
    },
    {
      id: "sharing",
      title: "4. Compartición de datos",
      paragraphs: [
        "No vendemos sus datos personales. Podemos compartir información solo cuando sea necesario:",
      ],
      list: [
        "Con desarrolladores o clientes involucrados en su proyecto o chat de acuerdo.",
        "Con proveedores de infraestructura (hosting, envío de correo) bajo obligaciones de confidencialidad.",
        "Cuando lo exija la ley, una orden judicial o para proteger derechos y seguridad.",
        "En relación con una transferencia empresarial, con aviso cuando lo exija la ley.",
      ],
    },
    {
      id: "ai",
      title: "5. Funciones asistidas por IA",
      paragraphs: [
        "DEWEB puede usar herramientas de IA para clasificar consultas, sugerir categorías o asistir flujos internos de contenido. No usamos los datos privados de su cuenta para entrenar modelos de IA públicos. El contenido de blog generado por IA es revisado por administradores antes de su publicación.",
      ],
    },
    {
      id: "security",
      title: "6. Seguridad",
      paragraphs: [
        "Usamos cifrado HTTPS, contraseñas hasheadas, controles de acceso y protección de credenciales sensibles en el servidor. Ningún sistema en línea es 100 % seguro; trabajamos continuamente para reducir el riesgo con prácticas estándar del sector.",
      ],
    },
    {
      id: "retention",
      title: "7. Conservación de datos",
      paragraphs: [
        "Conservamos datos de cuenta y consultas mientras su cuenta esté activa y durante un período razonable después para soporte, fines legales y resolución de disputas. Puede solicitar la eliminación sujeta a requisitos legales de conservación.",
      ],
    },
    {
      id: "rights",
      title: "8. Sus derechos",
      list: [
        "Acceder a los datos personales que tenemos sobre usted.",
        "Solicitar la corrección de información inexacta.",
        "Solicitar la eliminación de los datos de su cuenta cuando corresponda.",
        "Retirar el consentimiento de marketing en cualquier momento.",
        "Oponerse o restringir ciertos tratamientos cuando esté legalmente disponible.",
        "Presentar una reclamación ante su autoridad local de protección de datos.",
      ],
      paragraphs: [
        `Para ejercer estos derechos, contáctenos en ${LEGAL_CONTACT_EMAIL} o a través de la página de Contacto en dewebam.com.`,
      ],
    },
    {
      id: "children",
      title: "9. Privacidad de menores",
      paragraphs: [
        "DEWEB no está destinado a usuarios menores de 18 años. No recopilamos datos de menores de forma consciente. Si cree que un menor nos ha proporcionado datos, contáctenos y los eliminaremos.",
      ],
    },
    {
      id: "international",
      title: "10. Usuarios internacionales",
      paragraphs: [
        "DEWEB atiende a clientes en todo el mundo. Sus datos pueden procesarse en países donde operan nuestros servidores o proveedores de servicios. Tomamos medidas para proteger los datos independientemente de la ubicación.",
      ],
    },
    {
      id: "changes",
      title: "11. Cambios en esta política",
      paragraphs: [
        "Podemos actualizar esta Política de privacidad periódicamente. La fecha de «Última actualización» en la parte superior cambiará cuando lo hagamos. El uso continuado del sitio tras los cambios significa que acepta la política actualizada.",
      ],
    },
    {
      id: "contact",
      title: "12. Contacto",
      paragraphs: [
        `Preguntas sobre privacidad: escriba a ${LEGAL_CONTACT_EMAIL} o use el formulario de Contacto en https://dewebam.com/en/contact.`,
      ],
    },
  ],
  cookiePolicySections: [
    {
      title: "Introducción",
      paragraphs: [
        "Esta Política de cookies explica cómo DEWEB (dewebam.com) usa cookies y tecnologías similares como el almacenamiento local. Debe leerse junto con nuestra Política de privacidad.",
      ],
    },
    {
      id: "what-are-cookies",
      title: "1. ¿Qué son las cookies?",
      paragraphs: [
        "Las cookies son pequeños archivos de texto almacenados en su dispositivo cuando visita un sitio web. Ayudan al sitio a recordar sus preferencias, mantenerle conectado y entender cómo se usa el sitio.",
      ],
    },
    {
      id: "required",
      title: "2. Cookies y almacenamiento estrictamente necesarios",
      paragraphs: [
        "Son necesarios para que el sitio web funcione. Sin ellos no puede registrarse, iniciar sesión ni usar las funciones de cuenta.",
      ],
      list: [
        "Token de autenticación (localStorage: deweb_token) — le mantiene conectado de forma segura.",
        "Preferencia de consentimiento de cookies (localStorage: deweb_cookie_consent) — recuerda su elección de cookies.",
        "Seguridad de sesión y equilibrio de carga mediante nuestra infraestructura de hosting.",
      ],
    },
    {
      id: "functional",
      title: "3. Preferencias funcionales",
      list: [
        "Preferencia de idioma o configuración regional para navegar en inglés, español, ruso o armenio.",
        "Estado de la interfaz necesario para formularios y navegación.",
      ],
    },
    {
      id: "analytics",
      title: "4. Cookies de analítica (opcionales)",
      paragraphs: [
        "Si elige «Aceptar todas las cookies», podemos usar analítica anónima para entender el rendimiento de las páginas y mejorar el producto. Estas cookies no venden sus datos a anunciantes.",
      ],
    },
    {
      id: "third-party",
      title: "5. Servicios de terceros",
      paragraphs: [
        "Algunas páginas pueden cargar recursos de terceros (por ejemplo, fuentes o contenido incrustado). Esos proveedores pueden establecer sus propias cookies según sus políticas. Minimizamos el seguimiento de terceros en las páginas principales de la plataforma.",
      ],
    },
    {
      id: "manage",
      title: "6. Cómo gestionar las cookies",
      list: [
        "Use el banner de cookies en su primera visita para aceptar solo las necesarias o aceptar todas.",
        "Borre cookies y datos del sitio en la configuración de su navegador en cualquier momento.",
        "Bloquee cookies en la configuración del navegador — tenga en cuenta que el inicio de sesión y las funciones de cuenta no funcionarán.",
      ],
    },
    {
      id: "cookie-contact",
      title: "7. Contacto",
      paragraphs: [
        `Preguntas sobre cookies: ${LEGAL_CONTACT_EMAIL} o https://dewebam.com/en/contact.`,
      ],
    },
  ],
  termsOfUseSections: [
    {
      title: "Acuerdo",
      paragraphs: [
        "Estos Términos de uso rigen su acceso a dewebam.com y a los servicios de DEWEB. Al crear una cuenta o usar la plataforma, acepta estos términos.",
      ],
    },
    {
      id: "eligibility",
      title: "1. Elegibilidad",
      paragraphs: [
        "Debe tener al menos 18 años y capacidad para celebrar un contrato vinculante para usar DEWEB.",
      ],
    },
    {
      id: "accounts",
      title: "2. Cuentas",
      list: [
        "Proporcione información de registro precisa y mantenga su contraseña segura.",
        "Usted es responsable de la actividad bajo su cuenta.",
        "Podemos suspender cuentas que violen estos términos o representen riesgos de seguridad.",
        "Las cuentas de administrador son solo para personal autorizado de DEWEB.",
      ],
    },
    {
      id: "platform",
      title: "3. Servicios de la plataforma",
      paragraphs: [
        "DEWEB conecta clientes con desarrolladores y proveedores de servicios. Facilitamos consultas, propuestas y comunicaciones. Salvo acuerdo explícito por escrito, DEWEB no es parte de los contratos entre usuarios.",
      ],
    },
    {
      id: "user-content",
      title: "4. Contenido y conducta del usuario",
      list: [
        "No publique contenido ilegal, fraudulento, acosador o que infrinja derechos.",
        "No comparta malware, intente acceso no autorizado ni haga scraping abusivo de la plataforma.",
        "No tergiverse habilidades, identidad o alcance del proyecto.",
        "Respete la confidencialidad de los chats de acuerdos y la información del cliente.",
      ],
    },
    {
      id: "ip",
      title: "5. Propiedad intelectual",
      paragraphs: [
        "La marca DEWEB, el diseño del sitio web y el código de la plataforma son propiedad de DEWEB o sus licenciantes. Usted conserva los derechos sobre el contenido que envía, pero otorga a DEWEB una licencia para alojarlo y mostrarlo según sea necesario para operar el servicio.",
      ],
    },
    {
      id: "disclaimers",
      title: "6. Descargos de responsabilidad",
      paragraphs: [
        "La plataforma se proporciona «tal cual» y «según disponibilidad». No garantizamos un servicio ininterrumpido ni que cada emparejamiento con un desarrollador cumpla sus expectativas. Verifique credenciales y acuerdos antes de iniciar trabajo remunerado.",
      ],
    },
    {
      id: "liability",
      title: "7. Limitación de responsabilidad",
      paragraphs: [
        "En la máxima medida permitida por la ley, DEWEB no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de la plataforma. Nuestra responsabilidad total por cualquier reclamación se limita al importe que usted haya pagado a DEWEB por comisiones de la plataforma en los doce meses anteriores a la reclamación, si lo hubiera.",
      ],
    },
    {
      id: "termination",
      title: "8. Terminación",
      paragraphs: [
        "Puede dejar de usar DEWEB en cualquier momento. Podemos suspender o terminar el acceso por violaciones, requisitos legales o seguridad de la plataforma.",
      ],
    },
    {
      id: "governing-law",
      title: "9. Ley aplicable",
      paragraphs: [
        "Estos términos se rigen por las leyes aplicables de la jurisdicción donde opera DEWEB, sin tener en cuenta normas de conflicto de leyes. Las disputas deben plantearse primero a través de nuestros canales de contacto.",
      ],
    },
    {
      id: "terms-contact",
      title: "10. Contacto",
      paragraphs: [
        `Preguntas sobre los términos: ${LEGAL_CONTACT_EMAIL} o https://dewebam.com/en/contact.`,
      ],
    },
  ],
};
