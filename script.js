/* =========================================================
   Flarewich — v2 script
   Русский текст берётся прямо из HTML, тут только переводы.
   Чтобы поменять текст на RU — правь index.html.
   ========================================================= */
document.documentElement.classList.remove("no-js");

const i18n = {
  uk: {
    _title: "Flarewich — сайти, графіка та відео для бізнесу",
    _desc: "Сайти, обкладинки та монтаж відео для малого бізнесу й блогерів — під ключ. Ціни від 120 €, безкоштовний міні-аудит.",
    nav_services: "Послуги", nav_work: "Роботи", nav_pricing: "Ціни", nav_process: "Як працюю", nav_faq: "FAQ",
    cta_short: "Написати",
    hero_eyebrow: "Беру нові проєкти",
    hero_title: "Сайти, графіка та&nbsp;відео, які <em>приводять клієнтів</em>",
    hero_lead: "Роблю під ключ для малого бізнесу, майстрів і блогерів: сайт, обкладинки для соцмереж і промо-ролик — усе в одних руках і в одному стилі.",
    cta_main: "Обговорити проєкт", cta_prices: "Дивитися ціни",
    fact_1: "лендинг під ключ", fact_2_num: "5–10 днів", fact_2: "від ідеї до запуску", fact_3: "сайт + графіка + відео", fact_3_num: "3 в 1",
    tk_1: "Лендинги", tk_2: "Сайти-візитки", tk_3: "Обкладинки та прев'ю", tk_4: "Монтаж Reels / Shorts", tk_5: "Ретуш фото", tk_6: "Оформлення каналів", tk_7: "3D-моделі",
    services_title: "Чим можу допомогти", services_sub: "Беру задачу повністю або окрему частину — як вам зручніше.",
    s1_title: "Сайти та лендинги",
    s1_text: "Сайт, на якому клієнту зрозуміло, що ви робите, скільки це коштує і як записатися. Адаптив під телефони, швидке завантаження, базове SEO, підключення домену.",
    s1_li1: "Лендинг / сайт-візитка", s1_li2: "Багатосторінковий сайт", s1_li3: "Редизайн старого сайту",
    from: "від",
    s2_title: "Графіка та Photoshop", s2_text: "Обкладинки, прев'ю для YouTube, банери, оформлення Instagram і каналів. Ретуш, кольорокорекція, видалення зайвого з фото.",
    s3_title: "Монтаж відео", s3_text: "Reels, Shorts, TikTok і ролики для YouTube: динамічна нарізка, субтитри, музика, колір. Промо-ролики для бізнесу.",
    s4_title: "3D-моделі", s4_text: "Моделі, пропси та прості сцени, 3D-написи й рендери для прев'ю, банерів і презентацій.",
    work_title: "Роботи", work_sub: "Живі проєкти — можна відкрити й потицяти.",
    open_site: "Відкрити сайт ↗", open_app: "Відкрити застосунок ↗", task: "Задача", done: "Що зробив",
    c1_tag: "Сайт для б'юті-майстра",
    c1_task: "Майстрині перманентного макіяжу потрібен був сайт, де клієнтки одразу бачать послуги, роботи «до/після» і записуються у кілька кліків.",
    c1_done: "Дизайн і верстка з нуля: блок послуг, галерея робіт, швидкий зв'язок через Instagram, WhatsApp і Telegram. Повністю адаптований під телефон.",
    c2_tag: "Вебзастосунок",
    c2_task: "Зробити зручну платформу для вивчення німецької: уроки, словник, практика й відстеження прогресу.",
    c2_done: "Спроєктував інтерфейс і зібрав застосунок на React. Працює як PWA — можна встановити на телефон як звичайний застосунок.",
    gallery_title: "Графіка, відео та 3D", gallery_more: "Більше на YouTube ↗",
    g1: "Прев'ю для YouTube", g2: "Монтаж ролика — дивитися ↗", g3: "Обкладинки для стрімів", g4: "Шапка каналу", g5: "3D-напис, рендер",
    audit_badge: "Безкоштовно", audit_title: "Міні-аудит вашого сайту або Instagram",
    audit_text: "Надішліть посилання — протягом 24 годин відповім, які 3 речі заважають вам отримувати заявки і як це виправити. Без зобов'язань щось замовляти.",
    audit_cta: "Надіслати посилання",
    pricing_title: "Ціни", pricing_sub: "Підсумкова вартість залежить від обсягу — точну цифру назву після короткої розмови. Без прихованих доплат.",
    pl_cta: "Хочу цей", pl_popular: "Обирають найчастіше",
    pl1_name: "Старт", pl1_for: "Щоб з'явитися в інтернеті й почати отримувати заявки.",
    pl1_1: "Лендинг до 5 блоків", pl1_2: "Адаптив під телефони", pl1_3: "Кнопки зв'язку: Telegram, WhatsApp, дзвінок", pl1_4: "Публікація та підключення домену",
    pl2_name: "Бізнес", pl2_for: "Сайт і соцмережі в одному стилі — виглядаєте як бренд.",
    pl2_1: "Усе зі «Старт»", pl2_2: "До 8 блоків або 3 сторінки", pl2_3: "Оформлення Instagram: аватар, 5 обкладинок хайлайтів, шаблон поста", pl2_4: "Базове SEO та картка для Google",
    pl3_name: "Під ключ", pl3_for: "Повний запуск: сайт, графіка й відео для реклами.",
    pl3_1: "Усе з «Бізнес»", pl3_2: "Багатосторінковий сайт", pl3_3: "Промо-ролик 15–30 сек для Reels / TikTok", pl3_4: "Місяць безкоштовних дрібних правок",
    ac_title: "Окремі послуги",
    ac_1: "Прев'ю / обкладинка для YouTube", ac_2: "Ретуш фото", ac_3: "Монтаж Reels / Shorts", ac_4: "Монтаж ролика для YouTube", ac_5: "Шапка та оформлення каналу", ac_6: "3D-модель / рендер",
    process_title: "Як проходить робота", process_sub: "Без сюрпризів: на кожному етапі знаєте, що відбувається і що буде далі.",
    st1_t: "Дзвінок або листування", st1_p: "Розбираємося, що потрібно і для кого. Немає ТЗ — допоможу скласти. Називаю ціну й термін.", st1_time: "День 1",
    st2_t: "Структура та дизайн", st2_p: "Показую макет. Вносимо правки, поки вам не сподобається. Після погодження — передоплата 50%.", st2_time: "2–3 дні",
    st3_t: "Розробка", st3_p: "Збираю сайт, перевіряю на телефонах і комп'ютерах. Надсилаю посилання, щоб ви подивилися наживо.", st3_time: "3–7 днів",
    st4_t: "Запуск", st4_p: "Фінальні правки, підключаю домен, публікую. Решта 50% — тільки після здачі.", st4_time: "Фініш",
    about_title: "Привіт, я Влад",
    about_p1: "Full-stack розробник і дизайнер. Роблю сайти, графіку й монтаж — тож вам не треба шукати трьох різних людей і пояснювати кожному, який у вас стиль.",
    about_p2: "Мені важливо, щоб сайт не просто гарно виглядав, а працював: був зрозумілим з першого екрана, швидко вантажився на телефоні й вів людину до кнопки «Написати».",
    ab_1: "Відповідаю того ж дня", ab_2: "Тримаю в курсі на кожному етапі", ab_3: "Працюю за домовленістю та передоплатою 50/50",
    faq_title: "Часті питання",
    fq1: "У мене немає текстів і фото. Що робити?", fa1: "Нічого страшного. Допоможу скласти тексти за вашими відповідями на кілька питань, підберу якісні фото або оброблю ваші.",
    fq2: "Скільки коштують домен і хостинг?", fa2: "Хостинг для простого сайту зазвичай безкоштовний. Домен (.com, .de тощо) — приблизно 10–15 € на рік, оплачується окремо й оформлюється на вас.",
    fq3: "Чи можна потім самому змінювати сайт?", fa3: "Так. Сайт передається вам повністю. Дрібні правки після запуску роблю швидко — за домовленістю або в межах пакета.",
    fq4: "Потрібно терміново, за 1–2 дні. Візьмеш?", fa4: "Зазвичай на хороший результат потрібно від 5 днів. Якщо задача невелика (обкладинка, монтаж короткого ролика) — напишіть, постараюся вписати.",
    fq5: "Як оплатити?", fa5: "50% після погодження дизайну, 50% після здачі роботи. Спосіб оплати обговоримо — підберемо зручний.",
    final_title: "Розкажіть про&nbsp;задачу — відповім сьогодні",
    final_text: "Напишіть кілька рядків: що за бізнес і що потрібно. Відповім з ідеями, ціною та термінами.",
    final_cta: "Написати в Telegram", sticky_cta: "Обговорити проєкт у Telegram",
    c7_tag: "Верстка з Figma",
    c7_badge: "Навчальний проєкт",
    c7_task: "Перенести дизайн інтернет-магазину рослин із Figma в живий сайт: скляні картки, рослини, що «виходять» за рамки, темна зелена гама.",
    c7_done: "Зверстав макет піксель у піксель і оживив його: каруселі, робочий кошик із лічильником, пошук рослин, випадне меню, паралакс, 3D-нахил карток і повна адаптація під телефон.",
    c8_task: "Перетворити темний макет фітнес-платформи з Figma на живий лендинг: десять секцій, червоно-помаранчеві градієнти, тарифи, тренери, відгуки та блог.",
    c9_task: "Оживити три статичні кадри з Figma для бренду енергетика: величезний логотип із банкою, блок «Since 2002» і лінійку з п'яти смаків.",
    c9_done: "Зібрав із кадрів одну сцену на прокрутці (GSAP ScrollTrigger): банка встає, крутиться й змінює смак, а разом із нею перефарбовується весь сайт. Додав спалах блискавки, відблиск на банці, іскри на фоні, стрічку зі швидкістю від скролу, вітрину з обертанням банок і кошик.",
    c8_done: "Зверстав макет, вивантажив із нього всі зображення й оживив: паралакс героя за мишкою, лічильники цифр, 3D-нахил карток, перемикач тарифів місяць/рік, слайдери тренерів та інструментів, зміна відгуків, вкладки реєстрації, FAQ-акордеон і адаптив під телефон.",
    c6_tag: "Редизайн сайту б'юті-студії",
    c6_task: "У студії манікюру у Віттенберзі сайт на шаблоні з помилками: «Ms_Chi Nails in Ms_Chi Nails», порожні розділи, застаріла акція і три різні формати телефону.",
    c6_done: "Елегантний дизайн у кольорах їхньої вивіски, зрозумілі 6 послуг, повний прайс із цінами з їхнього онлайн-запису та інтерактивний вибір кольору лаку: нігті в прев'ю перефарбовуються, а звідти одразу можна записатися.",
    c5_tag: "Редизайн сайту автосервісу",
    c5_badge: "Концепт, не замовлення",
    c5_task: "У майстерні у Віттенберзі старий сайт: меню з картинок, телефон не можна натиснути, на мобільному все обрізано. Треба було показати, як він може виглядати сьогодні.",
    c5_done: "Строгий сучасний дизайн на реальних даних: дзвінок в один клік, статус «зараз відчинено», зрозумілі послуги та калькулятор техогляду (HU) за наліпкою на номері. Повністю адаптований під телефон.",
    chip_mobile: "Mobile-first",
    open_concept: "Відкрити концепт ↗",
    c4_tag: "Дизайн-концепт для кафе",
    concept_badge: "Концепт",
    c4_task: "Показати, яким може бути сайт для кафе чи пекарні: яскравим, з характером, таким, щоб його хотілося гортати й запам'ятовували.",
    c4_done: "Придумав бренд для вигаданої пончикової в Берліні, намалював усі пончики кодом і зробив анімації: меню-картки, що відлітають при прокручуванні, текст, що загоряється, пончик, який можна розкрутити мишкою.",
    chip_anim: "Анімації",
    edu_lbl: "Освіта",
    edu_ok: "Завершено",
    edu_text: "Онлайн-програма: інтерфейси, серверна частина, інженерні практики та деплой — 580 навчальних одиниць.",
    hint3d: "WebGL · Потягни, щоб покрутити · Клікни по центру",
    sat_web: "Сайти",
    sat_3d: "3D",
    sat_video: "Монтаж",
    sat_photo: "Photoshop",
    watch: "Дивитися ролик",
    ed_props: "Властивості кліпу",
    ed_type: "Тип",
    ed_tool: "Інструмент",
    ed_hint: "Тягни плейхед або клікай по кліпах ↓",
    xray_btn: "Режим розробника",
    egg_hint: "· psst… набери на клавіатурі «flare» або 5 разів тапни по лого",
    cur_open: "Відкрити",
    cur_drag: "Крути",
    cur_play: "Скраб",
    cur_click: "Клік",
    xray_on: "Режим розробника: так зверстаний цей сайт 👀",
    egg_toast: "🔥 Ти знайшов пасхалку! Напиши мені слово FLARE — отримаєш −10% на перше замовлення",
  },

  en: {
    _title: "Flarewich — websites, graphics & video for business",
    _desc: "Websites, thumbnails and video editing for small businesses and creators — turnkey. Prices from €120, free mini-audit.",
    nav_services: "Services", nav_work: "Work", nav_pricing: "Pricing", nav_process: "Process", nav_faq: "FAQ",
    cta_short: "Contact",
    hero_eyebrow: "Taking on new projects",
    hero_title: "Websites, graphics &amp;&nbsp;video that <em>bring you clients</em>",
    hero_lead: "Turnkey work for small businesses, beauty pros and creators: a website, social media visuals and a promo video — one person, one consistent style.",
    cta_main: "Discuss your project", cta_prices: "See pricing",
    fact_1: "turnkey landing page", fact_2_num: "5–10 days", fact_2: "from idea to launch", fact_3: "web + graphics + video", fact_3_num: "3 in 1",
    tk_1: "Landing pages", tk_2: "Business websites", tk_3: "Thumbnails & covers", tk_4: "Reels / Shorts editing", tk_5: "Photo retouching", tk_6: "Channel branding", tk_7: "3D models",
    services_title: "How I can help", services_sub: "I take on the whole job or just one part — whatever works for you.",
    s1_title: "Websites & landing pages",
    s1_text: "A site that instantly tells visitors what you do, what it costs and how to book. Mobile-first, fast loading, basic SEO, domain setup.",
    s1_li1: "Landing page / business card site", s1_li2: "Multi-page website", s1_li3: "Redesign of an old site",
    from: "from",
    s2_title: "Graphics & Photoshop", s2_text: "Covers, YouTube thumbnails, banners, Instagram and channel branding. Retouching, color grading, object removal.",
    s3_title: "Video editing", s3_text: "Reels, Shorts, TikTok and YouTube videos: punchy cuts, subtitles, music, color. Promo videos for businesses.",
    s4_title: "3D models", s4_text: "Models, props and simple scenes, 3D lettering and renders for thumbnails, banners and presentations.",
    work_title: "Work", work_sub: "Live projects — go ahead and click around.",
    open_site: "Open site ↗", open_app: "Open app ↗", task: "Brief", done: "What I did",
    c1_tag: "Website for a beauty pro",
    c1_task: "A permanent make-up artist needed a site where clients instantly see services and before/after results, and can book in a couple of taps.",
    c1_done: "Design and build from scratch: services block, work gallery, quick contact via Instagram, WhatsApp and Telegram. Fully mobile-optimized.",
    c2_tag: "Web app",
    c2_task: "Build a friendly platform for learning German: lessons, a dictionary, practice and progress tracking.",
    c2_done: "Designed the interface and built the app in React. Works as a PWA — installable on a phone like a regular app.",
    gallery_title: "Graphics, video & 3D", gallery_more: "More on YouTube ↗",
    g1: "YouTube thumbnail", g2: "Video edit — watch ↗", g3: "Stream covers", g4: "Channel banner", g5: "3D lettering, render",
    audit_badge: "Free", audit_title: "Mini-audit of your website or Instagram",
    audit_text: "Send me a link — within 24 hours I'll tell you the 3 things that stop you from getting leads and how to fix them. No obligation to order anything.",
    audit_cta: "Send a link",
    pricing_title: "Pricing", pricing_sub: "Final cost depends on scope — I'll give you an exact number after a short chat. No hidden fees.",
    pl_cta: "I want this", pl_popular: "Most popular",
    pl1_name: "Start", pl1_for: "Get online and start receiving enquiries.",
    pl1_1: "Landing page, up to 5 sections", pl1_2: "Mobile-friendly", pl1_3: "Contact buttons: Telegram, WhatsApp, call", pl1_4: "Publishing and domain setup",
    pl2_name: "Business", pl2_for: "Website and socials in one style — look like a brand.",
    pl2_1: "Everything in Start", pl2_2: "Up to 8 sections or 3 pages", pl2_3: "Instagram branding: avatar, 5 highlight covers, post template", pl2_4: "Basic SEO and Google business profile",
    pl3_name: "Turnkey", pl3_for: "Full launch: website, graphics and an ad video.",
    pl3_1: "Everything in Business", pl3_2: "Multi-page website", pl3_3: "15–30 s promo video for Reels / TikTok", pl3_4: "One month of free small edits",
    ac_title: "Individual services",
    ac_1: "YouTube thumbnail / cover", ac_2: "Photo retouching", ac_3: "Reels / Shorts editing", ac_4: "YouTube video editing", ac_5: "Channel banner & branding", ac_6: "3D model / render",
    process_title: "How it works", process_sub: "No surprises: at every stage you know what's happening and what comes next.",
    st1_t: "Call or chat", st1_p: "We figure out what you need and who it's for. No brief? I'll help write one. You get a price and a deadline.", st1_time: "Day 1",
    st2_t: "Structure & design", st2_p: "I show you a mock-up and we refine it until you love it. After approval — 50% prepayment.", st2_time: "2–3 days",
    st3_t: "Development", st3_p: "I build the site and test it on phones and desktops. You get a live link to check it.", st3_time: "3–7 days",
    st4_t: "Launch", st4_p: "Final tweaks, domain setup, go live. The remaining 50% only after delivery.", st4_time: "Done",
    about_title: "Hi, I'm Vlad",
    about_p1: "Full-stack developer and designer. I do websites, graphics and video editing — so you don't have to find three different people and explain your style to each of them.",
    about_p2: "I care that a site doesn't just look good but works: it's clear from the first screen, loads fast on a phone and leads people to the “Contact” button.",
    ab_1: "I reply the same day", ab_2: "You're kept in the loop at every stage", ab_3: "Clear agreement and 50/50 payment",
    faq_title: "FAQ",
    fq1: "I don't have texts or photos. What now?", fa1: "No problem. I'll help write the copy from your answers to a few questions, find quality photos or retouch yours.",
    fq2: "How much do a domain and hosting cost?", fa2: "Hosting for a simple site is usually free. A domain (.com, .de etc.) is roughly €10–15 a year, paid separately and registered in your name.",
    fq3: "Can I edit the site myself later?", fa3: "Yes. You get the site in full. Small edits after launch I do quickly — by agreement or within your package.",
    fq4: "I need it urgently, in 1–2 days. Can you?", fa4: "A good result usually takes 5+ days. For small tasks (a thumbnail, a short video edit) — message me and I'll try to fit it in.",
    fq5: "How do I pay?", fa5: "50% after the design is approved, 50% after delivery. We'll pick a payment method that suits you.",
    final_title: "Tell me about your project — I'll reply today",
    final_text: "Write a couple of lines: what your business is and what you need. I'll reply with ideas, a price and a timeline.",
    final_cta: "Message on Telegram", sticky_cta: "Discuss your project on Telegram",
    c7_tag: "Figma to code",
    c7_badge: "Practice project",
    c7_task: "Turn a plant-shop design from Figma into a live website: glass cards, plants breaking out of their frames, a dark green palette.",
    c7_done: "Built it pixel-perfect and brought it to life: carousels, a working cart counter, plant search, dropdown menu, parallax, 3D card tilt and a fully responsive mobile layout.",
    c8_task: "Turn a dark fitness-platform design from Figma into a live landing page: ten sections, red-orange gradients, pricing, trainers, reviews and a blog.",
    c9_task: "Bring three static Figma frames for an energy-drink brand to life: a giant logo with the can, a 'Since 2002' block and a five-flavour lineup.",
    c9_done: "Merged the frames into one scroll-driven scene (GSAP ScrollTrigger): the can stands up, spins and switches flavour while the whole site recolours with it. Added a lightning flash, a shine sweep on the can, background sparks, a scroll-speed marquee, a spinning product lineup and a cart.",
    c8_done: "Built the layout, exported every image straight from the Figma file and animated it: mouse parallax in the hero, number counters, 3D card tilt, monthly/yearly pricing toggle, trainer and tool sliders, switchable reviews, sign-up tabs, FAQ accordion and a mobile layout.",
    c6_tag: "Beauty studio website redesign",
    c6_task: "A nail studio in Wittenberg had a template site full of errors: “Ms_Chi Nails in Ms_Chi Nails”, empty sections, an outdated promo and the phone number in three formats.",
    c6_done: "An elegant design in the colors of their shop sign, six clear services, a full price list taken from their booking page and an interactive nail-polish picker: the nails in the preview change color, and you can book right from there.",
    c5_tag: "Car repair shop website redesign",
    c5_badge: "Concept, not commissioned",
    c5_task: "A workshop in Wittenberg had an outdated site: image-based menu, phone number not clickable, broken on mobile. The goal was to show what it could look like today.",
    c5_done: "A clean, professional design built on their real data: one-tap calling, live “open now” status, clear services and an inspection (HU) due-date calculator based on the plate sticker. Fully mobile-optimized.",
    chip_mobile: "Mobile-first",
    open_concept: "Open concept ↗",
    c4_tag: "Design concept for a café",
    concept_badge: "Concept",
    c4_task: "Show what a café or bakery website can be: bold, full of character, fun to scroll and easy to remember.",
    c4_done: "Created a brand for a fictional Berlin donut shop, drew every donut in code and built the animations: menu cards that fly away on scroll, words that light up, a donut you can spin with your mouse.",
    chip_anim: "Animations",
    edu_lbl: "Education",
    edu_ok: "Completed",
    edu_text: "Online program: interfaces, backend, engineering practices and deployment — 580 study units.",
    hint3d: "WebGL · Drag to spin · Click the core",
    sat_web: "Websites",
    sat_3d: "3D",
    sat_video: "Video",
    sat_photo: "Photoshop",
    watch: "Watch video",
    ed_props: "Clip properties",
    ed_type: "Type",
    ed_tool: "Tool",
    ed_hint: "Drag the playhead or click a clip ↓",
    xray_btn: "Developer mode",
    egg_hint: "· psst… type “flare” on your keyboard or tap the logo 5 times",
    cur_open: "Open",
    cur_drag: "Spin",
    cur_play: "Scrub",
    cur_click: "Click",
    xray_on: "Developer mode: this is how the site is built 👀",
    egg_toast: "🔥 You found the easter egg! Send me the word FLARE — get 10% off your first order",
  },

  de: {
    _title: "Flarewich — Websites, Grafik & Video für Unternehmen",
    _desc: "Websites, Thumbnails und Videoschnitt für kleine Unternehmen und Creator — alles aus einer Hand. Ab 120 €, kostenloser Mini-Check.",
    nav_services: "Leistungen", nav_work: "Projekte", nav_pricing: "Preise", nav_process: "Ablauf", nav_faq: "FAQ",
    cta_short: "Kontakt",
    hero_eyebrow: "Nehme neue Projekte an",
    hero_title: "Websites, Grafik &amp;&nbsp;Video, die <em>Kunden bringen</em>",
    hero_lead: "Alles aus einer Hand für kleine Unternehmen, Beauty-Profis und Creator: Website, Social-Media-Grafiken und Promo-Video — in einem einheitlichen Stil.",
    cta_main: "Projekt besprechen", cta_prices: "Preise ansehen",
    fact_1: "Landingpage komplett", fact_2_num: "5–10 Tage", fact_2: "von der Idee bis zum Launch", fact_3: "Web + Grafik + Video", fact_3_num: "3 in 1",
    tk_1: "Landingpages", tk_2: "Firmen-Websites", tk_3: "Thumbnails & Cover", tk_4: "Reels / Shorts Schnitt", tk_5: "Fotoretusche", tk_6: "Kanal-Branding", tk_7: "3D-Modelle",
    services_title: "Wobei ich helfe", services_sub: "Ich übernehme das ganze Projekt oder nur einen Teil — wie es für Sie passt.",
    s1_title: "Websites & Landingpages",
    s1_text: "Eine Website, auf der Besucher sofort sehen, was Sie anbieten, was es kostet und wie man bucht. Mobil optimiert, schnell, Basis-SEO, Domain-Einrichtung.",
    s1_li1: "Landingpage / Visitenkarten-Website", s1_li2: "Mehrseitige Website", s1_li3: "Redesign einer alten Website",
    from: "ab",
    s2_title: "Grafik & Photoshop", s2_text: "Cover, YouTube-Thumbnails, Banner, Instagram- und Kanal-Branding. Retusche, Color Grading, Objektentfernung.",
    s3_title: "Videoschnitt", s3_text: "Reels, Shorts, TikTok und YouTube-Videos: dynamischer Schnitt, Untertitel, Musik, Farbe. Promo-Videos für Unternehmen.",
    s4_title: "3D-Modelle", s4_text: "Modelle, Props und einfache Szenen, 3D-Schriftzüge und Renderings für Thumbnails, Banner und Präsentationen.",
    work_title: "Projekte", work_sub: "Live-Projekte — einfach öffnen und ausprobieren.",
    open_site: "Website öffnen ↗", open_app: "App öffnen ↗", task: "Aufgabe", done: "Umsetzung",
    c1_tag: "Website für Beauty-Studio",
    c1_task: "Eine Permanent-Make-up-Artistin brauchte eine Website, auf der Kundinnen sofort Leistungen und Vorher/Nachher-Ergebnisse sehen und mit wenigen Klicks buchen.",
    c1_done: "Design und Umsetzung von Grund auf: Leistungsübersicht, Galerie, schneller Kontakt über Instagram, WhatsApp und Telegram. Komplett mobil optimiert.",
    c2_tag: "Web-App",
    c2_task: "Eine angenehme Plattform zum Deutschlernen: Lektionen, Wörterbuch, Übungen und Fortschrittsanzeige.",
    c2_done: "Interface gestaltet und App mit React gebaut. Läuft als PWA — lässt sich wie eine normale App aufs Handy installieren.",
    gallery_title: "Grafik, Video & 3D", gallery_more: "Mehr auf YouTube ↗",
    g1: "YouTube-Thumbnail", g2: "Videoschnitt — ansehen ↗", g3: "Stream-Cover", g4: "Kanalbanner", g5: "3D-Schriftzug, Rendering",
    audit_badge: "Kostenlos", audit_title: "Mini-Check Ihrer Website oder Ihres Instagram",
    audit_text: "Schicken Sie mir einen Link — innerhalb von 24 Stunden sage ich Ihnen, welche 3 Dinge Ihnen Anfragen kosten und wie man sie behebt. Unverbindlich.",
    audit_cta: "Link senden",
    pricing_title: "Preise", pricing_sub: "Der Endpreis hängt vom Umfang ab — nach einem kurzen Gespräch nenne ich eine genaue Zahl. Keine versteckten Kosten.",
    pl_cta: "Das will ich", pl_popular: "Am beliebtesten",
    pl1_name: "Start", pl1_for: "Online sichtbar werden und erste Anfragen bekommen.",
    pl1_1: "Landingpage bis 5 Abschnitte", pl1_2: "Mobil optimiert", pl1_3: "Kontakt-Buttons: Telegram, WhatsApp, Anruf", pl1_4: "Veröffentlichung und Domain-Einrichtung",
    pl2_name: "Business", pl2_for: "Website und Social Media im gleichen Stil — Auftritt wie eine Marke.",
    pl2_1: "Alles aus „Start“", pl2_2: "Bis 8 Abschnitte oder 3 Seiten", pl2_3: "Instagram-Branding: Profilbild, 5 Highlight-Cover, Post-Vorlage", pl2_4: "Basis-SEO und Google-Unternehmensprofil",
    pl3_name: "Komplett", pl3_for: "Voller Launch: Website, Grafik und Werbevideo.",
    pl3_1: "Alles aus „Business“", pl3_2: "Mehrseitige Website", pl3_3: "Promo-Video 15–30 Sek. für Reels / TikTok", pl3_4: "Ein Monat kostenlose kleine Änderungen",
    ac_title: "Einzelleistungen",
    ac_1: "YouTube-Thumbnail / Cover", ac_2: "Fotoretusche", ac_3: "Reels / Shorts Schnitt", ac_4: "YouTube-Videoschnitt", ac_5: "Kanalbanner & Branding", ac_6: "3D-Modell / Rendering",
    process_title: "So läuft's ab", process_sub: "Keine Überraschungen: Sie wissen in jeder Phase, was passiert und was als Nächstes kommt.",
    st1_t: "Gespräch oder Chat", st1_p: "Wir klären, was Sie brauchen und für wen. Kein Briefing? Ich helfe dabei. Sie bekommen Preis und Termin.", st1_time: "Tag 1",
    st2_t: "Struktur & Design", st2_p: "Ich zeige einen Entwurf, wir passen ihn an, bis er Ihnen gefällt. Nach Freigabe — 50 % Anzahlung.", st2_time: "2–3 Tage",
    st3_t: "Umsetzung", st3_p: "Ich baue die Website und teste sie auf Handy und Desktop. Sie bekommen einen Live-Link zum Ansehen.", st3_time: "3–7 Tage",
    st4_t: "Launch", st4_p: "Letzte Anpassungen, Domain verbinden, online gehen. Die restlichen 50 % erst nach Abnahme.", st4_time: "Fertig",
    about_title: "Hi, ich bin Vlad",
    about_p1: "Full-Stack-Entwickler und Designer. Ich mache Websites, Grafik und Videoschnitt — Sie müssen also nicht drei verschiedene Leute suchen und jedem Ihren Stil erklären.",
    about_p2: "Mir ist wichtig, dass eine Website nicht nur gut aussieht, sondern funktioniert: auf den ersten Blick verständlich, schnell auf dem Handy und mit klarem Weg zum „Kontakt“-Button.",
    ab_1: "Antwort noch am selben Tag", ab_2: "Sie sind in jeder Phase informiert", ab_3: "Klare Absprache und Zahlung 50/50",
    faq_title: "Häufige Fragen",
    fq1: "Ich habe keine Texte und Fotos. Was nun?", fa1: "Kein Problem. Ich helfe, die Texte anhand Ihrer Antworten auf ein paar Fragen zu schreiben, suche hochwertige Fotos oder bearbeite Ihre.",
    fq2: "Was kosten Domain und Hosting?", fa2: "Hosting für eine einfache Website ist meist kostenlos. Eine Domain (.com, .de usw.) kostet ca. 10–15 € pro Jahr, wird separat bezahlt und auf Ihren Namen registriert.",
    fq3: "Kann ich die Website später selbst ändern?", fa3: "Ja. Sie erhalten die Website vollständig. Kleine Änderungen nach dem Launch erledige ich schnell — nach Absprache oder im Rahmen des Pakets.",
    fq4: "Ich brauche es dringend, in 1–2 Tagen. Geht das?", fa4: "Für ein gutes Ergebnis braucht es meist ab 5 Tage. Bei kleinen Aufgaben (Thumbnail, kurzer Videoschnitt) — schreiben Sie mir, ich versuche es einzuplanen.",
    fq5: "Wie bezahle ich?", fa5: "50 % nach Freigabe des Designs, 50 % nach Abnahme. Die Zahlungsart stimmen wir gemeinsam ab.",
    final_title: "Erzählen Sie mir von Ihrem Projekt — ich antworte heute",
    final_text: "Schreiben Sie kurz, was Ihr Unternehmen macht und was Sie brauchen. Ich antworte mit Ideen, Preis und Zeitplan.",
    final_cta: "Auf Telegram schreiben", sticky_cta: "Projekt auf Telegram besprechen",
    c7_tag: "Figma zu Code",
    c7_badge: "Übungsprojekt",
    c7_task: "Ein Pflanzen-Shop-Design aus Figma in eine echte Website umsetzen: Glas-Karten, Pflanzen, die aus dem Rahmen ragen, dunkle Grüntöne.",
    c7_done: "Pixelgenau umgesetzt und zum Leben erweckt: Karussells, funktionierender Warenkorb-Zähler, Pflanzensuche, Dropdown-Menü, Parallax, 3D-Kartenneigung und komplett responsiv fürs Handy.",
    c8_task: "Ein dunkles Fitness-Plattform-Design aus Figma in eine echte Landingpage umsetzen: zehn Sektionen, Rot-Orange-Verläufe, Preise, Trainer, Bewertungen und Blog.",
    c9_task: "Drei statische Figma-Frames für eine Energydrink-Marke zum Leben erwecken: riesiges Logo mit Dose, ein 'Since 2002'-Block und eine Reihe mit fünf Sorten.",
    c9_done: "Die Frames zu einer Scroll-Szene verbunden (GSAP ScrollTrigger): Die Dose richtet sich auf, dreht sich und wechselt die Sorte, die ganze Seite färbt sich mit. Dazu Blitz-Effekt, Glanz auf der Dose, Funken im Hintergrund, Laufband im Scroll-Tempo, rotierende Produktreihe und Warenkorb.",
    c8_done: "Layout umgesetzt, alle Bilder direkt aus der Figma-Datei exportiert und animiert: Maus-Parallax im Hero, Zahlen-Counter, 3D-Kartenneigung, Preis-Umschalter Monat/Jahr, Slider für Trainer und Tools, wechselnde Bewertungen, Registrierungs-Tabs, FAQ-Akkordeon und Handy-Layout.",
    c6_tag: "Redesign für ein Beauty-Studio",
    c6_task: "Ein Nagelstudio in Wittenberg hatte eine Vorlagen-Seite voller Fehler: „Ms_Chi Nails in Ms_Chi Nails“, leere Bereiche, eine veraltete Aktion und die Telefonnummer in drei Formaten.",
    c6_done: "Elegantes Design in den Farben ihres Ladenschilds, sechs klare Leistungen, komplette Preisliste aus ihrer Online-Buchung und eine interaktive Farbwahl: Die Nägel in der Vorschau färben sich um — und man kann direkt buchen.",
    c5_tag: "Redesign für eine Kfz-Werkstatt",
    c5_badge: "Konzept, nicht beauftragt",
    c5_task: "Eine Werkstatt in Wittenberg hatte eine veraltete Seite: Menü aus Bildern, Telefonnummer nicht klickbar, auf dem Handy abgeschnitten. Ziel: zeigen, wie sie heute aussehen kann.",
    c5_done: "Sachliches, modernes Design mit echten Daten: Anruf mit einem Klick, Live-Status „Jetzt geöffnet“, übersichtliche Leistungen und ein HU-Rechner nach Plakette. Komplett für das Handy optimiert.",
    chip_mobile: "Mobile-first",
    open_concept: "Konzept öffnen ↗",
    c4_tag: "Design-Konzept für ein Café",
    concept_badge: "Konzept",
    c4_task: "Zeigen, wie eine Website für ein Café oder eine Bäckerei aussehen kann: mutig, mit Charakter, macht Spaß beim Scrollen und bleibt im Kopf.",
    c4_done: "Marke für einen fiktiven Berliner Donut-Shop entwickelt, alle Donuts im Code gezeichnet und Animationen gebaut: Menükarten, die beim Scrollen wegfliegen, aufleuchtende Wörter, ein Donut zum Drehen mit der Maus.",
    chip_anim: "Animationen",
    edu_lbl: "Ausbildung",
    edu_ok: "Abgeschlossen",
    edu_text: "Online-Programm: Interfaces, Backend, Engineering-Praxis und Deployment — 580 Lerneinheiten.",
    hint3d: "WebGL · Ziehen zum Drehen · Kern anklicken",
    sat_web: "Websites",
    sat_3d: "3D",
    sat_video: "Video",
    sat_photo: "Photoshop",
    watch: "Video ansehen",
    ed_props: "Clip-Eigenschaften",
    ed_type: "Typ",
    ed_tool: "Tool",
    ed_hint: "Playhead ziehen oder Clip anklicken ↓",
    xray_btn: "Entwicklermodus",
    egg_hint: "· psst… tippe „flare“ auf der Tastatur oder tippe 5× aufs Logo",
    cur_open: "Öffnen",
    cur_drag: "Drehen",
    cur_play: "Scrubben",
    cur_click: "Klick",
    xray_on: "Entwicklermodus: so ist diese Seite gebaut 👀",
    egg_toast: "🔥 Easter Egg gefunden! Schick mir das Wort FLARE — 10 % Rabatt auf den ersten Auftrag",
  },
};

