// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-element').forEach(el => observer.observe(el));

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Contact Form with EmailJS
function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const status = document.getElementById('formStatus');
    const submitButton = document.querySelector('.contact-form .btn-primary');

    // Validation
    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields!';
        status.style.color = '#ef4444';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        status.textContent = 'Please enter a valid email address!';
        status.style.color = '#ef4444';
        return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    status.textContent = '';

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_x2b6yag';
    const templateID = 'template_0or8crh';
    const publicKey = 'IUtDCnfrO3kIOscw0';

    const templateParams = {
        name: name,
        email: email,
        message: message,
        title: 'New Portfolio Contact',
        time: new Date().toLocaleString()
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
            status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            status.style.color = '#10b981';
            
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Clear status after 5 seconds
            setTimeout(() => {
                status.textContent = '';
            }, 5000);
        })
        .catch((error) => {
            console.error('Email send failed:', error);
            status.textContent = 'Failed to send message. Please try again or email me directly.';
            status.style.color = '#ef4444';
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
}
// Force mailto links to work
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        window.location.href = this.getAttribute('href');
    });
});