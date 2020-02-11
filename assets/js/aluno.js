$(document).ready(function(){

    // Alterando link selecionado na navbar
    $(".nav li").removeClass("active");
    $('#nav_bruxo').addClass('active');

    /**
	 * Quando clique é feito na linha da tabela, seleciona a linha, exibe botões de edição e atribui values ao modal de edição.
	 * Caso seja um double click, abre o modal
	 * @access public
	 * @version 1.0.0 - 8 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#tbody_tabela').on('click dblclick', 'tr', function (evento) {
        $('#btn_desativar, #btn_editar').removeClass('d-none').show();

        //Removendo destaque de linhas já com destaque e aplicando na linha selecionada
        $(this).addClass('bg-secondary text-light');
        $(this).siblings().removeClass('bg-secondary text-light');

        //Limpando campos de erro
        $('small').html('');

        //Atribuindo valores para o modal de edição conforme a linha selecionada, a partir dos "datas" da tabela
        $('#editar_idaluno').val($(this).data('idaluno'));
        $('#desativar_idaluno').val($(this).data('idaluno'));
        $('#editar_nome').val($(this).data('nome'));
        $('#editar_especialidade').val($(this).data('especialidade'));
        $('#editar_idade').val($(this).data('idade'));
        $('#editar_casa').val($(this).data('casa'));

         //Atribuindo value para checkbox caso não tenha sido preenchida
         if($(this).data('status') == 1){
            $('#ativo').prop('checked', true);
        }
        else{
            $('#ativo').prop('checked', false);
        }

        //Em caso de clique duplo na linha, dispara o modal de edição automaticamente
        if (evento.type === 'dblclick')
            $('#btn_editar').trigger('click');
    });

    /**
	 * Exibe o modal ao clicar no botão de edição
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#btn_editar').on('click', function(){
        $('#modal_editar_aluno').show();
        setTimeout( function(){ 
            $('#editar_nome').focus();
        }, 200);
    });

    
    /**
	 * Limpa os campos do modal de inserção ao reabrí-lo.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array dados - parâmetros para inserção na tabela
	 * @return void
	 */
    $('#btn_inserir').on('click', function(){
        $('#inserir_aluno_form').find(':input').each(function(){
            $(this).val('');
        });
    });

    /**
	 * Antecipa o evento de submit e realiza a requisição por ajax para evitar o reload desnecessário da página.
	 * Utilizado para formulário de inserção
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#inserir_aluno_form').on('submit', function (form) {
        form.preventDefault();
        let formulario = $(this);
        loader();

        $.ajax({
            //Pegando infos do formulário para requisição AJAX
            url: formulario.attr('action'), 
            method: formulario.attr('method'),
            data: formulario.serialize(),
        })
        .done(function (resposta) {
            $('#modalInserirAluno').modal('hide');
            if (!!resposta['mensagem'] && !!resposta['classe']) {
                mensagem({
                    'mensagem': resposta['mensagem'],
                    'classe': resposta['classe']
                });
            }
            $('#btn_filtrar').trigger('click');
        })
        .fail(function (resposta) {
            if (resposta.status === 400 || resposta.status === 500 || resposta.status === 502) {
                $('#inserir_nome_erro').html( resposta.responseJSON['nome'] || '');
                $('#inserir_especialidade_erro').html( resposta.responseJSON['especialidade'] || '');
                $('#inserir_idade_erro').html( resposta.responseJSON['idade'] || '');
                $('#inserir_casa_erro').html( resposta.responseJSON['casa'] || '');
            }
            else {
                mensagem({
                    'mensagem': `Erro inesperado ao tentar inserir aluno.`,
                    'classe': 'danger'
                });
                console.error(`HTTP Status: ${resposta.status} (${resposta.statusText}). Unexpected behavior.`);
            }
            loader();
        })
        .catch(function () {
            return false;
        });
    });

    /**
	 * Antecipa o evento de submit e realiza a requisição por ajax para evitar o reload desnecessário da página.
	 * Utilizado para formulário de edição
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#editar_aluno_form').on('submit', function (form) {
        form.preventDefault();
        let formulario = $(this);
        loader();
        $.ajax({
            //Pegando infos do formulário para requisição AJAX
            url: formulario.attr('action'), 
            method: formulario.attr('method'),
            data: formulario.serialize(),
        })
        .done(function (resposta) {
            $('#modalEditarAluno').modal('hide');
            if (!!resposta['mensagem'] && !!resposta['classe']) {
                mensagem({
                    'mensagem': resposta['mensagem'],
                    'classe': resposta['classe']
                });
            }
            $('#btn_filtrar').trigger('click');
        })
        .fail(function (resposta) {
            if (resposta.status === 400 || resposta.status === 500 || resposta.status === 502) {
                $('#editar_nome_erro').html( resposta.responseJSON['nome'] || '');
                $('#editar_especialidade_erro').html( resposta.responseJSON['especialidade'] || '');
                $('#editar_idade_erro').html( resposta.responseJSON['idade'] || '');
                $('#editar_casa_erro').html( resposta.responseJSON['idade'] || '');
                if (!!resposta.responseJSON.mensagem)
                    mensagem(JSON.parse(resposta.responseJSON.mensagem));            
            }
            else {
                mensagem({
                    'mensagem': `Erro inesperado ao tentar inserir aluno.`,
                    'classe': 'danger'
                });
                console.error(`HTTP Status: ${resposta.status} (${resposta.statusText}). Unexpected behavior.`);
            }
        })
        .catch(function () {
            return false;
        })
    });


    /**
	 * Antecipa o evento de submit e realiza a requisição por ajax para evitar o reload desnecessário da página.
	 * Utilizado para formulário de desativação
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#desativar_aluno_form').on('submit', function (form) {
        form.preventDefault();
        let formulario = $(this);
        loader();
        $.ajax({
            //Pegando infos do formulário para requisição AJAX
            url: formulario.attr('action'), 
            method: formulario.attr('method'),
            data: formulario.serialize(),
        })
        .done(function (resposta) {
            if (!!resposta['mensagem'] && !!resposta['classe']) {
                mensagem({
                    'mensagem': resposta['mensagem'],
                    'classe': resposta['classe']
                });
            }
            $('#btn_filtrar').trigger('click');
        })
        .fail(function (resposta) {
            if (resposta.status === 400 || resposta.status === 500 || resposta.status === 502) {
                if (!!resposta.responseJSON.mensagem)
                    mensagem(JSON.parse(resposta.responseJSON.mensagem));            
            }
            else {
                mensagem({
                    'mensagem': `Erro inesperado ao tentar inserir aluno.`,
                    'classe': 'danger'
                });
                console.error(`HTTP Status: ${resposta.status} (${resposta.statusText}). Unexpected behavior.`);
            }
        })
        .catch(function () {
            return false;
        })
    });
    
});