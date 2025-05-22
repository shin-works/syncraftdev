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

    // Animate letter by letter in hero title
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('animate');
        }, 100 * index);
        
        // Add individual bounce effect on letter hover
        letter.addEventListener('mouseenter', function() {
            this.style.animationName = 'bounce-letter';
            this.style.animationDuration = '0.6s';
            this.style.animationTimingFunction = 'ease';
            this.style.animationIterationCount = '1';
        });
        
        letter.addEventListener('animationend', function(e) {
            if (e.animationName === 'bounce-letter') {
                this.style.animationName = 'pulse-letter';
                this.style.animationDuration = '2s';
                this.style.animationTimingFunction = 'ease-in-out';
                this.style.animationIterationCount = 'infinite';
                this.style.animationDirection = 'alternate';
            }
        });
    });

    // Create glowing particles in hero section
    function createGlowingParticles() {
        const glowingParticles = document.querySelector('.glowing-particles');
        if (!glowingParticles) return;
        
        const particlesCount = 60;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'glow-particle';
            
            // Random size
            const size = Math.random() * 6 + 2;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.2;
            
            // Random color
            const colors = [
                'rgba(255, 75, 141, ' + opacity + ')',
                'rgba(0, 85, 179, ' + opacity + ')',
                'rgba(120, 213, 234, ' + opacity + ')',
                'rgba(255, 204, 0, ' + opacity + ')'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = posX + '%';
            particle.style.top = posY + '%';
            particle.style.background = color;
            
            // Add to container
            glowingParticles.appendChild(particle);
            
            // Animate
            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        // Random duration
        const duration = Math.random() * 12 + 5;
        
        // Random movement
        const moveX = (Math.random() - 0.5) * 30;
        const moveY = (Math.random() - 0.5) * 30;
        
        // Random start position for animation
        const delay = Math.random() * 5;
        
        particle.style.animation = `floatParticle ${duration}s infinite alternate ease-in-out ${delay}s`;
        particle.style.setProperty('--moveX', moveX + 'vw');
        particle.style.setProperty('--moveY', moveY + 'vh');
    }
    
    createGlowingParticles();

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0);
                filter: blur(3px);
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translate(var(--moveX), var(--moveY));
                filter: blur(5px);
                opacity: 0.7;
            }
        }
        
        .glow-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 3;
            filter: blur(3px);
        }

        .letter {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            font-size: 5rem;
            text-shadow: 0 0 15px rgba(120, 213, 234, 0.7), 0 3px 15px rgba(0, 0, 0, 0.9);
        }
        
        .letter.animate {
            opacity: 1;
            transform: translateY(0);
            animation: pulse-letter 2s infinite alternate ease-in-out;
        }
        
        .letter.space {
            width: 0.5em;
        }
        
        .letter:nth-child(odd) {
            color: #ffffff;
        }
        
        .letter:nth-child(even) {
            background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        @keyframes pulse-letter {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }
        
        @keyframes bounce-letter {
            0% { transform: translateY(0); }
            30% { transform: translateY(-15px); }
            60% { transform: translateY(0); }
            80% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }
        
        .dynamic-title:hover .letter {
            animation: pulse-letter 2s infinite alternate ease-in-out;
        }
        
        .dynamic-title:hover .letter:hover {
            animation: bounce-letter 0.6s ease;
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
    `;
    
    document.head.appendChild(style);
});