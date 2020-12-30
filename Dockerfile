# builder image
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-optional
COPY . .
RUN npm run build

## production image
FROM authkeys/nginx-spa
WORKDIR /app
COPY --from=builder /usr/src/app/build .
