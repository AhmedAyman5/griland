(function() {
    const placeholder = document.getElementById('navigation-placeholder');
    if (!placeholder) return;
    
    const basePath = placeholder.getAttribute('data-basepath') || './';
    
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath.endsWith('griland');
    const isAbout = currentPath.includes('/about.html');
    const isCert = currentPath.includes('/certification.html');

    const homeActive = isHome ? "text-primary" : "hover:text-primary";
    const homeAfter = isHome ? "after:w-full" : "after:w-0";

    const aboutActive = isAbout ? "text-primary" : "hover:text-primary";
    const aboutAfter = isAbout ? "after:w-full" : "after:w-0";

    const certActive = isCert ? "text-primary" : "hover:text-primary";
    const certAfter = isCert ? "after:w-full" : "after:w-0";

    const html = `
    <!-- 1. Navbar -->
    <nav id="navbar"
        class="fixed top-0 w-full bg-transparent text-white z-50 transition-all duration-300 py-1 px-6 md:px-10">
        <div class="max-w-[1200px] mx-auto flex items-center justify-between shadow-sm">
            <!-- Logo -->
            <a href="${basePath}index.html" class="flex items-center group">
                <img src="${basePath}images/logo/logo1.png" alt="Agriland Egypt"
                    class="h-20 md:h-24 object-contain group-hover:scale-105 transition-transform">
            </a>

            <!-- Desktop Links -->
            <ul class="hidden md:flex items-center gap-8 font-semibold text-[15px]">
                <li><a href="${basePath}index.html"
                        class="transition-colors ${homeActive} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 ${homeAfter} hover:after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300"
                        data-i18n="nav_home">Home</a>
                </li>
                <li><a href="${basePath}pages/about/about.html"
                        class="transition-colors ${aboutActive} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 ${aboutAfter} hover:after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300"
                        data-i18n="nav_about">About</a></li>
                <li class="relative group">
                    <a href="${basePath}index.html#services"
                        class="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300">
                        <span data-i18n="nav_services">Service</span>
                        <i class="fa-solid fa-chevron-down text-[10px]"></i>
                    </a>
                    <!-- Dropdown -->
                    <ul
                        class="absolute top-full start-0 mt-2 bg-white text-dark shadow-lg rounded-md w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col py-2 border border-border">
                        <li><a href="${basePath}index.html#machinery"
                                class="px-4 py-2 hover:bg-light hover:text-primary block transition-colors"
                                data-i18n="nav_machinery">Machinery & Equipment</a></li>
                        <li><a href="${basePath}index.html#agri_inputs"
                                class="px-4 py-2 hover:bg-light hover:text-primary block transition-colors"
                                data-i18n="nav_agri_inputs">Agri-Inputs</a></li>
                        <li><a href="${basePath}index.html#farms_production"
                                class="px-4 py-2 hover:bg-light hover:text-primary block transition-colors"
                                data-i18n="nav_farms_production">Farms & Production</a></li>
                        <li><a href="${basePath}index.html#food_processing"
                                class="px-4 py-2 hover:bg-light hover:text-primary block transition-colors"
                                data-i18n="nav_food_processing">Food Processing</a></li>
                        <li><a href="${basePath}index.html#trade_export"
                                class="px-4 py-2 hover:bg-light hover:text-primary block transition-colors"
                                data-i18n="nav_trade_export">Trade & Export</a></li>
                    </ul>
                </li>
                <li><a href="${basePath}pages/certifications/certification.html"
                        class="transition-colors ${certActive} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 ${certAfter} hover:after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300"
                        data-i18n="nav_certificates">Certificates</a></li>
                <li><a href="${basePath}index.html#footer"
                        class="hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all after:duration-300"
                        data-i18n="nav_contact">Contact</a>
                </li>

                <!-- Language Switcher -->
                <li>
                    <button id="lang-toggle"
                        class="bg-light text-dark px-3 py-1 rounded-full text-sm font-bold border border-border hover:bg-primary hover:text-white transition-colors">
                        عربي
                    </button>
                </li>
            </ul>

            <!-- Mobile Menu Btn -->
            <button id="mobile-menu-btn" class="md:hidden text-2xl hover:text-primary transition-colors">
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>
    </nav>

    <!-- Mobile Drawer -->
    <div id="mobile-drawer"
        class="fixed inset-y-0 start-0 w-64 bg-white z-[60] transform -translate-x-full rtl:translate-x-full transition-transform duration-300 shadow-2xl flex flex-col md:hidden">
        <div class="p-6 flex justify-between items-center border-b border-border">
            <img src="${basePath}images/logo/logo1.png" alt="Agriland Egypt" class="h-16 md:h-20 object-contain">
            <div class="flex items-center gap-4">
                <button id="lang-toggle-mobile"
                    class="bg-light text-dark px-3 py-1 rounded-full text-xs font-bold border border-border hover:bg-primary hover:text-white transition-colors">
                    عربي
                </button>
                <button id="close-drawer" class="text-2xl text-dark hover:text-primary"><i
                        class="fa-solid fa-times"></i></button>
            </div>
        </div>
        <div class="p-6 flex flex-col gap-4 text-lg font-semibold overflow-y-auto">
            <a href="${basePath}index.html" class="mobile-link ${isHome ? 'text-primary' : 'hover:text-primary'}" data-i18n="nav_home">Home</a>
            <a href="${basePath}pages/about/about.html" class="mobile-link ${isAbout ? 'text-primary' : 'hover:text-primary'}" data-i18n="nav_about">About</a>
            <div class="border-y border-border py-4 my-2 flex flex-col gap-3">
                <span class="text-muted text-sm uppercase" data-i18n="nav_services">Service</span>
                <a href="${basePath}index.html#machinery" class="mobile-link hover:text-primary text-base ps-4" data-i18n="nav_machinery">-
                    Machinery & Equipment</a>
                <a href="${basePath}index.html#agri_inputs" class="mobile-link hover:text-primary text-base ps-4"
                    data-i18n="nav_agri_inputs">- Agri-Inputs</a>
                <a href="${basePath}index.html#farms_production" class="mobile-link hover:text-primary text-base ps-4"
                    data-i18n="nav_farms_production">- Farms & Production</a>
                <a href="${basePath}index.html#food_processing" class="mobile-link hover:text-primary text-base ps-4"
                    data-i18n="nav_food_processing">- Food Processing</a>
                <a href="${basePath}index.html#trade_export" class="mobile-link hover:text-primary text-base ps-4"
                    data-i18n="nav_trade_export">- Trade & Export</a>
            </div>
            <a href="${basePath}pages/certifications/certification.html" class="mobile-link ${isCert ? 'text-primary' : 'hover:text-primary'}" data-i18n="nav_certificates">Certificates</a>
            <a href="${basePath}index.html#footer" class="mobile-link hover:text-primary" data-i18n="nav_contact">Contact</a>
        </div>
    </div>
    <!-- Drawer Overlay -->
    <div id="drawer-overlay" class="fixed inset-0 bg-black/50 z-[55] opacity-0 invisible transition-all duration-300 md:hidden">
    </div>
    `;

    placeholder.innerHTML = html;
})();
