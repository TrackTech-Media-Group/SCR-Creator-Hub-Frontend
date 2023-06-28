FROM node:18-alpine AS base

# --- Builder ---
FROM base AS builder
WORKDIR /creatorhub

RUN apk add --no-cache libc6-compat
RUN apk update

# Copy obly the needed files
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker


# --- Installer ---
FROM base AS installer
WORKDIR /creatorhub

RUN apk add --no-cache libc6-compat
RUN apk update

# Install dependencies
# COPY .gitignore .gitignore
COPY --from=builder /creatorhub/out/json/ .
COPY --from=builder /creatorhub/out/yarn.lock ./yarn.lock

COPY --from=builder /creatorhub/.yarnrc.yml .yarnrc.yml
COPY --from=builder /creatorhub/.yarn .yarn

RUN yarn set version berry
RUN yarn install

# Build the project
COPY --from=builder /creatorhub/out/full/ .
COPY --from=builder /creatorhub/tsconfig.json tsconfig.json
COPY --from=builder /creatorhub/tailwind.config.cjs tailwind.config.cjs
COPY --from=builder /creatorhub/postcss.config.cjs postcss.config.cjs

RUN yarn turbo run build --filter=web


# --- Runner ---
FROM base AS runner
WORKDIR /creatorhub

ENV NODE_ENV="production"

# Set the user
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app

COPY --from=installer /creatorhub/apps/web/next.config.mjs ./apps/web/next.config.mjs
COPY --from=installer /creatorhub/apps/web/package.json ./apps/web/package.json
COPY --from=installer /creatorhub/apps/web/i18n.json ./apps/web/i18n.json

COPY --from=installer /creatorhub/.yarn/releases ./.yarn/releases
COPY --from=installer /creatorhub/package.json ./package.json
COPY --from=installer /creatorhub/yarn.lock ./yarn.lock

COPY --from=installer --chown=app:app /creatorhub/apps/web/.next ./apps/web/.next
COPY --from=installer --chown=app:app /creatorhub/apps/web/public ./apps/web/public
COPY --from=installer --chown=app:app /creatorhub/apps/web/locales ./apps/web/locales

COPY --from=installer --chown=app:app /creatorhub/node_modules/ ./node_modules/
RUN rm -rf ./node_modules/@creatorhub/
RUN rm -rf 

CMD yarn workspace web run start

