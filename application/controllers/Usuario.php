<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {

	public function __construct(){
		// Construtor do CI_Controller
		parent::__construct();

		//Caso não esteja logado, redireciona para página de login
		if(!$this->session->login === TRUE){
			redirect('Login', 'refresh');
		}
	}
	
	public function index(){
		//Chama função de busca e manda TRUE como parâmetro para sinalizar que a chamada é através da função Index
		$dados = $this->buscarUsuario(TRUE);

		//Definindo título
		$info['titulo'] = 'Usuários'; 

		//Carregando views
        $this->load->view('layout/header', $info);
        $this->load->view('usuario/usuario',$dados);
		$this->load->view('layout/footer');
	}
	

	/**
	 * Realiza busca de informações da tabela baseado nos filtros oferecidos pelo usuário.
	 * Pode ser chamada via Ajax ou PHP. 
	 *
	 * @access public
	 * @version 1.0.0 - 08 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param bool $index - indica se a requisição é ajax ou php. Caso ajax, o "retorno" para o browser é apenas um echo.
	 * @return bool
	 */
	public function buscarUsuario(bool $index = FALSE){
		//Caso esteja vindo de um reload da página ou de um primeiro acesso, pega informações da SESSION
		//Caso contrário, pega da submissão do form
		$post = ($index) ? $this->session->userdata('filtro_usuario') : $this->input->post();

		//Colocando informações recebidas na session, para que permaneçam nos filtros após reload.
		$this->session->set_userdata('filtro_usuario', $post);

		
		$this->load->model('UsuarioModel');

		// Parâmetros que serão enviados para a query.
		$consulta_where = array();
		$consulta_like = array();

		/*Verificando quais filtros devem ser aplicados, fazendo verificações se os campos forma preenchidos*/
		if(isset($post['nome']) && !!$post['nome']){
			$consulta_like['nome'] = mb_strtoupper($post['nome']);
		}

		if(isset($post['email']) && !!$post['email']){
			$consulta_like['email'] = $post['email'];
		}

		if(isset($post['status']) && is_numeric($post['status'])){
			$consulta_where['status'] = $post['status'];
		}

		if($dados['usuarios'] = $this->UsuarioModel->buscarUsuario($consulta_where, $consulta_like)){
			if($index){
				return $dados;
			}
			else{
				//Caso seja requisição ajax, retorna a view da tabela em formato de string para ser aplicada no corpo da tabela via JS.
				$resposta = array(
					'tabela' => $this->load->view('Usuario/usuario_tabela', $dados, TRUE),
				);
				$this->output->set_content_type('application/json', 'utf-8');
				$this->output->set_output(json_encode($resposta));
			}
		}
	}

	
	/**
	 * Checa se informações fornecidas via post são válidas e realiza inserção no banco.
	 * Em caso de erro, retorna erro para o ajax.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function inserirUsuario(){
		$post = $this->input->post();
		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'nome',
				'label' => 'Nome',
				'rules' => 'required|max_length[150]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'email',
				'label' => 'Email',
				'rules' => 'required|max_length[60]|valid_email|is_unique[usuario.email]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
                    'max_length' => '*%s informado é muito grande.',
                    'valid_email' => '%s informado não é válido.',
                    'is_unique' => '%s informado já existe na base de dados.'
				)
			),
			array(
				'field' => 'senha',
				'label' => 'Senha',
				'rules' => 'required|callback_validacao_senha',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'validacao_senha' => '*%s deve conter pelo menos 8 caractéres, incluindo uma letra e um número.'
				)
			)
		);

		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nas tags "small" referentes a cada campo.
			$info['resposta'] = array(
				'nome'          		=> form_error('nome'),
				'email'                 => form_error('email'),
				'senha'        			=> form_error('senha')
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a inserção no banco é realizada
			$dados = array(
				'nome'      			=> mb_strtoupper($post['nome']),
				'email' 		        => $post['email'],
				'senha'					=> password_hash($post['senha'], PASSWORD_DEFAULT),
			);

			$this->load->model('UsuarioModel');
			
			if($this->UsuarioModel->inserirUsuario($dados)){
				$resposta = array(
					'mensagem' => 'Usuário criado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao criar usuário!',
					'classe'   => 'danger'
				);

				$this->output->set_status_header(500); //Setando código do erro para o browser (erro interno)
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta)); //Enviando retorno para ajax
		}
	}

	
	/**
	 * Checa se informações fornecidas via post são válidas e realiza update no banco.
	 * Em caso de erro, retorna erro para o ajax.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function editarUsuario(){
		$post = $this->input->post();

		// Atribuindo value para a checkbox caso não preenchida
		if(!isset($post['ativo'])){
			$post['ativo'] = 0;
        }
        
        //Checa se o email já existe no banco apenas caso o email tenha sido alterado para este usuário
        $info = $this->verificaEmailUsuario($post['email']);
        $unique_email = $info['email'] != $post['email'] ? '|is_unique[usuario.email]'  : '';

		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'nome',
				'label' => 'Nome',
				'rules' => 'required|max_length[150]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'email',
				'label' => 'Email',
				'rules' => 'required|max_length[60]|valid_email'.$unique_email,
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
                    'max_length' => '*%s informado é muito grande.',
                    'valid_email' => '%s informado não é válido.',
                    'is_unique' => '%s informado já existe na base de dados.'
				)
			),
			array(
				'field' => 'ativo',
				'label' => 'ativo',
				'rules' => 'in_list[0,1]',
				'errors' => array(
					'in_list[0,1]'    => '*É necessário informar se o usuário está %s.',
				)
			),
	
			//Erro com o "idusuario" só acontecerá se o campo for modificado no HTML manualmente.
			//Dessa forma, é predefinido um erro genérico, que será exibido em uma mensagem e não em um small.
			array(
				'field' => 'idusuario',
				'label' => 'idusuario',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*Algo deu errado. Recarregue a página e tente novamente',
					'is_natural_no_zero' => '*Algo deu errado. Recarregue a página e tente novamente'
				)
			)
		);

        if(isset($post['senha']) && !!$post['senha']){
            //Apenas caso o campo tenha sido preenchido valida, se não a senha não é alterada.
            $config[] = array(
                            'field' => 'senha',
                            'label' => 'Senha',
                            'rules' => 'callback_validacao_senha',
                            'errors' => array(
                                'required'    => '*É necessário informar um %s.',
                                'validacao_senha' => '*%s deve conter pelo menos 8 caractéres, incluindo uma letra e um número.'
                            )
                        );
		}
		
		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nas tags "small" referentes a cada campo.
			$info['resposta'] = array(
				'nome'          		=> form_error('nome'),
				'email'                 => form_error('email'),
				'senha'        			=> form_error('senha'),
				'ativo'					=> form_error('ativo'),
				'mensagem'				=> form_error('idusuario'),
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a inserção no banco é realizada
			$dados = array(
				'nome'      			=> mb_strtoupper($post['nome']),
				'email' 		        => $post['email'],
				'idusuario'				=> $post['idusuario'],
				'status'				=> $post['ativo']
			);

            if(isset($post['senha']) && !!$post['senha']){
                $dados['senha'] = password_hash($post['senha'], PASSWORD_DEFAULT);
            }

			$this->load->model('UsuarioModel');
			
			if($this->UsuarioModel->editarUsuario($dados)){
				$resposta = array(
					'mensagem' => 'Usuário atualizado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao atualizar usuário!',
					'classe'   => 'danger'
				);

				$this->output->set_status_header(500); //Setando código do erro para o browser (erro interno)
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta)); //Enviando retorno para ajax
		}
	}

	/**
	 * Recebe idUsuário através do post, verifica se informações são validas e desativa usuário.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function desativarUsuario(){
		$post = $this->input->post();
		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'idusuario',
				'label' => 'idusuario',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*Algo deu errado. Recarregue a página e tente novamente',
					'is_natural_no_zero' => '*Algo deu errado. Recarregue a página e tente novamente'
				)
			)
		);

		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nas tags "small" referentes a cada campo.
			$info['resposta'] = array(
				'mensagem'   => form_error('idusuario')
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a query é realizada
			$dados = array(
				'idusuario'    => $post['idusuario']
			);

			$this->load->model('UsuarioModel');
			
			if($this->UsuarioModel->desativarUsuario($dados)){
				$resposta = array(
					'mensagem' => 'Usuário desativado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao desativar usuário!',
					'classe'   => 'danger'
				);

				$this->output->set_status_header(500); //Setando código do erro para o browser (erro interno)
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta)); //Enviando retorno para ajax
		}
    }
    
	/**
	 * Recebe senha do usuário e verifica se a mesma possui no mínimo 1 letra, um número e 8 caracteres.
	 * Utilizada como função de callback no form_validation
	 * @access private
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param string $pass - senha do usuário para verificação (post)
	 * @return bool
	 */
    public function validacao_senha($pass){
        if (preg_match("/^(?=.*[a-z])(?=.*\\d).{8,}$/i", $pass)){
            return TRUE;
        }
        return FALSE;
	}
	
	/**
	 * Destroi a session e redireciona, consequentemente forçando o usuário a fazer login.
	 * Função de sair não pode estar no "Login", pois construtor redirecionará.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function sair(){
        $this->session->sess_destroy();		
        redirect('Login','refresh');
    }
	

	/**
	 * Recebe email do usuário e verifica se já existe registro no banco
	 * Caso exista, posteriormente o form validation barra a utilização do email, pois deve ser único.
	 *
	 * @access private
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param string $email (post)
	 * @return mixed
	 */
    private function verificaEmailUsuario($email){
        $this->load->model('LoginModel');
        return $this->LoginModel->buscarInfoUsuario($email);
	}
	
} 