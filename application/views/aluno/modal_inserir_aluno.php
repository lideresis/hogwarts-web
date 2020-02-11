<div class="modal fade" id="modalInserirAluno" tabindex="-1" role="dialog" aria-labelledby="modalInserirAlunoLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Inserir Aluno</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="<?= site_url('Aluno/inserirAluno')?>" method="post" id="inserir_aluno_form" accept-charset="UTF-8" role="form">
                <div class="modal-body">
                    <div class="col-md-12">
                        <label for="nome">Nome</label>
                        <input type="text" class="form-control col-form-label-lg" id="inserir_nome" name="nome" placeholder="Harry Potter">
                        <small class="text-danger" id="inserir_nome_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="especialidade">Especialidade</label>
                        <input type="text" class="form-control col-form-label-lg" id="inserir_especialidade" name="especialidade" placeholder="Voar">
                        <small class="text-danger" id="inserir_especialidade_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="idade">Idade</label>
                        <input type="number" class="form-control col-form-label-lg" id="inserir_idade" name="idade" placeholder="12" min="1" max="1000">
                        <small class="text-danger" id="inserir_idade_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="casa">Casa</label>
                        <select class="form-control form-control-lg" id="inserir_casa" name="casa">
                            <option value="1">Grifinória</option>
                            <option value="2">Sonserina</option>
                            <option value="3">Corvinal</option>
                            <option value="4">Lufa-Lufa</option>
                        </select>
                        <small class="text-danger" id="inserir_casa_erro"></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>