<?php
include 'conexao.php';

$email = $_POST['email'];
$password = $_POST['password'];
 
$sql = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$password'";

$sqlVerifica = mysqli_query($conn, $sql);

if(mysqli_num_rows ($sqlVerifica) > 0 )
{
$_SESSION['username'] = $usernameSession;
$_SESSION['email'] = $emailSession;
$_SESSION['password'] = $passwordSession;

header('location:../index.html');
}
else{
  unset ($_SESSION['username']);
  unset ($_SESSION['email']);
  unset ($_SESSION['password']);
  header('location:../index.html');
   
  }
?>