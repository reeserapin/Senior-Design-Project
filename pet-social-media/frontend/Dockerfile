# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install serve (to serve the build folder)
RUN npm install -g serve

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port
EXPOSE 3000
