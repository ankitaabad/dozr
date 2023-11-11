# Specifies a parent image
FROM golang:1.21.2-bullseye
 
# Creates an app directory to hold your app’s source code
WORKDIR /echo
 
# Copies everything from your root directory into /app
COPY . .
 
# Installs Go dependencies
RUN go mod download
 
# Builds your app with optional configuration
RUN go build -o main
 
# Tells Docker which network port your container listens on
 
# Specifies the executable command that runs when the container starts
ENTRYPOINT [ "./main" ]
# CMD [ “./main” ]
EXPOSE 2345
