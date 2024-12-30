document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Load theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.textContent = savedTheme === "dark-mode" ? "Toggle to Light Mode" : "Toggle to Dark Mode";
    } else if (userPrefersDark) {
        body.classList.add("dark-mode");
        themeToggle.textContent = "Toggle to Light Mode";
    } else {
        body.classList.add("light-mode");
        themeToggle.textContent = "Toggle to Dark Mode";
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.replace("dark-mode", "light-mode");
            themeToggle.textContent = "Toggle to Dark Mode";
            localStorage.setItem("theme", "light-mode");
        } else {
            body.classList.replace("light-mode", "dark-mode");
            themeToggle.textContent = "Toggle to Light Mode";
            localStorage.setItem("theme", "dark-mode");
        }
    });
});






// Smooth Scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60, // Adjust scroll position (for fixed nav bar)
            behavior: 'smooth'
        });
    });
});


// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top'); // Ensure the button exists

// Show the button when the user scrolls down
window.onscroll = function () {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add('show-btn');
    } else {
        backToTopButton.classList.remove('show-btn');
    }
};

// Scroll to the top when the button is clicked
backToTopButton.add
