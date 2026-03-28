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

# Install necessary system dependencies for Prisma and healthchecks
RUN apk add --no-cache openssl netcat-openbsd

# Copy only the necessary files from the builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.* ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/scripts ./scripts

# Install production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Generate Prisma client for production (in case it wasn't picked up or output path differs)
RUN npx prisma generate

# Expose the default Nuxt port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Make entrypoint script executable (just in case)
RUN chmod +x ./scripts/entrypoint.sh

# Use the entrypoint script to run migrations and start the app
ENTRYPOINT ["./scripts/entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
