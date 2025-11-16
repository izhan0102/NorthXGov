// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Contact Form Handling is now handled by the enhanced form below

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Service Slider Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.service-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 3 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 3000);

        // Manual slide control via indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .service-card, 
        .team-member, 
        .why-item, 
        .process-step, 
        .pricing-card,
        .serve-item,
        .approach-item
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add loading animation to CTA buttons
    document.querySelectorAll('.btn-primary-large, .nav-cta').forEach(button => {
        button.addEventListener('click', function (e) {
            // Only add loading effect if it's not a form submit or external link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = e.offsetX + 'px';
                ripple.style.top = e.offsetY + 'px';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // Form field enhancements
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });

        // Check if already filled on page load
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add counter animation for metrics (if any are added later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add keyboard navigation support
    document.addEventListener('keydown', function (e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function () {
        // Any scroll-based animations can be added here
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler);
});

// Add CSS for animations and effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--primary-teal);
        box-shadow: 0 0 0 3px rgba(0, 168, 181, 0.1);
    }

    .form-group.filled label {
        color: var(--primary-teal);
    }

    /* Loading state for buttons */
    .btn-loading {
        position: relative;
        color: transparent !important;
    }

    .btn-loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Improved focus states for accessibility */
    .nav-link:focus,
    .btn-primary-large:focus,
    .btn-text:focus,
    .nav-cta:focus {
        outline: 2px solid var(--primary-teal);
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        html {
            scroll-behavior: auto;
        }
    }
`;

document.head.appendChild(additionalStyles);// Enhanced Contact Form with Dynamic Fields and Email Draft
document.addEventListener('DOMContentLoaded', function () {
    const contactMethodSelect = document.getElementById('contactMethod');
    const emailGroup = document.getElementById('emailGroup');
    const phoneGroup = document.getElementById('phoneGroup');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Handle contact method selection
    if (contactMethodSelect) {
        contactMethodSelect.addEventListener('change', function () {
            const selectedMethod = this.value;

            // Reset all groups
            emailGroup.style.display = 'none';
            phoneGroup.style.display = 'none';
            emailInput.required = false;
            phoneInput.required = false;
            emailInput.value = '';
            phoneInput.value = '';

            // Show appropriate field based on selection
            if (selectedMethod === 'email') {
                emailGroup.style.display = 'block';
                emailInput.required = true;
            } else if (selectedMethod === 'whatsapp' || selectedMethod === 'call') {
                phoneGroup.style.display = 'block';
                phoneInput.required = true;
            }
        });
    }

    // Enhanced form submission with email draft
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Creating Email Draft...</span>';
            submitButton.disabled = true;

            // Create email draft and open Gmail
            setTimeout(() => {
                createEmailDraft(data);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }

    function validateForm(data) {
        // Check basic required fields
        const requiredFields = ['firstName', 'lastName', 'company', 'contactMethod', 'projectType', 'message'];

        for (let field of requiredFields) {
            if (!data[field]) {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }

        // Validate contact method specific fields
        if (data.contactMethod === 'email') {
            if (!data.email) {
                alert('Please provide your email address.');
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return false;
            }
        } else if (data.contactMethod === 'whatsapp' || data.contactMethod === 'call') {
            if (!data.phone) {
                alert('Please provide your phone number.');
                return false;
            }
            const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return false;
            }
        }

        return true;
    }

    function createEmailDraft(data) {
        // Create comprehensive email content
        const serviceNames = {
            'proposal': 'Proposal Development',
            'capture': 'Capture & Opportunity Assessment',
            'capability': 'Past Performance & Capability Statements',
            'development': 'Capability Development',
            'website': 'Website Development',
            'pr': 'Public Relations Support',
            'consultation': 'General Consultation'
        };

        const contactMethods = {
            'email': 'Email',
            'whatsapp': 'WhatsApp',
            'call': 'Phone Call'
        };

        const subject = `New Consultation Request - ${data.firstName} ${data.lastName} (${serviceNames[data.projectType]})`;

        const body = `Hi Aadi,

A new consultation request has been submitted through the NorthxGov website. Here are the details:

CLIENT INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Company: ${data.company}
• Service Needed: ${serviceNames[data.projectType]}
• Preferred Contact Method: ${contactMethods[data.contactMethod]}
${data.email ? `• Email: ${data.email}` : ''}
${data.phone ? `• Phone: ${data.phone}` : ''}

PROJECT DETAILS:
${data.message}

NEXT STEPS:
Please reach out to the client via their preferred contact method (${contactMethods[data.contactMethod]}) within 2 business hours as promised on the website.

Best regards,
NorthxGov Website System

---
This email was automatically generated from the contact form submission.`;

        // Create Gmail compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aadi.latief@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open Gmail in new tab
        window.open(gmailUrl, '_blank');

        // Show success message
        alert('Email draft created! Gmail will open in a new tab. Please review and send the email to Aadi.');

        // Reset form
        contactForm.reset();

        // Reset dynamic fields
        emailGroup.style.display = 'none';
        phoneGroup.style.display = 'none';
        emailInput.required = false;
        phoneInput.required = false;
    }
}); 