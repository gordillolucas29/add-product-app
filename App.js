// creador de objetos de la aplicacion
class Product {
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// objetos mostrados en la user interface
class UI {
    // añado el 'product' obtenido del dom event
    addProduct(product) {
        // guardo en una constante el elemento div del html "product-list"
        const productList = document.getElementById("product-list");
        // guardo en una constante un elemento div creado
        const element = document.createElement("div");
        // a la constante 'element' le inserto el codigo html:
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong class="text-info">Product Name</strong>: ${product.name}
                    <strong class="text-info">Product Price</strong>: ${product.price}
                    <strong class="text-info">Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-sm btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        // a 'productList' le agregamos el elemento hijo 'element'
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Product Deleted Successfully', 'success')
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        // a 'container' le inserto mi elemento 'div' antes que el elemento 'app'
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();            
        }, 2000);
    }
}

// DOM EVENTS
document.getElementById("product-form")
    .addEventListener("submit", function(e){
        // guardo en constantes los valores:
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const year = document.getElementById("year").value;
        
        // creo un objeto denominado 'Product' con los datos 'name, price, year'.
        const product = new Product(name, price, year);

        // guardo en una constante el objeto UI
        const ui = new UI();

        if(name === '' || price === '' || year === ''){
            return ui.showMessage('Complete Fields Please', 'danger');
        }

        // aacedo al metodo 'addProduct' y le agrego 'product'
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success')

        e.preventDefault(); // Previene el refresh perfect por defecto
    })

document.getElementById("product-list")
    .addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
    })    