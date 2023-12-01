package main

import (
	"fmt"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/net/context"
	"os"
	"time"
)

func main() {
	fmt.Println("Running the cron ")
	//todaySqlDate := time.Now().Format("2006-01-02")
	//tomorrow := time.Now().AddDate(0, 0, 1)
	////tomorrowSQLDate := tomorrow.Format("2006-01-02")
	//aYearBeforeSqlDate := tomorrow.AddDate(-1, 0, 0).Format("2006-01-02")
	//fmt.Println(aYearBeforeSqlDate, todaySqlDate)
	// var client = &http.Client{
	// 	Timeout: 10 * time.Second,
	// }
	// healthChecksBaseURL := os.Getenv("healthChecksBaseURL")
	// fmt.Println("hc base url", healthChecksBaseURL)
	// _, err := client.Head(healthChecksBaseURL)
	// if err != nil {
	// 	fmt.Printf("%s", err)
	// }

	var StockId string
	var Price, YearBeforePrice int32
	fmt.Println(os.Getenv("database_url"))
	conn, err := pgxpool.New(context.Background(), "postgres://postgres:pgpass@68.183.85.136:5689/postgres")
	var today, tomorrow, ayearbefore pgtype.Date
	today.Time = time.Now()
	tomorrow.Time = time.Now().AddDate(0, 0, 1)
	ayearbefore.Time = time.Now().AddDate(-1, 0, 1)
	defer conn.Close()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	sql := fmt.Sprintf(`select * from "customers" where id = $1::int limit 1 `)
	r, _ := conn.Query(context.Background(), sql, 1001)
	defer r.Close()
	rows, err := conn.Query(context.Background(), "select stock_id,price , (select price from stocks_daily_price sdpp where date = $1 and stock_id = sdp.stock_id) as year_before_price from stocks_daily_price  sdp where date = $2 ", ayearbefore, today)
	fmt.Println(rows)
	defer rows.Close()
	if err != nil {
		fmt.Println(err)
	}

	// rows.Close is called by rows.Next when all rows are read
	// or an error occurs in Next or Scan. So it may optionally be
	// omitted if nothing in the rows.Next loop can panic. It is
	// safe to close rows multiple times.

	// Iterate through the result set
	for rows.Next() {
		err = rows.Scan(&StockId, &Price, &YearBeforePrice)
		fmt.Println(StockId, Price, YearBeforePrice)
		if err != nil {
		}
	}

	// Any errors encountered by rows.Next or rows.Scan will be returned here
	//if rows.Err() != nil {
	//
	//}

}
