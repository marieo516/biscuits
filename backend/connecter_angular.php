<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// identifiants de base de données 
define('DB_HOST', 'localhost');
define('DB_USER', 'xxxxxx');
define('DB_PASS', 'xxxxxx');
define('DB_NAME', 'cookies');

// Connectez-vous à la base de données 
function connect()
{
  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();

?>
