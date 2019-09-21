<?php

include 'conexao.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$password = $_POST['password'];
$passwordConfirm = $_POST['confirmPassword'];


if($password == $passwordConfirm){
    $sql = "INSERT INTO usuarios (username, password, email) VALUES ('$nome', '$password', '$email')";
    
    if (mysqli_query($conn, $sql)) {
        echo "<script>
            window.alert('Usuário cadastrado com sucesso!');
            location.href='./cadastroUsuario.php';
          </script>";
    }
}else{
    echo "<script>
            window.alert('As senhas não conferem!');
            location.href='./cadastroUsuario.php';
          </script>";
}

?>