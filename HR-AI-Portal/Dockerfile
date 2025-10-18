# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from HR-AI-Portal directory
COPY HR-AI-Portal/package*.json ./
COPY HR-AI-Portal/backend/package*.json ./backend/
COPY HR-AI-Portal/frontend/package*.json ./frontend/

# Install dependencies
RUN npm install && npm install --workspace=backend && npm install --workspace=frontend

# Copy source code
COPY HR-AI-Portal .

# Build frontend
RUN npm run build --workspace=frontend

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies only
COPY HR-AI-Portal/package*.json ./
COPY HR-AI-Portal/backend/package*.json ./backend/

# Install production dependencies only
RUN npm ci --only=production && npm ci --workspace=backend --only=production

# Copy built frontend
COPY --from=builder /app/frontend/dist ./frontend/dist

# Copy backend source
COPY HR-AI-Portal/backend/src ./backend/src
COPY HR-AI-Portal/backend/database ./backend/database
COPY HR-AI-Portal/backend/.sequelizerc ./backend/.sequelizerc

# Create upload directories
RUN mkdir -p uploads/ocr uploads/certificates logs

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start backend
CMD ["npm", "start"]
