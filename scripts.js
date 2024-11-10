document.addEventListener("DOMContentLoaded", function() {

    function agregarEfectoHover(elemento) {
        if (!elemento) return; 
        elemento.addEventListener('mouseenter', function() {
            this.src = this.dataset.gif;
        });
        
        elemento.addEventListener('mouseleave', function() {
            this.src = this.dataset.gif2;
        });
    }

    const mensajeImg = document.querySelector('.mensajes1');
    const carritoImg = document.querySelector('.icono-carrito');
    agregarEfectoHover(mensajeImg);
    agregarEfectoHover(carritoImg);

    const barraLateral = document.querySelector('.barra-lateral');
    const pestaña = document.querySelector('.pestaña');

    if (barraLateral) {
        function expandirBarra() {
            barraLateral.style.transition = 'width 0.5s ease';
            barraLateral.style.width = '400px';
            pestaña.style.transition = 'left 0.5s ease';
            pestaña.style.left = '-60px';
        }

        function contraerBarra() {
            barraLateral.style.transition = 'width 0.5s ease';
            barraLateral.style.width = '200px';
            pestaña.style.transition = 'left 0.5s ease';
            pestaña.style.left = '-30px';
        }

        barraLateral.addEventListener('mouseover', expandirBarra);
        barraLateral.addEventListener('mouseout', contraerBarra);
    }

    const errorStyles = 'color: red; margin-top: 5px; font-size: 14px; display: none;'; 
const botonCrearCuenta = document.querySelector('.boton-crear-cuenta');
const botonEntrar1 = document.querySelector('.boton-entrar1');
const botonEntrar2 = document.querySelector('.boton-entrar2');
const botonEntrar = document.querySelector('.boton-entrar'); 

function manejarValidacion(boton, esCreacionCuenta) {
    const nombreUsuario = document.querySelector('#nombre');
    const correo = esCreacionCuenta ? document.querySelector('#correo') : null; 
    const contrasena = document.querySelector('#contrasena');
    const confirmarContrasena = esCreacionCuenta ? document.querySelector('#confirmar-contrasena') : null;

    const errorUsuario = document.createElement('div');
    const errorCorreo = correo ? document.createElement('div') : null;
    const errorContrasena = document.createElement('div');
    const errorConfirmarContrasena = confirmarContrasena ? document.createElement('div') : null;

    errorUsuario.style = errorStyles;
    if (errorCorreo) errorCorreo.style = errorStyles;
    errorContrasena.style = errorStyles;
    if (errorConfirmarContrasena) errorConfirmarContrasena.style = errorStyles;

    nombreUsuario.parentNode.insertBefore(errorUsuario, nombreUsuario.nextSibling);
    if (errorCorreo) correo.parentNode.insertBefore(errorCorreo, correo.nextSibling);
    contrasena.parentNode.insertBefore(errorContrasena, contrasena.nextSibling);
    if (errorConfirmarContrasena) confirmarContrasena.parentNode.insertBefore(errorConfirmarContrasena, confirmarContrasena.nextSibling);

    boton.addEventListener('click', function(event) {
        event.preventDefault();
        let valid = true;

        errorUsuario.style.display = 'none';
        if (errorCorreo) errorCorreo.style.display = 'none';
        errorContrasena.style.display = 'none';
        if (errorConfirmarContrasena) errorConfirmarContrasena.style.display = 'none';
        nombreUsuario.style.border = '';
        if (errorCorreo) correo.style.border = '';
        contrasena.style.border = '';
        if (confirmarContrasena) confirmarContrasena.style.border = '';

        if (nombreUsuario.value === '') {
            errorUsuario.textContent = 'Ingresa tu nombre de usuario.';
            errorUsuario.style.display = 'block';
            nombreUsuario.style.border = '2px solid red';
            valid = false;
        }

        if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
            errorCorreo.textContent = 'Ingrese un correo electrónico válido.';
            errorCorreo.style.display = 'block';
            correo.style.border = '2px solid red';
            valid = false;
        }

        if (contrasena.value === '') {
            errorContrasena.textContent = 'Ingresa una contraseña válida.';
            errorContrasena.style.display = 'block';
            contrasena.style.border = '2px solid red';
            valid = false;
        }

        if (confirmarContrasena && confirmarContrasena.value !== contrasena.value) {
            errorConfirmarContrasena.textContent = 'Las contraseñas no coinciden.';
            errorConfirmarContrasena.style.display = 'block';
            confirmarContrasena.style.border = '2px solid red';
            valid = false;
        }

        if (valid) {
            const successMessage = document.createElement('div');
            successMessage.textContent = esCreacionCuenta ? 'Cuenta creada exitosamente.' : 'Inicio de sesión exitoso.';
            successMessage.style.color = 'green';
            successMessage.style.fontSize = '16px';
            successMessage.style.marginTop = '15px';
            boton.parentNode.insertBefore(successMessage, boton.nextSibling);

            sessionStorage.setItem('nombre_usuario', nombreUsuario.value);
            if (!esCreacionCuenta) {
                sessionStorage.setItem('correo_usuario', nombreUsuario.value);
            }

            setTimeout(function() {
                if (boton === botonEntrar1) {
                    window.location.href = 'pagar.html';
                } else if (boton === botonEntrar2) {
                    window.location.href = 'confirmacion.html';
                } else if (boton === botonEntrar) { 
                    window.location.href = 'iniciado.html';
                } else {
                    window.location.href = esCreacionCuenta ? 'registrado.html' : 'iniciado.html';
                }
            }, 1000);
        }
    });
}

if (botonEntrar1) manejarValidacion(botonEntrar1, false);
if (botonEntrar2) manejarValidacion(botonEntrar2, false);
if (botonEntrar) manejarValidacion(botonEntrar, false); 
if (botonCrearCuenta) manejarValidacion(botonCrearCuenta, true);


});


