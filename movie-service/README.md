# Movie microservice

This is the movie microservice that will handle movie metadata and genre requests.

## Getting started

### Prerequisites

* [Node.js](https://nodejs.org/) (and I recommend you use [yarn](https://yarnpkg.com/) as package manager).
* [PostgreSQL](https://www.postgresql.org/)

### Setup

After cloning the repository, create a `.env` file in the root of this project with the values found in `.env.example`.
Make sure the data specified in `.env` is correct and that the database exists.

Then install the dependencies by running

```bash
yarn install
```

Finally you can run the server by running

```bash
yarn start
```

