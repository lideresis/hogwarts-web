<?php

// index page
$app->get('/', 'LoginController:index');

// check user and password
$app->post('/checkUser', 'LoginController:checkUser');

// destruir sessão e redirecionar ao login
$app->get('/logout', 'LoginController:logout');

// cadastro de novos bruxos
$app->post('/add', 'LoginController:add');

// edição de bruxos
$app->post('/edit', 'LoginController:edit');

// exclusão de bruxos
$app->post('/delete', 'LoginController:delete');