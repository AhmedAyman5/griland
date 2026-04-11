/* agri-inputs/js/script.js */
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.agri-page .reveal').forEach(el => observer.observe(el));

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = 'tab-' + btn.getAttribute('data-tab');
            const content = document.getElementById(targetId);
            if(content) {
                content.classList.add('active');
            }
        });
    });

    // Make sure first tab is active on load
    const firstBtn = document.querySelector('.tab-btn');
    if (firstBtn) {
        firstBtn.classList.add('active');
        const firstTargetId = 'tab-' + firstBtn.getAttribute('data-tab');
        const firstContent = document.getElementById(firstTargetId);
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }
});
