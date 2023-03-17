<?php
require 'config.php';

$info = []; //contem infos do usuario
$id = filter_input(INPUT_GET, 'id');
if($id){
    $sql = $pdo->prepare("SELECT * FROM alunos WHERE id = :id");
    $sql->bindValue(':id', $id);
    $sql->execute();

    //verificar se achou algo
    if($sql->rowCount() > 0){
        $info = $sql->fetch(PDO::FETCH_ASSOC);
    }else{
        header("Location: index.php");
        exit;
    }

}else{
    header("Location: index.php");
    exit;
}

?>

<h1>Editar Usuário</h1>

<form method="POST" action="editar_action.php">
    <input type="hidden" name="id" value="<?= $info['id'] ?>" />

    <label>
        Nome: <br>
        <input type="text" name="nome" value="<?= $info['nome'] ?>"/>
    </label>

    <br><br>

    <label>
        Especialidade: <br>
        <input type="text" name="especialidade" value="<?= $info['especialidade'] ?>"/>
    </label>
    
    <br><br>

    <label>
        Idade: <br>
        <input type="int" name="idade" value="<?= $info['idade'] ?>"/>
    </label>
    
    <br><br>

    <label>
        Status: <br>
        <input type="int" name="status" value="<?= $info['status'] ?>"/>
    </label>
    
    <br><br>

    <input type="submit" value="Salvar"/>
</form>