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

        <h1>Hogwarts School</h1>
        <div class="form">
            <form action="login.php" method="POST">
                <div class="box-form">
                    <label>Login</label><br>
                    <input type="text" name="email"><br><br>

                    <label>Senha</label><br>
                    <input type="password" name="senha"><br>
                </div>
                <p>
                    <button type="submit">Entrar</button>
                </p>
            </form>
        </div>
    </div>
</body>

</html>