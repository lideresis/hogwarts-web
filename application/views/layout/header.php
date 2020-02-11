<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= $titulo ?? ''?> - Hogwarts School</title>
        <link rel="icon" type="image/png" href="<?= base_url('assets/img/favicon.ico'); ?>">
        <!-- Importação CSS Bootstrap -->
        <link type="text/css" href="<?= base_url('assets/plugins/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">

        <!-- Importação CSS customizações  -->
        <link type="text/css" href="<?= base_url('assets/css/style.css'); ?>" rel="stylesheet">

        <!-- Importação jQuery -->
        <script src="<?= base_url('assets/plugins/jquery/jquery-3.4.1.min.js'); ?>"></script>
        <!-- Importação JS Bootstrap -->
        <script src="<?= base_url('assets/plugins/bootstrap/js/bootstrap.min.js'); ?>"></script>

        <!-- Importação FontAwesome 5 -->
        <script defer src="<?= base_url('assets/plugins/fontawesome/js/all.min.js'); ?>"></script>

        <!-- Importação do JS Default da aplicação -->
        <script src="<?= base_url('assets/js/default.js'); ?>"></script>
    </head>

    <body class="bg-default">
        <!-- Loader -->
        <div class="loader" id="loader" style="display:none; z-index:100000;">
            <img class="loader-image" src="<?= base_url('assets/img/ajax-loader.gif') ?>" alt="loader" />
        </div>

        <!-- Exibição da navbar somente caso o usuário esteja logado -->
        <?php if($this->session->login === TRUE): ?>   
            <div class="row">
                <div class="col-lg-12">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="col-lg-1">
                            <img src="<?= base_url('assets/img/login/logo-hogwarts.jpg') ?>" class="navbar-logo">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse" id="nav">
                            <ul class="navbar-nav">
                                <li class="nav-item" id="nav_bruxo">
                                    <a class="nav-link" href="<?= site_url('Aluno/index')?>">Meus Bruxos </a>
                                </li>
                                <li class="nav-item" id="nav_usuario">
                                    <a class="nav-link" href="<?= site_url('Usuario/index')?>">Usuários</a>
                                </li>
                            </ul>                                                
            
                            <ul class="navbar-nav ml-auto flex-sm-column flex-lg-row">
                                <div class="dropdown dropdown-menu-right">
                                    <li class="nav-item">
                                        <div class="btn-group dropleft" role="group">
                                            <button class="btn btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="exitDrop">
                                                <i class="fas fa-sliders-h fa-lg"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="exitDrop">
                                                <a class="dropdown-item" href="<?= site_url('Usuario/index')?>"><i class="fas fa-user"></i> <?= $this->session->nome?></a>
                                                <a class="dropdown-item" href="<?= site_url('Usuario/index')?>"><i class="fas fa-envelope"></i> <?= $this->session->email?></a>
                                                <a class="dropdown-item" id="btn_exit"  href="<?= site_url('Usuario/sair')?>"><i class="fas fa-sign-out-alt"></i> Sair</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        <?php endif; ?>
        <!-- FLASHDATA -->
        <?php if($this->session->flashdata('mensagem')): ?>  <!-- Não é necessário realizar isset nas variáveis pois o CI faz a checagem -->
            <br/>
                <div class="row justify-content-center container col-md-12">
                    <div class="col-md-12">
                        <div class="alert alert-<?php echo $this->session->flashdata('mensagem')['classe'];?>" role="alert">
                            <?php echo $this->session->flashdata('mensagem')['mensagem']; ?>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
        <?php endif; ?>

        <!-- Mensagem ajax -->
        <div class="col-md-12 margin-top">
            <div class="row justify-content-center container col-md-12" id="msgAjax" style="display:none">
                
            </div>
        </div>
      