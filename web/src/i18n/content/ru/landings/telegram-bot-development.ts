import type { LandingTexts } from "@/lib/i18n/content/types";

export const telegramBotDevelopment: LandingTexts = {
  h1: "Услуги разработки Telegram-ботов",
  subtitle:
    "Создавайте Telegram-ботов, Mini Apps, платёжные сценарии, CRM-интеграции и AI-ассистентов для автоматизации поддержки, продаж и операций.",
  heroBadge: "Автоматизация в мессенджерах",
  priceRange: "От $300",
  intro: [
    "Telegram — один из самых быстрых способов выйти к клиентам там, где они уже общаются. Грамотно построенный Telegram-бот мгновенно отвечает на вопросы, собирает лиды, обрабатывает заказы и передаёт сложные кейсы команде — без необходимости устанавливать отдельное приложение. Наша услуга разработки Telegram-ботов фокусируется на практических бизнес-результатах: быстрее ответы, чище handoff и автоматизация, которой операционная команда может доверять в production.",
    "Профессиональные Telegram-боты — это больше, чем скриптовые ответы. Нужны надёжная webhook-архитектура, безопасная работа с токенами, структурированные conversation flows и интеграции с уже используемыми системами — CRM, e-commerce, внутренние API и платёжные провайдеры. Проектируем ботов на официальном Telegram Bot API с maintainable backend на Node.js или Python, чтобы продукт масштабировался по мере роста объёма сообщений и функциональности.",
    "Support assistant для клиентов, sales-бот для квалификации лидов, storefront с оплатой или Telegram Mini App — DEWEB обеспечивает end-to-end delivery: discovery, UX flows, engineering, deployment и post-launch support. Работайте с нашей agency-командой напрямую или опубликуйте проект на DEWEB Marketplace, чтобы сравнить предложения от проверенных bot-разработчиков.",
  ],
  sections: [
    {
      title: "Что мы создаём для Telegram",
      paragraphs: [
        "Разрабатываем Telegram-ботов для поддержки, продаж, операций и community management. Типичные решения: FAQ-боты и маршрутизация тикетов, lead capture flows со структурированной квалификацией, notification-боты, связанные с продуктом или back office, и admin workflow-боты для внутренних команд — одобрение запросов, мониторинг активности. Каждый проект начинается с ясных user journeys, чтобы автоматизация снижала ручной труд, а не создавала путаницу.",
        "Для e-commerce и service-бизнеса — payment и order bots, subscription flows, просмотр каталога внутри Telegram. Когда нужен richer interface, реализуем Telegram Mini Apps: conversational entry points плюс полноценные web UI components. Scope под ваш funnel — от lightweight MVP до multi-module платформ с analytics и admin dashboards.",
      ],
    },
    {
      title: "Архитектура Telegram Bot API",
      paragraphs: [
        "Production Telegram-ботам нужна асинхронная обработка, безопасность webhook и предсказуемая обработка ошибок. Настраиваем webhooks с HTTPS endpoints, валидируем update payloads и ставим тяжёлые задачи в очередь — бот остаётся отзывчивым под нагрузкой. Backend структурирован для idempotent message handling, retry logic и понятного logging при сбоях third-party API или rate limits.",
        "Выбираем стек — Node.js с grammY или Telegraf, или Python с aiogram — в зависимости от вашей инфраструктуры и интеграций. Database design покрывает user state, conversation context, permissions и audit trails. Эта база упрощает добавление функций позже — новые commands, broadcast campaigns, role-based admin tools — без перестройки core bot.",
      ],
    },
    {
      title: "Платежи, подписки и checkout flows",
      paragraphs: [
        "Telegram поддерживает payment experiences через интеграции с провайдерами и structured checkout flows. Реализуем payment bots: товары или планы, invoices, подтверждение успешных транзакций через secure webhook handling. Subscription и membership models — когда провайдер и business rules допускают recurring billing внутри bot journey.",
        "Payment flows с ясными шагами подтверждения, error recovery и admin visibility. Order events связаны с fulfillment — digital delivery, CRM updates, уведомления operations staff. Если на web уже используете Stripe или аналоги, оцениваем, как выровнять эти системы с Telegram payment requirements для вашего рынка и use case.",
      ],
    },
    {
      title: "Интеграции CRM, сайта и backend",
      paragraphs: [
        "Боты дают максимум ценности при синхронизации с бизнес-системами. Интегрируем Telegram-ботов с CRM, helpdesk, e-commerce backends и custom APIs — разговоры создают structured records, а не изолированные chat logs. Lead data, support tickets, статус заказа и user attributes автоматически между Telegram и source-of-truth системами.",
        "Интеграции сайта и продукта: старт на сайте и продолжение в Telegram или наоборот. Deep links, authenticated sessions, webhook-based event sync — согласованный опыт по каналам. Для internal tooling — admin panels или lightweight dashboards: управление контентом бота, мониторинг разговоров, настройка automation rules без redeploy кода при каждом изменении текста.",
      ],
    },
    {
      title: "Telegram Mini Apps и web experiences",
      paragraphs: [
        "Telegram Mini Apps (Web Apps) дают app-like интерфейсы внутри Telegram — формы, каталоги, booking flows, личные кабинеты — с Telegram как entry point. Проектируем Mini Apps, когда conversational menus недостаточны, особенно для e-commerce, onboarding или data-heavy взаимодействий с richer UI.",
        "Mini App projects включают frontend, secure communication с API и alignment с Telegram Web App lifecycle events. Планируем authentication, session handling и mobile-first layout — опыт native внутри Telegram clients. Подходит, когда нужен меньший friction, чем standalone mobile app, но больше возможностей, чем text-only bot.",
      ],
    },
    {
      title: "Безопасность, надёжность и операции",
      paragraphs: [
        "Bot tokens, user data и payment events требуют дисциплинированных security practices. Безопасное хранение secrets, ограничение admin commands, валидация inbound webhooks, rate limiting где нужно. Access control разделяет public user flows и operator tools; чувствительные действия — дополнительная verification или human approval.",
        "Operational reliability: monitoring, alerting, backup routines, deployment без downtime. Документируем hosting requirements, scaling considerations и incident response — команда понимает, как бот работает после launch. Maintenance options: dependency updates, изменения Telegram API, feature iterations.",
      ],
    },
    {
      title: "AI-powered Telegram assistants",
      paragraphs: [
        "Многим командам нужны Telegram-боты, сочетающие structured workflows с AI-generated responses. Строим assistants с retrieval-grounded answers, policy guardrails и human escalation при низкой confidence. Идеально для support bots, которые должны ссылаться на product documentation, internal policies или dynamic catalog data в approved boundaries.",
        "AI Telegram bots scope отдельно от generic chatbots, когда важны conversation quality и integration depth. Если primary need — cross-channel AI support, подойдёт услуга разработки AI-чатботов; для Telegram-native automation с commands, payments и Mini Apps обычно лучше dedicated bot engineering path. Помогаем выбрать архитектуру до начала разработки.",
      ],
    },
    {
      title: "Agency delivery и найм через Marketplace",
      paragraphs: [
        "DEWEB поддерживает два пути для Telegram bot projects. Запросите scoped proposal у delivery team для end-to-end bot engineering или опубликуйте requirements на DEWEB Marketplace, чтобы сравнить специалистов с опытом Telegram и backend. Marketplace listings хороши при defined brief, budget range и timeline; agency delivery — для complex integrations, Mini Apps и multi-phase roadmaps.",
        "Оба пути — одинаковые quality standards для clarity и technical communication. Сильный project brief описывает target users, core flows, integrations, languages и success metrics. Найм через marketplace или контакт с DEWEB напрямую — чёткие requirements ускоряют estimates и улучшают implementation alignment.",
      ],
    },
  ],
  benefits: [
    {
      icon: "💬",
      title: "Ответы клиентам 24/7",
      description:
        "Автоматизируйте ответы, маршрутизацию и уведомления — клиенты получают мгновенную помощь в Telegram.",
    },
    {
      icon: "🎯",
      title: "Lead capture в чате",
      description:
        "Структурированные qualification flows превращают разговоры в CRM-ready лиды и задачи на follow-up.",
    },
    {
      icon: "💳",
      title: "Платежи внутри Telegram",
      description:
        "Каталоги товаров, invoices и checkout flows, согласованные с вашей payment setup.",
    },
    {
      icon: "🔗",
      title: "Связь с вашим стеком",
      description:
        "Интеграции CRM, сайтов, API и internal tools — активность бота питает реальные операции.",
    },
    {
      icon: "📱",
      title: "Mini App experiences",
      description:
        "Richer Telegram Web App интерфейсы, когда menus и text недостаточны.",
    },
    {
      icon: "🛡️",
      title: "Production-ready ops",
      description:
        "Secure webhooks, logging и maintainable backends под реальный трафик и обновления.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Discovery и дизайн flows",
      description:
        "Картируем user journeys, определяем bot commands и screens, согласуем integrations, languages и success metrics до старта разработки.",
    },
    {
      step: 2,
      title: "Архитектура и прототипирование",
      description:
        "Планируем webhook infrastructure, data models и security boundaries, затем валидируем критичные flows clickable или scripted prototypes.",
    },
    {
      step: 3,
      title: "Разработка и интеграции",
      description:
        "Реализуем bot logic, admin tools, CRM или payment connections и Mini App interfaces со structured testing на каждом milestone.",
    },
    {
      step: 4,
      title: "QA, security review и launch",
      description:
        "Тестируем edge cases, payment paths и failure handling, затем deploy в production с monitoring и handoff documentation.",
    },
    {
      step: 5,
      title: "Support и итерации",
      description:
        "Помогаем мониторить usage, исправлять issues и планировать расширения — broadcasts, новые языки, advanced automation.",
    },
  ],
  faqs: [
    {
      question: "Что такое разработка Telegram-ботов?",
      answer:
        "Разработка Telegram-ботов — проектирование, создание и deployment ПО, взаимодействующего с пользователями через Telegram Bot API: commands, menus, payments, integrations и опциональные Mini Apps.",
    },
    {
      question: "Может ли DEWEB создать Telegram Mini Apps?",
      answer:
        "Да. Разрабатываем Telegram Mini Apps, когда проекту нужен richer UI, чем text-based bot: каталоги, формы, booking flows или личные кабинеты внутри Telegram.",
    },
    {
      question: "Может ли Telegram-бот принимать платежи?",
      answer:
        "Во многих случаях — да. Реализуем payment flows через поддерживаемые Telegram payment mechanisms и compatible providers с secure webhook handling и шагами подтверждения заказа.",
    },
    {
      question: "Может ли бот подключиться к CRM или сайту?",
      answer:
        "Да. Интегрируем ботов с CRM, websites, e-commerce platforms и custom APIs — разговоры синхронизируются с существующими business tools.",
    },
    {
      question: "Можете ли вы создать AI-powered Telegram-ботов?",
      answer:
        "Да. Строим assistants, сочетающие Telegram flows с retrieval-based AI, guardrails и human escalation. Также предлагаем dedicated AI chatbot development для broader channel needs.",
    },
    {
      question: "Сколько времени занимает разработка Telegram-бота?",
      answer:
        "Простые боты — часто одна–три недели. Боты с payments, CRM integrations, admin panels или Mini Apps — обычно три–восемь недель в зависимости от scope.",
    },
    {
      question: "Поддерживаете ли существующие боты?",
      answer:
        "Да. Audit, refactor или расширение existing Telegram bots, улучшение reliability, добавление integrations, миграция hosting или webhook setups.",
    },
    {
      question: "Можно ли нанять Telegram bot developers через marketplace?",
      answer:
        "Да. Опубликуйте Telegram bot project на DEWEB Marketplace для proposals от специалистов или свяжитесь с DEWEB для agency-led delivery.",
    },
  ],
  relatedServices: [
    {
      slug: "ai-chatbot-development",
      title: "Разработка AI-чатботов",
      description:
        "Cross-channel AI assistants с retrieval, guardrails и CRM-connected workflows.",
    },
    {
      slug: "ai-business-automation",
      title: "AI-автоматизация бизнеса",
      description:
        "Автоматизация операций AI-workflow в support, sales, finance и internal teams.",
    },
    {
      slug: "marketplace-development",
      title: "Разработка маркетплейсов",
      description:
        "Two-sided платформы с messaging, bidding и payments architecture.",
    },
    {
      slug: "web-application-development",
      title: "Разработка веб-приложений",
      description:
        "API, admin panels и backends для bot и Mini App experiences.",
    },
  ],
  cta: {
    title: "Готовы создать Telegram-бота?",
    description:
      "Расскажите о flows, integrations и timeline — или опубликуйте проект на DEWEB Marketplace, чтобы сравнить предложения разработчиков.",
    primaryLabel: "Бесплатная консультация",
    primaryHref: "/contact",
    secondaryLabel: "Опубликовать проект на DEWEB Marketplace",
    secondaryHref: "/marketplace",
  },
};
