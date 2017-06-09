FROM node:8

ADD ./ /home/app/fancy-404

WORKDIR /home/app/fancy-404
RUN npm install

ENTRYPOINT ["npm", "start"]
