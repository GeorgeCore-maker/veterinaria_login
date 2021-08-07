//---------------- -------Mascotas---------------------------------------//
const url_mascotas = "http://localhost:3000/mascotas"
const url_personas = "http://localhost:3000/personas"
import { cambiarMascota } from "./mascotas.js"

let body_mascotas = document.getElementById("registro_mascotas")
let docum = document
let btn_cambiar_mascota = document.getElementById("btn_cambiar_mascota")
let btn_guardar_mascota = document.getElementById("btn_guardar_mascota")
let btn_agregar_mascota = document.getElementById("btn_agregar_mascota")
let txt_nom_mas = document.getElementById("txt_nom_mas")
let txt_tipo = document.getElementById("txt_tipo")
let txt_raza = document.getElementById("txt_raza")
let txt_prop = document.getElementById("txt_prop")

document.addEventListener('DOMContentLoaded', async function (h) {
    axios.get(url_mascotas)
        .then((resp) => {
            for (let mascotas of resp.data) {
                body_mascotas.innerHTML += `
                    <td>${mascotas.id} </td>
                    <td>${mascotas.nombreMascota} </td>
                    <td>${mascotas.tipo} </td>
                    <td>${mascotas.raza} </td>
                    <td>${mascotas.propietario} </td>
                    <td> <button class="btn-warning editar" data-bs-target="#ven_modal_mascota"  data-bs-toggle="modal"
                    data-id=${mascotas.id} data-nom_mas=${mascotas.nombreMascota} data-tipo=${mascotas.tipo} data-raza=${mascotas.raza} data-prop=${mascotas.propietario}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg> Editar</button> </td>
                    <td> <button class="btn-danger eliminar_masc" data-id=${mascotas.id}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg> Eliminar</button> </td>
                `
            }
        })
        .catch((error) => {
            console.log(error.resp)
        });
});

let lst_clientes = document.getElementById("lst_propietario")
document.addEventListener('DOMContentLoaded', () => {
    axios.get(url_personas)
        .then(r => {
            for (let i of r.data) {
                lst_clientes.innerHTML += `
                <option>${i.nombrePersona}</option>
                `
            }
        })
})

let id_mascotas = 0
let nom_mas_cam = document.getElementById("nombre_mascota")
let tip_cam = document.getElementById("tipo")
let raz_cam = document.getElementById("raza")
let prop_cam = document.getElementById("lst_propietario")
let titulo_mod_mascotas = document.getElementById("titulo_mod_mascotas")

docum.addEventListener("click", (h) => {

    if (h.target.classList.contains("eliminar_masc")) {
        id_mascotas = h.target.dataset.id
        let confirmar_elim = confirm(`Confirmas que quieres eliminar la fila ${id_mascotas}?`)
        if (confirmar_elim) {
            axios.delete(`${url_mascotas}/${id_mascotas}`)
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
    if (h.target.classList.contains("editar")) {
        titulo_mod_mascotas.innerText = "Editar mascota"
        btn_guardar_mascota.style.visibility = "hidden"
        btn_cambiar_mascota.style.visibility = "visible"
        id_mascotas = h.target.dataset.id
        nom_mas_cam.value = h.target.dataset.nom_mas
        raz_cam.value = h.target.dataset.raza
        prop_cam.value = h.target.dataset.prop
        txt_nom_mas.style.display = "none"
        txt_raza.style.display = "none"
        txt_prop.style.display = "none"
        txt_tipo.style.display = "none"
    }
})

btn_agregar_mascota.addEventListener('click', () => {
    titulo_mod_mascotas.innerText = "Agregar mascota"
    btn_cambiar_mascota.style.visibility = "hidden"
    btn_guardar_mascota.style.visibility = "visible"
    txt_nom_mas.style.display = "none"
    txt_raza.style.display = "none"
    txt_prop.style.display = "none"
    txt_tipo.style.display = "none"
    nom_mas_cam.value = ""
    raz_cam.value = ""
    prop_cam.value = "--Propietario de la mascota--"
})

btn_cambiar_mascota.addEventListener('click', () => {
    let nombre_mascota_cam = document.getElementById("nombre_mascota").value
    let btnradio = document.getElementsByName("btnradio")
    let raza_cam = document.getElementById("raza").value
    let propietario_cam = document.getElementById("lst_propietario").value

    let nom_mas_ok, tipo_cam_ok, raza_cam_ok, prop_cam_ok = false
    let tipo_animal = ""

    if (nombre_mascota_cam == "") {
        txt_nom_mas.style.display = "block"
    } else {
        txt_nom_mas.style.display = "none"
        nom_mas_ok = true
    }

    for (var i = 0; i < btnradio.length; i++) {
        if (btnradio[i].checked) {
            tipo_animal = btnradio[i].value
            tipo_cam_ok = true
            txt_tipo.style.display = "none"
            break
        } else {
            txt_tipo.style.display = "block"
        }
    }

    if (raza_cam == "") {
        txt_raza.style.display = "block"
    } else {
        txt_raza.style.display = "none"
        raza_cam_ok = true
    }

    if (propietario_cam == "--Propietario de la mascota--" || propietario_cam == "") {
        txt_prop.style.display = 'block';
    } else {
        txt_prop.style.display = "none"
        prop_cam_ok = true
    }

    if (nom_mas_ok === true && tipo_cam_ok === true && raza_cam_ok === true && prop_cam_ok === true) {
        cambiarMascota(id_mascotas, nombre_mascota_cam, tipo_animal, raza_cam, propietario_cam)
        alert("Cambio de mascota exitoso")
    }
})
