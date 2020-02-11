<div class="modal fade" id="modalInserirUsuario" tabindex="-1" role="dialog" aria-labelledby="modalInserirUsuarioLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Inserir Usuário</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="<?= site_url('Usuario/inserirUsuario')?>" method="post" id="inserir_usuario_form" accept-charset="UTF-8" role="form">
                <div class="modal-body">
                    <div class="col-md-12">
                        <label for="nome">Nome</label>
                        <input type="text" class="form-control col-form-label-lg" id="inserir_nome" name="nome" placeholder="Harry Potter">
                        <small class="text-danger" id="inserir_nome_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="email">Email</label>
                        <input type="email" class="form-control col-form-label-lg" id="inserir_email" name="email" placeholder="harry@hogwarts.com">
                        <small class="text-danger" id="inserir_email_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="casa">Senha</label>
                        <input type="password" class="form-control col-form-label-lg" id="inserir_senha" name="senha">
                        <small class="text-danger" id="inserir_senha_erro"></small>
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