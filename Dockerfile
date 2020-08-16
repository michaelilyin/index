FROM node:12 AS build-client
WORKDIR /opt/index

ADD ./* ./
ADD ./src ./src

RUN npm set progress=false && npm config set depth 0
RUN npm install
RUN npm run build

FROM node:12 AS build-server
WORKDIR /opt/index

ADD ./server/* ./

RUN npm set progress=false && npm config set depth 0
RUN npm install
RUN npm run build

FROM node:12
WORKDIR /opt/index
COPY --from=build-client /opt/index/dist ./public
COPY --from=build-server /opt/index/node_modules ./node_modules
COPY --from=build-server /opt/index/src/*.js ./

EXPOSE 4000
CMD node .
