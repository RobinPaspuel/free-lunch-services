FROM node:16 

RUN mkdir /front-end

WORKDIR /front-end

COPY ./package.json /front-end

# COPY ./package-lock.json /front-end

RUN npm i

COPY . /front-end

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev"]