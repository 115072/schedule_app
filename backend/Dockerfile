# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install *all* dependencies (including devDependencies)
RUN npm install

# Copy the rest of your backend source files
COPY . .

# Expose backend port
EXPOSE 4000

# Start in dev mode with nodemon
CMD ["npm", "run", "dev"]