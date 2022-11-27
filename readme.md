<h1 align="center">FinAPI 💰</h1>

### 💻 Descrição

<p align="justify">API financeira, que permite o usuário fazer consultas e inserir dados.</p>

### :nut_and_bolt: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Yarn][yarn]
- [Node][node]
- [TypeScript][typescript]
- [Express][express]

[yarn]: https://yarnpkg.com/
[node]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[express]: https://expressjs.com/pt-br/

#### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível obter o balance da conta do cliente

#### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente

### 🤔 Como rodar o projeto?

```bash

# Clone o repositório
git clone https://github.com/Gabriek0/finAPI.git

# Mude para o diretório do projeto
cd https://github.com/Gabriek0/finAPI.git

# Instale as dependências
yarn

# Rode o projeto
yarn dev

```

### 🧑 Autor do Projeto

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Gabriek0">
        <img src='https://avatars.githubusercontent.com/u/89749843?v=4' width="100px;" alt=""/>
        <br />
          <sub>
            <b>Gabriel Henrique</b>
          </sub>
      </a>
    </td>

  </tr>
</table>
