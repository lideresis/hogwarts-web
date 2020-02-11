<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct(){
		// Construtor do CI_Controller
		parent::__construct(); 

		//Caso esteja logado, redireciona para página principal 
		if($this->session->login === TRUE){
			redirect('Aluno');
		}
	}
	
	public function index(){
		$this->load->view('layout/header');
		$this->load->view('login');
		//$this->load->view('layout/footer');
	}

	/**
	 * Recebe formulário de login, valida campos e realiza login
	 *
	 * @access public
	 * @version 1.0.0 - 08 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function login(){
		$post = $this->input->post();
		$this->load->library('form_validation');

		// Verificando se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'email',
				'label' => 'email',
				'rules' => 'required|valid_email',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'valid_email' => '*É necessário informar um %s válido.'
				)
			),
			array(
				'field'  => 'senha',
				'label'  => 'senha',
				'rules'  => 'required',
				'errors' => array(
					'required' => '*É necessário informar uma %s.',
				)
			)
		);

		$this->form_validation->set_rules($config);
		if ($this->form_validation->run() === FALSE){

			$resposta = array(
				'email'          => form_error('email'),
				'senha'          => form_error('senha')
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta));
		}
		else{
			// Caso o login seja possível
			if($this->verificaLogin($post['email'], $post['senha'])){
				$this->session->set_flashdata('mensagem', array(
					'mensagem' => "Seja bem vindo, ". $this->session->nome . "!",
					'classe' =>  'success'
				));
				
				//Passando url de redirecionamento para o JS 	
				$resposta = array(
					'url'     => site_url('Aluno')
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Credenciais informadas estão erradas!',
					'classe' => 'danger'
				);
				$this->output->set_status_header(401);
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta));
		}
	}

	

	/**
	 * Recebe informações de login e verifica autenticidade das mesmas
	 * Inicializa a sessão com as informações do usuário
	 *
	 * @access private
	 * @version 1.0.0 - 08 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param string $email (post)
	 * @param string $senha (post)
	 * @return bool
	 */
	private function verificaLogin(string $email, string $senha){		
		$this->load->model('LoginModel');
		
		if($info = $this->LoginModel->buscarInfoUsuario($email)){
			if(count($info) > 0){
				if(password_verify($senha, $info['senha'])){
					$this->session->set_userdata('idusuario', $info['idusuario']);
					$this->session->set_userdata('email', $info['email']);
					$this->session->set_userdata('nome', $info['nome']);
					$this->session->set_userdata('login', TRUE);
					return TRUE;
				}
				else{	
					return FALSE;
				}
			}
		}
		return FALSE;
	}
}
