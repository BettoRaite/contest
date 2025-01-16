# Build stage
FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm husky
# Install necessary packages
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    g++ \
    python3 \
    && pnpm install --frozen-lockfile --production=false \
    && apk del .build-deps

# Set environment variable for production
ENV NODE_ENV=production

COPY . .

# Build the application
RUN pnpm build

# Run stage
FROM node:22-alpine3.20 AS run

# Set the working directory to /app
WORKDIR /app


COPY package.json pnpm-lock.yaml ./

# Install Node.js, pnpm, and dumb-init in one layer
RUN apk add --no-cache npm dumb-init \
    && npm install -g pnpm husky

# Add a non-root user to run the application
RUN addgroup -g 1001 nodejs \
    && adduser -D -u 1001 -G nodejs nodejs \
    && chown -R nodejs:nodejs /app

# # Switch to the non-root user
USER nodejs

# Install production dependencies
RUN pnpm install --frozen-lockfile
# Copy built application code from build stage with ownership change
COPY --chown=nodejs:nodejs  --from=build /app/dist ./dist
COPY --chown=nodejs:nodejs  --from=build /app/prisma ./prisma

# Generate prisma client if necessary (consider optimizing this step)
RUN pnpm dlx prisma generate
# "-u", "nodejs"
# Start the application with dumb-init, specifying user directly in CMD
CMD ["dumb-init", "pnpm", "dev"]
