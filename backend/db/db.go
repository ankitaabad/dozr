package db

import (
	"context"
	"github.com/jackc/pgx/v5"
)

var connection DbConn

func init() {
	conn, _ := pgx.Connect(context.Background(), "postgres://postgres:pgpass@68.183.85.136:5689/postgres")
	connection = DbConn{
		conn: conn,
	}

}
func GetDbConn() DbConn {
	return connection
}
func Close() {
	connection.conn.Close(context.Background())
}
