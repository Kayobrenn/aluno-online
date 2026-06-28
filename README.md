# 🎓 Aluno Online API

**Aluno Online API** é uma aplicação back-end desenvolvida com **Java e Spring Boot** para gerenciamento de um ambiente acadêmico.

O sistema permite o gerenciamento de **alunos**, **professores**, **disciplinas** e **matrículas**, além de oferecer funcionalidades como **atualização de notas**, **trancamento de matrícula**, **autenticação com JWT** e **emissão de histórico acadêmico consolidado**.

A aplicação utiliza **Spring Security** para proteção dos endpoints, **Swagger/OpenAPI** para documentação interativa da API, **PostgreSQL** para persistência dos dados e **Docker** para padronização do ambiente de banco de dados.

---

## 🚀 Destaques

* API REST desenvolvida com Java e Spring Boot
* Arquitetura em camadas
* Autenticação e autorização com JWT
* Proteção de rotas com Spring Security
* Documentação interativa com Swagger/OpenAPI
* Persistência de dados com PostgreSQL
* Banco de dados executado em ambiente Docker
* CRUD de alunos, professores e disciplinas
* Controle de matrículas
* Atualização de notas
* Trancamento de matrícula
* Emissão de histórico acadêmico consolidado

---

## 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em desenvolvimento back-end, especialmente em:

* Desenvolvimento de APIs REST
* Organização de projetos com Spring Boot
* Arquitetura em camadas
* Persistência de dados com JPA/Hibernate
* Modelagem de banco de dados relacional
* Autenticação baseada em token JWT
* Proteção de endpoints com Spring Security
* Documentação de APIs com Swagger/OpenAPI
* Boas práticas de organização e manutenção de código

---

## 🛠️ Tecnologias Utilizadas

### Back-end

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Maven
* Lombok

### Banco de Dados

* PostgreSQL

### Infraestrutura

* Docker
* Docker Compose

### Documentação e Testes

* Swagger / SpringDoc OpenAPI
* Insomnia
* DBeaver

### Versionamento

* Git
* GitHub

---

## 🏛️ Arquitetura

A aplicação segue uma arquitetura em camadas, separando responsabilidades entre entrada de dados, regras de negócio, persistência e infraestrutura.

```text
Cliente
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

Essa organização facilita a manutenção do código, melhora a separação de responsabilidades e torna o projeto mais escalável.

---

## 📁 Organização do Projeto

```text
src
└── main
    └── java
        └── br.com.alunoonline.api
            ├── controller
            ├── dtos
            ├── enums
            ├── infra
            ├── model
            ├── repository
            └── service
