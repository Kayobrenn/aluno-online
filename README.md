# 🧾 API – Sistema Aluno Online

## 📘 Descrição do Projeto

O **Sistema Aluno Online** é uma **API REST acadêmica** desenvolvida em **Java com Spring Boot**, com o objetivo de gerenciar operações básicas de um ambiente educacional, como cadastro de alunos, professores, disciplinas, matrículas, atualização de notas, trancamento de matrícula e emissão de histórico acadêmico.

O projeto foi inicialmente desenvolvido com foco na construção de endpoints REST e persistência de dados. Posteriormente, na disciplina de **Back-End Avançado**, a API foi evoluída com **MySQL**, **Spring Security**, autenticação com **JWT** e documentação interativa com **Swagger/SpringDoc**.

A aplicação possui rotas públicas para cadastro de usuários, login e documentação da API, enquanto os demais endpoints são protegidos e exigem autenticação via token JWT.

Todo o consumo da API foi validado por meio do **Insomnia** e do **Swagger**, com acompanhamento do banco de dados pelo **DBeaver**.

---

## ⚙️ Tecnologias Utilizadas

* **Java 17**
* **Spring Boot**
* **Spring Web**
* **Spring Data JPA**
* **Spring Security**
* **JWT**
* **Maven**
* **Lombok**
* **Banco de Dados:** MySQL
* **Swagger / SpringDoc**

**Ferramentas de Apoio:**

* **IntelliJ IDEA** → Desenvolvimento da aplicação
* **Insomnia** → Teste das requisições HTTP
* **DBeaver** → Visualização e manipulação das tabelas e views do banco de dados
* **Swagger UI** → Documentação e testes interativos da API
* **Git/GitHub** → Versionamento do projeto

---

## 🧩 Visão Geral dos Módulos da API

| Módulo          | Descrição geral                                                                     |
| --------------- | ----------------------------------------------------------------------------------- |
| **Usuários**    | Cadastro de usuários e login com geração de token JWT                               |
| **Alunos**      | CRUD completo de alunos                                                             |
| **Professores** | CRUD completo de professores                                                        |
| **Disciplinas** | CRUD completo de disciplinas ofertadas                                              |
| **Matrículas**  | Matrícula de alunos em disciplinas, trancamento de matrícula e atualização de notas |
| **Histórico**   | Emissão do histórico acadêmico consolidado do aluno                                 |

> O histórico acadêmico é emitido a partir das informações de matrícula, disciplinas, professores e notas do aluno.

---

## 🔐 Segurança e Autenticação

A API utiliza **Spring Security** com autenticação baseada em **JWT (JSON Web Token)**.

Antes da implementação de segurança, os endpoints da API eram públicos. Após a configuração do Spring Security, as rotas principais passaram a exigir autenticação.

O fluxo de autenticação funciona da seguinte forma:

1. O usuário é cadastrado pela rota `POST /cadastros`.
2. O usuário realiza login pela rota `POST /login`.
3. A API valida as credenciais do usuário.
4. A API gera e retorna um token JWT.
5. O token deve ser enviado nas próximas requisições protegidas.
6. O filtro de segurança valida o token antes de liberar o acesso aos controllers.

A chave utilizada para assinar e validar os tokens JWT é configurada por meio da variável de ambiente `JWT_SECRET`, evitando que esse segredo fique exposto no código-fonte.

---

## 🔓 Rotas Públicas

As rotas públicas podem ser acessadas sem token.

| Método | Rota              | Descrição                                  |
| :----: | ----------------- | ------------------------------------------ |
| `POST` | `/cadastros`      | Cadastra um novo usuário                   |
| `POST` | `/login`          | Autentica o usuário e retorna um token JWT |
|  `GET` | `/swagger-ui/**`  | Acesso à documentação Swagger              |
|  `GET` | `/v3/api-docs/**` | Acesso ao JSON da documentação OpenAPI     |

---

## 🔒 Rotas Protegidas

As demais rotas da API são protegidas e exigem autenticação via token JWT.

Para acessar uma rota protegida, é necessário enviar o token no header da requisição:

```txt
Authorization: Bearer token_jwt
```

Exemplo:

