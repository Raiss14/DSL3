
class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // on lie des événements
        this.searchInput = document.getElementById('search');
        this.inStockCheckbox = document.getElementById('inStockOnly');

        this.searchInput.addEventListener('keyup', () => this.handleFilterChange());
        this.inStockCheckbox.addEventListener('change', () => this.handleFilterChange());

        // Affichage initial des produits
        this.view.renderProducts(this.model.products);
    }

    // Changement dans le filtre
    handleFilterChange() {
        const filterText = this.searchInput.value;
        const inStockOnly = this.inStockCheckbox.checked;
        const filteredProducts = this.model.filterProducts(filterText, inStockOnly);

        // Mise à jour des produits filtrés
        this.view.renderProducts(filteredProducts);
    }
}

// On initialise application
document.addEventListener('DOMContentLoaded', () => {
    const model = new ProductModel();
    const view = new ProductView();
    new ProductController(model, view);
});
