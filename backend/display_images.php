<?php
    header("Access-Control-Allow-Origin: *");

    $dir = "../uploads/";
    $files = scandir($dir);

    $images = array_filter($files, function($file) {
        return in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'PNG', 'JPG']);
    });
    echo json_encode(array_values($images));
?>