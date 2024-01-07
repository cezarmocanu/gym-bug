# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Build app
RUN npm run build

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Nest.js application is running on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start:prod"]