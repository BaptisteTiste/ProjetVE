<?php
try {
    $strConnection = 'mysql:host=localhost;dbname=visteeclairagedb';
    $pdo = new PDO($strConnection, "root", "");

    $Id_Salle = $_GET['Id_S'];//"1";


    $requete = "SELECT COUNT(*) AS total FROM `eclairages` WHERE Id_Salle = :id_salle";
    $prep = $pdo->prepare($requete);
    $prep->bindParam(':id_salle', $Id_Salle);
    $res = $prep->execute();
    $result = $prep->fetch(PDO::FETCH_ASSOC);

    // Affichage des résultats
        echo $result['total'];

} catch(PDOException $e) {
    // En cas d'erreur, afficher un message
    echo "Erreur : ".$e->getMessage();
}
?>
