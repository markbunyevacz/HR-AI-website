FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm install --workspace=backend && npm install --workspace=frontend

RUN npm run build --workspace=frontend

WORKDIR /app/backend

EXPOSE 3001

CMD ["npm", "start"]
