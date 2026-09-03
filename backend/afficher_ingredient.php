<?php
  require 'connecter_angular.php';

  $cooki = [];
  $sql = "SELECT id, name, price FROM ingredient";
  $final = '[';
  if($result = mysqli_query($con,$sql))
  {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        if ($cr > 0){
          $final .= ',';    
        }
      $cooki[$cr]['id']    = $row['id'];
      $cooki[$cr]['name'] = $row['name'];
      $cooki[$cr]['price'] = $row['price'];
      $cr++;

    //Contruire la chaine de donnees au format accepter par Angular !!!
      $final .= '{"id":'.$row['id'].',"name":"'.$row['name'].'","price":"'.$row['price'].'"}';
    }
    $final .= ']'; 

    echo $final; 
  }
  else
  {
    http_response_code(404);
  }
?>