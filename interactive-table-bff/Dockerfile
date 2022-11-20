FROM node:18-slim As development

WORKDIR /app

CMD ["npm", "run", "start"]

FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN npm ci --only=production && npm cache clean --force

CMD ["node", "app.js"]