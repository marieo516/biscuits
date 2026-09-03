<?php

require 'connecter_angular.php';

// Obtenez les données publiées de Angular (JSON)
$postdata = file_get_contents("php://input");
$array = json_decode($postdata, true);
$id = $array['id'];

if(!$id)
{
  return http_response_code(400);
}

// Detruire.
$sql = "DELETE FROM `cookie` WHERE `id` ='{$id}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
?>