# taubaté esportes

portal esportivo desenvolvido como projeto pessoal do curso de front-end, com foco em dar visibilidade a modalidades esportivas de taubaté que costumam receber pouco destaque na mídia local: **handebol**, **tênis de mesa** e **vôlei**.

## link do projeto

https://esportes-zgzb.onrender.com/

## ferramentas

<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=excalidraw,react,js,tailwind,figma,vite,git,github,vscode" alt="excalidraw, react, javascript, tailwind css, figma, vite, git, github, vscode" />
</a>

## :book: sobre o projeto

o **taubaté esportes** é um portal de notícias esportivas focado em modalidades sub-representadas na cidade de taubaté. a proposta é acompanhar campeonatos, resultados, calendário de eventos e as equipes dessas três modalidades, dando a elas o mesmo destaque que normalmente é reservado ao futebol.

### modalidades cobertas

- **handebol** — equipes e competições
- **vôlei** — jogos e torneios
- **tênis de mesa** — ranking e partidas

> :warning: o projeto **não cobre futebol** — o foco é justamente dar espaço às modalidades menos vistas.

## :sparkles: funcionalidades

### home
- banner em tela cheia com uma animação para cada esporte, que troca sozinha logo depois da jogada:
  - **handebol** — a bola dribla e entra no gol
  - **vôlei** — levantamento e saque por cima da rede
  - **tênis de mesa** — a raquete rebate e a bola quica na mesa do adversário, voltando para o handebol
- abas para escolher o esporte, botão de pausar e navegação pelas setas do teclado
- a troca automática pausa com o mouse em cima ou com o foco do teclado

### páginas dos esportes
- próximos jogos, resultados, calendário completo, confrontos e classificação
- os dados de cada esporte ficam em `src/data/`, usados pela página e pela busca

### contato
- banner no mesmo estilo da home, com animação de um avião de papel levando a mensagem
- cards de telefone, e-mail e endereço (abrem a ligação, o e-mail e o mapa)
- formulário com assuntos rápidos; ao enviar, abre o aplicativo de e-mail com a mensagem pronta
- mapa do google, redes sociais e perguntas frequentes

### busca
- busca no topo do site: digite e aperte **enter**
- leva direto para a página certa (esporte, contato, notícias) e reconhece nomes de times, competições e locais
- o que não for encontrado é procurado nas notícias

### menu de acessibilidade
abre pelo botão azul no canto da tela ou pelo atalho **ctrl + l**. as escolhas ficam salvas ao trocar de página.

- **texto e leitura:** texto maior, zoom da página, fonte para dislexia, leitor de texto em português, guia e máscara de leitura
- **cores:** contraste+ (fundo preto, texto branco e destaques em amarelo), saturação, ajuste de cores e links destacados
- **navegação:** ocultar imagens, parar animações, cursor grande e busca por voz
- menu superdimensionado e botão para redefinir tudo
- integração com o **vlibras** (libras)

### geral
- layout responsivo (celular, tablet e desktop)
- rodapé com navegação, redes sociais e newsletter

## :tools: tecnologias utilizadas

- [react](https://react.dev/) — biblioteca para construção da interface
- [react router](https://reactrouter.com/) — navegação entre as páginas
- [tailwind css](https://tailwindcss.com/) — estilização utilitária
- [vite](https://vite.dev/) — ambiente de desenvolvimento e build
- [lucide](https://lucide.dev/) e [bootstrap icons](https://icons.getbootstrap.com/) — ícones
- fontes **barlow** e **barlow condensed** (google fonts)
- animações em svg + css, sem bibliotecas extras
- web speech api — leitor de texto e busca por voz
- [figma](https://figma.com/) — prototipação e design das telas

## :rocket: como executar o projeto

```bash
# clone este repositório
git clone https://github.com/buzinei-bibi/esportes.git

# acesse a pasta do projeto
cd esportes

# instale as dependências
npm install

# rode o projeto
npm run dev
```

o projeto ficará disponível em `http://localhost:5173` (ou na porta indicada pelo terminal).

> :bulb: **windows:** se o powershell bloquear o `npm`, use `npm.cmd install` e `npm.cmd run dev`.

## :file_folder: estrutura do projeto

```
esportes/
├── public/
│   └── Imagens/            # logos, escudos e fotos (banner/ tem as versões otimizadas em webp)
├── src/
│   ├── components/
│   │   ├── Button/         # menu de acessibilidade
│   │   ├── Footer/
│   │   ├── Header/         # topo com a busca
│   │   └── Home/           # banner animado da home
│   ├── data/               # jogos de cada esporte e a lógica da busca
│   ├── pages/              # home, contato, notícias e uma página por esporte
│   ├── App.jsx
│   ├── index.css           # estilos globais + regras do menu de acessibilidade
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## :dart: objetivo do projeto

este projeto foi desenvolvido como atividade do curso de front-end, com o objetivo de praticar:

- componentização em react
- estilização com tailwind css
- construção de layouts responsivos
- acessibilidade na prática
- animações com svg e css
- organização de um projeto real do zero

## :pushpin: próximos passos

- [x] página de notícias completa
- [x] busca funcionando (digitada e por voz)
- [x] menu de acessibilidade
- [ ] fotos oficiais das equipes no banner da home
- [ ] perfis individuais de jogadores
- [ ] calendário de eventos interativo
- [ ] integração com backend/api de dados (jogos, notícias e newsletter)

## :bust_in_silhouette: autor

projeto desenvolvido por **buzina** como parte do curso de front-end.

## :page_facing_up: licença

este é um projeto acadêmico/pessoal sem fins comerciais.
