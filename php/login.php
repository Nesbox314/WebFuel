<html>
<head>
    <link rel="stylesheet" type="text/css" href="../css/login.css" media="screen" />
</head>
<body>
    <div id="divCentral">
        <form action="efetuaLogin.php" method="POST">
            <div class="inputs">
                <input type="text" name="email" placeholder="E-mail:">
            </div>
            <div class="inputs">
                <input type="password" name="password" placeholder="Senha:">
            </div>
            <div id="button">
                <button type="submit">Log-in</button>
            </div>
        </form>
    </div>
    <p>Ainda não tem uma conta? Cadastre-se <a href="cadastroUsuario.php">aqui</a></p>
</body>
</html>