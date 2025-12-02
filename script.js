// 3D Canvas Background Animation
const canvas = document.getElementById('canvas-background');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create gradient mesh
    const points = [];
    const pointCount = 50;
    
    // Initialize points
    for (let i = 0; i < pointCount; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 100 + 50
        });
    }
    
    function drawMesh() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw points
        points.forEach((point, i) => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
            
            // Keep in bounds
            point.x = Math.max(0, Math.min(canvas.width, point.x));
            point.y = Math.max(0, Math.min(canvas.height, point.y));
        });
        
        // Draw connections between nearby points with subtle canvas-like lines
        points.forEach((pointA, i) => {
            points.slice(i + 1).forEach((pointB) => {
                const dx = pointB.x - pointA.x;
                const dy = pointB.y - pointA.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 180) {
                    const opacity = (1 - distance / 180) * 0.08;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(pointA.x, pointA.y);
                    ctx.lineTo(pointB.x, pointB.y);
                    ctx.stroke();
                }
            });
            
            // Draw subtle point orbs
            const pointGradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.radius * 0.8
            );
            pointGradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
            pointGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            
            ctx.fillStyle = pointGradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function animate() {
        drawMesh();
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

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

// Contact form submission
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusEl.textContent = "Sending...";
        statusEl.style.color = "#666";

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) throw new Error();

            statusEl.textContent = "Message sent successfully!";
            statusEl.style.color = "#22c55e";
            form.reset();
            
            // Clear status after 5 seconds
            setTimeout(() => {
                statusEl.textContent = "";
            }, 5000);
        } catch (error) {
            statusEl.textContent = "Something went wrong.";
            statusEl.style.color = "#ff6b35";
        }
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

// Navbar background on scroll - optimized with requestAnimationFrame
let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Back to top functionality
const createBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--text-color);
        color: var(--bg-color);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTop);
    
    // Optimized scroll handler for back-to-top button
    let backToTopTicking = false;
    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
        backToTopTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!backToTopTicking) {
            window.requestAnimationFrame(updateBackToTop);
            backToTopTicking = true;
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTop();

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
