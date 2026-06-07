// DOM Elements
const loginPage = document.getElementById('loginPage');
const portfolioPage = document.getElementById('portfolioPage');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showPortfolio();
    }
}

// Show portfolio page
function showPortfolio() {
    loginPage.classList.add('hidden');
    portfolioPage.classList.remove('hidden');
    document.body.style.overflow = 'auto';
}

// Show login page
function showLogin() {
    portfolioPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation - accept any credentials
    if (username && password) {
        // Store login status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Add transition effect
        loginPage.style.opacity = '0';
        loginPage.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            showPortfolio();
            loginPage.style.opacity = '1';
        }, 500);
    }
});

// Handle logout
logoutBtn.addEventListener('click', function() {
    // Remove login status
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Add transition effect
    portfolioPage.style.opacity = '0';
    portfolioPage.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        showLogin();
        portfolioPage.style.opacity = '1';
        // Clear form
        loginForm.reset();
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations on scroll
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Skill bar animation on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.animation = 'none';
                bar.offsetHeight; // Trigger reflow
                bar.style.animation = 'progressAnimation 1.5s ease-out';
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact form handling with EmailJS and Google Sheets
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Initialize EmailJS (replace with your actual public key)
    // Get your public key from: https://dashboard.emailjs.com/admin/integration
    // emailjs.init("YOUR_PUBLIC_KEY");

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // Get form data
        const formData = {
            from_name: this.from_name.value,
            reply_to: this.reply_to.value,
            subject: this.subject.value,
            message: this.message.value
        };

        // Send email using EmailJS
        // Replace with your actual SERVICE_ID, TEMPLATE_ID
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(function() {
                // Send data to Google Sheets
                sendToGoogleSheets(formData);
                
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            })
            .finally(function() {
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

// Send form data to Google Sheets
function sendToGoogleSheets(data) {
    // Replace with your Google Apps Script Web App URL
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => console.log('Data sent to Google Sheets'))
    .catch(error => console.error('Error sending to Google Sheets:', error));
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Add parallax effect to floating shapes
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn, .login-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
