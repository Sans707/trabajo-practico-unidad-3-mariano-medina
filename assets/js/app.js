
const API_URL = "https://thesimpsonsapi.com/api/characters";
const CDN_URL = "https://cdn.thesimpsonsapi.com/500";
const contenedor = document.getElementById("cartaPj");
const mensaje = document.getElementById("mensajeEstado");
const inputBuscar = document.getElementById("buscarPj");
let personajes = [];

async function obtenerPersonajes() {
    try {
       
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        personajes = datos.results;
        mostrarPersonajes(personajes)
    }catch (error){
        console.log(error);
        mensaje.innerHTML = `<div class="alert alert-danger">No se pudieron cargar los personajes</div>`;
    }
}



function mostrarPersonajes(lista){

    contenedor.innerHTML = "";

    if(lista.length === 0) {
        mensaje.innerHTML = `<div class="alert alert-warning">No se encontraron personajes</div>`;
    }

    mensaje.innerHTML = "";
    lista.forEach((personaje) => {
        const imagen = CDN_URL + personaje.portrait_path;
        contenedor.innerHTML += `
         <div class="col-md-3">
        <div class="card h-100">
          <img src="${imagen}" class="card-img-top" alt="${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">Ocupación: ${personaje.occupation}</p>
            <p class="card-text">Estado: ${personaje.status}</p>
            <button class="btn btn-primary btn-detalle" data-id="${personaje.id}">
              Ver detalle
            </button>
          </div>
        </div>
      </div>
        `;
    });
}

function filtrarPersonajes () {

    const texto = inputBuscar.value.trim().toLowerCase();

    if (texto === "") {
        mostrarPersonajes(personajes);
        return;
    }
    const filtrados = personajes.filter((personaje) => 

        personaje.name.toLowerCase().includes(texto)
    );
    mostrarPersonajes(filtrados);
}