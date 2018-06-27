FROM node:9-alpine

ENV PORT 5004
ENV ADDRESS 0.0.0.0
ENV DEV true

EXPOSE 5004

COPY . /reenact
WORKDIR /reenact

RUN npm i -g npm
RUN npm ci

RUN mkdir /app
WORKDIR /app

CMD if $DEV; then /reenact/bin/index.js --server --address $ADDRESS --port $PORT --dev; else /reenact/bin/index.js --server --address $ADDRESS --port $PORT; fi
