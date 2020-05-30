<?php
namespace Src\Controllers;
use Src\Models\User;
use Slim\Views\Twig as View;

class LoginController
{
	protected $view;
	
	public function __construct(View $view)
	{		
		$this->view = $view;
	}
		
	public function index($request, $response)
	{

		return $this->view->render($response, 'login.twig');
	}
	
	public function add($request, $response)
	{

		$salvou = false;
		if (($request->getParam('nome_completo') != '')
			&&($request->getParam('idade') != '')
				&&($request->getParam('especialidade') != '')) {
					User::create([
						'name' => $request->getParam('nome_completo'),
						'especialidade' => $request->getParam('especialidade'),
						'idade' => $request->getParam('idade'),
						'status' => $request->getParam('status') == 'on' ? 1 : 0,
						'password' => md5('1234'), // por enquanto sem campo de senha.
						'is_admin' => 0, // por enquanto sem controle administrativo.	
						// alguns campos que constam no banco foram omitidos aqui.
					]);
				$salvou = true;
		}

		session_start();
		if(isset($_SESSION["admin"]) && $_SESSION["admin"] == 1) {
			if ($salvou == true) {
				return $this->view->render($response, 'listing.twig', [
					'user_name' => $_SESSION["nome"],
					'user_email' => $_SESSION["email"],
					'listagem_alunos' => User::all()
				]);
			}
			return $this->view->render($response, 'add.twig');
		} else {
			print_r("Usuário não tem permissão de administrador");
		}
	}


	public function edit($request, $response)
	{

		session_start();
		if(!isset($_SESSION["admin"])) {
			print_r("Usuário não tem permissão de administrador");
			die;
		}

		$id 		= $request->getParam('id');
		$user 		= User::find($id);

		if ($request->getParam('nome_completo')
			    && $request->getParam('especialidade')
			    	&& $request->getParam('idade')){
							$user->name = $request->getParam('nome_completo');
							$user->especialidade = $request->getParam('especialidade');
							$user->idade = $request->getParam('idade');
							$user->status = $request->getParam('status') == 'on' ? 1 : 0;
							if($user->save()) {
								return $this->view->render($response, 'listing.twig', [
									'user_name' => $_SESSION["nome"],
									'user_email' => $_SESSION["email"],
									'listagem_alunos' => User::all()
								]);
							}					
		}

		return $this->view->render($response, 'edit.twig', [
				'id' => $user->id,
				'user_name' => $user->name,
				'idade' => $user->idade,
				'especialidade' => $user->especialidade,
				'status' => $user->status
			]);
	}


	public function checkUser($request, $response)
	{

        $username 	= $request->getParam('user_name');
		$userpwd 	= md5($request->getParam('password'));
		$users 		= User::where('password', '=', $userpwd)
							->where('name', '=', $username)->get();
		
		$page = 'login.twig';
		$user_name = '';
		$user_id = '';
		$user_email = '';
		$listagem_alunos = '';

		if(sizeof($users) > 0 && $users[0]->status == 1)
		{
			session_start();
			$_SESSION["admin"] = 1;
			$page = 'listing.twig';
			$_SESSION["nome"] = $user_name = $users[0]->name;
			$user_id = $users[0]->id;
			$_SESSION["email"] = $user_email = $users[0]->email;
			$listagem_alunos = $users;
			if ($users[0]->is_admin == 1) {
				$listagem_alunos = User::all();
			}
		}

		return $this->view->render($response, $page, [
			'user_id' => $user_id,
			'user_name' => $user_name,
			'user_email' => $user_email,
			'listagem_alunos' => $listagem_alunos
			]);			
	}

	public function logout($request, $response)
	{
        
		session_start();
		unset($_SESSION["admin"]);
		unset($_SESSION["nome"]);
		unset($_SESSION["email"]);
		session_destroy();
		return $this->view->render($response, 'login.twig');	
	}

	public function delete($request, $response)
	{
        
		session_start();
		if(!isset($_SESSION["admin"])) {
			print_r("Usuário não tem permissão de administrador");
			die;
		}

		$id = $request->getParam('id');
		User::destroy($id);

		return $this->view->render($response, 'listing.twig', [
			'user_name' => $_SESSION["nome"],
			'user_email' => $_SESSION["email"],
			'listagem_alunos' => User::all()
		]);	

	}

}
