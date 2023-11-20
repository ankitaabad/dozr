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
fmt.Println("env uuid",os.Getenv("healthchecks_uuid"))
	_, err := client.Head("http://cron-monitor.68.183.85.136.nip.io/ping/2a2491a1-87f2-4014-af1a-1f3bd63ca81c")
	if err != nil {
		fmt.Printf("%s", err)
	}
}
