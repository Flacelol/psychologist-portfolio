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

// Header scroll effect and sticky appointment button
const header = document.getElementById('header');
const appointmentBtn = document.getElementById('appointmentBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on links
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Contact form handling
// Contact form handling with EmailJS
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data using correct selectors
    const name = this.querySelector('input[name="from_name"]').value;
    const email = this.querySelector('input[name="from_email"]').value;
    const phone = this.querySelector('input[name="phone"]').value;
    const message = this.querySelector('textarea[name="message"]').value;
    
    // Simple validation
    if (!name || !email || !phone || !message) {
        showMessage('Будь ласка, заповніть всі поля', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Будь ласка, введіть коректний email', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        showMessage('Будь ласка, введіть коректний номер телефону', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Надсилання...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.send('service_2pk9cen', 'template_miusrb9', {
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
        to_name: 'Анастасія Заболотна'
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        // Show success message
        showMessage('Повідомлення надіслано! Дякую за ваше звернення. Я зв\'яжуся з вами найближчим часом.', 'success');
        
        // Reset form
        document.querySelector('.contact-form').reset();
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        // Show error message
        showMessage('Помилка при надсиланні повідомлення. Спробуйте ще раз або зв\'яжіться через месенджери.', 'error');
    })
    .finally(function() {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Function to show custom messages
function showMessage(text, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = text;
    
    // Insert message after the form
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Appointment button functionality
document.querySelectorAll('.btn-appointment, .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// Media buttons functionality




// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
});

// Initial fade-in animation for hero section
window.addEventListener('load', function() {
    const fadeElements = document.querySelectorAll('.animate-fade');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Smooth scroll behavior for better UX
if ('scrollBehavior' in document.documentElement.style) {
    // Browser supports smooth scrolling
} else {
    // Polyfill for smooth scrolling
    const smoothScrollPolyfill = function(target) {
        const targetPosition = target.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override smooth scrolling for unsupported browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollPolyfill(target);
            }
        });
    });
}

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Focus management for mobile menu
mobileMenuToggle.addEventListener('click', function() {
    if (nav.classList.contains('active')) {
        // Focus first menu item when menu opens
        const firstMenuItem = nav.querySelector('a');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
    }
});