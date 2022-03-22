FROM node:lts-alpine

WORKDIR /app/service2

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "./src/server.js"]
