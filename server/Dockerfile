# Stage 1: Build the Node App
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the App
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --only=production
RUN npm install -g pm2
EXPOSE 5000
CMD ["pm2-runtime", "dist/server.js", "-i", "max"]
