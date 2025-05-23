FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install --omit=dev && npm cache clean --force && rm -rf /root/.npm

EXPOSE 2001
CMD [ "node", "server.js" ]