/* ---------- Ticker: duplicate content for seamless loop ---------- */
const ticker = document.getElementById("ticker");
if (ticker) ticker.innerHTML += ticker.innerHTML;

/* ---------- i18n ---------- */
const nodes = Array.from(document.querySelectorAll("[data-i18n]"));
const ru = { _title: document.title, _desc: document.querySelector('meta[name="description"]').content };
nodes.forEach((el) => {
  const k = el.dataset.i18n;
  if (!(k in ru)) ru[k] = el.innerHTML;
});
Object.assign(ru, {"sat_web": "Сайты", "sat_3d": "3D", "sat_video": "Монтаж", "sat_photo": "Photoshop", "cur_open": "Открыть", "cur_drag": "Крути", "cur_play": "Скраб", "cur_click": "Клик", "xray_on": "Режим разработчика: вот так свёрстан этот сайт 👀", "egg_toast": "🔥 Ты нашёл пасхалку! Напиши мне слово FLARE — получишь −10% на первый заказ"});
i18n.ru = ru;
let current = "ru";
window.t = (k) => (i18n[current] && i18n[current][k]) ?? ru[k] ?? k;

function setLang(lang) {
  const pack = i18n[lang] || ru;
  nodes.forEach((el) => {
    const v = pack[el.dataset.i18n] ?? ru[el.dataset.i18n];
    if (v != null) el.innerHTML = v;
  });
  document.title = pack._title;
  document.querySelector('meta[name="description"]').content = pack._desc;
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang button").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)),
  );
  try { localStorage.setItem("lang", lang); } catch (e) {}
  current = i18n[lang] ? lang : "ru";
  document.dispatchEvent(new CustomEvent("langchange", { detail: current }));
}

