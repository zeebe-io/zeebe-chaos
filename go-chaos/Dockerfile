# syntax=docker/dockerfile:1.4
FROM golang:alpine as builder

WORKDIR /app 

COPY --link go.mod go.sum .
RUN go mod download

COPY --link cmd/ ./cmd
COPY --link internal ./internal
COPY --link main.go ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o zbchaos main.go

FROM scratch

WORKDIR /app

COPY --from=builder /app/zbchaos /usr/local/bin/

ENTRYPOINT ["zbchaos"]
CMD ["worker"]
