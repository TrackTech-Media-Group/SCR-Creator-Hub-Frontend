FROM node:20-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /creatorhub

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

FROM node:20-alpine as installer
RUN apk add --no-cache libc6-compat
WORKDIR /creatorhub

# Install dependencies and build app
COPY --from=builder /creatorhub/out/json/ .
COPY --from=builder /creatorhub/out/yarn.lock ./yarn.lock
RUN yarn install --immutable

# Build the project
COPY --from=builder /creatorhub/out/full/ .
COPY tsconfig.json yarn.lock postcss.config.cjs tailwind.config.cjs ./
RUN yarn turbo run build --filter=web
RUN yarn build

FROM node:20-alpine as runner
RUN apk add --no-cache libc6-compat
WORKDIR /creatorhub

# Create user PaperPlane
RUN addgroup --system --gid 3951 creatorhub
RUN adduser --system --uid 3951 creatorhub

# Copy build files
COPY --from=installer --chown=creatorhub:creatorhub /creatorhub/ .
USER creatorhub

# Run NodeJS script
CMD ["yarn", "run", "start"]
