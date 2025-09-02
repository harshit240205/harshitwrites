// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFAQ();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeNewsletterForm();
    initializeScrollAnimations();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// ===== FAQ ACCORDION FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateContactForm(formObject)) {
                // Show success message
                showFormMessage('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // In a real application, you would send this data to your server
                console.log('Form data:', formObject);
            }
        });
    }
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showFormMessage(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// ===== NEWSLETTER FORM FUNCTIONALITY =====
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showFormMessage('Thank you for subscribing! You\'ll receive our latest insights soon.', 'success');
                this.reset();
                
                // In a real application, you would send this to your email service
                console.log('Newsletter subscription:', email);
            } else {
                showFormMessage('Please enter a valid email address.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FORM MESSAGE DISPLAY =====
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 
            'background: #D4EDDA; color: #155724; border: 1px solid #C3E6CB;' : 
            'background: #F8D7DA; color: #721C24; border: 1px solid #F5C6CB;'
        }
    `;
    
    // Insert message after the form
    const form = document.querySelector('.contact-form, .newsletter-form');
    if (form) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .case-study-card, .sample-card, .process-step');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATION =====

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Any scroll-based functionality can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add keyboard navigation support for FAQ
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.closest('.faq-question')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ANALYTICS READY =====

// Function to track form submissions (ready for analytics integration)
function trackFormSubmission(formType, data) {
    // This function is ready for Google Analytics, Mixpanel, or other analytics tools
    console.log(`Form submission tracked: ${formType}`, data);
    
    // Example analytics integration:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'form_submit', {
    //         'event_category': 'engagement',
    //         'event_label': formType
    //     });
    // }
}

// ===== MOBILE OPTIMIZATION =====

// Handle viewport height issues on mobile
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Update on resize
window.addEventListener('resize', debounce(setViewportHeight, 250));

// ===== PRINT STYLES =====

// Add print-specific functionality
window.addEventListener('beforeprint', function() {
    // Hide navigation and other non-essential elements for printing
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.style.display = 'block';
});

