package main

import (
	"backend/db"
	"backend/dozer/generated/mutual_funds"
	"backend/dozer/generated/recent_transactions"
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

type res struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func main() {

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	env := os.Environ()

	fmt.Println(env)
	//e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	//	AllowOrigins: []string{"*"},
	//	AllowHeaders: []string{"*"},
	//}))
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

	e.PUT("/stocks/:stock_id/buy", func(c echo.Context) error {

		fmt.Println("buying stocks", c.Param("stock_id"))
		conn := db.GetDbConn()
		var stocksBuy models.BuyStocksModel
		if err := c.Bind(&stocksBuy); err != nil {
			return echo.ErrBadRequest
		}
		fmt.Println(stocksBuy)
		err := conn.BuyStocks(stocksBuy)
		if err != nil {
			return err
		}

		return c.JSON(200, stocksBuy)

	})

	e.PUT("/stocks/:stock_id/sell", func(c echo.Context) error {

		fmt.Println("buying stocks", c.Param("stock_id"))
		conn := db.GetDbConn()
		var stocksSell models.SellStocksModel
		if err := c.Bind(&stocksSell); err != nil {
			return echo.ErrBadRequest
		}
		fmt.Println(stocksSell)
		err := conn.SellStocks(stocksSell)
		if err != nil {
			return err
		}

		return c.JSON(200, stocksSell)

	})

	e.PUT("/customers/:customer_id/addMoney", func(c echo.Context) error {

		log.Println("adding money to customer")
		var addMoney models.AddMoneyModel
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
