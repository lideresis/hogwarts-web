<?php
//conectando db
$pdo = new PDO("mysql:dbname=hogwartsweb;host=localhost","root", "");
$sql = $pdo->query('SELECT * FROM alunos');
echo "TOTAL: ".$sql->rowCount();//vai dizer quantos registros teve
$dados = $sql->fetchAll( PDO::FETCH_ASSOC ); //(essa conf vai associar os dados, sem duplicar)

echo '<pre>';
print_r($dados);