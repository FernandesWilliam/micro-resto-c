FROM node:18-slim As development

WORKDIR /interactive-table

CMD ["npm", "run", "start"]

FROM node:18-alpine AS build

WORKDIR /interactive-table

COPY . .

RUN npm ci

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production

WORKDIR /interactive-table

ENV NODE_ENV production

COPY --from=build /interactive-table/node_modules ./node_modules
COPY --from=build /interactive-table/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build"]