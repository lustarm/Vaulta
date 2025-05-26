package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lustarm/vaulta/backend/modules/models"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.POST("/login", func(c *gin.Context) {
		var user models.User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// check if user exists
		for _, u := range models.Users {
			if u.Email == user.Email {
				c.JSON(400, gin.H{"error": "User not found"})
				return
			}
		}

		// check if password is correct
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(user.Password)); err != nil {
			c.JSON(400, gin.H{"error": "Invalid password"})
			return
		}

		// create a jwt token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		})

		// sign and get the complete encoded token as a string using the secret
		tokenString, err := token.SignedString([]byte("secret"))
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to create token"})
			return
		}

		c.JSON(200, gin.H{"token": tokenString})
		return
	})

	router.POST("/sigup", func(c *gin.Context) {
		var user models.User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// check if user already exists
		for _, u := range models.Users {
			if u.Email == user.Email {
				c.JSON(400, gin.H{"error": "User already exists"})
				return
			}
		}

		// hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to hash password"})
			return
		}
		user.Password = string(hashedPassword)

		// create account
		account := models.Account{
			ID: len(user.Accounts) + 1,
			// Generate a random account number
			// Max of 10 numbers
			AccountNumber:    fmt.Sprintf("%d", rand.Intn(10000000000)),
			AccountType:      "Checking",
			AccountStatus:    "Active",
			AccountCreatedAt: time.Now(),
			AccountUpdatedAt: time.Now(),
			AccountBalance:   0,
		}

		user.Accounts = append(user.Accounts, account)

		user.ID = len(models.Users) + 1
		user.CreatedAt = time.Now()
		user.UpdatedAt = time.Now()
		models.Users = append(models.Users, user)
		c.JSON(200, gin.H{"message": "User created successfully"})
		c.JSON(200, user)
	})

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	router.Run(":8080")
}
