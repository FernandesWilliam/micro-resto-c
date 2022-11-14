FROM node:18-slim As development

WORKDIR /self-service-kiosk

CMD ["npm", "run", "start"]

FROM node:18-alpine AS build

WORKDIR /self-service-kiosk

COPY . .

RUN npm ci

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production

WORKDIR /self-service-kiosk

ENV NODE_ENV production

COPY --from=build /self-service-kiosk/node_modules ./node_modules
COPY --from=build /self-service-kiosk/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build"]