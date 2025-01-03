FROM node:16-alpine

WORKDIR /app

COPY . .
RUN yarn install

ENV PORT=3333
EXPOSE 3333

CMD ["yarn", "start"]