
class ProductView {
    constructor() {
        this.tableBody = document.getElementById('productTable'); //On récupère l'élément tbody
    }

    // Affichage des produits dans le tableau
    renderProducts(products) {
        
        this.tableBody.innerHTML = '';  //on efface le tableau
        let lastCategory = null;

        products.forEach(product => {
            if (product.category !== lastCategory) {
                const categoryRow = this.createCategoryRow(product.category);
                this.tableBody.appendChild(categoryRow);
                lastCategory = product.category;
            }

            const productRow = this.createProductRow(product);
            this.tableBody.appendChild(productRow);
        });
    }

    // On crée une ligne qui donne la catégorie
    createCategoryRow(category) {
        const row = document.createElement('tr');
        const cell = document.createElement('th');
        cell.colSpan = 2;
        cell.textContent = category;
        row.appendChild(cell);
        return row;
    }

    //On crée une ligne de produit
    createProductRow(product) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const priceCell = document.createElement('td');

        if (!product.stocked) {
            nameCell.style.color = 'red'; // Colorer en rouge les produits non stockés
        }

        nameCell.textContent = product.name;
        priceCell.textContent = product.price;

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        return row;
    }
}
