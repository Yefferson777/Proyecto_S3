//Variables Hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
//Variables Ventana Agragar Servicio
const btnuevoabrir = document.querySelector("#bt-nuevo-abrir");
const btnuevocerrar = document.querySelector("#bt-nuevo-cerrar");
const btnuevolisto = document.querySelector("#bt-nuevo-listo");
const modalnuevo = document.querySelector("#modalnuevo");



//Abrir y Cerrar Menu
abrir.addEventListener("click",() => {
    nav.classList.add("visible");
})
cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


//Ventana Agregar Nuevo Servicio

btnuevoabrir.addEventListener("click",()=>{
    modalnuevo.showModal();
})

btnuevocerrar.addEventListener("click",()=>{
    modalnuevo.close();
})

btnuevolisto.addEventListener("click",()=>{
    
}) 


document.getElementById('serviceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('price_uni', document.getElementById('price_uni').value);
    formData.append('status', document.getElementById('status').value);
    formData.append('image', document.getElementById('image').files[0]);

    try {
        const response = await fetch('http://localhost:4000/api/servicios', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        document.getElementById('response').innerText = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Error subiendo el servicio';
    }
});
