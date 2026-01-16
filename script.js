// Initialize EmailJS
emailjs.init('IUtDCnfrO3kIOscw0');

// Particle Animation with Section-specific Colors
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 150; // Increased from 80
let currentSection = 'home';

// Enhanced color schemes for different sections with more vibrant colors
const sectionColors = {
    home: { r: 99, g: 102, b: 241 },           // Purple-Blue
    about: { r: 139, g: 92, b: 246 },          // Purple
    education: { r: 59, g: 130, b: 246 },      // Blue
    skills: { r: 168, g: 85, b: 247 },         // Violet
    projects: { r: 34, g: 211, b: 238 },       // Cyan
    certifications: { r: 251, g: 146, b: 60 }, // Orange
    contact: { r: 236, g: 72, b: 153 }         // Pink
};

let targetColor = sectionColors.home;
let currentColor = { ...targetColor };

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Varied sizes (1-4px)
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.opacity = Math.random() * 0.6 + 0.3; // More visible (0.3-0.9)
        
        // Add color variation to each particle
        this.colorVariation = {
            r: (Math.random() - 0.5) * 50,
            g: (Math.random() - 0.5) * 50,
            b: (Math.random() - 0.5) * 50
        };
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        // Apply color variation to each particle for more vibrant effect
        const r = Math.max(0, Math.min(255, currentColor.r + this.colorVariation.r));
        const g = Math.max(0, Math.min(255, currentColor.g + this.colorVariation.g));
        const b = Math.max(0, Math.min(255, currentColor.b + this.colorVariation.b));
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// function connectParticles() {
//     for (let a = 0; a < particlesArray.length; a++) {
//         for (let b = a; b < particlesArray.length; b++) {
//             const dx = particlesArray[a].x - particlesArray[b].x;
//             const dy = particlesArray[a].y - particlesArray[b].y;
//             const distance = Math.sqrt(dx * dx + dy * dy);

//             if (distance < 120) { // Increased connection distance
//                 const opacity = 0.3 - distance / 400;
                
//                 // Add color variation to connections
//                 const gradient = ctx.createLinearGradient(
//                     particlesArray[a].x, particlesArray[a].y,
//                     particlesArray[b].x, particlesArray[b].y
//                 );
                
//                 gradient.addColorStop(0, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacity})`);
//                 gradient.addColorStop(1, `rgba(${currentColor.r + 30}, ${currentColor.g + 30}, ${currentColor.b + 30}, ${opacity})`);
                
//                 ctx.strokeStyle = gradient;
//                 ctx.lineWidth = 1.5;
//                 ctx.beginPath();
//                 ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//                 ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//                 ctx.stroke();
//             }
//         }
//     }
// }

// Smooth color transition
function lerpColor() {
    const speed = 0.05;
    currentColor.r += (targetColor.r - currentColor.r) * speed;
    currentColor.g += (targetColor.g - currentColor.g) * speed;
    currentColor.b += (targetColor.b - currentColor.b) * speed;
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    lerpColor();

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    // connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation on Scroll + Particle Color Change
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
            
            // Change particle color based on section
            if (sectionColors[sectionId] && currentSection !== sectionId) {
                currentSection = sectionId;
                targetColor = sectionColors[sectionId];
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .cert-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contact Form with EmailJS
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;

    try {
        const name = contactForm.from_name.value;
        const email = contactForm.from_email.value;
        const subject = contactForm.subject.value;
        const message = contactForm.message.value;

        const templateParams = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            title: 'New Portfolio Contact',
            time: new Date().toLocaleString()
        };

        const response = await emailjs.send(
            'service_x2b6yag',
            'template_0or8crh',
            templateParams
        );

        if (response.status === 200) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            contactForm.reset();
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Oops! Something went wrong. Please try again or email me directly at najmularifeen786@gmail.com';
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// Typing Effect for Hero Slogan (Optional Enhancement)
// Advanced Typing Effect for "I am a..."
const typingTextElement = document.querySelector('.typing-text');
const roles = ["Software Engineer", "Front-end Developer", "Problem Solver", "Learner"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is faster
    } else {
        // Typing text
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Typing normal speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing word, pause before deleting
        isDeleting = true;
        typeSpeed = 2000; // Wait 2 seconds before deleting
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, switch to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect
if (typingTextElement) {
    setTimeout(typeEffect, 1000);
}
// Add dynamic year to footer
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Najmul Arifeen. All rights reserved.`;
}

console.log('%c🚀 Portfolio loaded successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Najmul Arifeen', 'color: #8b5cf6; font-size: 14px;');