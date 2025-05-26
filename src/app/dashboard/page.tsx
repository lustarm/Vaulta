import { redirect } from "next/navigation"

import { CreditCard, ArrowUpRight, ArrowDownLeft, Plus, Send, Receipt, PiggyBank, TrendingUp } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { DashboardHeader } from "~/components/dashboard-header"

import { checkAuthenticated } from "../actions/auth"
import { getUser } from "../actions/data"

export default async function DashboardPage() {

  const isAuthenticated = await checkAuthenticated()

  if (!isAuthenticated) {
    redirect("/login")
  }

  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  // Mock account data
  const accounts = [
    {
      id: 1,
      name: "Checking Account",
      type: "checking",
      balance: 2847.32,
      accountNumber: "****1234",
    },
    {
      id: 2,
      name: "Savings Account",
      type: "savings",
      balance: 15420.89,
      accountNumber: "****5678",
    },
    {
      id: 3,
      name: "Credit Card",
      type: "credit",
      balance: -1250.45,
      accountNumber: "****9012",
    },
  ]

  // Mock transaction data
  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Store",
      amount: -89.32,
      date: "2025-01-25",
      category: "Food & Dining",
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3200.0,
      date: "2025-01-24",
      category: "Income",
    },
    {
      id: 3,
      description: "Electric Bill",
      amount: -125.67,
      date: "2025-01-23",
      category: "Utilities",
    },
    {
      id: 4,
      description: "Coffee Shop",
      amount: -4.5,
      date: "2025-01-23",
      category: "Food & Dining",
    },
    {
      id: 5,
      description: "Online Transfer",
      amount: -500.0,
      date: "2025-01-22",
      category: "Transfer",
    },
  ]

  const totalBalance = accounts.reduce((sum, account) => {
    return account.type === "credit" ? sum + account.balance : sum + account.balance
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.email}!</h1>
          <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening with your accounts today.</p>
        </div>

        {/* Account Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-teal-100">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-teal-100 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$1,847.32</div>
              <p className="text-xs text-gray-500 mt-1">$153 less than last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Savings Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">68%</div>
              <p className="text-xs text-gray-500 mt-1">$6,800 of $10,000 goal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">742</div>
              <p className="text-xs text-green-600 mt-1">Excellent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Accounts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Accounts
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${account.type === "checking"
                            ? "bg-blue-100"
                            : account.type === "savings"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                      >
                        <CreditCard
                          className={`h-5 w-5 ${account.type === "checking"
                              ? "text-blue-600"
                              : account.type === "savings"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{account.name}</h3>
                        <p className="text-sm text-gray-500">{account.accountNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${account.balance >= 0 ? "text-gray-900" : "text-red-600"}`}>
                        ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                      <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Transactions
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${transaction.amount > 0 ? "bg-green-100" : "bg-gray-100"}`}>
                          {transaction.amount > 0 ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.category} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-teal-600 hover:bg-teal-700">
                  <Send className="h-4 w-4 mr-2" />
                  Transfer Money
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Pay Bills
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PiggyBank className="h-4 w-4 mr-2" />
                  Open Savings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Apply for Credit
                </Button>
              </CardContent>
            </Card>

            {/* Financial Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <h4 className="font-medium text-teal-900 mb-1">Save More This Month</h4>
                    <p className="text-sm text-teal-700">
                      You&lsquo;re spending 15% less on dining out compared to last month. Keep it up!
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View More Tips
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">All accounts secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">2FA enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Recent login: Today</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
