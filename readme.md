

# HOGWARTS WEB

Olá! Esta aplicação foi desenvolvida com o intuito de demonstrar alguns dos meus conhecimentos em programação Web. 

Nela, utilizei tecnologias como:

* PHP 7.3 
* CodeIgniter 3.1.11 
* jQuery 3.4.1 
* Bootstrap 4 
* FontAwesome 5.12.1 
* JavaScript 
* MySQL 
* CSS 
* HTML5 

*****************

## Configuração do ambiente

A configuração do ambiente é razoavelmente simples. Basta ter um servidor web instalado, podendo ser utilizado, por exemplo, 
 o [XAMPP](https://www.apachefriends.org/pt_br/index.html) ou o  [WAMPP](http://www.wampserver.com/en/) .

Após habilitar seu servidor, faça um clone deste repositório, importando em seguida o arquivo "**hogwarts_lucasgehlen.sql**" contido na pasta "db" para o seu gerenciador de banco de dados. 

A base de dados configurada no CodeIgniter **já está incluida neste dump**, mas caso tenha interesse em alterá-la, você pode fazer isso na pasta application/config/database.php.

Não se esqueça também de ajustar a constante base_url para o local onde foi salvo o seu clone. Essa constante é utilizada para evitar erros de cross site scripting.
Feito isso, a aplicação já deve estar funcional!

**Usuário para demonstração do sistema:**
* e-mail: dumbledore@hogwarts.com
* senha: teste1234


*****************
## Sobre a aplicação

A aplicação foi desenvolvida inicialmente a partir do criativo desafio da empresa "Lidere Sistemas". Você pode [conferi-lo clicando aqui](https://github.com/lideresis/hogwarts-web). 

Algumas ajustes, melhorias e personalização foram realizadas a fim de incrementar a versão proposta inicialmente, como por exemplo:

 - Adição de campos de filtros para utilização das telas (Bruxo e usuário); Estes que podem ser utilizados após a troca de página, pois ficam armazenados na sessão do usuário;
 - Front-end realiza as requisições utilizando Ajax, a fim de retornar informações sem o reload da tela;
- Validações back-end referentes a sintaxe dos campos e suas regras de negócio; exemplo: saber se o e-mail do usuário já existe na base de dados antes da inserção;
- Validações de sessão (login, tempo máximo)
- Layout responsivo e compatível com dispositivos móveis.
- Função double-click nas linhas da tabela, substituindo as colunas com botão de edição. Os botões ainda estão disponíveis na parte inferior da tela ao selecionar uma linha, caso seja de opção do usuário.
 

