# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./am-ui /usr/local/app/
COPY ./webcomponents/ /usr/local/webcomponents/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/marketplace-ui /usr/share/nginx/html
COPY ./am-ui/src/cert.pem /usr/share/nginx/cert.pem
COPY ./am-ui/src/cert.key /usr/share/nginx/cert.key
COPY ./am-ui/nginx.conf /etc/nginx/nginx.conf
# Expose port 80
EXPOSE 80
