const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL ||
      (window.location.hostname === "localhost"
        ? "http://localhost:3000/api"
        : "/api")
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000/api";

const TOKEN_KEY = "deweb_token";

export type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  role?: string;
  accountMode?: string;
  account_mode?: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  company?: string;
  currency?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  kycStatus?: string;
  sellerInfo?: Record<string, unknown>;
};

export type LeadSubmissionType = "contact" | "price_offer" | "request_details" | "user_offer";
export type LeadStatus = "new" | "contacted" | "negotiating" | "closed";

export type Lead = {
  id: string;
  submissionType: LeadSubmissionType;
  status: LeadStatus;
  adminNote?: string;
  name?: string;
  email: string;
  phone?: string;
  title?: string;
  productName?: string;
  category?: string;
  offeredPrice?: number | null;
  askingPrice?: number | null;
  message: string;
  createdAt: string;
  updatedAt?: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const dewebApi = {
  auth: {
    login: (body: { email: string; password: string }) =>
      api<{ token: string; user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    register: (body: {
      username: string;
      email: string;
      password: string;
      accountMode?: string;
      newsletter?: boolean;
    }) =>
      api<{ success: boolean; requireLogin: boolean; email: string; message: string }>(
        "/auth/register",
        { method: "POST", body: JSON.stringify(body) }
      ),
    me: () => api<{ user: User }>("/auth/me"),
    forgotPassword: (email: string) =>
      api<{ success: boolean; message: string; resetUrl?: string }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token: string, password: string) =>
      api<{ success: boolean; message: string }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      }),
    sendVerification: () =>
      api<{ ok: boolean; message: string; verifyUrl?: string }>("/auth/send-verification", {
        method: "POST",
        body: "{}",
      }),
  },
  listings: {
    list: (type?: "customer_request" | "worker_offer" | "all") =>
      api<{ listings: MarketplaceListing[] }>(
        `/listings${type && type !== "all" ? `?type=${type}` : ""}`
      ),
    mine: () => api<{ listings: MarketplaceListing[] }>("/listings/mine"),
    create: (body: Record<string, unknown>) =>
      api<{ listing: MarketplaceListing }>("/listings", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    remove: (id: string) =>
      api(`/listings/${id}`, { method: "DELETE" }),
    apply: (id: string, body: { message?: string; price?: number; timeline?: string }) =>
      api(`/listings/${id}/apply`, { method: "POST", body: JSON.stringify(body) }),
    applications: (id: string) =>
      api<{ applications: ListingApplication[] }>(`/listings/${id}/applications`),
    acceptApplication: (appId: string) =>
      api<{ ok: boolean; chatId: string }>(`/listings/applications/${appId}/accept`, {
        method: "POST",
        body: "{}",
      }),
  },
  dealChat: {
    mine: () => api<{ chats: DealChatSummary[] }>("/deal-chat/mine"),
    messages: (chatId: string) =>
      api<{ messages: DealMessage[] }>(`/deal-chat/${chatId}/messages`),
    send: (chatId: string, body: string) =>
      api<{ message: DealMessage; warning?: string }>(`/deal-chat/${chatId}/messages`, {
        method: "POST",
        body: JSON.stringify({ body }),
      }),
    attach: (chatId: string, body: { filename: string; dataBase64: string; note?: string }) =>
      api(`/deal-chat/${chatId}/attachment`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
  users: {
    updateMe: (body: Record<string, unknown>) =>
      api<{ user: User }>("/users/me", { method: "PATCH", body: JSON.stringify(body) }),
    developers: () => api<{ users: User[] }>("/users/developers"),
  },
  products: {
    list: () => api<{ products: Product[] }>("/products"),
    mine: () => api<{ products: Product[] }>("/products/mine"),
    save: (body: Record<string, unknown>) =>
      api<{ product: Product }>("/products", { method: "POST", body: JSON.stringify(body) }),
  },
  orders: {
    mine: () => api<{ orders: ProjectOrder[] }>("/orders/mine"),
    open: () => api<{ orders: ProjectOrder[] }>("/orders/open"),
    create: (body: Record<string, unknown>) =>
      api<{ order: ProjectOrder }>("/orders", { method: "POST", body: JSON.stringify(body) }),
  },
  bids: {
    list: (orderId: string) => api<{ bids: Bid[] }>(`/bids/order/${orderId}`),
    submit: (orderId: string, body: { price: number; timeline?: string; message?: string }) =>
      api<{ bid: Bid }>(`/bids/order/${orderId}`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    accept: (bidId: string) =>
      api<{ order: ProjectOrder; bid: Bid }>(`/bids/${bidId}/accept`, { method: "POST", body: "{}" }),
    reject: (bidId: string) =>
      api<{ bid: Bid }>(`/bids/${bidId}/reject`, { method: "POST", body: "{}" }),
  },
  leads: {
    create: (body: {
      submissionType: LeadSubmissionType;
      email?: string;
      name?: string;
      phone?: string;
      message?: string;
      title?: string;
      productName?: string;
      category?: string;
      offeredPrice?: number;
      askingPrice?: number;
    }) =>
      api<{ ok: boolean; id: string; message: string }>("/leads", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    mine: () => api<{ leads: Lead[] }>("/leads/mine"),
  },
  contact: {
    send: (
      body: {
        name?: string;
        email: string;
        phone?: string;
        message: string;
        visitorId?: string;
        lastBlogSlug?: string;
        utmSource?: string;
        utmMedium?: string;
        utmCampaign?: string;
        referrer?: string;
        landingPage?: string;
      }
    ) =>
      api<{ ok: boolean; message: string }>("/contact", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },
  blog: {
    list: () => api<{ posts: BlogPostListItem[] }>("/blog"),
    get: (slug: string) => api<{ post: BlogPostDetail }>(`/blog/${encodeURIComponent(slug)}`),
    categories: () => api<{ categories: BlogCategoryRecord[] }>("/blog/categories"),
  },
  admin: {
    stats: () => api<AdminStats>("/admin/stats"),
    users: (q?: string) => api<{ users: AdminUser[] }>(`/admin/users${q ? `?q=${encodeURIComponent(q)}` : ""}`),
    user: (id: string) => api<{ user: AdminUser }>(`/admin/users/${id}`),
    updateUser: (id: string, body: Record<string, unknown>) =>
      api(`/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    orders: () => api<{ orders: AdminOrder[] }>("/admin/orders"),
    updateOrder: (id: string, body: Record<string, unknown>) =>
      api(`/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    leads: (status?: string, type?: string) => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (type) params.set("type", type);
      const q = params.toString();
      return api<{ leads: Lead[] }>(`/admin/leads${q ? `?${q}` : ""}`);
    },
    updateLead: (id: string, body: { status?: LeadStatus; adminNote?: string }) =>
      api<{ lead: Lead }>(`/admin/leads/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    products: () => api<{ products: Product[] }>("/admin/products"),
    updateProduct: (id: string, body: Record<string, unknown>) =>
      api(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    deleteProduct: (id: string) =>
      api(`/admin/products/${id}`, { method: "DELETE" }),
    platformStats: () => api<{ stats: { key: string; value: string }[] }>("/admin/platform-stats"),
    savePlatformStats: (stats: Record<string, string>) =>
      api("/admin/platform-stats", { method: "PUT", body: JSON.stringify({ stats }) }),
    supportThreads: () => api<{ threads: SupportThread[] }>("/admin/support/threads"),
    supportMessages: (id: string) =>
      api<{ thread: SupportThread; messages: { sender: string; body: string }[] }>(
        `/admin/support/threads/${id}/messages`
      ),
    supportReply: (id: string, message: string) =>
      api(`/admin/support/threads/${id}/reply`, {
        method: "POST",
        body: JSON.stringify({ message }),
      }),
    supportStatus: (id: string, status: string) =>
      api(`/admin/support/threads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    blog: {
      list: () => api<{ stats: BlogStats; posts: BlogPostListItem[] }>("/admin/blog"),
      pending: () => api<{ posts: BlogPostListItem[] }>("/admin/blog/pending"),
      scheduleConfig: () =>
        api<{
          timezone: string;
          publishHour: number;
          publishMinute: number;
          generateHour: number;
          nextPublishSlot: string;
        }>("/admin/blog/schedule-config"),
      get: (id: string) => api<{ post: BlogPostDetail }>(`/admin/blog/${id}`),
      categories: () => api<{ categories: BlogCategoryRecord[] }>("/admin/blog/categories"),
      create: (body: BlogPostInput) =>
        api<{ post: BlogPostDetail }>("/admin/blog", {
          method: "POST",
          body: JSON.stringify(body),
        }),
      update: (id: string, body: BlogPostInput) =>
        api<{ post: BlogPostDetail }>(`/admin/blog/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
      delete: (id: string) => api<{ ok: boolean }>(`/admin/blog/${id}`, { method: "DELETE" }),
      approve: (
        id: string,
        body?: { publishMode?: "scheduled" | "immediate"; scheduledPublishAt?: string }
      ) =>
        api<{
          post: BlogPostDetail;
          message?: string;
          scheduledPublishAt?: string;
        }>(`/admin/blog/${id}/approve`, {
          method: "POST",
          body: JSON.stringify(body || { publishMode: "scheduled" }),
        }),
      publish: (id: string) =>
        api<{ post: BlogPostDetail }>(`/admin/blog/${id}/publish`, { method: "POST" }),
      reject: (id: string) =>
        api<{
          post: BlogPostDetail;
          requeued?: BlogTopicQueueItem | null;
          requeueError?: string | null;
          message?: string;
        }>(`/admin/blog/${id}/reject`, { method: "POST" }),
      aiGenerate: (body: BlogAiGenerateInput) =>
        api<{ post: BlogPostDetail; generationId: string; message: string }>(
          "/admin/blog/ai-generate",
          { method: "POST", body: JSON.stringify(body) }
        ),
      aiGenerations: () =>
        api<{ generations: BlogAiGeneration[] }>("/admin/blog/ai-generations"),
      analytics: {
        overview: () => api<BlogAnalyticsOverview>("/admin/blog/analytics"),
        post: (id: string) => api<BlogPostAnalyticsDetail>(`/admin/blog/analytics/${id}`),
      },
      social: {
        list: (params?: { platform?: string; status?: string; postId?: string }) => {
          const q = new URLSearchParams();
          if (params?.platform) q.set("platform", params.platform);
          if (params?.status) q.set("status", params.status);
          if (params?.postId) q.set("postId", params.postId);
          const qs = q.toString();
          return api<{ posts: BlogSocialPost[] }>(`/admin/blog/social${qs ? `?${qs}` : ""}`);
        },
        generate: (postId: string) =>
          api<{ created: number; skipped: number; posts: BlogSocialPost[] }>(
            `/admin/blog/social/generate/${postId}`,
            { method: "POST" }
          ),
        update: (id: string, body: { content?: string; status?: BlogSocialStatus }) =>
          api<{ post: BlogSocialPost }>(`/admin/blog/social/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
          }),
      },
      translations: {
        list: (postId: string) =>
          api<{ translations: BlogPostTranslation[] }>(`/admin/blog/${postId}/translations`),
        generate: (postId: string) =>
          api<{ created: BlogPostTranslation[]; skipped: string[]; postId: string }>(
            `/admin/blog/${postId}/translations/generate`,
            { method: "POST" }
          ),
        updateStatus: (translationId: string, status: BlogTranslationStatus) =>
          api<{ translation: BlogPostTranslation }>(`/admin/blog/translations/${translationId}`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
          }),
      },
      topicQueue: {
        list: () => api<{ items: BlogTopicQueueItem[] }>("/admin/blog/topic-queue"),
        create: (body: BlogTopicQueueInput) =>
          api<{ item: BlogTopicQueueItem }>("/admin/blog/topic-queue", {
            method: "POST",
            body: JSON.stringify(body),
          }),
        update: (id: string, body: Partial<BlogTopicQueueInput>) =>
          api<{ item: BlogTopicQueueItem }>(`/admin/blog/topic-queue/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
          }),
        delete: (id: string) =>
          api<{ ok: boolean }>(`/admin/blog/topic-queue/${id}`, { method: "DELETE" }),
        retry: (id: string) =>
          api<{ item: BlogTopicQueueItem }>(`/admin/blog/topic-queue/${id}/retry`, {
            method: "POST",
          }),
      },
    },
  },
  services: {
    page: () => api<ServicesPageData>("/services/page"),
    estimate: (body: { message: string; budget?: string; category?: string }) =>
      api<{
        detectedCategory: string;
        suggestedTimeline: string;
        budgetParsed: { min: number | null; max: number | null; currency: string };
        confidence: string;
      }>("/services/estimate", { method: "POST", body: JSON.stringify(body) }),
    catalog: () => api<{ catalog: Record<string, unknown> }>("/services/catalog"),
    publicStats: () =>
      api<{ users: string; orders: string; volume: string; successRate: string }>(
        "/services/public-stats"
      ),
  },
  offers: {
    create: (body: {
      email: string;
      message: string;
      name?: string;
      budget?: string;
      deadline?: string;
      category?: string;
    }) =>
      api<{
        ok: boolean;
        id: string;
        detectedCategory: string;
        suggestedTimeline: string;
        priority: string;
        message: string;
      }>("/offers", { method: "POST", body: JSON.stringify(body) }),
  },
};

export type BlogCategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type BlogPostContent = {
  intro: string[];
  sections: { title: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  } | null;
};

export type BlogQualityScore = {
  score: number;
  passed: boolean;
  issues: string[];
  suggestions: string[];
  wordCount?: number;
  improved?: boolean;
};

export type BlogAiMeta = {
  featuredImagePrompt?: string;
  featuredImageUrl?: string;
  imageQualityScore?: number;
  imageAttempts?: number;
  linkedinPost?: string;
  facebookPost?: string;
  xThread?: string[];
  instagramCaption?: string;
  linkedinDraft?: string;
  twitterThread?: string[];
  facebookDraft?: string;
  targetKeyword?: string;
  buyerStage?: string;
  searchIntent?: string;
  trendType?: string;
  regenerationCount?: number;
  rejectedFromPostId?: string;
  rejectedFromPostTitle?: string;
  originalRejectedPostId?: string;
  tone?: string;
  wordCount?: number;
  model?: string;
  qualityScore?: BlogQualityScore;
};

export type BlogStats = {
  total: number;
  draft: number;
  pending_review: number;
  approved: number;
  scheduled: number;
  published: number;
  rejected: number;
};

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryName: string;
  categorySlug: string;
  authorName: string;
  status: "draft" | "pending_review" | "approved" | "scheduled" | "published" | "rejected";
  readingTime: string;
  featuredImage: string;
  targetKeyword?: string;
  buyerStage?: string;
  trendType?: string;
  qualityScore?: number | null;
  qualityPassed?: boolean | null;
  imageQualityScore?: number | null;
  regenerationCount?: number | null;
  rejectedFromPostId?: string | null;
  rejectedFromPostTitle?: string | null;
  scheduledPublishAt?: string | null;
  approvedAt?: string | null;
  publishMode?: string | null;
  wordCount?: number;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

export type BlogPostDetail = BlogPostListItem & {
  content: BlogPostContent;
  seoTitle: string;
  metaDescription: string;
  categoryId: string;
  tags: string[];
  aiMeta: BlogAiMeta;
};

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPostContent;
  seoTitle: string;
  metaDescription: string;
  featuredImage: string;
  categoryId: string;
  authorName: string;
  status: "draft" | "pending_review" | "approved" | "scheduled" | "published" | "rejected";
  readingTime?: string;
  tags: string[];
  aiMeta?: BlogAiMeta;
};

export type BlogAiGenerateInput = {
  categoryId: string;
  targetKeyword: string;
  topic: string;
  tone: string;
  wordCount: number;
};

export type BlogAiGeneration = {
  id: string;
  postId: string | null;
  topic: string;
  targetKeyword: string;
  tone: string;
  wordCount: number;
  createdBy: string | null;
  createdAt: string;
};

export type BlogTopicQueueItem = {
  id: string;
  topic: string;
  targetKeyword: string;
  categoryId: string;
  categoryName: string | null;
  priority: number;
  status: "queued" | "generating" | "done" | "failed";
  scheduledFor: string;
  generatedPostId: string | null;
  generatedPostSlug: string | null;
  generatedPostTitle: string | null;
  lastError: string | null;
  searchIntent: string | null;
  buyerStage: string | null;
  suggestedCta: string | null;
  whyThisCanRank: string | null;
  trendType: string | null;
  urgencyScore: number | null;
  expectedLeadValue: string | null;
  recommendedService: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogSocialStatus = "draft" | "approved" | "posted" | "rejected";

export type BlogSocialPost = {
  id: string;
  blogPostId: string;
  platform: "linkedin" | "facebook" | "x" | "instagram";
  content: string;
  status: BlogSocialStatus;
  scheduledAt: string | null;
  postedAt: string | null;
  createdAt: string;
  updatedAt: string;
  postTitle: string | null;
  postSlug: string | null;
};

export type BlogTranslationStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "published"
  | "rejected";

export type BlogPostTranslation = {
  id: string;
  sourcePostId: string;
  locale: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogPostContent;
  seoTitle: string;
  seoDescription: string;
  status: BlogTranslationStatus;
  createdAt: string;
  updatedAt: string;
};

export type SearchConsoleStatus = {
  connected: boolean;
  siteUrl: string;
  message: string;
};

export type SearchConsoleData = {
  status: SearchConsoleStatus;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries: {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[];
  daily: { date: string; clicks: number; impressions: number }[];
};

export type BlogTopicQueueInput = {
  topic: string;
  targetKeyword?: string;
  categoryId: string;
  priority?: number;
  scheduledFor?: string;
};

export type BlogAnalyticsSummary = {
  totalViews: number;
  totalLeads: number;
  articlesPublishedThisMonth: number;
  bestConvertingArticle: {
    id: string;
    title: string;
    slug: string;
    conversionRate: number;
    views: number;
    leads: number;
  } | null;
};

export type BlogAnalyticsPostRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  views: number;
  ctaClicks: number;
  leads: number;
  conversionRate: number;
  targetKeyword: string;
  buyerStage: string;
  qualityScore: number | null;
};

export type BlogAnalyticsOverview = {
  summary: BlogAnalyticsSummary;
  posts: BlogAnalyticsPostRow[];
  topReferrers: { referrer: string; views: number }[];
  topKeywords: {
    keyword: string;
    slug: string;
    title: string;
    views: number;
    leads: number;
  }[];
  searchConsole?: SearchConsoleData;
};

export type BlogPostAnalyticsDetail = {
  post: {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: string | null;
    targetKeyword: string;
    buyerStage: string;
    qualityScore: number | null;
    qualityPassed: boolean | null;
  };
  totalViews: number;
  ctaClicks: number;
  conversionRate: number;
  viewsOverTime: { day: string; views: number }[];
  eventCounts: { event_type: string; count: number }[];
  leads: {
    id: string;
    leadId: string;
    visitorId: string | null;
    source: string | null;
    medium: string | null;
    campaign: string | null;
    referrer: string | null;
    landingPage: string | null;
    createdAt: string;
    name: string | null;
    email: string | null;
    submissionType: string | null;
    leadStatus: string | null;
  }[];
  referrers: { referrer: string; views: number }[];
  utmCampaigns: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    leads: number;
  }[];
  searchConsole?: SearchConsoleData & { slug?: string };
};

export type AdminStats = {
  users: number;
  orders: number;
  openSupport: number;
  newLeads: number;
  totalLeads: number;
  products: number;
  displayStats: Record<string, string>;
};

export type AdminUser = User;
export type AdminOrder = ProjectOrder & { raw?: Record<string, unknown> };
export type SupportThread = {
  id: string;
  status: string;
  email?: string;
  last_message?: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  sellerName?: string;
  rating?: number;
  imageUrl?: string;
};

export type ProjectOrder = {
  id: string;
  userId?: string;
  service?: string;
  budget?: string;
  details?: string;
  deadline?: string;
  total?: number;
  stage?: string;
  status?: string;
  assignedDevId?: string;
  escrowAmount?: number;
  escrowStatus?: string;
  createdAt?: string;
};

export type Bid = {
  id: string;
  orderId: string;
  sellerId: string;
  sellerName?: string;
  price: number;
  timeline?: string;
  message?: string;
  status: string;
};

export type MarketplaceListing = {
  id: string;
  userId: string;
  listingType: "customer_request" | "worker_offer";
  title: string;
  description?: string;
  budget?: number;
  budgetLabel?: string;
  deadline?: string;
  category?: string;
  authorName?: string;
  status: string;
};

export type ListingApplication = {
  id: string;
  applicantId: string;
  applicantName?: string;
  message?: string;
  price?: number;
  timeline?: string;
  status: string;
};

export type DealChatSummary = {
  id: string;
  listingTitle?: string;
  partnerName?: string;
  listingId: string;
};

export type DealMessage = {
  id: string;
  senderId: string;
  body: string;
  attachmentName?: string;
  moderated?: boolean;
  createdAt: string;
};

export type ServicesPageData = {
  hero: {
    title: string;
    subtitle: string;
    trustBadges: string[];
    orbitIcons: string[];
  };
  featured: {
    id: string;
    icon: string;
    title: string;
    features: string[];
    timeline: string;
    price: string;
    highlight: string;
    imageAccent: string;
  }[];
  grid: {
    id: string;
    icon: string;
    title: string;
    desc: string;
    tech: string[];
    timeline: string;
    price: string;
  }[];
  stats: { value: string; label: string }[];
  process: { step: number; icon: string; title: string; desc: string }[];
  live?: { users: number; orders: number; inquiries: number; successRate: string };
};
