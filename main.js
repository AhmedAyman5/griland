document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
       1. Mobile Drawer Navigation
    ================================================== */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        drawer.classList.add('drawer-open');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('opacity-100');
    }

    function closeMenu() {
        drawer.classList.remove('drawer-open');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
    }

    mobileBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==================================================
       2. Sticky Navbar Effect
    ================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('text-dark', 'py-0');
            navbar.classList.remove('text-white', 'py-1');
        } else {
            navbar.classList.remove('text-dark', 'py-0');
            navbar.classList.add('text-white', 'py-1');
        }
    });

    /* ==================================================
       3. Intersection Observer for Scroll Animations
    ================================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // keep it to animate only once, or remove to re-animate
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-element').forEach(el => {
        scrollObserver.observe(el);
    });

    /* ==================================================
       4. Stats Counter Animation
    ================================================== */
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    
    if(statsSection) statsObserver.observe(statsSection);

    /* ==================================================
       5. Language Switcher (English vs Arabic)
    ================================================== */
    const translations = {
        en: {
            "nav_home": "Home",
            "nav_about": "About",
            "nav_services": "Service",
            "nav_machinery": "Machinery & Equipment",
            "nav_agri_inputs": "Agri-Inputs",
            "nav_farms_production": "Farms & Production",
            "nav_food_processing": "Food Processing",
            "nav_trade_export": "Trade & Export",
            "nav_service_plus": "Service Plus",
            "nav_pesticides": "Pesticides",
            "nav_seeds": "Seeds",
            "nav_dairy": "Dairy Farm",
            "nav_palms": "Palms",
            "nav_portfolio": "Portfolio",
            "nav_contact": "Contacts",

            "hero_title": "Cultivating Agriculture that Works for the Future",
            "hero_subtitle": "Enhance your heritage and offer you the best yield while respecting your project, the land and the environment.",
            "hero_cta": "Contact Us now",

            "badge_organic": "100% Organic Products",
            "badge_fresh": "Always Fresh & Natural Foods",
            "badge_env": "Environmental Benefits",
            "badge_chemicals": "No Synthetic Chemicals",
            "badge_prices": "Best Prices",

            "about_eyebrow": "OUR GRILAND EGYPT",
            "about_header": "Together, let's give value to your farmland.",
            "about_body": "Farmers, farmers and owners of agricultural land, griland has been supporting you for nearly 35 years in the exploitation, management and development of your agricultural land. Our goal: to enhance your heritage and offer you the best yield while respecting your project, the land and the environment.",
            "btn_more_about": "More about Agriland \u2192", // →
            "about_card1_tag": "Fresh Products",
            "about_card1_title": "We Grow And Sell The Best Fruits!",
            "about_card2_tag": "Frozen products",
            "about_card2_title": "Explore Our Frozen Products",

            "values_eyebrow": "WHAT WE DO",
            "values_header": "Alongside the owners and operators of agricultural land.",
            "values_body": "A competent and passionate team working every day at your side to achieve your heritage and economic objectives, in compliance with a sustainable and responsible approach.",
            "value1": "Coordination of local acteurs",
            "value2": "Transparency and traceability",
            "value3": "Respect for land and biodiversity",
            "value4": "Objectivity and neutrality",
            "value5": "Trust, integrity and solidarity",
            "btn_read_values": "Read more about our values \u2192",

            "help_header": "Find out how we could help you",
            "help_card1_title": "Owner of agricultural land",
            "help_card1_body": "Do you want to maximize the yield of your farmland? griland offers tailor-made solutions that balance transparency, security and profitability.",
            "help_card2_title": "Farmer or farmland operator",
            "help_card2_body": "Do you want to rethink the management of your agricultural land? griland supports you in your projects and offers you real solutions to sustain your operation.",

            "ie_eyebrow": "IMPORT & EXPORT",
            "ie_header": "Import, export, sorting and packing of agricultural crops and pesticides.",
            "ie_tab1_title": "Seeds",
            "ie_tab1_body": "We have a wide range of the best seeds of vegetables and fruits… resistant to diseases, viruses and heat resistance.",
            "ie_tab2_title": "Fertilizers",
            "ie_tab2_body": "Grilandeg is characterized by a unique blend of fertilizers… (NPKs – growth regulators – amino acids – Humic acid)…",
            "ie_tab3_title": "Pesticides",
            "ie_tab3_body": "The company owns a wide range of plant protection products. We have 31 registered products in the Egyptian Ministry of Agriculture.",
            "ie_export_header": "Export Expertise:",
            "ie_exp_li1": "Growers and exporters of vegetables and fruits (grapes, mangoes, oranges)",
            "ie_exp_li2": "Leaders in grapes field — 'Superior' and 'Seedless Flame' varieties",
            "ie_exp_li3": "Export to EU and Gulf area for 10+ years",
            "ie_exp_li4": "Holders of Global Gap Certificate",

            "org_header1": "Organic agriculture",
            "org_body1": "Organic agriculture in Egypt dates back to the mid-1970s… Prior to the construction of the Aswan High Dam, the Nile's annual flood swamped farmland and left behind a thick layer of fertile soil.",
            "org_header2": "Explore Our Organic Agriculture",
            "org_card1_title": "Networking Events",
            "org_card1_body": "We facilitate networking and collaboration in Egypt's organic agriculture sector through various events, fostering knowledge exchange.",
            "org_card2_title": "Knowledge Materials",
            "org_card2_body": "We offer comprehensive learning programs to enhance the skills and knowledge of farmers and stakeholders in organic agriculture.",
            "org_card3_title": "Capacity Learning",
            "org_card3_body": "We strengthen the organic farming community through comprehensive learning programs, and practical training with field visits.",

            "equip_header": "Agricultural Equipment",
            "equip_body": "<strong>Agricultural Tractor:</strong> The idea of the agricultural tractor appeared in the mid-nineteenth century… Tractors are used for plowing the land, transporting waste from fields to market, and transporting heavy agricultural equipment.",
            "equip_sub": "Import of Agricultural Equipment",

            "pest_eyebrow": "PESTICIDES",
            "pest_title": "Colvid 25% EC",
            "pest_lbl1": "Active ingredient:",
            "pest_val1": "Difenoconazole 25%",
            "pest_lbl2": "Type:",
            "pest_val2": "Systemic, preventive and curative fungicide",
            "pest_lbl3": "Use:",
            "pest_val3": "Control late blight",
            "pest_lbl4": "Rates:",
            "pest_val4": "50 cm / 100 liters of water",
            "pest_lbl5": "Crop:",
            "pest_val5": "Potatoes",

            "palm_header": "Date Palm Cultivation",
            "palm_body": "Our vision is to offer a fruitful opportunity for young people to be part of our success story through investing in date palm cultivation… connecting the ambitions of young people with sustainable investment opportunities… achieve attractive returns and foster sustainable economic growth.",

            "breed_header": "Breeding and fattening",
            "breed_intro": "We offer comprehensive services for animal breeding and fattening, from building sheds to providing the appropriate feed to enhance productivity.",
            "breed_li1_title": "Sheds and Breeding:",
            "breed_li1_body": "For birds using natural materials.",
            "breed_li2_title": "Rabbit Batteries:",
            "breed_li2_body": "For effective rabbit breeding.",
            "breed_li3_title": "Calf Fattening:",
            "breed_li3_body": "Utilizing diverse feed to increase productivity.",
            "breed_cta_text": "Are you looking for a close and committed partner to enhance your agricultural land?",
            "btn_contact": "Contact Us",

            "stat_eyebrow": "QUALITY PRODUCT",
            "stat_header": "We Appreciate Your Trust Greatly",
            "stat_1": "Projects completed",
            "stat_2": "Special Equipment",

            "proj_eyebrow": "PROJECTS",
            "proj_header": "They trust us",
            "proj_tag": "projects",
            "proj_1": "griland enhances carbon storage on rapeseed cultivation",
            "proj_2": "Green architecture for green infrastructure",
            "proj_3": "Connected weather stations",
            "proj_4": "Bees also work with Agrilandeg",
            "btn_view_posts": "View more posts",

            "contact_eyebrow": "GET IN TOUCH",
            "contact_title": "Send us a message",
            "contact_name": "Name",
            "contact_phone": "Phone",
            "contact_email": "Email Address",
            "contact_subject": "Subject",
            "contact_msg": "How can we help you? Feel free to get in touch!",
            "contact_send": "Send Message",

            "foot_tagline": "Together, let's give value to your farmland.",
            "foot_belgium_title": "Belgium Address",
            "foot_belgium_o": "European Administrative Office",
            "foot_belgium_addr": "Avenue Louise, 1050 Brussels, Belgium",
            "foot_egypt_title": "Company HQ (Egypt)",
            "foot_egypt_addr": "36 (A) Morad St., ELoda masr tower, Giza, Egypt",
            "foot_email": "Get In Touch",
            "foot_branch_title": "Branch address (Egypt)",
            "foot_branch_addr": "3 Cairo-Belbeis Desert Road, P.O. Box: 3020 El Salam, 11785, Cairo",
            "copy_right": "COPY RIGHT \u00A9 GRILAND EGYPT. All Rights Reserved.",

            // Certifications Page
            "nav_certificates": "Certificates",
            "cert_breadcrumb": "Home / Certificates",
            "cert_title": "Certificates",
            "cert_badge": "Our Badges of Honor",
            "cert_desc": "We are proud to hold multiple accreditations from leading organizations",
            "cert_kosher": "Kosher",
            "cert_kosher_desc": "The Kosher Certified seal assures consumers that the product in question, with its ingredients and entire production cycle, adheres to all the requirements of the Kosher law.",
            "cert_halal": "HALAL",
            "cert_halal_desc": "Halal certification attests that a product is manufactured in full compliance with the precepts of Islamic Law, containing no forbidden components and having had no contact with any substances considered impure.",
            "cert_iso": "ISO",
            "cert_iso9001": "ISO 9001",
            "cert_iso9001_desc": "The international standard that specifies requirements for a quality management system (QMS). It demonstrates the ability to consistently provide products and services that meet customer and regulatory requirements.",
            "cert_iso22000": "ISO 22000",
            "cert_iso22000_desc": "ISO 22000 helps organizations identify and control food safety hazards. Applicable to all types of producer, it provides reassurance within the global food supply chain, helping products cross borders and earning consumer trust.",
            "cert_fda": "FDA",
            "cert_fda_desc": "FDA export certification provides official attestation concerning a product's regulatory or marketing status, based on available information at the time FDA issues the certificate.",
            "cert_smeta": "SMETA",
            "cert_smeta_desc": "SMETA (Sedex Members Ethical Trade Audit) is a social auditing standard businesses use to assess a supplier's working conditions across labor, health and safety, environment and business ethics.",
            "cert_bio": "Bio",
            "cert_bioqcheck": "Bio Q-Check",
            "cert_bioqcheck_desc": "Q-Check is an independent, accredited certification body by the Hellenic Accreditation System (ESYD), providing evaluation, inspection and certification for Organic Farming and GLOBALG.A.P standards.",
            "cert_globalgap_title": "Global G.A.P",
            "cert_globalgap": "GLOBAL G.A.P",
            "cert_globalgap_desc": "An internationally recognised certified standard ensuring Good Agricultural Practices, acting as a safeguard for food safety, workers' health and safety, animal welfare, and environmental protection.",
            "cert_brc_title": "BRC",
            "cert_brc": "BRC Global Standards",
            "cert_brc_desc": "Brand Reputation through Compliance (BRC) is a UK trade organization recognized globally. It established its first Global Standard for Food Safety in 1998 to help companies comply with UK and EU food safety legislation.",
            "cert_certified": "✓ Certified",
            "cert_cta_title": "Are you looking for a close and committed partner?",
            "cert_cta_desc": "Contact us today and let's grow together.",
            "foot_desc": "Supporting farmers and landowners for over 35 years in the exploitation, management and development of agricultural land.",
            "foot_quicklinks": "Quick Links",
            "foot_services": "Our Services",
            "foot_getintouch": "Get In Touch"
        },
        ar: {
            "nav_home": "الرئيسية",
            "nav_about": "من نحن",
            "nav_services": "خدماتنا",
            "nav_machinery": "الآلات والمعدات",
            "nav_agri_inputs": "المدخلات الزراعية",
            "nav_farms_production": "المزارع والإنتاج",
            "nav_food_processing": "التصنيع الغذائي",
            "nav_trade_export": "التجارة والتصدير",
            "nav_service_plus": "الخدمات الإضافية",
            "nav_pesticides": "المبيدات",
            "nav_seeds": "البذور",
            "nav_dairy": "مزارع الألبان",
            "nav_palms": "النخيل",
            "nav_portfolio": "أعمالنا",
            "nav_contact": "اتصل بنا",

            "hero_title": "تنمية زراعة تعمل من أجل المستقبل",
            "hero_subtitle": "نعزز من قيمة تراثك ونقدم لك أفضل عائد مع احترام مشروعك، أرضك والبيئة.",
            "hero_cta": "تواصل معنا الآن",

            "badge_organic": "منتجات عضوية 100%",
            "badge_fresh": "أطعمة طازجة وطبيعية دائمًا",
            "badge_env": "فوائد بيئية",
            "badge_chemicals": "بدون مواد كيميائية اصطناعية",
            "badge_prices": "أفضل الأسعار",

            "about_eyebrow": "عن جريلاند مصر",
            "about_header": "معًا، لنعطي قيمة لأرضك الزراعية.",
            "about_body": "أيها المزارعون وملاك الأراضي الزراعية، تدعمكم جريلاند منذ ما يقرب من 35 عامًا في استغلال وإدارة وتطوير أراضيكم الزراعية. هدفنا: تعزيز تراثكم وتقديم أفضل العوائد بالتزامن مع احترام مشروعكم، أرضكم والبيئة.",
            "btn_more_about": "\u2190 المزيد عن جريلاند", // ←
            "about_card1_tag": "منتجات طازجة",
            "about_card1_title": "نزرع ونبيع أفضل الفواكه!",
            "about_card2_tag": "منتجات مجمدة",
            "about_card2_title": "استكشف منتجاتنا المجمدة",

            "values_eyebrow": "ماذا نفعل",
            "values_header": "جنبًا إلى جنب مع مُلَّاك ومشغلي الأراضي الزراعية.",
            "values_body": "فريق مؤهل وشغوف يعمل كل يوم بجانبك لتحقيق أهدافك التراثية والاقتصادية، وبما يتوافق مع نهج مستدام ومسؤول.",
            "value1": "تنسيق الفاعلين المحليين",
            "value2": "الشفافية وقابلية التتبع",
            "value3": "احترام الأرض والتنوع البيولوجي",
            "value4": "الموضوعية والحياد",
            "value5": "الثقة والنزاهة والتضامن",
            "btn_read_values": "\u2190 اقرأ المزيد عن قيمنا",

            "help_header": "اكتشف كيف يمكننا مساعدتك",
            "help_card1_title": "مالك أرض زراعية",
            "help_card1_body": "هل ترغب في زيادة إنتاجية أرضك الزراعية؟ تقدم لك جريلاند حلولاً مصممة خصيصًا توازن بين الشفافية والأمان والربحية.",
            "help_card2_title": "طموحاتك الزراعية",
            "help_card2_body": "هل تريد إعادة التفكير في إدارة أرضك الزراعية؟ تدعمك جريلاند في مشاريعك وتقدم لك حلولاً حقيقية لاستدامة عملياتك.",

            "ie_eyebrow": "الاستيراد والتصدير",
            "ie_header": "استيراد وتصدير وفرز وتعبئة المحاصيل الزراعية والمبيدات.",
            "ie_tab1_title": "البذور",
            "ie_tab1_body": "لدينا مجموعة واسعة من أفضل بذور الخضروات والفواكه... المقاومة للأمراض والفيروسات ومقاومة للحرارة.",
            "ie_tab2_title": "الأسمدة",
            "ie_tab2_body": "تتميز جريلاند بمزيج فريد من الأسمدة... (NPK – منظمات نمو – أحماض أمينية – حمض الهيوميك)...",
            "ie_tab3_title": "المبيدات",
            "ie_tab3_body": "تمتلك الشركة مجموعة واسعة من منتجات وقاية النبات. لدينا 31 منتجًا مسجلاً في وزارة الزراعة المصرية.",
            "ie_export_header": "خبرة التصدير:",
            "ie_exp_li1": "نحن مزارعون ومصدّرون للخضروات والفواكه (العنب، المانجو، البرتقال)",
            "ie_exp_li2": "رواد في مجال العنب — أصناف 'سوبيريور' و 'فليم الخالي من البذور'",
            "ie_exp_li3": "التصدير إلى الاتحاد الأوروبي ومنطقة الخليج لأكثر من 10 سنوات",
            "ie_exp_li4": "حاصلون على شهادة جلوبال جاب (Global Gap)",

            "org_header1": "الزراعة العضوية",
            "org_body1": "يعود تاريخ الزراعة العضوية في مصر إلى منتصف السبعينيات... قبل بناء السد العالي في أسوان، كان فيضان النيل السنوي يغمر الأراضي الزراعية ويترك وراءه طبقة سميكة من التربة الخصبة المستدامة بفضل الرواسب الحيوية.",
            "org_header2": "استكشف زراعتنا العضوية",
            "org_card1_title": "فعاليات التواصل",
            "org_card1_body": "نحن نسهل التواصل والتعاون في قطاع الزراعة العضوية في مصر من خلال الفعاليات المختلفة، وتعزيز تبادل المعرفة.",
            "org_card2_title": "مواد المعرفة",
            "org_card2_body": "نقدم برامج تعليمية شاملة لتعزيز مهارات ومعارف المزارعين وأصحاب المصلحة في الزراعة العضوية.",
            "org_card3_title": "برامج بناء القدرات",
            "org_card3_body": "تعزيز مجتمع الزراعة العضوية من خلال برامج تعليمية شاملة، وتدريب عملي وزيارات ميدانية.",

            "equip_header": "المعدات الزراعية",
            "equip_body": "<strong>الجرار الزراعي:</strong> ظهرت فكرة الجرار الزراعي في منتصف القرن التاسع عشر... وتُستخدم الجرارات لحرث الأرض ونقل معدات الزراعة الثقيلة إلى الأسواق.",
            "equip_sub": "استيراد المعدات الزراعية",

            "pest_eyebrow": "المبيدات الحشرية",
            "pest_title": "كولفيد 25٪ EC",
            "pest_lbl1": "المادة الفعالة:",
            "pest_val1": "ديفينوكونازول 25٪",
            "pest_lbl2": "النوع:",
            "pest_val2": "مبيد فطري جهازي، وقائي وعلاجي",
            "pest_lbl3": "الاستخدام:",
            "pest_val3": "مكافحة اللفحة المتأخرة",
            "pest_lbl4": "المعدلات:",
            "pest_val4": "50 سم / 100 لتر ماء",
            "pest_lbl5": "المحصول:",
            "pest_val5": "بطاطس",

            "palm_header": "زراعة نخيل التمر",
            "palm_body": "رؤيتنا هي تقديم فرصة مثمرة للشباب ليكونوا جزءًا من قصة نجاحنا من خلال الاستثمار في زراعة نخيل التمر... ربط طموحات الشباب بفرص استثمارية مستدامة... تحقيق عوائد جذابة وتعزيز النمو الاقتصادي المستدام.",

            "breed_header": "التربية والتسمين",
            "breed_intro": "نقدم خدمات شاملة لتربية الحيوانات وتسمينها، بدءًا من بناء الحظائر وحتى توفير العلف المناسب لتعزيز الإنتاجية.",
            "breed_li1_title": "الحظائر والتربية:",
            "breed_li1_body": "للطيور باستخدام مواد طبيعية مخصصة.",
            "breed_li2_title": "بطاريات الأرانب:",
            "breed_li2_body": "لتربية الأرانب الفعالة والسريعة.",
            "breed_li3_title": "تسمين العجول:",
            "breed_li3_body": "استخدام علف متنوع لزيادة الإنتاجية بشكل ملحوظ.",
            "breed_cta_text": "هل تبحث عن شريك قريب وملتزم لتعزيز أراضيك الزراعية؟",
            "btn_contact": "اتصل بنا",

            "stat_eyebrow": "منتج عالي الجودة",
            "stat_header": "نحن نقدر ثقتكم بكثافة",
            "stat_1": "المشاريع المنجزة",
            "stat_2": "المعدات الخاصة",

            "proj_eyebrow": "مشاريع",
            "proj_header": "هم يثقون بنا",
            "proj_tag": "مشاريع",
            "proj_1": "جريلاند تعزز تخزين الكربون في زراعة بذور اللفت",
            "proj_2": "العمارة الخضراء للبنية التحتية الخضراء",
            "proj_3": "محطات الطقس المتصلة",
            "proj_4": "النحل يعمل أيضًا مع جريلاند",
            "btn_view_posts": "عرض المزيد من المشاريع",

            "contact_eyebrow": "تواصل معنا",
            "contact_title": "أرسل لنا رسالة",
            "contact_name": "الاسم",
            "contact_phone": "رقم الهاتف",
            "contact_email": "البريد الإلكتروني",
            "contact_subject": "الموضوع",
            "contact_msg": "كيف يمكننا مساعدتك؟ لا تتردد في التواصل معنا!",
            "contact_send": "إرسال",

            "foot_tagline": "معًا، لنعطي قيمة لأرضك الزراعية.",
            "foot_belgium_title": "عنوان بلجيكا",
            "foot_belgium_o": "المكتب الإداري الأوروبي",
            "foot_belgium_addr": "شارع لويز ، 1050 بروكسل ، بلجيكا",
            "foot_egypt_title": "المكتب الرئيسي (مصر)",
            "foot_egypt_addr": "36 (أ) شارع مراد، برج الهدى مصر، الجيزة، مصر",
            "foot_email": "ابقى على تواصل",
            "foot_branch_title": "عنوان الفرع (مصر)",
            "foot_branch_addr": "3 طريق القاهرة بلبيس الصحراوي، ص.ب: 3020 السلام، 11785، القاهرة",
            "copy_right": "حقوق النشر \u00A9 جريلاند مصر. جميع الحقوق محفوظة.",

            // Certifications Page
            "nav_certificates": "الشهادات",
            "cert_breadcrumb": "الرئيسية / الشهادات",
            "cert_title": "الشهادات",
            "cert_badge": "أوسمة الشرف لدينا",
            "cert_desc": "نحن فخورون بحصولنا على اعتمادات متعددة من مؤسسات رائدة",
            "cert_kosher": "كوشير",
            "cert_kosher_desc": "يضمن ختم شهادة كوشير للمستهلكين أن المنتج المعني، بمكوناته ودورة إنتاجه بالكامل، يتوافق مع جميع متطلبات الشريعة اليهودية (كوشير).",
            "cert_halal": "حلال",
            "cert_halal_desc": "تشهد شهادة حلال أن المنتج يتم تصنيعه في امتثال كامل لتعاليم الشريعة الإسلامية، ولا يحتوي على أي مكونات محرمة ولم يتلامس مع أي مواد تعتبر غير نقية.",
            "cert_iso": "أيزو",
            "cert_iso9001": "أيزو 9001",
            "cert_iso9001_desc": "المعيار الدولي الذي يحدد متطلبات نظام إدارة الجودة (QMS). إنه يوضح القدرة على تقديم منتجات وخدمات تلبي متطلبات العملاء والمتطلبات التنظيمية باستمرار.",
            "cert_iso22000": "أيزو 22000",
            "cert_iso22000_desc": "تساعد أيزو 22000 المؤسسات على تحديد ومراقبة مخاطر سلامة الأغذية. ينطبق على جميع أنواع المنتجين، ويوفر الطمأنينة داخل سلسلة الإمداد الغذائي العالمية.",
            "cert_fda": "إدارة الغذاء والدواء",
            "cert_fda_desc": "توفر شهادة تصدير إدارة الغذاء والدواء إثباتًا رسميًا يخص الوضع التنظيمي أو التسويقي للمنتج.",
            "cert_smeta": "سميتا",
            "cert_smeta_desc": "سميتا هو معيار للتدقيق الاجتماعي تستخدمه الشركات لتقييم ظروف عمل المورد عبر العمل والصحة والسلامة والبيئة وأخلاقيات العمل.",
            "cert_bio": "حيوي",
            "cert_bioqcheck": "بيو كيو-شيك",
            "cert_bioqcheck_desc": "كيو-شيك هي هيئة إصدار شهادات مستقلة ومعتمدة تقدم التقييم والتفتيش وإصدار الشهادات للزراعة العضوية ومعايير GLOBALG.A.P.",
            "cert_globalgap_title": "جلوبال جاب",
            "cert_globalgap": "جلوبال جاب",
            "cert_globalgap_desc": "معيار معتمد معترف به دوليًا يضمن الممارسات الزراعية الجيدة، ويعمل كضمان لسلامة الأغذية وصحة العمال وسلامتهم ورعاية الحيوان وحماية البيئة.",
            "cert_brc_title": "بي آر سي",
            "cert_brc": "معايير بي آر سي العالمية",
            "cert_brc_desc": "بي آر سي هي منظمة تجارية بريطانية معترف بها عالميًا.",
            "cert_certified": "✓ معتمد",
            "cert_cta_title": "هل تبحث عن شريك قريب وملتزم؟",
            "cert_cta_desc": "اتصل بنا اليوم ودعنا ننمو معًا.",
            "foot_desc": "ندعم المزارعين وملاك الأراضي لأكثر من 35 عامًا في استغلال وإدارة وتطوير الأراضي الزراعية.",
            "foot_quicklinks": "روابط سريعة",
            "foot_services": "خدماتنا",
            "foot_getintouch": "تواصل معنا"
        }
    };

    let currentLang = 'en';
    const langBtnDesktop = document.getElementById('lang-toggle');
    const langBtnMobile = document.getElementById('lang-toggle-mobile');

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Update document dir and lang attributes
        document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = currentLang;

        // Update button texts
        const nextLangText = currentLang === 'en' ? 'عربي' : 'English';
        langBtnDesktop.innerText = nextLangText;
        langBtnMobile.innerText = nextLangText;

        // Update translations
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                if(el.tagName === 'STRONG') {
                    // if part of HTML, some elements like the equip_body uses strong
                    el.innerHTML = translations[currentLang][key];
                } else {
                    el.innerHTML = translations[currentLang][key]; // innerHTML supports <strong> 
                }
            }
        });

        // Close menu if open mapping translated content correctly on drawer alignment
        closeMenu();
    }

    langBtnDesktop.addEventListener('click', toggleLanguage);
    langBtnMobile.addEventListener('click', toggleLanguage);

});
