import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const LOCALES = ["en", "es", "ru", "am"];

const LEGACY_SERVICE_SLUGS = [
  "shopify-development",
  "shopify-store-design",
  "ai-chatbot-development",
  "marketplace-development",
  "web-application-development",
];

/** Old /services/{id} pages that duplicate long-form landing pages. */
const SUPERSEDED_SERVICE_REDIRECTS = {
  ecommerce: "shopify-development",
  ai: "ai-chatbot-development",
  saas: "saas-development",
  websites: "web-application-development",
  bots: "telegram-bot-development",
  "ai-automation": "ai-business-automation",
};

function localeRedirects(sourceSuffix, destinationSuffix) {
  return LOCALES.map((locale) => ({
    source: `/${locale}${sourceSuffix}`,
    destination: `/${locale}${destinationSuffix}`,
    permanent: true,
  }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    const redirects = [
      ...localeRedirects("/login", "/account/login"),
      ...localeRedirects("/signup", "/account/signup"),
      ...localeRedirects("/pricing", "/marketplace"),
    ];

    for (const slug of LEGACY_SERVICE_SLUGS) {
      redirects.push(
        ...localeRedirects(`/${slug}`, `/services/${slug}`)
      );
    }

    for (const [from, to] of Object.entries(SUPERSEDED_SERVICE_REDIRECTS)) {
      redirects.push(
        ...localeRedirects(`/services/${from}`, `/services/${to}`)
      );
    }

    return redirects;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "dewebam.com", pathname: "/api/uploads/**" },
      { protocol: "http", hostname: "localhost", pathname: "/api/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/api/uploads/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
