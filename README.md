# Ebb

- npm workspaces
  - [API (NestJS)](./packages/backend/README.md)
  - [Frontend (React, Vite)](./packages/frontend/README.md)

## Development

WIP

```
cp .env.example .env
npm i
npx -w packages/backend prisma migrate dev # migrate db schemas
npx firebase emulators:start --project demo-ebb --only auth # start firebase emulator
npm run start:dev -w packages/backend # start api server
npm run dev -w packages/frontend # start vite server
```
