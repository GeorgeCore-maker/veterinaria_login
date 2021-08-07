const url = "http://localhost:3000/personas"

function guardarPersona(nombre, tipo, numero, telefono, direccion, ciudad) {
    axios.post(`${url}`,
        {
            id: Number,
            nombrePersona: nombre,
            tipoDocumento: tipo,
            numeroDocumento: numero,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad
        }
    )
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function cambiarPersona(id, nombre, tipo, numero, telefono, direccion, ciudad) {
    axios.put(`${url}/${id}`, {
        nombrePersona: nombre,
        tipoDocumento: tipo,
        numeroDocumento: numero,
        telefono: telefono,
        direccion: direccion,
        ciudad: ciudad
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}

let btn_guardar_persona = document.getElementById("btn_guardar_persona")
let txt_nombre = document.getElementById("txt_nombre")
let txt_tipo = document.getElementById("txt_tipo")
let txt_num = document.getElementById("txt_num")
let txt_tel = document.getElementById("txt_tel")
let txt_dir = document.getElementById("txt_dir")
let txt_ciu = document.getElementById("txt_ciu")

btn_guardar_persona.addEventListener('click', () => {
    let nombre_persona = document.getElementById("nombre_persona").value
    let tipo_persona = document.getElementById("tipo_documento").value
    let numero_persona = document.getElementById("num_documento").value
    let telefono_persona = document.getElementById("telefono").value
    let direccion_persona = document.getElementById("direccion").value
    let ciudad_persona = document.getElementById("ciudad").value

    let nombre_ok, tipo_ok, numero_ok, telefono_ok, direccion_ok, ciudad_ok = false
    let dig_num_per = numero_persona.length
    let dig_tel_per = telefono_persona.length

    if (nombre_persona == "") {
        txt_nombre.style.display = "block"
    } else {
        txt_nombre.style.display = "none"
        nombre_ok = true
    }

    if (tipo_persona == "--Tipo de Documento--") {
        txt_tipo.style.display = "block"
    } else {
        txt_tipo.style.display = "none"
        tipo_ok = true
    }

    if (dig_num_per <= 6) {
        txt_num.style.display = "block"
    } else {
        txt_num.style.display = "none"
        numero_ok = true
    }

    if (dig_tel_per <= 7) {
        txt_tel.style.display = "block"
    } else {
        txt_tel.style.display = "none"
        telefono_ok = true
    }

    if (direccion_persona == "") {
        txt_dir.style.display = "block"
    } else {
        txt_dir.style.display = "none"
        direccion_ok = true
    }

    if (ciudad_persona == "") {
        txt_ciu.style.display = "block"
    } else {
        txt_ciu.style.display = "none"
        ciudad_ok = true
    }

    if (nombre_ok === true && tipo_ok === true && numero_ok === true && telefono_ok === true && direccion_ok === true && ciudad_ok === true) {
        guardarPersona(nombre_persona, tipo_persona, numero_persona, telefono_persona, direccion_persona, ciudad_persona);
        alert("Registro existoso")
    }


})