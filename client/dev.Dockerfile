FROM node:16

WORKDIR /usr/src/app

COPY . .

CMD ["npm", "start"]