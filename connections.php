<?php
//conectando db
$pdo = new PDO("mysql:dbname=test;host=localhost","root", ""); //(o db:nome; onde esta, usuario, senha)


//query relacionado ao db, significa consulta
$sql = $pdo->query('SELECT * FROM alunos');

echo "TOTAL: ".$sql->rowCount();//vai dizer quantos registros teve

//fetchALL = pegue todos os dados
$dados = $sql->fetchAll( PDO::FETCH_ASSOC ); //(essa conf vai associar os dados, sem duplicar)

echo '<pre>';
print_r($dados);