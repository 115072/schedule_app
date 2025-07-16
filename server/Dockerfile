# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the server files
COPY . .

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["node", "index.js"]
