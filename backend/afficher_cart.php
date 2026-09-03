<?php
  require 'connecter_angular.php';

  $sql = "SELECT id, name, price, quantity FROM cart";
  $final = '[';

  if ($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while ($row = mysqli_fetch_assoc($result)) {
      if ($cr > 0) {
        $final .= ',';
      }

      $final .= '{"id":'.$row['id'].',"name":"'.$row['name'].'","price":"'.$row['price'].'","quantity":'.$row['quantity'].'}';
      $cr++;
    }

    $final .= ']';
    echo $final;
  } else {
    http_response_code(404);
  }
?>