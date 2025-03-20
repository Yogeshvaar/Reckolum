// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
};

// Form Submission Handler
const formHandler = () => {
    const queryForm = document.getElementById('queryForm');
    
    if (queryForm) {
        queryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const query = document.getElementById('query').value;
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form Submission:', {
                name,
                email,
                query
            });
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerText = 'Your query has been submitted successfully!';
            
            // Insert before the form
            queryForm.parentNode.insertBefore(successMessage, queryForm);
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            queryForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
};

// Scroll Animation
const scrollAnimation = () => {
    const categoryCards = document.querySelectorAll('.category-card');
    const steps = document.querySelectorAll('.step');
    
    const options = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    categoryCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    steps.forEach(step => {
        step.style.opacity = 0;
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(step);
    });
};

// ML Priority Calculation Simulation (for demonstration purposes)
const calculatePriority = (category, details) => {
    // This is just a simulation of ML model behavior
    let priorityScore = 0;
    
    // Category based scoring
    switch(category) {
        case 'financial':
            priorityScore += 30;
            break;
        case 'safety':
            priorityScore += 40;
            break;
        case 'data':
            priorityScore += 25;
            break;
        case 'malware':
            priorityScore += 35;
            break;
        default:
            priorityScore += 20;
    }
    
    // Text analysis simulation
    const urgentKeywords = ['immediate', 'urgent', 'stolen', 'threat', 'danger', 'child'];
    const detailsLower = details.toLowerCase();
    
    urgentKeywords.forEach(keyword => {
        if (detailsLower.includes(keyword)) {
            priorityScore += 10;
        }
    });
    
    // Normalize score between 0-100
    return Math.min(Math.max(priorityScore, 0), 100);
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    formHandler();
    
    // Only run scroll animation if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        scrollAnimation();
    }
    
    // URL parameter handling for when returning from register page
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerText = 'Your complaint has been registered successfully!';
        
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.prepend(successMessage);
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
});