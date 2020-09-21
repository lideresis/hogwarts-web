
# Desafio de programação - Hogwarts

A idéia deste desafio é permitir avaliar melhor as habilidades de candidatos à vagas de programador, de vários níveis, para a _Lidere Sistemas_.

## Configuração do Ambiente

A configuração do ambiente é razoavelmente simples. Começa por ter um servidor web com MySQL instalado, podendo ser utilizado, por exemplo, o [MAMP](https://www.mamp.info/en/downloads/).

Após habilitar seu servidor, faça um clone deste repositório, importando em seguida o arquivo _"dump.sql"_ no seu gerenciador de banco de dados.

Altere no arquivo _"back/.env"_ o _DB_USER_ e o _DB_PASSWORD_ para o usuário e senha respectivamente utilizados no seu banco de dados.

Através do terminal, execute na pasta _"back"_ e depois na pasta _"front"_:
```
$ npm i
```

Após isso, em 2 abas diferentes do terminal, execute novamente nas pastas _"back"_ e _"front"_:
```
$ npm start
```

Pronto, agora através da URL http://localhost:1234 você já pode navegar e efetuar os testes!

### Usuário para teste:

 - Login: dumbledore@hogwarts.school
 - Senha: abc123

## Descrição do Projeto

O professor Dumbledore está precisando de um aplicativo para cadastrar todos os seus bruxo-alunos!

Você está disposto a ajudar?

Desenhamos as telas para você se basear, este aplicativo deve ser desenvolvido utilizando as seguintes tecnologias:
#### Para o Front-End:
- React JS
#### Para o Back-end:
- Banco de Dados: Podes utilizar qualquer um de sua preferência;
- Utilizar ORM;
- API Rest construída em NodeJS, utilizando algum framework: NestJS, ExpressJS, Adonis, etc.

## Tela de Login

![web-login](WEB-LOGIN.png)

## Listagem dos Bruxos

![web-list](WEB-LIST.png)

## Formulário

![web-bruxo](WEB-BRUXO.png)