```

| Pacote       | Responsabilidade                                          |
| ------------ | --------------------------------------------------------- |
| `controller` | Exposição dos endpoints REST da aplicação                 |
| `dtos`       | Objetos de transferência de dados entre cliente e API     |
| `enums`      | Representação de valores fixos do domínio                 |
| `infra`      | Configurações de infraestrutura, autenticação e segurança |
| `model`      | Entidades persistidas no banco de dados                   |
| `repository` | Comunicação com o banco de dados                          |
| `service`    | Implementação das regras de negócio                       |

---

## 🧩 Visão Geral dos Módulos

| Módulo      | Descrição                                                |
| ----------- | -------------------------------------------------------- |
| Usuários    | Cadastro de usuários e login com geração de token JWT    |
| Alunos      | Cadastro, consulta, atualização e remoção de alunos      |
| Professores | Cadastro, consulta, atualização e remoção de professores |
| Disciplinas | Cadastro, consulta, atualização e remoção de disciplinas |
| Matrículas  | Matrícula de alunos, atualização de notas e trancamento  |
| Histórico   | Emissão de histórico acadêmico consolidado do aluno      |

---

## ⚙️ Funcionalidades

### Alunos

* Cadastrar aluno
* Buscar aluno por ID
* Listar alunos
* Atualizar aluno
* Remover aluno

### Professores

* Cadastrar professor
* Buscar professor por ID
* Listar professores
* Atualizar professor
* Remover professor

### Disciplinas

* Cadastrar disciplina
* Buscar disciplina por ID
* Listar disciplinas
* Atualizar disciplina
* Remover disciplina

### Matrículas

* Matricular aluno em uma disciplina
* Atualizar notas da matrícula
* Trancar matrícula
* Consultar histórico acadêmico do aluno

### Usuários e Autenticação

* Cadastro de usuário
* Login
* Geração de token JWT
* Validação de token em rotas protegidas

---

## 🔐 Segurança e Autenticação

A API utiliza **Spring Security** com autenticação baseada em **JWT (JSON Web Token)**.

As rotas de cadastro, login e documentação da API são públicas. As demais rotas são protegidas e exigem o envio de um token JWT válido.

### Fluxo de Autenticação

1. O usuário realiza cadastro.
2. O usuário realiza login.
3. A API valida as credenciais.
4. Um token JWT é gerado.
5. O token é enviado nas requisições protegidas.
6. O Spring Security valida o token antes de liberar o acesso aos recursos da API.

### Rotas Públicas

| Método | Endpoint          | Descrição                           |
| ------ | ----------------- | ----------------------------------- |
| `POST` | `/cadastros`      | Cadastro de usuário                 |
| `POST` | `/login`          | Autenticação e geração de token JWT |
| `GET`  | `/swagger-ui/**`  | Acesso à documentação Swagger       |
| `GET`  | `/v3/api-docs/**` | Acesso à documentação OpenAPI       |

### Rotas Protegidas

As demais rotas exigem autenticação via token JWT no header da requisição.

```txt
Authorization: Bearer seu_token_jwt
```

---

## 📚 Documentação da API

A documentação da API foi implementada com **Swagger/OpenAPI**, permitindo visualizar e testar os endpoints diretamente pela interface web.

Com a aplicação em execução, a documentação fica disponível em:

```txt
http://localhost:8080/swagger-ui/index.html
```

O Swagger também permite autenticação via Bearer Token, possibilitando o teste de endpoints protegidos diretamente pela interface da documentação.

---

## 🧠 Endpoints Principais

### Usuários e Autenticação

| Método | Endpoint     | Descrição                                  |
| ------ | ------------ | ------------------------------------------ |
| `POST` | `/cadastros` | Cadastra um novo usuário                   |
| `POST` | `/login`     | Autentica o usuário e retorna um token JWT |

### Alunos

| Método   | Endpoint       | Descrição                     |
| -------- | -------------- | ----------------------------- |
| `POST`   | `/alunos`      | Cadastra um novo aluno        |
| `GET`    | `/alunos`      | Lista todos os alunos         |
| `GET`    | `/alunos/{id}` | Busca um aluno por ID         |
| `PUT`    | `/alunos/{id}` | Atualiza os dados de um aluno |
| `DELETE` | `/alunos/{id}` | Remove um aluno               |

### Professores

| Método   | Endpoint            | Descrição                         |
| -------- | ------------------- | --------------------------------- |
| `POST`   | `/professores`      | Cadastra um novo professor        |
| `GET`    | `/professores`      | Lista todos os professores        |
| `GET`    | `/professores/{id}` | Busca um professor por ID         |
| `PUT`    | `/professores/{id}` | Atualiza os dados de um professor |
| `DELETE` | `/professores/{id}` | Remove um professor               |

### Disciplinas

| Método   | Endpoint            | Descrição                           |
| -------- | ------------------- | ----------------------------------- |
| `POST`   | `/disciplinas`      | Cadastra uma nova disciplina        |
| `GET`    | `/disciplinas`      | Lista todas as disciplinas          |
| `GET`    | `/disciplinas/{id}` | Busca uma disciplina por ID         |
| `PUT`    | `/disciplinas/{id}` | Atualiza os dados de uma disciplina |
| `DELETE` | `/disciplinas/{id}` | Remove uma disciplina               |

### Matrículas e Histórico

| Método  | Endpoint                                 | Descrição                                |
| ------- | ---------------------------------------- | ---------------------------------------- |
| `POST`  | `/matriculas`                            | Realiza matrícula de aluno em disciplina |
| `PATCH` | `/matriculas/trancar/{id}`               | Tranca uma matrícula                     |
| `PATCH` | `/matriculas/atualizar-notas/{id}`       | Atualiza as notas de uma matrícula       |
| `GET`   | `/matriculas/emitir-historico/{alunoId}` | Emite o histórico acadêmico do aluno     |

---

## 🐘 Banco de Dados

O projeto utiliza **PostgreSQL** para persistência dos dados.

O banco é executado em ambiente **Docker**, garantindo maior padronização do ambiente de desenvolvimento.

Banco utilizado:

```txt
dw_alunoonline
```

Principais tabelas:

* `aluno`
* `professor`
* `disciplina`
* `matricula_aluno`
* `usuarios`

As tabelas são gerenciadas pelo **Hibernate**, a partir das entidades mapeadas na aplicação.

---

## 📄 Histórico Acadêmico

Uma das funcionalidades mais relevantes do projeto é a emissão de **histórico acadêmico consolidado**.

O histórico reúne informações de:

* aluno;
* disciplinas cursadas;
* professores responsáveis;
* notas;
* média;
* status da matrícula.

Para centralizar essas informações, o projeto utiliza a view:

```txt
vw_historico_aluno
```

Essa view facilita a consulta dos dados necessários para emissão do histórico, consolidando informações de diferentes tabelas relacionadas ao fluxo acadêmico.

---

## ⭐ Diferenciais do Projeto

Além das funcionalidades principais de CRUD, o projeto conta com recursos que aumentam sua complexidade técnica e valor como aplicação back-end:

* Autenticação baseada em JWT
* Proteção de endpoints com Spring Security
* Separação entre rotas públicas e protegidas
* Documentação interativa com Swagger/OpenAPI
* Persistência com PostgreSQL
* Ambiente de banco de dados com Docker
* Uso de DTOs para transferência de dados
* Utilização de enums para regras de domínio
* Implementação de histórico acadêmico consolidado
* Uso de view SQL para consulta de dados acadêmicos
* Arquitetura em camadas com separação de responsabilidades

---

## ✅ Testes Realizados

A API foi validada por meio de testes manuais utilizando **Insomnia** e **Swagger**.

Foram testados:

* Cadastro de usuário
* Login e geração de token JWT
* Bloqueio de rotas protegidas sem token
* Liberação de rotas protegidas com token válido
* Cadastro, consulta, atualização e remoção de alunos
* Cadastro, consulta, atualização e remoção de professores
* Cadastro, consulta, atualização e remoção de disciplinas
* Matrícula de aluno em disciplina
* Atualização de notas
* Trancamento de matrícula
* Emissão de histórico acadêmico
* Persistência dos dados no PostgreSQL

---

## 📌 Status do Projeto

Projeto concluído e mantido como parte do portfólio de desenvolvimento back-end.

---

## 👨‍💻 Autor

**Kayo Brenno**

GitHub: [github.com/Kayobrenn](https://github.com/Kayobrenn)
