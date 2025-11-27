# Use Node.js 20 Alpine image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the backend files
COPY . .

# Build your backend if needed (optional)
# RUN npm run build

# Expose the port your backend uses
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
