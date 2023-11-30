package models

// request inputs

type BuyStocksModel struct {
	StockId     string `param:"stock_id"`
	CompanyName string `json:"company_name"`
	CustomerId  string `json:"customer_id"`
	Quantity    int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type SellStocksModel struct {
	StockId     string `param:"stock_id"`
	CompanyName string `json:"company_name"`
	CustomerId  string `json:"customer_id"`
	Quantity    int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type AddMoneyModel struct {
	CustomerId string `param:"customer_id"`
	Amount     int32  `json:"amount"`
}

type Msg struct {
	Message string `json:"message"`
}