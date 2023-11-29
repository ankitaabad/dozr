package db

import (
	"backend/models"
	"context"
	"github.com/jackc/pgx/v5"
)

//	func BuyStocks(input models.StocksBuy){
//		conn := GetDbConn()
//		conn.Exec()
//	}
type DbConn struct {
	conn *pgx.Conn
}

func (c *DbConn) AddMoney(input models.AddMoney) error {
	_, err := c.conn.Exec(context.Background(), "UPDATE customers SET balance=balance+$1 where customer_id = $2;", input.Amount, input.CustomerId)
	return err
}
