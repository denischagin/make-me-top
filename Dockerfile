FROM mhart/alpine-node:latest

WORKDIR /app/

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY tsconfig.json /app/
COPY tsconfig.paths.json /app/
COPY craco.config.js /app/
COPY .env /app/
#COPY build/ /app/build

EXPOSE 3000

RUN npm install

#RUN npm run build

#RUN npm install -g serve

CMD ["npm", "start"]