```txt
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## 📄 Documentação com Swagger

A documentação da API foi configurada com **Swagger/SpringDoc**.

Com o projeto em execução, a documentação pode ser acessada em:

```txt
http://localhost:8080/swagger-ui/index.html
```

O JSON da documentação OpenAPI pode ser acessado em:

```txt
http://localhost:8080/v3/api-docs
```

O Swagger também foi configurado para aceitar autenticação via **Bearer Token**, permitindo testar endpoints protegidos diretamente pela interface da documentação.

---

## 🗄️ Banco de Dados

O projeto utiliza o banco de dados **MySQL**.

Banco utilizado:

```sql
aluno_online
```

A configuração principal do banco fica no arquivo `application.properties`.

Para evitar que dados sensíveis, como senha do banco, fiquem escritos diretamente no código, o projeto utiliza **variáveis de ambiente**.

Configuração utilizada:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/aluno_online?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

Variáveis de ambiente utilizadas:

| Variável      | Descrição                                                                                                                          |
| :------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `DB_URL`      | URL de conexão com o banco MySQL. Caso não seja informada, o projeto utiliza a URL padrão configurada no `application.properties`. |
| `DB_USERNAME` | Usuário do banco de dados. Caso não seja informado, o valor padrão será `root`.                                                    |
| `DB_PASSWORD` | Senha do banco de dados MySQL.                                                                                                     |

Exemplo de configuração local:

```txt
DB_USERNAME=root
DB_PASSWORD=sua_senha_do_mysql
```

As tabelas principais são criadas automaticamente pelo **Hibernate**, a partir das entidades do projeto.

Principais tabelas utilizadas:

* `aluno`
* `professor`
* `disciplina`
* `matricula_aluno`
* `usuarios`

---


## 🧾 View do Histórico Acadêmico

O endpoint de histórico acadêmico utiliza a view `vw_historico_aluno`.

Como o Hibernate cria automaticamente as tabelas a partir das entidades, mas **não cria views SQL automaticamente**, foi criado um script específico para o MySQL:

```txt
api/src/main/resources/sql/create-view-historico-mysql.sql
```

Esse script deve ser executado no banco `aluno_online` caso o banco seja recriado.

---

## 🧠 Endpoints Principais (Resumo)

Abaixo um resumo dos endpoints organizados por módulo.
As seções seguintes detalham exemplos de requisição e prints das chamadas no Insomnia.

### 🔐 Módulo Usuários e Autenticação

Base: `/cadastros` e `/login`

| Método | Rota         | Descrição                                  |
| :----: | ------------ | ------------------------------------------ |
| `POST` | `/cadastros` | Cadastra um novo usuário                   |
| `POST` | `/login`     | Autentica o usuário e retorna um token JWT |

---

### 👨‍🎓 Módulo Alunos

Base: `/alunos`

|  Método  | Rota           | Descrição                         |
| :------: | -------------- | --------------------------------- |
|  `POST`  | `/alunos`      | Cadastra um novo aluno            |
|   `GET`  | `/alunos`      | Lista todos os alunos             |
|   `GET`  | `/alunos/{id}` | Busca um aluno específico pelo ID |
|   `PUT`  | `/alunos/{id}` | Atualiza os dados de um aluno     |
| `DELETE` | `/alunos/{id}` | Remove um aluno pelo ID           |

---

### 👨‍🏫 Módulo Professores

Base: `/professores`

|  Método  | Rota                | Descrição                                   |
| :------: | ------------------- | ------------------------------------------- |
|  `POST`  | `/professores`      | Cadastra um novo professor                  |
|   `GET`  | `/professores`      | Lista todos os professores                  |
|   `GET`  | `/professores/{id}` | Busca um professor específico pelo ID       |
|   `PUT`  | `/professores/{id}` | Atualiza os dados completos de um professor |
| `DELETE` | `/professores/{id}` | Remove um professor pelo ID                 |

---

### 📚 Módulo Disciplinas

Base: `/disciplinas`

|  Método  | Rota                | Descrição                               |
| :------: | ------------------- | --------------------------------------- |
|  `POST`  | `/disciplinas`      | Cadastra uma nova disciplina            |
|   `GET`  | `/disciplinas`      | Lista todas as disciplinas              |
|   `GET`  | `/disciplinas/{id}` | Busca uma disciplina específica pelo ID |
|   `PUT`  | `/disciplinas/{id}` | Atualiza os dados de uma disciplina     |
| `DELETE` | `/disciplinas/{id}` | Remove uma disciplina pelo ID           |

---

### 🎓 Módulo Matrículas & Histórico

Base: `/matriculas`

|  Método | Rota                                     | Descrição                                         |
| :-----: | ---------------------------------------- | ------------------------------------------------- |
|  `POST` | `/matriculas`                            | Realiza a matrícula de um aluno em uma disciplina |
| `PATCH` | `/matriculas/trancar/{id}`               | Tranca a matrícula de um aluno                    |
| `PATCH` | `/matriculas/atualizar-notas/{id}`       | Atualiza as notas de uma matrícula específica     |
|  `GET`  | `/matriculas/emitir-historico/{alunoId}` | Emite o histórico acadêmico consolidado do aluno  |

> Nos endpoints de matrícula são utilizados métodos `PATCH` para representar atualizações parciais de recursos, como alteração de status da matrícula ou atualização de notas.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

### 2. Acessar a pasta da API

```bash
cd api
```

---

### 3. Criar o banco de dados MySQL

Crie ou utilize o banco MySQL chamado `aluno_online`.

```sql
CREATE DATABASE IF NOT EXISTS aluno_online
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

