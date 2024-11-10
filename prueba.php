<?php
include '../conexion.php';
session_start(); // Iniciar la sesión

$errores = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = $_POST['correo'];
    $pass = $_POST['contrasena'];

    // Filtrar los datos
    $correo = filter_var($correo, FILTER_SANITIZE_EMAIL);
    $pass = filter_var($pass, FILTER_SANITIZE_STRING);

    // Consultar si el usuario existe
    $validar_usuario = $conexion->prepare('SELECT * FROM persona WHERE correo = :CORREO LIMIT 1');
    $validar_usuario->execute(array(':CORREO' => $correo));
    $resultado = $validar_usuario->fetch();

    if ($resultado) {
        if ($resultado['contrasena'] === $pass) {
            $_SESSION['usuario'] = $resultado['nombre_usuario'];

            // Verificar el ID del usuario
            $user_id = $resultado['id']; // Asegúrate de que 'id' es la columna que contiene el ID del usuario

            if (in_array($user_id, [1, 2, 3])) {
                // Redirigir a index1.php si el ID es 1, 2 o 3
                header("Location: ../index1.php");
            } else {
                // Redirigir a index.php para otros ID
                header("Location: ../index.php");
            }
            exit; // Terminar la ejecución después de redirigir
        } else {
            $errores = '<li>La contraseña es incorrecta</li>';
        }
    } else {
        $errores = '<li>El correo no está registrado</li>';
    }
    
    if (!empty($errores)) {
        ?>
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Error</title>
        </head>
        <body>
            <div class="error-message">
                <p><?php echo $errores; ?></p>
                <button onclick="window.location.href='../iniciar_sesion.php'">Volver a Intentar</button>
            </div>
        </body>
        </html>
        <?php
    }
}
?>
