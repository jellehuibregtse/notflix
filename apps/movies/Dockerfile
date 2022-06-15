FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build movies

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY . .
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/movies/main"]
