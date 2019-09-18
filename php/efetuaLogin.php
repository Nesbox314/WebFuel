<?php
include 'conexao.php';

$username = $_POST['username'];
$password = $_POST['password'];

echo $username;
echo $password;

 
$sql = "INSERT INTO usuarios (username, password) VALUES ('$username', '$password')";
if (mysqli_query($conn, $sql)) {
      echo "New record created successfully";
}
?>