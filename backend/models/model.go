package models

// request inputs

type BuyStocksModel struct {
	StockId     string `param:"stock_id"`
	CompanyName string `json:"company_name"`
	CustomerId  int    `json:"customer_id"`
	Quantity    int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type SellStocksModel struct {
	StockId     string `param:"stock_id"`
	CompanyName string `json:"company_name"`
	CustomerId  int    `json:"customer_id"`
	Quantity    int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type SellMFModel struct {
	MFId       string `param:"mf_id"`
	FundName   string `json:"fund_name"`
	CustomerId int    `json:"customer_id"`
	Quantity   int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type BuyMFModel struct {
	MFId       string `param:"mf_id"`
	FundName   string `json:"fund_name"`
	CustomerId int    `json:"customer_id"`
	Quantity   int    `json:"quantity"`
	//Price       float32 `json:"price"`
}

type AddMoneyModel struct {
	CustomerId string `param:"customer_id"`
	Amount     int32  `json:"amount"`
}

type Msg struct {
	Message string `json:"message"`
}
