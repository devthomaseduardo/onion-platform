# Onion Platform

Projeto FullStack experimental com foco em privacidade, APIs e publicação de serviços através da rede Tor utilizando Onion Services.

Atualmente o backend utiliza Fastify e PostgreSQL, com acesso local pela porta `8080` e possibilidade de exposição através de um endereço `.onion`.

## Tecnologias

* Node.js
* Fastify
* PostgreSQL
* Tor Onion Service
* Postman
* JavaScript

## Estrutura atual

```text
backend/
├── src/
│   ├── controllers/
│   ├── database/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── app.js
├── server.js
├── package.json
└── .env
```

## Executando o backend

```bash
cd backend
npm install
node server.js
```

A API ficará disponível em:

```text
http://127.0.0.1:8080
```

## Variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/`:

```env
PORT=8080
HOST=127.0.0.1

DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=onion_platform
DB_USER=onion_app
DB_PASSWORD=sua_senha
```

O arquivo `.env` não deve ser versionado.

## Rotas atuais

```text
GET /
GET /health
GET /health/database
POST /messages
GET /messages/:trackingCode
```

Exemplo:

```bash
curl http://127.0.0.1:8080/health
```

Resposta:

```json
{
  "status": "healthy"
}
```

## Onion Service

A aplicação é executada somente em:

```text
127.0.0.1:8080
```

O Tor Onion Service é responsável por encaminhar as requisições da rede Tor para a aplicação local.

As chaves privadas do Onion Service não fazem parte deste repositório e nunca devem ser publicadas.

## Status

Em desenvolvimento.

Próximas etapas:

* Persistência das mensagens no PostgreSQL
* Repository layer
* Tratamento centralizado de erros
* Docker
* Nginx
* Frontend
* Testes automatizados
