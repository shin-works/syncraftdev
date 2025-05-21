document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 2000);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.setAttribute('style', 'top: ' + e.pageY + 'px; left: ' + e.pageX + 'px;');
    });
    
    document.addEventListener('click', () => {
        cursor.classList.add('cursor-expand');
        setTimeout(() => {
            cursor.classList.remove('cursor-expand');
        }, 500);
    });

    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .feature');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Particle effect in works section
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 5 + 3;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Apply styles
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.opacity = opacity;
            
            // Add particle to container
            particlesContainer.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        // Random movement
        const duration = Math.random() * 15 + 5;
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionY = Math.random() > 0.5 ? 1 : -1;
        const moveX = Math.random() * 20 * directionX;
        const moveY = Math.random() * 20 * directionY;
        
        // Apply animation
        particle.style.animation = `moveParticle ${duration}s infinite alternate`;
        particle.style.setProperty('--moveX', moveX + '%');
        particle.style.setProperty('--moveY', moveY + '%');
    }

    // Only create particles if the container exists
    if (document.querySelector('.particles-container')) {
        createParticles();
    }

    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(0, 85, 179, 0.2);
            border-radius: 50%;
            pointer-events: none;
        }
        
        @keyframes moveParticle {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(var(--moveX), var(--moveY));
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
        
        .cursor-grow {
            transform: translate(-50%, -50%) scale(2);
            background: rgba(255, 75, 141, 0.2);
            mix-blend-mode: difference;
        }
        
        .cursor-expand {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
            transition: all 0.5s ease;
        }
        
        .loading-screen.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        section.animated {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
});