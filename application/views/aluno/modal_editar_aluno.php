<div class="modal fade" id="modalEditarAluno" tabindex="-1" role="dialog" aria-labelledby="modalEditarAlunoLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Alterar bruxo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="<?= site_url('Aluno/editarAluno')?>" method="post" id="editar_aluno_form" accept-charset="UTF-8" role="form">
                <div class="modal-body">
                    <input type="hidden" id="editar_idaluno" name="idaluno">
                    <div class="col-md-12">
                        <label for="nome">Nome</label>
                        <input type="text" class="form-control col-form-label-lg" id="editar_nome" name="nome" placeholder="Harry Potter">
                        <small class="text-danger" id="editar_nome_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="especialidade">Especialidade</label>
                        <input type="text" class="form-control col-form-label-lg" id="editar_especialidade" name="especialidade" placeholder="Voar">
                        <small class="text-danger" id="editar_especialidade_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="idade">Idade</label>
                        <input type="number" class="form-control col-form-label-lg" id="editar_idade" name="idade" placeholder="12" min="1" max="1000">
                        <small class="text-danger" id="editar_idade_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="casa">Casa</label>
                        <select class="form-control form-control-lg" id="editar_casa" name="casa">
                            <option value="1">Grifinória</option>
                            <option value="2">Sonserina</option>
                            <option value="3">Corvinal</option>
                            <option value="4">Lufa-Lufa</option>
                        </select>
                        <small class="text-danger" id="editar_casa_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                            <input type="checkbox" id="ativo" name="ativo" value="1">
                            <label for="ativo">Ativo</label>
                            <small class="text-danger" id="editar_ativo_erro"></small>
                    </div>
                    <br/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</div>