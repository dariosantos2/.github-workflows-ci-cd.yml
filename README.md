Configuração de Ambiente com Docker Compose

O projeto configura um ambiente multi-container para uma aplicação Node.js com um banco de dados MySQL usando Docker Compose.

Executando o projeto

Pre-requsitos, siga as instruções das fontes:
Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).
Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

Clone o Repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

Configure as Variáveis de Ambiente:
    Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
    DB_HOST=db
    DB_USER=myuser
    DB_PASSWORD=mypassword
    DB_NAME=mydatabase

    Substitua os valores se necessário.

Execute o seguinte comando para construir e subir os containers:
    docker-compose up --build

A aplicação vai estar disponível em http://localhost:3000.
Para testar a API, você pode usar ferramentas como Postman ou curl

Estrutura de pastas e arquivos do projeto:

meu-projeto/
├── app/
│   ├── Dockerfile          # Dockerfile da aplicação Node.js
│   ├── package.json        # Dependências do Node.js
│   ├── src/                # Código-fonte da aplicação
│   │   ├── database/       # Configuração do banco de dados
│   │   ├── models/         # Modelos do Sequelize
│   │   ├── routers/        # Rotas da API
│   │   └── index.js        # Ponto de entrada da aplicação
├── docker-compose.yml      # Configuração do Docker Compose
├── .env                    # Variáveis de ambiente (não versionado)
├── .env.example            # Exemplo de variáveis de ambiente (versionado)
└── package.json
└── package-lock.json            
└── README.md               # Documentação do projeto

Serviços Configurados no Docker Compose
O arquivo docker-compose.yml define dois serviços:

app:
    Container da aplicação Node.js.
    Mostra a porta 3000 para acesso à API.
    Depende do serviço db para inicialização.

db:
    Container do banco de dados MySQL.
    Configura um volume para persistência dos dados.
    Cria um usuário personalizado (myuser) com permissões específicas.

Conectar ao Banco de Dados
Para verificar se o banco de dados está funcionando corretamente, você pode se conectar a ele diretamente:

Acesse o container do MySQL:
    docker exec -it mysql_db bash

Conecte-se ao banco de dados:
    mysql -u myuser -pmypassword mydatabase

Execute comandos SQL:
    SHOW TABLES;
    SELECT * FROM Users;

Use ferramentas como Postman ou curl para testar as rotas da API:
    Criar um Usuário:
    curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "email": "test@example.com", "password": "123456"}'

     Listar Usuários:
     curl http://localhost:3000/api/users

O projeto utiliza variáveis de ambiente para configurar aspectos sensíveis, como a conexão com o banco de dados. As variáveis são definidas no arquivo .env:

    DB_HOST=db
    DB_USER=myuser
    DB_PASSWORD=mypassword
    DB_NAME=mydatabase

Observação: O arquivo .env não deve ser commitado no repositório. Use um arquivo .env.example para fornecer um template das variáveis necessárias.

Dário E. P. Santos
dariopsantos2@gmail.com
github.com/dariosantos2