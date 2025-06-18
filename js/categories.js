// Gestion des catégories
export function initCategories() {
    // Gestion des liens de catégorie
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            filterProducts(category);
        });
    });
}

// Filtrer les produits par catégorie
function filterProducts(category) {
    const products = document.querySelectorAll('.portfolio-item');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Mettre à jour l'URL avec la catégorie sélectionnée
    const url = new URL(window.location);
    url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
}

// Initialiser le filtrage basé sur l'URL
export function initCategoryFromUrl() {
    const url = new URL(window.location);
    const category = url.searchParams.get('category');
    if (category) {
        filterProducts(category);
    }
} 