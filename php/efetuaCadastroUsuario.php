<?php

include 'conexao.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$password = $_POST['password'];
$passwordConfirm = $_POST['confirmPassword'];


if($password == $passwordConfirm){
    $sql = "INSERT INTO usuarios (username, password, email) VALUES ('$nome', '$password', '$email')";
    header('Location: ./cadastroUsuario.php');
    echo "<script>
            window.alert('Usuário cadastrado com sucesso!');
          </script>";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
  }

  
}else{
    echo "<script>
            window.alert('As senhas não conferem');
          </script>";

          header('Location: ./cadastroUsuario.php');
}

?>