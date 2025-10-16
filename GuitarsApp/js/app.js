import { db } from './guitarras.js'

const carrito = []

// Elementos del DOM
const divContainer = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')

// Crear tarjetas de guitarras
const createCard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `
        <div class="col-4">
            <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
        </div>
        <div class="col-8">
            <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
            <p>${guitar.descripcion}</p>
            <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
            <button
                data-id="${guitar.id}" 
                type="button"
                class="btn btn-dark w-100"
            >Agregar al Carrito</button>
        </div>`
    div.innerHTML = html
    return div
}

// Crear vista del carrito
const createCart = (carrito) => {
    const p = document.createElement('p') // ✅ corregido (antes usabas DocumentTimeline.createElement)
    p.className = 'text-center'
    p.innerText = 'El carrito está vacío'

    const div = document.createElement('div')
    const html = `
        <table class="w-100 table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${carrito.map(item => `
                    <tr>
                        <td>
                            <img class="img-fluid" src="./img/${item.imagen}.jpg" alt="imagen guitarra">
                        </td>
                        <td>${item.nombre}</td>
                        <td class="fw-bold">$${item.precio}</td>
                        <td class="flex align-items-start gap-4">
                            <button type="button" class="btn btn-dark btn-restar" data-id="${item.id}">-</button>
                            ${item.cantidad}
                            <button type="button" class="btn btn-dark btn-sumar" data-id="${item.id}">+</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-eliminar" data-id="${item.id}">X</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `
    div.innerHTML = html

    carritoContainer.innerHTML = ''
    if (carrito.length === 0) {
        carritoContainer.appendChild(p)
    } else {
        carritoContainer.appendChild(div)
    }
}

// Evento al hacer click en "Agregar al carrito"
const buttonClicked = (e) => {
    if (e.target.classList.contains('btn') && e.target.hasAttribute('data-id')) {
        const dataId = e.target.getAttribute('data-id')
        const idCarrito = carrito.findIndex(g => g.id === Number(dataId))

        if (idCarrito === -1) {
            carrito.push({
                ...db.find(g => g.id === Number(dataId)),
                cantidad: 1
            })
        } else {
            carrito[idCarrito].cantidad++
        }
        createCart(carrito)
    }

    // Botones del carrito
    if (e.target.classList.contains('btn-sumar')) {
        const id = Number(e.target.dataset.id)
        const index = carrito.findIndex(g => g.id === id)
        carrito[index].cantidad++
        createCart(carrito)
    }

    if (e.target.classList.contains('btn-restar')) {
        const id = Number(e.target.dataset.id)
        const index = carrito.findIndex(g => g.id === id)
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--
        } else {
            carrito.splice(index, 1)
        }
        createCart(carrito)
    }

    if (e.target.classList.contains('btn-eliminar')) {
        const id = Number(e.target.dataset.id)
        const index = carrito.findIndex(g => g.id === id)
        carrito.splice(index, 1)
        createCart(carrito)
    }
}

// Renderizar guitarras
db.forEach((guitar) => {
    divContainer.appendChild(createCard(guitar))
})

// Inicializar carrito vacío
createCart(carrito)

// Delegar eventos en el contenedor principal
divContainer.addEventListener('click', buttonClicked)
carritoContainer.addEventListener('click', buttonClicked)
