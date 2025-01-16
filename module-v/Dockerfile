# Use Node.js Alpine image
FROM node:22-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.build.json tsconfig.test.json ./

# Install system dependencies and pnpm
RUN apk add --no-cache npm dumb-init gcc g++ python3 \
    && npm install -g pnpm \
    && pnpm install --frozen-lockfile --production=false \
    && apk del gcc g++ python3

# Set environment variable for production
ENV NODE_ENV=production

# Copy application code
COPY . .

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Start the application with dumb-init
CMD ["dumb-init", "pnpm", "dev"]
