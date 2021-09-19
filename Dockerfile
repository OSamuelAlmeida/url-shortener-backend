FROM node:16-alpine3.11

WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY . .

ENTRYPOINT npm start