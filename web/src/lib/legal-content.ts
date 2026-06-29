export type LegalSection = {
  id?: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export const LEGAL_LAST_UPDATED = "June 8, 2026";
export const LEGAL_CONTACT_EMAIL = "gagikpoghosyandev@gmail.com";
export const LEGAL_SITE = "dewebam.com";

export const privacyPolicySections: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      `DEWEB ("we", "us", "our") operates dewebam.com — an IT marketplace and development studio connecting businesses with developers for Shopify, AI, SaaS, web and marketplace projects.`,
      "This Privacy Policy explains what personal data we collect, how we use it, how long we keep it, and what rights you have. By using our website or creating an account, you agree to this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "1. Information we collect",
    list: [
      "Account data: username, email address, password (stored encrypted), profile details, and optional seller or business information.",
      "Project & lead data: contact form messages, service inquiries, offers, proposals, listings, and deal chat content.",
      "Communications: support messages, email verification, and optional newsletter preferences.",
      "Technical data: IP address, browser type, device information, pages visited, and cookie preferences.",
      "AI & blog interactions: if you use our contact or inquiry tools, we process the text you submit to route your request.",
    ],
  },
  {
    id: "how-we-use",
    title: "2. How we use your information",
    list: [
      "Create and secure your account.",
      "Match customers with developers and process project inquiries.",
      "Respond to contact requests, support tickets, and lead submissions.",
      "Send service-related emails such as verification and password reset.",
      "Improve website performance, security, and user experience.",
      "Comply with legal obligations and prevent fraud or abuse.",
    ],
  },
  {
    id: "legal-basis",
    title: "3. Legal basis for processing",
    paragraphs: [
      "Where applicable under GDPR and similar laws, we process data based on: (a) performance of a contract when you use our platform; (b) legitimate interests in operating and securing our services; (c) your consent for optional marketing or non-essential cookies; and (d) legal obligations.",
    ],
  },
  {
    id: "sharing",
    title: "4. Sharing of data",
    paragraphs: [
      "We do not sell your personal data. We may share information only when necessary:",
    ],
    list: [
      "With developers or customers involved in your project or deal chat.",
      "With infrastructure providers (hosting, email delivery) under confidentiality obligations.",
      "When required by law, court order, or to protect rights and safety.",
      "In connection with a business transfer, with notice where required by law.",
    ],
  },
  {
    id: "ai",
    title: "5. AI-assisted features",
    paragraphs: [
      "DEWEB may use AI tools to help classify inquiries, suggest categories, or assist internal content workflows. We do not use your private account data to train public AI models. AI-generated blog content is reviewed by administrators before publication.",
    ],
  },
  {
    id: "security",
    title: "6. Security",
    paragraphs: [
      "We use HTTPS encryption, hashed passwords, access controls, and server-side environment protection for sensitive credentials. No online system is 100% secure; we continuously work to reduce risk using industry-standard practices.",
    ],
  },
  {
    id: "retention",
    title: "7. Data retention",
    paragraphs: [
      "We retain account and inquiry data while your account is active and for a reasonable period afterward for support, legal, and dispute-resolution purposes. You may request deletion subject to legal retention requirements.",
    ],
  },
  {
    id: "rights",
    title: "8. Your rights",
    list: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your account data where applicable.",
      "Withdraw marketing consent at any time.",
      "Object to or restrict certain processing where legally available.",
      "Lodge a complaint with your local data protection authority.",
    ],
    paragraphs: [
      `To exercise these rights, contact us at ${LEGAL_CONTACT_EMAIL} or via the Contact page on dewebam.com.`,
    ],
  },
  {
    id: "children",
    title: "9. Children's privacy",
    paragraphs: [
      "DEWEB is not intended for users under 18. We do not knowingly collect data from children. If you believe a child has provided us data, contact us and we will delete it.",
    ],
  },
  {
    id: "international",
    title: "10. International users",
    paragraphs: [
      "DEWEB serves clients globally. Your data may be processed in countries where our servers or service providers operate. We take steps to protect data regardless of location.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top will change when we do. Continued use of the site after changes means you accept the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    paragraphs: [
      `Questions about privacy: email ${LEGAL_CONTACT_EMAIL} or use the Contact form at https://dewebam.com/en/contact.`,
    ],
  },
];

