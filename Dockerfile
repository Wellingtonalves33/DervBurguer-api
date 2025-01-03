FROM node:16-slim

WORKDIR /app
COPY . .
RUN yarn install
ENV PORT=3333
CMD ["yarn", "start"]