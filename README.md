# api-starter
Clonando o repo você terá uma api básica, preparada para autenticação e CRUD, os códigos estão modularizados para que você possa escolher outras ferramentas se assim preferir.

### Ferramentas

+ #### [NodeJS](https://nodejs.org/en/)
  Para desenvolver esse starter foi utilizada a a versão LTS do nodejs, que era a: `8.9.3`.

+ #### [MongoDB](https://www.mongodb.com)
  Banco de dados não relacional, o MongoDB foi escolhido como banco desse starter devido à sua alta popularidade.

+ #### [Restify](http://restify.com)
  Framework para controlar as rotas. Escolhido por ser middleware-based, permitindo alta gestão sobre tudo o que acontece na aplicação.

+ #### [JWT authentication](https://jwt.io/)
  JWT é apenas o protocolo de transporte de informações seguras.

+ #### [dotEnv](https://www.npmjs.com/package/dotenv)
  Módulo para carregar configurações via arquivo `.env` serve para colocarmos informações de configuração que não devem ficar visíveis quando o code subir para o gerenciador de versão, como por exemplo senhas de acesso à APIs externas.


### Utilização
+ #### Certifique-se de ter instalado em seu computador:
  - **[NodeJS](https://nodejs.org/en/)** Requer pelo menos a última versão LTS, para conferir, abra um terminal e digite `node --version`
  - **[MongoDB](https://www.mongodb.com)**, para conferir, abra um terminal e digite `mongo --version`
+ #### Clone o repositório
+ #### Abra o a pasta no editor e já configure o arquivo `.env`, paara essa configuração foi colocado um arquivo `.env-example`, DUPLIQUE esse arquivo colocando o nome de `.env`, coloque as configurações conforme seu ambiente e então salve.
+ #### Navegue até o diretório que você clonou, no GNU/Linux o comando é `cd /caminho/para/seu/projeto`
+ ####  Instale as dependências com `npm install`
+ #### Certifique-se de executar o MongoDB como o comando `mongod` ou de colocá-lo em execução automática, para que a API funcione, é essencial que o mongo esteja sendo executado.
+ #### Agora você já pode executar a API, o comando é: `npm run dev`, execute e você terá uma api escutando em `localhost:4000`,onde 4000 é a porta que está no arquivo .env, se você trocou, então as requisições devem ser feitas usando a nova porta

+ #### Você precisará de uma ferramenta para fazer requisições HTTP

  ## POSTMAN
  Uma ótima ferramenta que antes era um app do chrome e agora é um software standalone que você pode baixar  **[AQUI NO SITE OFICIAL](https://www.getpostman.com/)** e instalar sem dificuldade.  
  Na pasta extra-file tem dois arquivos, um contendo as rotas e outro contendo as variáveis de ambiente do Postman, se você nunca usou o postman, aqui estão dois artigos sobre collections (que é a sua coleção de rotas no postman) e outro sobre gerenciamento de ambientes:

  - **[Artigo Sobre Collections](https://www.getpostman.com/docs/postman/collections/data_formats)**

  - **[Artigo Sobre Ambientes](https://www.getpostman.com/docs/postman/environments_and_globals/manage_environments)**

  ## CURL
  - **Se você estiver usando GNU / Linux (o que eu aconselho fortemente), poderá utilizar o [CURL](https://curl.haxx.se/docs/manpage.html), conforme os exemplos abaixo**

  - **Cadastre um user novo**
  Para cadastrar um novo usuário você precisa consumir a rota **http://localhost:4000/api/v1/users** utilizando o método POST, passando o seguinte objeto como data:  

  ```json
    {
        "fullname": "Nome Completo"
      , "email": "mail@mail.com"
      ,	"password": "123456"
      ,	"role": "administrator"
    }

  //Exemplo com CURL:

    curl -H "Content-Type: application/json" -X POST -d '{"fullname": "Nome Completo", "email": "mail@mail.com",	"password": "123456",	"role": "administrator"}' http://localhost:4000/api/v1/users

  ```

  - **Faça LOGIN** Agora você já pode efetuar login, com o usuário criado acima, para isso, consuma rota **http://localhost:4000/api/v1/authentications** utilizando o método POST, passando o seguinte objeto como data:  

  ```json
    {
        "usernameOrEmail": "mail"
      , "password": "123456"
      , "deviceName": "Notebook"
      , "networkIp": "177.255.255.255"
      , "platformOS": "LinuxOS"
    }

  Exemplo com CURL:

  curl -H "Content-Type: application/json" -X POST -d '{ "usernameOrEmail": "mail", "password": "123456", "deviceName": "Notebook", "networkIp": "177.255.255.255", "platformOS": "LinuxOS"} ' http://localhost:4000/api/v1/authentications

  Isso retornará seu token.

  ```
  - **CRUD** para usuários todas as funções de CRUD estão prontas, siga o
  modelo:  
  URL: http://localhost:4000/api/v1
    - GET em /users retorna todos os usuários cadastrados
    - GET em /users/{_idDoUsuário} retorna os dados desse usuário, substitua `{_idDoUsuário}` pelo campo `_id`, a rota ficará mais ou menos assim:
      **/users/59c2a1833cd2d204529667dc**
    - POST em /users com o objeto `{"fullname": "Nome Completo", "email": "mail@mail.com",	"password": "123456",	"role": "administrator"}` cria um novo usuário
    - PUT em /users/{_idDoUsuário} com o objeto `{ senha }` altera a senha do usuário.
    - DELETE em /users/{_idDoUsuário} seta o STATUS do usuários para **FALSE**, para que ele não seja literalmente removido da base de dados.
