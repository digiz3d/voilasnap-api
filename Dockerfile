# Dockerfile with 2 steps : one building
# The last one is the one that we will use

## Deps
FROM node:latest AS build
COPY . /tmp
RUN cd /tmp && yarn install
RUN cd /tmp && yarn build
# RUN cd /tmp && rm -rf src

## Bin
FROM build
RUN mkdir -p /usr/bin
COPY --from=build /tmp /usr/bin
WORKDIR /usr/bin
CMD ["yarn","start"]
