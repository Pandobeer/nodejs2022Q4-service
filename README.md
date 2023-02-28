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

\*\* create .env file using .env.example as a pattern.

Service should listen on PORT 4000 by default, PORT value is stored in .env file. \*\*

## Running docker compose

```
docker-compose up
```

## Running application

After starting the app on port (4000 as default) you can open POSTMAN (http://localhost:4000)
POSTMAN collection is: https://api.postman.com/collections/13645311-7b71065f-9068-4a7d-b57e-0719670c8d2c?access_key=PMAT-01GTAN3SQT6B9H3BSWHENE0VTQ

In case the link with collection doesn't work, please message me in discord, i will resend the new one.

## Working in application

App is implemented with authorization. If you want to check any of the REST API commands,

1. Make signup in Postman: POST:
   http://localhost:4000/auth/signup

```
{
"login": "Mik12",
"password": "123456"
}
```

2. Make login: POST:
   http://localhost:4000/auth/login

```
{
  "login": "Mik12",
  "password": "123456"
}
```

3. During any of the next REST API commands, choose Authorization--Bearer Token, add accessToken, that you received from login above.

4. To refresh login use POST:
   http://localhost:4000/auth/refresh
   In body:
   {
   "refreshToken": "...."
   }

   In Authorization--Bearer add accessToken.

## Testing

After application running open new terminal and enter:
!!!!! If any tests are not passing, please try the script npm run test:auth once again. Sometimes 1 test might fail during the first run, but for the next one everything is passing.

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
