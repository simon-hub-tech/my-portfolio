document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function updateThemeIcon() {
        if (!themeIcon) return;

        const isDark = root.classList.contains("dark");

        themeIcon.className = isDark
            ? "fas fa-sun"
            : "fas fa-moon";
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        root.classList.toggle("dark");

        const theme = root.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("portfolio-theme", theme);
        updateThemeIcon();
    });

    // Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMenu() {
        navLinks?.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");

        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Active navigation links
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let currentSection = "home";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 140) {
                currentSection = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Automatic footer year
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Contact form
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form?.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const subject = form.elements.subject.value.trim();
        const message = form.elements.message.value.trim();

        const body = `Name: ${name}
Email: ${email}

${message}`;

        const mailto = `mailto:simiyu.simon212@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (status) {
            status.textContent =
                "Opening your email application. You can also email me directly at simiyu.simon212@gmail.com.";
        }

        window.location.href = mailto;
    });
});