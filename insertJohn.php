<?php
define("DB_USER", "root");
define("DB_PASS", "");
$servername = "localhost";
$dbname = "test";
try {
 $conn = new PDO("mysql:host=$servername;dbname=$dbname", DB_USER,
DB_PASS);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 echo "Connected successfully <br />";
 }
catch(PDOException $e)
 {
 echo "Connection failed: " . $e->getMessage();
 }
$query=$conn->prepare("INSERT INTO contacts VALUES
('','John','Smith','johnsmith@gnet.com','test')");
$query->execute();
$conn = null;
?>