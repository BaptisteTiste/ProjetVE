<?php
try {
    $strConnection = 'mysql:host=localhost;dbname=visteeclairagedb';
    $pdo = new PDO($strConnection, "root", "");

    $Id_Salle = $_GET['Id_S'];//"1";
    $Id_EclairSalle = $_GET['Id_ES'];//"2";


    $requete = "SELECT * FROM `eclairages` where Id_Eclair_Salle='".$Id_EclairSalle."' AND Id_Salle='".$Id_Salle."'";
    $prep = $pdo->prepare($requete);
    $res = $prep->execute();
    $result = $prep->fetchAll();

    // Affichage des résultats
    foreach ($result as $row) {
        echo $row['PosX']." ";
        echo $row['PosY']." ";
        echo $row['PosZ'];
    }

} catch(PDOException $e) {
    // En cas d'erreur, afficher un message
    echo "Erreur : ".$e->getMessage();
}
?>
