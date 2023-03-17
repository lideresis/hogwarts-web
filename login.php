<?php
// Inicia a sessão do usuário
session_start();
require 'config.php';

// Verifica se o formulário de login foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe os dados do formulário de login
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    // Verifica se o email e a senha são válidos
    $sql = $pdo->prepare("SELECT * FROM professores WHERE email = :email AND senha = :senha");
    $sql->execute(['email' => $email, 'senha' => $senha]);
    $res = $sql->fetch();

    if ($res) {
        // Email e senha válidos, inicia a sessão
        $_SESSION["usuario"] = $email;
        header("Location: list.php");
    } else {
        // Email e/ou senha inválidos
        echo "E-mail e/ou senha inválido(s).";
    }
}
?>
<br>
<a href="index.php" class="btn btn-primary">Voltar</a>