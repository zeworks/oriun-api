FROM node:alpine
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# Install dependencies
RUN npm install

# Generate prisma client
RUN npx prisma generate

# Migrate the tables
# RUN npx prisma migrate dev --name init

# Run and expose the server on port 5001
EXPOSE 4000

# A command to start the server
CMD npm run start:server
