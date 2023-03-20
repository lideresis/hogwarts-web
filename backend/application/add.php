<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../assets/css/add.css">
    <title>Add</title>
</head>

<body>

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

    <div class="meus-bruxos">
        <p>Meus bruxos - Formulário</p>
    </div>

    <div class="menu-lateral-esquerdo">

        <button><a href="list.php">Meus Bruxos</a></button>
        <button><a href="add.php">Usuário</a></button>

    </div>

    <div class="add-form">

        <form method="POST" action="add_action.php">
            <label class="nome">
                Nome: <br>
                <input type="text" name="nome" />
            </label>

            <br><br>

            <label class="especialidade">
                Especialidade: <br>
                <input type="text" name="especialidade" />
            </label>

            <br><br>

            <label class="idade">
                Idade: <br>
                <input type="int" name="idade" />
            </label>

            <br><br>

            <label class="status">
                Status: <br>
                <input type="int" name="status" />
            </label>

            <br><br>

            <input type="submit" value="Salvar" />
            <button><a href="list.php">Cancelar</a></button>
        </form>

    </div>
</body>

</html>