Requerimentos e orientações para rodar a aplicação
-------------------------------------- 



1 - Instalar o PHP. 
1.1 - Instação e configuração do PHP para Windows 10. Conforme orientação em https://blog.schoolofnet.com/como-instalar-o-php-no-windows-do-jeito-certo-e-usar-o-servidor-embutido/. Lembrar de referenciar o PHP em Painel de Controle -> Sistema e Segurança -> Sistema -> Configurações avançadas do sistema. Adicionar a variável PATH o caminho C:\php. Assim é possivel rodar a aplicação usando o servidor embutido no PHP executanto um script diretamente no terminal.

2 - Instalar o MySQL.
2.1 - É possível instalar um pacote com todos os requerimentos embutidos (PHP, MySQL, Apache e outros) agregados. No caso foi baixado o XAMPP devido a facilidade de iniciar, encerrar e executar todos os serviços. O XAMPP inclui o PHPMyAdmin para permitir manipular e executar queries diretamente no banco de dados, sem interagir com a aplicação. 

3 - Testar o MySQL e o Apache
3.1 - Testar o XAAMP carregando http://localhost/phpmyadmin/ - Se o Apache e o MySQL estiverem devidamente configurados ele irá carregar. 
3.2 - Enquanto a aplicação roda em um servidor embutido do PHP, o PHPMyAdmin roda em um servidor Apache.
3.3 - Lembrar de descomentar extension=mysql e extension=pdo_mysql no arquivo PHP.ini.

4 - Instalar o GIT.

5 - Instalar o Composer (Windows): https://getcomposer.org/Composer-Setup.exe. Instalação via terminal (Windows/Linux) também disponível em https://getcomposer.org/download/. É interessante instalar o composer caso seja necessário gerar um novo esqueleto do projeto usando o Slim Framework.
5.1 - Copiar o projeto via GIT: git clone https://github.com/RcspiandorelloTestes/hogwarts-web.git. Ou copiar diretamente do repositório após aprovação via Pull Request.
5.2 - Via terminal acessar a pasta do projeto e executar: php -S localhost:8080 -t public public/index.php. Após abrir o web browser acessando http://localhost:8080/.


PHP Framework : "Slim Framework"	 ~~ composer require slim/slim "3.0"

Template      : "Twig Template Engine"   ~~ composer require slim/twig-view

CSS 	      : "Bootstrap Framework"

DB Model      : "Laravel Eloquent ORM"   ~~ composer require illuminate/database



Dump da tabela users - única tabela utilizada pela aplicação
-------------------------------------- 

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31-Maio-2020 às 02:34
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Banco de dados: `user`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` int(11) DEFAULT 0,
  `especialidade` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idade` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `users` A senha é um HASH MD5. Para testes o HASH gerado corresponde a senha 1234.
--

INSERT INTO `users` (`id`, `name`, `password`, `created_at`, `updated_at`, `is_admin`, `especialidade`, `idade`, `status`, `email`) VALUES
(1, 'Roberto', '81dc9bdb52d04dc20036dbd8313ed055', '2020-05-30 22:58:41', '2020-05-31 01:58:41', 1, 'Voar', '98', 1, NULL),
(2, 'Joseph', '81dc9bdb52d04dc20036dbd8313ed055', '2020-05-30 23:22:52', '2020-05-31 02:22:52', 0, 'Correr', '99', 1, NULL);


--
-- Entendendo a estrutura do projeto
--

1 - O Slim Framework permite abstrair todas as camadas do projeto, adotando a arquitetura MVC (Model - View - Controller) que é um padrão adotado pela indústria de desenvolvimento e que tem diminuido a complexidade na criação de soluções web.
1.1 - O arquivo index.php é o primeiro a ser carregado pelo servidor. Ele carrega o carquivo bootstrap/app.php que contêm basicamente as configurações iniciais para que a aplicação rode: Credenciais de acesso ao banco de dados, Configurações do ORM (Mapeamento Objeto Relacional - no caso é utilizado o Laravel Eloquent ORM - https://laravel.com/docs/7.x/eloquent), Twig template para permitir a manipulação e uso de lógica antes da renderização de conteúdo HTML. Mapeamento de rotas para classes, métodos e templates.
1.1.1 - No projeto, apenas um controlador é usado (LoginController), mas o ideal é criar mais um controlador para gerenciar as operações de CRUD do usuário: UserController. Para controle de acesso administrativo foi adicionado o campo is_admin ao banco de dados, dessa forma apenas usuários administradores têm acesso às operações de CRUD (Criação, Consulta, Atualização, Destruição).
1.1.2 - Em bootstrap/app.php também foi adicionado o caminho das rotas para acesso a cada um dos métodos usados pelo projeto:

          // página inicial - index.php
          $app->get('/', 'LoginController:index');

          // Login do usuário
          $app->post('/checkUser', 'LoginController:checkUser');

          // Destruição das variávies de sessão e redirecionamento a página de login.
          $app->get('/logout', 'LoginController:logout');

          // Cadastro de novos bruxos.
          $app->post('/add', 'LoginController:add');

          // Edição de bruxos.
          $app->post('/edit', 'LoginController:edit');

          // Exclusão de bruxos
          $app->post('/delete', 'LoginController:delete');
          
 1.1.3 - Modelo User - utilizado pelo Laravel Eloquent ORM. Nem todas as colunas do banco foram mapeadas para o modelo, pois ainda não estão sendo usadas pelo ORM. Exemplo: Ainda não existe controle administrativo no escopo do projeto, a opção é ativada via banco de dados.
 
        namespace Src\Models;

        use Illuminate\Database\Eloquent\Model;

        class User extends Model
        {
	        protected $table = 'users';
	
	        protected $fillable = [
		          'name',
		          'password',
		          'especialidade',
		          'idade',
		          'status',
	        ];
        }

2 - Lógica para carregamento dos templates.
2.1 - A página carregada após o login é a listing.twig, que carrega as bibliotecas do Bootstrap para adição de elementos visuais e responsividade ao conteúdo HTML. Contêm o escopo principal de navegação da aplicação - onde parte a navegação para todas as funcionalidades. Essa tela exibe o botão Adicionar Bruxo, o botão Sair, os dados do usuário logado (Nome, email) e as operações de edição e exclusão para cada um dos usuários listados. 
2.2 - A ediçao e a criação de bruxos é carregada em um nova página, redirecionando para a listagem após o sucesso da operação.

--
-- Pontos a serem melhorados nos próximos commits. Análise.
--

3 - Existem pontos a serem melhorados no projeto. Exemplo: operações de exclusão devem exibir mensagem de confirmação, o carregamento de todas as operações poderiam ser feitos na mesma página em listing.twig. Ao invés de carregar cada página separadamente, exigindo o processamento por parte do controlador, os botões de adição e edição poderiam conter um <a href="#adicionar">Adicionar Bruxo</a> capaz de remover a invisibilidade do conteúdo do formulário utilizando lógica em Jquery (ou JavaScript). Assim, removendo a div com display:none que contém o formulário como uso de Jquery  $( "#adicionar" ).show() , permitindo que o formulário seja exibido, e que o conteúdo seja escondido novamente em uma operação de cancelamento ou redirecionamento: $( "#adicionar" ).hide(). Nesse contexto, o foco seria dado ao frontend, evitando processamentos desnecessários no servidor.

