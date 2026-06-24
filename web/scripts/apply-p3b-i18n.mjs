#!/usr/bin/env node
/**
 * Merge serviceLanding.relatedGuides i18n into en/ru/es/am message files.
 */
import fs from "fs";
import path from "path";

const MESSAGES_DIR = path.join(process.cwd(), "src/i18n/messages");

const packs = {
  en: {
    title: "Related guides",
    intro:
      "Explore DEWEB articles that help you plan, budget, and deliver projects in this service area.",
    readGuide: "Read guide",
    labels: {
      "telegram-bot-development-guide":
        "Telegram Bot Development Guide: AI Automation Patterns for 2026",
      "ai-automation-for-ecommerce": "AI Automation for Ecommerce",
      "future-of-ai-in-business":
        "The Future of AI in Business: Practical Strategy and Competitive Advantage",
      "ai-chatbots-for-business": "AI Chatbots for Business",
      "how-to-build-a-marketplace-website":
        "How to Build a Marketplace Website in 2026",
      "marketplace-monetization-strategies": "Marketplace Monetization Strategies for 2026",
      "competitive-bidding-it-projects":
        "Competitive Bidding in IT Projects: Marketplace Models and Best Practices",
      "custom-web-application-development":
        "Custom Web Application Development: From Business Case to Scalable Product",
      "nextjs-vs-wordpress": "Next.js vs WordPress for Modern Business Websites",
      "how-to-hire-software-developers":
        "How to Hire Software Developers: A Practical Guide for Growing Teams",
      "outsourcing-software-development-2026":
        "Outsourcing Software Development in 2026: A Strategic Guide",
      "shopify-development-cost-2026": "How Much Does Shopify Development Cost in 2026",
      "shopify-vs-woocommerce": "Shopify vs WooCommerce: Platform Comparison",
      "best-shopify-apps": "Best Shopify Apps for Growing Stores",
      "shopify-plus-vs-standard": "Shopify Plus vs Standard Shopify: Scaling Decision Guide",
      "headless-commerce-guide": "Headless Commerce Guide for Modern Storefronts",
      "technical-seo-for-ecommerce": "Technical SEO for Ecommerce: 2026 Growth Framework",
      "saas-development-guide": "SaaS Development Guide 2026: Architecture and Go-to-Market",
      "mvp-development-cost-guide": "MVP Development Cost Guide for Product Teams",
    },
  },
  ru: {
    title: "Связанные материалы",
    intro:
      "Изучите статьи DEWEB, которые помогут спланировать, оценить бюджет и организовать delivery в этой области.",
    readGuide: "Читать материал",
    labels: {
      "telegram-bot-development-guide":
        "Гид по разработке Telegram-ботов: паттерны AI-автоматизации на 2026",
      "ai-automation-for-ecommerce": "AI-автоматизация для ecommerce",
      "future-of-ai-in-business":
        "Будущее AI в бизнесе: практическая стратегия и конкурентное преимущество",
      "ai-chatbots-for-business": "AI-чатботы для бизнеса",
      "how-to-build-a-marketplace-website": "Как создать marketplace-сайт в 2026",
      "marketplace-monetization-strategies": "Стратегии монетизации marketplace в 2026",
      "competitive-bidding-it-projects":
        "Конкурентные ставки в IT-проектах: модели marketplace и best practices",
      "custom-web-application-development":
        "Разработка custom web-приложений: от business case до масштабируемого продукта",
      "nextjs-vs-wordpress": "Next.js vs WordPress для современных business-сайтов",
      "how-to-hire-software-developers":
        "Как нанять software-разработчиков: практический гид для растущих команд",
      "outsourcing-software-development-2026":
        "Аутсорсинг разработки ПО в 2026: стратегический гид",
      "shopify-development-cost-2026": "Сколько стоит разработка Shopify в 2026",
      "shopify-vs-woocommerce": "Shopify vs WooCommerce: сравнение платформ",
      "best-shopify-apps": "Лучшие приложения Shopify для растущих магазинов",
      "shopify-plus-vs-standard": "Shopify Plus vs Standard Shopify: гид по масштабированию",
      "headless-commerce-guide": "Headless commerce: гид по современным витринам",
      "technical-seo-for-ecommerce": "Технический SEO для ecommerce: framework роста 2026",
      "saas-development-guide": "Гид по SaaS-разработке 2026: архитектура и go-to-market",
      "mvp-development-cost-guide": "Гид по стоимости MVP для product-команд",
    },
  },
  es: {
    title: "Guías relacionadas",
    intro:
      "Explora artículos DEWEB que te ayudan a planificar, presupuestar y ejecutar proyectos en esta área de servicio.",
    readGuide: "Leer guía",
    labels: {
      "telegram-bot-development-guide":
        "Guía de desarrollo de bots de Telegram: patrones de automatización con IA 2026",
      "ai-automation-for-ecommerce": "Automatización con IA para ecommerce",
      "future-of-ai-in-business":
        "El futuro de la IA en los negocios: estrategia práctica y ventaja competitiva",
      "ai-chatbots-for-business": "Chatbots de IA para empresas",
      "how-to-build-a-marketplace-website": "Cómo crear un marketplace web en 2026",
      "marketplace-monetization-strategies": "Estrategias de monetización de marketplaces 2026",
      "competitive-bidding-it-projects":
        "Licitación competitiva en proyectos IT: modelos de marketplace y buenas prácticas",
      "custom-web-application-development":
        "Desarrollo de aplicaciones web a medida: del caso de negocio al producto escalable",
      "nextjs-vs-wordpress": "Next.js vs WordPress para sitios web empresariales modernos",
      "how-to-hire-software-developers":
        "Cómo contratar desarrolladores de software: guía práctica para equipos en crecimiento",
      "outsourcing-software-development-2026":
        "Externalización de desarrollo de software en 2026: guía estratégica",
      "shopify-development-cost-2026": "Cuánto cuesta el desarrollo Shopify en 2026",
      "shopify-vs-woocommerce": "Shopify vs WooCommerce: comparación de plataformas",
      "best-shopify-apps": "Mejores apps de Shopify para tiendas en crecimiento",
      "shopify-plus-vs-standard": "Shopify Plus vs Shopify Standard: guía de escalado",
      "headless-commerce-guide": "Guía de headless commerce para vitrinas modernas",
      "technical-seo-for-ecommerce": "SEO técnico para ecommerce: framework de crecimiento 2026",
      "saas-development-guide": "Guía de desarrollo SaaS 2026: arquitectura y go-to-market",
      "mvp-development-cost-guide": "Guía de costes de MVP para equipos de producto",
    },
  },
  am: {
    title: "Կապված ուղեցույցներ",
    intro:
      "Ուսումնասիրեք DEWEB հոդվածները, որոնք օգնում են planning, budget և delivery-ն plan անել այս service ոլորտում։",
    readGuide: "Կարդալ ուղեցույցը",
    labels: {
      "telegram-bot-development-guide":
        "Telegram բոտերի զարգացման ուղեցույց՝ AI ավտոմատացման pattern-ներ 2026",
      "ai-automation-for-ecommerce": "AI ավտոմատացում ecommerce-ի համար",
      "future-of-ai-in-business":
        "AI-ի ապագան բիզնեսում՝ գործնական ռազմավարություն և մրցակցային առավելություն",
      "ai-chatbots-for-business": "AI չատբոտեր բիզնեսի համար",
      "how-to-build-a-marketplace-website": "Ինչպես կառուցել marketplace վեբ կայք 2026",
      "marketplace-monetization-strategies": "Marketplace monetization ռազմավարություններ 2026",
      "competitive-bidding-it-projects":
        "Մրցակցային bidding IT նախագծերում՝ marketplace մոդելներ և best practices",
      "custom-web-application-development":
        "Custom վեբ հավելվածների զարգացում՝ business case-ից մինչև scalable արտադրանք",
      "nextjs-vs-wordpress": "Next.js vs WordPress ժամանակակից բիզնես կայքերի համար",
      "how-to-hire-software-developers":
        "Ինչպես վարձել software մշակողներ՝ growing թիմերի գործնական ուղեցույց",
      "outsourcing-software-development-2026":
        "Software զարգացման outsourcing 2026՝ strategic ուղեցույց",
      "shopify-development-cost-2026": "Որքա՞ն է արժե Shopify զարգացումը 2026",
      "shopify-vs-woocommerce": "Shopify vs WooCommerce՝ platform համեմատություն",
      "best-shopify-apps": "Լավագույն Shopify apps growing խանութների համար",
      "shopify-plus-vs-standard": "Shopify Plus vs Standard Shopify՝ scaling decision guide",
      "headless-commerce-guide": "Headless commerce guide ժամանակակից storefront-ների համար",
      "technical-seo-for-ecommerce": "Technical SEO ecommerce-ի համար՝ 2026 growth framework",
      "saas-development-guide": "SaaS development guide 2026՝ architecture և go-to-market",
      "mvp-development-cost-guide": "MVP development cost guide product թիմերի համար",
    },
  },
};

for (const locale of ["en", "ru", "es", "am"]) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const pack = packs[locale];
  data.serviceLanding = {
    relatedGuides: {
      title: pack.title,
      intro: pack.intro,
      readGuide: pack.readGuide,
      labels: pack.labels,
    },
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`✓ ${locale}.json updated`);
}
