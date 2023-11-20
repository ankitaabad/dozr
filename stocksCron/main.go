package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	fmt.Println("Running the cron ")
	var client = &http.Client{
		Timeout: 10 * time.Second,
	}
	healthChecksBaseURL := os.Getenv("healthChecksBaseURL")
	fmt.Println("hc base url", healthChecksBaseURL)
	_, err := client.Head(healthChecksBaseURL)
	if err != nil {
		fmt.Printf("%s", err)
	}
}
