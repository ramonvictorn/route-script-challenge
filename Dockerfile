FROM node:10

RUN mkdir -p /home/node/app/sessions  && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY . .

RUN npm install
RUN npm install -D
RUN npm run build-prod
COPY --chown=node:node . .
USER node

CMD [ "node", "src/app.js" ]