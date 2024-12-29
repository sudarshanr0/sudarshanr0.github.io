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

// Toggle dark and light modes
const toggleButton = document.querySelector('.toggle-button'); // Ensure this button exists in your HTML

toggleButton.addEventListener('click', () => {
    const body = document.body;

    // Toggle the classes on the body
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.textContent = 'Toggle to Dark Mode'; // Update button text
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Toggle to Light Mode'; // Update button text
    }
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
