package models

// request inputs

type StocksBuy struct {
	StockId  string  `param:"stock_id"`
	Quantity int     `json:"quantity`
	Price    float32 `json:"price"`
}

type AddMoney struct {
	CustomerId string `param:"customer_id"`
	Amount     int32  `json:"amount"`
}

type Msg struct {
	Message string `json:"message"`
}
