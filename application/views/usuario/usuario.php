
<form id="filtrar" action="<?= site_url('Usuario/buscarUsuario');?>" method="post">
    <div class="row margin-top margin-left horizontal-container">
        <div class="col-md-2">
            <label for="nome">Nome</label>
            <input type="text" class="form-control col-form-label-lg" id="nome_filtro" name="nome" placeholder="Harry Potter" value="<?= $this->session->filtro_usuario['nome'] ?? '' ?>">
        </div>
        <div class="col-md-3">
            <label for="especialidade">Email</label>
            <input type="text" class="form-control col-form-label-lg" id="email_filtro" name="email" placeholder="harry@hogwarts.com" value="<?= $this->session->filtro_usuario['email'] ?? '' ?>">
        </div>
        <div class="col-md-2">
            <label  for="Status">Ativo</label>
            <select class="form-control form-control-lg" id="status_filtro" name="status">
                <option value="">Qualquer</option>
                <option value="1" <?= isset($this->session->filtro_usuario['status']) && (int)$this->session->filtro_usuario['status'] === 1 ? 'selected' : '' ?>>Sim</option>
                <option value="0" <?= isset($this->session->filtro__usuario['status']) && (int)$this->session->filtro_usuario['status'] === 0 ? 'selected' : '' ?>>Não</option>
            </select>
        </div>
        <div class="col-md-1">
            <label>&nbsp;</label>
            <button type="button" class="btn btn-outline-success btn-lg col-md-12" id="btn_inserir" title="Inserir aluno" data-target="#modalInserirUsuario" data-toggle="modal" data-tooltip="tooltip" data-placement="top">
                <i class="fas fa-plus"></i> Novo
            </button>
        </div>
        <div class="col-md-2">
            <label>&nbsp;</label>
            <button type="button" class="btn btn-outline-dark btn-lg col-md-12" id="btn_limpar"><i class="fas fa-broom"></i> Limpar</button>
        </div>
        <div class="col-md-2">
            <label>&nbsp;</label>
            <button type="submit" class="btn btn-primary btn-lg col-md-12" id="btn_filtrar"><i class="fas fa-search"></i> Filtrar</button>
        </div>
    </div>
</form>
<br/>

<div class="row horizontal-container">
    <div class="col-lg-12">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col" class="text-center">Ativo</th>
                </tr>
            </thead>
            <tbody id="tbody_tabela">
                <?php $this->load->view('usuario/usuario_tabela');?>
            </tbody>
        </table>
    </div>
</div>
<?php 
    $this->load->view('usuario/modal_inserir_usuario');
    $this->load->view('usuario/modal_editar_usuario');
?>
 <div class="d-flex fixed-bottom margin-bottom">
    <div class="p-2">
        <button class="btn btn-warning d-none" type="button" id="btn_editar" title="Alterar bruxo" data-target="#modalEditarUsuario" data-toggle="modal" data-tooltip="tooltip" data-placement="top">
            <i class="fas fa-user-edit"></i>
        </button>
        <button class="btn btn-danger d-none" type="submit" id="btn_desativar" title="Desativar bruxo" form="desativar_usuario_form">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</div>

<form accept-charset="UTF-8" role="form" action="<?= site_url('Usuario/desativarUsuario') ?>" method="post" id="desativar_usuario_form">
    <input type="hidden" id="desativar_idusuario" name="idusuario">
</form>

<script src="<?= base_url('assets/js/usuario.js'); ?>"></script>
