<?php
// Connexion à la base de données MySQL
$strConnection = 'mysql:host=localhost;dbname=visteeclairagedb';
$pdo = new PDO($strConnection, "root", "");

// Afficher le contenu complet du corps de la requête POST
echo "Contenu du corps de la requête POST : <pre>";
print_r($_POST);
echo "</pre>";

// Vérifier si la méthode de requête est POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier si les clés existent dans le tableau $_POST
    echo "Id_Salle : " . isset($_POST["Id_Salle"]);
    echo "Id_EclairSalle : " . isset($_POST["Id_EclairSalle"]);
    echo "PosX : " . isset($_POST["PosX"]);
    echo "PosY : " . isset($_POST["PosY"]);
    echo "PosZ : " . isset($_POST["PosZ"]);
    echo "FinBooleen";

    if (isset($_POST["Id_Salle"]) && isset($_POST["Id_EclairSalle"]) && isset($_POST["PosX"]) && isset($_POST["PosY"]) && isset($_POST["PosZ"])) {
        // Récupérer les données POST

        $Id_Salle = $_POST["Id_Salle"];
        $Id_EclairSalle = $_POST["Id_EclairSalle"];
        $PosX = $_POST["PosX"];
        $PosY = $_POST["PosY"];
        $PosZ = $_POST["PosZ"];

        // Afficher les Coordonnées récupérées individuellement
        echo "ID_S : " . $Id_Salle . "<br>";
        echo "ID_ES : " . $Id_EclairSalle . "<br>";
        echo "PosX : " . $PosX . "<br>";
        echo "PosY : " . $PosY . "<br>";
        echo "PosZ : " . $PosZ . "<br>";

        try {
            // Préparer la requête INSERT
            $requete = "INSERT INTO `eclairages` (`Id_Salle`, `Id_Eclair_Salle`, `PosX`, `PosY`, `PosZ`)
                        VALUES (:Id_Salle, :Id_EclairSalle, :PosX, :PosY, :PosZ)";
            
            // Préparer la requête
            $prep = $pdo->prepare($requete);
            $prep->bindParam(':Id_Salle', $Id_Salle);
            $prep->bindParam(':Id_EclairSalle', $Id_EclairSalle);
            $prep->bindParam(':PosX', $PosX);
            $prep->bindParam(':PosY', $PosY);
            $prep->bindParam(':PosZ', $PosZ);
            
            // Exécuter la requête
            $res = $prep->execute();

            if ($res !== false) {
                // Si l'insertion a réussi, renvoyer une réponse
                echo "Insertion réussie dans la base de données.";
            } else {
                // Sinon, renvoyer une erreur
                echo "Erreur lors de l'insertion dans la base de données : ";
                print_r($prep->errorInfo());
            }

        } catch(PDOException $e) {
            // En cas d'erreur, afficher un message
            echo "Erreur : ".$e->getMessage();
        }
    } else {
        // Si les clés attendues ne sont pas définies dans $_POST
        echo "Erreur : Certaines données attendues ne sont pas présentes dans la requête POST.";
    }
} else {
    // Si la méthode de requête n'est pas POST, renvoyer une erreur
    http_response_code(405); // Méthode non autorisée
    echo "Erreur : Méthode non autorisée.";
}
?>
