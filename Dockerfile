FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY . .

ENV PORT=3333
EXPOSE 3333

CMD ["yarn", "start"]