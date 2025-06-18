// Navigation active state management
export function initNavigation() {
    const navItems = document.querySelectorAll('.navbar__item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for page links
    document.querySelectorAll('a.page-scroll, a.navbar__link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                const target = document.querySelector(hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                    history.pushState(null, null, hash);
                }
            }
        });
    });
} 