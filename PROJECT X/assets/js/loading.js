// Access button functionality
document.addEventListener('DOMContentLoaded', function() {
    const accessBtn = document.getElementById('accessBtn');
    const loadingBar = document.getElementById('loadingBar');
    
    accessBtn.addEventListener('click', function() {
        this.style.display = 'none';
        loadingBar.style.width = '100%';
        
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 2000);
    });
});