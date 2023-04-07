<?php
    //declare and initialise variables
    $server = "localhost";
    $user = "root";
    $password = "";
    $database = "costlycontact";


    //establish a connection to the database
    try {
        $connection = new PDO("mysql:host=$server; database=$database", $user, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connection to database is successful";

    } catch (PDOException $e) {
        echo "Connection failed: ".$e->getMessage();
    }

    //create an insert statement template (Prepared Statement)
    $query = $connection->prepare("INSERT INTO contactus (name, email, message) VALUES (?, ?, ?)");

    //bind
    $query->bindParam(1, $name);
    $query->bindParam(2, $email);
    $query->bindParam(3, $message);

    $name = $_POST["personName"];
    $email = $_POST["personEmail"];
    $message = $_POST["personMessage"];

    //execute
    $query->execute();

    //end connection
    $connection = null;

    //message to user
    echo "Hello ".$_POST['personName'].". <br/><br/>Thank you for reaching out.<br/>We will get back to you at ".$_POST['personEmail'];
?>

