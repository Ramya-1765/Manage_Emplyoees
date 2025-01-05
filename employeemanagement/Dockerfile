# FROM node:alpine
# WORKDIR /app
# COPY package*.json ./
# RUN bun install
# COPY . .
# EXPOSE 5173
# CMD ["bun","run","dev"]
# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Install bun (Package Manager)
RUN curl -fsSL https://bun.sh/install | bash

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies using bun
RUN /root/.bun/bin/bun install

# Copy the current directory contents into the container at /app
COPY . .

# Expose the app port
EXPOSE 5173

# Run the app when the container launches
CMD ["bun", "run", "dev"]
