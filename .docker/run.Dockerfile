FROM node:15.8.0-alpine3.12

WORKDIR /typp-e

COPY . .

RUN yarn --frozen-lockfile

RUN yarn build

CMD yarn start --input='in/input.txt'
