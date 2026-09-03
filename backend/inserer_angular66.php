<?php
  require 'connecter_angular.php';
  $query = null;
  $table_data = null;
  $postdata = file_get_contents("php://input");

  $array = json_decode($postdata, true);
  $sql66 = "TRUNCATE TABLE cookie;";      
  $result = mysqli_query($con, $sql66);

  foreach($array as $row) 
  {
    $query .= "INSERT INTO `cookie` (`id`, `name`, `status`, `bakingtime`) VALUES (NULL, '".$row["name"]."', '".$row["status"]."', '".$row["bakingtime"]."'); ";
    $table_data .= '
    <tr>
    <td>'.$row["id"].'</td>
    <td>'.$row["name"].'</td>
    <td>'.$row["status"].'</td>
    <td>'.$row["bakingtime"].'</td>
    </tr>'; 
  }

  if(mysqli_multi_query($con, $query))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  } 
?> 