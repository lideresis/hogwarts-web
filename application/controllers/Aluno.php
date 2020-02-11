<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Aluno extends CI_Controller {

	public function __construct(){
		// Construtor do CI_Controller
		parent::__construct();
		if(!$this->session->login === TRUE){
			redirect('Login', 'refresh');
		}
	}
	
	public function index(){
		//Chama função de busca e manda TRUE como parâmetro para sinalizar que a chamada é através da função Index
		$dados = $this->buscarAluno(TRUE);

		//Definindo título
		$info['titulo'] = 'Meus Bruxos'; 

		//Carregando views
        $this->load->view('layout/header', $info);
        $this->load->view('aluno/aluno',$dados);
		$this->load->view('layout/footer');
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
	public function buscarAluno(bool $index = FALSE){
		//Caso esteja vindo de um reload da página ou de um primeiro acesso (função index), pega informações da SESSION
		//Caso contrário, pega da submissão do form
		$post = ($index) ? $this->session->userdata('filtro_aluno') : $this->input->post();
		$this->session->set_userdata('filtro_aluno', $post);
		$this->load->model('AlunoModel');
		$consulta_where = array();
		$consulta_like = array();

		/*Verificando quais filtros devem ser aplicados, fazendo verificações se os campos forma preenchidos*/
		if(isset($post['nome']) && !!$post['nome']){
			$consulta_like['nome'] = mb_strtoupper($post['nome']);
		}

		if(isset($post['especialidade']) && !!$post['especialidade']){
			$consulta_like['especialidade'] = mb_strtoupper($post['especialidade']);
		}

		if(isset($post['status']) && is_numeric($post['status'])){
			$consulta_where['status'] = $post['status'];
		}

		if(isset($post['casa']) &&  is_numeric($post['casa'])){
			$consulta_where['casa'] = $post['casa'];	
		}

		if($dados['alunos'] = $this->AlunoModel->buscarAlunos($consulta_where, $consulta_like)){
			if($index){
				return $dados;
			}
			else{
				//Caso seja requisição ajax, retorna a view da tabela como uma string para ser aplicada no corpo da tabela
				$resposta = array(
					'tabela' => $this->load->view('Aluno/aluno_tabela', $dados, TRUE),
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
	public function inserirAluno(){
		$post = $this->input->post();
		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'nome',
				'label' => 'nome',
				'rules' => 'required|max_length[150]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'especialidade',
				'label' => 'especialidade',
				'rules' => 'required|max_length[40]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'casa',
				'label' => 'casa',
				'rules' => 'required|in_list[0,1,2,4]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'in_list' => '*%s informada inválida.'
				)
			),
			array(
				'field' => 'idade',
				'label' => 'idade',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'is_natural_no_zero' => '*%s deve ser natural e diferente de zero.'
				)
			)
		);

		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nos SMALLS dos campos.
			$info['resposta'] = array(
				'nome'          		=> form_error('nome'),
				'especialidade'         => form_error('especialidade'),
				'idade'        			=> form_error('idade'),
				'casa'					=> form_error('casa')
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a inserção no banco é realizada
			$dados = array(
				'nome'      			=> mb_strtoupper($post['nome']),
				'especialidade' 		=> mb_strtoupper($post['especialidade']),
				'idade'					=> $post['idade'],
				'casa'					=> $post['casa']
			);

			$this->load->model('AlunoModel');
			
			if($this->AlunoModel->inserirAluno($dados)){
				$resposta = array(
					'mensagem' => 'Bruxo criado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao criar bruxo!',
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
	public function editarAluno(){
		$post = $this->input->post();

		// Atribuindo value para a checkbox caso não preenchida
		if(!isset($post['ativo'])){
			$post['ativo'] = 0;
		}

		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'nome',
				'label' => 'nome',
				'rules' => 'required|max_length[150]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'especialidade',
				'label' => 'especialidade',
				'rules' => 'required|max_length[40]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'max_length' => '*%s informado é muito grande.'
				)
			),
			array(
				'field' => 'idade',
				'label' => 'idade',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'is_natural_no_zero' => '*%s deve ser natural e diferente de zero.'
				)
			),
			array(
				'field' => 'casa',
				'label' => 'casa',
				'rules' => 'required|in_list[0,1,2,4]',
				'errors' => array(
					'required'    => '*É necessário informar um %s.',
					'in_list' => '*%s informada inválida.'
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
			//Erro com o "idaluno" só acontecerá se o campo for modificado no HTML manualmente.
			//Dessa forma, é predefinido um erro genérico, que será exibido em uma mensagem e não em um small.
			array(
				'field' => 'idaluno',
				'label' => 'idaluno',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*Algo deu errado. Recarregue a página e tente novamente',
					'is_natural_no_zero' => '*Algo deu errado. Recarregue a página e tente novamente'
				)
			)
		);

		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nos SMALLS dos campos.
			$info['resposta'] = array(
				'nome'          		=> form_error('nome'),
				'especialidade'         => form_error('especialidade'),
				'idade'        			=> form_error('idade'),
				'casa'					=> form_error('casa'),
				'mensagem'				=> form_error('idaluno'),
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a inserção no banco é realizada
			$dados = array(
				'nome'      			=> mb_strtoupper($post['nome']),
				'especialidade' 		=> mb_strtoupper($post['especialidade']),
				'idade'					=> $post['idade'],
				'casa'					=> $post['casa'],
				'idaluno'				=> $post['idaluno'],
				'status'				=> $post['ativo']
			);

			$this->load->model('AlunoModel');
			
			if($this->AlunoModel->editarAluno($dados)){
				$resposta = array(
					'mensagem' => 'Bruxo atualizado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao atualizar bruxo!',
					'classe'   => 'danger'
				);

				$this->output->set_status_header(500); //Setando código do erro para o browser (erro interno)
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta)); //Enviando retorno para ajax
		}
	}

	/**
	 * Recebe idUsuário através do post, verifica se informações são validas e desativa aluno.
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @return void
	 */
	public function desativarAluno(){
		$post = $this->input->post();
		$this->load->library('form_validation');

		// Validação back-end se campos foram preenchidos adequadamente
		$config = array(
			array(
				'field' => 'idaluno',
				'label' => 'idaluno',
				'rules' => 'required|is_natural_no_zero',
				'errors' => array(
					'required'    => '*Algo deu errado. Recarregue a página e tente novamente',
					'is_natural_no_zero' => '*Algo deu errado. Recarregue a página e tente novamente'
				)
			)
		);

		$this->form_validation->set_rules($config);

		if ($this->form_validation->run() === FALSE){
			// Em caso de erro, é retornado o erro via AJAX para que ele seja exibido nos SMALLS dos campos.
			$info['resposta'] = array(
				'mensagem'   => form_error('idaluno')
			);

			$this->output->set_status_header(400); //Indicando bad request ao browser
			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($info['resposta']));
		}
		else{
			// Em caso de sucesso, a query é realizada
			$dados = array(
				'idaluno'    => $post['idaluno']
			);

			$this->load->model('AlunoModel');
			
			if($this->AlunoModel->desativarAluno($dados)){
				$resposta = array(
					'mensagem' => 'Bruxo desativado com sucesso!',
					'classe'   => 'success'
				);
			}
			else{
				$resposta = array(
					'mensagem' => 'Erro ao desativar bruxo!',
					'classe'   => 'danger'
				);

				$this->output->set_status_header(500); //Setando código do erro para o browser (erro interno)
			}

			$this->output->set_content_type('application/json', 'utf-8');
			$this->output->set_output(json_encode($resposta)); //Enviando retorno para ajax
		}
	}
} 