# Specifies a parent image
FROM golang:1.21.2-bullseye as build
WORKDIR /buildcron
COPY . .
RUN go mod download
RUN go build -o /main main.go
 
FROM hectormolinero/supercronic:latest
WORKDIR /cron
COPY --from=build /main /cron/main
COPY /ctab /cron/ctab
EXPOSE 8000 
# USER nonroot:nonroot
ENTRYPOINT [ "supercronic" ]
CMD  [  "ctab" ]
