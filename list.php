<?php
require 'config.php';

$lista = [];
$sql = $pdo->query("SELECT * FROM alunos");
if($sql->rowCount() > 0){
    $lista = $sql->fetchAll(PDO::FETCH_ASSOC);
}

?>

<a href="add.php"> ADICIONAR USUÁRIO </a>

<table border="1" width="100%">
        <tr>
            <th>NOME</th>
            <th>ESPECIALIDADE</th>
            <th>IDADE</th>
            <th>STATUS</th>
        </tr>
    <?php foreach($lista as $usuario):{ } ?>
        <tr>
            <td> <?=$usuario['nome'];?> </td>
            <td> <?=$usuario['especialidade'];?> </td>
            <td> <?=$usuario['idade'];?> </td>
            <td> <?=$usuario['status'];?> </td>
            <td>
                <a href="editar.php?id=<?=$usuario['id'];?>">[ EDITAR ]</a>
                <a href="excluir.php?id=<?=$usuario['id'];?>" onclick="return confirm('Tem certeza que deseja excluir?')">[ EXCLUIR ]</a>
            </td>
        </tr>

    <?php endforeach ?>

</table>