/* script.js */

/* ========================================
   DEWEB - JS (Slider + i18n + Account + Orders + Marketplace + Services Panel)
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Account link: if logged in go to dashboard, else go to sign-in page
  const openAccountBtn = document.getElementById("openAccountBtn");
  if (openAccountBtn && openAccountBtn.tagName === "A") {
    try {
      const hasToken = Boolean(localStorage.getItem("deweb_token"));
      const session = JSON.parse(localStorage.getItem("deweb_session") || "null");
      if (hasToken || (session && session.userId)) openAccountBtn.href = "account-dashboard.html";
    } catch (_) {}
    openAccountBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const href = openAccountBtn.getAttribute("href");
      if (href && href !== "#") {
        const base = window.location.href.replace(/[#?].*$/, "").replace(/[^/]+$/, "");
        window.location.href = base + href.replace(/^\.\//, "");
      }
    });
  }

  const slidesWrapper = document.getElementById("slidesWrapper");
  const pagination = document.getElementById("pagination");
  const navLinks = document.querySelectorAll(".nav-links a");
  const totalSlides = slidesWrapper ? slidesWrapper.querySelectorAll(".slide").length : 0;

  if (!slidesWrapper || !totalSlides) {
    console.warn("Slider not initialized: slidesWrapper missing.");
    return;
  }

  let currentSlide = 0;

  /* =========================
     PAGINATION
     ========================= */
  function createPagination() {
    if (!pagination) return;
    pagination.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      pagination.appendChild(dot);
    }
  }

  function updateActiveStates() {
    document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === currentSlide));
    navLinks.forEach((link) => {
      const idx = Number(link.dataset.slide);
      link.classList.toggle("active", idx === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    if (!Number.isFinite(slideIndex)) return;
    if (slideIndex < 0 || slideIndex >= totalSlides) return;

    currentSlide = slideIndex;
    slidesWrapper.style.transform = `translateX(${-slideIndex * 100}vw)`;
    document.body.setAttribute("data-slide", String(slideIndex));
    updateActiveStates();

    // ✅ reset vertical scroll on slide change
    const slides = slidesWrapper.querySelectorAll(".slide");
    const active = slides[slideIndex];
    if (active && typeof active.scrollTo === "function") {
      active.scrollTo({ top: 0, behavior: "auto" }); // "instant" is invalid
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }

  // expose for onclick handlers
  window.goToSlide = goToSlide;
  window.nextSlide = nextSlide;
  window.previousSlide = previousSlide;

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") previousSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Nav clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const slideIndex = Number(link.dataset.slide);
      goToSlide(slideIndex);
    });
  });

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;
  slidesWrapper.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].screenX), { passive: true });
  slidesWrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) nextSlide();
    if (touchEndX - touchStartX > swipeThreshold) previousSlide();
  });

  /* =========================
     CONTACT FORM
     ========================= */
  window.submitForm = async function submitForm() {
    const emailEl = document.getElementById("email");
    const suggestionsEl = document.getElementById("suggestions");

    if (!emailEl || !suggestionsEl) return alert("Form elements not found!");
    const email = emailEl.value.trim();
    const msg = suggestionsEl.value.trim();

    if (!email || !msg) return alert("Please fill in all fields!");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Please enter a valid email address!");

    try {
      const data = await window.DEWEB_API.Contact.send({ email, message: msg });
      alert(data.message || "Thank you! Your message has been received.");
      emailEl.value = "";
      suggestionsEl.value = "";
    } catch (err) {
      alert(err.message || "Could not send message.");
    }
  };

  /* =========================
     i18n (HY/EN/RU)
     ========================= */
  const I18N = {
    en: {
      nav: { home:"Home", services:"Services", packages:"Packages", order:"Order", marketplace:"Marketplace", about:"About", contact:"Contact", account:"Account" },
      home: {
        title:"IT Studio & Marketplace",
        subtitle:"Websites, bots, automation, design — built fast, clean, and scalable. Order end-to-end or hire verified talent.",
        cta1:"Order from 0 → 100%", cta2:"Explore Marketplace",
        stat1b:"Packages", stat1s:"Fixed scope offers",
        stat2b:"Milestones", stat2s:"Track progress in account",
        stat3b:"Roles", stat3s:"Client or Developer"
      },
      services:{
        title:"What DEWEB delivers",
        subtitle:"We sell solutions — not “hours”. Pick a direction or order full production.",
        cta:"Get Quote",
        web:{ t:"Web & E-commerce", d:"Landing pages, corporate sites, online stores, speed, SEO basics." },
        bot:{ t:"Bots & Automation", d:"Telegram bots, WhatsApp workflows, CRM integrations, monitoring, scraping." },
        design:{ t:"Design & Branding", d:"UI/UX, logos, identity, Figma systems, marketplaces graphics." },
        growth:{ t:"Growth & Support", d:"Maintenance, analytics, conversion, performance tuning, security." },
        whyTitle:"Why clients choose DEWEB",
        why1:"Productized packages (clear scope + timeline)",
        why2:"Milestone payments",
        why3:"Account tracking (stage updates)",
        why4:"Supplier network (fast scaling)",
        forSupTitle:"For suppliers & developers",
        forSup1:"Stable leads from DEWEB",
        forSup2:"Work under DEWEB brand",
        forSup3:"Portfolio + verified profile",
        forSup4:"Claim tasks inside dashboard",
        forSupCTA:"Go to Marketplace"
      },
      packages: {
        title:"Productized IT Packages",
        subtitle:"Clear scope. Clear price range. Fast delivery. Monthly support optional.",
        cta:"Get Quote →", cta2:"Talk to us",
        web:{ title:"Website Launch", desc:"Landing / corporate website from design to deploy.", li1:"UI/UX + responsive", li2:"SEO basics + analytics", li3:"Deploy + 30 days support" },
        bot:{ title:"Telegram Bot System", desc:"Sales, booking, CRM automation, payments.", li1:"Admin panel (basic)", li2:"Integrations (Sheets/CRM)", li3:"Deploy + monitoring" },
        design:{ title:"Brand + UI Kit", desc:"Logo + brand rules + website UI design in Figma.", li1:"Logo + identity", li2:"UI kit + components", li3:"Ready for dev handoff" },
        support:{ title:"Monthly Support", desc:"Updates, fixes, speed, security, small features.", li1:"Priority fixes", li2:"Performance checks", li3:"Reports + roadmap" },
        noteBadge:"Tip",
        noteText:"Don’t know which package fits? Use “Order” and we will propose best scope + pricing."
      },
      order:{
        title:"Order from 0 → 100%",
        subtitle:"Send your request. We reply with scope, price, and timeline.",
        s1:"Inquiry", s1d:"you send details",
        s2:"Quote", s2d:"scope + price",
        s3:"Contact", s3d:"negotiate terms",
        s4:"Delivery", s4d:"testing + launch",
        howTitle:"How it works inside your Account",
        how1:"You see your order status: Inquiry → Quote → Paid → In Progress → Delivered → Done",
        how2:"You can add files/links later (in real version)",
        how3:"Developers can claim tasks (Marketplace)",
        openAccount:"Open Account",
        service:"Service", budget:"Budget range", deadline:"Deadline", details:"Project details", contact:"Contact",
        opt:{ website:"Website / Landing / E-commerce", bot:"Telegram Bot / Automation", design:"Design / Branding / UI", support:"Maintenance / Growth" },
        pay:{ card:"Card", crypto:"Crypto", bank:"Bank transfer", cash:"Cash" },
        send:"Send Inquiry",
        note:"After sending, you’ll see the order in your Account dashboard."
      },
      market:{
        title:"Marketplace",
        subtitle:"Hire specialists or claim tasks if you’re a developer.",
        filters:"Filters",
        all:"All roles",
        dev:"Developers",
        skillAll:"All skills",
        tipBadge:"Tip",
        tipText:"Developers: sign up → role “Developer” → add portfolio → claim orders in dashboard.",
        openAccount:"Open Account",
        openOrders:"Open Orders",
        createOrder:"Create Order"
      },
      about:{
        title:"About DEWEB",
        base:"DEWEB is a senior-led IT production studio + marketplace. We deliver websites, automation, bots, and design. We also build a supplier ecosystem: verified developers get stable leads, clients get predictable delivery.",
        v1b:"Speed", v1s:"Fast delivery without chaos",
        v2b:"Clarity", v2s:"Packages, scope, milestones",
        v3b:"Quality", v3s:"Production-first engineering",
        cards:{ web:"Web & E-commerce", bots:"Bots & Automation", design:"Design & Branding", growth:"Growth & Support", market:"Marketplace", process:"Process" },
        detailKicker:"Selected section",
        details:{
          web:{ title:"Web & E-commerce", intro:"This section means complete website production, from the first idea to a launched product customers can use.", points:["We can build landing pages, company websites, service pages, dashboards, and online stores.","For e-commerce, the focus is product pages, cart, checkout, payments, order flow, and admin tools.","The final result should be fast, mobile-friendly, easy to understand, and ready for real users."] },
          bots:{ title:"Bots & Automation", intro:"This section means using bots and automated workflows to save time and reduce manual work.", points:["Examples include Telegram bots, lead collection, booking flows, reminders, alerts, and customer support helpers.","Automation can connect forms, CRM, spreadsheets, notifications, payments, and internal tools.","The goal is simple: users do fewer repeated actions, and the business reacts faster."] },
          design:{ title:"Design & Branding", intro:"This section explains how the product looks, feels, and earns trust before a customer buys.", points:["Design includes UI/UX, page layouts, Figma files, logos, colors, typography, and brand rules.","Good design makes the product easier to read, easier to use, and more professional.","For sellers and products, design also helps create strong marketplace cards, previews, and presentation."] },
          growth:{ title:"Growth & Support", intro:"This section is about what happens after launch, because a real product needs care and improvement.", points:["Support can include updates, fixes, speed checks, security improvements, analytics, and SEO basics.","Growth work improves conversion, content, user experience, and the parts where customers leave.","Instead of launching once and stopping, the product can keep improving every month."] },
          market:{ title:"Marketplace", intro:"This section means DEWEB is not only a studio, but also a place where customers and sellers can work together.", points:["Customers can compare sellers by profile, portfolio, products, announcements, reviews, and activity.","Sellers can create an account, add portfolio information, publish products, and receive orders.","Payments and delivery confirmations should protect both sides: if delivery is not confirmed, coins can return to the customer."] },
          process:{ title:"Process", intro:"This section explains the order path so customers and sellers know what happens next.", points:["The flow starts with an inquiry, then a quote, scope, payment, production, review, and delivery.","Both customer and seller should confirm the result, so the platform can close the order correctly.","Clear statuses in the account make the work easier to follow and reduce confusion."] }
        }
      },
      acc:{
        signin:"Sign in", signup:"Sign up", dashboard:"Dashboard",
        signinBtn:"Sign in", signupBtn:"Create account",
        orContinueWith:"Or continue with",
        signInGoogle:"Google", signInApple:"Apple", signInFb:"Facebook",
        roleClient:"Client", roleDev:"Developer",
        siNote:"Use sign up if you don't have an account.",
        suNote:"After sign up you can track orders or apply for work.",
        logout:"Log out",
        security:"Security & account",
        password:"Password",
        passwordDesc:"Change your password or set one if you signed in with a social account.",
        socialLogin:"Social login",
        socialLoginDesc:"Manage how you sign in with Google, Apple, or Facebook.",
        activityLog:"Activity log",
        activityLogDesc:"Recent sign-ins and account activity.",
        manage:"Manage",
        viewActivity:"View activity",
        signedInWith:"Signed in with"
      },
      dash:{
        clientOrders:"My Orders",
        devPortfolio:"My Portfolio",
        devNew:"New Orders",
        devDone:"Completed"
      },
      contact: { placeholderMessage: "Write your message...", placeholderEmail: "Write your e-mail...", sendButton: "SEND MESSAGE" }
    },

    ru: {
      nav: { home: "Главная", services: "Услуги", packages: "Пакеты", order: "Заказ", marketplace: "Маркетплейс", about: "О нас", contact: "Контакты", account: "Аккаунт" },
      home: { title: "IT-студия и маркетплейс", subtitle: "Сайты, боты, автоматизация, дизайн — быстро и масштабируемо. Закажите под ключ или наймите проверенных специалистов.", cta1: "Заказ от 0 до 100%", cta2: "В маркетплейс", stat1b: "Пакеты", stat1s: "Фиксированный объём", stat2b: "Этапы", stat2s: "Отслеживание в аккаунте", stat3b: "Роли", stat3s: "Клиент или разработчик" },
      services: { title: "Что делает DEWEB", subtitle: "Мы продаём решения, а не часы. Выберите направление или закажите полный цикл.", cta: "Получить предложение", web: { t: "Веб и E-commerce", d: "Лендинги, корпоративные сайты, интернет-магазины." }, bot: { t: "Боты и автоматизация", d: "Telegram-боты, интеграции, мониторинг." }, design: { t: "Дизайн и брендинг", d: "UI/UX, логотипы, Figma." }, growth: { t: "Рост и поддержка", d: "Поддержка, аналитика, безопасность." }, whyTitle: "Почему выбирают DEWEB", why1: "Пакетные предложения", why2: "Оплата по этапам", why3: "Статусы в аккаунте", why4: "Сеть исполнителей", forSupTitle: "Для поставщиков", forSup1: "Стабильные заказы", forSup2: "Работа под брендом DEWEB", forSup3: "Портфолио и профиль", forSup4: "Заявки в дашборде", forSupCTA: "В маркетплейс" },
      packages: { title: "IT-пакеты", subtitle: "Понятный объём, цена, сроки. Поддержка опционально.", cta: "Получить предложение →", cta2: "Связаться", web: { title: "Запуск сайта", desc: "Лендинг или корпоративный сайт.", li1: "UI/UX и адаптив", li2: "SEO и аналитика", li3: "Размещение и 30 дней поддержки" }, bot: { title: "Система Telegram-бота", desc: "Продажи, запись, CRM, платежи.", li1: "Админ-панель", li2: "Интеграции", li3: "Размещение" }, design: { title: "Бренд и UI Kit", desc: "Логотип, правила бренда, UI в Figma.", li1: "Логотип и идентичность", li2: "UI kit", li3: "Передача в разработку" }, support: { title: "Месячная поддержка", desc: "Правки, обновления, безопасность.", li1: "Приоритетные правки", li2: "Производительность", li3: "Отчёты" }, noteBadge: "Совет", noteText: "Не знаете, какой пакет подходит? Оформите заказ — предложим объём и цену." },
      order: { title: "Заказ от 0 до 100%", subtitle: "Оставьте заявку. Ответим с объёмом, ценой, сроками и способами оплаты.", s1: "Заявка", s1d: "вы отправляете детали", s2: "Предложение", s2d: "объём и цена", s3: "Оплата", s3d: "по этапам", s4: "Доставка", s4d: "тест и запуск", howTitle: "Как это в аккаунте", how1: "Статус заказа: Заявка → Предложение → Оплачено → В работе → Доставлено → Готово", how2: "Можно добавить файлы (в полной версии)", how3: "Разработчики могут брать задачи", openAccount: "Открыть аккаунт", service: "Услуга", budget: "Бюджет", deadline: "Срок", details: "Детали проекта", contact: "Контакт", opt: { website: "Сайт / Лендинг / E-commerce", bot: "Telegram-бот / Автоматизация", design: "Дизайн / Брендинг / UI", support: "Поддержка / Рост" }, pay: { card: "Карта", crypto: "Криптовалюта", bank: "Банк", cash: "Наличные" }, send: "Отправить заявку", note: "После отправки заказ появится в аккаунте." },
      market: { title: "Маркетплейс", subtitle: "Нанять специалистов или брать задачи как разработчик.", filters: "Фильтры", all: "Все роли", dev: "Разработчики", skillAll: "Все навыки", tipBadge: "Совет", tipText: "Разработчики: регистрация → роль «Разработчик» → портфолио → заявки в дашборде.", openAccount: "Открыть аккаунт", openOrders: "Открытые заказы", createOrder: "Создать заказ" },
      about: { title: "О DEWEB", base: "DEWEB — IT-студия и маркетплейс. Сайты, автоматизация, боты, дизайн. Проверенные разработчики получают заказы, клиенты — предсказуемый результат.", v1b: "Скорость", v1s: "Быстро без хаоса", v2b: "Ясность", v2s: "Пакеты, объём, этапы", v3b: "Качество", v3s: "Продакшен-уровень", cards: { web: "Веб и E-commerce", bots: "Боты и автоматизация", design: "Дизайн и брендинг", growth: "Рост и поддержка", market: "Маркетплейс", process: "Процесс" }, detailKicker: "Выбранный раздел", details: { web: { title: "Веб и E-commerce", intro: "Этот раздел означает полную разработку сайта: от идеи до запущенного продукта, которым могут пользоваться клиенты.", points: ["Мы можем создавать лендинги, корпоративные сайты, страницы услуг, кабинеты, панели и интернет-магазины.", "Для e-commerce важны карточки товаров, корзина, checkout, платежи, заказы и админ-инструменты.", "Итоговый продукт должен быть быстрым, адаптивным, понятным и готовым к реальным пользователям."] }, bots: { title: "Боты и автоматизация", intro: "Этот раздел помогает экономить время и убирать ручную повторяющуюся работу через ботов и автоматические процессы.", points: ["Примеры: Telegram-боты, сбор заявок, записи, напоминания, уведомления и помощники поддержки.", "Автоматизация может соединять формы, CRM, таблицы, уведомления, платежи и внутренние инструменты.", "Цель простая: меньше ручных действий и быстрее реакция бизнеса."] }, design: { title: "Дизайн и брендинг", intro: "Этот раздел объясняет, как продукт выглядит, ощущается и вызывает доверие до покупки.", points: ["Дизайн включает UI/UX, макеты, Figma-файлы, логотипы, цвета, типографику и правила бренда.", "Хороший дизайн делает продукт понятнее, удобнее и профессиональнее.", "Для продавцов и товаров дизайн помогает создавать сильные карточки, превью и презентацию в маркетплейсе."] }, growth: { title: "Рост и поддержка", intro: "Этот раздел о том, что происходит после запуска, потому что реальному продукту нужны поддержка и улучшения.", points: ["Поддержка включает обновления, исправления, проверку скорости, безопасность, аналитику и базовое SEO.", "Работа над ростом улучшает конверсию, контент, удобство и места, где пользователи уходят.", "Продукт может не просто запуститься один раз, а становиться лучше каждый месяц."] }, market: { title: "Маркетплейс", intro: "Этот раздел означает, что DEWEB — не только студия, но и место, где клиенты и продавцы могут работать вместе.", points: ["Клиенты сравнивают продавцов по профилю, портфолио, продуктам, объявлениям, отзывам и активности.", "Продавцы могут создать аккаунт, добавить портфолио, публиковать продукты и получать заказы.", "Оплата и подтверждение доставки должны защищать обе стороны: если доставка не подтверждена, монеты возвращаются клиенту."] }, process: { title: "Процесс", intro: "Этот раздел объясняет путь заказа, чтобы клиент и продавец понимали следующий шаг.", points: ["Путь начинается с заявки, затем идут предложение, объём, оплата, производство, проверка и доставка.", "Клиент и продавец должны подтвердить результат, чтобы платформа корректно закрыла заказ.", "Понятные статусы в аккаунте помогают следить за работой и уменьшают путаницу."] } } },
      acc: { signin: "Вход", signup: "Регистрация", dashboard: "Дашборд", signinBtn: "Войти", signupBtn: "Создать аккаунт", orContinueWith: "Или войти через", signInGoogle: "Google", signInApple: "Apple", signInFb: "Facebook", roleClient: "Клиент", roleDev: "Разработчик", siNote: "Нет аккаунта? Зарегистрируйтесь.", suNote: "После регистрации можно отслеживать заказы или откликаться на задачи.", logout: "Выйти", security: "Безопасность и аккаунт", password: "Пароль", passwordDesc: "Смените пароль или установите его при входе через соцсеть.", socialLogin: "Вход через соцсети", socialLoginDesc: "Управление входом через Google, Apple или Facebook.", activityLog: "Журнал активности", activityLogDesc: "Последние входы и действия.", manage: "Управление", viewActivity: "Смотреть активность", signedInWith: "Вход через" },
      dash: { clientOrders: "Мои заказы", devPortfolio: "Портфолио", devNew: "Новые заказы", devDone: "Выполнено" },
      contact: { placeholderMessage: "Напишите сообщение...", placeholderEmail: "Ваш e-mail...", sendButton: "ОТПРАВИТЬ" }
    },
    hy: {
      nav: { home: "Գլխավոր", services: "Ծառայություններ", packages: "Փաթեթներ", order: "Պատվեր", marketplace: "Մարկետփլեյս", about: "Մեր մասին", contact: "Կապ", account: "Հաշիվ" },
      home: { title: "IT ստուդիա և մարկետփլեյս", subtitle: "Կայքեր, բոտեր, ավտոմատացում, դիզայն — արագ և մասշտաբելի։ Պատվիրեք ամբողջությամբ կամ վարձեք ստուգված մասնագետներին։", cta1: "Պատվեր 0-ից 100%", cta2: "Դեպի մարկետփլեյս", stat1b: "Փաթեթներ", stat1s: "Ֆիքսված շրջանակ", stat2b: "Փուլեր", stat2s: "Հետևում հաշվում", stat3b: "Դերեր", stat3s: "Կլիենտ կամ մշակող" },
      services: { title: "Ինչ է առաջարկում DEWEB", subtitle: "Մենք վաճառում ենք լուծումներ, ոչ ժամեր։ Ընտրեք ուղղություն կամ պատվիրեք ամբողջ արտադրությունը։", cta: "Ստանալ առաջարկ", web: { t: "Վեբ և E-commerce", d: "Լենդինգներ, կորպորատիվ կայքեր, առցանց խանութներ։" }, bot: { t: "Բոտեր և ավտոմատացում", d: "Telegram բոտեր, ինտեգրացիաներ։" }, design: { t: "Դիզայն և ապրանքանիշ", d: "UI/UX, լոգոներ, Figma։" }, growth: { t: "Աճ և աջակցություն", d: "Աջակցություն, անալիտիկա, անվտանգություն։" }, whyTitle: "Ինչու DEWEB", why1: "Փաթեթային առաջարկներ", why2: "Վճարում փուլերով", why3: "Կարգավիճակ հաշվում", why4: "Կատարողների ցանց", forSupTitle: "Մատակարարների համար", forSup1: "Կայուն պատվերներ", forSup2: "Աշխատանք DEWEB ապրանքանիշի ներքո", forSup3: "Պորտֆոլիո և պրոֆիլ", forSup4: "Հարցումներ դաշշբորդում", forSupCTA: "Դեպի մարկետփլեյս" },
      packages: { title: "IT փաթեթներ", subtitle: "Հասկանալի շրջանակ, գին, ժամկետներ։ Աջակցությունը ընտրովի է։", cta: "Ստանալ առաջարկ →", cta2: "Կապվել", web: { title: "Կայքի մեկնարկ", desc: "Լենդինգ կամ կորպորատիվ կայք։", li1: "UI/UX և ադապտիվ", li2: "SEO և անալիտիկա", li3: "Տեղակայում և 30 օր աջակցություն" }, bot: { title: "Telegram բոտի համակարգ", desc: "Վաճառք, ամրագրում, CRM, վճարումներ։", li1: "Ադմին-պանել", li2: "Ինտեգրացիաներ", li3: "Տեղակայում" }, design: { title: "Ապրանքանիշ և UI Kit", desc: "Լոգո, ապրանքանիշի կանոններ, UI Figma-ում։", li1: "Լոգո և իդենտիկություն", li2: "UI kit", li3: "Հանձնում մշակողին" }, support: { title: "Ամսական աջակցություն", desc: "Ուղղումներ, թարմացումներ, անվտանգություն։", li1: "Առաջնահերթ ուղղումներ", li2: "Արագություն", li3: "Հաշվետվություններ" }, noteBadge: "Խորհուրդ", noteText: "Չգիտե՞ք, թե որ փաթեթը հարմար է։ Օգտագործեք «Պատվեր» — կառաջարկենք շրջանակ և գին։" },
      order: { title: "Պատվեր 0-ից 100%", subtitle: "Ուղարկեք հարցում։ Կպատասխանենք շրջանակով, գնով, ժամկետներով և վճարման եղանակներով։", s1: "Հարցում", s1d: "դուք ուղարկում եք մանրամասներ", s2: "Առաջարկ", s2d: "շրջանակ և գին", s3: "Վճարում", s3d: "փուլեր", s4: "Առաքում", s4d: "թեստ և մեկնարկ", howTitle: "Ինչպես է աշխատում հաշվում", how1: "Պատվերի կարգավիճակ՝ Հարցում → Առաջարկ → Վճարված → Ընթացքում → Առաքված → Պատրաստ", how2: "Կարող եք ավելացնել ֆայլեր (լրիվ տարբերակում)", how3: "Մշակողները կարող են վերցնել առաջադրանքներ", openAccount: "Բացել հաշիվ", service: "Ծառայություն", budget: "Բյուջե", deadline: "Ժամկետ", details: "Նախագծի մանրամասներ", contact: "Կապ", opt: { website: "Կայք / Լենդինգ / E-commerce", bot: "Telegram բոտ / Ավտոմատացում", design: "Դիզայն / Ապրանքանիշ / UI", support: "Աջակցություն / Աճ" }, pay: { card: "Քարտ", crypto: "Կրիպտո", bank: "Բանկ", cash: "Կանխիկ" }, send: "Ուղարկել հարցում", note: "Ուղարկելուց հետո պատվերը կերևա հաշվի դաշշբորդում։" },
      market: { title: "Մարկետփլեյս", subtitle: "Վարձեք մասնագետներ կամ վերցրեք առաջադրանքներ որպես մշակող։", filters: "Զտիչներ", all: "Բոլոր դերերը", dev: "Մշակողներ", skillAll: "Բոլոր հմտությունները", tipBadge: "Խորհուրդ", tipText: "Մշակողներ՝ գրանցում → «Մշակող» դեր → պորտֆոլիո → առաջադրանքներ դաշշբորդում։", openAccount: "Բացել հաշիվ", openOrders: "Բաց պատվերներ", createOrder: "Ստեղծել պատվեր" },
      about: { title: "DEWEB-ի մասին", base: "DEWEB-ը IT արտադրության ստուդիա և մարկետփլեյս է։ Կայքեր, ավտոմատացում, բոտեր, դիզայն։ Ստուգված մշակողները ստանում են պատվերներ, կլիենտները՝ կանխատեսելի արդյունք։", v1b: "Արագություն", v1s: "Արագ առանց խառնաշփոթի", v2b: "Պարզություն", v2s: "Փաթեթներ, շրջանակ, փուլեր", v3b: "Որակ", v3s: "Արտադրության մակարդակ", cards: { web: "Վեբ և E-commerce", bots: "Բոտեր և ավտոմատացում", design: "Դիզայն և ապրանքանիշ", growth: "Աճ և աջակցություն", market: "Մարկետփլեյս", process: "Գործընթաց" }, detailKicker: "Ընտրված բաժին", details: { web: { title: "Վեբ և E-commerce", intro: "Այս բաժինը նշանակում է կայքի ամբողջական ստեղծում՝ գաղափարից մինչև գործարկված պրոդուկտ, որը կարող են օգտագործել հաճախորդները։", points: ["Կարող ենք ստեղծել լենդինգներ, կորպորատիվ կայքեր, ծառայությունների էջեր, դաշբորդներ և առցանց խանութներ։", "E-commerce-ի համար կարևոր են ապրանքի էջերը, զամբյուղը, checkout-ը, վճարումները, պատվերների հոսքը և ադմին գործիքները։", "Վերջնական արդյունքը պետք է լինի արագ, հարմար հեռախոսների համար, հասկանալի և պատրաստ իրական օգտատերերի համար։"] }, bots: { title: "Բոտեր և ավտոմատացում", intro: "Այս բաժինը օգնում է խնայել ժամանակը և նվազեցնել կրկնվող ձեռքով աշխատանքը բոտերի ու ավտոմատ հոսքերի միջոցով։", points: ["Օրինակներ՝ Telegram բոտեր, հայտերի հավաքում, ամրագրումներ, հիշեցումներ, ծանուցումներ և աջակցության օգնականներ։", "Ավտոմատացումը կարող է միացնել ձևեր, CRM, աղյուսակներ, ծանուցումներ, վճարումներ և ներքին գործիքներ։", "Նպատակը պարզ է՝ քիչ ձեռքով գործողություններ և բիզնեսի ավելի արագ արձագանք։"] }, design: { title: "Դիզայն և ապրանքանիշ", intro: "Այս բաժինը բացատրում է, թե ինչպես է պրոդուկտը երևում, զգացվում և վստահություն ստեղծում մինչև գնումը։", points: ["Դիզայնը ներառում է UI/UX, էջերի մակետներ, Figma ֆայլեր, լոգոներ, գույներ, տառատեսակներ և բրենդի կանոններ։", "Լավ դիզայնը պրոդուկտը դարձնում է ավելի հասկանալի, օգտագործելի և պրոֆեսիոնալ։", "Վաճառողների և ապրանքների համար դիզայնը օգնում է ստեղծել ուժեղ քարտեր, նախադիտումներ և ներկայացում մարկետփլեյսում։"] }, growth: { title: "Աճ և աջակցություն", intro: "Այս բաժինը վերաբերում է գործարկումից հետո աշխատանքին, որովհետև իրական պրոդուկտը խնամքի և բարելավման կարիք ունի։", points: ["Աջակցությունը կարող է ներառել թարմացումներ, ուղղումներ, արագության ստուգում, անվտանգություն, անալիտիկա և SEO հիմունքներ։", "Աճի աշխատանքը բարելավում է կոնվերսիան, բովանդակությունը, օգտատիրոջ փորձը և այն կետերը, որտեղ հաճախորդները հեռանում են։", "Պրոդուկտը կարող է ոչ թե մեկ անգամ գործարկվել ու կանգնել, այլ ամեն ամիս ավելի լավը դառնալ։"] }, market: { title: "Մարկետփլեյս", intro: "Այս բաժինը նշանակում է, որ DEWEB-ը միայն ստուդիա չէ, այլ նաև վայր, որտեղ հաճախորդներն ու վաճառողները կարող են աշխատել միասին։", points: ["Հաճախորդները կարող են համեմատել վաճառողներին ըստ պրոֆիլի, պորտֆոլիոյի, ապրանքների, հայտարարությունների, կարծիքների և ակտիվության։", "Վաճառողները կարող են ստեղծել հաշիվ, ավելացնել պորտֆոլիո, հրապարակել ապրանքներ և ստանալ պատվերներ։", "Վճարումն ու առաքման հաստատումը պետք է պաշտպանեն երկու կողմերին․ եթե առաքումը չի հաստատվում, մետաղադրամները կարող են վերադարձվել հաճախորդին։"] }, process: { title: "Գործընթաց", intro: "Այս բաժինը բացատրում է պատվերի ճանապարհը, որպեսզի հաճախորդն ու վաճառողը հասկանան հաջորդ քայլը։", points: ["Հոսքը սկսվում է հարցումով, հետո լինում է առաջարկ, շրջանակ, վճարում, արտադրություն, ստուգում և առաքում։", "Հաճախորդն ու վաճառողը պետք է հաստատեն արդյունքը, որպեսզի պլատֆորմը ճիշտ փակի պատվերը։", "Հստակ կարգավիճակները հաշվում օգնում են հետևել աշխատանքին և նվազեցնել շփոթությունը։"] } } },
      acc: { signin: "Մուտք", signup: "Գրանցում", dashboard: "Դաշշբորդ", signinBtn: "Մուտք", signupBtn: "Ստեղծել հաշիվ", orContinueWith: "Կամ շարունակել через", signInGoogle: "Google", signInApple: "Apple", signInFb: "Facebook", roleClient: "Կլիենտ", roleDev: "Մշակող", siNote: "Հաշիվ չունե՞ք։ Գրանցվեք։", suNote: "Գրանցումից հետո կարող եք հետևել պատվերներին կամ արձագանքել առաջադրանքներին։", logout: "Դուրս գալ", security: "Անվտանգություն և հաշիվ", password: "Գաղտնաբառ", passwordDesc: "Փոխեք գաղտնաբառը կամ սահմանեք, եթե մուտք եք գործել սոցիալական միջոցով։", socialLogin: "Սոցիալական մուտք", socialLoginDesc: "Կառավարեք մուտքը Google, Apple կամ Facebook-ով։", activityLog: "Գործունեության մատյան", activityLogDesc: "Վերջին մուտքերն ու գործողությունները։", manage: "Կառավարել", viewActivity: "Դիտել ակտիվությունը", signedInWith: "Մուտք" },
      dash: { clientOrders: "Իմ պատվերները", devPortfolio: "Պորտֆոլիո", devNew: "Նոր պատվերներ", devDone: "Կատարված" },
      contact: { placeholderMessage: "Գրեք ձեր հաղորդագրությունը...", placeholderEmail: "Ձեր e-mail...", sendButton: "ՈՒՂԱՐԿԵԼ" }
    }
  };

  function applyI18n(lang){
    const dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const path = el.dataset.i18n.split(".");
      let cur = dict;
      for (const k of path) cur = cur?.[k];
      if (typeof cur === "string") el.textContent = cur;
    });

    const c = dict.contact;
    if (c) {
      const suggestions = document.getElementById("suggestions");
      if (suggestions) suggestions.placeholder = c.placeholderMessage;
      const contactEmail = document.getElementById("email");
      if (contactEmail) contactEmail.placeholder = c.placeholderEmail;
      const sendBtn = document.querySelector(".contact-form .send-btn");
      if (sendBtn) sendBtn.textContent = c.sendButton;
    }
  }

  /* =========================
     Language Dropdown (single visible + menu with other 2)
     ========================= */
  const LANGS = [
    { code: "hy", label: "HY" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
  ];

  let currentLang = localStorage.getItem("deweb_lang") || "en";
  let rerenderAboutDetail = null;

  const langDD = document.getElementById("langDD");
  const langBtn = document.getElementById("langBtn");
  const langLabel = document.getElementById("langLabel");
  const langMenu = document.getElementById("langMenu");

  function renderLangUI() {
    const selected = LANGS.find(l => l.code === currentLang) || LANGS[1];
    if (langLabel) langLabel.textContent = selected.label;
    if (!langMenu) return;

    langMenu.innerHTML = "";
    LANGS.filter(l => l.code !== currentLang).forEach((l) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "lang-dd__item";
      item.setAttribute("role", "option");
      item.textContent = l.label;

      item.addEventListener("click", () => {
        currentLang = l.code;
        localStorage.setItem("deweb_lang", currentLang);
        applyI18n(currentLang);
        if (typeof rerenderAboutDetail === "function") rerenderAboutDetail();
        renderLangUI();
        closeLangMenu();
      });

      langMenu.appendChild(item);
    });
  }

  function openLangMenu() {
    if (!langDD) return;
    langDD.classList.add("open");
    langBtn?.setAttribute("aria-expanded", "true");
  }

  function closeLangMenu() {
    if (!langDD) return;
    langDD.classList.remove("open");
    langBtn?.setAttribute("aria-expanded", "false");
  }

  function toggleLangMenu() {
    if (!langDD) return;
    langDD.classList.contains("open") ? closeLangMenu() : openLangMenu();
  }

  if (langBtn && langDD) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLangMenu();
    });

    document.addEventListener("click", (e) => {
      if (!langDD.contains(e.target)) closeLangMenu();
    });
  }

  /* =========================
     NEW: Services section hover panel + click
     (only works if you updated Slide 2 HTML)
     ========================= */
  function initServicesSection(){
  const stack = document.getElementById("servicesStack");
  const panelBadge = document.getElementById("panelBadge");
  const panelTitle = document.getElementById("panelTitle");
  const panelDesc  = document.getElementById("panelDesc");
  const panelBullets = document.getElementById("panelBullets");
  const panelDetailsLink = document.getElementById("panelDetailsLink");

  if (!stack || !panelTitle || !panelDesc || !panelBullets) return;

  // You can rewrite texts later via i18n. For now EN prototype.
  const content = {
    web: {
      title: "Web & E-commerce",
      desc: "High-converting landing pages, corporate websites, and e-commerce stores — fast, secure, scalable.",
      bullets: [
        "Landing pages that convert",
        "Corporate sites with clean UX",
        "E-commerce with payments",
        "SEO basics + analytics"
      ],
      details: [
        { h: "Landing pages", items: ["Copy + sections", "Responsive layout", "Lead forms", "Speed optimization"] },
        { h: "Corporate sites", items: ["Multi-page structure", "Team/About/Services", "CMS option", "Security basics"] },
        { h: "E-commerce", items: ["Product pages", "Cart/checkout", "Payments", "Admin workflows"] },
        { h: "Extras", items: ["Domain + deploy", "Analytics", "SEO basics", "Support plans"] },
      ]
    },
    bots: {
      title: "Bots & Automation",
      desc: "Telegram bots, workflows, integrations — automate sales, support, bookings, and operations.",
      bullets: [
        "Telegram bots (sales/booking/support)",
        "Google Sheets / CRM integrations",
        "Admin commands + notifications",
        "Deploy + monitoring"
      ],
      details: [
        { h: "Telegram bots", items: ["Menus & flows", "Payments (optional)", "Admin panel basics", "Anti-spam"] },
        { h: "Automation", items: ["Sheets/Notion/CRM", "Webhooks", "Scheduled tasks", "Alerts"] },
        { h: "Integrations", items: ["Website → bot", "APIs", "Tracking events", "Data export"] },
        { h: "Maintenance", items: ["Logs", "Uptime", "Bug fixes", "New features"] },
      ]
    },
    design: {
      title: "Design & Branding",
      desc: "Brand identity and UI design that looks premium and sells — ready for development handoff.",
      bullets: [
        "Logo + brand identity",
        "Figma UI kit + components",
        "Landing/product page design",
        "Marketplace graphics"
      ],
      details: [
        { h: "Branding", items: ["Logo", "Colors & typography", "Brand rules", "Social pack"] },
        { h: "UI/UX", items: ["Wireframes", "Final UI", "Components", "Design system"] },
        { h: "Web design", items: ["Landing", "Corporate", "E-commerce UI", "Mobile-first"] },
        { h: "Delivery", items: ["Figma file", "Export assets", "Specs for dev", "Iterations"] },
      ]
    },
    support: {
      title: "Growth & Support",
      desc: "Monthly support, speed, security, and conversion improvements — stable operations.",
      bullets: [
        "Fixes + small features",
        "Performance & speed",
        "Security checks",
        "Reports + roadmap"
      ],
      details: [
        { h: "Support", items: ["Bug fixes", "Content updates", "Small features", "Priority queue"] },
        { h: "Performance", items: ["Speed audits", "Image optimization", "Core Web Vitals", "Caching"] },
        { h: "Security", items: ["Basic hardening", "Updates", "Backups", "Monitoring"] },
        { h: "Growth", items: ["Analytics", "Conversion improvements", "A/B ideas", "Monthly report"] },
      ]
    },
  };

  let activeKey = "web";

  function setActive(key){
    const data = content[key];
    if (!data) return;
    activeKey = key;

    panelBadge.textContent = data.title;
    panelTitle.textContent = data.title;
    panelDesc.textContent  = data.desc;

    panelBullets.innerHTML = "";
    data.bullets.forEach((b) => {
      const li = document.createElement("li");
      li.textContent = b;
      panelBullets.appendChild(li);
    });

    if (panelDetailsLink) panelDetailsLink.href = "services.html?cat=" + key;

    stack.querySelectorAll(".svc-item").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.key === key);
    });
  }

  // Left titles click → update panel
  stack.querySelectorAll(".svc-item").forEach(btn => {
    btn.addEventListener("click", () => setActive(btn.dataset.key));
    btn.addEventListener("mouseenter", () => setActive(btn.dataset.key));
    btn.addEventListener("focus", () => setActive(btn.dataset.key));
  });

  setActive("web");
}

  /* =========================
     LocalStorage “DB”
     ========================= */
  const LS = {
    get(key, fallback){
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch { return fallback; }
    },
    set(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  };
  const DB_KEYS = { users:"deweb_users", session:"deweb_session", orders:"deweb_orders", activity:"deweb_activity", marketplaceProducts:"deweb_marketplace_products" };

  function getSession(){ return LS.get(DB_KEYS.session, null); }
  function setSession(s){ LS.set(DB_KEYS.session, s); }
  function clearSession(){ localStorage.removeItem(DB_KEYS.session); }

  function getUsers(){ return LS.get(DB_KEYS.users, []); }
  function setUsers(u){ LS.set(DB_KEYS.users, u); }
  function getMarketplaceProducts(){ return LS.get(DB_KEYS.marketplaceProducts, []); }

  function getActivity(){ return LS.get(DB_KEYS.activity, {}); }
  function setActivity(a){ LS.set(DB_KEYS.activity, a); }
  function pushActivity(userId, entry){
    const a = getActivity();
    if (!a[userId]) a[userId] = [];
    a[userId].unshift({ at: new Date().toISOString(), ...entry });
    a[userId] = a[userId].slice(0, 20);
    setActivity(a);
  }

  function getOrders(){ return LS.get(DB_KEYS.orders, []); }
  function setOrders(o){ LS.set(DB_KEYS.orders, o); }

  function uid(){ return Math.random().toString(16).slice(2) + Date.now().toString(16); }

  function findMe(){
    const s = getSession();
    if (!s) return null;
    return getUsers().find(u => u.id === s.userId) || null;
  }

  /* =========================
     Orders: create inquiry
     ========================= */
  document.getElementById("orderForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const service = document.getElementById("orderService").value;
    const budget = document.getElementById("orderBudget").value;
    const deadline = document.getElementById("orderDeadline").value.trim();
    const details = document.getElementById("orderDetails").value.trim();
    const name = document.getElementById("orderName").value.trim();
    const email = document.getElementById("orderEmail").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const pay = document.getElementById("orderPay").value;

    if (!details || !email) return alert("Please fill details + email.");

    try {
      await window.DEWEB_API.Inquiries.create({
        service,
        budget,
        deadline,
        details,
        clientEmail: email,
        clientName: name || "Client",
        phone,
        pay,
        source: "index-order"
      });
      alert("Inquiry sent! Sign in to track it in your dashboard.");
      e.target.reset();
      await renderOpenOrders();
      renderMarketplace();
    } catch (err) {
      alert(err.message || "Could not send inquiry.");
    }
  });

  /* =========================
     Dashboard render
     ========================= */
  function refreshDashboard(){
    if (!document.getElementById("accountModal")) return; // Account is on account.html only
    const me = findMe();

    const dashTab = document.getElementById("dashTab");
    const hello = document.getElementById("dashHello");
    const role = document.getElementById("dashRole");

    const clientDash = document.getElementById("clientDash");
    const devDash = document.getElementById("devDash");

    if (!me){
      if (dashTab) dashTab.style.display = "none";
      if (clientDash) clientDash.style.display = "none";
      if (devDash) devDash.style.display = "none";
      return;
    }

    if (dashTab) dashTab.style.display = "inline-flex";
    if (hello) hello.textContent = `Hello, ${me.name}`;
    if (role) role.textContent = `Role: ${me.role}`;

    // Security: connected providers
    const linked = me.linkedProviders || [];
    const badgeGoogle = document.getElementById("badgeGoogle");
    const badgeApple = document.getElementById("badgeApple");
    const badgeFb = document.getElementById("badgeFb");
    if (badgeGoogle) badgeGoogle.style.display = linked.includes("google") ? "inline-block" : "none";
    if (badgeApple) badgeApple.style.display = linked.includes("apple") ? "inline-block" : "none";
    if (badgeFb) badgeFb.style.display = linked.includes("fb") ? "inline-block" : "none";

    // Activity log preview
    const activity = getActivity()[me.id] || [];
    const preview = document.getElementById("activityLogPreview");
    const dict = I18N[currentLang] || I18N.en;
    const signedInWith = dict.acc?.signedInWith || "Signed in with";
    if (preview) {
      if (activity.length === 0) preview.innerHTML = `<span class="muted">No recent activity.</span>`;
      else preview.innerHTML = activity.slice(0, 3).map(e => {
        const d = e.at ? new Date(e.at).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : "";
        const p = e.provider ? ` ${signedInWith} ${e.provider}` : "";
        return `<div class="activity-entry">${p || "Sign in"} — ${d}</div>`;
      }).join("");
    }

    if (me.role === "client"){
      if (clientDash) clientDash.style.display = "block";
      if (devDash) devDash.style.display = "none";

      const orders = getOrders().filter(o => o.clientId === me.id || o.clientEmail === me.email);
      const statsEl = document.getElementById("clientDashStats");
      const tbody = document.getElementById("clientOrdersList");
      const fallback = document.getElementById("clientOrdersListFallback");
      const tableWrap = document.querySelector(".dash-pro-table-wrap");

      if (statsEl) {
        const inProgress = orders.filter(o => o.stage === "In Progress" || o.stage === "Quote").length;
        const delivered = orders.filter(o => o.stage === "Delivered" || o.stage === "Done").length;
        const dict = I18N[currentLang] || I18N.en;
        const ordersLabel = dict.dash?.clientOrders || "My Orders";
        statsEl.innerHTML = `
          <div class="dash-stat-item"><span class="dash-stat-value">${orders.length}</span><span class="dash-stat-label">${ordersLabel}</span></div>
          <div class="dash-stat-item"><span class="dash-stat-value">${inProgress}</span><span class="dash-stat-label">In progress</span></div>
          <div class="dash-stat-item"><span class="dash-stat-value">${delivered}</span><span class="dash-stat-label">Delivered</span></div>
        `;
      }

      if (tbody) {
        if (orders.length === 0) {
          if (tableWrap) tableWrap.style.display = "none";
          if (fallback) { fallback.style.display = "block"; fallback.innerHTML = `<div class="dash-item">No orders yet.</div>`; }
          tbody.innerHTML = "";
        } else {
          if (tableWrap) tableWrap.style.display = "block";
          if (fallback) fallback.style.display = "none";
          tbody.innerHTML = orders.map(o => `
            <tr>
              <td><strong>${escapeHtml(o.id)}</strong></td>
              <td>${escapeHtml(o.service)}</td>
              <td>${escapeHtml(o.budget)}</td>
              <td><span class="badge badge-stage">${escapeHtml(o.stage)}</span></td>
            </tr>
          `).join("");
        }
      }
    }

    if (me.role === "dev"){
      if (clientDash) clientDash.style.display = "none";
      if (devDash) devDash.style.display = "block";

      document.getElementById("devProfileBox").innerHTML = `
        <div class="dash-item">
          <div><b>${me.name}</b></div>
          <div style="color:rgba(168,178,209,.95);margin-top:6px;line-height:1.6">
            Skills: ${escapeHtml(me.skills || "—")}<br/>
            Portfolio: ${
              me.portfolio
                ? `<a href="${escapeAttr(me.portfolio)}" target="_blank" style="color:var(--accent-cyan)">open</a>`
                : "—"
            }
          </div>
        </div>
      `;

      const all = getOrders();
      const newOrders = all.filter(o => !o.assignedDevId && o.stage === "Inquiry");
      const doneOrders = all.filter(o => o.assignedDevId === me.id && (o.stage === "Delivered" || o.stage === "Done"));

      const newBox = document.getElementById("devNewOrders");
      newBox.innerHTML = newOrders.length ? "" : `<div class="dash-item">No new orders.</div>`;
      newOrders.forEach(o => {
        const el = document.createElement("div");
        el.className = "dash-item";
        el.innerHTML = `
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <b>${o.id}</b>
            <span class="badge">${o.service}</span>
          </div>
          <div style="margin-top:8px;color:rgba(168,178,209,.95)">
            Budget: ${o.budget} • ${o.deadline || "no deadline"}
          </div>
          <button class="cta-btn primary" style="margin-top:10px" data-claim="${o.id}">Claim</button>
        `;
        newBox.appendChild(el);
      });

      newBox.querySelectorAll("[data-claim]").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.claim;
          if (!window.DEWEB_API?.isLoggedIn()) {
            alert("Sign in as a developer to claim orders.");
            window.location.href = "account.html";
            return;
          }
          try {
            await window.DEWEB_API.Orders.claim(id);
            refreshDashboard();
            await renderOpenOrders();
          } catch (err) {
            alert(err.message || "Could not claim order.");
          }
        });
      });

      const doneBox = document.getElementById("devDoneOrders");
      doneBox.innerHTML = doneOrders.length ? "" : `<div class="dash-item">No completed orders.</div>`;
      doneOrders.forEach(o => {
        const el = document.createElement("div");
        el.className = "dash-item";
        el.innerHTML = `<b>${o.id}</b> <span class="badge">${o.stage}</span>`;
        doneBox.appendChild(el);
      });
    }
  }

  /* =========================
     Marketplace (profiles)
     ========================= */
  function ensureSeedProfiles(){
    const users = getUsers();
    const hasDev = users.some(u => u.role === "dev");
    if (hasDev) return;

    users.push(
      { id: uid(), role:"dev", name:"Aram H.", email:"aram@example.com", pass:"1234", skills:"Frontend (React), UI, Landing pages", portfolio:"https://github.com/" },
      { id: uid(), role:"dev", name:"Mariam S.", email:"mariam@example.com", pass:"1234", skills:"Design (Figma), Branding, UI Kits", portfolio:"https://www.behance.net/" },
      { id: uid(), role:"dev", name:"Gor K.", email:"gor@example.com", pass:"1234", skills:"Bots (Telegram), Node.js, Integrations", portfolio:"https://github.com/" }
    );
    setUsers(users);
  }

  let marketDevelopers = null;
  let marketProducts = null;

  async function loadMarketData() {
    const API = window.DEWEB_API;
    if (!API) return;
    try {
      const [devRes, prodRes] = await Promise.all([
        API.Users.developers(),
        API.Products.list()
      ]);
      marketDevelopers = devRes.users || [];
      marketProducts = prodRes.products || [];
    } catch (_) {
      marketDevelopers = null;
      marketProducts = null;
    }
  }

  function renderMarketplace(){
    const grid = document.getElementById("marketGrid");
    if (!grid) return;

    const q = (document.getElementById("marketSearch")?.value || "").trim().toLowerCase();
    const role = document.getElementById("marketRole")?.value || "all";
    const skill = document.getElementById("marketSkill")?.value || "all";

    const products = marketProducts || getMarketplaceProducts();
    const users = (marketDevelopers || getUsers().filter(u => u.role === "dev" || u.accountMode === "seller"));
    let list = users;

    if (role === "dev") list = users;
    if (q) list = list.filter(u => (u.name + " " + (u.skills||"")).toLowerCase().includes(q));

    if (skill !== "all"){
      const map = {
        frontend:["frontend","react","ui"],
        backend:["backend","api","server","node","python"],
        bots:["bot","telegram","automation"],
        design:["design","figma","brand","logo","ui"],
        seo:["seo","performance","speed"]
      };
      const keys = map[skill] || [skill];
      list = list.filter(u => keys.some(k => (u.skills||"").toLowerCase().includes(k)));
    }

    grid.innerHTML = "";
    if (!list.length){
      grid.innerHTML = `<div class="dash-item">No profiles found.</div>`;
      return;
    }

    list.forEach(u => {
      const card = document.createElement("div");
      card.className = "profile-card";
      const initials = (u.name || "D").split(" ").map(x => x[0]).slice(0,2).join("").toUpperCase();
      const sellerProducts = products.filter(p => p.sellerId === u.id);
      const sellerInfo = u.sellerInfo || {};
      const productHtml = sellerProducts.length ? `
        <div class="profile-products">
          ${sellerProducts.slice(0, 3).map(p => `
            <div class="profile-product">
              <b>${escapeHtml(p.title || "Product")}</b>
              <span>${escapeHtml(p.category || "Service")} • ${escapeHtml(p.price || 0)} DEWEB</span>
              <small>${escapeHtml(p.views || 0)} views • ${escapeHtml(p.clicks || 0)} clicks • ${escapeHtml(p.reviews || 0)} reviews</small>
            </div>
          `).join("")}
        </div>
      ` : "";

      card.innerHTML = `
        <div class="profile-head">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar">${escapeHtml(initials)}</div>
            <div>
              <div class="profile-name">${escapeHtml(u.name)}</div>
              <div style="margin-top:4px"><span class="badge">Seller</span></div>
            </div>
          </div>
        </div>

        <div class="profile-skills">${escapeHtml(u.skills || sellerInfo.productName || "—")}</div>
        ${sellerInfo.announcement ? `<div class="profile-skills">${escapeHtml(sellerInfo.announcement)}</div>` : ""}
        ${productHtml}

        <div class="profile-actions">
          ${
            u.portfolio
              ? `<a class="small-btn" href="${escapeAttr(u.portfolio)}" target="_blank">Portfolio</a>`
              : `<button class="small-btn" type="button" disabled style="opacity:.6;cursor:not-allowed">No portfolio</button>`
          }
          <button class="small-btn" type="button" data-hire="${u.id}">Hire</button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll("[data-hire]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sellerId = btn.dataset.hire;
        const product = products.find(p => p.sellerId === sellerId);
        const price = product ? `$${product.price}` : "on request";
        const title = product?.title || "this service";
        if (confirm(`Contact us to discuss "${title}" (${price})?`)) {
          window.location.href = "/en/contact";
        }
      });
    });
  }

  /* =========================
     Open orders list
     ========================= */
  async function renderOpenOrders(){
    const box = document.getElementById("openOrdersList");
    if (!box) return;

    let open = [];
    try {
      const data = await window.DEWEB_API.Orders.open();
      open = data.orders || [];
    } catch {
      open = getOrders().filter(o => o.stage === "Inquiry" && !o.assignedDevId);
    }
    box.innerHTML = open.length ? "" : `<div class="dash-item">No open orders yet. Create one.</div>`;

    open.forEach(o => {
      const el = document.createElement("div");
      el.className = "dash-item";
      el.innerHTML = `
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <b>${escapeHtml(o.id)}</b>
          <span class="badge">${escapeHtml(o.service || "Inquiry")}</span>
        </div>
        <div style="margin-top:8px;color:rgba(168,178,209,.95)">
          Budget: ${escapeHtml(o.budget || "—")} • ${escapeHtml(o.deadline || "no deadline")}
        </div>
        ${window.DEWEB_API?.isLoggedIn() ? `<button class="cta-btn primary" style="margin-top:10px" data-claim-open="${escapeAttr(o.id)}">Claim</button>` : ""}
      `;
      box.appendChild(el);
    });

    box.querySelectorAll("[data-claim-open]").forEach(btn => {
      btn.addEventListener("click", async () => {
        try {
          await window.DEWEB_API.Orders.claim(btn.dataset.claimOpen);
          await renderOpenOrders();
        } catch (err) {
          alert(err.message || "Could not claim order.");
        }
      });
    });
  }

  /* =========================
     About switcher (slide 6)
     ========================= */
  function initAboutSwitcher(){
    const aboutText = document.getElementById("aboutText");
    const cards = document.querySelectorAll(".service-card");
    if (!aboutText || !cards.length) return;

    let activeAboutKey = "web";

    function setActive(card){
      cards.forEach(c => c.classList.remove("is-active"));
      card.classList.add("is-active");
    }

    function renderDetail(key){
      const aboutDict = (I18N[currentLang] || I18N.en).about || I18N.en.about;
      const details = aboutDict.details || I18N.en.about.details;
      const item = details[key] || details.web;
      return `
        <div class="about-detail">
          <span class="section-kicker">${aboutDict.detailKicker || "Selected section"}</span>
          <h2>${item.title}</h2>
          <p>${item.intro}</p>
          <ul>
            ${item.points.map(point => `<li>${point}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    function setText(key){
      aboutText.classList.add("is-fading");
      setTimeout(() => {
        aboutText.innerHTML = renderDetail(key);
        aboutText.classList.remove("is-fading");
      }, 160);
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.dataset.key;
        activeAboutKey = key;
        setActive(card);
        setText(key);
      });
    });
    rerenderAboutDetail = () => {
      aboutText.innerHTML = renderDetail(activeAboutKey);
    };
    rerenderAboutDetail();
  }

  /* =========================
     Marketplace filter events
     ========================= */
  function bindMarketFilters(){
    ["marketSearch","marketRole","marketSkill"].forEach(id => {
      document.getElementById(id)?.addEventListener("input", renderMarketplace);
      document.getElementById(id)?.addEventListener("change", renderMarketplace);
    });
  }

  /* =========================
     Helpers: safe HTML
     ========================= */
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (m) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[m]));
  }
  function escapeAttr(s){
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  /* =========================
     INIT
     ========================= */
  // ⚠️ Put your full RU/HY dictionaries here to keep i18n working (copy from your file):
  // window.__I18N_RU__ = { ...your RU object... };
  // window.__I18N_HY__ = { ...your HY object... };

  applyI18n(currentLang);
  renderLangUI();
  initServicesSection();

  createPagination();
  ensureSeedProfiles();
  bindMarketFilters();
  initAboutSwitcher();

  void loadMarketData().then(() => renderMarketplace());
  void renderOpenOrders();
  refreshDashboard();

  if (window.location.hash === "#account") window.location.href = "account.html";

  goToSlide(0);
});
