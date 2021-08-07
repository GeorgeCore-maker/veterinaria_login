//---------------- -------Personas---------------------------------------//
const url_personas = "http://localhost:3000/personas"
import { cambiarPersona } from "./personas.js"

let docum = document
let body_clientes = document.getElementById("registro_clientes")
let btn_cambiar_persona = document.getElementById("btn_cambiar_persona")
let btn_guardar_persona = document.getElementById("btn_guardar_persona")
let btn_agregar_persona = document.getElementById("btn_agregar_persona")
let txt_nombre = document.getElementById("txt_nombre")
let txt_tipo = document.getElementById("txt_tipo")
let txt_num = document.getElementById("txt_num")
let txt_tel = document.getElementById("txt_tel")
let txt_dir = document.getElementById("txt_dir")
let txt_ciu = document.getElementById("txt_ciu")


document.addEventListener('DOMContentLoaded', async function (e) {
    axios.get(url_personas)
        .then((response) => {
            for (let usuarios of response.data) {
                body_clientes.innerHTML += `
                    <td>${usuarios.id} </td>
                    <td>${usuarios.nombrePersona} </td>
                    <td>${usuarios.tipoDocumento} </td>
                    <td>${usuarios.numeroDocumento} </td>
                    <td>${usuarios.telefono} </td>
                    <td>${usuarios.direccion} </td>
                    <td>${usuarios.ciudad} </td>
                    <td> <button class="btn-warning editar" data-bs-toggle="modal" data-bs-target="#ven_modal_persona"
                    data-id=${usuarios.id} data-nom_per=${usuarios.nombrePersona} data-tipo=${usuarios.tipoDocumento} data-num=${usuarios.numeroDocumento} data-tel=${usuarios.telefono} data-dir=${usuarios.direccion} data-ciu=${usuarios.ciudad}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg> Editar</button> </td>
                    <td> <button class="btn-danger eliminar" data-id=${usuarios.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg> Eliminar</button> </td>
                `
            }
        })
        .catch((error) => {
            console.log(error.response)
        });
});

let id_personas = 0
let nom_per_cam = document.getElementById("nombre_persona")
let tipo_cam = document.getElementById("tipo_documento")
let num_cam = document.getElementById("num_documento")
let tel_cam = document.getElementById("telefono")
let dir_cam = document.getElementById("direccion")
let ciu_cam = document.getElementById("ciudad")
let titulo_mod_clientes=document.getElementById("titulo_mod_clientes")

docum.addEventListener("click", (e) => {

    if (e.target.classList.contains("eliminar")) {
        id_personas = e.target.dataset.id
        let confirmar = confirm(`Confirmas que quieres eliminar la fila ${id_personas}?`)
        if (confirmar) {
            axios.delete(`${url_personas}/${id_personas}`)
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
    if (e.target.classList.contains("editar")) {
        console.log("editando");
        titulo_mod_clientes.innerText="Editar usuario"
        btn_cambiar_persona.style.visibility = "visible"
        btn_guardar_persona.style.visibility = "hidden"
        id_personas = e.target.dataset.id
        nom_per_cam.value = e.target.dataset.nom_per
        tipo_cam.value = e.target.dataset.tipo
        num_cam.value = e.target.dataset.num
        tel_cam.value = e.target.dataset.tel
        dir_cam.value = e.target.dataset.dir
        ciu_cam.value = e.target.dataset.ciu
        txt_nombre.style.display = "none"
        txt_tipo.style.display = "none"
        txt_num.style.display = "none"
        txt_tel.style.display = "none"
        txt_dir.style.display = "none"
        txt_ciu.style.display = "none"
    }
})

btn_agregar_persona.addEventListener('click', () => {
    console.log("gurdando");
    titulo_mod_clientes.innerText="Agregar usuario"
    btn_cambiar_persona.style.visibility = "hidden"
    btn_guardar_persona.style.visibility = "visible"
    txt_nombre.style.display = "none"
    txt_tipo.style.display = "none"
    txt_num.style.display = "none"
    txt_tel.style.display = "none"
    txt_dir.style.display = "none"
    txt_ciu.style.display = "none"
    document.getElementById("nombre_persona").value = ""
    document.getElementById("tipo_documento").value = "--Tipo de Documento--"
    document.getElementById("num_documento").value = ""
    document.getElementById("telefono").value = ""
    document.getElementById("direccion").value = ""
    document.getElementById("ciudad").value = ""
})

btn_cambiar_persona.addEventListener('click', () => {
    let nombre_persona_cam = document.getElementById("nombre_persona").value
    let tipo_persona_cam = document.getElementById("tipo_documento").value
    let numero_persona_cam = document.getElementById("num_documento").value
    let telefono_persona_cam = document.getElementById("telefono").value
    let direccion_persona_cam = document.getElementById("direccion").value
    let ciudad_persona_cam = document.getElementById("ciudad").value

    let nombre_cam_ok, tipo_cam_ok, numero_cam_ok, telefono_cam_ok, direccion_cam_ok, ciudad_cam_ok = false
    let dig_num_per = numero_persona_cam.length
    let dig_tel_per = telefono_persona_cam.length

    if (nombre_persona_cam == "") {
        txt_nombre.style.display = "block"
    } else {
        txt_nombre.style.display = "none"
        nombre_cam_ok = true
    }

    if (tipo_persona_cam == "--Tipo de Documento--" || tipo_persona_cam == "") {
        txt_tipo.style.display = 'block';
    } else {
        txt_tipo.style.display = "none"
        tipo_cam_ok = true
    }

    if (dig_num_per <= 6) {
        txt_num.style.display = 'block';
    } else {
        txt_num.style.display = "none"
        numero_cam_ok = true
    }

    if (dig_tel_per <= 7) {
        txt_tel.style.display = 'block';
    } else {
        txt_tel.style.display = "none"
        telefono_cam_ok = true
    }

    if (direccion_persona_cam == "") {
        txt_dir.style.display = 'block';
    } else {
        txt_dir.style.display = "none"
        direccion_cam_ok = true
    }

    if (ciudad_persona_cam == "") {
        txt_ciu.style.display = 'block';
    } else {
        txt_ciu.style.display = "none"
        ciudad_cam_ok = true
    }

    if (nombre_cam_ok === true && tipo_cam_ok === true && numero_cam_ok === true && telefono_cam_ok === true && direccion_cam_ok === true && ciudad_cam_ok === true) {
        cambiarPersona(id_personas, nombre_persona_cam, tipo_persona_cam, numero_persona_cam, telefono_persona_cam, direccion_persona_cam, ciudad_persona_cam)
        alert("Cambio existoso")
    }
})