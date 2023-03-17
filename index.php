<!DOCTYPE html>
<html>

<head>
    <title>Hogwarts School</title>
    <link rel="stylesheet" href="assets/css/login.css">
</head>

<body class="body">

    <?php require 'config.php'; ?>

    <div class="box_login">
        <div class="logo"></div>
        <div class="form">
            <h3>Hogwarts School</h3>
            <form action="login.php" method="POST">
                <div class="formulario">
                    <label class="label1">Login</label><br>
                    <input type="text" name="email"><br><br>

                    <label class="label2">Senha</label><br>
                    <input type="password" name="senha"><br>
                    <p>
                        <button type="submit">Entrar</button>
                    </p>
                </div>
            </form>
        </div>
    </div>
</body>

</html>