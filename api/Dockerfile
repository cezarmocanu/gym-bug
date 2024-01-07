# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN cat package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install dependencies
RUN ls

# Install dependencies
RUN ls node_modules

# Build the Nest.js application
RUN npm run build


# Expose the port that your Nest.js application is running on
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start:prod"]