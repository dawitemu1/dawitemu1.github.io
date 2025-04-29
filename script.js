// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#fff';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

// Skills animation
const skillBars = document.querySelectorAll('.progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill bars animation
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let lastScrollTop = 0;

    if (hamburger && navLinks) {
        // Toggle menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Handle scroll behavior
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.querySelector('.navbar');
            
            // Add shadow when scrolled
            if (currentScroll > 0) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scrolling down & past navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });

        // Close menu on resize if open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});

// Read More Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const expandableContent = document.querySelector('.expandable-content');

    if (readMoreBtn && expandableContent) {
        readMoreBtn.addEventListener('click', function() {
            expandableContent.classList.toggle('active');
            readMoreBtn.textContent = expandableContent.classList.contains('active') ? 'See Less' : 'See More';
        });
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const sendingOverlay = document.getElementById('sending-overlay');
    
    // Hide any existing messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    sendingOverlay.classList.add('show');
    
    // Send email using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(() => {
            // Show success message
            successMessage.classList.add('show');
            
            // Clear form
            form.reset();
            
            // Hide loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            sendingOverlay.classList.remove('show');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        })
        .catch((error) => {
            console.error('Email Error:', error);
            
            // Show error message
            errorMessage.classList.add('show');
            
            // Hide loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            sendingOverlay.classList.remove('show');
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 5000);
        });
});

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').innerHTML = `&copy; ${currentYear} Dawit Shibabaw Bogale. All rights reserved.`;
});
