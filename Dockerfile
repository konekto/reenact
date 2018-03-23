FROM node:latest

ENV PORT 5004
ENV ADDRESS 0.0.0.0
ENV DEV true

EXPOSE 5004

COPY . /reenact
WORKDIR /reenact

RUN npm install

CMD if $DEV; then ./bin/index.js --server --address $ADDRESS --port $PORT --dev; else ./bin/index.js --server --address $ADDRESS --port $PORT; fi
