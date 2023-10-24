# MoviesFlix

## Para rodar o projeto
* Ter o [NODE JS](https://www.nodejs.org) instalado
* Ter o [MY SQL](https://dev.mysql.com/downloads/) instalado...

## Passo a passo para rodar
* Verifique se as portas `3000` e `8080` estão disponíveis
### Backend.
1. Clonar este repositório `git clone https://github.com/Wilhelm-Zimmermann/GiovanellaFlix.git`
2. No My Sql é necessário criar um usuário chamado `giovanella` com a senha `123456789` e a base de dados deve ter o nome de `giovanella_schema`
3. Passo a passo para criar um usuário no [MySql](https://dotnettutorials.net/lesson/create-new-user-using-mysql-workbench/)
4. Criar um arquivo .env e declarar esta variável `DATABASE_URL="mysql://giovanella:123456789@localhost:3306/giovanella_schema"`
5. Abrir um terminal na pasta server e executar o comando `npm install` ou `yarn`, e esperar instalar todas as dependências
6. Executar o comando `yarn prisma migrate dev` ou `npx prisma migrate dev`
7. Rodar a aplicação `yarn dev` ou `npm run dev`
8. Também é possível rodar a build `npm run build` ou `yarn build` e depois `node ./dist/server.js`
9. Para executar os testes automatizados digite o comando `yarn test` ou `npm run test`...

### Frontend.
1. Abrir um terminal na pasta web e executar o comand `yarn` ou `npm install`
2. Depois `yarn start` ou `npm start` para rodar o frontend...

<h1>Dependências Utilizadas</h1>

<details>
  <summary><h3> Front End </h3></summary>

  <ul>
    <li>React</li>
    <li>React Router</li>
    <li>Axios</li>
    <li>React Font</li>
    <li>React Icons</li>
    <li>React UUID</li>
    <li>Typescript</li>
    <li>Tailwindcss</li>
  </ul>
</details>
    
<details>
 <summary><h3> Back End </h3></summary>
  <ul>
    <li>Typescript</li>
    <li>Express</li>
    <li>Multer</li>
    <li>Babel</li>
    <li>Typescript</li>
    <li>Prisma</li>
    <li>Typescript</li>
    <li>Jest</li>
    <li>Eslint</li>
    <li>Bcrypt</li>
    <li>Cors</li>
    <li>Json Web Token</li>
    <li>Express Async Errors</li>
    <li>Tsyringe</li>
    <li>Reflect Metadata</li>
    <li>https://www.tvmaze.com/api: api onde estão registrados os filmes)</li>
  </ul>
  </details>


## Api endpoints
### /movies
Retorna um array de filmes:
```json
[
  {
    "id": 2,
    "name": "Person of Interest",
    "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I design...",
    "averageRate": 0,
    "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
    }
  }
]
```

### /movies/rated
Retorna um array de filmes já avaliados:
```json
[
  {
    "id": 2,
    "name": "Person of Interest",
    "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I design...",
    "averageRate": 10,
    "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
    }
  }
]
```

### /movies/details/:movieId
Retorna um filme com base no id:
```json
{
  "id": 2,
  "name": "Person of Interest",
  "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I design...",
  "averageRate": 10,
  "image": {
    "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
  }
}
```

### /movies/search?q=anything
Retorna um array de filmes baseado na query que é passada
```json
[
  {
    "id": 2,
    "name": "Person of Interest",
    "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I design...",
    "averageRate": 10,
    "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
    }
  }
]
```

### /movies/create
Rota para criar o filme: O body deve conter
```json
{
  "id": 2,
  "name": "Person of Interest",
  "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I design...",
  "imageURL": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg"
}
```

### /users/create
Rota para criar um usuário: O body deve conter.
```json
{
    "email":"usuario@outlook.com",
    "name":"user",
    "password":"123455"
}
```

### /users/login
Rota para logar um usuário: O body deve conter.
```json
{
    "email":"usuario@outlook.com",
    "password":"123455"
}
```
Retorna:
```json
{
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3N2Q3YjY2MC02YTkxLTQ0YTUtYWQyYy1hZGE3ODQzZmY3ZTMiLCJpYXQiOjE2ODUzNjkzMzQsImV4cCI6MTY4NTQ1NTczNH0.EYRPwUNho8AeS1UdW6PBkK9ED8ua9LP6KCxXsjDT_JI"
}
```

### /users/upload
Rota para fazer upload de uma foto de perfil: o body deve ser em form-data.
`profilePhoto` `arquivo.jpg|png`

## /users/get-profile
Rota para pegar o perfil do usuário:
Deve conter o `Header` `Authorization` passando o `Bearer token` .
Retorna:
```json
{
    "id": "8dbb3ad7-c53a-4527-88ed-fface24a877c",
    "name": "user",
    "email": "user@outlook.com",
    "password": "$2b$08$BR4yZsZufybxKrbM.oBebOHAbPxWKEa1V7P3A7Zbdj./WWGRtrJAy",
    "profileImageUrl": "http://localhost:8080/users/upload/"
}
```

### /ratings/:movieId
Deve conter o `Header` `Authorization` passando o `Bearer token` .
Retorna:
```json
{
    "movieUrl": "http://localhost:8080/movies/details/1",
    "movieAverageRate": 5
}
```

### Sempre que um error for gerado, a api retornará o seguinte
```json
  {
    "error": "Nome do erro"
  }
```
