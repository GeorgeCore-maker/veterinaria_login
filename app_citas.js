//---------------- -------Crear nueva cita---------------------------------------//
import { guardarCita } from "./citas.js"
const url_personas = "http://localhost:3000/personas"
const url_mascotas = "http://localhost:3000/mascotas"

let btn_agregar_cita = document.getElementById("btn_agregar_cita")
let lst_propietario = document.getElementById("lst_propietario")
let lst_mascotas = document.getElementById("lst_mascotas")

document.addEventListener('DOMContentLoaded', () => {
    axios.get(url_personas)
        .then(r => {
            for (let o of r.data) {
                lst_propietario.innerHTML += `
            <option>${o.nombrePersona}</option>
            `
            }
        })
})

document.addEventListener('DOMContentLoaded', () => {
    axios.get(url_mascotas)
        .then(j => {
            for (let a of j.data) {
                lst_mascotas.innerHTML += `
            <option>${a.nombreMascota}</option>
            `
            }
        })
})

let id_mascota=

btn_agregar_cita.addEventListener('click', () => {
    let txt_prop = document.getElementById("txt_prop1")
    let txt_masc = document.getElementById("txt_masc")
    let txt_sint = document.getElementById("txt_sint")
    let txt_fecha = document.getElementById("txt_fecha")
    let txt_sintomas = document.getElementById("txt_sintomas").value
    let txt_hora = document.getElementById("txt_hora")
    let dt_fecha = document.getElementById("dt_fecha")
    let tm_hora = document.getElementById("tm_hora")

    let fecha_act = new Date()
    let fechacita = new Date(dt_fecha.value)
    let hora = tm_hora.value.split(':')[0]
    let minutos = tm_hora.value.split(':')[1]
    console.log(id_mascota);

    let fecha_ok, prop_ok, masc_ok, sint_ok, hora_ok = false

    if (fecha_act.getTime() > fechacita.getTime() || dt_fecha.value == "") {
        txt_fecha.style.display = "block"
    } else {
        txt_fecha.style.display = "none"
        fecha_ok = true
    }

    if (tm_hora.value == "" || hora < 8 || hora > 17) {
        txt_hora.style.display = "block"
    } else {
        txt_hora.style.display = "none"
        hora_ok = true
    }

    if (lst_propietario.value == "" || lst_propietario.value == "--Nombre del cliente--") {
        txt_prop.style.display = "block"
    } else {
        txt_prop.style.display = "none"
        prop_ok = true
    }

    if (lst_mascotas.value == "" || lst_mascotas.value == "--Nombre de la mascota--") {
        txt_masc.style.display = "block"
    } else {
        txt_masc.style.display = "none"
        masc_ok = true
    }

    if (txt_sintomas == "") {
        txt_sint.style.display = "block"
    } else {
        txt_sint.style.display = "none"
        sint_ok = true
    }

    if (fecha_ok === true && prop_ok === true && masc_ok === true && sint_ok === true && hora_ok === true) {
        guardarCita(dt_fecha.value, lst_propietario.value, lst_mascotas.value, txt_sintomas, tm_hora.value,)
        alert("Registro de cita exitoso")
    }
})

