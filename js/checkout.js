const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const nombreCliente = document.getElementById('nombre');
const apellidoCliente = document.getElementById('apellido');

cargarEventos();

function cargarEventos() {
    // Cargar los productos de nuestro localStorage en el HTML de checkout:
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCheckout());

    // Evento para eliminar productos del checkout:
    carrito.addEventListener('click', (e) => {compra.eliminarProducto(e)});

    // Función para calcular el total:
    compra.calcularTotal();

    // Evento al finalizar una compra:
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

// Función ejecutada al clickear "Finalizar compra" en 'checkout.html':
function procesarCompra(e) {
    e.preventDefault();
    // Si el carrito está vacío nos devuelve al 'index.html':
    if(compra.obtenerProductoLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Your cart is empty.'
        }).then( () => {window.location = "index.html";});
    // Si no ingresa Nombre y Apellido nos salta error:
    } else if(nombreCliente.value === '' || apellidoCliente.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Enter your name and surname',
            timer: 2000
        })
    // Si todo está correcto nos sale una notificación de agradecimiento, vacía el localStorage y nos devuelve al 'index.html':
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thank you for your purchase!'
        })
        compra.vaciarLocalStorage();
        window.location = "index.html";
    }
}