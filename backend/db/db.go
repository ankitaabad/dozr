package db

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
)

var connection DbConn

func init() {

	conn, _ := pgxpool.New(context.Background(), "postgres://postgres:pgpass@68.183.85.136:5689/postgres")
	connection = DbConn{
		pool: conn,
	}

}
func GetDbConn() DbConn {
	return connection
}
func Close() {
	connection.pool.Close()
}
