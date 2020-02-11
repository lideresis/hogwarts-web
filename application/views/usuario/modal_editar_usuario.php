<div class="modal fade" id="modalEditarUsuario" tabindex="-1" role="dialog" aria-labelledby="modalEditarUsuarioLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Alterar usuário</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="<?= site_url('Usuario/editarUsuario')?>" method="post" id="editar_usuario_form" accept-charset="UTF-8" role="form">
                <div class="modal-body">
                    <input type="hidden" id="editar_idusuario" name="idusuario">
                    <div class="col-md-12">
                        <label for="nome">Nome</label>
                        <input type="text" class="form-control col-form-label-lg" id="editar_nome" name="nome" placeholder="Harry Potter">
                        <small class="text-danger" id="editar_nome_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="email">Email</label>
                        <input type="email" class="form-control col-form-label-lg" id="editar_email" name="email" placeholder="harry@hogwarts.com">
                        <small class="text-danger" id="editar_email_erro"></small>
                    </div>
                    <br/>
                    <div class="col-md-12">
                        <label for="casa">Senha</label>
                        <input type="password" class="form-control col-form-label-lg" id="editar_senha" name="senha">
                        <p class="text-info" id="editar_senha_info">*Deixe em branco para não alterar.</p>
                        <small class="text-danger" id="editar_senha_erro"></small>
                    </div>
                    <div class="col-md-12">
                            <input type="checkbox" id="ativo" name="ativo" value="1">
                            <label for="ativo">Ativo</label>
                            <small class="text-danger" id="editar_ativo_erro"></small>
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