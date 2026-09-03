<?php
    $dir = "../uploads/";

    if (isset($_FILES["fichier"])) {
        if (@copy($_FILES["fichier"]["tmp_name"], $dir . $_FILES["fichier"]["name"])) {
            header("Location: ../uploadRecipe?success=1");
            exit();
        } else {
            header("Location: ../uploadRecipe?error=1");
            exit();
        }
    }
?>