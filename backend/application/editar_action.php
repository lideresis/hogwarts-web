<?php
require '../core/config.php';

$id = filter_input(INPUT_POST, 'id');
$nome = filter_input(INPUT_POST, 'nome');
$especialidade = filter_input(INPUT_POST, 'especialidade');
$idade = filter_input(INPUT_POST, 'idade');
$status = filter_input(INPUT_POST, 'status');

if($id && $nome){

    $sql = $pdo->prepare("UPDATE alunos SET nome = :nome, especialidade = :especialidade, idade = :idade, status = :status WHERE id = :id");
    $sql->bindValue(':id', $id);
    $sql->bindValue(':nome', $nome);
    $sql->bindValue(':especialidade', $especialidade);
    $sql->bindValue(':idade', $idade);
    $sql->bindValue(':status', $status);
    $sql->execute();

    header("Location: list.php");
    exit;
}else{
    header("Location: editar.php");
    exit;
}