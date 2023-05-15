FROM node:18.12.1-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ENV NODE_OPTIONS=--max_old_space_size=8192
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.23-alpine
COPY --from=build-deps /usr/src/app/dist/admin /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

