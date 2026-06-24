import type { LandingTexts } from "@/lib/i18n/content/types";

export const marketplaceDevelopment: LandingTexts = {
  h1: "Услуги разработки маркетплейсов",
  subtitle:
    "Создавайте масштабируемые multi-vendor маркетплейсы с надёжными транзакционными потоками и операциями платформы.",
  heroBadge: "Multi-vendor платформы",
  priceRange: "От $2500",
  intro: [
    "Marketplace-бизнесы успешны при балансе трёх потребностей: плавный опыт покупателя, эффективные операции продавца, trustworthy governance платформы. Наша услуга разработки маркетплейсов помогает строить и масштабировать платформы с этим балансом с первого дня. Onboarding продавцов, управление каталогом, discovery, checkout, payouts, dispute handling — интуитивный user journey и управляемая операционная сложность.",
    "В отличие от single-merchant e-commerce, маркетплейсы требуют координации identity, permissions, incentives и financial workflow между типами участников. Архитектура с явными role boundaries, auditable transaction flows, modular components — controlled evolution при меняющейся динамике supply и demand. Быстрее launch без потери reliability для долгосрочной marketplace credibility.",
    "Нишевый B2B marketplace, services marketplace или модернизация legacy platform — end-to-end delivery и optimization support. Product strategy, UX, full-stack engineering, analytics — marketplace растёт уверенно. Resilient platform: liquidity, retention, sustainable unit economics.",
  ],
  sections: [
    {
      title: "Модель маркетплейса и валидация стратегии",
      paragraphs: [
        "До реализации проясняем mechanics: роли участников, value exchange, fee models, trust requirements. Дизайн платформы отражает бизнес-модель — commission, subscription, lead marketplace или hybrid. Критичные assumptions: liquidity, onboarding friction, transaction frequency — roadmap aligned с viability.",
        "Валидация стратегии включает success metrics для supply и demand. Seller activation speed, buyer repeat behavior, order velocity, fulfillment reliability направляют product decisions. Leadership оценивает, производят ли mechanics здоровые network effects со временем.",
      ],
    },
    {
      title: "Role-based UX и информационная архитектура",
      paragraphs: [
        "Маркетплейсы обслуживают несколько групп без перегруза. Distinct yet coherent experiences для buyers, sellers, admins — ясная навигация, permissions, task flows. Быстрые ключевые действия: от listing products до resolution transaction issues.",
        "IA под scale и variability контента. Category structures, search filters, listing templates — discoverability и quality standards. При росте каталога — без navigational chaos, эффективные conversion pathways для high-intent buyers.",
      ],
    },
    {
      title: "Onboarding продавцов и активация supply",
      paragraphs: [
        "Качество supply и скорость onboarding — фундамент роста marketplace. Flows верификации sellers, compliance data, listing setup через clear milestones. Automated checks и contextual guidance — меньше drop-off при сохранении trust и quality.",
        "Activation beyond sign-up: listing quality prompts, pricing guidance, fulfillment setup, performance dashboards. Strong activation — быстрее time-to-first-transaction, выше long-term seller retention.",
      ],
    },
    {
      title: "Каталог, листинги и search experience",
      paragraphs: [
        "Discovery quality зависит от structured listing data и robust search. Listing schemas стандартизируют critical attributes с category-specific flexibility. Лучше filtering, comparison clarity, buyer confidence, особенно в high-consideration категориях.",
        "Search и ranking под buyer intent, supply quality, platform priorities. Relevance controls, boosted placement, anti-spam safeguards — trust в results. Баланс discovery speed и listing quality улучшает conversion, снижает abandoned sessions.",
      ],
    },
    {
      title: "Транзакции, checkout и payment flows",
      paragraphs: [
        "Transaction infrastructure — где выигрывается или теряется trust marketplace. Checkout для multi-vendor carts, shipping logic, taxes, promotional rules — straightforward UX. Payment architecture: reliability, transparent fees, secure processing для всех типов участников.",
        "Order state tracking, cancellation policies, exception handling — меньше post-purchase confusion. Ясный status visibility и predictable next steps на всём lifecycle. Strong transaction design — satisfaction и ниже support burden.",
      ],
    },
    {
      title: "Выплаты, комиссии и финансовый контроль",
      paragraphs: [
        "Marketplace economics требуют точного commission calculation, payout scheduling, financial reconciliation. Payout workflows: configurable fee rules, settlement timing, transparent reporting для sellers и operators. Financial clarity — trust, меньше disputes по earnings visibility.",
        "Reconciliation и auditability в financial layer с начала. Transaction events, adjustments, refunds, fee allocations — traceable records. Controls повышают operational confidence и support compliance при росте transaction volume.",
      ],
    },
    {
      title: "Trust, safety и dispute resolution",
      paragraphs: [
        "Здоровые маркетплейсы зависят от credible trust and safety. Moderation workflows, review controls, fraud risk signals под домен. Policy enforcement — быстрое реагирование на abuse при fairness для legitimate participants.",
        "Dispute resolution: speed, transparency, consistent outcomes. Case intake, evidence handling, decision logging — меньше escalation cycles и customer frustration. Strong safety operations — retention и reputation в competitive markets.",
      ],
    },
    {
      title: "Admin operations и governance платформы",
      paragraphs: [
        "Marketplace teams нуждаются в powerful operational tooling для scale. Admin interfaces: participant management, listing oversight, transaction review, policy enforcement с role-based permissions. Меньше manual effort, быстрее response на operational incidents.",
        "Governance: configurable rules, audit trails, health dashboards для emerging risks. При evolving policy и legal requirements — адаптация без disruptive rewrites. Operational control как strategic advantage, не bottleneck.",
      ],
    },
    {
      title: "Масштабируемость, производительность и надёжность",
      paragraphs: [
        "Непредсказуемые load patterns: promotions, seasonality, network growth. Infrastructure и application layers для resilient scaling, efficient queries, graceful degradation. Stable participant experience в demand spikes и large catalog updates.",
        "Reliability: observability, incident response planning, structured deployment. Мониторинг search, checkout, payouts — proactive alerting и diagnostics. Operational maturity снижает downtime risk, защищает platform trust при росте complexity.",
      ],
    },
    {
      title: "Оптимизация роста и network effects",
      paragraphs: [
        "После launch — mechanisms для liquidity и retention на обеих сторонах. Onboarding experiments, ranking improvements, trust signal refinement, targeted incentives. Приоритеты по measurable effect на transaction volume и repeat behavior.",
        "Experimentation frameworks для systematic growth learning. Analytics и controlled rollout — confident evolution без destabilizing core operations. Iterative discipline превращает early traction в durable network effects.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🛒",
      title: "Сбалансированный UX покупателя и продавца",
      description:
        "Role-specific experiences улучшают usability участников при coherent platform journey.",
    },
    {
      icon: "💸",
      title: "Надёжные финансовые workflow",
      description:
        "Системы commission, payout и reconciliation — прозрачная и точная marketplace economics.",
    },
    {
      icon: "🔍",
      title: "Лучший discovery и конверсия",
      description:
        "Structured listings и tuned ranking повышают search relevance и completion rate транзакций.",
    },
    {
      icon: "🛡️",
      title: "Trust and safety controls",
      description:
        "Moderation и dispute workflow защищают участников и укрепляют credibility платформы.",
    },
    {
      icon: "📊",
      title: "Операционная видимость",
      description:
        "Admin tooling и analytics dashboards — быстрее решения и incident response.",
    },
    {
      icon: "📈",
      title: "Масштабируемый рост marketplace",
      description:
        "Архитектура и optimization frameworks поддерживают liquidity без потери reliability.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Blueprint маркетплейса",
      description:
        "Роли участников, transaction mechanics, fee models, trust requirements через structured discovery. Согласование product, operations, leadership — функционирование marketplace и метрики healthy early traction. Cross-functional readiness: support, finance, operations — reliable participant-facing workflow под transactional pressure. Benchmark satisfaction, operational latency, financial accuracy — strong trust при scale vendor activity и buyer demand.",
    },
    {
      step: 2,
      title: "Дизайн платформы и архитектура",
      description:
        "Role-based user journeys, data models, technical architecture для catalog, checkout, payouts, governance. Scalable, secure, aligned с long-term operational needs до implementation. Readiness checks и trust benchmarks на каждом этапе.",
    },
    {
      step: 3,
      title: "Разработка и интеграция",
      description:
        "Инкрементальная сборка marketplace modules: onboarding, listing management, transaction flows, admin tooling. Payment, identity, communication integrations с reliability controls для production-grade operations.",
    },
    {
      step: 4,
      title: "Тестирование и готовность к запуску",
      description:
        "Comprehensive QA критичных journeys для buyers, sellers, admins в realistic conditions. Operational runbooks, monitoring, rollback — launch confidence и rapid response при initial marketplace activity.",
    },
    {
      step: 5,
      title: "Оптимизация и масштаб",
      description:
        "Participant behavior, transaction outcomes, operational bottlenecks — приоритеты improvements. Ongoing iteration strengthens liquidity, retention, sustainable growth при росте volume и complexity.",
    },
  ],
  faqs: [
    {
      question: "Строите ли product и service маркетплейсы?",
      answer:
        "Да. B2C, B2B, product, service и hybrid marketplace models под ваши бизнес-цели.",
    },
    {
      question: "Можете реализовать multi-vendor checkout и payouts?",
      answer:
        "Безусловно. Secure transaction flows для commissions, settlements и financial visibility участников.",
    },
    {
      question: "Как вы реализуете trust и dispute resolution?",
      answer:
        "Moderation, policy workflows и structured dispute handling для защиты участников и integrity платформы.",
    },
    {
      question: "Можно запускаться поэтапно?",
      answer:
        "Да. Часто старт с focused MVP и расширение по liquidity и user behavior insights.",
    },
    {
      question: "Предоставляете ли admin tools для операторов marketplace?",
      answer:
        "Да. Operational dashboards и management interfaces для listings, users, transactions, policy controls.",
    },
    {
      question: "Сколько обычно длится разработка маркетплейса?",
      answer:
        "Initial launches часто десять–двадцать шесть недель в зависимости от complexity и integration scope.",
    },
    {
      question: "Можете оптимизировать существующую marketplace platform?",
      answer:
        "Да. Audit, модернизация и улучшение existing systems для performance и growth outcomes.",
    },
  ],
  relatedServices: [
    {
      slug: "web-application-development",
      title: "Разработка веб-приложений",
      description:
        "Robust веб-платформы для multi-role workflow и complex transactional processes.",
    },
    {
      slug: "saas-development",
      title: "Разработка SaaS",
      description:
        "Масштабируемые SaaS foundations для marketplace tooling, analytics и participant management.",
    },
    {
      slug: "shopify-development",
      title: "Разработка Shopify",
      description:
        "Запуск и оптимизация e-commerce storefronts, дополняющих marketplace channel strategies.",
    },
    {
      slug: "shopify-store-design",
      title: "Дизайн магазина Shopify",
      description:
        "Commerce UX patterns для buyer confidence и conversion в marketplace contexts.",
    },
  ],
  cta: {
    title: "Строите marketplace-платформу?",
    description:
      "Партнёрство в дизайне и разработке scalable marketplace с сильным trust, operations и growth mechanics.",
    primaryLabel: "Бесплатная консультация",
    primaryHref: "/contact",
    secondaryLabel: "Все услуги",
    secondaryHref: "/services",
  },
};