---

### 4. Configurar variáveis de ambiente

O projeto utiliza variáveis de ambiente para evitar que informações sensíveis, como senha do banco e chave JWT, fiquem escritas diretamente no código-fonte.

Variáveis utilizadas:

| Variável      | Descrição                                                                                              |
| :------------ | ------------------------------------------------------------------------------------------------------ |
| `DB_URL`      | URL de conexão com o banco MySQL. É opcional, pois existe um valor padrão no `application.properties`. |
| `DB_USERNAME` | Usuário do banco MySQL. Caso não seja informado, o valor padrão será `root`.                           |
| `DB_PASSWORD` | Senha do banco MySQL.                                                                                  |
| `JWT_SECRET`  | Chave secreta utilizada para gerar e validar os tokens JWT.                                            |

Exemplo de configuração local:

```txt
DB_USERNAME=root
DB_PASSWORD=sua_senha_do_mysql
JWT_SECRET=sua_chave_secreta_jwt
```

No IntelliJ IDEA, as variáveis podem ser configuradas em:

```txt
Run > Edit Configurations > Environment variables
```

Exemplo em uma única linha no IntelliJ:

```txt
DB_USERNAME=root;DB_PASSWORD=sua_senha_do_mysql;JWT_SECRET=sua_chave_secreta_jwt
```

Caso deseje sobrescrever também a URL do banco, adicione:

```txt
DB_URL=jdbc:mysql://localhost:3306/aluno_online?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo
```

---

### 5. Conferir o `application.properties`

O arquivo `src/main/resources/application.properties` deve utilizar as variáveis de ambiente:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/aluno_online?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

