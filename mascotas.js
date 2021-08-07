const url = "http://localhost:3000/mascotas"

function guardarMascota(nombre, tipo, raza, propietario) {
    axios.post(`${url}`,
        {
            id: Number,
            nombreMascota: nombre,
            tipo: tipo,
            raza: raza,
            propietario: propietario
        }
    )
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function cambiarMascota(id, nombre, tipo, raza, propietario) {
    axios.put(`${url}/${id}`, {
        nombreMascota: nombre,
        tipo: tipo,
        raza: raza,
        propietario: propietario
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}

let btn_guardar_mascota = document.getElementById("btn_guardar_mascota")
let txt_nom_mas = document.getElementById("txt_nom_mas")
let txt_tipo = document.getElementById("txt_tipo")
let txt_raza = document.getElementById("txt_raza")
let txt_prop = document.getElementById("txt_prop")

btn_guardar_mascota.addEventListener('click', () => {
    let nombre_mascota = document.getElementById("nombre_mascota").value
    let btnradio=document.getElementsByName("btnradio")
    let raza = document.getElementById("raza").value
    let propietario = document.getElementById("lst_propietario").value
    let nom_mas_ok, tipo_ok, raza_ok, prop_ok = false
    let tipo_animal = ""

    if (nombre_mascota == "") {
        txt_nom_mas.style.display = "block"
    } else {
        txt_nom_mas.style.display = "none"
        nom_mas_ok = true
    }
    for (var i = 0; i < btnradio.length; i++) {
        if (btnradio[i].checked) {
            tipo_animal = btnradio[i].value
            console.log(tipo_animal);
            tipo_ok = true
            txt_tipo.style.display = "none"
            break
        } else {
            txt_tipo.style.display = "block"
        }
    }

    if (raza == "") {
        txt_raza.style.display = "block"
    } else {
        txt_raza.style.display = "none"
        raza_ok = true
    }

    if (propietario == "--Propietario de la mascota--") {
        txt_prop.style.display = 'block';
    } else {
        txt_prop.style.display = "none"
        prop_ok = true
    }

    if (nom_mas_ok === true && tipo_ok === true && raza_ok === true && prop_ok === true) {
        guardarMascota(nombre_mascota, tipo_animal, raza, propietario);
        alert("Registro mascota exitoso")
    }
})