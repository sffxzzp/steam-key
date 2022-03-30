ARG STKEY_ID
ARG STKEY_NAME
ARG STKEY_SERVER_BY

FROM node:10.24.1-alpine3.11

RUN apk --update add --no-cache git
RUN npm install -g pm2
RUN mkdir /app
WORKDIR /app

ADD package*.json ./
ADD yarn.lock ./
RUN yarn install
ADD . ./

EXPOSE 80
CMD echo "{\
    \"id\":   \"${STKEY_ID}\",\
    \"name\": \"${STKEY_NAME}\",\
    \"serverBy\": \"${STKEY_SERVER_BY}\"\
}" > /app/config.json && pm2-docker server.js
