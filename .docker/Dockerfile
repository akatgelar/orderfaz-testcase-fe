FROM node:23 AS base

FROM base AS deps
#RUN apk add --no-cache libc6-compat
RUN apt-get update && apt-get install -y git

WORKDIR /app
COPY package.json ./
# RUN npm update 
# RUN npm install react@18
RUN npm install --legacy-peer-deps
# RUN npm update @react-jvectormap/core

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]