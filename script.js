document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    if (!themeToggle) {
        return;
    }

    // Helper to set the theme while clearing previous modifiers
    const applyTheme = (theme) => {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(theme);
        themeToggle.textContent = theme === "dark-mode" ? "Toggle to Light Mode" : "Toggle to Dark Mode";
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (userPrefersDark) {
        applyTheme("dark-mode");
    } else {
        applyTheme("light-mode");
    }

    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
        applyTheme(newTheme);
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button handling with basic debounce
const backToTopButton = document.getElementById('back-to-top');
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (!backToTopButton) {
        return;
    }

    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolled > 240) {
            backToTopButton.classList.add('show-btn');
        } else {
            backToTopButton.classList.remove('show-btn');
        }
    }, 120);
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
