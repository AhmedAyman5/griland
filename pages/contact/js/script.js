document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-page .reveal').forEach(el => observer.observe(el));

    // Form Submission (Simulated)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            this.innerHTML = '<div class="text-center py-12"><div class="text-5xl mb-4">✅</div><h3 class="text-xl font-semibold text-[#1B4332] font-serif" data-i18n="contact_msg_sent">Message Sent!</h3><p class="text-gray-500 text-sm mt-2" data-i18n="contact_msg_desc">Thank you for reaching out. We will get back to you within 24 hours.</p></div>';
            
            // Handle RTL translations if available
            if (typeof toggleLanguage !== 'undefined') {
                const currentLang = document.documentElement.getAttribute('lang') || 'en';
                const isRtl = currentLang === 'ar';
                
                const keys = {
                   'contact_msg_sent': isRtl ? 'تم إرسال الرسالة!' : 'Message Sent!',
                   'contact_msg_desc': isRtl ? 'شكرا لتواصلك معنا. سنقوم بالرد عليك في غضون 24 ساعة.' : 'Thank you for reaching out. We will get back to you within 24 hours.'
                }
                const els = this.querySelectorAll('[data-i18n]');
                els.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (keys[key]) el.innerHTML = keys[key];
                });
            }
        });
    }
});
