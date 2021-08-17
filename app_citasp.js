//---------------- -------Citas programadas-----------------------------------//

const url_citas = "http://localhost:3000/citas"
const url_personas = "http://localhost:3000/personas"
const url_mascotas = "http://localhost:3000/mascotas"
import { cambiarCita } from "./citas.js"

let txt_prop2 = document.getElementById("txt_prop2")
let txt_masc2 = document.getElementById("txt_masc2")
let txt_sint1 = document.getElementById("txt_sint1")
let txt_fecha1 = document.getElementById("txt_fecha2")
let btn_cambiar_modal_citas = document.getElementById("btn_cambiar_modal_citas")

let citas_prog = document.getElementById("citas_p")
document.addEventListener('DOMContentLoaded', async function (j) {
    axios.get(url_citas)
        .then((respuesta) => {
            for (let prog of respuesta.data) {
                citas_prog.innerHTML += `
                <div class="col">
                    <div class="card bg-primary border-primary">
                        <div class="card-header bg-light text-end fs-4 fw-bold">${prog.fecha}</div>
                        <div class="card-body">
                            <h4 class="text-decoration-underline text-dark">Propietario:</h4>
                            <h3 class="fw-bold fst-italic">${prog.nombrePropietario}</h3>
                            <h4 class="text-decoration-underline text-dark">Mascota:</h4>
                            <h3 class="fw-bold fst-italic">${prog.nombreMascota}</h3>
                            <h4 class="text-decoration-underline text-dark">Enfermedad:</h4>
                            <h3 class="fw-bold fst-italic">${prog.sintomas}</h3>
                        </div>
                        <div class="card-footer  bg-light">
                            <h5 class="fst-italic text-decoration-underline">ID de la cita: ${prog.id}</h5>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-danger elim_cita" data-id="${prog.id}" type="button" id="btn_eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>  Eliminar</button>
                                <button class="btn btn-warning edit_cita" data-id="${prog.id}" data-nom_cli=${prog.nombrePropietario} data-fecha=${prog.fecha} data-nom_mas=${prog.nombreMascota} data-sint=${prog.sintomas} type="button" data-bs-toggle="modal" data-bs-target="#ven_modal_cita" id="btn_editar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg> Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
        })
})

export let id_citas = 0
let docum2 = document
let nombre_cam = document.getElementById("lst_propietario3")
let mascota_cam = document.getElementById("lst_mascotas2")
let sintomas_cam = document.getElementById("txt_sintomas2")
let fecha_cam = document.getElementById("dt_fecha2")

docum2.addEventListener("click", (j) => {
    if (j.target.classList.contains("elim_cita")) {
        id_citas = j.target.dataset.id
        console.log(id_citas);
        let confirmar1 = confirm(`Confirmas que quieres eliminar la cita ${id_citas}?`)
        if (confirmar1) {
            axios.delete(`${url_citas}/${id_citas}`)
                .then(response => {
                    alert('Eliminacion exitosa')
                })
                .catch(error => {
                    alert(error.response.statusText)
                })
        } else {
            alert("No se ha eliminado nada")
        }
    }
    if (j.target.classList.contains("edit_cita")) {
        id_citas = j.target.dataset.id
        nombre_cam.value = j.target.dataset.nom_cli
        mascota_cam.value = j.target.dataset.nom_mas
        sintomas_cam.value = j.target.dataset.sint
        fecha_cam.value = j.target.dataset.fecha
    }
})

let lst_propietario3 = document.getElementById("lst_propietario3")
let lst_mascotas2 = document.getElementById("lst_mascotas2")
document.addEventListener('DOMContentLoaded', () => {
    axios.get(url_personas)
        .then(r => {
            for (let o of r.data) {
                lst_propietario3.innerHTML += `
            <option>${o.nombrePersona}</option>
            `
            }
        })
})
document.addEventListener('DOMContentLoaded', () => {
    axios.get(url_mascotas)
        .then(j => {
            for (let a of j.data) {
                lst_mascotas2.innerHTML += `
            <option>${a.nombreMascota}</option>
            `
            }
        })
})

btn_cambiar_modal_citas.addEventListener('click', () => {
    let cifecha_cam = document.getElementById("dt_fecha2")
    let ciprop_cam = document.getElementById("lst_propietario3").value
    let cimasc_cam = document.getElementById("lst_mascotas2").value
    let cisint_cam = document.getElementById("txt_sintomas2").value

    let feca_act = new Date()
    let fechacita = new Date(cifecha_cam.value)

    let fecha_ok, prop_ok, masc_ok, sint_ok = false

    if (feca_act.getTime() > fechacita.getTime() || cifecha_cam.value == "") {
        txt_fecha1.style.display = "block"
    } else {
        txt_fecha1.style.display = "none"
        fecha_ok = true
    }

    if (ciprop_cam == "" || ciprop_cam == "--Nombre del cliente--") {
        txt_prop2.style.display = "block"
    } else {
        txt_prop2.style.display = "none"
        prop_ok = true
    }

    if (cimasc_cam == "" || cimasc_cam == "--Nombre de la mascota--") {
        txt_masc2.style.display = "block"
    } else {
        txt_masc2.style.display = "none"
        masc_ok = true
    }

    if (cisint_cam == "") {
        txt_sint1.style.display = "block"
    } else {
        txt_sint1.style.display = "none"
        sint_ok = true
    }

    if (fecha_ok === true && prop_ok === true && masc_ok === true && sint_ok === true) {
        cambiarCita(id_citas, cifecha_cam.value, ciprop_cam, cimasc_cam, cisint_cam)
        alert("Cambio de cita exitoso")
    }
})