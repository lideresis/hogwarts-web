/* JS COM AÇÕES DEFAULT QUE É CHAMADO EM TODAS AS PÁGINAS */


/**
 * Exibe ou oculta loader.
 * @access public
 * @version 1.0.0 - 10 de Fevereiro de 2020
 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
 * @return void
 */
const loader = () => {
    $('#loader').fadeToggle();
};


/**
 * Exibe mensagem de erro ou sucesso.
 * @access public
 * @version 1.0.0 - 10 de Fevereiro de 2020
 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
 * @param json json indica qual a classe bootstrap (success, warning, danger, etc) e o corpo de texto da mensagem
 * @return void
 */
const mensagem = (json) =>{
    //Criando variável contendo a mensagem, classe e texto
    let msg = `
            <div class="row justify-content-center container col-md-12">
                <div class="col-md-12">
                    <div class="alert alert-${json.classe}" role="alert">
                        ${json.mensagem}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>`;

    //Exibindo mensagem após chamada da função
    $('#msgAjax').html(msg).fadeIn();

    //Removendo mensagem após 5 segundos
    setTimeout(function(){
        $('#msgAjax').html('').fadeOut();

    },5000);
};

$(document).ready(function(){
    
    
    /**
	 * Limpando o formulário de filtro da página.
	 * Para funcionar de maneira genérica, manter formulário de filtro com este id ("filtrar")
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#btn_limpar').on('click', function (){
        $('#filtrar').find(':input').each(function(){
            $(this).val('');
        });

        // Timeout para clique automático no botão de pesquisa
        setTimeout(function(){
            $('#btn_filtrar').trigger('click');
        },200);
    });


     /**
     * Intercepta o evento e realiza busca no banco através de requisição ajax
     *
     * @version 1.0.0 - 10 de Fevereiro de 2020
     * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
     * @return void
     */
    $('#filtrar').on('submit', function (form) {
        form.preventDefault();
        if($('#loader').css('display') === 'none')
        loader();
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: $(this).serialize()
        }).done(function (resposta) {
            $('#btn_editar, #btn_desativar').hide();
            $('#tbody_tabela').html('');
            $('#tbody_tabela').html(resposta.tabela);
            $('#tbody_tabela [data-tooltip="tooltip"]').tooltip(); //inicia tooltips se presentes
        })
        .fail(function (resposta) {
            if (resposta.status === 403) //403 - Forbidden. Erro de acesso, pede para o cliente recarregar a página
            {
                mensagem({
                    'mensagem': 'Tempo de envio das informações expirado, por favor, recarregue a página.',
                    'classe': 'warning'
                });
            }
            else 
            {
                mensagem({
                    'mensagem': 'Erro inesperado ao tentar realizar filtros, por favor, recarregue a página.',
                    'classe': 'danger'
                });
                console.error(`HTTP Status: ${resposta.status} (${resposta.statusText}). Unexpected behavior.`);
            }
        })
        .always(function () {
            loader();
        });
    });
    
});