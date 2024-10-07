
class ProductModel {
    constructor() {
        this.products = [
            { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
            { category: 'Légumes', price: '$1', stocked: true, name: 'Pois' },
            { category: 'Fruits', price: '$1', stocked: true, name: 'Fruit du dragon' },
            { category: 'Fruits', price: '$2', stocked: false, name: 'Fruit de la passion' },
            { category: 'Légumes', price: '$2', stocked: true, name: 'Épinards' },
            { category: 'Légumes', price: '$4', stocked: true, name: 'Citrouille' }
        ];
    }

    // filtrer les produits selon les critères
    filterProducts(filterText, inStockOnly) {
        return this.products.filter(product => {
            const correspName = product.name.toLowerCase().includes(filterText.toLowerCase());
            const correspStock = inStockOnly ? product.stocked : true;
            return correspName && correspStock;
        });
    }
}
