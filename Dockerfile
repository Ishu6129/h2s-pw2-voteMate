# VoteMate — Node.js Express Backend + Static Frontend
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy all project files
COPY . .

# Cloud Run sets PORT automatically (default 8080)
EXPOSE 8080

# Start the Express server (serves API + static files)
CMD [ "node", "server.js" ]
