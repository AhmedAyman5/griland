// Functionality specific to Food Processing page

document.addEventListener("DOMContentLoaded", () => {
    
    // Highlight "Food Processing" link in the dynamically injected navbar
    // Use a small delay to ensure navbar.js has inserted the HTML into the DOM
    setTimeout(() => {
        const navLinks = document.querySelectorAll('#navbar a, #mobile-drawer a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.includes('food_processing') || href.includes('food-processing')) {
                // Add gold text and full width bottom border for desktop
                link.classList.remove('hover:text-primary', 'after:w-0');
                // The prompt specified "active nav link 'Food Processing' must have a gold bottom border"
                // Using the theme's text-cert-accent (#C9A84C) and after:bg-cert-accent just to be safe
                link.classList.add('text-cert-accent');
                
                // Force the bottom border to stay full width
                if (link.className.includes('after:')) {
                    link.classList.add('after:w-full');
                    // Modify the border color to gold for exactly this link instead of primary green
                    link.classList.remove('after:bg-primary');
                    link.classList.add('after:bg-cert-accent');
                }
            }
        });
    }, 150);

    // 1. SCROLL REVEAL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. PRODUCT FILTER
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset all buttons
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-cert-primary', 'text-white');
                b.classList.add('text-cert-primary', 'hover:bg-cert-primary/10');
            });
            
            // Set active styles to clicked button
            btn.classList.remove('text-cert-primary', 'hover:bg-cert-primary/10');
            btn.classList.add('active', 'bg-cert-primary', 'text-white');
            
            // Filter cards
            const filter = btn.dataset.filter;
            document.querySelectorAll('.product-card').forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                if (show) {
                    card.style.display = 'block';
                    // small animation trigger
                    card.classList.remove('opacity-0', 'scale-95');
                    card.classList.add('opacity-100', 'scale-100');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('opacity-100', 'scale-100');
                    card.classList.add('opacity-0', 'scale-95');
                }
            });
        });
    });

    // 3. SMOOTH SCROLL for anchor buttons
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
