<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Página</title>

  <!-- Importando o Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/css/bootstrap.min.css" integrity="sha512-4+4q3Lv/i9pdFyEBlJx+j6UuSNYU+g6ZJk6Uw0njkCCV7cGJNYyP2dCn0W8LPvIGk/+mI2PQ2zzmH5J5v5Gcw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <?php
  session_start();
  if (!isset($_SESSION['user_login'])) {
    header('Location: login.php');
  }
  require 'config.php';

  $lista = [];
  $sql = $pdo->query("SELECT * FROM alunos");
  if ($sql->rowCount() > 0) {
    $lista = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  ?>

</head>

<body>

  <div class="container my-4">

    <a href="add.php" class="btn btn-primary">ADICIONAR USUÁRIO</a>

    <table class="table table-striped table-hover my-4">
      <thead>
        <tr>
          <th>NOME</th>
          <th>ESPECIALIDADE</th>
          <th>IDADE</th>
          <th>STATUS</th>
          <th>AÇÃO</th>
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
              <a href="editar.php?id=<?= $usuario['id']; ?>" class="btn btn-warning btn-sm">EDITAR</a>
              <a href="excluir.php?id=<?= $usuario['id']; ?>" class="btn btn-danger btn-sm" onclick="return confirm('Tem certeza que deseja excluir?')">EXCLUIR</a>
            </td>
          </tr>
        <?php endforeach ?>
      </tbody>
    </table>

  </div>

  <!-- Importando o Bootstrap JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/js/bootstrap.bundle.min.js" integrity="sha512-P+b9eCgYvq3AUKGMGr+H2zD2LDrRv0JbL5l5ue5B9XUv7VWb8oU2j6Ulk4J+Y7CwoIz8Kj7wSbOhk5P5o5c5aA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</body>

</html>
