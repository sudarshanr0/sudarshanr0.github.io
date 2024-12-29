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

        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (emailInput.value === "" || messageInput.value === "") {
            alert("Please fill in both the email and message fields.");
        } else {
            alert("Form submitted successfully!");
            // Reset form
            contactForm.reset();
        }
    });
}
