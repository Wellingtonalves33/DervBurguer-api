FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV PORT=3333
EXPOSE 3333

CMD ["yarn", "start"]