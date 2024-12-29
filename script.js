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



/*
// Toggle dark and light modes
const toggleButton = document.querySelector('.toggle-button');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    // Update button text based on current mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    toggleButton.textContent = isDarkMode ? 'Toggle to Light Mode' : 'Toggle to Dark Mode';
});  */

// Select the toggle button
const toggleButton = document.querySelector('.toggle-button');

// Add event listener for the toggle functionality
toggleButton.addEventListener('click', () => {
    // Toggle the classes on the body element
    const body = document.body;

    // Check current mode and switch
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.textContent = 'Toggle to Dark Mode';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Toggle to Light Mode';
    }
});


/*

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
*/
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
