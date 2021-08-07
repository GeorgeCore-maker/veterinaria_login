url_usuarios = "http://localhost:3000/usuarios"


let btn_submit = document.getElementById("btn_submit")

btn_submit.addEventListener('click', () => {
    let txt_usuario = document.getElementById("txt_usuario").value
    let txt_pass = document.getElementById("txt_pass").value
    axios.get(url_usuarios)
        .then((resp) => {
            for (let user of resp.data) {
                if (txt_usuario === user.usuario && txt_pass === user.pass) {
                    (async ()=>{
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
                    break
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
                    break
                }
            }
        })
        .catch((error) => {
            console.log(error.resp)
        });
})