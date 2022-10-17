FROM node:18-slim As development

WORKDIR /bff

CMD ["npm", "run", "start:dev"]

FROM node:18-alpine AS production

WORKDIR /bff

ENV NODE_ENV production

COPY . .

RUN npm ci --only=production && npm cache clean --force

CMD ["node", "server.js"]