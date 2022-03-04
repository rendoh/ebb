# Ebb

- npm workspaces
  - [API (NestJS)](./packages/backend/README.md)
  - [Frontend (React, Vite)](./packages/frontend/README.md)

## Development

```
cp .env.example .env
npm i
npx -w packages/backend prisma migrate dev # migrate db schemas
npx run dev:emulator # start firebase emulator
npm run dev:backend # start api dev
npm run dev:frontend # start vite dev
```
