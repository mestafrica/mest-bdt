# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Set build-time arguments for Next.js environment variables
ARG NEXT_PUBLIC_HANKO_API_URL
ARG NEXT_PUBLIC_BDT_API_URL

ENV NEXT_PUBLIC_HANKO_API_URL=$NEXT_PUBLIC_HANKO_API_URL
ENV NEXT_PUBLIC_BDT_API_URL=$NEXT_PUBLIC_BDT_API_URL

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

# Create a non-root user and set permissions
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs \
    && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
