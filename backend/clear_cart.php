<?php
  require 'connecter_angular.php';

  $sql = "TRUNCATE TABLE cart";

  if (mysqli_query($con, $sql)) {
    http_response_code(204);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to clear cart']);
  }
?>