with sp as ( select price from stocks_daily_price sdp where sdp.stock_id = $1 and date = $2),
stock_balance as (select  *,cs.quantity - $4 >= 0 as enough_stock,(select price from sp) as selling_price from customer_stocks cs where cs.stock_id = $1 and customer_id =$3 ),
up as (update customers c set balance = c.balance + $4* selling_price from stock_balance where c.customer_id = $3 and  enough_stock  = true),
it as (INSERT INTO transactions (id, amount, "date", customer_id, "desc") select $5, $4*selling_price,$2, $3, $6   from stock_balance where enough_stock = true),
iss as (INSERT INTO stocks_sell (id, stock_id, "date", quantity, price, customer_id) select $7, stock_id, $2, $4, selling_price, $3 from stock_balance where enough_stock = true)
update customer_stocks cs set quantity = cs.quantity - $4 from stock_balance where enough_stock = true and cs.customer_id = $3 and cs.stock_id = $1
