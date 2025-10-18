# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install && npm install --workspace=backend && npm install --workspace=frontend

# Copy source code
COPY . .

# Build frontend
RUN npm run build --workspace=frontend

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies only
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies only
RUN npm ci --only=production && npm ci --workspace=backend --only=production

# Copy built frontend
COPY --from=builder /app/frontend/dist ./frontend/dist

# Copy backend source
COPY backend/src ./backend/src
COPY backend/database ./backend/database
COPY backend/.sequelizerc ./backend/.sequelizerc

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
