FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY --chown=node:node . /usr/src/app/
COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]