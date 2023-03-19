<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/list.css">
  <title>List</title>

  <!--Import Bootstrap CSS-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-4+4q3Lv/i9pdFyEBlJx+j6UuSNYU+g6ZJk6Uw0njkCCV7cGJNYyP2dCn0W8LPvIGk/+mI2PQ2zzmH5J5v5Gcw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!--Import Bootstrap JS-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/js/bootstrap.bundle.min.js" integrity="sha512-P+b9eCgYvq3AUKGMGr+H2zD2LDrRv0JbL5l5ue5B9XUv7VWb8oU2j6Ulk4J+Y7CwoIz8Kj7wSbOhk5P5o5c5aA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


  <?php
  session_start();
  require 'config.php';

  $lista = [];
  $sql = $pdo->query("SELECT * FROM alunos");
  if ($sql->rowCount() > 0) {
    $lista = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  ?>

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
      <a href="#">Sair</a>
    </div>
  </header>
  <div class="geral">

    <div class="meus-bruxos">
      <p>Meus bruxos - Listagem</p>
    </div>

    <div class="menu-lateral-esquerdo">

      <button class="botoes"><a href="list.php">Meus Bruxos</a></button>
      <button class="botoes"><a href="add.php">Usuário</a></button>

    </div>

    <div class="container">

      <table class="list">
        <thead>
          <tr class="titulos">
            <th class="largura1">BRUXO</th>
            <th class="largura2">ESPECIALIDADE</th>
            <th class="largura3">IDADE</th>
            <th class="largura4">STATUS</th>
            <th class="largura5">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($lista as $usuario) : ?>
            <tr>
              <td><?= $usuario['nome']; ?></td>
              <td><?= $usuario['especialidade']; ?></td>
              <td><?= $usuario['idade']; ?></td>
              <td><?= $usuario['status'] == 1 ? 'ativo' : 'inativo'; ?></td>
              <td>
                <a href="editar.php?id=<?= $usuario['id']; ?>" class="button-editar">EDITAR</a>
                <a href="excluir.php?id=<?= $usuario['id']; ?>" class="button-excluir" onclick="return confirm('Tem certeza que deseja excluir?')">EXCLUIR</a>
              </td>
            </tr>
          <?php endforeach ?>
        </tbody>
      </table>

    </div>
  </div>

  <div class="barra-inferior">

  </div>
</body>

</html>