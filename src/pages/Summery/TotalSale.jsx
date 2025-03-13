"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  LineChart,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  DollarSign,
  ShoppingBag,
  Percent,
  MapPin,
  BarChart3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export default function TotalSalesPage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [loading, setLoading] = useState(true)
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    salesGrowth: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    totalOrders: 0,
    salesByCategory: [],
    salesByPaymentMethod: [],
    topSellingProducts: [],
    salesByRegion: [],
    recentTransactions: [],
    dailySales: [],
  })

  // Simulate data loading
  useEffect(() => {
    setLoading(true)
    // This would be replaced with an actual API call
    setTimeout(() => {
      const data = {
        totalSales: 124500,
        salesGrowth: 12.5,
        averageOrderValue: 85.68,
        conversionRate: 3.2,
        totalOrders: 1453,
        salesByCategory: [
          { name: "Electronics", value: 42500 },
          { name: "Clothing", value: 35200 },
          { name: "Home", value: 28400 },
          { name: "Books", value: 18400 },
        ],
        salesByPaymentMethod: [
          { method: "Credit Card", value: 75300 },
          { method: "PayPal", value: 32400 },
          { method: "Bank Transfer", value: 12500 },
          { method: "Other", value: 4300 },
        ],
        topSellingProducts: [
          { id: 1, name: "Wireless Headphones", sales: 245, revenue: 12250, growth: 15.2 },
          { id: 2, name: "Smart Watch", sales: 189, revenue: 9450, growth: 8.7 },
          { id: 3, name: "Laptop Sleeve", sales: 156, revenue: 3900, growth: -2.3 },
          { id: 4, name: "Phone Case", sales: 142, revenue: 2840, growth: 5.6 },
          { id: 5, name: "Bluetooth Speaker", sales: 128, revenue: 6400, growth: 12.1 },
        ],
        salesByRegion: [
          { region: "North America", value: 68500 },
          { region: "Europe", value: 32400 },
          { region: "Asia", value: 15600 },
          { region: "Other", value: 8000 },
        ],
        recentTransactions: [
          { id: "ORD-3245", customer: "John Smith", date: "2023-06-15", amount: 120.5, status: "completed", items: 3 },
          { id: "ORD-3244", customer: "Emma Johnson", date: "2023-06-15", amount: 85.2, status: "completed", items: 2 },
          {
            id: "ORD-3243",
            customer: "Michael Brown",
            date: "2023-06-14",
            amount: 210.75,
            status: "completed",
            items: 4,
          },
          {
            id: "ORD-3242",
            customer: "Sophia Williams",
            date: "2023-06-14",
            amount: 45.99,
            status: "completed",
            items: 1,
          },
          {
            id: "ORD-3241",
            customer: "James Davis",
            date: "2023-06-14",
            amount: 150.25,
            status: "completed",
            items: 3,
          },
          {
            id: "ORD-3240",
            customer: "Olivia Miller",
            date: "2023-06-13",
            amount: 95.5,
            status: "completed",
            items: 2,
          },
          {
            id: "ORD-3239",
            customer: "Robert Wilson",
            date: "2023-06-13",
            amount: 65.75,
            status: "completed",
            items: 1,
          },
          { id: "ORD-3238", customer: "Ava Moore", date: "2023-06-12", amount: 175.25, status: "completed", items: 3 },
          {
            id: "ORD-3237",
            customer: "William Taylor",
            date: "2023-06-12",
            amount: 110.5,
            status: "completed",
            items: 2,
          },
          {
            id: "ORD-3236",
            customer: "Isabella Anderson",
            date: "2023-06-11",
            amount: 90.25,
            status: "completed",
            items: 2,
          },
        ],
        dailySales: [
          { date: "Jun 1", amount: 4250 },
          { date: "Jun 2", amount: 3800 },
          { date: "Jun 3", amount: 4100 },
          { date: "Jun 4", amount: 3950 },
          { date: "Jun 5", amount: 4300 },
          { date: "Jun 6", amount: 4500 },
          { date: "Jun 7", amount: 4200 },
          { date: "Jun 8", amount: 4600 },
          { date: "Jun 9", amount: 4750 },
          { date: "Jun 10", amount: 4400 },
          { date: "Jun 11", amount: 4850 },
          { date: "Jun 12", amount: 5000 },
          { date: "Jun 13", amount: 4900 },
          { date: "Jun 14", amount: 5100 },
          { date: "Jun 15", amount: 5200 },
        ],
      }
      setSalesData(data)
      setLoading(false)
    }, 1500)
  }, [timeRange])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Simple line chart component
  const SimpleLineChart = ({ data, color = "#8b5cf6" }) => {
    if (!data || data.length === 0) return null

    const amounts = data.map((item) => item.amount)
    const max = Math.max(...amounts)
    const min = Math.min(...amounts)
    const range = max - min

    // Create points for SVG path
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = range === 0 ? 50 : 100 - ((item.amount - min) / range) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="h-64 w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />

          {/* Area fill */}
          <path
            d={`M0,100 L0,${100 - ((data[0].amount - min) / range) * 100} ${points} L100,100 Z`}
            fill={`${color}20`}
          />

          {/* Line */}
          <polyline points={points} fill="none" stroke={color} strokeWidth="2" />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = range === 0 ? 50 : 100 - ((item.amount - min) / range) * 100
            return <circle key={index} cx={x} cy={y} r="1.5" fill={color} stroke="white" strokeWidth="1" />
          })}
        </svg>
      </div>
    )
  }

  // Simple bar chart for category breakdown
  const SimpleBarChart = ({ data, nameKey = "name", valueKey = "value", color = "#8b5cf6" }) => {
    if (!data || data.length === 0) return null

    const values = data.map((item) => item[valueKey])
    const max = Math.max(...values)

    return (
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = max === 0 ? 0 : (item[valueKey] / max) * 100
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{item[nameKey]}</span>
                <span className="text-gray-500 dark:text-gray-400">{formatCurrency(item[valueKey])}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Simple pie chart
  const SimplePieChart = ({ data, nameKey = "name", valueKey = "value" }) => {
    if (!data || data.length === 0) return null

    const total = data.reduce((sum, item) => sum + item[valueKey], 0)
    let currentAngle = 0

    const colors = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"]

    return (
      <div className="relative h-48 w-48 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item[valueKey] / total) * 100
            const angle = (percentage / 100) * 360

            // Calculate the SVG arc path
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle = endAngle

            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`,
            ].join(" ")

            return <path key={index} d={pathData} fill={colors[index % colors.length]} />
          })}

          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-gray-800 dark:text-white">{formatCurrency(total)}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Sales</span>
        </div>
      </div>
    )
  }

  // Time range options
  const timeRangeOptions = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "year", label: "This year" },
    { value: "custom", label: "Custom range" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Link to="/summery">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Total Sales</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>

            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Sales Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  {loading ? (
                    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    formatCurrency(salesData.totalSales)
                  )}
                </div>
                {!loading && (
                  <div
                    className={`flex items-center text-sm font-medium ${salesData.salesGrowth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {salesData.salesGrowth >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>{Math.abs(salesData.salesGrowth)}%</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">vs. previous period</p>
            </CardContent>
          </Card>

        

          {/* Total Orders Card */}
        <Link to='/summery/total-orders'>
        <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  {loading ? (
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    salesData.totalOrders.toLocaleString()
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ShoppingBag className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed orders</p>
              </div>
            </CardContent>
          </Card></Link>
        </div>


        {/* Sales Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Revenue breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <SimpleBarChart data={salesData.salesByCategory} color="#8b5cf6" />
              )}
            </CardContent>
          </Card>

          {/* Sales by Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Payment</CardTitle>
              <CardDescription>Revenue breakdown by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              ) : (
                <div className="space-y-6">
                  <SimplePieChart data={salesData.salesByPaymentMethod} nameKey="method" />
                  <div className="grid grid-cols-2 gap-2">
                    {salesData.salesByPaymentMethod.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][index % 4],
                          }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Top Selling Products */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Products with the highest sales volume</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Link to='/all-products'>View All Products</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Units Sold</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.topSellingProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                        <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-flex items-center ${product.growth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                          >
                            {product.growth >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(product.growth)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest sales transactions</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input type="search" placeholder="Search transactions..." className="pl-8 w-full md:w-[250px]" />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.items}</TableCell>
                        <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800"
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Download invoice</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Contact customer</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <strong>1-10</strong> of <strong>45</strong> transactions
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                4
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                5
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

