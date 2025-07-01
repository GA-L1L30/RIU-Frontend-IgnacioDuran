FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist && ls -l dist

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist/browser ./dist
RUN npm install -g serve

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
