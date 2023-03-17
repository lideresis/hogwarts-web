<?php
require 'config.php';

$nome = filter_input(INPUT_POST, 'nome');
$especialidade = filter_input(INPUT_POST, 'especialidade');
$idade = filter_input(INPUT_POST, 'idade');
$status = filter_input(INPUT_POST, 'status');

if($nome && $especialidade && $idade && $status){

    $sql = $pdo->prepare("SELECT * FROM alunos WHERE nome = :nome");
    $sql->bindvalue(':nome', $nome);
    $sql->execute();

    if($sql->rowCount() === 0){

        $sql = $pdo->prepare("INSERT INTO alunos (nome, especialidade, idade, status) VALUES (:nome, :especialidade, :idade, :status)");
        $sql->bindvalue(':nome', $nome);
        $sql->bindvalue(':especialidade', $especialidade);
        $sql->bindvalue(':idade', $idade);
        $sql->bindvalue(':status', $status);
        $sql->execute();

        header("Location: list.php");
        exit;
    }else{
        header("Location: add.php");
        exit;
    }
}else{
    header("Location: add.php");
    exit;
}