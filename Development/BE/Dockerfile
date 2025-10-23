# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and Prisma schema
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy Prisma files
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Run database migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

