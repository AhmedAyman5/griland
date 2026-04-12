(function() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    
    const basePath = placeholder.getAttribute('data-basepath') || './';
    
    const html = `
    <!-- 16. Footer -->
    <footer id="footer" class="bg-[#1B3A2D] text-white pt-12 pb-4 px-6 sm:px-10 mt-auto">
        <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            <!-- Col 1: Brand -->
            <div>
                <a href="${basePath}index.html" class="flex flex-col items-start group">
                    <img src="${basePath}images/logo/footer-logo.png" alt="Agriland Egypt Footer Logo"
                        class="h-20 md:h-28 object-contain group-hover:scale-105 transition-transform mb-4">
                </a>
                <p class="text-white/70 text-sm leading-relaxed mt-2" data-i18n="foot_tagline">
                    Together, let's give value to your farmland.
                </p>
                <div class="flex gap-4 mt-6">
                    <a href="#"
                        class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><i
                            class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"
                        class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><i
                            class="fa-brands fa-twitter"></i></a>
                    <a href="#"
                        class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><i
                            class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>

            <!-- Col 2: Belgium -->
            <div>
                <h4 class="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-3"><i
                        class="fa-solid fa-location-dot text-primary"></i> <span data-i18n="foot_belgium_title">Belgium
                        Address</span></h4>
                <div class="text-white/70 text-sm space-y-2">
                    <p class="font-semibold text-white" data-i18n="foot_belgium_o">European Administrative Office</p>
                    <p data-i18n="foot_belgium_addr">Avenue Louise, 1050 Brussels, Belgium</p>
                    <p><a href="tel:+32010232999" class="hover:text-primary transition-colors">+32 (0) 10232999</a></p>
                </div>
            </div>

            <!-- Col 3: Egypt HQ -->
            <div>
                <h4 class="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-3"><i
                        class="fa-solid fa-building text-primary"></i> <span data-i18n="foot_egypt_title">Company HQ
                        (Egypt)</span></h4>
                <div class="text-white/70 text-sm space-y-2">
                    <p data-i18n="foot_egypt_addr">36 (A) Morad St., ELoda masr tower, Giza, Egypt</p>
                    <p><a href="tel:+201141116282" class="hover:text-primary transition-colors">+201141116282</a></p>
                </div>
                <div class="mt-6 text-white/70 text-sm space-y-2">
                    <p class="font-bold flex items-center gap-2 text-white mb-2"><i
                            class="fa-solid fa-envelope text-primary"></i> <span data-i18n="foot_email">Get In
                            Touch</span></p>
                    <a href="mailto:info@agrilandeg.com"
                        class="hover:text-primary transition-colors block">info@agrilandeg.com</a>
                    <a href="mailto:manager@grilandeg.com"
                        class="hover:text-primary transition-colors block">manager@grilandeg.com</a>
                </div>
            </div>

            <!-- Col 4: Branch -->
            <div>
                <h4 class="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-3"><i
                        class="fa-solid fa-code-branch text-primary"></i> <span data-i18n="foot_branch_title">Branch
                        address (Egypt)</span></h4>
                <div class="text-white/70 text-sm space-y-2">
                    <p data-i18n="foot_branch_addr">3 Cairo-Belbeis Desert Road, P.O. Box: 3020 El Salam, 11785, Cairo
                    </p>
                    <p><a href="tel:0222655550" class="hover:text-primary transition-colors">0222655550</a> / <a
                            href="tel:+201114515550" class="hover:text-primary transition-colors">+201114515550</a></p>
                </div>
            </div>
        </div>

        <div class="pt-6 border-t border-white/10 text-center text-white/50 text-xs">
            <p data-i18n="copy_right">COPY RIGHT &copy; GRILAND EGYPT. All Rights Reserved.</p>
        </div>
    </footer>
    `;

    placeholder.innerHTML = html;
})();
