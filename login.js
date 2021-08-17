let url_usuarios = "http://localhost:3000/usuarios"
let btn_submit = document.getElementById("btn_submit")
let txt_usuario = document.getElementById("txt_usuario")
let txt_pass = document.getElementById("txt_pass")

btn_submit.addEventListener("click", () => {
    axios.get(`${url_usuarios}?usuario=${txt_usuario.value}&pass=${txt_pass.value}`)
        .then(response => {
            if (response.data.length > 0) {
                (async () => {
                    await Swal.fire({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: false,
                        icon: 'success',
                        html: `<div class="text-center fs-5">Usuario identificado</div>`
                    })
                    window.open("home.html", '_blank')
                    window.close()
                })()
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    icon: 'error',
                    html: `<div class="text-center fs-5">Usuario o contraseña incorrectos</div>`
                })
            }

        })
        .catch(error => {
            alert(error)
        })
})