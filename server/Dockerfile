FROM node:22-alpine

WORKDIR /app

# Install dependencies first (layer cache) — copy the Prisma schema too so
# `npm ci`'s postinstall can run `prisma generate` against it.
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev
RUN npx prisma generate

# Copy source
COPY . .

EXPOSE 4000

CMD ["node", "src/index.js"]
