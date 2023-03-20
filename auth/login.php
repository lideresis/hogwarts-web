<?php
// Inicia a sessão do usuário
require ('../backend/core/config.php');

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
        $_SESSION['usuario'] = $email;
        session_start();
        header ('Location: ../backend/application/list.php');
    } else {
        // Email e/ou senha inválidos
        //echo "E-mail e/ou senha inválido(s).";
        
        header("Location: index.php");
    }
}

?>