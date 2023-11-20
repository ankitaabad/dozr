# Specifies a parent image
FROM golang:1.21.2-bullseye as build
WORKDIR /buildcron
COPY ./stocksCron .
RUN go mod download
RUN go build -o /main main.go
 
FROM hectormolinero/supercronic:latest
WORKDIR /cron
COPY --from=build /main /cron/main
COPY /stocksCron/ctab /cron/ctab
ENV TZ=Asia/Kolkata
EXPOSE 8000 
# USER nonroot:nonroot
ENTRYPOINT [ "supercronic" ]
CMD  [  "-debug","ctab" ]
