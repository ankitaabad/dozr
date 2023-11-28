package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"github.com/jackc/pgx/v5"

)

func main() {
	fmt.Println("Running the cron ")
	// var client = &http.Client{
	// 	Timeout: 10 * time.Second,
	// }
	// healthChecksBaseURL := os.Getenv("healthChecksBaseURL")
	// fmt.Println("hc base url", healthChecksBaseURL)
	// _, err := client.Head(healthChecksBaseURL)
	// if err != nil {
	// 	fmt.Printf("%s", err)
	// }
	fmt.Println(os.Getenv("database_url"))
	conn, err := pgx.Connect(context.Background(), os.Getenv("database_url"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var name string
	var weight int64
	err = conn.QueryRow(context.Background(), "select name, weight from widgets where id=$1", 42).Scan(&name, &weight)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(name, weight)
}
