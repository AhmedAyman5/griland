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

    if (mobileBtn) mobileBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==================================================
       2. Sticky Navbar Effect
    ================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'text-dark', 'shadow-md', 'py-0');
                navbar.classList.remove('bg-transparent', 'text-white', 'py-1');
            } else {
                navbar.classList.remove('bg-white', 'text-dark', 'shadow-md', 'py-0');
                navbar.classList.add('bg-transparent', 'text-white', 'py-1');
            }
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

    if (statsSection) statsObserver.observe(statsSection);

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

            // Farms & Production Page
            "fp_hero_tag": "The Source of Excellence",
            "fp_hero_title": "Farms & Production",
            "fp_hero_desc": "Cultivating quality from rich soils to global markets. We oversee the entire journey.",
            "fp_scroll": "Scroll to explore",
            "fp_src_tag": "The Source",
            "fp_src_title": "Rooted in Premium Origins",
            "fp_src_desc1": "Our lands are carefully selected for their rich nutrients and ideal climates, enabling us to grow the finest produce under absolute control.",
            "fp_src_loc_title": "Prime Geographic Locations",
            "fp_src_loc_desc": "Positioned in Egypt's most fertile agricultural zones. The combination of intense sunlight, rich Nile-fed soil, and optimal weather windows gives our crops their distinct flavor profiles and robust shelf life.",
            "fp_src_loc_li1": "Strategic export proximity",
            "fp_src_loc_li2": "Year-round cultivation cycles",
            "fp_src_irr_title": "Modern Irrigation & Soil Care",
            "fp_src_irr_desc": "We deploy state-of-the-art drip irrigation systems to conserve water and deliver precise macro-nutrients directly to the roots. Our soil is continuously audited to guarantee organic vitality.",
            "fp_src_eff": "Water Efficiency",
            "fp_src_min": "Mineral Composition",

            "fp_jrn_tag": "Process",
            "fp_jrn_title": "The Production Journey",
            "fp_jrn_desc": "A seamless, fully traceable pipeline ensuring food safety from the field directly to worldwide retailers.",
            "fp_j_h_title": "Harvesting",
            "fp_j_h_desc": "The journey begins in our nutrient-rich soils. Every crop is meticulously hand-picked at peak ripeness to ensure optimal flavor, sugar levels, and maximum freshness.",
            "fp_j_s_title": "Sorting & QC",
            "fp_j_s_desc": "Harvested produce flows into our facilities where optical grading machines and expert quality-controllers strictly eliminate defects, ensuring only premium sizes proceed.",
            "fp_j_c_title": "Cooling/<br>Processing",
            "fp_j_c_h": "Cooling/Processing",
            "fp_j_c_desc": "Within hours of harvest, the produce is hydro-cooled to lock in vitality. Our rapid IQF freezers instantly trap essential nutrients and textures, preserving nature's perfection.",
            "fp_j_p_title": "Packaging",
            "fp_j_p_desc": "The pristine produce is carefully nestled into hygienic, custom-ventilated cartons and food-grade packaging. This specialized padding prevents transit bruising.",
            "fp_j_l_title": "Logistics",
            "fp_j_l_desc": "Safely loaded into climate-controlled containers, our fleets dispatch across oceans. Real-time temperature monitoring ensures the harvest reaches optimal destinations worldwide.",

            "fp_cat_tag": "Portfolio",
            "fp_cat_title": "Technical Product Catalog",
            "fp_tab_frsh": "Fresh Products",
            "fp_tab_frzn": "Frozen (IQF)",
            "fp_tab_proc": "Processed & Puree",

            "fp_f1_t": "Citrus (Oranges & Lemons)",
            "fp_f1_v1": "Baladi", "fp_f1_v2": "Navel", "fp_f1_v3": "Valencia",
            "fp_f1_sea": "<strong>Season:</strong> Nov &ndash; May", "fp_f1_pack": "<strong>Pack:</strong> Telescopic Cartons (15KG)",

            "fp_f2_t": "Premium Grapes",
            "fp_f2_v1": "Sugraone", "fp_f2_v2": "Flame", "fp_f2_v3": "Crimson",
            "fp_f2_sea": "<strong>Season:</strong> May &ndash; Sept", "fp_f2_pack": "<strong>Pack:</strong> Punnets (500g), Loose (5KG)",

            "fp_f3_t": "Onions & Fresh Garlic",
            "fp_f3_v1": "Red/Yellow", "fp_f3_v2": "White Garlic",
            "fp_f3_sea": "<strong>Season:</strong> Feb &ndash; Aug", "fp_f3_pack": "<strong>Pack:</strong> Mesh Bags (10KG/25KG)",

            "fp_f4_t": "Pomegranates",
            "fp_f4_v1": "Wonderful", "fp_f4_v2": "Acco", "fp_f4_v3": "Early 116",
            "fp_f4_sea": "<strong>Season:</strong> Sept &ndash; Jan", "fp_f4_pack": "<strong>Pack:</strong> Cartons (3.5KG), Telescopic (5KG)",

            "fp_f5_t": "Fresh Strawberries",
            "fp_f5_v1": "Fortuna", "fp_f5_v2": "Festival",
            "fp_f5_sea": "<strong>Season:</strong> Dec &ndash; Apr", "fp_f5_pack": "<strong>Pack:</strong> Punnets (250g/500g), Flat Trays",

            "fp_f6_t": "Premium Mangoes",
            "fp_f6_v1": "Kent", "fp_f6_v2": "Keitt", "fp_f6_v3": "Ewais",
            "fp_f6_sea": "<strong>Season:</strong> Jul &ndash; Oct", "fp_f6_pack": "<strong>Pack:</strong> Single Layer Cartons (4KG)",

            "fp_fz1_t": "Frozen Strawberries (IQF)",
            "fp_fz1_a": "<strong>Availability:</strong> Year-round", "fp_fz1_s": "<strong>Sizes:</strong> 15-25mm, 25-35mm", "fp_fz1_p": "<strong>Pack:</strong> Polybags (400g), Bulk (10kg)",

            "fp_fz2_t": "Frozen Mango (Slices/Cubes)",
            "fp_fz2_a": "<strong>Availability:</strong> Year-round", "fp_fz2_s": "<strong>Cut:</strong> 10×10mm cubes, Half Slices", "fp_fz2_p": "<strong>Pack:</strong> 1kg Bags, Bulk (15kg)",

            "fp_fz3_t": "Frozen Mixed Berries",
            "fp_fz3_a": "<strong>Availability:</strong> Year-round", "fp_fz3_s": "<strong>Contents:</strong> Blueberry, Raspberry, Blackberry", "fp_fz3_p": "<strong>Pack:</strong> Retail Bags (500g), Bulk (10kg)",

            "fp_fz4_t": "Frozen Green Peas",
            "fp_fz4_a": "<strong>Availability:</strong> Year-round", "fp_fz4_s": "<strong>Grade:</strong> Grade A, Extra Fine", "fp_fz4_p": "<strong>Pack:</strong> Polybags (400g/1kg), Bulk (25kg)",

            "fp_fz5_t": "Frozen Sweet Corn Kernels",
            "fp_fz5_a": "<strong>Availability:</strong> Year-round", "fp_fz5_s": "<strong>Type:</strong> Super Sweet, IQF", "fp_fz5_p": "<strong>Pack:</strong> Polybags (400g/1kg), Bulk (20kg)",

            "fp_fz6_t": "Frozen Broccoli Florets",
            "fp_fz6_a": "<strong>Availability:</strong> Year-round", "fp_fz6_s": "<strong>Cut:</strong> 30-50mm florets", "fp_fz6_p": "<strong>Pack:</strong> Retail (400g), Foodservice (2.5kg)",

            "fp_p1_t": "Fruit Purees & Concentrates",
            "fp_p1_a": "<strong>Types:</strong> Mango, Guava, Strawberry", "fp_p1_s": "<strong>Brix:</strong> 14-28° (Single Strength)", "fp_p1_p": "<strong>Pack:</strong> Aseptic Drums (200L)",

            "fp_p2_t": "Jams & Preserves",
            "fp_p2_a": "<strong>Flavors:</strong> Apricot, Fig, Strawberry, Orange", "fp_p2_s": "<strong>Sugar:</strong> Regular & Low-sugar options", "fp_p2_p": "<strong>Pack:</strong> Glass Jars (340g/450g)",

            "fp_p3_t": "Natural Juices (NFC)",
            "fp_p3_a": "<strong>Types:</strong> Orange, Pomegranate, Guava", "fp_p3_s": "<strong>Process:</strong> Cold-pressed, Not From Concentrate", "fp_p3_p": "<strong>Pack:</strong> Tetra Pak (200ml/1L), Bulk Drums",

            "fp_p4_t": "Extra Virgin Olive Oil",
            "fp_p4_a": "<strong>Grade:</strong> Extra Virgin, Cold Pressed", "fp_p4_s": "<strong>Acidity:</strong> ≤ 0.8%", "fp_p4_p": "<strong>Pack:</strong> Glass (500ml/750ml), Tin (3L/5L)",

            "fp_p5_t": "Tomato Paste & Sauce",
            "fp_p5_a": "<strong>Brix:</strong> 22-24° (CB), 28-30° (HB)", "fp_p5_s": "<strong>Color:</strong> Grade A (Deep Red)", "fp_p5_p": "<strong>Pack:</strong> Tins (400g/800g), Drums (230kg)",

            "fp_p6_t": "Dried Herbs & Spices",
            "fp_p6_a": "<strong>Types:</strong> Chamomile, Basil, Dill, Cumin", "fp_p6_s": "<strong>Process:</strong> Air-dried, Steam Sterilized", "fp_p6_p": "<strong>Pack:</strong> Bags (25g–1kg), Bulk (25kg)",

            "fp_sus_title": "Our Commitment to Sustainability",
            "fp_sus_1": "Agriculture is a partnership with nature. We focus on zero-waste initiatives, implementing renewable solar energy across our sorting facilities and utilizing organic compose derived from farm byproducts.",
            "fp_sus_2": "Protecting the environment ensures the continued superior quality of the crops we deliver to your hands.",
            "fp_sus_renew": "Renewable Energy",
            "fp_sus_zero": "Zero",
            "fp_sus_chem": "Chemical Runoff",
            "fp_cert_title": "Internationally Certified Quality",

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
            "foot_getintouch": "Get In Touch",
            // About Page
            "about_breadcrumb": "Home / About",
            "about_title": "About",
            "about_our_about": "our about",
            "about_sec1_title": "Alongside farmers and farmland owners",
            "about_sec1_p1": "Active throughout Egypt since its foundation in 1985, Griland supports farmers and agricultural landowners in the exploitation and development of their land. Our goal is to achieve a triple performance: economic, social and environmental.",
            "about_sec1_li1": "To do this, we offer our customers a wide range of expertise, ranging from production to the marketing of local products.",
            "about_sec1_li2": "But Grilandeg is above all a competent team that is committed to your side every day.",
            "about_sec1_li3": "A network of large institutions throughout Egypt.",
            "about_overview_p1": "<strong>GRILAND EGYPT</strong> has recently forayed into the business of trading in agricultural commodities and has a select presence across the value chain. We believe in exploring collaborative opportunities with partners to build a sustainable and synergistic business.",
            "about_overview_p2": "Our strong network in Europe, ASEAN and Africa, combined with our experience in global trading and distribution, helps us nurture and grow this customer-oriented business. We manage all procedures related to export and import processes, logistics, records, certificates, and the coordination of all service providers involved.",
            "about_overview_p3": "<strong>Our team</strong> creates efficient linkages across the commodity value chain, offering end-to-end solutions to customers while adhering to quality and food safety standards. Today we stand out in this highly competitive market because we have a lean corporate structure and can guarantee the success of every transaction.",
            "about_overview_p4": "In the future, we expect to continually increase our turnover and diversify into new products and markets as conditions permit.",
            "about_overview_p5": "We know the best way to secure, export, import your agriculture goods.",
            "about_crop1": "As a principle such meetings build on the breadth of our business spanning not only crop protection but also seeds to provide a unique, customer-tailored offer of integrated crop management.",
            "about_crop2": "The event concludes by offering complete crop solutions that increase plant vigor and yields whilst promoting the safe and effective use of our products.",
            "about_crop3": "Consideration is also given to all aspects of good crop practice where they have a role to play. This may include choosing the appropriate seeds, husbandry practices, crop rotation and maintaining a good soil structure and cultural techniques.",
            "about_food_ind": "Food Industry",
            "about_crop_meet": "Focused Crop Meetings",
            "about_crop_desc": "<strong>Focused crop meetings</strong> target a particular crop and provide an in-depth description of associated symptoms and damages caused by insects, disease and weed problems.",
            "about_fresh_veg": "Fresh Vegetables",
            "about_fresh_fruits": "Fresh Fruits",
            "about_dt": "Dedicated Team",
            "about_dt_desc": "Professional employees are there for you to pick the most amazing and fresh fruits.",
            "about_fp": "Fresh Products",
            "about_fp_desc": "100% fresh fruits delivery guaranteed. We inspect every package prior to shipping.",
            "about_gc": "Gift Certificates",
            "about_gc_desc": "Help your friends and family members stay healthy. Order our gift cards for them.",
            "about_bo": "The Benefits Only",
            "about_bo_desc": "We make sure that our regular clients get as many benefits as possible.",
            "about_sec2_p1": "GRILAND EGYPT Import &amp; Export, we offer a comprehensive range of agricultural products specifically designed to meet the needs of farmers and agricultural projects of all kinds.",
            "about_sec2_p2": "We are proud to provide high quality products, which makes them the ideal choice for those who strive to achieve exceptional results in the agricultural sector.",
            "about_agro": "Agrochemicals",
            "about_fert": "Advanced Fertilizers",
            "about_seeds": "Seeds",
            "about_pest": "Pesticides",
            "about_spec": "GRILAND EGYPT is specialized in importing and registering public health products of pesticides, fertilizers and fruits and vegetable seeds and exporting fresh fruits and vegetables.",
            "about_spec_p1": "We are active in a trading field that includes a variety of fertilizers, pesticides, seeds and agricultural machinery. In 2008, due to expansion, a new entity was created in the group for import, export and trading agencies.",
            "about_spec_p2": "Due to more expansion of seeds-related business (nurseries grafting), Agro-Invest sister company was founded.",
            "about_team_comp": "Our Team Company",
            "about_team_multi": "A multidisciplinary team",

            // Machinery & Equipment Page
            "mach_breadcrumb": "Home / Services / Machinery & Equipment",
            "mach_title": "Machinery & Equipment",
            "mach_subtitle": "Complete Agricultural Machinery & Equipment",
            "mach_desc": "From planting to harvest — we supply the right machine for every stage of your farming operation.",
            "mach_cta": "Request a Quote",

            "mach_intro": "We offer a comprehensive range of professional agricultural machines and farming equipment designed for maximum productivity and efficiency. Whether you're looking for tractors, harvesters, planters, or soil preparation tools — we have the expertise and inventory to match your farm's needs.",

            "mach_category_title": "Browse by Category",

            "mach_c1_title": "Potato Harvesters",
            "mach_c1_desc": "Self-propelled and trailed potato harvesters for efficient, high-capacity potato harvesting. Models include AVR Puma 4.0 (4-row, self-propelled) and Spirit series (1–2 row, trailed).",
            "mach_c2_title": "Potato Planters",
            "mach_c2_desc": "Precision potato planting machines for accurate seed spacing and planting depth control. Ideal for large-scale potato cultivation.",
            "mach_c3_title": "Soil Preparation Machines",
            "mach_c3_desc": "Full range of soil preparation equipment including ploughs, disc harrows, rotary tillers, and bed formers for optimal seedbed preparation.",
            "mach_c4_title": "Haulm Toppers",
            "mach_c4_desc": "Professional haulm topping machines for destroying potato foliage before harvest. Ensures clean, efficient crop preparation.",
            "mach_c5_title": "Storage & Handling Machines",
            "mach_c5_desc": "Potato and vegetable intake and storage line machines — including box fillers, conveyor systems, and grading equipment.",
            "mach_c6_title": "Tractors",
            "mach_c6_desc": "A wide range of agricultural tractors from compact models to heavy-duty high-horsepower machines. Suitable for all farm sizes and soil types.",
            "mach_c7_title": "Combine Harvesters",
            "mach_c7_desc": "High-performance combine harvesters for grain crops. Features advanced threshing systems, large grain tanks, and precision GPS guidance.",
            "mach_c8_title": "Seeders & Sowing Machines",
            "mach_c8_desc": "Precision sowing machines for row crops and cereals. Ensures every seed is placed at the exact right depth and spacing.",
            "mach_c9_title": "Fertilizer Spreaders",
            "mach_c9_desc": "Disc and pendulum spreaders for accurate fertilizer distribution. Adjustable spreading width and dosage for all crop types.",
            "mach_c10_title": "Field Sprayers",
            "mach_c10_desc": "Trailed and self-propelled field sprayers with wide booms and precision nozzle control for crop protection applications.",
            "mach_c11_title": "Telescopic Handlers (Telehandlers)",
            "mach_c11_desc": "Versatile telescopic loaders for lifting, loading, and handling on the farm. Available in various reach and capacity options.",
            "mach_c12_title": "Transport & Tipping Trailers",
            "mach_c12_desc": "Heavy-duty agricultural tipping trailers and transport wagons. Built for durability and large load capacity.",
            "mach_btn_learn": "Learn More",

            "mach_brands_title": "Trusted Brands We Work With",
            "mach_brands_subtitle": "We partner with the world's leading agricultural machinery manufacturers.",

            "mach_why_title": "Why Choose Our Machinery?",
            "mach_w1_title": "Full After-Sales Support",
            "mach_w1_desc": "Spare parts, maintenance, and technical service available for all machine types.",
            "mach_w2_title": "Wide Product Range",
            "mach_w2_desc": "From small hand tools to large combine harvesters — we cover the full spectrum of agricultural needs.",
            "mach_w3_title": "Expert Consultation",
            "mach_w3_desc": "Our agronomists and machinery specialists will help you choose the right equipment for your land and crops.",
            "mach_w4_title": "Competitive Pricing",
            "mach_w4_desc": "Direct sourcing and flexible payment options to fit your budget.",

            "mach_cta_title": "Ready to Upgrade Your Farm?",
            "mach_cta_subtitle": "Contact us today and get a personalized quote for any machine or equipment.",
            "mach_btn_quote": "Get a Free Quote",
            "mach_btn_browse": "Browse All Equipment",
            "mach_modal_contact": "Contact for more details",
            "mach_modal_close": "Close",

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

            // Farms & Production Page - Arabic
            "fp_hero_tag": "مصدر التميز",
            "fp_hero_title": "المزارع والإنتاج",
            "fp_hero_desc": "نزرع الجودة من التربة الخصبة إلى الأسواق العالمية. نحن نشرف على الرحلة بأكملها.",
            "fp_scroll": "اكتشف المزيد",
            "fp_src_tag": "المصدر",
            "fp_src_title": "متجذرون في الأصول الفاخرة",
            "fp_src_desc1": "يتم اختيار أراضينا بعناية لغناها بالعناصر الغذائية ومناخها المثالي، مما يمكننا من زراعة أفضل المحاصيل تحت سيطرة مطلقة.",
            "fp_src_loc_title": "مواقع جغرافية متميزة",
            "fp_src_loc_desc": "موجودة في أخصب المناطق الزراعية في مصر. مزيج أشعة الشمس المكثفة، وتربة النيل الغنية، ونوافذ الطقس المثالية يمنح محاصيلنا مذاقها المميز وعمرها الافتراضي القوي.",
            "fp_src_loc_li1": "قرب استراتيجي للتصدير",
            "fp_src_loc_li2": "دورات زراعية على مدار العام",
            "fp_src_irr_title": "الري الحديث والعناية بالتربة",
            "fp_src_irr_desc": "نستخدم أحدث أنظمة الري بالتنقيط للحفاظ على المياه وتوصيل المغذيات الدقيقة مباشرة إلى الجذور. يتم فحص تربتنا باستمرار لضمان حيويتها العضوية.",
            "fp_src_eff": "كفاءة استخدام المياه",
            "fp_src_min": "التركيب المعدني",

            "fp_jrn_tag": "العملية",
            "fp_jrn_title": "رحلة الإنتاج",
            "fp_jrn_desc": "خط أنابيب سلس وقابل للتتبع بالكامل لضمان سلامة الأغذية من الحقل مباشرة إلى تجار التجزئة في جميع أنحاء العالم.",
            "fp_j_h_title": "الحصاد",
            "fp_j_h_desc": "تبدأ الرحلة في تربتنا الغنية بالمغذيات. يتم قطف كل محصول يدويًا بدقة عند ذروة نضجه لضمان النكهة المثلى ومستويات السكر والنضارة القصوى.",
            "fp_j_s_title": "الفرز ومراقبة الجودة",
            "fp_j_s_desc": "تتدفق المنتجات المحصودة إلى منشآتنا حيث تقوم آلات الفرز البصري ومراقبو الجودة الخبراء بإزالة العيوب بدقة، لضمان مرور الأحجام الممتازة فقط.",
            "fp_j_c_title": "التبريد/<br>المعالجة",
            "fp_j_c_h": "التبريد/المعالجة",
            "fp_j_c_desc": "في غضون ساعات من الحصاد، يتم تبريد المنتجات مائيًا للحفاظ على حيويتها. تلتقط مجمدات IQF السريعة لدينا العناصر الغذائية والقوام على الفور، لتحافظ على كمال الطبيعة.",
            "fp_j_p_title": "التعبئة والتغليف",
            "fp_j_p_desc": "تُوضع المنتجات النقية بعناية في علب صحية ومخصصة التهوية وعبوات صالحة للطعام. هذه البطانة المتخصصة تمنع حدوث أي كدمات أثناء النقل.",
            "fp_j_l_title": "الخدمات اللوجستية",
            "fp_j_l_desc": "نقوم بالتحميل الآمن في حاويات يتم التحكم في درجة حرارتها، وتنطلق أساطيلنا عبر المحيطات. تضمن مراقبة درجة الحرارة في الوقت الفعلي وصول الحصاد إلى وجهاته المثالية حول العالم.",

            "fp_cat_tag": "محفظتنا",
            "fp_cat_title": "الكتالوج الفني للمنتجات",
            "fp_tab_frsh": "المنتجات الطازجة",
            "fp_tab_frzn": "المنتجات المجمدة (IQF)",
            "fp_tab_proc": "المنتجات المصنعة والمهروسة",

            "fp_f1_t": "الموالح (البرتقال والليمون)",
            "fp_f1_v1": "بلدي", "fp_f1_v2": "بصرة", "fp_f1_v3": "فالنسيا",
            "fp_f1_sea": "<strong>الموسم:</strong> نوفمبر – مايو", "fp_f1_pack": "<strong>التعبئة:</strong> كراتين تلسكوبية (15 كجم)",

            "fp_f2_t": "عنب فاخر",
            "fp_f2_v1": "سوبيريور", "fp_f2_v2": "فليم", "fp_f2_v3": "كريمسون",
            "fp_f2_sea": "<strong>الموسم:</strong> مايو – سبتمبر", "fp_f2_pack": "<strong>التعبئة:</strong> علب صغيرة (500 جم)، سائب (5 كجم)",

            "fp_f3_t": "بصل وثوم طازج",
            "fp_f3_v1": "أحمر/أصفر", "fp_f3_v2": "ثوم أبيض",
            "fp_f3_sea": "<strong>الموسم:</strong> فبراير – اغسطس", "fp_f3_pack": "<strong>التعبئة:</strong> شِباك (10 كجم/25 كجم)",

            "fp_f4_t": "الرمان",
            "fp_f4_v1": "وندر فلا", "fp_f4_v2": "أكو", "fp_f4_v3": "إيرلي 116",
            "fp_f4_sea": "<strong>الموسم:</strong> سبتمبر – يناير", "fp_f4_pack": "<strong>التعبئة:</strong> كراتين (3.5 كجم)، تلسكوبية (5 كجم)",

            "fp_f5_t": "فراولة طازجة",
            "fp_f5_v1": "فورتونا", "fp_f5_v2": "فيستيفال",
            "fp_f5_sea": "<strong>الموسم:</strong> ديسمبر – أبريل", "fp_f5_pack": "<strong>التعبئة:</strong> علب (250/500 جم)، أطباق مسطحة",

            "fp_f6_t": "مانجو فاخر",
            "fp_f6_v1": "كنت", "fp_f6_v2": "كيت", "fp_f6_v3": "عويس",
            "fp_f6_sea": "<strong>الموسم:</strong> يوليو – أكتوبر", "fp_f6_pack": "<strong>التعبئة:</strong> كراتين طبقة واحدة (4 كجم)",

            "fp_fz1_t": "فراولة مجمدة (IQF)",
            "fp_fz1_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz1_s": "<strong>الأحجام:</strong> 15-25 ملم، 25-35 ملم", "fp_fz1_p": "<strong>التعبئة:</strong> أكياس بولي (400 جم)، سائب (10 كجم)",

            "fp_fz2_t": "مانجو مجمدة (شرائح/مكعبات)",
            "fp_fz2_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz2_s": "<strong>الشكل:</strong> مكعبات 10×10 ملم، نصف شرائح", "fp_fz2_p": "<strong>التعبئة:</strong> أكياس 1 كجم، سائب (15 كجم)",

            "fp_fz3_t": "توت مشكل مجمد",
            "fp_fz3_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz3_s": "<strong>المحتويات:</strong> توت أزرق، توت العليق، توت أسود", "fp_fz3_p": "<strong>التعبئة:</strong> أكياس بيع بالتجزئة (500 جم)، سائب (10 كجم)",

            "fp_fz4_t": "بازلاء خضراء مجمدة",
            "fp_fz4_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz4_s": "<strong>الدرجة:</strong> الفئة A، دقيقة جدًا", "fp_fz4_p": "<strong>التعبئة:</strong> أكياس بولي (400/1 كجم)، سائب (25 كجم)",

            "fp_fz5_t": "حبوب الذرة الحلوة المجمدة",
            "fp_fz5_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz5_s": "<strong>النوع:</strong> حلوة جدًا، IQF", "fp_fz5_p": "<strong>التعبئة:</strong> أكياس بولي (400/1 كجم)، سائب (20 كجم)",

            "fp_fz6_t": "زهرات القرنبيط (بروكلي) مجمدة",
            "fp_fz6_a": "<strong>التوافر:</strong> على مدار العام", "fp_fz6_s": "<strong>الحجم:</strong> زهرات 30-50 ملم", "fp_fz6_p": "<strong>التعبئة:</strong> بالتجزئة (400 جم)، خدمة طعام (2.5 كجم)",

            "fp_p1_t": "هريس (بيوريه) الفاكهة والمركزات",
            "fp_p1_a": "<strong>الأنواع:</strong> مانجو، جوافة، فراولة", "fp_p1_s": "<strong>بريكس:</strong> 14-28° (قوة فردية)", "fp_p1_p": "<strong>التعبئة:</strong> براميل معقمة (200 لتر)",

            "fp_p2_t": "المربى والمعلبات",
            "fp_p2_a": "<strong>النكهات:</strong> مشمش، تين، فراولة، برتقال", "fp_p2_s": "<strong>السكر:</strong> عادي وقليل السكر", "fp_p2_p": "<strong>التعبئة:</strong> برطمانات زجاجية (340/450 جم)",

            "fp_p3_t": "عصائر طبيعية (NFC)",
            "fp_p3_a": "<strong>الأنواع:</strong> برتقال، رمان، جوافة", "fp_p3_s": "<strong>المعالجة:</strong> معصور على البارد، غير مركز", "fp_p3_p": "<strong>التعبئة:</strong> تيترا باك (200 مل / 1 لتر)، براميل كبرى",

            "fp_p4_t": "زيت زيتون بكر ممتاز",
            "fp_p4_a": "<strong>الدرجة:</strong> بكر ممتاز، معصور على البارد", "fp_p4_s": "<strong>الحموضة:</strong> ≤ 0.8%", "fp_p4_p": "<strong>التعبئة:</strong> زجاج (500/750 مل)، صفيح (3/5 لتر)",

            "fp_p5_t": "معجون وصلصة الطماطم",
            "fp_p5_a": "<strong>بريكس:</strong> 22-24°، 28-30°", "fp_p5_s": "<strong>اللون:</strong> الفئة A (أحمر داكن)", "fp_p5_p": "<strong>التعبئة:</strong> صفيح (400/800 جم)، براميل (230 كجم)",

            "fp_p6_t": "أعشاب مجففة وتوابل",
            "fp_p6_a": "<strong>الأنواع:</strong> بابونج، ريحان، شبت، كمون", "fp_p6_s": "<strong>المعالجة:</strong> تجفيف هوائي، تعقيم بالبخار", "fp_p6_p": "<strong>التعبئة:</strong> أكياس (25 جم - 1 كجم)، سائب (25 كجم)",

            "fp_sus_title": "التزامنا بالاستدامة",
            "fp_sus_1": "الزراعة هي شراكة مع الطبيعة. نحن نركز على مبادرات التخلص من النفايات تماماً، وتنفيذ الطاقة الشمسية المتجددة في جميع منشآت الفرز لدينا واستخدام الأسمدة العضوية المستمدة من المنتجات الثانوية الزراعية.",
            "fp_sus_2": "تضمن حماية البيئة استمرار الجودة الفائقة للمحاصيل التي نقدمها بين يديك.",
            "fp_sus_renew": "الطاقة المتجددة",
            "fp_sus_zero": "صفر",
            "fp_sus_chem": "جريان كيميائي",
            "fp_cert_title": "جودة معتمدة دولياً",

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
            "foot_getintouch": "تواصل معنا",
            // ترجمات صفحة حول
            "about_breadcrumb": "الرئيسية / من نحن",
            "about_title": "من نحن",
            "about_our_about": "عن شركتنا",
            "about_sec1_title": "جنبًا إلى جنب مع المزارعين وملاك الأراضي",
            "about_sec1_p1": "تنشط جريلاند في جميع أنحاء مصر منذ تأسيسها في عام 1985، وتدعم المزارعين وملاك الأراضي الزراعية في استغلال وتطوير أراضيهم. هدفنا هو تحقيق أداء ثلاثي: اقتصادي واجتماعي وبيئي.",
            "about_sec1_li1": "للقيام بذلك، نقدم لعملائنا مجموعة واسعة من الخبرات، تتراوح بين الإنتاج وتسويق المنتجات المحلية.",
            "about_sec1_li2": "لكن قبل كل شيء جريلاند هي فريق متمرس ملتزم بالوقوف بجانبك كل يوم.",
            "about_sec1_li3": "شبكة من المؤسسات الكبرى في جميع أنحاء مصر.",
            "about_overview_p1": "<strong>جريلاند مصر</strong> اقتحمت مؤخرًا مجال تجارة السلع الزراعية ولها حضور متميز عبر سلسلة القيمة. نحن نؤمن باستكشاف فرص التعاون مع الشركاء لبناء عمل تجاري مستدام ومترابط.",
            "about_overview_p2": "تساعدنا شبكتنا القوية في أوروبا وآسيا وأفريقيا، بالإضافة إلى خبرتنا في التجارة والتوزيع العالميين، على رعاية وتنمية هذا العمل الموجه للعملاء. نحن ندير جميع الإجراءات المتعلقة بعمليات التصدير والاستيراد واللوجستيات والسجلات والشهادات، وتنسيق جميع مزودي الخدمات المعنيين.",
            "about_overview_p3": "<strong>إن فريقنا</strong> ينشئ روابط فعالة عبر سلسلة قيمة السلع، ويقدم حلولاً متكاملة للعملاء مع الالتزام بمعايير الجودة وسلامة الأغذية. اليوم نحن نبرز في هذا السوق التنافسي للغاية لأن لدينا هيكلًا تنظيميًا مرنًا ويمكننا ضمان نجاح كل عملية.",
            "about_overview_p4": "في المستقبل، نتوقع زيادة إيراداتنا باستمرار والتنويع في منتجات وأسواق جديدة كلما سمحت الظروف.",
            "about_overview_p5": "نحن نعرف أفضل طريقة لتأمين وتصدير واستيراد سلعك الزراعية.",
            "about_crop1": "كمبدأ، تستند مثل هذه الاجتماعات إلى اتساع نطاق عملنا الذي لا يغطي فقط وقاية المحاصيل بل أيضًا البذور، لتقديم عرض فريد ومصمم خصيصًا للعملاء في الإدارة المتكاملة للمحاصيل.",
            "about_crop2": "يختتم الحدث بتقديم حلول متكاملة للمحاصيل تزيد من قوة النبات وغلة المحصول مع تعزيز الاستخدام الآمن والفعال لمنتجاتنا.",
            "about_crop3": "كما يؤخذ في الاعتبار جميع جوانب الممارسات المحصولية الجيدة حيثما تلعب دورًا. قد يشمل هذا اختيار البذور المناسبة وممارسات التربية والتناوب المحصولي والحفاظ على بنية التربة وتقنيات الزراعة الجيدة.",
            "about_food_ind": "الصناعات الغذائية",
            "about_crop_meet": "اجتماعات المحاصيل المتخصصة",
            "about_crop_desc": "<strong>تستهدف اجتماعات المحاصيل المتخصصة</strong> محصولًا معينًا وتقدم وصفًا تفصيليًا للأعراض والأضرار الناجمة عن الحشرات والأمراض ومشاكل الأعشاب الضارة.",
            "about_fresh_veg": "خضروات طازجة",
            "about_fresh_fruits": "فواكه طازجة",
            "about_dt": "فريق متخصص",
            "about_dt_desc": "موظفون محترفون موجودون لكي يختاروا لك أجود الفواكه الطازجة والمدهشة.",
            "about_fp": "منتجات طازجة",
            "about_fp_desc": "توصيل فواكه طازجة 100٪ مضمون. نقوم بفحص كل طرد قبل الشحن.",
            "about_gc": "بطاقات الهدايا",
            "about_gc_desc": "ساعد أصدقاءك وأفراد عائلتك على الحفاظ على صحتهم. اطلب لهم بطاقات الهدايا الخاصة بنا.",
            "about_bo": "أفضل المزايا فقط",
            "about_bo_desc": "نتأكد من أن يحصل عملاؤنا الدائمون على أكبر عدد ممكن من الامتيازات.",
            "about_sec2_p1": "في أعمال التصدير والاستيراد بجريلاند مصر، نقدم مجموعة شاملة من المنتجات الزراعية المصممة خصيصًا لتلبية احتياجات المزارعين والمشاريع الزراعية من جميع الأنواع.",
            "about_sec2_p2": "نحن فخورون بتقديم منتجات عالية الجودة، مما يجعلها الاختيار المثالي لأولئك الذين يطمحون لتحقيق نتائج استثنائية في القطاع الزراعي.",
            "about_agro": "الكيماويات الزراعية",
            "about_fert": "الأسمدة المتقدمة",
            "about_seeds": "البذور",
            "about_pest": "المبيدات",
            "about_spec": "جريلاند مصر متخصصة في استيراد وتسجيل منتجات الصحة العامة والمبيدات والأسمدة وبذور الفواكه والخضار، وتصدير الخضار والفاكهة الطازجة.",
            "about_spec_p1": "نحن ننشط في مجال التجارة الذي يشمل مجموعة متنوعة من الأسمدة، المبيدات، البذور والمعدات الزراعية. في عام 2008، نظراً للتوسع، تم تأسيس كيان جديد في المجموعة للاستيراد وتصدير ووكالات التجارة.",
            "about_spec_p2": "نظراً لتوسع أكبر في مجال الأعمال المتعلق بالبذور والتطعيم، تم تأسيس الشركة الشقيقة (أجرو-إنفست).",
            "about_team_comp": "شركتنا",
            "about_team_multi": "فريق متعدد التخصصات",

            // Machinery & Equipment Page
            "mach_breadcrumb": "الرئيسية / خدماتنا / الآلات والمعدات",
            "mach_title": "الآلات والمعدات",
            "mach_subtitle": "معدات وآلات زراعية متكاملة",
            "mach_desc": "من الزراعة إلى الحصاد — نوفر الآلة المناسبة لكل مرحلة من عملياتك الزراعية.",
            "mach_cta": "اطلب عرض سعر",

            "mach_intro": "نقدم مجموعة شاملة من الآلات الزراعية الاحترافية ومعدات الزراعة المصممة لتحقيق أقصى قدر من الإنتاجية والكفاءة. سواء كنت تبحث عن جرارات، أو حصادات، أو زرّاعات، أو أدوات تجهيز التربة — لدينا الخبرة والمخزون لتلبية احتياجات مزرعتك.",

            "mach_category_title": "تصفح حسب الفئة",

            "mach_c1_title": "حصادات البطاطس",
            "mach_c1_desc": "حصادات بطاطس ذاتية الدفع ومقطورة لحصاد البطاطس بكفاءة وقدرة عالية. تشمل الطرازات(AVR Puma 4.0) ذات 4 خطوط وسلسلة (Spirit) المقطورة بخط واحد أو خطين.",
            "mach_c2_title": "زرّاعات البطاطس",
            "mach_c2_desc": "آلات زراعة البطاطس الدقيقة لضبط تباعد البذور وعمق الزراعة بدقة. مثالية لزراعة البطاطس على نطاق واسع.",
            "mach_c3_title": "آلات تجهيز التربة",
            "mach_c3_desc": "مجموعة كاملة من معدات تجهيز التربة بما في ذلك المحاريث، والأمشاط القرصية، والعزاقات الدورانية، وآلات تسوية المهاد بذور مثالية.",
            "mach_c4_title": "قطاعات عروش البطاطس",
            "mach_c4_desc": "آلات احترافية لقطع وإزالة عروش البطاطس قبل الحصاد. تضمن تحضيرًا نظيفًا وفعالًا للمحصول.",
            "mach_c5_title": "آلات التخزين والمناولة",
            "mach_c5_desc": "آلات خطوط استلام وتخزين البطاطس والخضروات — بما في ذلك معبئات الصناديق وأنظمة الأحزمة الناقلة ومعدات الفرز.",
            "mach_c6_title": "الجرارات",
            "mach_c6_desc": "مجموعة واسعة من الجرارات الزراعية من الطرازات المدمجة إلى آلات الخدمة الشاقة عالية القدرة الحصانية. مناسبة لجميع أحجام المزارع وأنواع التربة.",
            "mach_c7_title": "حصادات عامة (كومباين)",
            "mach_c7_desc": "حصادات عالية الأداء لمحاصيل الحبوب. تتميز بأنظمة دراس متقدمة، وخزانات حبوب كبيرة، وتوجيه دقيق بنظام GPS.",
            "mach_c8_title": "بذّارات المزارع والمحاصيل",
            "mach_c8_desc": "آلات نثر البذور الدقيقة للمحاصيل الصفية والحبوب. ضمان وضع كل بذرة في العمق والتباعد المناسبين.",
            "mach_c9_title": "ناثرات الأسمدة",
            "mach_c9_desc": "ناثرات قرصية وبندولية لتوزيع الأسمدة بدقة. عرض رش وجرعات قابلة للتعديل لجميع أنواع المحاصيل.",
            "mach_c10_title": "رشاشات حقلية",
            "mach_c10_desc": "رشاشات حقلية مقطورة وذاتية الدفع بأذرع عريضة وتحكم دقيق في الفوهات لتطبيقات وقاية المحاصيل.",
            "mach_c11_title": "رافعات تلسكوبية",
            "mach_c11_desc": "لوادر تلسكوبية متعددة الاستخدامات للرفع والتحميل والمناولة في المزرعة. متوفرة بخيارات وصول وسعات مختلفة.",
            "mach_c12_title": "مقطورات النقل والقلابات",
            "mach_c12_desc": "مقطورات قلابة زراعية وعربات نقل للخدمة الشاقة. مصممة للمتانة وسعة الحمولة الكبيرة.",
            "mach_btn_learn": "اعرف المزيد",

            "mach_brands_title": "علامات تجارية موثوقة نتعامل معها",
            "mach_brands_subtitle": "نتعاون مع أبرز مصنعي الآلات الزراعية في العالم.",

            "mach_why_title": "لماذا تختار معداتنا؟",
            "mach_w1_title": "دعم كامل بعد البيع",
            "mach_w1_desc": "قطع الغيار والصيانة والخدمات الفنية متوفرة لجميع أنواع الآلات.",
            "mach_w2_title": "مجموعة واسعة من المنتجات",
            "mach_w2_desc": "من الأدوات اليدوية الصغيرة إلى الحصادات الكبيرة — نغطي جميع الاحتياجات الزراعية.",
            "mach_w3_title": "استشارات خبرائنا",
            "mach_w3_desc": "سيساعدك المهندسون الزراعيون والمتخصصون في الآلات على اختيار المعدات المناسبة لأرضك ومحاصيلك.",
            "mach_w4_title": "أسعار تنافسية",
            "mach_w4_desc": "توريد مباشر وخيارات دفع مرنة تناسب ميزانيتك.",

            "mach_cta_title": "هل أنت مستعد لتطوير مزرعتك؟",
            "mach_cta_subtitle": "اتصل بنا اليوم واحصل على عرض سعر مخصص لأي آلة أو معدة.",
            "mach_btn_quote": "اطلب عرض سعر مجاني",
            "mach_btn_browse": "تصفح جميع المعدات",
            "mach_modal_contact": "تواصل لمزيد من التفاصيل",
            "mach_modal_close": "إغلاق",

        }
    };

    let currentLang = localStorage.getItem('griland_lang') || 'en';
    const langBtnDesktop = document.getElementById('lang-toggle');
    const langBtnMobile = document.getElementById('lang-toggle-mobile');

    function applyLanguage(lang) {
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = lang;

        const nextLangText = lang === 'en' ? 'عربي' : 'English';
        if (langBtnDesktop) langBtnDesktop.innerText = nextLangText;
        if (langBtnMobile) langBtnMobile.innerText = nextLangText;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'STRONG') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
    }

    // Apply initially
    applyLanguage(currentLang);

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('griland_lang', currentLang);
        applyLanguage(currentLang);
        closeMenu();
    }

    if (langBtnDesktop) langBtnDesktop.addEventListener('click', toggleLanguage);
    if (langBtnMobile) langBtnMobile.addEventListener('click', toggleLanguage);

});
