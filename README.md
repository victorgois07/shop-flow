# ShopFlow

ShopFlow é um projeto de microfrontends construído com React, TypeScript, Vite e Module Federation. O projeto utiliza TailwindCSS para estilização e DaisyUI para componentes UI, proporcionando uma experiência de desenvolvimento modularizada e escalável.

## Estrutura do Projeto

O projeto é dividido em vários pacotes que correspondem aos diferentes microfrontends:

- **main**: O aplicativo principal que orquestra os microfrontends.
- **shopflow-cart**: Microfrontend responsável pelo carrinho de compras.
- **shopflow-footer**: Microfrontend responsável pelo rodapé.
- **shopflow-header**: Microfrontend responsável pelo cabeçalho.
- **shopflow-product-listing**: Microfrontend responsável pela listagem de produtos.

## Tecnologias Utilizadas

- **React**: Biblioteca para a construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida e leve para desenvolvimento de aplicações front-end.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **TailwindCSS**: Framework utilitário de CSS.
- **DaisyUI**: Componentes prontos e estilizados com TailwindCSS.
- **Module Federation**: Arquitetura para a integração de microfrontends.
- **ESLint**: Ferramenta de linting para manter o código consistente e limpo.

## Instalação do PNPM

O projeto utiliza **PNPM** como gerenciador de pacotes. Para instalar o PNPM globalmente, siga estas etapas:

1. Instale o PNPM globalmente usando npm:

```bash
npm install -g pnpm
```

2. Verifique a instalação do PNPM:

```bash
pnpm --version
```

Se você já tiver o **PNPM** instalado, certifique-se de que está utilizando a versão mais recente. Caso contrário, você pode atualizá-lo executando o comando:

```bash
pnpm add -g pnpm
```

## Instalação do Projeto

1. Clone o repositório:

```bash
git clone https://github.com/victorgois07/shop-flow.git
cd shopflow
```

2. Instale as dependências de todos os pacotes usando PNPM:

```bash
pnpm install
```

3. Verifique se você está utilizando a versão correta do Node.js:

```bash
nvm use
```

(O projeto requer a versão `v20.16.0` do Node.js, definida no arquivo `.nvmrc`)

## Como Executar o Projeto

Você pode iniciar todos os microfrontends e o projeto principal utilizando o comando abaixo:

```bash
pnpm start
```

O comando `pnpm start` executa as seguintes ações:

1. **Build dos pacotes**: Todos os pacotes dentro de `packages/` serão compilados.
2. **Preview dos pacotes**: Após o build, o servidor de preview do Vite será iniciado para cada microfrontend.
3. **Início do servidor principal**: Depois de todos os microfrontends estarem prontos, o servidor do projeto principal (`main`) será iniciado.

Os serviços são iniciados em suas respectivas portas configuradas no arquivo `.env`. Certifique-se de que o arquivo `.env` contém as seguintes variáveis:

```env
VITE_CART_PORT=3001
VITE_HEADER_PORT=3002
VITE_FOOTER_PORT=3003
VITE_PRODUCT_LISTING_PORT=3004
VITE_MAIN_PORT=3000

VITE_CART_REMOTE=http://localhost:3001/assets/remoteEntry.js
VITE_HEADER_REMOTE=http://localhost:3002/assets/remoteEntry.js
VITE_FOOTER_REMOTE=http://localhost:3003/assets/remoteEntry.js
VITE_PRODUCT_LISTING_REMOTE=http://localhost:3004/assets/remoteEntry.js
VITE_MAIN_REMOTE=http://localhost:3000/assets/remoteEntry.js
```

Após a execução do comando `pnpm start`, acesse as seguintes URLs:

- **main**: `http://localhost:3000`
- **cart**: `http://localhost:3001`
- **header**: `http://localhost:3002`
- **footer**: `http://localhost:3003`
- **product-listing**: `http://localhost:3004`

## Scripts Disponíveis

Abaixo estão os principais scripts definidos no `package.json`:

### Comando Principal

- **`pnpm start`**: Executa o build, o preview dos microfrontends e o servidor principal.

### Scripts Adicionais

- **`pnpm dev`**: Executa o servidor de desenvolvimento para o projeto principal.
- **`pnpm build`**: Compila o projeto principal (`main`) e seus tipos TypeScript.
- **`pnpm lint`**: Executa o linter no código do projeto principal.
- **`pnpm preview`**: Inicia o servidor de preview do Vite para o projeto principal.

### Microfrontends (Cart, Header, Footer, Product Listing)

Cada microfrontend tem os mesmos scripts:

- **`pnpm dev`**: Inicia o servidor de desenvolvimento para o microfrontend.
- **`pnpm build`**: Compila o microfrontend.
- **`pnpm preview`**: Inicia o servidor de preview do Vite para o microfrontend.

## Estilização

O projeto utiliza TailwindCSS com DaisyUI para estilização. A configuração do TailwindCSS está definida em cada microfrontend na opção `css.postcss.plugins` do arquivo `vite.config.ts`:

```ts
css: {
  postcss: {
    plugins: [tailwindcss(), autoprefixer()],
  },
},
```

## Federation Configuração

A configuração de Module Federation em cada microfrontend permite que os componentes sejam expostos para o `main` e compartilhados entre os microfrontends. Aqui está um exemplo da configuração no `vite.config.ts` do `shopflow-cart`:

```ts
federation({
  name: "shopflow-cart",
  filename: "remoteEntry.js",
  exposes: {
    "./Cart": "./src/components/Cart",
    "./CartItem": "./src/components/CartItem",
  },
  shared: ["react", "react-dom", "tailwindcss"],
}),
```

## Licença

Este projeto está licenciado sob a licença MIT.
