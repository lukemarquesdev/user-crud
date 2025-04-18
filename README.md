# UserCrud Sistema de cadastro de usuário

Este projeto é um sistema de gerenciamento de usuários desenvolvido com Vue.js e Vuetify para a interface do usuário, e Laravel para o backend. A aplicação permite adicionar, editar, excluir e visualizar uma lista de usuários, com funcionalidades de autenticação, validação de dados e mensagens de feedback.

## Tecnologias Usadas

- **Frontend:** Vue.js 3, Vuetify
- **Backend:** Laravel 12
- **Banco de Dados:** PostgreSQL

## Configuração do Projeto

### Pré-requisitos

- Node.js
- Composer
- PHP
- PostgreSQL
- Docker

### Passos para Configuração

1. **Clonar o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Ordem**
    - Primeiro execute o backend e depois o frontend.

#### Backend

1. **Configurar o arquivo `.env`:**

   - Copie o arquivo `.env.example` para `.env`
   - Configure as variáveis de ambiente, especialmente as configurações de banco de dados  

2. **Levantar os containers**
    - Para usar o docker e configurar os containers, você precisa de um arquivo .env
    - Na raiz do projeto copie o arquivo `.env.example` para `.env`
    - Configure as variáveis de ambiente, especialmente as configurações de banco de dados 
    
    - Na raiz do projeto, execute o seguinte comando:

   ```bash
   docker compose up -d --build 
   ```
   
   - (Opcional) se preferir, não visualizar os logs:
   
   ```bash
   docker compose up -d --build 
   ``` 

3. **Migrar o banco de dados:**

    - Entre dentro do container do backend Laravel, através desse comando:

    ```bash
   docker exec -ti backend-laravel bash
   ```
    - Execute as migrações, através desse comando:

   ```bash
   php artisan migrate
   ```

4. **Seja feliz**

    - Se todos os passos foram executados corretamente, você está autorizado a mexer no backend. 

#### Frontend

1. **Navegar para a pasta do frontend:**

   ```bash
   cd frontend
   ```

2. **Instalar dependências do Node.js:**

   ```bash
   npm install
   ```

3. **Configurar o arquivo `.env`:**

   - Copie o arquivo `.env.example` para `.env`
   - Configure as variáveis de ambiente

4. **Iniciar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

### Uso

- Acesse o frontend em `http://localhost:5173`
- A API estará disponível em `http://localhost:8181`
- Obs: As portas podem diferenciar em alguams excerções.

### Desenvolvimento

- Use `npm run dev` para iniciar o servidor de desenvolvimento do frontend
- Use `php artisan serve` para iniciar o servidor do backend

## Contribuição

- Faça um fork do projeto
- Crie um novo branch para suas alterações
- Envie um Pull Request para revisão

## Licença

Eu autorizo você clonar e utilizar tranquilamente :)

