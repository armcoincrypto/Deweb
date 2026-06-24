import type { LandingTexts } from "@/lib/i18n/content/types";

export const webApplicationDevelopment: LandingTexts = {
  h1: "Услуги разработки веб-приложений",
  subtitle:
    "Проектируйте и создавайте безопасные масштабируемые веб-приложения под ваши workflow и цели роста.",
  heroBadge: "Кастомная продуктовая инженерия",
  priceRange: "От $400",
  intro: [
    "Кастомные веб-приложения становятся стратегическими активами, когда спроектированы вокруг реальных бизнес-workflow и долгосрочных продуктовых целей. Наша услуга разработки веб-приложений помогает выйти за пределы хрупких таблиц, разрозненных инструментов и ограничений off-the-shelf — софт под то, как работают команды и клиенты. Product strategy, UX, инженерия и delivery discipline: надёжные, поддерживаемые приложения, готовые масштабироваться с операциями.",
    "Каждый engagement начинается с ясности outcomes. Согласование ролей пользователей, bottlenecks процессов, зависимостей интеграции и измеримых критериев успеха до production code. Планирование снижает неопределённость — архитектура поддерживает и immediate delivery, и будущее расширение. Internal operations platform, customer portal или workflow-heavy B2B application — с практичным governance и операционными реалиями.",
    "End-to-end от discovery до пост-запускной оптимизации. Чистая архитектура, безопасная реализация, сильные quality practices — стабильная performance под реальным usage. Структурированный handoff и ongoing support — софт повышает эффективность сегодня и адаптируется при evolving требованиях. Фундамент веб-приложения для устойчивого business impact, не временных workaround.",
  ],
  sections: [
    {
      title: "Product discovery и определение scope",
      paragraphs: [
        "Сильные outcomes приложений начинаются с точного framing проблемы. Целевые пользователи, jobs-to-be-done, ограничения процессов, измеримые бизнес-цели. Discovery проясняет что ship first, что phased later, где integration или compliance риск влияет на timeline. Меньше дорогого переопределения mid-project.",
        "Insights discovery — структурированный product scope: приоритизированные capabilities, user stories, acceptance criteria. Общий roadmap связывает technical milestones с business outcomes. Ясность ускоряет решения, development фокусируется на фичах с реальной operational или revenue ценностью.",
      ],
    },
    {
      title: "Системная архитектура и технологическое планирование",
      paragraphs: [
        "Архитектура определяет, как приложение выдерживает рост, сложность и изменения. Чёткие границы front-end, backend services, data layers, integration workflows. Модульность — maintainability, тестирование, collaboration; меньше tightly coupled компонентов, сложных в эволюции.",
        "Технологии по требованиям, не по трендам. Framework fit, infrastructure constraints, capability команды, expected scale перед финализацией stack. Security, performance, observability с начала — reliability не зависит от post-launch retrofits.",
      ],
    },
    {
      title: "UX-дизайн и моделирование взаимодействий",
      paragraphs: [
        "Веб-приложения успешны, когда пользователи быстро и уверенно завершают важные задачи. Интерфейсы вокруг task flows, role permissions, приоритета информации — ясные next actions на каждом экране. Wireflows и interaction models валидируют assumptions рано, меньше late redesign, лучше alignment product и engineering.",
        "Баланс efficiency и usability: admin-heavy desktop и field-friendly mobile. Явное поведение компонентов, error handling, empty states — меньше ambiguity при реализации. Выше adoption, ниже support burden после launch.",
      ],
    },
    {
      title: "Frontend-инженерия и UI-системы",
      paragraphs: [
        "Frontend: performance, accessibility, maintainable component architecture. Переиспользуемые UI patterns с чёткими контрактами — быстрые итерации без inconsistent behavior. State management, validation, data fetching — clarity и reliability, особенно в complex multi-step workflow.",
        "Оптимизация под реальные условия: медленные устройства, переменная связь, high-density data interfaces. Progressive loading, caching, responsive behavior — практичная скорость и usability. Отполированный интерфейс, dependable под operational pressure.",
      ],
    },
    {
      title: "Backend-сервисы и дизайн API",
      paragraphs: [
        "Backend поддерживает business logic, data integrity, secure integration в масштабе. API с явными контрактами, robust validation, versioning — клиенты и внешние системы эволюционируют безопасно. Меньше integration breakage, проще long-term maintenance.",
        "Authentication, authorization, auditability, fault handling под risk profile. Background processing, event workflows, transactional safeguards для complex процессов. Стабильная performance и correctness при росте traffic и feature scope.",
      ],
    },
    {
      title: "Моделирование данных и стратегия persistence",
      paragraphs: [
        "Чистый data design — основа reliable behavior и полезной отчётности. Entities, relationships, lifecycle states отражают business rules с эффективными query patterns. Migration strategy и schema evolution — новая функциональность без дестабилизации data flows.",
        "Governance: retention, access controls, audit visibility где релевантно. Compliance и operational transparency с первого дня. Durable data layer — лучше analytics, проще troubleshooting, ниже cost of change.",
      ],
    },
    {
      title: "Интеграции и связность workflow",
      paragraphs: [
        "Большинство бизнес-приложений зависят от внешних сервисов: identity, payments, CRM, ERP. Интеграции с retry logic, idempotent operations, status observability — предсказуемая обработка сбоев. Меньше ручного вмешательства, выше доверие к automated workflow.",
        "Ownership и source-of-truth — без conflicting updates между системами. Документированные transformation rules, validation boundaries, escalation для exceptions. Connectivity architecture превращает приложение в dependable operational hub, не ещё один isolated tool.",
      ],
    },
    {
      title: "Безопасность, compliance и управление рисками",
      paragraphs: [
        "Security как core product requirement, не checklist перед release. Least-privilege access, secure secrets, input validation, defense-in-depth по стеку. Threat modeling выявляет high-risk сценарии рано — mitigations intentional, не reactive.",
        "Regulated workflow — alignment с compliance expectations и evidence requirements. Logging, audit trails, policy enforcement где нужно. Proactive security posture защищает пользователей, снижает incident exposure, укрепляет confidence в production readiness.",
      ],
    },
    {
      title: "Тестирование, QA и release engineering",
      paragraphs: [
        "QA: automated tests плюс scenario-driven validation критичных workflow. Business logic, permissions, edge cases, integrations в representative environments — меньше launch risk. CI quality gates и раннее обнаружение regressions — быстрее ship, меньше production defects.",
        "Release engineering: deployment automation, environment parity, rollback strategy. Go-live вокруг operational windows, близкий мониторинг early usage. Структурированный release model — меньше disruption, уверенное adoption internal и external пользователями.",
      ],
    },
    {
      title: "Пост-запускная оптимизация и эволюция продукта",
      paragraphs: [
        "Launch — начало product learning. Feedback loops: analytics, user input, support insights — high-impact improvements. Enhancement roadmaps привязаны к task completion speed, error reduction, retention impact.",
        "При росте организации — scale architecture, expand capabilities, operational performance без потери maintainability. Documentation и knowledge transfer — ownership у команды с expert support при необходимости. Приложение adaptable и valuable long-term.",
      ],
    },
  ],
  benefits: [
    {
      icon: "🏗️",
      title: "Под ваш workflow",
      description:
        "Кастомная архитектура следует бизнес-процессам, а не заставляет команды в rigid generic tools.",
    },
    {
      icon: "🔐",
      title: "Безопасность by design",
      description:
        "Security controls интегрированы в разработку — защита пользователей, данных и операций.",
    },
    {
      icon: "📈",
      title: "Масштабируемый фундамент",
      description:
        "Модульные системы поддерживают рост пользователей, объёма данных и сложности фич без major rewrites.",
    },
    {
      icon: "🔌",
      title: "Интегрированные операции",
      description:
        "Надёжные API и коннекторы объединяют workflow с CRM, ERP и другими core business systems.",
    },
    {
      icon: "🧪",
      title: "Выше уверенность в delivery",
      description:
        "Структурированное тестирование и release practices снижают дефекты и улучшают production stability.",
    },
    {
      icon: "🔁",
      title: "Непрерывное улучшение продукта",
      description:
        "Пост-запускная оптимизация сохраняет ценность приложения при evolving потребностях.",
    },
  ],
  process: [
    {
      step: 1,
      title: "Discovery и планирование",
      description:
        "User needs, бизнес-цели, workflow requirements через structured discovery. Приоритизированный roadmap, success metrics, delivery scope до начала engineering. Adoption readiness: role-based enablement и operational safeguards — уверенное использование при росте сложности процессов. Release impact на operational KPIs и productivity — измеримое улучшение без лишней process complexity.",
    },
    {
      step: 2,
      title: "Архитектура и UX-дизайн",
      description:
        "System architecture, data models, user flows для performance, security, usability. Ранние прототипы и interface planning валидируют assumptions до full development effort. Enablement и safeguards для adoption при evolving complexity.",
    },
    {
      step: 3,
      title: "Full-stack разработка",
      description:
        "Frontend и backend в iterative sprints, интеграции, continuous quality standards. Прозрачный прогресс, каждый increment против acceptance criteria и business objectives. Adoption readiness на каждом этапе.",
    },
    {
      step: 4,
      title: "Тестирование и production launch",
      description:
        "Comprehensive QA: functional behavior, edge cases, operational reliability across environments. Structured release с monitoring, fallback planning, rapid response в early production usage.",
    },
    {
      step: 5,
      title: "Оптимизация и масштабирование",
      description:
        "Usage data и user feedback для приоритетов refinements. Performance, workflow efficiency, feature depth — alignment с business growth и evolving operational demands.",
    },
  ],
  faqs: [
    {
      question: "Можете строить и internal tools, и customer-facing веб-apps?",
      answer:
        "Да. Internal operational platforms, external customer portals и hybrid solutions с shared services.",
    },
    {
      question: "Работаете ли с существующими системами и базами данных?",
      answer:
        "Безусловно. Модернизация и расширение existing systems с интеграцией в текущий data и tooling landscape.",
    },
    {
      question: "Как вы обеспечиваете безопасность приложения?",
      answer:
        "Secure development practices: role-based access, validation layers, monitoring, threat-aware architecture decisions.",
    },
    {
      question: "Какую методологию разработки используете?",
      answer:
        "Итеративная delivery с чёткими milestones, частыми демо и прозрачной приоритизацией backlog.",
    },
    {
      question: "Есть ли ongoing maintenance после launch?",
      answer:
        "Да. Support, optimization и feature expansion под долгосрочный roadmap.",
    },
    {
      question: "Сколько длится типичный web app проект?",
      answer:
        "Зависит от scope; многие проекты восемь–двадцать четыре недели от discovery до launch.",
    },
    {
      question: "Получим ли документацию и handoff support?",
      answer:
        "Да. Практичная документация и enablement для уверенного управления и эволюции приложения командой.",
    },
  ],
  relatedServices: [
    {
      slug: "saas-development",
      title: "Разработка SaaS",
      description:
        "Multi-tenant SaaS-платформы с secure architecture, billing systems и product analytics.",
    },
    {
      slug: "marketplace-development",
      title: "Разработка маркетплейсов",
      description:
        "Масштабируемые marketplace-экосистемы с vendor workflow и transaction infrastructure.",
    },
    {
      slug: "ai-business-automation",
      title: "AI-автоматизация бизнеса",
      description:
        "Операции с AI-powered workflow automation и governed decision support systems.",
    },
    {
      slug: "ai-chatbot-development",
      title: "Разработка AI-чатботов",
      description:
        "Conversational assistants, интегрированные с workflow веб-приложения и support stack.",
    },
  ],
  cta: {
    title: "Планируете кастомное веб-приложение?",
    description:
      "Обсудите с командой создание secure scalable веб-платформы под ваши бизнес-workflow.",
    primaryLabel: "Бесплатная консультация",
    primaryHref: "/contact",
    secondaryLabel: "Все услуги",
    secondaryHref: "/services",
  },
};
