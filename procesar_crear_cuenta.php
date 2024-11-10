<?php
include 'conexion.php';
$errores = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $pass = $_POST['contrasena'];
    $pass2 = $_POST['confirmar_contrasena'];

    $nombre = filter_var(strtolower($nombre), FILTER_SANITIZE_STRING);
    $correo = filter_var($correo, FILTER_SANITIZE_EMAIL);
    $pass = filter_var($pass, FILTER_SANITIZE_STRING);
    $pass2 = filter_var($pass2, FILTER_SANITIZE_STRING);

    # Validar si el usuario ya existe
    $validar_usuario = $conexion->prepare('SELECT * FROM persona WHERE nombre_usuario = :NOMBRE OR correo = :CORREO LIMIT 1');
    $validar_usuario->execute(array(':NOMBRE' => $nombre, ':CORREO' => $correo));
    $resultado = $validar_usuario->fetch();

    if ($resultado !== false) {
        $errores = '<li>El usuario ya está registrado</li>';
    }

    if ($pass !== $pass2) {
        $errores .= '<li>Las contraseñas no coinciden</li>';
    }

    ?>

    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Error</title>
        <style>
            /* Estilos para la página de error */
        </style>
    </head>
    <body>
        <?php if (!empty($errores)): ?>
            <div class="error-message">
                <p><?php echo $errores; ?></p>
                <button onclick="window.location.href='crear_cuenta.html'">Volver a Intentar</button>
            </div>
        <?php endif; ?>
    </body>
    </html>

    <?php

    if (empty($errores)) {
        $guardar = $conexion->prepare('INSERT INTO persona (nombre_usuario, correo, contrasena) VALUES (:NOMBRE, :CORREO, :CONTRASENA)');

        $guardar->execute(array(
            ':NOMBRE' => $nombre,
            ':CORREO' => $correo,
            ':CONTRASENA' => $pass
        ));
    }
}
?>
