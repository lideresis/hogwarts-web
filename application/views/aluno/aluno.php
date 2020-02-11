
<form id="filtrar" action="<?= site_url('Aluno/buscarAluno');?>" method="post">
    <div class="row margin-top horizontal-container">
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-3">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control col-form-label-lg" id="nome_filtro" name="nome" placeholder="Harry Potter" value="<?= $this->session->filtro_aluno['nome'] ?? '' ?>">
                </div>
                <div class="col-md-3">
                    <label for="especialidade">Especialidade</label>
                    <input type="text" class="form-control col-form-label-lg" id="especialidade_filtro" name="especialidade" placeholder="Voar" value="<?= $this->session->filtro_aluno['especialidade'] ?? '' ?>">
                </div>
                <div class="col-md-3">
                    <label for="casa">Casa</label>
                    <select class="form-control form-control-lg" id="casa_filtro" name="casa" >
                        <option value="">Qualquer</option>
                        <option value="1" <?= isset($this->session->filtro_aluno['casa']) && (int)$this->session->filtro_aluno['casa'] === 1 ? 'selected' : '' ?>>Grifinória</option>
                        <option value="2" <?= isset($this->session->filtro_aluno['casa']) && (int)$this->session->filtro_aluno['casa'] === 2 ? 'selected' : '' ?>>Sonserina</option>
                        <option value="3" <?= isset($this->session->filtro_aluno['casa']) && (int)$this->session->filtro_aluno['casa'] === 3 ? 'selected' : '' ?>>Corvinal</option>
                        <option value="4" <?= isset($this->session->filtro_aluno['casa']) && (int)$this->session->filtro_aluno['casa'] === 4 ? 'selected' : '' ?>>Lufa-Lufa</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label  for="Status">Ativo</label>
                    <select class="form-control form-control-lg" id="status_filtro" name="status">
                        <option value="">Qualquer</option>
                        <option value="1" <?= isset($this->session->filtro_aluno['status']) && (int)$this->session->filtro_aluno['status'] === 1 ? 'selected' : '' ?>>Sim</option>
                        <option value="0" <?= isset($this->session->filtro_aluno['status']) && (int)$this->session->filtro_aluno['status'] === 0 ? 'selected' : '' ?>>Não</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-4">
                    <label>&nbsp;</label>
                    <button type="button" class="btn btn-outline-success btn-lg col-md-12" id="btn_inserir" title="Inserir aluno" data-target="#modalInserirAluno" data-toggle="modal" data-tooltip="tooltip" data-placement="top">
                        <i class="fas fa-plus"></i> Novo
                    </button>
                </div>
                <div class="col-md-4">
                    <label>&nbsp;</label>
                    <button type="button" class="btn btn-outline-dark btn-lg col-md-12" id="btn_limpar"><i class="fas fa-broom"></i> Limpar</button>
                </div>
                <div class="col-md-4">
                    <label>&nbsp;</label>
                    <button type="submit" class="btn btn-primary btn-lg col-md-12" id="btn_filtrar"><i class="fas fa-search"></i> Filtrar</button>
                </div>
            </div>
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
                    <th scope="col">Bruxo</th>
                    <th scope="col">Especialidade</th>
                    <th scope="col">Casa</th>
                    <th scope="col" class="text-center">Idade</th>
                    <th scope="col" class="text-center">Ativo</th>
                </tr>
            </thead>
            <tbody id="tbody_tabela">
                <?php $this->load->view('aluno/aluno_tabela');?>
            </tbody>
        </table>
    </div>
</div>
<?php 
    $this->load->view('aluno/modal_inserir_aluno');
    $this->load->view('aluno/modal_editar_aluno');
?>
 <div class="d-flex fixed-bottom margin-bottom">
    <div class="p-2">
        <button class="btn btn-warning d-none" type="button" id="btn_editar" title="Alterar bruxo" data-target="#modalEditarAluno" data-toggle="modal" data-tooltip="tooltip" data-placement="top">
            <i class="fas fa-user-edit"></i>
        </button>
        <button class="btn btn-danger d-none" type="submit" id="btn_desativar" title="Desativar bruxo" form="desativar_aluno_form">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</div>

<form accept-charset="UTF-8" role="form" action="<?= site_url('Aluno/desativarAluno') ?>" method="post" id="desativar_aluno_form">
    <input type="hidden" id="desativar_idaluno" name="idaluno">
</form>

<script src="<?= base_url('assets/js/aluno.js'); ?>"></script>
