# Use the official Node.js 20 image as the base
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Nuxt application
RUN npm run build

# Use a lighter image for production
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/.output ./.output

# Expose the default Nuxt port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the application using Nitro's built entry
CMD ["node", ".output/server/index.mjs"]
