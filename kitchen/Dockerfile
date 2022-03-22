FROM node:lts-alpine

WORKDIR /app/service1

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "./src/server.js"]
