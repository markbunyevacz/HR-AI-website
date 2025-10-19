# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files from the root and the backend
COPY package.json ./
COPY HR-AI-Portal/package.json ./HR-AI-Portal/
COPY HR-AI-Portal/backend/package.json ./HR-AI-Portal/backend/

# By copying all package files, we can leverage Docker's layer caching
# This command will install dependencies for the entire workspace
RUN npm install

# Copy the rest of your application's code
COPY . .

# Set the working directory to the backend service
WORKDIR /app/HR-AI-Portal/backend

# The command to run your application
CMD ["npm", "start"]
