FROM node:latest

ENV PORT 5004
ENV ADDRESS 0.0.0.0
ENV DEV true

EXPOSE 5004

COPY . /reenact
WORKDIR /reenact

RUN npm install

WORKDIR /

CMD if $DEV; then ./reenact/bin/index.js --server --address $ADDRESS --port $PORT --dev; else ./reenact/bin/index.js --server --address $ADDRESS --port $PORT; fi
