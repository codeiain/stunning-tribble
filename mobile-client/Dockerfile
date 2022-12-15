FROM node:latest
WORKDIR /app
COPY . /app/

RUN npm install -g @ionic/cli
RUN npm install

EXPOSE 4000

CMD ["ionic", "serve"]
