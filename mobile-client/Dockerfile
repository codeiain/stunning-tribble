FROM node:latest
WORKDIR /app
COPY . /app/

RUN npm install -g @ionic/cli
RUN npm install

EXPOSE 8100

CMD ["ionic", "serve"]
