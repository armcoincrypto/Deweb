#!/usr/bin/env node
/**
 * Merge P3A marketplace i18n: Telegram bot developers & AI automation specialists pages.
 * Reads EN keys from en.json, applies RU/ES/AM translations, preserves 2-space JSON formatting.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "../src/i18n/messages");

function countWords(obj) {
  return Object.values(obj)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== "object") target[key] = {};
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function assertKeys(enObj, localeObj, label) {
  const enKeys = Object.keys(enObj).sort();
  const localeKeys = Object.keys(localeObj).sort();
  const missing = enKeys.filter((k) => !localeKeys.includes(k));
  const extra = localeKeys.filter((k) => !enKeys.includes(k));
  if (missing.length || extra.length) {
    throw new Error(
      `${label} key mismatch — missing: [${missing.join(", ")}], extra: [${extra.join(", ")}]`,
    );
  }
}

const hubPatches = {
  ru: {
    categoryHireTelegramLink: "Нанять разработчиков Telegram-ботов",
    categoryHireTelegramDesc:
      "публикуйте проекты ботов, сравнивайте предложения специалистов и запускайте ботов поддержки или платежей",
    categoryHireAiLink: "Нанять специалистов по AI-автоматизации",
    categoryHireAiDesc:
      "набирайте специалистов для автоматизации процессов, интеграций и интеллектуальных операций через маркетплейс",
  },
  es: {
    categoryHireTelegramLink: "Contratar desarrolladores de bots de Telegram",
    categoryHireTelegramDesc:
      "publica proyectos de bots, compara propuestas de especialistas y lanza bots de soporte o pagos",
    categoryHireAiLink: "Contratar especialistas en automatización con IA",
    categoryHireAiDesc:
      "incorpora automatización de flujos de trabajo, integraciones y operaciones inteligentes a través del marketplace",
  },
  am: {
    categoryHireTelegramLink: "Վարձել Telegram բոտերի մշակողներ",
    categoryHireTelegramDesc:
      "հրապարակեք բոտի նախագծերը, համեմատեք մասնագետների առաջարկները և launch արեք support կամ payment բոտեր",
    categoryHireAiLink: "Վարձել AI ավտոմատացման մասնագետներ",
    categoryHireAiDesc:
      "staff արեք workflow ավտոմատացում, ինտեգրացիաներ և intelligent operations marketplace-ի միջոցով",
  },
};

const seoPatches = {
  ru: {
    "hire-telegram-bot-developers": {
      title:
        "Нанять разработчиков Telegram-ботов | Опубликовать проекты ботов и сравнить предложения | DEWEB",
      description:
        "Нанимайте разработчиков Telegram-ботов на DEWEB Marketplace — публикуйте ботов поддержки, Mini Apps, платёжные flow и CRM-интеграции; сравнивайте предложения специалists с прозрачным бюджетом и сроками.",
    },
    "hire-ai-automation-specialists": {
      title:
        "Нанять специалистов по AI-автоматизации | Опубликовать проекты и сравнить предложения | DEWEB",
      description:
        "Нанимайте специалистов по AI-автоматизации через DEWEB Marketplace — публикуйте проекты по workflow, интеграциям и интеллектуальным операциям; сравнивайте предложения проверенных инженеров автоматизации.",
    },
  },
  es: {
    "hire-telegram-bot-developers": {
      title:
        "Contratar desarrolladores de bots de Telegram | Publica proyectos de bots y compara propuestas | DEWEB",
      description:
        "Contrata desarrolladores de bots de Telegram en DEWEB Marketplace — publica bots de soporte, Mini Apps, flujos de pago e integraciones CRM; compara propuestas de especialistas con presupuestos y plazos transparentes.",
    },
    "hire-ai-automation-specialists": {
      title:
        "Contratar especialistas en automatización con IA | Publica proyectos y compara propuestas | DEWEB",
      description:
        "Contrata especialistas en automatización con IA a través de DEWEB Marketplace — publica proyectos de workflow, integración y operaciones inteligentes; compara propuestas de ingenieros de automatización verificados.",
    },
  },
  am: {
    "hire-telegram-bot-developers": {
      title:
        "Վարձել Telegram բոտերի մշակողներ | Հրապարակել բոտի նախագծեր և համեմատել առաջարկներ | DEWEB",
      description:
        "Վարձեք Telegram բոտերի մշակողներ DEWEB Marketplace-ում — հրապարակեք support բոտեր, Mini Apps, payment flow-եր և CRM ինտեգրացիաներ; համեմատեք մասնագետների առաջարկները transparent բյուջեով և timeline-ով։",
    },
    "hire-ai-automation-specialists": {
      title:
        "Վարձել AI ավտոմատացման մասնագետներ | Հրապարակել նախագծեր և համեմատել առաջարկներ | DEWEB",
      description:
        "Վարձեք AI ավտոմատացման մասնագետներ DEWEB Marketplace-ի միջոցով — հրապարակեք workflow, ինտեգրացիայի և intelligent operations նախագծերը; համեմատեք verified ավտոմատացման ինժեներների առաջարկները։",
    },
  },
};

const hireTelegramBotDevelopers = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbMarketplace: "Маркетплейс",
    breadcrumbCurrent: "Нанять разработчиков Telegram-ботов",
    kicker: "Нанять разработчиков Telegram-ботов",
    title: "Нанять разработчиков Telegram-ботов для поддержки, продаж и автоматизации",
    subtitle:
      "Опубликуйте проект Telegram-бота на DEWEB Marketplace, сравните предложения разработчиков и запустите production-ботов с понятными flow, интеграциями и сроками.",
    whyHireTitle: "Зачем нанимать разработчиков Telegram-ботов через DEWEB",
    whyHireP1:
      "Telegram-боты сокращают время ответа в поддержке, продажах и внутренних операциях — но только когда conversation design, надёжность webhook и интеграции спроектированы правильно. Опытный разработчик Telegram-ботов превращает user journeys в поддерживаемые flow: меню команд, структурированный сбор данных, шаги оплаты, handoff в CRM и admin-инструменты, которыми ваша команда сможет управлять после запуска.",
    whyHireP2:
      "DEWEB Marketplace даёт коммерческим заказчикам структурированный путь нанять разработчиков Telegram-ботов без угадываний на freelance-маркетплейсах или непрозрачных agency retainers. Вы публикуете бриф с бюджетом и дедлайном, изучаете предложения специалists, понимающих Telegram Bot API, и сравниваете fit до обязательств. Когда нужна managed delivery, DEWEB также предоставляет агентскую разработку Telegram-ботов и связанные услуги AI-автоматизации — чтобы hiring intent связывался с исполнением на одной платформе.",
    typesTitle: "Типы специалists по Telegram-ботам, которых можно нанять",
    typesIntro:
      "Проекты ботов объединяют conversation UX, backend engineering и сторонние интеграции. На DEWEB Marketplace вы можете таргетировать роли под ваш scope — от сфокусированного MVP до многомодульной платформы автоматизации:",
    typeItem1:
      "Боты поддержки и FAQ — маршрутизация тикетов, ответы из базы знаний, эскалация к живым агентам и flow ответов, соответствующие SLA",
    typeItem2:
      "Боты продаж и квалификации лидов — структурированные опросники, синхронизация с CRM, запись на встречи и follow-up последовательности",
    typeItem3:
      "Платёжные и order-боты — каталоги товаров, инвойсинг, подтверждения checkout и уведомления о fulfillment внутри Telegram",
    typeItem4:
      "Инженеры Mini Apps — web UI внутри Telegram для более богатых каталогов, аккаунтов или dashboard-опыта",
    typeItem5:
      "Специалists по интеграциям — webhooks, Node.js или Python backends, базы данных и подключения к Shopify, Stripe или внутренним API",
    typeItem6:
      "Разработчики AI assistant-ботов — retrieval-based ответы, guardrails и human handoff для интеллектуальной автоматизации поддержки",
    engagementTitle: "Модели сотрудничества при найме разработчиков ботов",
    engagementIntro:
      "Коммерческие команды обычно выбирают между marketplace hiring, agency delivery или гибридной моделью. DEWEB поддерживает пути ниже, чтобы согласовать бюджет, риск и скорость с вашими операциями:",
    engagement1Title: "Публикация проекта на маркетплейсе",
    engagement1Desc:
      "Опубликуйте запрос клиента, опишите flow бота и интеграции, пригласите предложения от независимых Telegram-специалists. Лучше всего, когда нужны конкурентные ставки и прямое сравнение fit разработчиков.",
    engagement1Link: "Открыть хаб DEWEB Marketplace",
    engagement2Title: "Агентская delivery Telegram-ботов",
    engagement2Desc:
      "Работайте с командой DEWEB над discovery, conversation design, engineering, QA и запуском, когда предпочитаете managed production-партнёра для support, payment или Mini App сборок.",
    engagement2Link: "Услуги разработки Telegram-ботов",
    engagement3Title: "Расширение AI-автоматизации",
    engagement3Desc:
      "Сочетайте Telegram-ботов с более широкой workflow-автоматизацией — обработка документов, обновления CRM и интеллектуальные операции, выходящие за рамки одного мессенджера.",
    engagement3Link: "Услуги AI-автоматизации бизнеса",
    engagement4Title: "Кросс-канальные AI-ассистенты",
    engagement4Desc:
      "Когда основная потребность охватывает Telegram плюс web или другие каналы, наймите инженеров, которые строят AI-чатботов и единый support-опыт.",
    engagement4Link: "Услуги разработки AI-чатботов",
    processTitle: "Как работает процесс найма",
    processStep1Title: "Определите результаты бота и интеграции",
    processStep1Desc:
      "Зафиксируйте user journeys, команды, языки, потребности в платежах, CRM-цели и метрики успеха. Чёткий бриф привлекает сильные предложения и снижает rework во время сборки.",
    processStep2Title: "Опубликуйте на DEWEB Marketplace",
    processStep2Desc:
      "Создайте листинг с названием, описанием, диапазоном бюджета и сроком. Авторизованные клиенты могут публиковать запросы из панели аккаунта за минуты.",
    processStep3Title: "Изучите и отберите предложения",
    processStep3Desc:
      "Сравните сообщения, предложенную цену, срок delivery и релевантный опыт bot portfolio. Задавайте уточняющие вопросы в сообщениях DEWEB до выбора партнёра.",
    processStep4Title: "Запустите со staging и настройкой webhook",
    processStep4Desc:
      "Согласуйте BotFather tokens, webhook hosting, тестовые группы, критерии приёмки и milestone delivery. Структурированный kickoff делает Telegram-проекты предсказуемыми для обеих сторон.",
    processStep5Title: "Масштабируйтесь с поддержкой агентства DEWEB при необходимости",
    processStep5Desc:
      "Если scope растёт до Mini Apps, платежей или AI-слоёв, обратитесь в DEWEB contact для agency delivery или гибридных моделей marketplace плюс managed team.",
    relatedTitle: "Начните нанимать разработчиков Telegram-ботов сегодня",
    relatedP1: "Готовы перейти от идеи к предложениям? Вернитесь в",
    relatedMarketplaceLink: "маркетплейс разработки ПО",
    relatedP2: ", изучите",
    relatedServiceLink: "услуги разработки Telegram-ботов",
    relatedP3: "для agency delivery, или",
    relatedContactLink: "свяжитесь с DEWEB",
    relatedP4: "чтобы сформировать требования до публикации листинга.",
    faqTitle: "Часто задаваемые вопросы",
    faq1q: "Как нанять разработчиков Telegram-ботов на DEWEB Marketplace?",
    faq1a:
      "Создайте аккаунт DEWEB, опубликуйте запрос клиента с scope бота, интеграциями, бюджетом и дедлайном, затем изучите предложения Telegram-специалists. Вы можете переписываться с кандидатами и выбрать лучший fit до начала разработки.",
    faq2q: "Что включить в объявление о проекте Telegram-бота?",
    faq2a:
      "Укажите целевых пользователей, conversation flow, языки, платёжные или CRM-интеграции, admin-потребности, сроки и диапазон бюджета. Сильные листинги объясняют, как выглядит успех на запуске и какие операционные риски важны больше всего.",
    faq3q: "Можно ли нанять разработчиков для Telegram Mini Apps и payment-ботов?",
    faq3a:
      "Да. Многие листинги охватывают Mini Apps, payment flow, subscription-ботов и CRM-connected support automation. DEWEB Marketplace поддерживает и упакованные service offers, и кастомные customer requirements.",
    faq4q: "Когда использовать найм через маркетплейс, а когда агентские bot-услуги DEWEB?",
    faq4a:
      "Используйте marketplace hiring, когда хотите сравнить независимые предложения и управлять delivery напрямую. Выбирайте агентскую разработку Telegram-ботов DEWEB, когда нужна managed team, единый QA и production accountability от одного партнёра.",
    faq5q: "Сколько стоит нанять разработчиков Telegram-ботов?",
    faq5a:
      "Стоимость зависит от сложности flow, интеграций, AI-scope и сроков. Листинги маркетплейса позволяют заранее задать бюджетные ожидания и сравнить предложенные ставки до обязательств — это делает коммерческий найм прозрачным.",
    faq6q: "Поддерживают ли нанятые разработчики ботов webhooks и production hosting?",
    faq6a:
      "Опытные Telegram-разработчики должны указать webhook architecture, error handling, logging и подход к deployment в своих предложениях. Подтвердите эти детали при shortlisting до award проекта.",
    faq7q: "Доступен ли DEWEB Marketplace для международных bot-проектов?",
    faq7a:
      "DEWEB обслуживает клиентов по всему миру с интерфейсами на английском, испанском, русском и армянском. Вы можете публиковать проекты Telegram-ботов, изучать предложения и координировать delivery через платформу независимо от страны бизнеса.",
    ctaTitle: "Опубликуйте проект Telegram-бота и наймите разработчиков",
    ctaDescription:
      "Опубликуйте требования к боту на DEWEB Marketplace, сравните квалифицированные предложения и запустите надёжную Telegram-автоматизацию с уверенностью.",
    ctaPrimary: "Опубликовать листинг проекта",
    ctaSecondary: "Сначала поговорить с DEWEB",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbMarketplace: "Marketplace",
    breadcrumbCurrent: "Contratar desarrolladores de bots de Telegram",
    kicker: "Contratar desarrolladores de bots de Telegram",
    title: "Contrata desarrolladores de bots de Telegram para soporte, ventas y automatización",
    subtitle:
      "Publica tu proyecto de bot de Telegram en DEWEB Marketplace, compara propuestas de desarrolladores y lanza bots en producción con flujos, integraciones y plazos claros.",
    whyHireTitle: "Por qué contratar desarrolladores de bots de Telegram a través de DEWEB",
    whyHireP1:
      "Los bots de Telegram reducen el tiempo de respuesta en soporte, ventas y operaciones internas — pero solo cuando el diseño conversacional, la fiabilidad de webhooks e integraciones están bien ingenierizados. Un desarrollador experto convierte los recorridos de usuario en flujos mantenibles: menús de comandos, captura estructurada de datos, pasos de pago, traspasos a CRM y herramientas de administración que tu equipo puede operar tras el lanzamiento.",
    whyHireP2:
      "DEWEB Marketplace ofrece a compradores comerciales un camino estructurado para contratar desarrolladores de bots de Telegram sin adivinar en marketplaces freelance o retainers opacos de agencias. Publicas un brief con presupuesto y plazo, revisas propuestas de especialistas que entienden la Telegram Bot API y comparas el encaje antes de comprometerte. Cuando necesitas entrega gestionada, DEWEB también proporciona desarrollo de bots de Telegram liderado por agencia y servicios relacionados de automatización con IA — para que la intención de contratar conecte con la ejecución en una sola plataforma.",
    typesTitle: "Tipos de especialistas en bots de Telegram que puedes contratar",
    typesIntro:
      "Los proyectos de bots combinan UX conversacional, ingeniería backend e integraciones de terceros. En DEWEB Marketplace puedes orientar los roles que encajan con tu alcance — desde un MVP enfocado hasta una plataforma de automatización multimódulo:",
    typeItem1:
      "Bots de soporte y FAQ — enrutamiento de tickets, respuestas de base de conocimiento, escalado a agentes humanos y flujos de respuesta alineados con SLA",
    typeItem2:
      "Bots de ventas y calificación de leads — cuestionarios estructurados, sincronización CRM, reserva de citas y secuencias de seguimiento",
    typeItem3:
      "Bots de pago y pedidos — catálogos de productos, facturación, confirmaciones de checkout y notificaciones de fulfillment dentro de Telegram",
    typeItem4:
      "Ingenieros de Mini Apps — UI web dentro de Telegram para experiencias más ricas de catálogo, cuenta o panel",
    typeItem5:
      "Especialistas en integraciones — webhooks, backends Node.js o Python, bases de datos y conexiones con Shopify, Stripe o APIs internas",
    typeItem6:
      "Desarrolladores de bots asistente con IA — respuestas basadas en recuperación, guardrails y traspaso humano para automatización inteligente de soporte",
    engagementTitle: "Modelos de contratación para desarrolladores de bots",
    engagementIntro:
      "Los equipos comerciales suelen elegir entre contratación en marketplace, entrega por agencia o un modelo híbrido. DEWEB admite los caminos siguientes para alinear presupuesto, riesgo y velocidad con tus operaciones:",
    engagement1Title: "Publicación de proyecto en el marketplace",
    engagement1Desc:
      "Publica una necesidad de cliente, describe flujos del bot e integraciones e invita propuestas de especialistas independientes en Telegram. Ideal cuando quieres licitación competitiva y comparación directa del encaje del desarrollador.",
    engagement1Link: "Explorar el hub de DEWEB Marketplace",
    engagement2Title: "Entrega de bots de Telegram por agencia",
    engagement2Desc:
      "Trabaja con el equipo DEWEB en descubrimiento, diseño conversacional, ingeniería, QA y lanzamiento cuando prefieres un socio de producción gestionado para builds de soporte, pago o Mini Apps.",
    engagement2Link: "Servicios de desarrollo de bots de Telegram",
    engagement3Title: "Extensión de automatización con IA",
    engagement3Desc:
      "Combina bots de Telegram con automatización de flujos más amplia — procesamiento de documentos, actualizaciones CRM y operaciones inteligentes que van más allá de la mensajería.",
    engagement3Link: "Servicios de automatización empresarial con IA",
    engagement4Title: "Asistentes de IA multicanal",
    engagement4Desc:
      "Cuando tu necesidad principal abarca Telegram más web u otros canales, alinea la contratación con ingenieros que construyen chatbots con IA y experiencias de soporte unificadas.",
    engagement4Link: "Servicios de desarrollo de chatbots con IA",
    processTitle: "Cómo funciona el proceso de contratación",
    processStep1Title: "Define resultados del bot e integraciones",
    processStep1Desc:
      "Documenta recorridos de usuario, comandos, idiomas, necesidades de pago, objetivos CRM y métricas de éxito. Un brief claro atrae mejores propuestas y reduce retrabajo durante el build.",
    processStep2Title: "Publica en DEWEB Marketplace",
    processStep2Desc:
      "Crea un anuncio con título, descripción, rango de presupuesto y plazo. Los clientes autenticados pueden publicar necesidades desde el panel de cuenta en minutos.",
    processStep3Title: "Revisa y preselecciona propuestas",
    processStep3Desc:
      "Compara mensajes, precio propuesto, plazo de entrega y experiencia relevante en portfolio de bots. Haz preguntas de seguimiento en la mensajería DEWEB antes de elegir un socio.",
    processStep4Title: "Inicia con staging y configuración de webhook",
    processStep4Desc:
      "Alinea tokens de BotFather, hosting de webhook, grupos de prueba, criterios de aceptación y entrega por hitos. Un kickoff estructurado mantiene los proyectos de Telegram predecibles para ambas partes.",
    processStep5Title: "Escala con apoyo de agencia DEWEB cuando haga falta",
    processStep5Desc:
      "Si el alcance crece hacia Mini Apps, pagos o capas de IA, escala a contacto DEWEB para entrega de agencia o modelos híbridos marketplace más equipo gestionado.",
    relatedTitle: "Empieza a contratar desarrolladores de bots de Telegram hoy",
    relatedP1: "¿Listo para pasar de la idea a las propuestas? Vuelve al",
    relatedMarketplaceLink: "marketplace de desarrollo de software",
    relatedP2: ", explora",
    relatedServiceLink: "servicios de desarrollo de bots de Telegram",
    relatedP3: "para entrega por agencia, o",
    relatedContactLink: "contacta con DEWEB",
    relatedP4: "para definir requisitos antes de publicar un anuncio.",
    faqTitle: "Preguntas frecuentes",
    faq1q: "¿Cómo contrato desarrolladores de bots de Telegram en DEWEB Marketplace?",
    faq1a:
      "Crea una cuenta DEWEB, publica una necesidad de cliente con alcance del bot, integraciones, presupuesto y plazo, luego revisa propuestas de especialistas en Telegram. Puedes enviar mensajes a candidatos y elegir el mejor encaje antes de que comience el desarrollo.",
    faq2q: "¿Qué debo incluir en un anuncio de proyecto de bot de Telegram?",
    faq2a:
      "Incluye usuarios objetivo, flujos conversacionales, idiomas, integraciones de pago o CRM, necesidades de administración, plazo y rango de presupuesto. Los anuncios sólidos explican cómo se ve el éxito en el lanzamiento y qué riesgos operativos importan más.",
    faq3q: "¿Puedo contratar desarrolladores para Mini Apps de Telegram y bots de pago?",
    faq3a:
      "Sí. Muchos anuncios cubren Mini Apps, flujos de pago, bots de suscripción y automatización de soporte conectada a CRM. DEWEB Marketplace admite tanto ofertas de servicio empaquetadas como necesidades personalizadas de clientes.",
    faq4q: "¿Cuándo usar contratación en marketplace vs servicios de bots de agencia DEWEB?",
    faq4a:
      "Usa contratación en marketplace cuando quieres comparar propuestas independientes y gestionar la entrega directamente. Elige desarrollo de bots de Telegram por agencia DEWEB cuando necesitas un equipo gestionado, QA unificado y responsabilidad de producción de un solo socio.",
    faq5q: "¿Cuánto cuesta contratar desarrolladores de bots de Telegram?",
    faq5a:
      "Los costes dependen de la complejidad de flujos, integraciones, alcance de IA y plazo. Los anuncios del marketplace permiten fijar expectativas de presupuesto por adelantado y comparar tarifas propuestas antes de comprometerte, lo que mantiene la contratación comercial transparente.",
    faq6q: "¿Los desarrolladores de bots contratados soportan webhooks y hosting en producción?",
    faq6a:
      "Los desarrolladores experimentados en Telegram deben especificar arquitectura de webhook, manejo de errores, logging y enfoque de despliegue en sus propuestas. Confirma estos detalles durante la preselección antes de adjudicar el proyecto.",
    faq7q: "¿Está DEWEB Marketplace disponible para proyectos de bots internacionales?",
    faq7a:
      "DEWEB atiende clientes globalmente con interfaces en inglés, español, ruso y armenio. Puedes publicar proyectos de bots de Telegram, revisar propuestas y coordinar la entrega a través de la plataforma independientemente de dónde opere tu negocio.",
    ctaTitle: "Publica tu proyecto de bot de Telegram y contrata desarrolladores",
    ctaDescription:
      "Publica tus requisitos de bot en DEWEB Marketplace, compara propuestas cualificadas y lanza automatización fiable en Telegram con confianza.",
    ctaPrimary: "Publicar anuncio de proyecto",
    ctaSecondary: "Hablar con DEWEB primero",
  },
  am: {
    breadcrumbHome: "Գլխավոր",
    breadcrumbMarketplace: "Marketplace",
    breadcrumbCurrent: "Վարձել Telegram բոտերի մշակողներ",
    kicker: "Վարձել Telegram բոտերի մշակողներ",
    title: "Վարձեք Telegram բոտերի մշակողներ support, sales և ավտոմատացման համար",
    subtitle:
      "Հրապարակեք ձեր Telegram բոտի նախագիծը DEWEB Marketplace-ում, համեմատեք մշակողների առաջարկները և launch արեք production բոտեր պարզ flow-երով, ինտեգրացիաներով և timeline-ով։",
    whyHireTitle: "Ինչու վարձել Telegram բոտերի մշակողներ DEWEB-ի միջոցով",
    whyHireP1:
      "Telegram բոտերը կրճատում են պատասխանի ժամանակը support, sales և ներքին գործառնություններում — բայց միայն երբ conversation design-ը, webhook reliability-ն և ինտեգրացիաները ճիշտ են engineered։ Փորձառու Telegram բոտի մշակողը user journey-ները վերածում է maintainable flow-երի՝ command menu-ներ, structured data capture, payment step-եր, CRM handoff-եր և admin գործիքներ, որոնցով ձեր թիմը կարող է աշխատել launch-ից հետո։",
    whyHireP2:
      "DEWEB Marketplace-ը կոմերցիոն գնորդներին տալիս է կառուցվածքային ուղի Telegram բոտերի մշակողներ վարձելու՝ առանց freelance marketplace-երում guess անելու կամ անթափանց agency retainer-ների։ Դուք հրապարակում եք brief բյուջեով և deadline-ով, ուսումնասիրում Telegram Bot API-ը հասկացող մասնագետների առաջարկները և համեմատում fit-ը նախքան պարտավորություն ընդունելը։ Երբ պետք է managed delivery, DEWEB-ը նաև տալիս է agency-led Telegram bot development և կապված AI ավտոմատացման ծառայություններ — որպեսզի hiring intent-ը միացվի execution-ին մեկ platform-ում։",
    typesTitle: "Telegram բոտի մասնագետների տեսակներ, որոնց կարող եք վարձել",
    typesIntro:
      "Բոտի նախագծերը համակցում են conversation UX, backend engineering և երրորդ կողմի ինտեգրացիաներ։ DEWEB Marketplace-ում կարող եք target անել scope-ին համապատասխան դերերը՝ focused MVP-ից մինչև multi-module ավտոմատացման platform.",
    typeItem1:
      "Support և FAQ բոտեր — ticket routing, knowledge-base պատասխաններ, human agent escalation և SLA-friendly response flow-եր",
    typeItem2:
      "Sales և lead qualification բոտեր — structured questionnaire-ներ, CRM sync, appointment booking և follow-up sequence-ներ",
    typeItem3:
      "Payment և order բոտեր — product catalog-ներ, invoicing, checkout confirmation-ներ և fulfillment notification-ներ Telegram-ում",
    typeItem4:
      "Mini App ինժեներներ — web UI Telegram-ի ներսում ավելի rich catalog, account կամ dashboard experience-ի համար",
    typeItem5:
      "Integration մասնագետներ — webhook-ներ, Node.js կամ Python backend-ներ, database-ներ և Shopify, Stripe կամ internal API կապեր",
    typeItem6:
      "AI assistant bot մշակողներ — retrieval-based պատասխաններ, guardrail-ներ և human handoff intelligent support ավտոմատացման համար",
    engagementTitle: "Բոտի մշակողներ վարձելու engagement մոդելներ",
    engagementIntro:
      "Կոմերցիոն թիմերը սովորաբար ընտրում են marketplace hiring, agency delivery կամ hybrid մոդելի միջև։ DEWEB-ը աջակցում է ստորև նշված ուղիները՝ բյուջեն, ռիսկը և արագությունը համաձայնեցնելու ձեր operations-ի հետ.",
    engagement1Title: "Marketplace նախագծի հրապարակում",
    engagement1Desc:
      "Հրապարակեք customer requirement, նկարագրեք bot flow-երը և ինտեգրացիաները, հրավիրեք առաջարկներ անկախ Telegram մասնագետներից։ Լավագույնն է, երբ ցանկանում եք մրցակցային bidding և մշակողների fit-ի ուղղակի համեմատություն.",
    engagement1Link: "Դիտել DEWEB Marketplace hub-ը",
    engagement2Title: "Գործակալության Telegram bot delivery",
    engagement2Desc:
      "Աշխատեք DEWEB թիմի հետ discovery, conversation design, engineering, QA և launch-ի վրա, երբ ն preferում եք managed production գործընկեր support, payment կամ Mini App build-երի համար.",
    engagement2Link: "Telegram բոտերի զարգացման ծառայություններ",
    engagement3Title: "AI ավտոմատացման ընդլայնում",
    engagement3Desc:
      "Համակցեք Telegram բոտերը ավելի լայն workflow ավտոմատացման հետ — document processing, CRM update-ներ և intelligent operations, որոնք գերազանցում են messaging-ը.",
    engagement3Link: "AI business ավտոմատացման ծառայություններ",
    engagement4Title: "Cross-channel AI assistant-ներ",
    engagement4Desc:
      "Երբ հիմնական կարիքը охватывает Telegram plus web կամ այլ channel-ներ, align արեք վարձումը AI chatbot և unified support experience կառուցող ինժեներների հետ.",
    engagement4Link: "AI chatbot զարգացման ծառայություններ",
    processTitle: "Ինչպես է աշխատում վարձման գործընթացը",
    processStep1Title: "Սահմանեք bot արդյունքներ և ինտեգրացիաներ",
    processStep1Desc:
      "Փ documenting արեք user journey-ները, command-ները, լեզուները, payment needs-ը, CRM target-ները և success metrics-ը։ Պարզ brief-ը attracting է ավելի ուժեղ առաջարկներ և նվազեցնում rework-ը build-ի ընթացքում.",
    processStep2Title: "Հրապարակեք DEWEB Marketplace-ում",
    processStep2Desc:
      "Ստեղծեք ցանկ title, description, budget range և timeline-ով։ Մուտք գործած հաճախորդները կարող են customer need հրապարակել account dashboard-ից րոպեների ընթացքում.",
    processStep3Title: "Ուսումնասիրեք և shortlist արեք առաջարկները",
    processStep3Desc:
      "Համեմատեք հաղորդագրությունները, առաջարկված գինը, delivery timeline-ը և relevant bot portfolio փորձը։ Հարցեր տվեք DEWEB messaging-ում մինչև գործընկեր ընտրելը.",
    processStep4Title: "Kickoff staging և webhook setup-ով",
    processStep4Desc:
      "Համalign արեք BotFather token-ները, webhook hosting-ը, test group-երը, acceptance criteria-ները և milestone delivery-ը։ Structured kickoff-ը Telegram նախագծերը predictable է պահում երկու կողմերի համար.",
    processStep5Title: "Scale արեք DEWEB գործակալության աջակցությամբ, երբ պետք է",
    processStep5Desc:
      "Եթե scope-ը grows է Mini Apps, payments կամ AI layer-ների, escalate արեք DEWEB contact-ին agency delivery կամ hybrid marketplace plus managed team մոդելների համար.",
    relatedTitle: "Սկսեք Telegram բոտերի մշակողներ վարձել այսօր",
    relatedP1: "Պատրա՞ստ եք անցնել idea-ից առաջարկներին։ Վերադարձեք",
    relatedMarketplaceLink: "software development marketplace",
    relatedP2: ", explore արեք",
    relatedServiceLink: "Telegram բոտերի զարգացման ծառայություններ",
    relatedP3: "agency delivery-ի համար, կամ",
    relatedContactLink: "կապվեք DEWEB-ի հետ",
    relatedP4: "requirements shape անելու համար հրապարակումից առաջ.",
    faqTitle: "Հաճախ տրվող հարցեր",
    faq1q: "Ինչպե՞ս վարձել Telegram բոտերի մշակողներ DEWEB Marketplace-ում։",
    faq1a:
      "Ստեղծեք DEWEB account, հրապարակեք customer requirement bot scope, integrations, budget և deadline-ով, ապա ուսումնասիրեք Telegram մասնագետների առաջարկները։ Կարող եք message անել candidate-ներին և ընտրել լավագույն fit-ը development սկսելուց առաջ.",
    faq2q: "Ի՞նչ ներառել Telegram bot project listing-ում։",
    faq2a:
      "Ներառեք target user-ներ, conversation flow-եր, լեզուներ, payment կամ CRM integrations, admin needs, timeline և budget range։ Ուժեղ ցանկերը բացատրում են, թե ինչպես է success-ը launch-ում և որ operational risk-երն են ամենակարևորը.",
    faq3q: "Կարո՞ղ եմ վարձել մշակողներ Telegram Mini Apps և payment bot-երի համար։",
    faq3a:
      "Այո։ Շատ ցանկեր охватывают Mini Apps, payment flow-եր, subscription bot-եր և CRM-connected support automation։ DEWEB Marketplace-ը աջակցում է packaged service offers և custom customer requirements.",
    faq4q: "Ե՞րբ օգտագործել marketplace hiring vs DEWEB agency bot services.",
    faq4a:
      "Օգտագործեք marketplace hiring, երբ ցանկանում եք համեմատել independent առաջարկները և ուղղակի manage անել delivery-ն։ Ընտրեք DEWEB agency Telegram bot development, երբ պետք է managed team, unified QA և production accountability մեկ գործընկերից.",
    faq5q: "Որքա՞ն արժե Telegram բոտերի մշակողներ վարձելը։",
    faq5a:
      "Ծախսերը կախված են flow complexity-ից, integrations-ից, AI scope-ից և timeline-ից։ Marketplace ցանկերը թույլ են տալիս budget expectations սահմանել upfront և համեմատել proposed rate-երը commit-ից առաջ — դա commercial hiring-ը transparent է պահում.",
    faq6q: "Վարձված bot մշակողները support անո՞ւմ են webhook-ներ և production hosting.",
    faq6a:
      "Փորձառու Telegram մշակողները պետք է նշեն webhook architecture, error handling, logging և deployment approach-ը իրենց առաջարկներում։ Հաստատեք այս detail-երը shortlisting-ի ժամանակ project award-ից առաջ.",
    faq7q: "DEWEB Marketplace-ը հասանելի՞ է international bot նախագծերի համար։",
    faq7a:
      "DEWEB-ը ս обслуживает global հաճախորդներ անգլերեն, իսպաներեն, ռուսերեն և հայերեն interface-ներով։ Կարող եք հրապարակել Telegram bot նախագծեր, review անել առաջարկները և coordinate անել delivery-ն platform-ի միջոցով անկախ բusiness location-ից.",
    ctaTitle: "Հրապարակեք Telegram bot նախագիծը և վարձեք մշակողներ",
    ctaDescription:
      "Հրապարակեք bot requirements-ը DEWEB Marketplace-ում, համեմատեք qualified առաջարկները և launch արեք reliable Telegram ավտոմատացում confidence-ով։",
    ctaPrimary: "Հրապարակել project listing",
    ctaSecondary: "Նախ խոսել DEWEB-ի հետ",
  },
};

const hireAiAutomationSpecialists = {
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbMarketplace: "Маркетплейс",
    breadcrumbCurrent: "Нанять специалистов по AI-автоматизации",
    kicker: "Нанять специалистов по AI-автоматизации",
    title: "Нанять специалистов по AI-автоматизации для workflow и интеллектуальных операций",
    subtitle:
      "Опубликуйте проект автоматизации на DEWEB Marketplace, сравните предложения специалists и внедрите AI workflow, интеграции и operational intelligence с понятным scope и ROI.",
    whyHireTitle: "Зачем нанимать специалists по AI-автоматизации через DEWEB",
    whyHireP1:
      "AI-автоматизация создаёт коммерческую ценность только когда надёжно убирает повторяемую работу — а не когда хорошо демонстрируется в slide deck. Правильный специалист связывает CRM, ecommerce stack, support tools и внутренние API в управляемые workflow: обработка документов, triage тикетов, маршрутизация лидов, inventory alerts и decision support, которые operations-команда может аудировать и улучшать со временем.",
    whyHireP2:
      "DEWEB Marketplace даёт заказчикам прозрачный способ нанять специалists по AI-автоматизации без непрозрачных agency retainers или несоответствующих freelance generalists. Вы публикуете бриф с бюджетом и дедлайном, изучаете предложения инженеров, понимающих и AI capabilities, и production constraints, и сравниваете fit до обязательств. Когда нужен managed rollout, DEWEB также предоставляет агентскую AI business automation, chatbot engineering и связанные web-интеграции — чтобы hiring intent не останавливался на листингах.",
    typesTitle: "Типы специалists по AI-автоматизации, которых можно нанять",
    typesIntro:
      "Проекты автоматизации сочетают workflow design, integration engineering и часто conversational AI. На DEWEB Marketplace вы можете таргетировать специалists под ваш stack и зрелость — от одного high-impact workflow до multi-department rollout:",
    typeItem1:
      "Инженеры workflow automation — оркестрация между CRM, ERP, ecommerce и внутренними инструментами с надёжными triggers и error handling",
    typeItem2:
      "Разработчики AI agents — task-specific ассистенты с retrieval, guardrails и human escalation для support и operations",
    typeItem3:
      "Специалists по document и data automation — extraction, classification, validation и routing для finance и operations команд",
    typeItem4:
      "Ecommerce automation инженеры — order alerts, inventory sync, customer messaging и campaign operations для Shopify и custom stacks",
    typeItem5:
      "Integration architects — API, webhooks, queues и monitoring для automation, которая должна работать 24/7 в production",
    typeItem6:
      "Automation leads — process discovery, KPI definition, phased rollout planning и governance для multi-team программ",
    engagementTitle: "Модели сотрудничества при найме automation specialists",
    engagementIntro:
      "Коммерческие заказчики обычно оценивают marketplace hiring, agency delivery или hybrid staffing перед расширением automation scope. DEWEB поддерживает пути ниже:",
    engagement1Title: "Публикация проекта на маркетплейсе",
    engagement1Desc:
      "Опубликуйте запрос клиента, опишите процессы для автоматизации и пригласите предложения от независимых AI и workflow specialists. Лучше всего, когда нужны конкурентные ставки и прямое сравнение fit.",
    engagement1Link: "Открыть хаб DEWEB Marketplace",
    engagement2Title: "Агентская delivery AI-автоматизации",
    engagement2Desc:
      "Работайте с командой DEWEB над discovery, workflow design, engineering, QA и phased rollout, когда предпочитаете managed production-партнёра вместо самостоятельного набора фрилансеров.",
    engagement2Link: "Услуги AI-автоматизации бизнеса",
    engagement3Title: "AI chatbot и assistant builds",
    engagement3Desc:
      "Когда автоматизация включает customer-facing conversational AI, наймите специалists, которые сочетают chatbot engineering с CRM-connected workflows и support operations.",
    engagement3Link: "Услуги разработки AI-чатботов",
    engagement4Title: "Messaging и Telegram automation",
    engagement4Desc:
      "Для команд, автоматизирующих через Telegram support, notifications или Mini Apps, наймите bot engineers, которые интегрируют messaging в более широкие operational workflows.",
    engagement4Link: "Услуги разработки Telegram-ботов",
    processTitle: "Как работает процесс найма",
    processStep1Title: "Составьте карту процессов и метрик успеха",
    processStep1Desc:
      "Зафиксируйте текущие workflow, pain points, задействованные системы, compliance constraints и KPI. Чёткий бриф привлекает сильные предложения и предотвращает automation, которую нельзя измерить.",
    processStep2Title: "Опубликуйте на DEWEB Marketplace",
    processStep2Desc:
      "Создайте листинг с названием, описанием, диапазоном бюджета и сроком. Авторизованные клиенты могут публиковать запросы из панели аккаунта за минуты.",
    processStep3Title: "Изучите и отберите предложения",
    processStep3Desc:
      "Сравните сообщения, предложенную цену, срок delivery и релевантный automation experience. Задавайте уточняющие вопросы в сообщениях DEWEB до выбора партнёра.",
    processStep4Title: "Пилот с согласованными milestone",
    processStep4Desc:
      "Начните с bounded pilot workflow, валидируйте KPI, затем расширяйте scope. Milestone-based delivery делает AI automation проекты предсказуемыми для обеих сторон.",
    processStep5Title: "Масштабируйтесь с поддержкой агентства DEWEB при необходимости",
    processStep5Desc:
      "Если scope растёт между departments или требует unified governance, обратитесь в DEWEB contact для agency delivery, дополнительного staffing или гибридных моделей marketplace плюс managed team.",
    relatedTitle: "Начните нанимать специалists по AI-автоматизации сегодня",
    relatedP1: "Готовы перейти от ручной работы к измеряемой автоматизации? Вернитесь в",
    relatedMarketplaceLink: "маркетплейс разработки ПО",
    relatedP2: ", изучите",
    relatedServiceLink: "услуги AI-автоматизации бизнеса",
    relatedP3: "для agency delivery, или",
    relatedContactLink: "свяжитесь с DEWEB",
    relatedP4: "чтобы сформировать требования до публикации листинга.",
    faqTitle: "Часто задаваемые вопросы",
    faq1q: "Как нанять специалists по AI-автоматизации на DEWEB Marketplace?",
    faq1a:
      "Создайте аккаунт DEWEB, опубликуйте запрос клиента с process scope, интеграциями, бюджетом и дедлайном, затем изучите предложения automation и AI specialists. Вы можете переписываться с кандидатами и выбрать лучший fit до начала работы.",
    faq2q: "Что включить в объявление о проекте AI-автоматизации?",
    faq2a:
      "Укажите процессы для автоматизации, задействованные системы, чувствительность данных, ожидаемые KPI, сроки и диапазон бюджета. Сильные листинги объясняют, как выглядит успех после первого pilot и какие риски важны для бизнеса.",
    faq3q: "Можно ли нанять специалists и для workflow automation, и для AI chatbots?",
    faq3a:
      "Да. Многие проекты сочетают orchestration с conversational AI. DEWEB Marketplace поддерживает mixed scopes, а agency services DEWEB покрывают и AI business automation, и AI chatbot development при unified delivery.",
    faq4q: "Когда использовать marketplace hiring, а когда agency automation services DEWEB?",
    faq4a:
      "Используйте marketplace hiring, когда хотите сравнить независимые предложения и управлять delivery напрямую. Выбирайте agency AI automation DEWEB, когда нужна managed team, единый QA, governance и production accountability от одного партнёра.",
    faq5q: "Сколько стоит нанять специалists по AI-автоматизации?",
    faq5a:
      "Стоимость зависит от сложности workflow, глубины интеграций, AI scope и сроков. Листинги маркетплейса позволяют заранее задать бюджетные ожидания и сравнить предложенные ставки до обязательств — это делает коммерческий найм прозрачным.",
    faq6q: "Могут ли automation specialists интегрироваться с Shopify, CRM и custom API?",
    faq6a:
      "Да. Опытные специалists должны описать integration approach, error handling и monitoring в своих предложениях. Подтвердите stack experience при shortlisting до award проекта.",
    faq7q: "Доступен ли DEWEB Marketplace для международных automation проектов?",
    faq7a:
      "DEWEB обслуживает клиентов по всему миру с интерфейсами на английском, испанском, русском и армянском. Вы можете публиковать automation проекты, изучать предложения и координировать delivery через платформу независимо от страны бизнеса.",
    ctaTitle: "Опубликуйте проект автоматизации и наймите специалists",
    ctaDescription:
      "Опубликуйте требования на DEWEB Marketplace, сравните квалифицированные предложения и внедрите AI-автоматизацию, которой может доверять ваша operations-команда.",
    ctaPrimary: "Опубликовать листинг проекта",
    ctaSecondary: "Сначала поговорить с DEWEB",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbMarketplace: "Marketplace",
    breadcrumbCurrent: "Contratar especialistas en automatización con IA",
    kicker: "Contratar especialistas en automatización con IA",
    title: "Contrata especialistas en automatización con IA para flujos de trabajo y operaciones inteligentes",
    subtitle:
      "Publica tu proyecto de automatización en DEWEB Marketplace, compara propuestas de especialistas e implementa flujos de IA, integraciones e inteligencia operativa con alcance y ROI claros.",
    whyHireTitle: "Por qué contratar especialistas en automatización con IA a través de DEWEB",
    whyHireP1:
      "La automatización con IA solo crea valor comercial cuando elimina trabajo repetible de forma fiable — no cuando luce bien en una presentación. El especialista adecuado conecta tu CRM, stack ecommerce, herramientas de soporte y APIs internas en flujos gobernados: procesamiento de documentos, triaje de tickets, enrutamiento de leads, alertas de inventario y apoyo a decisiones que tu equipo de operaciones puede auditar y mejorar con el tiempo.",
    whyHireP2:
      "DEWEB Marketplace ofrece a compradores una forma transparente de contratar especialistas en automatización con IA sin retainers opacos de agencias o generalistas freelance mal alineados. Publicas un brief con presupuesto y plazo, revisas propuestas de ingenieros que entienden tanto capacidades de IA como restricciones de producción y comparas el encaje antes de comprometerte. Cuando necesitas un despliegue gestionado, DEWEB también entrega automatización empresarial con IA liderada por agencia, ingeniería de chatbots e integraciones web relacionadas — para que la intención de contratar no se quede en anuncios.",
    typesTitle: "Tipos de especialistas en automatización con IA que puedes contratar",
    typesIntro:
      "Los proyectos de automatización combinan diseño de flujos, ingeniería de integraciones y a menudo IA conversacional. En DEWEB Marketplace puedes orientar especialistas a tu stack y madurez — desde un flujo de alto impacto hasta un despliegue multidivisional:",
    typeItem1:
      "Ingenieros de automatización de flujos — orquestación entre CRM, ERP, ecommerce y herramientas internas con triggers fiables y manejo de errores",
    typeItem2:
      "Desarrolladores de agentes de IA — asistentes específicos por tarea con recuperación, guardrails y escalado humano para soporte y operaciones",
    typeItem3:
      "Especialistas en automatización de documentos y datos — extracción, clasificación, validación y enrutamiento para equipos de finanzas y operaciones",
    typeItem4:
      "Ingenieros de automatización ecommerce — alertas de pedidos, sincronización de inventario, mensajería a clientes y operaciones de campaña para Shopify y stacks personalizados",
    typeItem5:
      "Arquitectos de integración — APIs, webhooks, colas y monitorización para automatización que debe funcionar 24/7 en producción",
    typeItem6:
      "Líderes de automatización — descubrimiento de procesos, definición de KPI, planificación de despliegue por fases y gobernanza para programas multiequipo",
    engagementTitle: "Modelos de contratación para especialistas en automatización",
    engagementIntro:
      "Los compradores comerciales suelen evaluar contratación en marketplace, entrega por agencia o staffing híbrido antes de ampliar el alcance de automatización. DEWEB admite los caminos siguientes:",
    engagement1Title: "Publicación de proyecto en el marketplace",
    engagement1Desc:
      "Publica una necesidad de cliente, describe procesos a automatizar e invita propuestas de especialistas independientes en IA y flujos de trabajo. Ideal cuando quieres licitación competitiva y comparación directa del encaje.",
    engagement1Link: "Explorar el hub de DEWEB Marketplace",
    engagement2Title: "Entrega de automatización con IA por agencia",
    engagement2Desc:
      "Trabaja con el equipo DEWEB en descubrimiento, diseño de flujos, ingeniería, QA y despliegue por fases cuando prefieres un socio de producción gestionado en lugar de armar freelancers por tu cuenta.",
    engagement2Link: "Servicios de automatización empresarial con IA",
    engagement3Title: "Desarrollo de chatbots y asistentes con IA",
    engagement3Desc:
      "Cuando la automatización incluye IA conversacional orientada al cliente, contrata especialistas que combinen ingeniería de chatbots con flujos conectados a CRM y operaciones de soporte.",
    engagement3Link: "Servicios de desarrollo de chatbots con IA",
    engagement4Title: "Automatización en mensajería y Telegram",
    engagement4Desc:
      "Para equipos que automatizan mediante soporte, notificaciones o Mini Apps en Telegram, alinea la contratación con ingenieros de bots que integren mensajería en flujos operativos más amplios.",
    engagement4Link: "Servicios de desarrollo de bots de Telegram",
    processTitle: "Cómo funciona el proceso de contratación",
    processStep1Title: "Mapea procesos y métricas de éxito",
    processStep1Desc:
      "Documenta flujos actuales, puntos de dolor, sistemas implicados, restricciones de cumplimiento y KPIs. Un brief claro atrae mejores propuestas y evita automatización que no se pueda medir.",
    processStep2Title: "Publica en DEWEB Marketplace",
    processStep2Desc:
      "Crea un anuncio con título, descripción, rango de presupuesto y plazo. Los clientes autenticados pueden publicar necesidades desde el panel de cuenta en minutos.",
    processStep3Title: "Revisa y preselecciona propuestas",
    processStep3Desc:
      "Compara mensajes, precio propuesto, plazo de entrega y experiencia relevante en automatización. Haz preguntas de seguimiento en la mensajería DEWEB antes de elegir un socio.",
    processStep4Title: "Pilota con hitos acordados",
    processStep4Desc:
      "Empieza con un flujo piloto acotado, valida KPIs y luego amplía el alcance. La entrega por hitos mantiene los proyectos de automatización con IA predecibles para ambas partes.",
    processStep5Title: "Escala con apoyo de agencia DEWEB cuando haga falta",
    processStep5Desc:
      "Si el alcance crece entre departamentos o requiere gobernanza unificada, escala a contacto DEWEB para entrega de agencia, staffing adicional o modelos híbridos marketplace más equipo gestionado.",
    relatedTitle: "Empieza a contratar especialistas en automatización con IA hoy",
    relatedP1: "¿Listo para pasar del trabajo manual a automatización medida? Vuelve al",
    relatedMarketplaceLink: "marketplace de desarrollo de software",
    relatedP2: ", explora",
    relatedServiceLink: "servicios de automatización empresarial con IA",
    relatedP3: "para entrega por agencia, o",
    relatedContactLink: "contacta con DEWEB",
    relatedP4: "para definir requisitos antes de publicar un anuncio.",
    faqTitle: "Preguntas frecuentes",
    faq1q: "¿Cómo contrato especialistas en automatización con IA en DEWEB Marketplace?",
    faq1a:
      "Crea una cuenta DEWEB, publica una necesidad de cliente con alcance de procesos, integraciones, presupuesto y plazo, luego revisa propuestas de especialistas en automatización e IA. Puedes enviar mensajes a candidatos y elegir el mejor encaje antes de que comience el trabajo.",
    faq2q: "¿Qué debo incluir en un anuncio de proyecto de automatización con IA?",
    faq2a:
      "Incluye procesos a automatizar, sistemas implicados, sensibilidad de datos, KPIs esperados, plazo y rango de presupuesto. Los anuncios sólidos explican cómo se ve el éxito tras el primer piloto y qué riesgos importan más a tu negocio.",
    faq3q: "¿Puedo contratar especialistas tanto en automatización de flujos como en chatbots con IA?",
    faq3a:
      "Sí. Muchos proyectos combinan orquestación con IA conversacional. DEWEB Marketplace admite alcances mixtos, y los servicios de agencia DEWEB cubren automatización empresarial con IA y desarrollo de chatbots con IA cuando necesitas entrega unificada.",
    faq4q: "¿Cuándo usar contratación en marketplace vs servicios de automatización de agencia DEWEB?",
    faq4a:
      "Usa contratación en marketplace cuando quieres comparar propuestas independientes y gestionar la entrega directamente. Elige automatización con IA por agencia DEWEB cuando necesitas un equipo gestionado, QA unificado, gobernanza y responsabilidad de producción de un solo socio.",
    faq5q: "¿Cuánto cuesta contratar especialistas en automatización con IA?",
    faq5a:
      "Los costes dependen de la complejidad de flujos, profundidad de integraciones, alcance de IA y plazo. Los anuncios del marketplace permiten fijar expectativas de presupuesto por adelantado y comparar tarifas propuestas antes de comprometerte, lo que mantiene la contratación comercial transparente.",
    faq6q: "¿Pueden los especialistas en automatización integrarse con Shopify, CRM y APIs personalizadas?",
    faq6a:
      "Sí. Los especialistas experimentados deben describir enfoque de integración, manejo de errores y monitorización en sus propuestas. Confirma experiencia en el stack durante la preselección antes de adjudicar el proyecto.",
    faq7q: "¿Está DEWEB Marketplace disponible para proyectos de automatización internacionales?",
    faq7a:
      "DEWEB atiende clientes globalmente con interfaces en inglés, español, ruso y armenio. Puedes publicar proyectos de automatización, revisar propuestas y coordinar la entrega a través de la plataforma independientemente de dónde opere tu negocio.",
    ctaTitle: "Publica tu proyecto de automatización y contrata especialistas",
    ctaDescription:
      "Publica tus requisitos en DEWEB Marketplace, compara propuestas cualificadas e implementa automatización con IA en la que tu equipo de operaciones pueda confiar.",
    ctaPrimary: "Publicar anuncio de proyecto",
    ctaSecondary: "Hablar con DEWEB primero",
  },
  am: {
    breadcrumbHome: "Գլխավոր",
    breadcrumbMarketplace: "Marketplace",
    breadcrumbCurrent: "Վարձել AI ավտոմատացման մասնագետներ",
    kicker: "Վարձել AI ավտոմատացման մասնագետներ",
    title: "Վարձեք AI ավտոմատացման մասնագետներ workflow և intelligent operations-ի համար",
    subtitle:
      "Հրապարակեք ավտոմատացման նախագիծը DEWEB Marketplace-ում, համեմատեք մասնագետների առաջարկները և deploy արեք AI workflow-եր, ինտեգրացիաներ և operational intelligence պարզ scope և ROI-ով։",
    whyHireTitle: "Ինչու վարձել AI ավտոմատացման մասնագետներ DEWEB-ի միջոցով",
    whyHireP1:
      "AI ավտոմատացումը commercial value ստեղծում է միայն երբ հուսալիորեն հանում է repeatable աշխատանքը — ոչ թե երբ լավ է demo-ում slide deck-ում։ Ճիշտ մասնագետը կապում է CRM-ը, ecommerce stack-ը, support գործիքները և internal API-ները governed workflow-երի մեջ՝ document processing, ticket triage, lead routing, inventory alerts և decision support, որ operations թիմը կարող է audit և improve անել ժամանակի ընթացքում.",
    whyHireP2:
      "DEWEB Marketplace-ը գնորդներին տալիս է transparent միջոց AI ավտոմատացման մասնագետներ վարձելու՝ առանց անթափանց agency retainer-ների կամ mismatched freelance generalist-ների։ Դուք հրապարակում եք brief բյուջեով և deadline-ով, ուսումնասիրում AI capabilities և production constraints հասկացող ինժեներների առաջարկները և համեմատում fit-ը commit-ից առաջ։ Երբ պետք է managed rollout, DEWEB-ը նաև deliver է agency-led AI business automation, chatbot engineering և կապված web integrations — որպեսզի hiring intent-ը listings-ում չմնա.",
    typesTitle: "AI ավտոմատացման մասնագետների տեսակներ, որոնց կարող եք վարձել",
    typesIntro:
      "Automation նախագծերը blend են workflow design, integration engineering և часто conversational AI։ DEWEB Marketplace-ում կարող եք target անել stack-ին և maturity-ին համապատասխան մասնագետներ՝ single high-impact workflow-ից մինչև multi-department rollout.",
    typeItem1:
      "Workflow automation ինժեներներ — orchestration CRM, ERP, ecommerce և internal tools-ի միջև reliable trigger-ներով և error handling-ով",
    typeItem2:
      "AI agent մշակողներ — task-specific assistant-ներ retrieval, guardrail-ներով և human escalation support և operations-ի համար",
    typeItem3:
      "Document և data automation մասնագետներ — extraction, classification, validation և routing finance և operations թիմերի համար",
    typeItem4:
      "Ecommerce automation ինժեներներ — order alerts, inventory sync, customer messaging և campaign operations Shopify և custom stack-երի համար",
    typeItem5:
      "Integration architect-ներ — API, webhook, queue և monitoring 24/7 production automation-ի համար",
    typeItem6:
      "Automation lead-եր — process discovery, KPI definition, phased rollout planning և governance multi-team program-ների համար",
    engagementTitle: "Automation մասնագետներ վարձելու engagement մոդելներ",
    engagementIntro:
      "Կոմերցիոն գնորդերը սովորաբար evaluate են marketplace hiring, agency delivery կամ hybrid staffing automation scope expand անելուց առաջ։ DEWEB-ը աջակցում է ստորև նշված ուղիները.",
    engagement1Title: "Marketplace նախագծի հրապարակում",
    engagement1Desc:
      "Հրապարակեք customer requirement, նկարագրեք automate անելի process-ները և հրավիրեք առաջարկներ անկախ AI և workflow մասնագետներից։ Լավագույնն է, երբ ցանկանում եք մրցակցային bidding և fit-ի ուղղակի համեմատություն.",
    engagement1Link: "Դիտել DEWEB Marketplace hub-ը",
    engagement2Title: "Գործակալության AI automation delivery",
    engagement2Desc:
      "Աշխատեք DEWEB թիմի հետ discovery, workflow design, engineering, QA և phased rollout-ի վրա, երբ preferում եք managed production գործընկեր freelanc-եր ինքնուրույն հավաքելու փոխարեն.",
    engagement2Link: "AI business ավտոմատացման ծառայություններ",
    engagement3Title: "AI chatbot և assistant build-եր",
    engagement3Desc:
      "Երբ automation-ը ներառում է customer-facing conversational AI, վարձեք մասնագետներ, որոնք combine են chatbot engineering CRM-connected workflow-երով և support operations-ով.",
    engagement3Link: "AI chatbot զարգացման ծառայություններ",
    engagement4Title: "Messaging և Telegram automation",
    engagement4Desc:
      "Telegram support, notification կամ Mini App-ով automate անող թիմերի համար align արեք վարձումը bot engineers-ի հետ, որոնք messaging-ը integrate են broader operational workflow-երի մեջ.",
    engagement4Link: "Telegram բոտերի զարգացման ծառայություններ",
    processTitle: "Ինչպես է աշխատում վարձման գործընթացը",
    processStep1Title: "Map արեք process-ները և success metrics-ը",
    processStep1Desc:
      "Փ documenting արեք current workflow-երը, pain point-երը, involved system-ները, compliance constraint-ները և KPI-ները։ Պարզ brief-ը attracting է ավելի ուժեղ առաջարկներ և կանխում automation, որը measure չի լինի.",
    processStep2Title: "Հրապարակեք DEWEB Marketplace-ում",
    processStep2Desc:
      "Ստեղծեք ցանկ title, description, budget range և timeline-ով։ Մուտք գործած հաճախորդները կարող են customer need հրապարակել account dashboard-ից րոպեների ընթացքում.",
    processStep3Title: "Ուսումնասիրեք և shortlist արեք առաջարկները",
    processStep3Desc:
      "Համեմատեք հաղորդագրությունները, առաջարկված գինը, delivery timeline-ը և relevant automation փորձը։ Հարցեր տվեք DEWEB messaging-ում մինչև գործընկեր ընտրելը.",
    processStep4Title: "Pilot agreed milestone-ներով",
    processStep4Desc:
      "Սկսեք bounded pilot workflow-ով, validate արեք KPI-ները, ապա expand արեք scope-ը։ Milestone-based delivery-ը AI automation նախագծերը predictable է պահում երկու կողմերի համար.",
    processStep5Title: "Scale արեք DEWEB գործակալության աջակցությամբ, երբ պետք է",
    processStep5Desc:
      "Եթե scope-ը grows է departments-ի միջև կամ requires unified governance, escalate արեք DEWEB contact-ին agency delivery, լրացուցիչ staffing կամ hybrid marketplace plus managed team մոդելների համար.",
    relatedTitle: "Սկսեք AI ավտոմատացման մասնագետներ վարձել այսօր",
    relatedP1: "Պատրա՞ստ եք անցնել manual work-ից measured automation-ի։ Վերադարձեք",
    relatedMarketplaceLink: "software development marketplace",
    relatedP2: ", explore արեք",
    relatedServiceLink: "AI business ավտոմատացման ծառայություններ",
    relatedP3: "agency delivery-ի համար, կամ",
    relatedContactLink: "կապվեք DEWEB-ի հետ",
    relatedP4: "requirements shape անելու համար հրապարակումից առաջ.",
    faqTitle: "Հաճախ տրվող հարցեր",
    faq1q: "Ինչպե՞ս վարձել AI ավտոմատացման մասնագետներ DEWEB Marketplace-ում։",
    faq1a:
      "Ստեղծեք DEWEB account, հրապարակեք customer requirement process scope, integrations, budget և deadline-ով, ապա review արեք automation և AI մասնագետների առաջարկները։ Կարող եք message անել candidate-ներին և ընտրել լավագույն fit-ը work սկսելուց առաջ.",
    faq2q: "Ի՞նչ ներառել AI automation project listing-ում։",
    faq2a:
      "Ներառեք automate անելի process-ները, involved system-ները, data sensitivity, expected KPI-ներ, timeline և budget range։ Ուժեղ ցանկերը բացատրում են success-ը first pilot-ից հետո և որ risk-երն են business-ի համար ամենակարևորը.",
    faq3q: "Կարո՞ղ եմ վարձել մասնագետներ workflow automation-ի և AI chatbot-ների համար։",
    faq3a:
      "Այո։ Շատ նախագծեր combine են orchestration conversational AI-ի հետ։ DEWEB Marketplace-ը support է mixed scope-եր, DEWEB agency services-ը cover են AI business automation և AI chatbot development unified delivery-ի համար.",
    faq4q: "Ե՞րբ օգտագործել marketplace hiring vs DEWEB agency automation services.",
    faq4a:
      "Օգտագործեք marketplace hiring, երբ ցանկանում եք համեմատել independent առաջարկները և ուղղակի manage անել delivery-ն։ Ընտրեք DEWEB agency AI automation, երբ պետք է managed team, unified QA, governance և production accountability մեկ գործընկերից.",
    faq5q: "Որքա՞ն արժե AI ավտոմատացման մասնագետներ վարձելը։",
    faq5a:
      "Ծախսերը կախված են workflow complexity-ից, integration depth-ից, AI scope-ից և timeline-ից։ Marketplace ցանկերը թույլ են տալիս budget expectations սահմանել upfront և համեմատել proposed rate-երը commit-ից առաջ — դա commercial hiring-ը transparent է պահում.",
    faq6q: "Automation մասնագետները integrate կարո՞ղ են Shopify, CRM և custom API-ների հետ։",
    faq6a:
      "Այո։ Փորձառու մասնագետները պետք է նկարագրեն integration approach, error handling և monitoring-ը իրենց առաջարկներում։ Հաստատեք stack experience shortlisting-ի ժամանակ project award-ից առաջ.",
    faq7q: "DEWEB Marketplace-ը հասանելի՞ է international automation նախագծերի համար։",
    faq7a:
      "DEWEB-ը serve է global հաճախորդներ անգլերեն, իսպաներեն, ռուսերեն և հայերեն interface-ներով։ Կարող եք post անել automation նախագծեր, review անել առաջարկները և coordinate անել delivery-ն platform-ի միջոցով անկախ business location-ից.",
    ctaTitle: "Հրապարակեք automation նախագիծը և վարձեք մասնագետներ",
    ctaDescription:
      "Հրապարակեք requirements-ը DEWEB Marketplace-ում, համեմատեք qualified առաջարկները և deploy արեք AI automation, որին ձեր operations թիմը կարող է trust անել։",
    ctaPrimary: "Հրապարակել project listing",
    ctaSecondary: "Նախ խոսել DEWEB-ի հետ",
  },
};

const LOCALES = ["ru", "es", "am"];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
  const enPath = path.join(MESSAGES_DIR, "en.json");
  const en = readJson(enPath);

  const enTelegram = en.marketplace.hireTelegramBotDevelopers;
  const enAi = en.marketplace.hireAiAutomationSpecialists;

  if (!enTelegram || !enAi) {
    throw new Error("Missing EN source blocks: hireTelegramBotDevelopers or hireAiAutomationSpecialists");
  }

  console.log("apply-p3a-i18n: merging P3A marketplace translations\n");

  for (const locale of LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const data = readJson(filePath);

    assertKeys(enTelegram, hireTelegramBotDevelopers[locale], `${locale} hireTelegramBotDevelopers`);
    assertKeys(enAi, hireAiAutomationSpecialists[locale], `${locale} hireAiAutomationSpecialists`);

    deepMerge(data, {
      marketplace: {
        hub: hubPatches[locale],
        hireTelegramBotDevelopers: hireTelegramBotDevelopers[locale],
        hireAiAutomationSpecialists: hireAiAutomationSpecialists[locale],
      },
      seo: seoPatches[locale],
    });

    writeJson(filePath, data);
    console.log(`  ✓ ${locale}.json updated`);
  }

  const ruTelegramWords = countWords(hireTelegramBotDevelopers.ru);
  const ruAiWords = countWords(hireAiAutomationSpecialists.ru);
  const enTelegramWords = countWords(enTelegram);
  const enAiWords = countWords(enAi);

  console.log("\nWord counts (hireTelegramBotDevelopers):");
  console.log(`  EN: ${enTelegramWords}`);
  console.log(`  RU: ${ruTelegramWords}`);
  console.log("\nWord counts (hireAiAutomationSpecialists):");
  console.log(`  EN: ${enAiWords}`);
  console.log(`  RU: ${ruAiWords}`);
  console.log("\nDone.");
}

main();
