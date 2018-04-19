FROM node:8.9.3-alpine

EXPOSE 3000

# Create directory for the app
RUN mkdir -p src

# Set a working directory
WORKDIR /src

# Copy application files
ADD . /src

# Run the container under "node" user by default
USER node

CMD ["yarn", "run", "start:prod"]
