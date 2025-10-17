// Countdown Timer
let countdownValue = 3;
let currentPage = 1;
const totalPages = 5;
let largePage = 1;

// Start the countdown when page loads
window.addEventListener('load', () => {
    startCountdown();
});

function startCountdown() {
    const countdownElement = document.getElementById('countdownNumber');
    const countdownAudio = document.getElementById('countdownAudio');
    
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = countdownValue;
        countdownElement.style.animation = 'pulse 1s ease-in-out';
        countdownAudio.play();
        
        // Reset animation
        setTimeout(() => {
            countdownElement.style.animation = '';
        }, 1000);
        
        countdownValue--;
        
        if (countdownValue < 0) {
            clearInterval(countdownInterval);
            countdownAudio.pause();
            countdownAudio.currentTime = 0;
            document.getElementById('backgroundMusic').play();
            showBirthdayAnimation();
        }
    }, 1000);
}

function showBirthdayAnimation() {
    // Hide countdown
    document.getElementById('countdown').classList.add('hidden');
    
    // Show birthday section
    const birthdaySection = document.getElementById('birthdaySection');
    birthdaySection.classList.remove('hidden');
    
    // After birthday animation, show GIF
    setTimeout(() => {
        showGifSection();
    }, 4000);
}

function showGifSection() {
    const gifSection = document.getElementById('gifSection');
    gifSection.classList.remove('hidden');
    
    // After GIF, show memories section
    setTimeout(() => {
        showMemoriesSection();
    }, 4000);
}

function showMemoriesSection() {
    const memoriesSection = document.getElementById('memoriesSection');
    memoriesSection.classList.remove('hidden');
    memoriesSection.scrollIntoView({ behavior: 'smooth' });
    
    // After memories, show flip book
    setTimeout(() => {
        showFlipBook();
    }, 5000);
}

function showFlipBook() {
    const flipBook = document.getElementById('flipBook');
    flipBook.classList.remove('hidden');
    flipBook.scrollIntoView({ behavior: 'smooth' });
    
    // Initialize flip book
    initializeFlipBook();
}

function initializeFlipBook() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');
    
    // Update page indicator
    function updatePageIndicator() {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        
        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Show specific page
    function showPage(pageNumber) {
        const pages = document.querySelectorAll('.page');
        
        pages.forEach((page, index) => {
            if (index + 1 === pageNumber) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        updatePageIndicator();
    }
    
    // Previous page
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    // Next page
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Initialize first page
    showPage(1);
}

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = '#ff69b4';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add confetti effect
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff20b2'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Trigger confetti when birthday animation starts
setTimeout(() => {
    createConfetti();
}, 3000);



// Add keyboard navigation for flip book
document.addEventListener('keydown', (e) => {
    const flipBook = document.getElementById('flipBook');
    
    if (!flipBook.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            currentPage--;
            document.querySelector('.page.active').classList.remove('active');
            document.querySelector(`[data-page="${currentPage}"]`).classList.add('active');
            document.getElementById('pageIndicator').textContent = `Page ${currentPage} of ${totalPages}`;
            
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = false;
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            currentPage++;
            document.querySelector('.page.active').classList.remove('active');
            document.querySelector(`[data-page="${currentPage}"]`).classList.add('active');
            document.getElementById('pageIndicator').textContent = `Page ${currentPage} of ${totalPages}`;
            
            document.getElementById('nextPage').disabled = currentPage === totalPages;
            document.getElementById('prevPage').disabled = false;
        }
    }
});