document.querySelectorAll(".lang button").forEach((b) =>
  b.addEventListener("click", () => setLang(b.dataset.lang)),
);

let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
const nav = (navigator.language || "").toLowerCase();
const auto = nav.startsWith("uk") ? "uk" : nav.startsWith("de") ? "de" : nav.startsWith("ru") ? "ru" : nav.startsWith("en") ? "en" : "ru";
setLang(i18n[saved] ? saved : auto);

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Topbar on scroll + sticky CTA ---------- */
const topbar = document.getElementById("topbar");
const sticky = document.getElementById("stickyCta");
const finalBlock = document.getElementById("contacts");
function onScroll() {
  const y = window.scrollY;
  topbar.classList.toggle("scrolled", y > 10);
  const finalTop = finalBlock.getBoundingClientRect().top;
  sticky.classList.toggle("show", y > 600 && finalTop > window.innerHeight * 0.6);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const burger = document.getElementById("burger");
const navEl = document.getElementById("nav");
function closeMenu() {
  navEl.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}
burger.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = navEl.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});
navEl.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
document.addEventListener("click", (e) => {
  if (navEl.classList.contains("open") && !e.target.closest(".nav")) closeMenu();
});

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  // лёгкая «лесенка» для соседних карточек
  const sib = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
  el.style.transitionDelay = Math.min(sib, 5) * 70 + "ms";
  io.observe(el);
});
