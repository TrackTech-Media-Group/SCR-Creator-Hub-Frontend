FROM node:19-alpine as builder
WORKDIR /creatorhub

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:19-alpine as installer
WORKDIR /creatorhub

# Install dependencies and build app
COPY --from=builder /creatorhub/out/json/ .
COPY --from=builder /creatorhub/out/yarn.lock ./yarn.lock
RUN yarn install --immutable

# Build the project
COPY --from=builder /creatorhub/out/full/ .
RUN yarn turbo run build --filter=web
RUN yarn build

FROM node:19-alpine as runner
WORKDIR /creatorhub

# Create user PaperPlane
RUN addgroup --system --gid 3951 creatorhub
RUN adduser --system --uid 3951 creatorhub

# Copy build files
COPY --from=installer --chown=creatorhub:creatorhub /creatorhub/apps/web/next.config.js .
COPY --from=installer --chown=creatorhub:creatorhub /creatorhub/apps/web/package.json .

COPY --from=installer --chown=creatorhub:creatorhub /creatorhub/apps/web/.next/ ./apps/web/.next/
COPY --from=installer --chown=creatorhub:creatorhub /creatorhub/apps/web/public ./apps/web/public

COPY package.json --chown=creatorhub:creatorhub ./package.json

USER creatorhub

# Run NodeJS script
CMD ["yarn", "run", "start"]
