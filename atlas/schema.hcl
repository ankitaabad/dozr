table "customers" {
  schema = schema.public
  column "customerid" {
    type = integer
  }
  column "firstname" {
    null = true
    type = character_varying(50)
  }
  column "lastname" {
    null = true
    type = character_varying(50)
  }
  column "dateofbirth" {
    null = true
    type = character_varying(50)
  }
  column "gender" {
    null = true
    type = character_varying(50)
  }
  column "address" {
    null = true
    type = character_varying(64)
  }
  column "email" {
    null = true
    type = character_varying(50)
  }
  column "phone" {
    null = true
    type = character_varying(50)
  }
  column "uid" {
    null = true
    type = character_varying(50)
  }
  primary_key {
    columns = [column.customerid]
  }

}
table "accounts" {
  schema = schema.public
  column "accountid" {
    type = character_varying(50)
  }
  column "customerid" {
    null = true
    type = integer
  }
  column "accounttype" {
    null = true
    type = character_varying(50)
  }
  column "accountbalance" {
    null = true
    type = integer
  }
  column "accountstatus" {
    null = true
    type = character_varying(50)
  }
  column "interestrate" {
    null = true
    type = real
  }
  column "openingdate" {
    null = true
    type = character_varying(50)
  }
  column "lasttransactiondate" {
    null = true
    type = character_varying(50)
  }
    primary_key {
    columns = [column.accountid]
  }
  foreign_key "account_customer" {
    columns     = [column.customerid]
    ref_columns = [table.customers.column.customerid]
  }
}

table "fixed_deposits" {
  schema = schema.public
  column "fixeddepositid" {
    type = integer
  }
  primary_key {
    columns = [column.fixeddepositid]
  }
  column "investmentaccountid" {
    type = character_varying(50)
  }
  foreign_key "account_customer" {
    columns     = [column.investmentaccountid]
    ref_columns = [table.investment_accounts.column.investmentaccountid]
  }
  column "principalamount" {
    null = true
    type = integer
  }
  column "interestrate" {
    null = true
    type = real
  }
  column "maturitydate" {
    null = true
    type = character_varying(50)
  }
  column "interestpaymentfrequency" {
    null = true
    type = character_varying(50)
  }
  column "maturityamount" {
    null = true
    type = integer
  }
}
table "investment_accounts" {
  schema = schema.public
  column "investmentaccountid" {
    type = character_varying(50)
  }
  primary_key {
    columns = [column.investmentaccountid]
  }
  column "customerid" {
    null = true
    type = integer
  }
  foreign_key "investment_customer" {
    columns     = [column.customerid]
    ref_columns = [table.customers.column.customerid]
  }
  column "accounttype" {
    null = true
    type = character_varying(50)
  }
  column "investmentstatus" {
    null = true
    type = character_varying(50)
  }
  column "investmentstartdate" {
    null = true
    type = character_varying(50)
  }
  column "investmentenddate" {
    null = true
    type = character_varying(50)
  }
  column "RETURNS" {
    null = true
    type = real
  }
  column "investmentportfolio" {
    null = true
    type = integer
  }
}
table "loans" {
  schema = schema.public
  column "loanid" {
    type = character_varying(50)
  }
   primary_key {
    columns = [column.loanid]
  }
  column "customerid" {
    null = true
    type = integer
  }
  foreign_key "loan_customer" {
    columns     = [column.customerid]
    ref_columns = [table.customers.column.customerid]
  }
  column "loantype" {
    null = true
    type = character_varying(50)
  }
  column "loanamount" {
    null = true
    type = integer
  }
  column "interestrate" {
    null = true
    type = real
  }
  column "loanstatus" {
    null = true
    type = character_varying(50)
  }
  column "emi" {
    null = true
    type = integer
  }
  column "loanterm" {
    null = true
    type = integer
  }
  column "disbursementdate" {
    null = true
    type = character_varying(50)
  }
  column "repaymentschedule" {
    null = true
    type = character_varying(50)
  }
}
table "mutual_funds" {
  schema = schema.public
  column "mutualfundid" {
    type = integer
  }
   primary_key {
    columns = [column.mutualfundid]
  }
  column "fundname" {
    null = true
    type = character_varying(50)
  }
  column "fundmanager" {
    null = true
    type = character_varying(50)
  }
  column "fundtype" {
    null = true
    type = character_varying(50)
  }
  column "nav" {
    null = true
    type = real
  }
  column "investmentamount" {
    null = true
    type = integer
  }
  column "investmentdate" {
    null = true
    type = character_varying(50)
  }
  column "investmentaccountid" {
    null = true
    type = character_varying(50)
  }
  foreign_key "mf_investment" {
    columns     = [column.investmentaccountid]
    ref_columns = [table.investment_accounts.column.investmentaccountid]
  }

}
table "stocks" {
  schema = schema.public
  column "stockid" {
    type = integer
  }
   primary_key {
    columns = [column.stockid]
  }
  column "stockname" {
    type = character_varying(50)
  }
  column "stocksymbol" {
    type = character_varying(50)
  }
  column "stockexchange" {
    type = character_varying(50)
  }
  column "purchaseprice" {
    type = integer
  }
  column "purchasedate" {
    type = character_varying(50)
  }
  column "quantity" {
    type = integer
  }
  column "investmentaccountid" {
    type = character_varying(50)
  }
  foreign_key "stocks_investment" {
    columns     = [column.investmentaccountid]
    ref_columns = [table.investment_accounts.column.investmentaccountid]
  }
}
table "transactions" {
  schema = schema.public
  column "transactionid" {
    type = integer
  }
  primary_key {
    columns = [column.transactionid]
  }
  column "accountid" {
    null = true
    type = character_varying(50)
  }
  foreign_key "transactions_account" {
    columns     = [column.accountid]
    ref_columns = [table.accounts.column.accountid]
  }
  column "transactiontype" {
    null = true
    type = character_varying(50)
  }
  column "amount" {
    null = true
    type = integer
  }
  column "transactiondate" {
    null = true
    type = character_varying(50)
  }
  column "transactionstatus" {
    null = true
    type = character_varying(50)
  }
}
schema "public" {
  comment = "standard public schema"
}
