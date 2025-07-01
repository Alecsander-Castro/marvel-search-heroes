# Marvel Heroes Explorer

Marvel Heroes Explorer é uma aplicação React que permite explorar e pesquisar heróis do universo Marvel. Você pode buscar heróis por nome, visualizar detalhes e favoritar até 5 heróis para acesso rápido.

---

## Funcionalidades

- **Buscar heróis:** Digite o nome (ou parte do nome) do herói na barra de busca e pressione Enter para filtrar a lista.
- **Favoritar heróis:** Clique no ícone de coração para favoritar ou desfavoritar um herói.
- **Limite de favoritos:** Você pode favoritar até 5 heróis. Se tentar adicionar mais, receberá um aviso.
- **Visualizar detalhes:** Clique em um herói para ver informações detalhadas, quadrinhos recentes e favoritar diretamente na página dele.


---

## Como usar

1. Na página inicial, utilize a barra de busca para encontrar heróis, por exemplo, digite "Spider" e pressione Enter.
2. A lista será filtrada conforme o termo pesquisado.
3. Clique no ícone de coração ao lado do nome do herói para adicioná-lo ou removê-lo dos favoritos.
4. O limite máximo de favoritos é 5. Se tentar adicionar mais, um alerta será exibido.
5. Clique em um herói para acessar a página de detalhes, onde também poderá favoritar/desfavoritar.

---

## Implementação do limite de 5 favoritos

No projeto, o gerenciamento do estado dos favoritos é feito usando **Zustand**, que é uma biblioteca simples e eficiente para estado global no React.

Ao tentar favoritar um novo herói, verificamos se o herói já está na lista e se o limite de 5 favoritos foi atingido:

```ts
toggleFavorite: (hero) => {
  const { favorites } = get();
  const alreadyFavorited = favorites.some(fav => fav.id === hero.id);

  const updatedFavorites = alreadyFavorited
    ? favorites.filter(fav => fav.id !== hero.id)
    : favorites.length >= 5
      ? (alert("Você só pode favoritar até 5 heróis."), favorites)
      : [...favorites, hero];

  localStorage.setItem("favoriteHeroes", JSON.stringify(updatedFavorites));
  set({ favorites: updatedFavorites });
}

```
## Tecnologias utilizadas

- React
- React Router
- Zustand (para gerenciamento global do estado dos favoritos)
- TypeScript
- Marvel API (para dados dos heróis e quadrinhos)
- Cypress (para testes end-to-end)

---

## Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/marvel-heroes-explorer.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```
3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn start
```
3. Rode os testes

```bash
npx cypress open
```
