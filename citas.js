const url = "http://localhost:3000/citas"

export function guardarCita(fecha, propietario, mascota, sintomas) {
    axios.post(`${url}`,
        {
            id: Number,
            fecha: fecha,
            nombrePropietario: propietario,
            nombreMascota: mascota,
            sintomas: sintomas
        }
    )
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function cambiarCita(id, fecha, propietario, mascota, sintomas) {
    axios.put(`${url}/${id}`, {
        fecha: fecha,
        nombrePropietario: propietario,
        nombreMascota: mascota,
        sintomas: sintomas
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
}