FROM node:slim
 
WORKDIR /app
 
COPY ./node-cron/package.json package.json
COPY ./node-cron/package-lock.json package-lock.json
 
RUN npm install
 
COPY ./node-cron/* .
 
CMD [ "node", "cron.js" ]