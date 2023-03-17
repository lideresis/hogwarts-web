<!DOCTYPE html>
<html>

<head>
    <title>Hogwarts School</title>
</head>

<body>
    <?php
    require 'config.php';

    ?>
    <h1>Hogwarts School</h1>
    <form action="login.php" method="POST">
        <label>Login:</label>
        <input type="text" name="email"><br><br>

        <label>Senha:</label>
        <input type="password" name="senha"><br>
        <p>
            <button type="submit">Entrar</button>
        </p>
    </form>
</body>

</html> 