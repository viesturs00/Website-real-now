// 3D Canvas Background Animation - Disabled
// Canvas animation removed to eliminate any faded colors in the background

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Pricing tabs functionality
const pricingTabs = document.querySelectorAll('.pricing-tab');
pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        pricingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Here you could switch between creator and agency pricing cards
        const tabType = tab.getAttribute('data-tab');
        console.log('Switched to:', tabType);
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navRight = document.querySelector('.nav-right');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navRight.classList.toggle('mobile-open');
    });
}


// FAQ accordion - Initialize after page load
window.addEventListener('load', function() {
    setTimeout(function() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ items found:', faqItems.length);
        
        faqItems.forEach(function(item, index) {
            const question = item.querySelector('.faq-question');
            console.log('Question found for item', index, question);
            
            if (question) {
                question.style.cursor = 'pointer';
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('FAQ clicked');
                    
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    faqItems.forEach(function(otherItem) {
                        otherItem.classList.remove('active');
                    });
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                        console.log('FAQ opened');
                    } else {
                        console.log('FAQ closed');
                    }
                });
            }
        });
    }, 100);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .feature-item, .pricing-card, .testimonial-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll - disabled to keep transparent
// Navbar stays transparent to show grid background

// Back to top functionality - removed

// Animate numbers in testimonials (if needed)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.benefit-item, .process-step, .faq-item, .contact-form-panel, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Step number scroll animation
    const stepNumberObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const stepNumberObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, stepNumberObserverOptions);

    // Observe step numbers
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach(stepNumber => {
        stepNumberObserver.observe(stepNumber);
    });
});
