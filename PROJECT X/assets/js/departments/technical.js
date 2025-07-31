// Matrix background effect
document.addEventListener('DOMContentLoaded', function() {
    createMatrixRain();
    animateSkillCards();
    setupDepartmentInteractions();
});

function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Create falling characters
    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        char.style.position = 'absolute';
        char.style.left = Math.random() * 100 + '%';
        char.style.top = '-20px';
        char.style.color = '#00ff41';
        char.style.fontSize = Math.random() * 20 + 10 + 'px';
        char.style.opacity = Math.random() * 0.5 + 0.3;
        char.style.fontFamily = 'monospace';
        char.style.pointerEvents = 'none';
        char.style.zIndex = '-1';
        
        matrixBg.appendChild(char);
        
        // Animate falling
        const fallDuration = Math.random() * 10 + 5;
        char.animate([
            { transform: 'translateY(-20px)', opacity: char.style.opacity },
            { transform: 'translateY(' + (window.innerHeight + 20) + 'px)', opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });
    }
}

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Stagger animation
        card.style.animationDelay = (index * 0.2) + 's';
        card.style.animation = 'fadeSlide 0.8s ease forwards';
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
            
            // Add digital scan line effect
            const scanLine = document.createElement('div');
            scanLine.style.position = 'absolute';
            scanLine.style.top = '0';
            scanLine.style.left = '0';
            scanLine.style.width = '100%';
            scanLine.style.height = '2px';
            scanLine.style.background = 'linear-gradient(90deg, transparent, #00ff41, transparent)';
            scanLine.style.animation = 'scan 0.5s ease-out';
            this.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.parentNode.removeChild(scanLine);
                }
            }, 500);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

function setupDepartmentInteractions() {
    const deptCards = document.querySelectorAll('.dept-card');
    
    deptCards.forEach(card => {
        // Add click interaction for departments
        card.addEventListener('click', function() {
            const dept = this.dataset.dept;
            showDepartmentInfo(dept);
        });
        
        // Add scanning effect on hover
        card.addEventListener('mouseenter', function() {
            const roles = this.querySelectorAll('.role-badge');
            roles.forEach((role, index) => {
                setTimeout(() => {
                    role.style.transform = 'scale(1.1)';
                    role.style.background = '#00ff41';
                    role.style.color = '#000';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const roles = this.querySelectorAll('.role-badge');
            roles.forEach(role => {
                role.style.transform = 'scale(1)';
                role.style.background = 'rgba(0, 128, 255, 0.2)';
                role.style.color = '#0080ff';
            });
        });
    });
}

function showDepartmentInfo(dept) {
    const deptInfo = {
        web: {
            title: 'Web Division',
            description: 'Full-stack web development and security testing. Master both creation and destruction of web applications.',
            skills: ['React/Vue/Angular', 'Node.js/Python/PHP', 'SQL Injection', 'XSS Exploitation', 'CSRF Attacks']
        },
        net: {
            title: 'Network Division', 
            description: 'Network infrastructure and penetration testing. Understand how data flows and how to intercept it.',
            skills: ['Wireshark Analysis', 'MITM Attacks', 'Network Protocols', 'Firewall Bypass', 'Traffic Analysis']
        },
        rev: {
            title: 'Reverse Engineering',
            description: 'Binary analysis and malware research. Deconstruct programs to understand their inner workings.',
            skills: ['Assembly Language', 'Ghidra/IDA Pro', 'Malware Analysis', 'Binary Exploitation', 'Debugging']
        },
        crypto: {
            title: 'Cryptography Division',
            description: 'Encryption systems and cryptanalysis. Protect secrets and break enemy codes.',
            skills: ['RSA/AES Algorithms', 'Hash Functions', 'Digital Signatures', 'Cryptanalysis', 'Steganography']
        },
        osint: {
            title: 'Intelligence Gathering',
            description: 'Open source intelligence and social engineering. Find information that others want to hide.',
            skills: ['Social Media Analysis', 'Metadata Extraction', 'Geolocation', 'People Tracking', 'Information Correlation']
        },
        research: {
            title: 'Research Division',
            description: 'Cutting-edge security research and trend analysis. Stay ahead of emerging threats.',
            skills: ['Threat Intelligence', 'Vulnerability Research', 'Report Writing', 'Trend Analysis', 'Risk Assessment']
        }
    };
}
    const info = deptInfo[dept];
    if (info) {
        alert(`${info.title}\n\n${info.description}\n\nKey Skills:\n${info.skills.join('\n')}`);
    }