FROM node:16-slim

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV PORT=3333
CMD ["yarn", "dev"]