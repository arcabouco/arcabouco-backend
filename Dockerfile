FROM node:alpine

WORKDIR /usr/arcabouco-back
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]