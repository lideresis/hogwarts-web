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
            <form action="<?= site_url('Login/login');?>" method="post">
                <div class="form-group">
                    <div class="input-group offset-lg-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="prependEmail"><i class="fas fa-envelope-open"></i></span>
                        </div>
                        <input type="email" class="form-control col-lg-8" id="email" name="email" placeholder="exemplo@exemplo.com" aria-describedby="prependEmail" required>
                    </div>
                </div>

                <div class="form-group">
                </div>
                <div class="form-group">
                    <div class="input-group offset-lg-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="prependPass"><i class="fas fa-lock-open"></i></span>
                        </div>
                        <input type="password" class="form-control col-lg-8" id="senha" name="senha" placeholder="Senha"  aria-describedby="prependPass" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block col-lg-4 offset-lg-4" type="submit">
                    <i class="fas fa-sign-in-alt"></i> Login</button>
                </div>
            </form>
        </div>
        <br/>
    </div>
</div>

