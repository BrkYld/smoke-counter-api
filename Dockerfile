FROM node:alpine

RUN mkdir -p /usr/src/smoke-counter-api && chown -R node:node /usr/src/smoke-counter-api

WORKDIR /usr/src/smoke-counter-api

COPY package.json yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn","prod"]