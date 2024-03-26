FROM node:20-alpine
WORKDIR /app
ADD . .
ADD package.json .
RUN npm ci
CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev
