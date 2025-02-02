# Rest-Delivery

- [Introduction](#introduction)
  - [Versions](#versions)
  - [Dependencies](#dependencies)
- [Installing](#installing)
- [Architecture](#architecture)
  - [@business](#business)
  - [@constants](#constants)
  - [@data](#data)
  - [@database](#database)
  - [@handles](#handles)

## Introduction

- A API desenvolvida foi uma proposta de demonstração de conhecimento utilizando Node.JS com typescript encima dos serviços da AWS, utilizando uma arquitetura serverless e o serviço lambda da AWS. Sem o objetivo de aprofundar em uma proposta mais robusta, no sistema apenas foi elaborado encima de uma entidade "User" no banco de dados dynamodb NoSql.

### VERSIONS:

- [nvm](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/getting-started-install.html): _1.2.2_
  - nodejs: _20.0.0_
- [AWS CLI](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/getting-started-install.html): _2.23.6_
- [Python](https://www.python.org/downloads/): _3.12.6_
- [Windows](https://www.microsoft.com/pt-br/software-download/windows11): _11_
- [Docker/AMD64](https://www.docker.com/get-started/): _27.4.0_

### Dependencies:

- nodejs
- AWS CLI
- Docker

## Installing

### First Step

- Antes de iniciar o projeto, execute o passo a passo para a instalação do dynamodb e a aws cli localmente no arquivo presente no projeto: **DYNAMODB_MANUAL_INSTALL.md** e baixe o docker ou docker desktop.

### Second Step

- Execute o comando abaixo para baixar todas as dependências necessárias do projeto.

```bash
$ npm install
```

### Third Step

- Crie sua base de dados utilizando o comando baixo no terminal da sua IDE

```bash
$ npm run migrations
```

### Fourth Step

- Alimente a base de dados com os registros iniciais utilizando o comando abaixo no terminal da sua IDE.

```bash
$ npm run seeds
```

### Fifth Step

- Utilize agora o comando baixo para executar o seu projeto.

```bash
$ npm run start:api
```

### Sixth Step

- E por fim, teste as funcionalidades do projeto utilizando os testes unitários e de integração.

```bash
$ npm run test
```

## Architecture

- Os próximo tópicos são o esclarecimento sobre a estrutura da pasta `src` adotada no projeto:

### `@business`

- A pasta `business` guarda arquivo relacionados a regra de negócio e o código de execução para as operações de cada entidade, podendo ser relacionada ao endpoint ou até a funcionalidades internas.

### `@constants`

- A pasta `constants` armazena variáveis com valores imutáveis que serão utilizadas por todo o sistema.

### `@data`

- A pasta `data` é responsável por guardar valores baseados nas entidades utilizados por todo o sistema.

### `@database`

- A pasta `database` terá tudo relacionado ao banco de dados, sendo necessário criar um diretório para cada banco de dados utilizado e encapsular suas regras dentro. Exemplo seria o dynamodb. Igual está criado atualmente, temos o caminho **/database/dynamodb** contendo tudo que é necessário e executável para as operações utilizando-o.

### `@handles`

- A pasta `handles` irá guardar a declaração inicial das rotas, contendo a função de evento que é chamada no momento em que das solicitações. Nela os arquivos terão os nomes referente aos métodos utilizados para acessar e estarão agrupado dentro de pastas referente a entidade em que acessa.

### `helpers`

- A pasta `helpers` armazenará funções reutilizável no sistema.

### `providers`

- A pasta `providers` fica responsável por conter todas as configurações de recursos de terceiros para serem utilizados no projeto, sendo desde classes até funções contendo já toda a declaração e lógica necessária para que haja apenas o chamado e execução dentro dos demais lugares do projeto.
