document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Load theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeToggleText(savedTheme);
    } else if (userPrefersDark) {
        body.classList.add("dark-mode");
        updateThemeToggleText("dark-mode");
    } else {
        body.classList.add("light-mode");
        updateThemeToggleText("light-mode");
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
        body.className = newTheme; // Clear and add only the new theme class
        updateThemeToggleText(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    function updateThemeToggleText(theme) {
        themeToggle.textContent = theme === "dark-mode" ? "Toggle to Light Mode" : "Toggle to Dark Mode";
    }
});

// Smooth Scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = targetElement.offsetTop - 60; // Adjust scroll position (for fixed nav bar)
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top');

// Debounce for better performance during scroll
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 200) {
            backToTopButton.classList.add('show-btn');
        } else {
            backToTopButton.classList.remove('show-btn');
        }
    }, 100); // Add a small delay to reduce excessive calls
});

// Scroll to the top when the button is clicked
if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
