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
    // Отключаем scroll эффект на мобильных устройствах
    if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    } else {
        // На мобильных устройствах убираем класс scrolled
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
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const contact = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !contact || !message) {
        alert('Будь ласка, заповніть всі поля');
        return;
    }
    
    // Show success message
    alert('Дякую за ваше повідомлення! Я зв\'яжуся з вами найближчим часом.');
    
    // Reset form
    this.reset();
});

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

// Service details functionality
document.querySelectorAll('.btn-service').forEach(button => {
    button.addEventListener('click', function() {
        const serviceName = this.parentElement.querySelector('h3').textContent;
        alert(`Для отримання детальної інформації про "${serviceName}" зв'яжіться зі мною через форму нижче або месенджери.`);
    });
});

// Media buttons functionality
document.querySelectorAll('.btn-media').forEach(button => {
    button.addEventListener('click', function() {
        const mediaType = this.parentElement.querySelector('h3').textContent;
        if (mediaType === 'Подкаст') {
            alert('Посилання на подкаст буде додано найближчим часом.');
        } else if (mediaType === 'Стаття') {
            alert('Посилання на статтю буде додано найближчим часом.');
        }
    });
});

// Messenger links functionality
document.querySelectorAll('.messenger-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const messenger = this.querySelector('span').textContent;
        alert(`Контакт ${messenger} буде додано найближчим часом.`);
    });
});

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
    // Отключаем scroll эффект на мобильных устройствах
    if (window.innerWidth > 768) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    } else {
        // На мобильных устройствах убираем класс scrolled
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