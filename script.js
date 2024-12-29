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

// Dark Mode Toggle
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Dark Mode';
toggleButton.classList.add('toggle-button');
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.classList.toggle('dark-mode');
});

// Form Validation (For Contact Form)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting

        // Get form fields
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameInput = document.getElementById('name'); // Assuming a name field exists
        const subjectInput = document.getElementById('subject'); // Assuming a subject field exists

        // Validation Patterns
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate Fields
        let errors = [];

        if (!nameInput.value.trim()) {
            errors.push("Name is required.");
        }

        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
            errors.push("A valid email address is required.");
        }

        if (!subjectInput.value.trim()) {
            errors.push("Subject is required.");
        }

        if (!messageInput.value.trim()) {
            errors.push("Message cannot be empty.");
        }

        if (errors.length > 0) {
            // Display errors
            alert(errors.join("\n"));
            return;
        }

        // Simulate form submission
        alert("Thank you for reaching out! Your message has been sent.");
        contactForm.reset(); // Reset the form fields
    });
}

// Back to Top Button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show the button when the user scrolls down
window.onscroll = function () {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add('show-btn');
    } else {
        backToTopButton.classList.remove('show-btn');
    }
};

// Scroll to the top when the button is clicked
backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
});
