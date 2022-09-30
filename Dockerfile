FROM node:alpine
WORKDIR /app

# Install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

# Copy folders
COPY . .

RUN npx prisma generate
# Run and expose the server on port 3000
EXPOSE 4000

# A command to start the server
CMD npm start
