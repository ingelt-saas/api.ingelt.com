FROM node:20

WORKDIR /

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]