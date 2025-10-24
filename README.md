# III Semana de Tecnologia - Frontend

Este repositório contém o frontend oficial da III Semana de Ciência, Tecnologia e Inovação da UNITINS.
O projeto tem como objetivo oferecer uma interface moderna e intuitiva para que os usuários possam obter informações, acompanhar a programação e interagir com o evento de forma simples e acessível.
## Stack Utilizada

<span>
  <img src="https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Nextjs">
  <img src="https://img.shields.io/badge/shadcn%2Fui-000?style=for-the-badge&logo=shadcnui&logoColor=fff" alt="Shadcn">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
</span>

## Rodando Localmente 🖥️

Para executar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

  - Node.js (versão 20 ou superior)
  - Um gerenciador de pacotes (`npm`, `yarn`, `pnpm` ou `bun`)

### Passos

1.  **Clone o repositório:**

    ```sh
    git clone https://github.com/matheus-nardi/iii-semana-tecnologia.git
    ```

2.  **Entre no diretório do repositório:**

    ```sh
    cd iii-semana-tecnologia
    ```

3.  **Instale as dependências:**

    ```sh
    npm install
    ```

    *ou utilize seu gerenciador de pacotes preferido (yarn, pnpm, bun).*

4.  **Inicie o servidor de desenvolvimento:**

    ```sh
    npm run dev
    ```

    Isso iniciará o servidor com o Turbopack para um desenvolvimento mais rápido.

5.  A aplicação estará disponível em `http://localhost:3000`.

## Rodando com Docker 🐳

O projeto também está configurado para ser executado com Docker e Docker Compose, facilitando a criação de um ambiente padronizado.

### Passos

1.  **Construa as imagens Docker:**

    ```sh
    npm run docker:build
    ```

2.  **Inicie os contêineres em modo detached:**

    ```sh
    npm run docker:up
    ```

3.  A aplicação estará disponível em `http://localhost:80` (via Nginx reverse proxy).

### Outros Comandos Docker

  - **Parar e remover os contêineres:**
    ```sh
    npm run docker:down
    ```
  - **Visualizar os logs:**
    ```sh
    npm run docker:logs
    ```
  - **Reiniciar os contêineres:**
    ```sh
    npm run docker:restart
    ```
# Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Matheus-Nardi" target=_blank>
        <img src="https://avatars.githubusercontent.com/u/131494232?v=4" width="100px;" alt="Matheus Alexandre Profile Picture"/><br>
        <sub>
          <b>Matheus Alexandre</b>
        </sub>
      </a>
    </td>
    <td align="center">
       <a href="https://github.com/italobeckman" target=_blank>
        <img src="https://avatars.githubusercontent.com/u/142343482?v=4" width="100px;" alt="Italo Picture"/><br>
        <sub>
          <b>Italo Beckman</b>
        </sub>
      </a>
  </tr>
</table>
