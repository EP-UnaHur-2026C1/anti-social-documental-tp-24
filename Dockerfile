FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY src .

ENV PORT=4001

CMD ["node", "main.js"]