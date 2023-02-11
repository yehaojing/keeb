FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --force

CMD ["npm", "start"]