api.security.token.secret=${JWT_SECRET}
```

---

### 6. Executar a aplicação

O projeto pode ser executado pelo IntelliJ IDEA, executando a classe principal da aplicação, ou pelo Maven:

```bash
mvn spring-boot:run
```

A API será executada em:

```txt
http://localhost:8080
```

Ao subir a aplicação pela primeira vez, o Hibernate cria automaticamente as tabelas principais no banco MySQL a partir das entidades do projeto.

---

### 7. Executar o script da view

Após a aplicação criar as tabelas no banco, execute o script da view do histórico acadêmico:

```txt
api/src/main/resources/sql/create-view-historico-mysql.sql
```

Esse script cria a view `vw_historico_aluno`, utilizada pelo endpoint de histórico acadêmico.

---

### 8. Acessar a documentação da API

Com o projeto em execução, acesse o Swagger em:

```txt
http://localhost:8080/swagger-ui/index.html
```

O JSON da documentação OpenAPI pode ser acessado em:

```txt
http://localhost:8080/v3/api-docs
```

---

### 9. Testar o fluxo de autenticação

Após executar o projeto, o fluxo básico de teste é:

1. Cadastrar um usuário em `POST /cadastros`.
2. Fazer login em `POST /login`.
3. Copiar o token JWT retornado.
4. Informar o token no Swagger pelo botão **Authorize** ou no Insomnia pelo header:

```txt
Authorization: Bearer token_jwt
```

5. Testar as rotas protegidas da API.

---

## 🔐 Fluxo de Autenticação

### 1. Cadastrar usuário

Endpoint:

```http
POST /cadastros
```

Exemplo de body:

```json
{
  "login": "usuario@email.com",
  "senha": "123456"
}
```

Resultado esperado:

```txt
201 Created
```

---

### 2. Realizar login

Endpoint:

```http
POST /login
```

Exemplo de body:

```json
{
  "login": "usuario@email.com",
  "senha": "123456"
}
```

Resultado esperado:

```json
{
  "token": "token_jwt_gerado_pela_api"
}
```

---

### 3. Acessar rota protegida

Exemplo:

```http
GET /professores
```

Header necessário:

```txt
Authorization: Bearer token_jwt
```

Com um token válido, a API libera o acesso à rota protegida.

---

## 📬 Testes no Insomnia – CRUD Aluno

> Observação: as rotas de alunos são protegidas. Para testá-las, é necessário enviar o token JWT no header `Authorization`.

### 🔹 `POST /alunos` – Criar Aluno

Exemplo de corpo da requisição para criar um novo aluno:

```json
{
  "nomeCompleto": "Juliana Souza de Almeida",
  "email": "juliana.almeida@example.com",
  "cpf": "769.135.402-61"
}
```

<details>
  <summary>📸 Clique para ver o print da requisição POST</summary>

  <img width="1919" height="1017" alt="Request Post" src="https://github.com/user-attachments/assets/2b6e8230-d616-4941-a3df-29ef926c0879" />

</details>

---

### 🔹 `GET /alunos` – Buscar Todos os Alunos

Requisição para listar todos os alunos cadastrados.

<details>
  <summary>📸 Clique para ver o print da requisição GET /alunos</summary>

  <img width="1919" height="1021" alt="Request findAll (2)" src="https://github.com/user-attachments/assets/920065e4-0c7e-466c-944c-9ab8d2add77d" />

</details>

---

### 🔹 `GET /alunos/{id}` – Buscar Aluno por ID

Requisição que retorna os dados de um aluno específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /alunos/{id}</summary>

  <img width="1920" height="1020" alt="Request by Id" src="https://github.com/user-attachments/assets/a1279fe0-e011-4f29-ba38-cb3f5fc215d6" />

</details>

---

## 📊 Banco de Dados – Alunos (MySQL)

O sistema utiliza um banco de dados **MySQL** para persistência dos dados dos alunos.
A tabela principal criada automaticamente pelo **Spring Data JPA/Hibernate** é chamada `aluno`.

<details>
  <summary>📸 Clique para ver o print da tabela de alunos no DBeaver</summary>

  <img width="1920" height="1020" alt="BD" src="https://github.com/user-attachments/assets/f8f0820b-f583-4d3f-859f-4311e9a46fff" />

</details>

---

## 📬 Testes no Insomnia – CRUD Professor

> Observação: as rotas de professores são protegidas. Para testá-las, é necessário enviar o token JWT no header `Authorization`.

### 🔹 `POST /professores` – Criar Professor

Exemplo de corpo da requisição para criar um novo professor:

```json
{
  "nomeCompleto": "Luciana Martins Cardoso",
  "email": "luciana.cardoso@example.com",
  "cpf": "910.375.284-40"
}
```

<details>
  <summary>📸 Clique para ver o print da requisição POST /professores</summary>

  <img width="1920" height="1020" alt="criarProfessor" src="https://github.com/user-attachments/assets/66d4ee98-fc88-4d30-8e2f-217b97dcc714" />

</details>

---

### 🔹 `GET /professores` – Buscar Todos os Professores

Requisição para listar todos os professores cadastrados.

<details>
  <summary>📸 Clique para ver o print da requisição GET /professores</summary>

  <img width="1920" height="1020" alt="buscarTodosProfessores" src="https://github.com/user-attachments/assets/b0e49bdd-453a-4875-b309-c7e15d9bc93f" />

</details>

---

### 🔹 `GET /professores/{id}` – Buscar Professor por ID

Requisição que retorna os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /professores/{id}</summary>

  <img width="1920" height="1020" alt="buscarProfessorPorId" src="https://github.com/user-attachments/assets/89e9f41d-c7c8-4645-ae1a-204b923d3d05" />

</details>

---

### 🔹 `PUT /professores/{id}` – Atualizar Professor

Requisição que atualiza todos os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição PUT /professores/{id}</summary>

  <img width="1920" height="1020" alt="atualizarProfessorPorId" src="https://github.com/user-attachments/assets/5029318d-2f86-4275-a189-f60414f6958b" />
  <img width="1920" height="1020" alt="nomeAtualizado" src="https://github.com/user-attachments/assets/50d8f61a-8fdb-4032-9956-4b2dc8886cf4" />

</details>

---

### 🔹 `DELETE /professores/{id}` – Deletar Professor

Requisição que deleta os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição DELETE /professores/{id}</summary>

  <img width="1920" height="1020" alt="deletarProfessorPorId" src="https://github.com/user-attachments/assets/741a3780-7d88-4a7d-89c3-2d1bae1f1efa" />

</details>

---

## 📊 Banco de Dados – Professores (MySQL)

Tabela `professor` gerenciada pelo **Spring Data JPA/Hibernate**.

<details>
  <summary>📸 Clique para ver o print da tabela de professor no DBeaver</summary>

  <img width="1920" height="1020" alt="BD" src="https://github.com/user-attachments/assets/639a5ddf-3da8-45b8-90ff-96860491c706" />

</details>

---

## 📬 Testes no Insomnia – CRUD Disciplina

> Observação: as rotas de disciplinas são protegidas. Para testá-las, é necessário enviar o token JWT no header `Authorization`.

### 🔹 `POST /disciplinas` – Criar Disciplina

Exemplo de corpo da requisição para criar uma nova disciplina:

```json
{
  "nome": "Engenharia de Software Aplicada",
  "professor": {
    "id": 4
  }
}
```

<details>
  <summary>📸 Clique para ver o print da requisição POST /disciplinas</summary>

  <img width="1920" height="1020" alt="criarDisciplina" src="https://github.com/user-attachments/assets/942412bf-e212-43b3-9478-bb063264c16a" />

</details>

---

### 🔹 `GET /disciplinas` – Buscar Todas as Disciplinas

Requisição para listar todas as disciplinas cadastradas.

<details>
  <summary>📸 Clique para ver o print da requisição GET /disciplinas</summary>

  <img width="1920" height="1020" alt="buscarTodasDisciplinas" src="https://github.com/user-attachments/assets/696968d3-a52f-48b4-aa54-1d4a639d143a" />

</details>

---

### 🔹 `GET /disciplinas/{id}` – Buscar Disciplina por ID

Requisição que retorna os dados de uma disciplina específica, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /disciplinas/{id}</summary>

  <img width="1920" height="1020" alt="buscarDisciplinaPorId" src="https://github.com/user-attachments/assets/bb985694-a02d-4ca0-85a7-4eefe980644c" />

</details>

---

### 🔹 `PUT /disciplinas/{id}` – Atualizar Disciplina

Requisição que atualiza os dados de uma disciplina específica.

<details>
  <summary>📸 Clique para ver o print da requisição PUT /disciplinas/{id}</summary>

  <img alt="atualizarDisciplinaPorId" width="1920" height="1020" src="https://github.com/user-attachments/assets/10887cfd-8b26-42c3-9524-78794dd4765d" />

</details>

---

### 🔹 `DELETE /disciplinas/{id}` – Deletar Disciplina

Requisição que remove uma disciplina específica, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição DELETE /disciplinas/{id}</summary>

  <img width="1920" height="1020" alt="deletarDisciplinaPorId" src="https://github.com/user-attachments/assets/e18698d0-efe5-4385-a79c-f5bfe7da163e" />

</details>

---

## 📊 Banco de Dados – Disciplina (MySQL)

Tabela `disciplina` gerenciada pelo **Spring Data JPA/Hibernate**.

<details>
  <summary>📸 Clique para ver o print da tabela de disciplina no DBeaver</summary>

  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3328a72c-43ad-473f-871a-d92d33a3fecb" />

</details>

---

## 📬 Testes no Insomnia – Matrículas & Histórico

> Observação: as rotas de matrículas e histórico são protegidas. Para testá-las, é necessário enviar o token JWT no header `Authorization`.

### 🔹 `POST /matriculas` – Criar Matrícula

Exemplo de corpo da requisição para matricular um aluno em uma disciplina:

```json
{
  "aluno": {
    "id": 1
  },
  "disciplina": {
    "id": 2
  }
}
```

<details>
  <summary>📸 Clique para ver o print da requisição POST /matriculas</summary>

  <img width="1920" height="1020" alt="matricular" src="https://github.com/user-attachments/assets/9821685a-a8a7-457c-96f0-38edd495bdcd" />

</details>

---

### 🔹 `PATCH /matriculas/atualizar-notas/{id}` – Atualizar Notas da Matrícula

Exemplo de corpo da requisição para atualizar as notas de uma matrícula:

```json
{
  "nota1": 7,
  "nota2": 7
}
```

<details>
  <summary>📸 Clique para ver o print da requisição PATCH /matriculas/atualizar-notas/{id}</summary>

  <img width="1920" height="1020" alt="atualizarNotas" src="https://github.com/user-attachments/assets/75c16398-7684-451f-a8ea-99bec5c9853f" />

</details>

---

### 🔹 `PATCH /matriculas/trancar/{id}` – Trancar Matrícula

Requisição responsável por alterar o status da matrícula para **TRANCADO**.

<details>
  <summary>📸 Clique para ver o print da requisição PATCH /matriculas/trancar/{id}</summary>

  <img width="1920" height="1020" alt="trancarMatricula" src="https://github.com/user-attachments/assets/7b303f12-955f-45fd-a788-30b097e3c1ae" />

</details>

---

### 🔹 `GET /matriculas/emitir-historico/{alunoId}` – Emitir Histórico do Aluno

Requisição que consolida as matrículas, disciplinas e notas do aluno e retorna seu histórico acadêmico.

<details>
  <summary>📸 Clique para ver o print da requisição GET /matriculas/emitir-historico/{alunoId}</summary>

  <img width="1920" height="1020" alt="emitirHistorico" src="https://github.com/user-attachments/assets/e43821f2-e047-4593-8e58-0f1d0f118523" />

</details>

---

## 📊 Banco de Dados – matricula_aluno (MySQL)

Tabela `matricula_aluno` gerenciada pelo **Spring Data JPA/Hibernate**.

<details>
  <summary>📸 Clique para ver o print da tabela de matrícula no DBeaver</summary>

  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/ed2395b0-9f1d-4296-b265-6f535884bb29" />

</details>

---

## 📊 View – vw_historico_aluno

A view `vw_historico_aluno` foi criada para centralizar e facilitar a emissão dos **históricos acadêmicos dos alunos**, reunindo informações de matrícula, notas, disciplinas e professores em uma única consulta.

No MySQL, a view foi adaptada para usar a nomenclatura das colunas criadas pelo Hibernate, como `nome_completo`.

```sql
CREATE OR REPLACE VIEW vw_historico_aluno AS
SELECT
    ma.id AS matricula_id,
    a.id AS aluno_id,
    a.nome_completo AS nome_aluno,
    a.email AS email_aluno,
    a.cpf AS cpf_aluno,
    d.id AS disciplina_id,
    d.nome AS nome_disciplina,
    p.id AS professor_id,
    p.nome_completo AS nome_professor,
    ma.nota1 AS nota1,
    ma.nota2 AS nota2,
    ((ma.nota1 + ma.nota2) / 2.0) AS media,
    ma.status AS status_matricula
