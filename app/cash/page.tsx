"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Calendar,
  Filter,
  Download,
  BarChart,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CashPage() {
  // Sample transactions
  const transactions = [
    {
      id: 1,
      type: "income",
      description: "PC-03 Session",
      amount: 9.0,
      method: "cash",
      time: "16:05:32",
      cashier: "admin",
    },
    {
      id: 2,
      type: "income",
      description: "PS-02 Session",
      amount: 15.0,
      method: "card",
      time: "16:10:45",
      cashier: "admin",
    },
    {
      id: 3,
      type: "income",
      description: "Cafeteria Order #5",
      amount: 8.5,
      method: "cash",
      time: "16:15:20",
      cashier: "admin",
    },
    {
      id: 4,
      type: "expense",
      description: "Supplies Purchase",
      amount: 25.0,
      method: "card",
      time: "15:30:15",
      cashier: "admin",
    },
    {
      id: 5,
      type: "income",
      description: "Member Deposit",
      amount: 20.0,
      method: "cash",
      time: "15:45:10",
      cashier: "admin",
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cash Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.89</div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$352.50</div>
            <p className="text-xs text-muted-foreground">From 28 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75.00</div>
            <p className="text-xs text-muted-foreground">From 3 transactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="cash-in">Cash In</TabsTrigger>
          <TabsTrigger value="cash-out">Cash Out</TabsTrigger>
          <TabsTrigger value="reports">Cash Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search transactions..." className="w-64 pl-8" />
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Cashier</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>
                        {transaction.type === "income" ? (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <ArrowUpRight className="h-4 w-4" />
                            <span>Income</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <ArrowDownLeft className="h-4 w-4" />
                            <span>Expense</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {transaction.method === "cash" ? (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Cash</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            <span>Card</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{transaction.time}</TableCell>
                      <TableCell>{transaction.cashier}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Receipt className="h-4 w-4" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-in" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Enter description" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select defaultValue="cash">
                      <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Process Cash In</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      Member Deposit
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Session Payment
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Cafeteria Payment
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Other Income
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-out" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount-out">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="amount-out" type="number" placeholder="0.00" className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description-out">Description</Label>
                    <Input id="description-out" placeholder="Enter description" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method-out">Payment Method</Label>
                    <Select defaultValue="cash">
                      <SelectTrigger id="payment-method-out">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Process Cash Out</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      Supplies Purchase
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Utility Payment
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Refund
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Other Expense
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cash Flow</CardTitle>
                <Select defaultValue="week">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart className="h-10 w-10" />
                  <span>Cash Flow Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
