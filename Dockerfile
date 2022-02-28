ARG STKEY_ID
ARG STKEY_NAME
ARG STKEY_SERVER_BY

FROM node:latest

RUN npm install -g pm2 yarn
RUN mkdir /app
WORKDIR /app

ADD yarn.lock ./
RUN yarn
ADD . ./

EXPOSE 80
CMD echo "{\
    \"id\":   \"${STKEY_ID}\",\
    \"name\": \"${STKEY_NAME}\",\
    \"serverBy\": \"${STKEY_SERVER_BY}\"\
}" > /app/config.json && pm2-docker server.js
