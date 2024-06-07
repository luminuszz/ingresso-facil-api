FROM node:alpine

WORKDIR app

COPY . .

RUN corepack enable

RUN pnpm install

RUN pnpm prisma generate

CMD ["pnpm" , "start:dev"]