export const cookiePolicySections: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "This Cookie Policy explains how DEWEB (dewebam.com) uses cookies and similar technologies such as local storage. It should be read together with our Privacy Policy.",
    ],
  },
  {
    id: "what-are-cookies",
    title: "1. What are cookies?",
    paragraphs: [
      "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you signed in, and understand how the site is used.",
    ],
  },
  {
    id: "required",
    title: "2. Strictly necessary cookies & storage",
    paragraphs: ["These are required for the website to function. Without them you cannot register, sign in, or use account features."],
    list: [
      "Authentication token (localStorage: deweb_token) — keeps you signed in securely.",
      "Cookie consent preference (localStorage: deweb_cookie_consent) — remembers your cookie choice.",
      "Session security and load balancing via our hosting infrastructure.",
    ],
  },
  {
    id: "functional",
    title: "3. Functional preferences",
    list: [
      "Language/locale preference for browsing in English, Spanish, Russian, or Armenian.",
      "UI state needed for forms and navigation.",
    ],
  },
  {
    id: "analytics",
    title: "4. Analytics cookies (optional)",
    paragraphs: [
      "If you choose \"Accept all cookies\", we may use anonymous analytics to understand page performance and improve the product. These cookies do not sell your data to advertisers.",
    ],
  },
  {
    id: "third-party",
    title: "5. Third-party services",
    paragraphs: [
      "Some pages may load third-party resources (for example fonts or embedded content). Those providers may set their own cookies under their policies. We minimize third-party tracking on core platform pages.",
    ],
  },
  {
    id: "manage",
    title: "6. How to manage cookies",
    list: [
      "Use the cookie banner on your first visit to accept required only or accept all.",
      "Clear cookies and site data in your browser settings at any time.",
      "Block cookies in browser settings — note that login and account features will not work.",
    ],
  },
  {
    id: "cookie-contact",
    title: "7. Contact",
    paragraphs: [
      `Cookie questions: ${LEGAL_CONTACT_EMAIL} or https://dewebam.com/en/contact.`,
    ],
  },
];

export const termsOfUseSections: LegalSection[] = [
  {
    title: "Agreement",
    paragraphs: [
      "These Terms of Use govern your access to dewebam.com and DEWEB services. By creating an account or using the platform, you agree to these terms.",
    ],
  },
  {
    id: "eligibility",
    title: "1. Eligibility",
    paragraphs: ["You must be at least 18 years old and able to form a binding contract to use DEWEB."],
  },
  {
    id: "accounts",
    title: "2. Accounts",
    list: [
      "Provide accurate registration information and keep your password secure.",
      "You are responsible for activity under your account.",
      "We may suspend accounts that violate these terms or pose security risks.",
      "Admin accounts are for authorized DEWEB personnel only.",
    ],
  },
  {
    id: "platform",
    title: "3. Platform services",
    paragraphs: [
      "DEWEB connects customers with developers and service providers. We facilitate inquiries, proposals, and communications. Unless explicitly agreed in writing, DEWEB is not a party to contracts between users.",
    ],
  },
  {
    id: "user-content",
    title: "4. User content & conduct",
    list: [
      "Do not post illegal, fraudulent, harassing, or infringing content.",
      "Do not share malware, attempt unauthorized access, or scrape the platform abusively.",
      "Do not misrepresent skills, identity, or project scope.",
      "Respect confidentiality of deal chats and client information.",
    ],
  },
  {
    id: "ip",
    title: "5. Intellectual property",
    paragraphs: [
      "DEWEB branding, website design, and platform code are owned by DEWEB or its licensors. You retain rights to content you submit, but grant DEWEB a license to host and display it as needed to operate the service.",
    ],
  },
  {
    id: "disclaimers",
    title: "6. Disclaimers",
    paragraphs: [
      "The platform is provided \"as is\" and \"as available\". We do not guarantee uninterrupted service or that every developer match will meet your expectations. Verify credentials and agreements before starting paid work.",
    ],
  },
  {
    id: "liability",
    title: "7. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, DEWEB is not liable for indirect, incidental, or consequential damages arising from use of the platform. Our total liability for any claim is limited to the amount you paid DEWEB for platform fees in the twelve months before the claim, if any.",
    ],
  },
  {
    id: "termination",
    title: "8. Termination",
    paragraphs: [
      "You may stop using DEWEB at any time. We may suspend or terminate access for violations, legal requirements, or platform safety.",
    ],
  },
  {
    id: "governing-law",
    title: "9. Governing law",
    paragraphs: [
      "These terms are governed by applicable laws of the jurisdiction where DEWEB operates, without regard to conflict-of-law rules. Disputes should first be raised via our contact channels.",
    ],
  },
  {
    id: "terms-contact",
    title: "10. Contact",
    paragraphs: [
      `Terms questions: ${LEGAL_CONTACT_EMAIL} or https://dewebam.com/en/contact.`,
    ],
  },
];
