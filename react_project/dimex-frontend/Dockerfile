# Stage 1: Build the React application
FROM node:21-alpine as build 

# Set the working directory in the container
WORKDIR /app 

# Copy package.json and package-lock.json (if present) first to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the application
RUN npm run build 

# Stage 2: Serve the built React application using NGINX
FROM nginx:alpine

# Copy the build output from the build stage to NGINX's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Add a custom nginx.conf to handle routing 
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
