package models

import "time"

// Predefined users
var Users = []User{
	{
		ID:        1,
		Email:     "test@test.com",
		Password:  "test",
		FirstName: "John",
		LastName:  "Doe",
		Balance:   1000,
		Accounts: []Account{
			{
				ID:               1,
				AccountNumber:    "1234567890",
				AccountType:      "Checking",
				AccountStatus:    "Active",
				AccountCreatedAt: time.Now(),
				AccountUpdatedAt: time.Now(),
				AccountBalance:   1000,
			},
		},
	},
}
