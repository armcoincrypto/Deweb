#!/usr/bin/env node
import fs from "fs";
import path from "path";

const MESSAGES_DIR = path.join(process.cwd(), "src/i18n/messages");

const authorityPacks = {
  en: {
    exampleProjectsTitle: "Example Projects Posted on DEWEB",
    exampleProjectsSubtitle:
      "Examples of the types of software projects commonly published through development marketplaces.",
    exampleDisclaimer:
      "These cards show illustrative project scopes only — not live listings, bids, or completed client work on DEWEB.",
    exampleBadge: "Illustrative project example",
    budgetLabel: "Budget",
    relatedServiceLink: "View related DEWEB service",
    example1Title: "Telegram Bot Development",
    example1Budget: "$500–$3,000",
    example1Desc:
      "Customer support bot, CRM integration, notifications, payment support.",
    example2Title: "AI Automation Workflow",
    example2Budget: "$1,000–$8,000",
    example2Desc:
      "Document processing, CRM automation, AI assistants, workflow orchestration.",
    example3Title: "Shopify Store Development",
    example3Budget: "$2,000–$15,000",
    example3Desc:
      "Store creation, migrations, custom integrations, checkout optimization.",
    example4Title: "SaaS Platform MVP",
    example4Budget: "$5,000–$50,000+",
    example4Desc:
      "Multi-user web application, subscriptions, dashboards, APIs.",
    example5Title: "Marketplace Platform Development",
    example5Budget: "$10,000–$100,000+",
    example5Desc:
      "Vendor onboarding, messaging, payments, moderation, analytics.",
    example6Title: "Custom Web Application",
    example6Budget: "$2,000–$30,000+",
    example6Desc:
      "Internal tools, portals, customer dashboards, business software.",
    popularCategoriesTitle: "Popular Development Categories",
    popularCategoriesIntro:
      "Browse DEWEB service pages to learn how we deliver projects in high-demand categories before you publish a listing.",
    categoryTelegram: "Telegram Bot Development",
    categoryAi: "AI Business Automation",
    categoryWeb: "Web Application Development",
    categoryMarketplace: "Marketplace Development",
    categoryShopify: "Shopify Development",
    categorySaas: "SaaS Development",
    hiringProcessTitle: "How Hiring Works",
    hiringProcessIntro:
      "When live listings appear on DEWEB Marketplace, this is the typical flow clients and specialists follow.",
    step1Title: "Publish a project",
    step1Desc:
      "Describe scope, budget range, timeline, and requirements in a customer listing from your DEWEB account.",
    step2Title: "Compare proposals",
    step2Desc:
      "Review messages, proposed price, and delivery approach from specialists who respond to your brief.",
    step3Title: "Discuss requirements",
    step3Desc:
      "Clarify integrations, milestones, and acceptance criteria in DEWEB messaging before you select a partner.",
    step4Title: "Start development",
    step4Desc:
      "Kick off delivery with agreed milestones — independently on the marketplace or with DEWEB agency support if needed.",
    benefitsTitle: "Why Use DEWEB Marketplace?",
    benefit1: "Compare multiple specialists instead of relying on a single opaque quote.",
    benefit2: "Publish requirements once and invite relevant technical proposals.",
    benefit3: "Evaluate technical proposals with clear scope, price, and timeline fields.",
    benefit4:
      "Work with independent specialists or DEWEB delivery teams when you need managed production support.",
    benefit5: "Suitable for startups validating MVPs and established businesses staffing specific workstreams.",
    benefitsCtaPrimary: "Post your first project",
    benefitsCtaSecondary: "Talk to DEWEB first",
    trustTitle: "What Makes a Strong Project Brief?",
    trustIntro:
      "Strong briefs attract better proposals — even before the marketplace fills with live listings. Use this checklist when you prepare to publish.",
    brief1Title: "Scope",
    brief1Desc:
      "Define outcomes, user flows, integrations, and what is explicitly out of scope for the first release.",
    brief2Title: "Budget",
    brief2Desc:
      "Share a realistic range so specialists can propose approaches that match your constraints.",
    brief3Title: "Timeline",
    brief3Desc:
      "Include target launch dates, milestone expectations, and any hard external deadlines.",
    brief4Title: "Requirements",
    brief4Desc:
      "List preferred stack, assets available, compliance needs, and systems the project must connect to.",
    brief5Title: "Success criteria",
    brief5Desc:
      "Explain how you will judge completion — KPIs, acceptance tests, or launch conditions that matter to your business.",
  },
  ru: {
    exampleProjectsTitle: "Примеры проектов на DEWEB",
    exampleProjectsSubtitle:
      "Примеры типов software-проектов, которые обычно публикуют через маркетплейсы разработки.",
    exampleDisclaimer:
      "Карточки показывают только иллюстративные scope — не live-листинги, ставки или завершённые клиентские проекты на DEWEB.",
    exampleBadge: "Иллюстративный пример проекта",
    budgetLabel: "Бюджет",
    relatedServiceLink: "Смотреть связанную услугу DEWEB",
    example1Title: "Разработка Telegram-ботов",
    example1Budget: "$500–$3,000",
    example1Desc:
      "Бот поддержки, CRM-интеграция, уведомления, поддержка платежей.",
    example2Title: "AI automation workflow",
    example2Budget: "$1,000–$8,000",
    example2Desc:
      "Обработка документов, CRM-автоматизация, AI-ассистенты, оркестрация процессов.",
    example3Title: "Разработка Shopify-магазина",
    example3Budget: "$2,000–$15,000",
    example3Desc:
      "Создание магазина, миграции, кастомные интеграции, оптимизация checkout.",
    example4Title: "SaaS platform MVP",
    example4Budget: "$5,000–$50,000+",
    example4Desc:
      "Multi-user web-приложение, подписки, dashboards, API.",
    example5Title: "Разработка marketplace-платформы",
    example5Budget: "$10,000–$100,000+",
    example5Desc:
      "Онбординг вендоров, messaging, платежи, модерация, analytics.",
    example6Title: "Custom web-приложение",
    example6Budget: "$2,000–$30,000+",
    example6Desc:
      "Internal tools, порталы, customer dashboards, business software.",
    popularCategoriesTitle: "Популярные категории разработки",
    popularCategoriesIntro:
      "Изучите страницы услуг DEWEB, чтобы понять delivery в востребованных категориях до публикации листинга.",
    categoryTelegram: "Разработка Telegram-ботов",
    categoryAi: "AI-автоматизация бизнеса",
    categoryWeb: "Разработка веб-приложений",
    categoryMarketplace: "Marketplace-разработка",
    categoryShopify: "Разработка Shopify",
    categorySaas: "SaaS-разработка",
    hiringProcessTitle: "Как работает найм",
    hiringProcessIntro:
      "Когда на DEWEB Marketplace появятся live-листинги, клиенты и специалисты обычно следуют этому flow.",
    step1Title: "Опубликуйте проект",
    step1Desc:
      "Опишите scope, диапазон бюджета, timeline и требования в customer listing из аккаунта DEWEB.",
    step2Title: "Сравните предложения",
    step2Desc:
      "Изучите сообщения, предложенную цену и подход к delivery от откликнувшихся специалистов.",
    step3Title: "Обсудите требования",
    step3Desc:
      "Уточните интеграции, milestone и критерии приёмки в messaging DEWEB до выбора партнёра.",
    step4Title: "Начните разработку",
    step4Desc:
      "Запустите delivery с согласованными milestone — через marketplace или с поддержкой агентства DEWEB.",
    benefitsTitle: "Зачем использовать DEWEB Marketplace?",
    benefit1: "Сравнивайте нескольких специалистов вместо одной непрозрачной котировки.",
    benefit2: "Публикуйте требования один раз и приглашайте релевантные технические предложения.",
    benefit3: "Оценивайте proposals с понятными полями scope, price и timeline.",
    benefit4:
      "Работайте с независимыми специалистами или командами DEWEB, когда нужна managed production support.",
    benefit5: "Подходит стартапам с MVP и зрелым компаниям, которым нужны точечные workstreams.",
    benefitsCtaPrimary: "Опубликовать первый проект",
    benefitsCtaSecondary: "Сначала поговорить с DEWEB",
    trustTitle: "Что делает сильный project brief?",
    trustIntro:
      "Сильные briefs привлекают лучшие предложения — даже до появления live-листингов. Используйте этот checklist перед публикацией.",
    brief1Title: "Scope",
    brief1Desc:
      "Определите outcomes, user flows, интеграции и что явно вне scope первого релиза.",
    brief2Title: "Бюджет",
    brief2Desc:
      "Укажите реалистичный диапазон, чтобы специалисты предложили подходящие варианты.",
    brief3Title: "Timeline",
    brief3Desc:
      "Добавьте target launch dates, ожидания по milestone и жёсткие external deadlines.",
    brief4Title: "Требования",
    brief4Desc:
      "Перечислите preferred stack, доступные assets, compliance и системы для интеграции.",
    brief5Title: "Критерии успеха",
    brief5Desc:
      "Объясните, как вы оцените completion — KPI, acceptance tests или launch conditions для бизнеса.",
  },
  es: {
    exampleProjectsTitle: "Ejemplos de proyectos publicados en DEWEB",
    exampleProjectsSubtitle:
      "Ejemplos de los tipos de proyectos de software que suelen publicarse en marketplaces de desarrollo.",
    exampleDisclaimer:
      "Estas tarjetas muestran alcances ilustrativos únicamente — no anuncios activos, ofertas ni trabajos completados en DEWEB.",
    exampleBadge: "Ejemplo ilustrativo de proyecto",
    budgetLabel: "Presupuesto",
    relatedServiceLink: "Ver servicio DEWEB relacionado",
    example1Title: "Desarrollo de bots de Telegram",
    example1Budget: "$500–$3,000",
    example1Desc:
      "Bot de soporte, integración CRM, notificaciones, soporte de pagos.",
    example2Title: "Flujo de automatización con IA",
    example2Budget: "$1,000–$8,000",
    example2Desc:
      "Procesamiento de documentos, automatización CRM, asistentes IA, orquestación de flujos.",
    example3Title: "Desarrollo de tienda Shopify",
    example3Budget: "$2,000–$15,000",
    example3Desc:
      "Creación de tienda, migraciones, integraciones personalizadas, optimización de checkout.",
    example4Title: "MVP de plataforma SaaS",
    example4Budget: "$5,000–$50,000+",
    example4Desc:
      "Aplicación web multiusuario, suscripciones, dashboards, APIs.",
    example5Title: "Desarrollo de plataforma marketplace",
    example5Budget: "$10,000–$100,000+",
    example5Desc:
      "Onboarding de vendedores, mensajería, pagos, moderación, analytics.",
    example6Title: "Aplicación web a medida",
    example6Budget: "$2,000–$30,000+",
    example6Desc:
      "Herramientas internas, portales, dashboards de clientes, software empresarial.",
    popularCategoriesTitle: "Categorías de desarrollo populares",
    popularCategoriesIntro:
      "Explora las páginas de servicios DEWEB para entender la entrega en categorías de alta demanda antes de publicar un anuncio.",
    categoryTelegram: "Desarrollo de bots de Telegram",
    categoryAi: "Automatización empresarial con IA",
    categoryWeb: "Desarrollo de aplicaciones web",
    categoryMarketplace: "Desarrollo de marketplaces",
    categoryShopify: "Desarrollo Shopify",
    categorySaas: "Desarrollo SaaS",
    hiringProcessTitle: "Cómo funciona la contratación",
    hiringProcessIntro:
      "Cuando haya anuncios activos en DEWEB Marketplace, clientes y especialistas suelen seguir este flujo.",
    step1Title: "Publica un proyecto",
    step1Desc:
      "Describe alcance, rango de presupuesto, plazo y requisitos en un anuncio de cliente desde tu cuenta DEWEB.",
    step2Title: "Compara propuestas",
    step2Desc:
      "Revisa mensajes, precio propuesto y enfoque de entrega de especialistas que respondan a tu brief.",
    step3Title: "Discute requisitos",
    step3Desc:
      "Aclara integraciones, hitos y criterios de aceptación en la mensajería DEWEB antes de elegir un socio.",
    step4Title: "Inicia el desarrollo",
    step4Desc:
      "Arranca la entrega con hitos acordados — de forma independiente en el marketplace o con apoyo de agencia DEWEB.",
    benefitsTitle: "¿Por qué usar DEWEB Marketplace?",
    benefit1: "Compara varios especialistas en lugar de depender de una sola cotización opaca.",
    benefit2: "Publica requisitos una vez e invita propuestas técnicas relevantes.",
    benefit3: "Evalúa propuestas técnicas con campos claros de alcance, precio y plazo.",
    benefit4:
      "Trabaja con especialistas independientes o equipos DEWEB cuando necesites soporte de producción gestionado.",
    benefit5: "Adecuado para startups que validan MVPs y empresas consolidadas que necesitan workstreams específicos.",
    benefitsCtaPrimary: "Publicar tu primer proyecto",
    benefitsCtaSecondary: "Hablar primero con DEWEB",
    trustTitle: "¿Qué hace un brief de proyecto sólido?",
    trustIntro:
      "Los briefs sólidos atraen mejores propuestas — incluso antes de que el marketplace tenga anuncios activos. Usa esta checklist al preparar tu publicación.",
    brief1Title: "Alcance",
    brief1Desc:
      "Define resultados, flujos de usuario, integraciones y qué queda explícitamente fuera del primer release.",
    brief2Title: "Presupuesto",
    brief2Desc:
      "Comparte un rango realista para que los especialistas propongan enfoques acordes a tus restricciones.",
    brief3Title: "Plazo",
    brief3Desc:
      "Incluye fechas objetivo de lanzamiento, expectativas de hitos y deadlines externos inamovibles.",
    brief4Title: "Requisitos",
    brief4Desc:
      "Lista stack preferido, assets disponibles, necesidades de compliance y sistemas a conectar.",
    brief5Title: "Criterios de éxito",
    brief5Desc:
      "Explica cómo juzgarás la finalización — KPIs, pruebas de aceptación o condiciones de lanzamiento importantes.",
  },
  am: {
    exampleProjectsTitle: "DEWEB-ում հրապարակված նախագծերի օրինակներ",
    exampleProjectsSubtitle:
      "Software նախագծերի տեսակների օրինակներ, որոնք սովորաբար հրապարակվում են development marketplace-ներում։",
    exampleDisclaimer:
      "Քարտերը ցույց են տալիս միայն illustrative scope — ոչ live ցանկեր, bidding կամ DEWEB-ում ավարտված client աշխատանք։",
    exampleBadge: "Illustrative project example",
    budgetLabel: "Բյուջե",
    relatedServiceLink: "Դիտել DEWEB related service",
    example1Title: "Telegram Bot Development",
    example1Budget: "$500–$3,000",
    example1Desc:
      "Customer support bot, CRM integration, notifications, payment support.",
    example2Title: "AI Automation Workflow",
    example2Budget: "$1,000–$8,000",
    example2Desc:
      "Document processing, CRM automation, AI assistants, workflow orchestration.",
    example3Title: "Shopify Store Development",
    example3Budget: "$2,000–$15,000",
    example3Desc:
      "Store creation, migrations, custom integrations, checkout optimization.",
    example4Title: "SaaS Platform MVP",
    example4Budget: "$5,000–$50,000+",
    example4Desc:
      "Multi-user web application, subscriptions, dashboards, APIs.",
    example5Title: "Marketplace Platform Development",
    example5Budget: "$10,000–$100,000+",
    example5Desc:
      "Vendor onboarding, messaging, payments, moderation, analytics.",
    example6Title: "Custom Web Application",
    example6Budget: "$2,000–$30,000+",
    example6Desc:
      "Internal tools, portals, customer dashboards, business software.",
    popularCategoriesTitle: "Popular Development Categories",
    popularCategoriesIntro:
      "Ուսումնասիրեք DEWEB service էջերը high-demand կատեգորիաներում delivery-ն հասկանալու համար՝ նախքան ցանկ հրապարակելը։",
    categoryTelegram: "Telegram Bot Development",
    categoryAi: "AI Business Automation",
    categoryWeb: "Web Application Development",
    categoryMarketplace: "Marketplace Development",
    categoryShopify: "Shopify Development",
    categorySaas: "SaaS Development",
    hiringProcessTitle: "How Hiring Works",
    hiringProcessIntro:
      "Live ցանկեր հայտնվելուց հետո DEWEB Marketplace-ում client-ներն ու specialist-ները սովորաբար հետևում են այս flow-ին։",
    step1Title: "Publish a project",
    step1Desc:
      "Describe scope, budget range, timeline, and requirements in a customer listing from your DEWEB account.",
    step2Title: "Compare proposals",
    step2Desc:
      "Review messages, proposed price, and delivery approach from specialists who respond to your brief.",
    step3Title: "Discuss requirements",
    step3Desc:
      "Clarify integrations, milestones, and acceptance criteria in DEWEB messaging before you select a partner.",
    step4Title: "Start development",
    step4Desc:
      "Kick off delivery with agreed milestones — independently on the marketplace or with DEWEB agency support if needed.",
    benefitsTitle: "Why Use DEWEB Marketplace?",
    benefit1: "Compare multiple specialists instead of relying on a single opaque quote.",
    benefit2: "Publish requirements once and invite relevant technical proposals.",
    benefit3: "Evaluate technical proposals with clear scope, price, and timeline fields.",
    benefit4:
      "Work with independent specialists or DEWEB delivery teams when you need managed production support.",
    benefit5: "Suitable for startups validating MVPs and established businesses staffing specific workstreams.",
    benefitsCtaPrimary: "Post your first project",
    benefitsCtaSecondary: "Talk to DEWEB first",
    trustTitle: "What Makes a Strong Project Brief?",
    trustIntro:
      "Strong briefs attract better proposals — even before the marketplace fills with live listings. Use this checklist when you prepare to publish.",
    brief1Title: "Scope",
    brief1Desc:
      "Define outcomes, user flows, integrations, and what is explicitly out of scope for the first release.",
    brief2Title: "Budget",
    brief2Desc:
      "Share a realistic range so specialists can propose approaches that match your constraints.",
    brief3Title: "Timeline",
    brief3Desc:
      "Include target launch dates, milestone expectations, and any hard external deadlines.",
    brief4Title: "Requirements",
    brief4Desc:
      "List preferred stack, assets available, compliance needs, and systems the project must connect to.",
    brief5Title: "Success criteria",
    brief5Desc:
      "Explain how you will judge completion — KPIs, acceptance tests, or launch conditions that matter to your business.",
  },
};

for (const locale of ["en", "ru", "es", "am"]) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.marketplace.authority = authorityPacks[locale];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`✓ ${locale}.json`);
}
