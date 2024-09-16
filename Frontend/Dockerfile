# Use an official Node.js image from Docker Hub
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies with --legacy-peer-deps (to avoid conflicts)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Run the frontend build process
RUN npm run build

# Expose port (if running locally)
EXPOSE 3000

# Command to start the app (for local testing, not required in your case)
CMD ["npm", "start"]