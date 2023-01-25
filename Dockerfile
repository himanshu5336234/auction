FROM node:18.0.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#nginx.conf will need to be adapted for non-root user for running container as non-root.
#RUN addgroup -g 1001 density && adduser -D -G density -u 1001 density
#USER 1001
CMD ["nginx", "-g", "daemon off;"]
