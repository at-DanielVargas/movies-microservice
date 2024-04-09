# dockerfile for build nestjs microservice for production

FROM node:14.15.4-alpine3.12 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production image

FROM node:14.15.4-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/main"]
