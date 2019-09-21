<?php
include 'conexao.php';

$username = $_POST['username'];
$password = $_POST['password'];
 
$sql = "SELECT * FROM usuarios";

$sqlTeste = mysqli_query($conn, $sql);

//if (mysqli_query($conn, $sql)) {
while($exibe = mysql_fetch_assoc($sqlTeste)){
      echo $exibe['username'] .'<br>';
}

//}
?>