FROM matricula_aluno ma
JOIN aluno a ON a.id = ma.aluno_id
JOIN disciplina d ON d.id = ma.disciplina_id
JOIN professor p ON p.id = d.professor_id;
```

O script da view está versionado no projeto em:

```txt
api/src/main/resources/sql/create-view-historico-mysql.sql
```

<details>
  <summary>📸 Clique para ver o print da view no DBeaver</summary>

  <img width="1920" height="1020" alt="image_view" src="https://github.com/user-attachments/assets/890663db-43ae-49c2-9ad8-54a2a125a8f9" />

</details>

---

## ✅ Testes Realizados

Foram realizados os seguintes testes após a evolução do projeto:

* Execução da API localmente na porta `8080`
* Conexão da API com o banco de dados MySQL
* Criação automática das tabelas pelo Hibernate
* Execução do script da view `vw_historico_aluno`
* Acesso à documentação Swagger
* Acesso ao JSON `/v3/api-docs`
* Cadastro de usuário pela rota `/cadastros`
* Login pela rota `/login`
* Geração de token JWT
* Bloqueio de rotas protegidas sem token
* Liberação de rotas protegidas com Bearer Token
* Configuração do botão **Authorize** no Swagger
* Teste de endpoint protegido diretamente pelo Swagger
* Teste do endpoint de histórico acadêmico

---

## ✅ Observações Finais

* O projeto segue a arquitetura padrão de uma **Spring Boot REST API**.
* As respostas são retornadas em **JSON**, de acordo com os modelos do sistema.
* A API utiliza **Spring Security** para proteger os endpoints.
* A autenticação é feita por meio de **JWT**.
* As rotas públicas são usadas apenas para cadastro, login e documentação.
* As demais rotas exigem envio de token no header `Authorization`.
* O banco de dados utilizado na versão atual é o **MySQL**.
* Toda a API foi testada via **Insomnia** e **Swagger**, com os dados confirmados no **DBeaver**.
* Projeto acadêmico desenvolvido para fins de avaliação na disciplina de **Back-End Avançado**.
