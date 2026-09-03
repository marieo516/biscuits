<?php
  require 'connecter_angular.php';
  $postdata = file_get_contents("php://input");
  $array = json_decode($postdata, true);

  if (!is_array($array)) {
    return http_response_code(422);
  }

  $query = "TRUNCATE TABLE cart;";

  foreach ($array as $row) {
    $name = mysqli_real_escape_string($con, $row['name']);
    $price = floatval($row['price']);
    $quantity = intval($row['quantity']);
    $id = intval($row['id']);

    $query .= "INSERT INTO `cart` (`id`, `name`, `price`, `quantity`) VALUES ('".$id."', '".$name."', '".$price."', '".$quantity."'); ";
  }

  if (mysqli_multi_query($con, $query)) {
    http_response_code(204);
  } else {
    http_response_code(422);
  }
?>