function agregarAlCarrito(button) {
    const especificaciones = button.closest('.contenedor-especificaciones');
    const producto = {
        nombre: especificaciones.querySelector('.titulo-producto').innerText,
        precio: especificaciones.querySelector('.precio-actual') ? 
                especificaciones.querySelector('.precio-actual').innerText : 
                especificaciones.querySelector('.precio-producto').innerText,
        envio: especificaciones.querySelector('.envio-disponibilidad').innerText,
        stock: especificaciones.querySelector('.stock').innerText,
        imagen: especificaciones.querySelector('.imagen-producto img').src,
        pagina: especificaciones.querySelector('.imagen-producto img').getAttribute('data-pagina')
    };

    sessionStorage.setItem('productoAgregado', JSON.stringify(producto));
    window.location.href = '../iniciar_sesion2.html';
}

document.addEventListener("DOMContentLoaded", function() {
    const productoAgregado = JSON.parse(sessionStorage.getItem('productoAgregado'));

    if (productoAgregado) {
        document.getElementById('detalles-producto').innerHTML = `
            <h2>${productoAgregado.nombre}</h2>
            <a href="${productoAgregado.pagina}">
                <img src="${productoAgregado.imagen}" alt="${productoAgregado.nombre}" class="imagen-confirmacion">
            </a>
            <p>Precio: ${productoAgregado.precio}</p>
            <p>Envío: ${productoAgregado.envio}</p>
            <p>Stock: ${productoAgregado.stock}</p>
        `;
    } else {
        document.getElementById('detalles-producto').innerHTML = '<p>No se encontró información del producto.</p>';
    }
});

document.getElementById('form-alta').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const categoria = document.getElementById('categoria').value;
    const imagen = document.getElementById('imagen').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const producto = {
            nombre,
            descripcion,
            precio,
            cantidad,
            categoria,
            imagen: e.target.result
        };

        localStorage.setItem('producto', JSON.stringify(producto));
        window.location.href = 'producto_guardado.html';
    };

    if (imagen) {
        reader.readAsDataURL(imagen);
    } else {
        alert("Por favor, selecciona una imagen.");
    }
});

function comprarProducto(button) {
    const producto = {
        nombre: button.closest('.detalles-producto').querySelector('.titulo-producto').innerText,
        precio: button.closest('.detalles-producto').querySelector('.precio-actual') ? 
                button.closest('.detalles-producto').querySelector('.precio-actual').innerText : 
                button.closest('.detalles-producto').querySelector('.precio-producto').innerText,
        tiempoEntrega: 5,
    };

    sessionStorage.setItem('productoCompra', JSON.stringify(producto));
    window.location.href = '../iniciar_sesion1.html';
}

