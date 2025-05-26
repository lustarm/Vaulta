package models

import "time"

type Account struct {
	ID        int     `json:"id"`
	AccountNumber string `json:"account_number"`
	AccountType   string `json:"account_type"`
	AccountStatus string `json:"account_status"`
	AccountCreatedAt time.Time `json:"account_created_at"`
	AccountUpdatedAt time.Time `json:"account_updated_at"`
	AccountBalance float64 `json:"account_balance"`
}

type User struct {
	ID        int     `json:"id"`
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Balance   float64 `json:"balance"`
	Accounts  []Account `json:"accounts"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
