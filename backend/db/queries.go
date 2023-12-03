package db

import (
	"backend/models"
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/segmentio/ksuid"
	"time"
)

//	func BuyStocks(input models.BuyStocksModel){
//		conn := GetDbConn()
//		conn.Exec()
//	}
type DbConn struct {
	pool *pgxpool.Pool
}

func (c *DbConn) AddMoney(input models.AddMoneyModel) error {
	transactionId := ksuid.New() // a time sorted uuid
	todayIso := time.Now().Format(time.RFC3339)

	fmt.Println(transactionId)

	_, err := c.pool.Exec(context.Background(), "with cb as (update customers  set balance = balance + $1 where customer_id = $2)\nINSERT INTO transactions (id, amount,date, customer_id, \"desc\") VALUES($3, $1, $4,$2, 'Money credited to Account');", input.Amount, input.CustomerId, transactionId, todayIso)
	return err
}

func (c *DbConn) BuyStocks(input models.BuyStocksModel) error {
	//ctx := context.Background()

	today := time.Now().Format("2006-01-02") // today date to sql date
	todayIso := time.Now().Format(time.RFC3339)
	transactionId := ksuid.New() // a time sorted uuid
	stockBuyId := ksuid.New()

	desc := fmt.Sprintf("Bought %d stocks of %s ", input.Quantity, input.CompanyName)

	/*
		1 stockid
		2 date
		3 customerid
		4 quantity
		5 transaction identity
		6 desc
		7 stockbuyid
	*/
	/* customer buys 100 stocks of tata worth 50rs then we need  50*100 = 5000 in balance to complete this transaction, chech if customer have enough balance, if enough balance then deduct the balance, make an entry in transactions table to show recent transactions, add an entry in customr_stocks if he already had stocks of tata then we average out stocks price and add to quantity, also make an entry in stocks_buy table that we use for tax calculation purpose. */
	result, err := c.pool.Exec(context.Background(), "with sp as ( select price from stocks_daily_price sdp where sdp.stock_id = $1 and date = $2),\nbalance as ( select (select balance from customers where customer_id = $3) > sp.price* $4 as enough_balance, sp.price*$4 as amount,price from sp),\ncu as (update customers set balance = balance - sp.price*$4 from sp where customer_id = $3 and (select enough_balance from balance) = true),\nit as (INSERT INTO transactions (id, amount, \"date\", customer_id, \"desc\") select $5, amount, $8, $3, $6 from balance where enough_balance = true),\nisbuy as (INSERT INTO stocks_buy (id, stock_id, quantity, buy_date, price, remaining_quantity,customer_id) select $7, $1, $4, $2, price, $4,$3 from balance where enough_balance = true)\nINSERT INTO customer_stocks as cs (customer_id, stock_id, quantity, avg_price) select $3, $1, $4, price from balance where enough_balance = true ON CONFLICT (customer_id,stock_id) DO update set quantity = cs.quantity + $4, avg_price = (cs.quantity*cs.avg_price + $4* (select price from balance))/(cs.quantity+ $4) where cs.stock_id = $1 and cs.customer_id= $3 and (select enough_balance from balance) = true;", input.StockId, today, input.CustomerId, input.Quantity, transactionId, desc, stockBuyId, todayIso)
	fmt.Println("printing result ", result)

	return err

}

func (c *DbConn) SellStocks(input models.SellStocksModel) error {
	//ctx := context.Background()

	today := time.Now().Format("2006-01-02")
	todayIso := time.Now().Format(time.RFC3339)

	transactionId := ksuid.New()
	stockSellId := ksuid.New()

	desc := fmt.Sprintf("Sold %d stocks of %s ", input.Quantity, input.CompanyName)

	/*
		1 stockid
		2 date
		3 customerid
		4 quantity
		5 transaction identity
		6 desc
		7 stockbuyid
	*/
	result, err := c.pool.Exec(context.Background(), "with sp as ( select price from stocks_daily_price sdp where sdp.stock_id = $1 and date = $2),\nstock_balance as (select  *,cs.quantity - $4 >= 0 as enough_stock,(select price from sp) as selling_price from customer_stocks cs where cs.stock_id = $1 and customer_id =$3 ),\nup as (update customers c set balance = c.balance + $4* selling_price from stock_balance where c.customer_id = $3 and  enough_stock  = true),\nit as (INSERT INTO transactions (id, amount, \"date\", customer_id, \"desc\") select $5, $4*selling_price,$8, $3, $6   from stock_balance where enough_stock = true),\niss as (INSERT INTO stocks_sell (id, stock_id, \"date\", quantity, price, customer_id) select $7, stock_id, $2, $4, selling_price, $3 from stock_balance where enough_stock = true)\nupdate customer_stocks cs set quantity = cs.quantity - $4 from stock_balance where enough_stock = true and cs.customer_id = $3 and cs.stock_id = $1;", input.StockId, today, input.CustomerId, input.Quantity, transactionId, desc, stockSellId,todayIso)
	fmt.Println("printing result ", result)

	return err

}
