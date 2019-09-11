FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app/

# npm install
RUN apt-get update && apt-get install mysql-client --yes --force-yes && npm install
# Run npm install --global grpc --unsafe-perm

EXPOSE 3000 9229
CMD [ "npm", "run", "debug" ]