// Joaquin Godoy - CoderHouse #25420.

class Carrito {
    // Añadir el producto al carrito:
    comprarProducto(e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    // Recibir los datos del producto:
    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
        }
        /* Dado que los "productos" que mi sitio web vende son servicios no habrá cantidades.
        Así que solamente prevenimos productos duplicados en el carrito, sin aumentar la cantidad del mismo: */
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function(productoLS) {
            if(productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id) {
            // Advertencia con SweetAlert:
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                footer: 'This product is already in your cart.',
                timer: 2300,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                timer: 800,
                showConfirmButton: false
            });
            this.insertarCarrito(infoProducto);
        }
    }

    // Creación e inserción del producto dentro del HTML:
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${producto.nombre}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${producto.id}">
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductoLocalStorage(producto);
    }

    // Función para eliminar un producto del carrito:
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            // Para que se elimine de localStorage:
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    // Función para eliminar todos los productos del carrito:
    vaciarCarrito(e) {
        e.preventDefault();
        while(listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    // Verificamos si localStorage tiene datos ingresados:
    obtenerProductoLocalStorage() {
        let productoLS;
        if(localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    // Método para guardar los datos del carrito en localStorage:
    guardarProductoLocalStorage(producto) {
        let productos;
        // Obtenemos los datos del localStorage:
        productos = this.obtenerProductoLocalStorage();
        // Ingresamos los datos obtenidos:
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Método para eliminar producto de localStorage uno por uno:
    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function(productoLS, index) {
            if(productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    // Método para eliminar todos los productos de localStorage:
    vaciarLocalStorage() {
        localStorage.clear();
    }

    // Método para que se carguen los datos de localStorage (si existen) al recargar la página:
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function(producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    ${producto.nombre}
                </td>
                <td>
                    ${producto.precio}
                </td>
                <td>
                    <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${producto.id}">
                </td>
            `;
            listaProductos.appendChild(row);
        })
    }

    // Mismo método que arriba pero modificado con otro DOM para usar en 'checkout.html':
    leerLocalStorageCheckout() {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function(producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100px>
                <td>
                    ${producto.nombre}
                </td>
                <td>
                    ${producto.precio}.00 €
                </td>
                <td>
                    <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${producto.id}">
                </td>
            `;
            listaCompra.appendChild(row);
        })
    }

    // Función para finalizar compra:
    procesarPedido(e) {
        e.preventDefault();
        if(this.obtenerProductoLocalStorage().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                footer: 'Your cart is empty.',
                timer: 1800,
                showConfirmButton: false
            });
        } else {
            location.href = "cart.html";
        }
    }

    // Método para calcular el total del checkout:
    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, iva = 0;
        productoLS = this.obtenerProductoLocalStorage();
        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio);
            subtotal = subtotal + element;
        }
        iva = parseFloat(subtotal * 0.21);
        total = subtotal + iva;

        document.getElementById('subtotal').innerHTML = subtotal.toFixed(2) + " €";
        document.getElementById('iva').innerHTML = iva.toFixed(2) + " €";
        document.getElementById('total').innerHTML = total.toFixed(2) + " €";
    }
}