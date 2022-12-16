# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts as build
RUN apt-get update && apt-get install -y openjdk-11-jdk

# Set the working directory
WORKDIR /usr/local/app/am-ui

# copy only package, package-lock files and api-yaml and install dependencies for caching purposes
COPY ./am-ui/package.json ./
COPY ./am-ui/package-lock.json ./
COPY ./am-ui/build_scripts ./build_scripts/
COPY ./am-ui/webcomponents/build_scripts ./webcomponents/build_scripts/
COPY ./am-ui/webcomponents/package.json ./webcomponents/
COPY ./am-ui/webcomponents/package-lock.json ./webcomponents/
COPY ./am-ui/webcomponents/create-ad-webcomponent/package.json ./webcomponents/create-ad-webcomponent/
COPY ./am-ui/webcomponents/create-ad-webcomponent/package-lock.json ./webcomponents/create-ad-webcomponent/
COPY ./am-ui/webcomponents/search-results-webcomponent/package.json ./webcomponents/search-results-webcomponent/
COPY ./am-ui/webcomponents/search-results-webcomponent/package-lock.json ./webcomponents/search-results-webcomponent/
COPY ./am-ui/webcomponents/search-webcomponent/package.json ./webcomponents/search-webcomponent/
COPY ./am-ui/webcomponents/search-webcomponent/package-lock.json ./webcomponents/search-webcomponent/


# Add the source code to app
COPY ./api.yaml /usr/local/app/
COPY ./am-ui ./

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build:prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest AS deploy

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/am-ui/dist/marketplace-ui /usr/share/nginx/html
COPY ./am-ui/src/cert.pem /usr/share/nginx/cert.pem
COPY ./am-ui/src/cert.key /usr/share/nginx/cert.key

COPY ./am-ui/nginx/nginx.env.conf /etc/nginx/nginx.env.conf
COPY ./am-ui/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT [ "entrypoint.sh" ]
