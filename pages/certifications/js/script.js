// certifications/js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. SCROLL REVEAL (Certifications)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.cert-page .reveal').forEach(el => observer.observe(el));
});
