import { db } from './guitarras.js'

// console.log(db)
// console.log('Archivo JavaScript cargado')
// alert('Carga archivo')

// console.log(db[0].id)
// console.log(db[0].nombre)
// console.log(db[0].imagen)

// Iterar Arrays
// Ciclos
// for (let i = 0; i < db.length; i++) {
//     console.log(db[i].nombre)
// }

// Métodos de Arrays para iterar
// db.forEach(function (guitar) {
//     console.log(guitar)
// })

// Arrow functions
// const sayHello = (name) => {
//     console.log('Hello ' + name)
// }
// sayHello('Paco')

const createcard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `
        <div class="col-4">
            <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra" />
        </div>
        <div class="col-8">
            <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
            <p>${guitar.descripcion}</p>
            <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
            <button type="button" class="btn btn-dark w-100" data-id="${guitar.id}">Agregar al Carrito</button>
        </div>`
    div.innerHTML = html
    return div
}

const container = document.querySelector('main div')

const buttonClicked = (e) => {
    if (e.target.classList.contains('btn')) {
        const dataId = e.target.getAttribute('data-id')
        console.log(db[Number(dataId) - 1])
    }
}

// Métodos de Arrays para iterar
db.forEach((guitar) => {
    console.log(guitar.nombre)
    container.appendChild(createcard(guitar))
})

container.addEventListener('click', buttonClicked)
