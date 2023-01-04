# MyCoverAI

## Before Anything

Make sure you have docker and docker-compose installed on your computer

Follow this [guide](https://docs.docker.com/engine/install/)  to get docker installed

Follow this [guide](https://docs.docker.com/compose/install/)  to get docker-compose installed

## Setting up Envs

Check the `.env.example` file and create a `.env` file on root folder. Since this is just a test project the `.env.example` variables are also populated with their respective values. Copy the entire content and paste it in the `.env` file. Then follow the `ADDITIONAL ENV SETUP` instruction in the `.env.example` file to set up the database credentials.

## Starting server

```bash
# install dependencies
$ npm i

# start server
$ npm run up:build
```

For testing purposes, you can seed the database by sending a `POST` request to `http://localhost:5090/api/v1/countries/seed`.

Log into PGAdmin by opening `http://localhost:8080` on your browser and use these credentials: `email: admin@admin.com` `password: admin`. When creating a new server in PGAdmin use `postgres` as database source instead of `localhost`.

## Stoping server

```bash
# development
$ npm run down
```

## API

Base URL: `http://localhost:5090/api/v1`
Headers: `Request-Type: production || test`

`GET` `/countries`
`GET` `/countries/:id` e.g `countries/2`
`POST` `/countries`

sample payload:

```bash
{
    "name": "Nigeria",
    "capital": "Abuja",
} 
```

`PATCH` `/countries/:id` e.g `countries/2`
`DELETE` `/countries/:id` e.g `countries/2`
