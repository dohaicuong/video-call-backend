FROM node:12.16-alpine

WORKDIR /etc/app

COPY ./package.json .
RUN yarn

COPY . .

ENTRYPOINT yarn gen && yarn start