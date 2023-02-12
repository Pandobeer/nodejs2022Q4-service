FROM node:18.12.1-alpine3.17
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 8080
CMD npm run start:dev