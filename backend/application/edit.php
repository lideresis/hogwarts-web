<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../assets/css/edit.css">
    <title>Edit</title>
</head>

<body>


    <?php
    require '../core/config.php';

    $info = []; //contem infos do usuario
    $id = filter_input(INPUT_GET, 'id');
    if ($id) {
        $sql = $pdo->prepare("SELECT * FROM alunos WHERE id = :id");
        $sql->bindValue(':id', $id);
        $sql->execute();

        //verificar se achou algo
        if ($sql->rowCount() > 0) {
            $info = $sql->fetch(PDO::FETCH_ASSOC);
        } else {
            header("Location: ../../index.php");
            exit;
        }
    } else {
        header("Location: index.php");
        exit;
    }

    ?>

    <header class="header">
        <div class="logo">
            <img src="logo.png" alt="Logo">
        </div>
        <div class="menu">

        </div>
        <div class="gear">
            <span>Usuário</span>
            <a href="logout.php">Exit</a>
        </div>
    </header>

    <div class="edit-user">
        <p>Editar Bruxo</p>
    </div>

    <div class="menu-lateral-esquerdo">

        <button><a href="list.php">Meus Bruxos</a></button>
        <button><a href="add.php">Adicionar Usuário</a></button>

    </div>

    <div class="edit-form"> <form method="POST" action="edit_action.php">
        <input type="hidden" name="id" value="<?= $info['id'] ?>" />

        <label>
            Nome: <br>
            <input type="text" name="nome" value="<?= $info['nome'] ?>" />
        </label>

        <br><br>

        <label>
            Especialidade: <br>
            <input type="text" name="especialidade" value="<?= $info['especialidade'] ?>" />
        </label>

        <br><br>

        <label>
            Idade: <br>
            <input type="int" name="idade" value="<?= $info['idade'] ?>" />
        </label>

        <br><br>

        <label>
            Status: <br>
            <input type="int" name="status" value="<?= $info['status'] ?>" />
        </label>

        <br><br>

        <input type="submit" value="Salvar" />
        <button><a href="list.php">Cancelar</a></button>
        </form>
    </div>
</body>

</html>