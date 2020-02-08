<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<br/>
<div class="row text-center">
    <div class="offset-lg-3 col-md-6">
        <div class="card">
            <div class="card-header text-left">
                LOGIN
            </div>
            <div class="card-body">
                <img src="<?= base_url('assets/img/login/logo-hogwarts.jpg'); ?>" class="login-logo">
                <h5 class="card-title">Hogwarts School</h5>
            </div>
            <form action="" method="post">
                <div class="form-group">
                    <input type="email" class="form-control col-lg-8 offset-lg-2" id="email" placeholder="exemplo@exemplo.com">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control col-lg-8 offset-lg-2" id="senha" placeholder="Senha">
                </div>
                <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block col-lg-8 offset-lg-2" type="submit">Sign in</button>
                </div>
            </form>
        </div>
        <br/>
    </div>
</div>

