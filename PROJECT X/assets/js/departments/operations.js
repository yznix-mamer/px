document.addEventListener('DOMContentLoaded', function() {
    initializeTacticalOverlay();
    animateSkillBars();
    setupDepartmentInteractions();
    setupScrollAnimations();
});

function initializeTacticalOverlay() {
    const overlay = document.getElementById('tacticalOverlay');
    
    // Create tactical grid points
    for (let i = 0; i < 30; i++) {
        const point = document.createElement('div');
        point.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff6b35;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: tacticalPulse ${Math.random() * 3 + 2}s infinite;
            box-shadow: 0 0 10px #ff6b35;
        `;
        overlay.appendChild(point);
    }
    
    // Create connecting lines animation
    const lines = document.createElement('div');
    lines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(45deg, transparent 49%, rgba(255, 107, 53, 0.1) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(31, 78, 121, 0.1) 50%, transparent 51%);
        background-size: 100px 100px;
        animation: tacticalLines 10s linear infinite;
    `;
    overlay.appendChild(lines);
}

function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.dataset.width;
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 300);
                
                // Add tactical scanning effect
                entry.target.addEventListener('mouseenter', function() {
                    addScanEffect(this);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => observer.observe(card));
}

function addScanEffect(element) {
    const scanner = document.createElement('div');
    scanner.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ff6b35, transparent);
        animation: scanLine 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(scanner);
    
    setTimeout(() => {
        if (scanner.parentNode) {
            scanner.parentNode.removeChild(scanner);
        }
    }, 800);
}

function setupDepartmentInteractions() {
    const deptCards = document.querySelectorAll('.dept-card');
    
    deptCards.forEach(card => {
        const missions = card.querySelectorAll('.mission-item');
        
        card.addEventListener('mouseenter', function() {
            // Stagger mission item animations
            missions.forEach((mission, index) => {
                setTimeout(() => {
                    mission.style.transform = 'translateX(8px)';
                    mission.style.background = 'rgba(255, 107, 53, 0.2)';
                    mission.style.borderLeftColor = '#f7931e';
                }, index * 100);
            });
            
            // Add tactical overlay effect
            const tacticalOverlay = document.createElement('div');
            tacticalOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.1) 50%, transparent 70%);
                pointer-events: none;
                animation: tacticalSweep 1s ease-out;
            `;
            this.appendChild(tacticalOverlay);
            
            setTimeout(() => {
                if (tacticalOverlay.parentNode) {
                    tacticalOverlay.parentNode.removeChild(tacticalOverlay);
                }
            }, 1000);
        });
        
        card.addEventListener('mouseleave', function() {
            missions.forEach(mission => {
                mission.style.transform = 'translateX(0)';
                mission.style.background = 'rgba(255, 107, 53, 0.1)';
                mission.style.borderLeftColor = '#ff6b35';
            });
        });
    });
}

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.career-card, .dept-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'deployFromBelow 0.8s ease forwards';
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px) rotateX(15deg)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    animateElements.forEach(el => observer.observe(el));
}

// Modal Functions
function openApplicationModal(position) {
    document.getElementById('modal-position').textContent = position;
    document.getElementById('application-modal').style.display = 'flex';
    
    // Add tactical deployment sound effect (visual feedback)
    const modal = document.querySelector('.modal-content');
    modal.style.transform = 'scale(0.8) rotateX(15deg)';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.animation = 'modalDeploy 0.5s ease forwards';
    }, 50);
    
    // Add tactical border animation
    modal.addEventListener('animationend', function() {
        this.style.borderImage = 'linear-gradient(45deg, #ff6b35, #f7931e, #c1272d) 1';
        this.style.animation = 'borderPulse 2s infinite';
    });
}

function closeApplicationModal() {
    const modal = document.getElementById('application-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.animation = 'modalRetract 0.3s ease forwards';
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.animation = '';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('application-modal');
    if (e.target === modal) {
        closeApplicationModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeApplicationModal();
    }
    
    // Easter egg: Konami code for tactical mode
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateTacticalMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateTacticalMode() {
    document.body.style.filter = 'hue-rotate(120deg) contrast(1.2)';
    const tacticalAlert = document.createElement('div');
    tacticalAlert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 53, 0.9);
        color: #000;
        padding: 2rem;
        border-radius: 10px;
        font-family: 'Orbitron', sans-serif;
        font-weight: bold;
        z-index: 10000;
        animation: tacticalAlert 3s ease forwards;
    `;
    tacticalAlert.textContent = 'TACTICAL MODE ACTIVATED';
    document.body.appendChild(tacticalAlert);
    
    setTimeout(() => {
        document.body.style.filter = '';
        tacticalAlert.remove();
    }, 3000);
}

// Form validation and submission
document.querySelector('#application-modal form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Tactical submission animation
    submitBtn.textContent = 'DEPLOYING...';
    submitBtn.style.background = '#c1272d';
    submitBtn.disabled = true;
    
    // Simulate deployment process
    setTimeout(() => {
        submitBtn.textContent = 'DEPLOYED ✓';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            closeApplicationModal();
            showDeploymentConfirmation();
            this.reset();
            submitBtn.textContent = 'DEPLOY APPLICATION';
            submitBtn.style.background = '#ff6b35';
            submitBtn.disabled = false;
        }, 1500);
    }, 2000);
});

function showDeploymentConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.5s ease forwards;
        box-shadow: 0 0 20px rgba(40, 167, 69, 0.5);
    `;
    confirmation.textContent = 'Mission Application Deployed Successfully!';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => confirmation.remove(), 500);
    }, 4000);
}

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes tacticalPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.5); }
    }
    
    @keyframes tacticalLines {
        0% { transform: translateX(-100px) translateY(-100px); }
        100% { transform: translateX(100px) translateY(100px); }
    }
    
    @keyframes scanLine {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100px); opacity: 0; }
    }
    
    @keyframes tacticalSweep {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes deployFromBelow {
        from {
            opacity: 0;
            transform: translateY(50px) rotateX(15deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
    
    @keyframes modalRetract {
        to {
            transform: scale(0.8) rotateX(-15deg);
            opacity: 0;
        }
    }
    
    @keyframes borderPulse {
        0%, 100% { border-color: #ff6b35; }
        50% { border-color: #f7931e; }
    }
    
    @keyframes tacticalAlert {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(dynamicStyles);