FROM node:14.19
WORKDIR /
COPY ./ ./
WORKDIR /client
RUN npm i
RUN npm run build
WORKDIR /server
RUN npm run build
CMD [ "node","dist/main" ]
EXPOSE 3000