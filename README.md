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

## Running docker compose

```
docker-compose up
```

## Running application

After starting the app on port (4000 as default) you can open POSTMAN (http://localhost:4000)

## Testing

After application running open new terminal and enter:
!!!!! If any tests are not passing, please try the script npm run test:auth once again.

To run all test with authorization

```
npm run test:auth
```

To run all tests without authorization, please comment out the following code in auth.module.ts:

    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/auth/signup', method: RequestMethod.POST })
      .exclude({ path: '/auth/login', method: RequestMethod.POST })
      .exclude('/doc')
      .exclude('/')
      .forRoutes({ path: '*', method: RequestMethod.ALL });

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
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
