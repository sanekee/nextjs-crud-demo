FROM node:22-alpine AS base

RUN npm install -g shadcn

FROM base AS deps

WORKDIR /app

COPY /app/package.json /app/yarn.lock* /app/package-lock.json* ./

RUN yarn install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY app/ .

RUN shadcn add button dropdown-menu input popover skeleton table

RUN yarn build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system -g 1001 nodejs
RUN adduser --system -g 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
