package main

import (
	"backend/db"
	"backend/dozer/generated/mutual_funds"
	"backend/dozer/generated/recent_transactions"
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type res struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func main() {
	e := echo.New()
	env := os.Environ()
	fmt.Println(env)
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"*"},
	}))
	e.GET("/", func(c echo.Context) error {
		fmt.Println("inside the req")
		var conn *grpc.ClientConn
		conn, err := grpc.Dial("host.docker.internal:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			log.Fatal("could not connect")

		}
		log.Print(conn)
		// defer conn.Close()
		cc := mutual_funds.NewMutualFundsClient(conn)

		qr := mutual_funds.QueryMutualFundsRequest{}
		res, err := cc.Query(context.Background(), &qr)
		if err != nil {
			log.Printf("response %s", res)
			log.Printf("error while querying %s", err)
			return c.String(200, strings.Join(env, ","))
		}
		return c.JSON(200, res.GetRecords())
	})

	e.GET("/dashboard/manager", func(c echo.Context) error {
		fmt.Println("inside the req")
		var conn *grpc.ClientConn
		conn, err := grpc.Dial("host.docker.internal:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			log.Fatal("could not connect")

		}
		log.Print(conn)
		// defer conn.Close()
		cc := mutual_funds.NewMutualFundsClient(conn)

		qr := mutual_funds.QueryMutualFundsRequest{}
		res, err := cc.Query(context.Background(), &qr)
		if err != nil {
			log.Printf("response %s", res)
			log.Printf("error while querying %s", err)
			return c.String(200, strings.Join(env, ","))
		}
		return c.JSON(200, res.GetRecords())

	})

	e.POST("/stocks/:stock_id/buy", func(c echo.Context) error {

		conn, err := pgx.Connect(context.Background(), "postgres://postgres:pgpass@68.183.85.136:5689/postgres")
		if err != nil {
			fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
			os.Exit(1)
		}
		defer conn.Close(context.Background())

		fmt.Println("buying stocks")
		var stocksBuy models.StocksBuy
		if err := c.Bind(&stocksBuy); err != nil {
			return echo.ErrBadRequest
		}
		amount := stocksBuy.Price * float32(stocksBuy.Quantity)
		x, y := conn.Exec(context.Background(), "INSERT INTO transactions (id, amount, \"date\", customer_id, \"desc\") VALUES($1, $2, $3, $4, $5)", "1238", amount, "2023-11-26", 1001, "this is test")
		fmt.Println(x)
		fmt.Println("err", y)
		return c.JSON(200, stocksBuy)

	})

	e.PUT("/customers/:customer_id/addMoney", func(c echo.Context) error {

		log.Println("adding money to customer")
		var addMoney models.AddMoney
		if err := c.Bind(&addMoney); err != nil {
			return echo.ErrBadRequest
		}
		connStr := db.GetDbConn()
		if e := connStr.AddMoney(addMoney); e != nil {
			return echo.ErrBadRequest
		}

		return c.JSON(http.StatusOK, models.Msg{"Added Money"})

	})

	e.GET("/dashboard/customer/:customerId", func(c echo.Context) error {
		fmt.Println("inside the req")
		customerId, _ := strconv.Atoi(c.Param("customerId"))
		fmt.Println(customerId)
		var conn *grpc.ClientConn
		conn, err := grpc.Dial("host.docker.internal:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			log.Fatal("could not connect")

		}
		log.Print(conn)
		// defer conn.Close()
		cc := recent_transactions.NewRecentTransactionsClient(conn)
		query := map[string]interface{}{
			"$filter": map[string]int{"customerid": customerId},
			"$limit":  10,
		}
		out, _ := json.Marshal(query)
		outStr := string(out)
		qr := recent_transactions.QueryRecentTransactionsRequest{
			Query: &outStr,
		}
		res, err := cc.Query(context.Background(), &qr)

		if err != nil {
			log.Printf("response %s", res)
			log.Printf("error while querying %s", err)
			return c.String(200, strings.Join(env, ","))
		}
		return c.JSON(200, res.GetRecords())

	})

	e.Start(":2345")
}
