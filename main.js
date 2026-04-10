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

    if(mobileBtn) mobileBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==================================================
       2. Sticky Navbar Effect
    ================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(navbar) {
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
            "foot_getintouch": "Get In Touch",
            
            // Agricultural Inputs Page
            "agri_breadcrumb": "Home / Agricultural Inputs",
            "agri_title": "Agricultural Inputs",
            "agri_subtitle": "Seeds, Fertilizers, Pesticides &amp; Machinery — Everything Your Land Needs",
            "agri_supply_eyebrow": "What We Supply",
            "agri_supply_title": "Complete Agricultural Input Solutions",
            "agri_supply_p1": "Since 1923, companies like BayWa have proven that the link between farmers and food producers runs through quality agricultural inputs. At Griland Egypt, we carry that same philosophy — providing farmers, landowners, and operators with everything required to run a productive, sustainable, and profitable agricultural operation. From certified seeds and precision fertilizers to crop protection products and heavy-duty machinery, we import and supply the full spectrum of agricultural inputs from trusted international partners across Europe and Asia.",
            "agri_supply_p2": "Our agricultural inputs are sourced from globally recognized manufacturers and meet international quality standards including ISO 9001, GlobalG.A.P., and FDA certification — ensuring every input you receive is traceable, compliant, and proven.",
            "agri_trusted_badge": "Trusted Since 1989",
            "agri_stat_years": "Years",
            "agri_stat_products": "Products",
            "agri_stat_partners": "Partners",
            "agri_stat_categories": "Categories",
            "agri_range_eyebrow": "Our Input Range",
            "agri_range_title": "Four Pillars of Agricultural Input",
            "agri_tab_seeds": "Seeds",
            "agri_tab_fertilizers": "Fertilizers",
            "agri_tab_pesticides": "Pesticides",
            "agri_tab_machinery": "Machinery",
            "agri_seeds_banner_title": "Certified Seeds &amp; Seedlings",
            "agri_seeds_banner_desc": "High-yield, disease-resistant seeds tailored for Egyptian soil and climate. Verified origins from top global breeders.",
            "agri_seeds_cat_veg": "Vegetables",
            "agri_seeds_veg_title": "Vegetable Seeds",
            "agri_seeds_veg_desc": "A wide range of hybrid and non-hybrid vegetable seeds resistant to diseases, viruses, and heat. Our seeds cover major crops including tomatoes, peppers, cucumbers, and leafy greens — all certified and tested for Egyptian and regional climates.",
            "agri_origin": "🌍 Origin: Europe &amp; Asia",
            "agri_seeds_cat_fruit": "Fruits",
            "agri_seeds_fruit_title": "Fruit Seeds &amp; Seedlings",
            "agri_seeds_fruit_desc": "Premium fruit crop varieties including grapes (Superior &amp; Seedless Flame), mangoes, citrus, and stone fruits. Our fruit seeds are sourced from certified European breeders and tested for high-yield performance.",
            "agri_seeds_cat_field": "Field Crops",
            "agri_seeds_field_title": "Field Crop Seeds",
            "agri_seeds_field_desc": "Certified seeds for wheat, corn, barley, sorghum, and other staple field crops. Non-hybrid and hybrid varieties available, with documented performance data across Egyptian soil conditions.",
            "agri_fert_banner_title": "Advanced Plant Nutrition",
            "agri_fert_banner_desc": "Organic and chemical fertilizers, micro-nutrients, and bio-stimulants crafted to maximize your crop's biological potential.",
            "agri_fert_cat_macro": "Macro Nutrients",
            "agri_fert_npk_title": "NPK Fertilizers",
            "agri_fert_npk_desc": "Complete NPK blends combining Nitrogen, Phosphorus, and Potassium — the three core macronutrients for crop growth. Our NPK formulations are calibrated for Egyptian soils and available in granular and liquid forms.",
            "agri_fert_cat_bio": "Bio Stimulants",
            "agri_fert_amino_title": "Amino Acids &amp; Humic Acid",
            "agri_fert_amino_desc": "Griland's unique fertilizer blend includes growth regulators, amino acids, and humic acid — working together to raise production efficiency and crop quality even on poor and newly reclaimed land.",
            "agri_fert_cat_micro": "Micro Nutrients",
            "agri_fert_micro_title": "Micronutrient Blends",
            "agri_fert_micro_desc": "Chelated micronutrient fertilizers including zinc, iron, manganese, and boron. Designed to correct deficiencies and optimize plant health across all crop types and soil profiles.",
            "agri_fert_cat_liquid": "Liquid Nutrition",
            "agri_fert_liquid_title": "Liquid Fertilizers",
            "agri_fert_liquid_desc": "Ready-to-apply liquid formulations for foliar feeding and fertigation systems. Ideal for high-value crops requiring precise, fast-acting nutrition at critical growth stages.",
            "agri_fert_cat_organic": "Organic",
            "agri_fert_organic_title": "Organic Fertilizers",
            "agri_fert_organic_desc": "Bio-based organic fertilizers including compost concentrates, vermi-compost, and manure-based formulations. Supporting organic farming certification and sustainable soil management.",
            "agri_fert_cat_soil": "Soil Health",
            "agri_fert_soil_title": "Soil Conditioners",
            "agri_fert_soil_desc": "Products that improve soil structure, water retention, and microbial activity. Including bio-stimulants and natural extracts that enhance long-term soil productivity.",
            "agri_pest_banner_title": "Complete Crop Protection",
            "agri_pest_banner_desc": "Herbicides, fungicides, and integrated pest management (IPM) solutions to safeguard your investment from planting to harvest.",
            "agri_pest_cat_fungi": "Fungicides",
            "agri_pest_fungi_title": "Fungicides",
            "agri_pest_fungi_desc": "Systemic and contact fungicides for late blight, downy mildew, powdery mildew, and fungal complexes. Includes Colvid 25% EC (Difenoconazole 25%) and a wide range of preventive and curative products.",
            "agri_pest_cat_insect": "Insecticides",
            "agri_pest_insect_title": "Insecticides",
            "agri_pest_insect_desc": "Broad-spectrum and selective insecticides targeting sucking pests, leaf feeders, and soil-dwelling insects. Products with different mechanisms of action to prevent resistance development.",
            "agri_pest_cat_herb": "Herbicides",
            "agri_pest_herb_title": "Herbicides",
            "agri_pest_herb_desc": "Selective and non-selective herbicides for weed control across field crops and horticulture. Pre-emergent and post-emergent formulations available to suit all crop calendars.",
            "agri_pest_cat_nema": "Nematicides &amp; Acaricides",
            "agri_pest_nema_title": "Nematicides &amp; Acaricides",
            "agri_pest_nema_desc": "Specialized products for the control of soil nematodes and mites — key pests in Egyptian vegetable and fruit production. Includes registered products from Syngenta and our own portfolio.",
            "agri_pest_cat_growth": "Crop Protection",
            "agri_pest_growth_title": "Plant Growth Regulators",
            "agri_pest_growth_desc": "Growth regulators that manage plant development, fruit set, and stress response. Applied at critical crop stages to improve uniformity, yield, and post-harvest quality.",
            "agri_pest_cat_bio": "Bio Protection",
            "agri_pest_bio_title": "Biological Crop Protection",
            "agri_pest_bio_desc": "Biopesticides and natural control agents as environmentally responsible alternatives to conventional chemicals. Supporting organic farming and integrated pest management (IPM) programs.",
            "agri_pest_registered": "Griland Egypt holds 31 registered pesticide products with the Egyptian Ministry of Agriculture.",
            "agri_mach_banner_title": "Heavy-Duty Machinery",
            "agri_mach_banner_desc": "Tractors, combine harvesters, and specialized attachments imported directly from top-tier European manufacturers.",
            "agri_mach_intro": "Griland Egypt imports agricultural tractors and heavy equipment from leading European manufacturers. We also facilitate access to quality used machinery through our international partnerships — covering the full range of equipment a modern farm requires.",
            "agri_mach_cat_soil": "Soil Preparation",
            "agri_mach_tractor_title": "Agricultural Tractors",
            "agri_mach_tractor_desc": "New and used tractors for continuous movement across agricultural lands, plowing, and transporting equipment. Sourced from European manufacturers and suitable for Egyptian field conditions.",
            "agri_mach_cat_harvest": "Harvesting",
            "agri_mach_combine_title": "Combine Harvesters",
            "agri_mach_combine_desc": "Full-spec combine harvesters for wheat, corn, and other field crops. Including maize adapters and sunflower headers for complete harvesting solutions across crop types.",
            "agri_mach_cat_plant": "Planting",
            "agri_mach_drill_title": "Seed Drills &amp; Planters",
            "agri_mach_drill_desc": "Conventional and precision seed drills for accurate seed placement and optimized plant populations. Ensuring uniform germination and maximizing yield potential from the first day.",
            "agri_mach_cat_protect": "Crop Protection",
            "agri_mach_sprayer_title": "Sprayers &amp; Applicators",
            "agri_mach_sprayer_desc": "Trailed and self-propelled sprayers for pesticide and fertilizer application. Calibrated for precise delivery rates to reduce waste and ensure uniform crop coverage.",
            "agri_mach_cat_tillage": "Soil Work",
            "agri_mach_harrow_title": "Disc Harrows &amp; Ploughs",
            "agri_mach_harrow_desc": "Tillage equipment including disc harrows, ploughs, subsoilers, and seedbed preparators. For primary and secondary soil preparation across all crop rotations.",
            "agri_mach_cat_post": "Post-Harvest",
            "agri_mach_loader_title": "Telescopic Loaders &amp; Forklifts",
            "agri_mach_loader_desc": "Material handling equipment for farm logistics, cold storage, and post-harvest operations. Including telescopic loaders, electric forklifts, and skid loaders.",
            "agri_why_eyebrow": "Why Choose Us",
            "agri_why_title": "The Griland Quality Promise",
            "agri_why1_title": "Internationally Sourced",
            "agri_why1_desc": "Imported from the largest agencies in Europe and Asia with proven track records.",
            "agri_why2_title": "Ministry Registered",
            "agri_why2_desc": "31 products registered with the Egyptian Ministry of Agriculture for legal compliance.",
            "agri_why3_title": "Certified &amp; Traceable",
            "agri_why3_desc": "All inputs comply with ISO, GlobalG.A.P., FDA and Kosher/Halal standards.",
            "agri_why4_title": "Farmer-First Support",
            "agri_why4_desc": "Technical agronomists available to advise on correct application, dosage and timing.",
            "agri_cta_title": "Looking for a specific agricultural input?",
            "agri_cta_desc": "Our team will source it, import it, and deliver it to your farm — contact us today.",
            "agri_cta_contact": "Contact Our Team →",
            "agri_cta_services": "View Our Services",

            // Contact Page
            "contact_breadcrumb": "Home / Contacts",
            "contact_title_hero": "Contacts",
            "contact_hero_sub": "Have Questions? Get in Touch!",
            "contact_form_title": "Send Us a Message",
            "contact_form_desc": "Fill in the form below and our team will get back to you within 24 hours.",
            "contact_ph_name": "Your full name",
            "contact_ph_email": "your@email.com",
            "contact_ph_phone": "+20 xxx xxx xxxx",
            "contact_ph_subject": "What is this regarding?",
            "contact_ph_message": "Write your message here...",
            "contact_btn_send": "Send Message →",
            "contact_hours_title": "Open Hours",
            "contact_hours_1": "Saturday – Thursday: 9 AM – 6 PM",
            "contact_hours_2": "Friday: Closed",
            "contact_be_title": "Belgium Address",
            "contact_be_addr": "Avenue Pasteur, 23 — 1300 Wavre, Belgium",
            "contact_eg_hq_title": "Company Headquarters in Egypt",
            "contact_eg_hq_addr": "36 (A) Morad St., ELoda Masr Tower, Giza, Egypt",
            "contact_eg_branch_title": "Branch Address in Egypt",
            "contact_eg_branch_addr": "3 Cairo-Belbeis Desert Road, P.O. Box 3020, El Salam, 11785, Cairo, Egypt",
            "contact_get_in_touch_title": "Get In Touch",
            "contact_find_us_title": "Find Us",
            "contact_ready_title": "Ready to grow together?",
            "contact_ready_desc": "Explore our services and discover how Griland Egypt can support your agricultural goals.",
            "contact_btn_services": "Our Services →",
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
            "foot_getintouch": "تواصل معنا",
            
            // Agricultural Inputs Page
            "agri_breadcrumb": "الرئيسية / المدخلات الزراعية",
            "agri_title": "المدخلات الزراعية",
            "agri_subtitle": "البذور والأسمدة والمبيدات والآلات - كل ما تحتاجه أرضك",
            "agri_supply_eyebrow": "ما نوفره",
            "agri_supply_title": "حلول متكاملة للمدخلات الزراعية",
            "agri_supply_p1": "منذ عام 1923، أثبتت شركات مثل BayWa أن الرابط بين المزارعين ومنتجي الأغذية يمر عبر المدخلات الزراعية عالية الجودة. في جريلاند مصر، نحمل نفس الفلسفة — حيث نوفر للمزارعين، وملاك الأراضي، والمشغلين كل ما يلزم لإدارة عملية زراعية منتجة ومستدامة ومربحة. من البذور المعتمدة والأسمدة إلى منتجات وقاية المحاصيل والآلات الثقيلة، نقوم باستيراد وتوريد مجموعة كاملة من المدخلات الزراعية من شركاء دوليين موثوق بهم في جميع أنحاء أوروبا وآسيا.",
            "agri_supply_p2": "يتم الحصول على مدخلاتنا الزراعية من جهات تصنيع معترف بها عالميًا وتلبي معايير الجودة الدولية بما في ذلك شهادات ISO 9001 و GlobalG.A.P. و FDA — مما يضمن أن كل مدخل تتلقاه قابل للتتبع ومطابق ومثبت فعاليته.",
            "agri_trusted_badge": "طريقك للثقة منذ 1989",
            "agri_stat_years": "سنوات الثقة",
            "agri_stat_products": "منتجات",
            "agri_stat_partners": "شركاء دوليين",
            "agri_stat_categories": "فئات",
            "agri_range_eyebrow": "مجموعة مدخلاتنا",
            "agri_range_title": "أربع ركائز للمدخلات الزراعية",
            "agri_tab_seeds": "البذور",
            "agri_tab_fertilizers": "الأسمدة",
            "agri_tab_pesticides": "المبيدات",
            "agri_tab_machinery": "الآلات",
            "agri_seeds_banner_title": "بذور وشتلات معتمدة",
            "agri_seeds_banner_desc": "بذور عالية الإنتاجية ومقاومة للأمراض مصممة لتناسب التربة والمناخ المصري. مصادر موثوقة من أفضل المربين العالميين.",
            "agri_seeds_cat_veg": "الخضروات",
            "agri_seeds_veg_title": "بذور الخضروات",
            "agri_seeds_veg_desc": "مجموعة واسعة من بذور الخضروات الهجينة وغير الهجينة المقاومة للأمراض والفيروسات والحرارة. تغطي بذورنا المحاصيل الرئيسية بما في ذلك الطماطم والفلفل والخيار والخضروات الورقية — كلها معتمدة ومختبرة للمناخات المصرية والإقليمية.",
            "agri_origin": "🌍 المنشأ: أوروبا وآسيا",
            "agri_seeds_cat_fruit": "الفواكه",
            "agri_seeds_fruit_title": "بذور وشتلات الفواكه",
            "agri_seeds_fruit_desc": "أصناف محاصيل الفاكهة الممتازة بما في ذلك العنب (سوبيريور وفليم بدون بذور) والمانجو والحمضيات. يتم الحصول على بذور الفاكهة الخاصة بنا من مربيين أوروبيين معتمدين ويتم اختبارها لتحقيق أداء عالي الإنتاجية.",
            "agri_seeds_cat_field": "المحاصيل الحقلية",
            "agri_seeds_field_title": "بذور المحاصيل الحقلية",
            "agri_seeds_field_desc": "بذور معتمدة للقمح والذرة والشعير وغيرها من المحاصيل الحقلية الأساسية. تتوفر أصناف غير هجينة وهجينة، مع بيانات أداء موثقة عبر ظروف التربة المصرية.",
            "agri_fert_banner_title": "تغذية نباتية متطورة",
            "agri_fert_banner_desc": "أسمدة عضوية وكيميائية، ومغذيات دقيقة، ومحفزات حيوية مصممة لزيادة الإمكانات البيولوجية لمحصولك.",
            "agri_fert_cat_macro": "مغذيات كبرى",
            "agri_fert_npk_title": "أسمدة NPK",
            "agri_fert_npk_desc": "خلطات NPK كاملة تجمع بين النيتروجين والفوسفور والبوتاسيوم — المغذيات الكبرى الأساسية لنمو المحاصيل. تمت معايرة تركيبات NPK لتناسب التربة المصرية.",
            "agri_fert_cat_bio": "محفزات حيوية",
            "agri_fert_amino_title": "أحماض أمينية وحمض الهيوميك",
            "agri_fert_amino_desc": "يتضمن مزيج الأسمدة الفريد من جريلاند منظمات النمو والأحماض الأمينية وحمض الهيوميك — التي تعمل معًا لرفع كفاءة الإنتاج وجودة المحاصيل حتى في الأراضي المستصلحة حديثًا.",
            "agri_fert_cat_micro": "مغذيات دقيقة",
            "agri_fert_micro_title": "مزيج المغذيات الدقيقة",
            "agri_fert_micro_desc": "أسمدة المغذيات الدقيقة المخلبية بما في ذلك الزنك والحديد والمنغنيز والبورون. مصممة لتصحيح النقص وتحسين صحة النبات.",
            "agri_fert_cat_liquid": "تغذية سائلة",
            "agri_fert_liquid_title": "أسمدة سائلة",
            "agri_fert_liquid_desc": "تركيبات سائلة جاهزة للتطبيق للتغذية الورقية وأنظمة الري بالتسميد. مثالية للمحاصيل عالية القيمة التي تتطلب تغذية دقيقة وسريعة المفعول.",
            "agri_fert_cat_organic": "أسمدة عضوية",
            "agri_fert_organic_title": "أسمدة عضوية",
            "agri_fert_organic_desc": "أسمدة عضوية ذات أساس حيوي بما في ذلك الفيرمي كومبوست والتركيبات القائمة على السماد الطبيعي. تدعم الزراعة العضوية والمستدامة.",
            "agri_fert_cat_soil": "صحة التربة",
            "agri_fert_soil_title": "مصلحات ومحسنات التربة",
            "agri_fert_soil_desc": "منتجات تحسن بنية التربة واحتفاظها بالماء والنشاط الميكروبي. تشمل المحفزات الحيوية والمستخلصات الطبيعية.",
            "agri_pest_banner_title": "وقاية متكاملة للمحاصيل",
            "agri_pest_banner_desc": "مبيدات الأعشاب ومبيدات الفطريات وحلول الإدارة المتكاملة للآفات لحماية استثماراتك من الزراعة للحصاد.",
            "agri_pest_cat_fungi": "مبيدات فطرية",
            "agri_pest_fungi_title": "المبيدات الفطرية",
            "agri_pest_fungi_desc": "مبيدات فطرية جهازية وتلامسية لمكافحة اللفحة المتأخرة والبياض الزغبي والدقيقي. تشمل كولفيد 25% إي سي والعديد من المنتجات الوقائية والعلاجية.",
            "agri_pest_cat_insect": "مبيدات حشرية",
            "agri_pest_insect_title": "المبيدات الحشرية",
            "agri_pest_insect_desc": "مبيدات حشرية واسعة الطيف وانتقائية تستهدف الآفات الماصة للغذاء، الحشرات التي تتغذى على الأوراق، والمنتجات بآليات عمل مختلفة لمنع تطور المقاومة.",
            "agri_pest_cat_herb": "مبيدات الأعشاب",
            "agri_pest_herb_title": "المبيدات العشبية",
            "agri_pest_herb_desc": "مبيدات أعشاب انتقائية وغير انتقائية لمكافحة الحشائش في المحاصيل الحقلية والبستنة. تتوفر تركيبات قبل الانبثاق وبعد الانبثاق.",
            "agri_pest_cat_nema": "مبيدات النيماتودا",
            "agri_pest_nema_title": "مبيدات النيماتودا والعناكب",
            "agri_pest_nema_desc": "منتجات متخصصة لمكافحة الديدان الخيطية والعناكب — الآفات الرئيسية في إنتاج الخضروات والفواكه المصري. تتضمن منتجات مسجلة لشركات عالمية.",
            "agri_pest_cat_growth": "وقاية المحاصيل",
            "agri_pest_growth_title": "منظمات نمو النبات",
            "agri_pest_growth_desc": "منظمات النمو التي تدير نمو النبات، وعقد الثمار، والاستجابة للإجهاد. يتم تطبيقها لتحسين التجانس والإنتاجية وجودة ما بعد الحصاد.",
            "agri_pest_cat_bio": "المبيدات الحيوية",
            "agri_pest_bio_title": "المكافحة الحيوية",
            "agri_pest_bio_desc": "المبيدات الحيوية وعوامل المكافحة الطبيعية كبدائل مسؤولة بيئيا للكيماويات التقليدية. تدعم برامج الزراعة العضوية والمكافحة المتكاملة للآفات.",
            "agri_pest_registered": "تمتلك جريلاند مصر 31 منتجًا مبيدًا حشريًا مسجلًا لدى وزارة الزراعة المصرية.",
            "agri_mach_banner_title": "آلات ومعدات ثقيلة",
            "agri_mach_banner_desc": "جرارات وحصادات ومرفقات متخصصة مستوردة مباشرة من كبار المصنعين الأوروبيين.",
            "agri_mach_intro": "تستورد جريلاند مصر الجرارات الزراعية والمعدات الثقيلة من كبار المصنعين الأوروبيين. كما نسهل الوصول إلى الآلات المستعملة عالية الجودة من خلال شراكاتنا الدولية.",
            "agri_mach_cat_soil": "تحضير التربة",
            "agri_mach_tractor_title": "جرارات زراعية",
            "agri_mach_tractor_desc": "جرارات جديدة ومستعملة للحركة المستمرة عبر الأراضي الزراعية وللحراثة. مصنعة بمواصفات أوروبية تناسب ظروف الحقل المصري.",
            "agri_mach_cat_harvest": "عمليات الحصاد",
            "agri_mach_combine_title": "حصادات",
            "agri_mach_combine_desc": "حصادات ذات مواصفات كاملة للقمح والذرة والمحاصيل الحقلية الأخرى. لحلول الحصاد المتكاملة لأنواع المحاصيل المختلفة.",
            "agri_mach_cat_plant": "الغرس والزراعة",
            "agri_mach_drill_title": "البذارات وآلات الزراعة",
            "agri_mach_drill_desc": "بذارات بذور تقليدية ودقيقة لضمان أعداد نباتية مثالية والإنبات المتجانس لتعظيم قدرة الإنتاج من اليوم الأول.",
            "agri_mach_cat_protect": "أعمال الرش",
            "agri_mach_sprayer_title": "رشاشات ومعدات التطبيق",
            "agri_mach_sprayer_desc": "رشاشات مقطورة وذاتية الدفع لتطبيق المبيدات والأسمدة. تمت معايرتها لمعدلات توصيل دقيقة لتقليل الهدر وضمان تغطية متساوية.",
            "agri_mach_cat_tillage": "أعمال التربة",
            "agri_mach_harrow_title": "أمشاط قرصية ومحاريث",
            "agri_mach_harrow_desc": "معدات الحراثة تتضمن أمشاط قرصية ومحاريث ومهيئات لمهد البذور. للتحضير الأولي والثانوي للتربة عبر جميع دورات المحاصيل.",
            "agri_mach_cat_post": "ما بعد الحصاد",
            "agri_mach_loader_title": "روافع شوكية وغيرها",
            "agri_mach_loader_desc": "معدات مناولة المواد الخاصة بلوجستيات المزارع والتخزين المبرد وعمليات ما بعد الحصاد. بما في ذلك الرافعات الشوكية الكهربائية والرافعات.",
            "agri_why_eyebrow": "لماذا تختارنا",
            "agri_why_title": "وعد جودة جريلاند",
            "agri_why1_title": "موارد دولية",
            "agri_why1_desc": "مستورد من أكبر الوكالات في أوروبا وآسيا بسجلات مثبتة.",
            "agri_why2_title": "مسجل حكوميا",
            "agri_why2_desc": "31 منتجًا مسجلاً لدى وزارة الزراعة المصرية للتوافق القانوني.",
            "agri_why3_title": "معتمد وموثوق",
            "agri_why3_desc": "تتوافق كافة المدخلات مع معايير الآيزو وGlobalG.A.P. وFDA وKosher / Halal.",
            "agri_why4_title": "دعم المزارع أولاً",
            "agri_why4_desc": "مهندسون زراعيون فنيون متاحون لتقديم النصيحة بشأن التطبيق والجرعة والمواعيد.",
            "agri_cta_title": "هل تبحث عن مدخل زراعي معين؟",
            "agri_cta_desc": "فريقنا سوف يبحث عنه ويستورده ويوصله إلى مزرعتك — اتصل بنا اليوم.",
            "agri_cta_contact": "تواصل مع فريقنا ←",
            "agri_cta_services": "اعرض خدماتنا",

            // صفحة اتصل بنا
            "contact_breadcrumb": "الرئيسية / اتصل بنا",
            "contact_title_hero": "اتصل بنا",
            "contact_hero_sub": "هل لديك أسئلة؟ تواصل معنا!",
            "contact_form_title": "أرسل لنا رسالة",
            "contact_form_desc": "املأ النموذج أدناه وسيقوم فريقنا بالرد عليك خلال 24 ساعة.",
            "contact_ph_name": "اسمك الكامل",
            "contact_ph_email": "البريد الإلكتروني",
            "contact_ph_phone": "+20 xxx xxx xxxx",
            "contact_ph_subject": "بخصوص ماذا؟",
            "contact_ph_message": "اكتب رسالتك هنا...",
            "contact_btn_send": "إرسال الرسالة ←",
            "contact_hours_title": "ساعات العمل",
            "contact_hours_1": "السبت – الخميس: 9 صباحاً – 6 مساءً",
            "contact_hours_2": "الجمعة: مغلق",
            "contact_be_title": "عنوان بلجيكا",
            "contact_be_addr": "Avenue Pasteur, 23 — 1300 Wavre, Belgium",
            "contact_eg_hq_title": "المكتب الرئيسي في مصر",
            "contact_eg_hq_addr": "36 (أ) شارع مراد، برج الهدى مصر، الجيزة، مصر",
            "contact_eg_branch_title": "عنوان الفرع في مصر",
            "contact_eg_branch_addr": "3 طريق القاهرة بلبيس الصحراوي، ص.ب 3020، السلام، 11785، القاهرة، مصر",
            "contact_get_in_touch_title": "تواصل معنا",
            "contact_find_us_title": "اعثر علينا",
            "contact_ready_title": "هل أنت مستعد للنمو معاً؟",
            "contact_ready_desc": "استكشف خدماتنا واكتشف كيف يمكن لجريلاند مصر دعم أهدافك الزراعية.",
            "contact_btn_services": "خدماتنا ←",
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

        }
    };

    let currentLang = localStorage.getItem('griland_lang') || 'en';
    const langBtnDesktop = document.getElementById('lang-toggle');
    const langBtnMobile = document.getElementById('lang-toggle-mobile');

    function applyLanguage(lang) {
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = lang;

        const nextLangText = lang === 'en' ? 'عربي' : 'English';
        if(langBtnDesktop) langBtnDesktop.innerText = nextLangText;
        if(langBtnMobile) langBtnMobile.innerText = nextLangText;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if(el.tagName === 'STRONG') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
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

    if(langBtnDesktop) langBtnDesktop.addEventListener('click', toggleLanguage);
    if(langBtnMobile) langBtnMobile.addEventListener('click', toggleLanguage);

});
