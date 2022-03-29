// Joaquin Godoy - CoderHouse #25420.

const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos() {
    // Evento para añadir un producto al carrito:
    productos.addEventListener('click', (e) => {carro.comprarProducto(e)});

    // Evento para eliminar un producto del carrito:
    carrito.addEventListener('click', (e) => {carro.eliminarProducto(e)});

    // Evento para eliminar todos los productos del carrito:
    vaciarCarritoBtn.addEventListener('click', (e) => {carro.vaciarCarrito(e)});

    // Evento para ingresar los datos del localStorage al recargar/volver:
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    // Evento para que al finalizar la compra nos lleve a una página de confirmación de compra:
    procesarPedidoBtn.addEventListener('click', (e) => {carro.procesarPedido(e)});
}