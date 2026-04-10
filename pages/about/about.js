function setExpanded(el, expanded) {
    if (!el) return;
    el.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function closeEl(el) {
    if (!el) return;
    el.classList.add("hidden");
}

function openEl(el) {
    if (!el) return;
    el.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    // Desktop services dropdown
    const dropdownBtn = document.getElementById("servicesDropdownBtn");
    const dropdownMenu = document.getElementById("servicesDropdownMenu");

    function setDropdown(open) {
        if (!dropdownBtn || !dropdownMenu) return;
        setExpanded(dropdownBtn, open);
        if (open) openEl(dropdownMenu);
        else closeEl(dropdownMenu);
    }

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isOpen = dropdownBtn.getAttribute("aria-expanded") === "true";
            setDropdown(!isOpen);
        });

        document.addEventListener("click", (e) => {
            const target = e.target;
            const within = dropdownMenu.contains(target) || dropdownBtn.contains(target);
            if (!within) setDropdown(false);
        });
    }

    // Mobile menu + mobile services
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileServicesToggle = document.getElementById("mobileServicesToggle");
    const mobileServicesMenu = document.getElementById("mobileServicesMenu");

    function setMobileMenu(open) {
        if (!mobileMenuBtn || !mobileMenu) return;
        setExpanded(mobileMenuBtn, open);
        if (open) openEl(mobileMenu);
        else closeEl(mobileMenu);
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            const isOpen = mobileMenuBtn.getAttribute("aria-expanded") === "true";
            setMobileMenu(!isOpen);
        });

        mobileMenu.addEventListener("click", (e) => {
            const a = e.target.closest("a");
            if (a) setMobileMenu(false);
        });
    }

    function setMobileServices(open) {
        if (!mobileServicesToggle || !mobileServicesMenu) return;
        setExpanded(mobileServicesToggle, open);
        if (open) openEl(mobileServicesMenu);
        else closeEl(mobileServicesMenu);
    }

    if (mobileServicesToggle && mobileServicesMenu) {
        mobileServicesToggle.addEventListener("click", () => {
            const isOpen = mobileServicesToggle.getAttribute("aria-expanded") === "true";
            setMobileServices(!isOpen);
        });
    }

    // Scroll reveal
    const revealEls = Array.from(document.querySelectorAll(".reveal[data-reveal]"));
    if (revealEls.length > 0) {
        revealEls.forEach((el, idx) => {
            const delayMs = Math.min(idx * 60, 420);
            el.style.transitionDelay = delayMs + "ms";
        });

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("in");
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.15 }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    }

    // About slider
    const aboutSliderImage = document.getElementById("aboutSliderImage");
    const aboutPrev = document.getElementById("aboutPrevSlide");
    const aboutNext = document.getElementById("aboutNextSlide");

    if (aboutSliderImage && aboutPrev && aboutNext) {
        const slides = [
            "images/photo-15.avif",
            "images/photo-152.avif",
            "images/ph2.avif",
        ];

        let current = 0;

        function renderSlide(idx) {
            current = (idx + slides.length) % slides.length;
            aboutSliderImage.src = slides[current];
        }

        aboutPrev.addEventListener("click", () => renderSlide(current - 1));
        aboutNext.addEventListener("click", () => renderSlide(current + 1));

        setInterval(() => renderSlide(current + 1), 4500);
    }
});
