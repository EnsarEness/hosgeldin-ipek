// ===== PETAL CREATION =====
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = [
        '#f9a8d4', '#fbcfe8', '#f472b6', '#fce7f3',
        '#d8b4fe', '#e9d5ff', '#fda4af', '#fb7185'
    ];

    const petalCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const color = petalColors[Math.floor(Math.random() * petalColors.length)];
        const size = 15 + Math.random() * 25;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 15;

        petal.style.left = `${left}%`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        // SVG petal shape
        petal.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 30 30">
                <path d="M15 2 C20 8, 28 12, 28 18 C28 24, 22 28, 15 28 C8 28, 2 24, 2 18 C2 12, 10 8, 15 2Z" 
                      fill="${color}" opacity="0.7"/>
            </svg>
        `;

        container.appendChild(petal);
    }
}

// ===== SPARKLE CREATION =====
function createSparkles() {
    const container = document.getElementById('sparklesContainer');
    const sparkleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 3 + Math.random() * 6;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;

        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDelay = `${delay}s`;
        sparkle.style.animationDuration = `${duration}s`;

        container.appendChild(sparkle);
    }
}

// ===== COUNTDOWN TIMER =====
function getBirthTime() {
    const saved = localStorage.getItem('ipek_birth_time');
    return saved ? new Date(saved) : null;
}

function updateCountdown() {
    const birthDate = getBirthTime();

    if (!birthDate) {
        // Henüz doğmadı - hepsini 0 göster, buton görünsün
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('countdownText').textContent = 'İpek\'in doğmasını bekliyoruz... 💕';
        document.getElementById('countdownTitle').textContent = 'İpek\'i Bekliyoruz';
        document.getElementById('birthButton').style.display = 'inline-block';
        return;
    }

    // Doğum kayıtlı - sayacı göster
    const now = new Date();
    const diff = now - birthDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('countdownText').textContent = 'geçti doğduğundan beri 🌟';
    document.getElementById('countdownTitle').textContent = 'Aramızda';
    document.getElementById('birthButton').style.display = 'none';

    // Doğum saatini de güncelle
    const birthHour = birthDate.getHours().toString().padStart(2, '0');
    const birthMin = birthDate.getMinutes().toString().padStart(2, '0');
    const birthTimeEl = document.getElementById('birthTime');
    if (birthTimeEl) {
        birthTimeEl.textContent = `${birthHour}:${birthMin}`;
    }
}

// Butona basınca doğum anını kaydet
function recordBirth() {
    if (confirm('İpek doğdu mu? 🎀 Bu anı kaydedeceğiz!')) {
        const now = new Date();
        localStorage.setItem('ipek_birth_time', now.toISOString());
        updateCountdown();

        // Kutlama efekti - bolca kalp
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }
    }
}

// ===== SCROLL REVEAL =====
function setupScrollReveal() {
    const sections = document.querySelectorAll('section:not(.hero)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== FLOATING HEARTS ON CLICK =====
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${16 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUpHeart 2s ease-out forwards;
    `;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}

// Add floating heart animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUpHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-150px) scale(1.2) rotate(${Math.random() > 0.5 ? '' : '-'}30deg);
        }
    }
`;
document.head.appendChild(heartStyle);

document.addEventListener('click', (e) => {
    createFloatingHeart(e.clientX, e.clientY);
});

// ===== SMOOTH NUMBER ANIMATION =====
function animateNumber(element, target, duration = 1000) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// ===== MUSIC TOGGLE (Placeholder) =====
function setupMusicToggle() {
    const btn = document.getElementById('musicToggle');
    let isPlaying = false;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying = !isPlaying;
        btn.classList.toggle('playing', isPlaying);

        if (isPlaying) {
            btn.querySelector('.music-icon').textContent = '🎶';
        } else {
            btn.querySelector('.music-icon').textContent = '🎵';
        }
    });
}

// ===== PARALLAX EFFECT =====
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero-content');
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.3}px)`;
            hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.6;
        }
    });
}

// ===== CURSOR TRAIL =====
function setupCursorTrail() {
    if (window.innerWidth < 768) return; // Disable on mobile

    let lastTime = 0;
    const throttle = 80;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;

        const trail = document.createElement('div');
        const emojis = ['🌸', '✨', '💗', '🌷', '⭐'];
        trail.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 14px;
            pointer-events: none;
            z-index: 999;
            opacity: 0.8;
            transition: all 1.5s ease-out;
        `;

        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = `translateY(-40px) scale(0.3)`;
        });

        setTimeout(() => trail.remove(), 1500);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    createSparkles();
    updateCountdown();
    setupScrollReveal();
    setupMusicToggle();
    setupParallax();
    setupCursorTrail();

    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // Add stagger animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to wish cards
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});
