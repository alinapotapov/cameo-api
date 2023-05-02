FROM node:18.13 as build-stage
WORKDIR /app

COPY package*json ./

COPY ./.env.production .
RUN npm install
COPY . .
RUN npx vite build

FROM nginx:1.23.3-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

COPY ./run.sh /run.sh
RUN chmod +x /run.sh
ENTRYPOINT ["/run.sh"]

