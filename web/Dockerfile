# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# NEXT_PUBLIC_* values are injected at RUNTIME (see docker-entrypoint.sh), not
# baked in here. Next.js inlines NEXT_PUBLIC_* at build time, so we build with
# placeholder tokens that the entrypoint swaps for the real values on start.
ENV NEXT_PUBLIC_HANKO_API_URL=__RUNTIME_NEXT_PUBLIC_HANKO_API_URL__
ENV NEXT_PUBLIC_BDT_API_URL=__RUNTIME_NEXT_PUBLIC_BDT_API_URL__

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.ts ./next.config.ts

# Entrypoint swaps the placeholder tokens for the real runtime env values.
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create a non-root user and set permissions
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs \
    && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "start"]
