<div class="row">
    <div class="col-lg-12">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="col-lg-1">
                <img src="<?= base_url('assets/img/login/logo-hogwarts.jpg') ?>" class="navbar-logo">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="nav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Meus Bruxos <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Usuários</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <div class="dropdown">
                        <li class="nav-item">
                            <div class="btn-group dropleft" role="group">
                                <button class="btn btn-secondary dropdown-toggledropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="exitDrop">
                                <i class="fas fa-sliders-h fa-lg"></i>
                                <div class="dropdown-menu" aria-labelledby="exitDrop">
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <table class="table">
            <thead class="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Bruxo</th>
                <th scope="col">Especialidade</th>
                <th scope="col">Idade</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <?php $this->load->view('bruxos/bruxos_tabela');
                
                ?>
                
            </tbody>
        </table>
    </div>
</div>