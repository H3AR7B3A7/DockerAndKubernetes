FROM node:14.15.1-alpine3.12
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD node index.js