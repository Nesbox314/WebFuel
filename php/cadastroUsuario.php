<html>
<head>
    <link rel="stylesheet" type="text/css" href="../css/cadastroUsuario.css" media="screen" />
</head>
<body>
    <div id="divCentral">
        <form action="efetuaCadastroUsuario.php" method="POST">
            <div class="inputs">
                <input type="text" name="nome" placeholder="Nome completo:">
            </div>
            <div class="inputs">
                <input type="text" name="email" placeholder="E-mail:">
            </div>
            <div class="inputs">
                <input type="password" name="password" placeholder="Senha:">
            </div>
            <div class="inputs">
                <input type="password" name="confirmPassword" placeholder="Confirme a sua senha:">
            </div>
            <div id="button">
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    </div>
</body>
</html>