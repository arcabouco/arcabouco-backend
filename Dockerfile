FROM node:alpine

WORKDIR /usr/arcabouco-back
COPY . .

RUN npm install
RUN npm run build

EXPOSE ${PORT}

CMD npm rum prod