<html>
<head>
    <link rel="stylesheet" type="text/css" href="../css/login.css" media="screen" />
</head>
<body>
    <div id="divCentral">
        <img src="../img/logo-fundo-branco.png" id="img"  ><br>
        <h1> Entrar </h1>
        <form action="efetuaLogin.php" method="POST">
            <div class="inputs">
                <input type="text" name="email" placeholder="Email:">
            </div>
            <div class="inputs">
                <input required type="password" name="password" placeholder="Senha:">
            </div>
            <div >
                <button type="submit" id="button">Logar</button>
            </div>
        </form>
    </div>
    
    <center>
    <p>Ainda não tem uma conta?<br> Cadastre-se <a href="cadastroUsuario.php">aqui</a></p>
    </center>
    </body>
</html>