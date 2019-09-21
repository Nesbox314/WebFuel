<?php
include 'conexao.php';

$username = $_POST['username'];
$password = $_POST['password'];
 
$sql = "SELECT * FROM usuarios WHERE username = '$username' AND password = '$password'";

$sqlVerifica = mysqli_query($conn, $sql);

$exibe = mysqli_fetch_assoc($sqlVerifica);

$value = "testetestetestetesteet";

if($exibe == null){
      echo "cucabeludo";
}else{
    echo "<script>
      window.alert('Usuário logado com sucesso!');
      location.href='../index.html';
    </script>";

    setcookie("TestCookie", $value, time()+3600, "/", "example.com");
}

/*if (mysqli_query($conn, $sql)) {
while($exibe = mysqli_fetch_assoc($sqlTeste)){
      echo $exibe['username'] .'<br>';
}

}*/
?>