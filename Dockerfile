FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY HR-AI-Portal/package.json ./
COPY HR-AI-Portal/backend/package.json ./backend/

# Install dependencies locally in backend
WORKDIR /app/backend
RUN npm install --no-workspaces

# Copy backend source
COPY HR-AI-Portal/backend/ ./

# Expose port
EXPOSE 10000

# Start the application
CMD ["npm", "start"]