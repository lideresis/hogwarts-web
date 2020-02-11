$(document).ready(function(){
    
    /**
	 * Antecipa o evento de submit e realiza a requisição por ajax para evitar o reload desnecessário da página.
	 * Utilizado para formulário de edição
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
    $('#form_login').on('submit', function(form){
        form.preventDefault();
        loader();
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: $(this).serialize()
        }).done(function (resposta) {
            loader();
            window.location.replace(resposta.url); 
        })
        .fail(function(resposta){
            loader();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            //400 - Bad Request.
            //401 - Unauthorize Access. 
            if(resposta.status === 400 || resposta.status === 401){  
                $('#email_erro_login').html((!!resposta.responseJSON.email) ? resposta.responseJSON.email : '');
                $('#senha_erro_login').html((!!resposta.responseJSON.senha) ? resposta.responseJSON.senha : '');

                if (!!resposta.responseJSON.mensagem && !!resposta.responseJSON.mensagem)
                    mensagem({
                        'mensagem': resposta.responseJSON.mensagem,
                        'classe':  resposta.responseJSON.classe
                    });
            }
            else if(resposta.status === 403){
            //403 - Forbidden.
                mensagem({
                    'mensagem': 'Tempo de envio das informações expirado, por favor, recarregue a página.',
                    'classe': 'warning'
                });
            }
            else{
                changeCSRF(resposta.responseJSON.csrf);
                mensagem({
                    'mensagem': 'Erro inesperado ao tentar realizar login.',
                    'classe': 'danger'
                });
                console.error(`HTTP Status: ${resposta.status} (${resposta.statusText}). Unexpected behavior.`); 
            }
        })
    });
});