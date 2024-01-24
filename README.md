# Gymbug app

### Changes description

- created 2 folders(sub projects) one for frontend(client) and one for backend(api)
- you can start the project using the `app:install`, `client:dev`, `api:dev` commands. Take a look inside `package.json` to see how those commands are able to start the project


### Setup

To install all packages run

```
npm run app:install
```

To start client

```
npm run client:dev
```

> NOTE: Client requires a `.env` file inside the `client` folder with the API key:

```
VITE_API_KEY=...
```


To start api server

```
npm run api:dev
```

> NOTE: Client requires a `.env` file inside the `api` folder with the API key:

```
JWT_SECRET=...
```
