# Dockerfile with 2 steps : one building
# The last one is the one that we will use

## Deps
FROM node:current-alpine AS build
COPY . /tmp
RUN cd /tmp && yarn install && yarn build && rm -rf src

## Bin
FROM node:current-alpine
RUN mkdir -p /usr/bin
COPY --from=build /tmp /usr/bin
WORKDIR /usr/bin
CMD ["yarn","start"]
