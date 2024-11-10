<?php
$servername = "localhost";  // Cambia esto si el servidor no es 'localhost'
$username = "tu_usuario";   // Sustituye 'tu_usuario' con tu nombre de usuario de la base de datos
$password = "tu_contraseña"; // Coloca aquí tu contraseña de la base de datos
$dbname = "nombre_base_datos"; // Escribe el nombre de tu base de datos

try {
    // Crear una nueva conexión PDO
    $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Configurar el modo de errores de PDO para excepciones
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
