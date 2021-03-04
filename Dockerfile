FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm ci

# Bundle app source
COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]