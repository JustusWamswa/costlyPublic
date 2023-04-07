<?php
define("DB_USER", "root");
define("DB_PASS", "");
$servername = "localhost";
$dbname = "test";
try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", DB_USER, DB_PASS);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// echo "Connected successfully <br />";
}
catch(PDOException $e)
{
echo "Connection failed: " . $e->getMessage();
}
$query=$conn->prepare("SELECT * FROM contacts");
$query->execute();
$results=$query->fetchAll(PDO::FETCH_ASSOC);
foreach ($results as $row) {
echo $row['first'] . "<br />";
echo $row['last'] . "<br />";
echo $row['email'] . "<br />";
echo $row['message'] . "<br />";
echo "<hr />";
}
$conn = null;
?>
