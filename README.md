# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:Pandobeer/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Adding .env

** create .env file using .env.example as a pattern.
Service should listen on PORT 4000 by default, PORT value is stored in .env file. **

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open POSTMAN or
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Create docker app image:

```
docker build . -t docker-basics-node
```

## Running docker app database image:

```
docker run -t -i -p 4000:4000 docker-basics-node
```

## Create docker pg database image:

```
docker build ./database -t node-pg
```

## Running docker pg database image:

```
docker run -t -i -p 8001:8001 node-pg
```

or run in detached way:

```
docker run -t -i -d -p 8001:8001 node-pg
```

## Running docker compose

```
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
