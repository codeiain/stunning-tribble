FROM node:latest
WORKDIR /app
COPY . /app/

RUN npm install -g @ionic/cli
RUN npm install

EXPOSE 8100

CMD ["ionic", "serve", "--external", "--ssl", "--host", "8100-codeiain-stunningtribbl-dmxpf1m7dh2.ws-eu79.gitpod.io"]
