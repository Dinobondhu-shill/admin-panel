import {
    DollarSign,
    ShoppingCart,
    Store,
    Users,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Filter,
    Package,
    BarChart3,
    TrendingUp,
  } from "lucide-react"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { Progress } from "@/components/ui/progress"
  
  // Import chart components
  import {
    LineChart,
    Line,
    Bar,
    BarChart,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts"
  
  export default function OverviewTab() {
    return (
      <div className="space-y-4">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-background/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center pt-1 text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+20.1% from last month</span>
              </div>
              <div className="mt-3 h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "70%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-background/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <div className="flex items-center pt-1 text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+12.2% from last month</span>
              </div>
              <div className="mt-3 h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-background/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Store className="h-4 w-4 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <div className="flex items-center pt-1 text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                <span>-2.5% from last month</span>
              </div>
              <div className="mt-3 h-1 w-full bg-amber-500/20 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "45%" }}></div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-background/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18,489</div>
              <div className="flex items-center pt-1 text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+8.4% from last month</span>
              </div>
              <div className="mt-3 h-1 w-full bg-green-500/20 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "80%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Alerts */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Attention Required</h3>
              <p className="text-sm text-muted-foreground">5 vendors need approval and 3 products have been reported.</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </div>
  
        {/* Sales Overview Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue and order comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
  
        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Orders */}
          <Card className="lg:col-span-4 border-none shadow-md">
            <CardHeader className="flex flex-row items-center">
              <div className="flex-1">
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have {128} orders this month</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem>Print Orders</DropdownMenuItem>
                    <DropdownMenuItem>View All Orders</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">#{order.id}</div>
                        <Badge variant={getOrderStatusVariant(order.status)}>{order.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {order.customer} • {order.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${order.amount}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.items} {order.items === 1 ? "item" : "items"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </div>
            </CardContent>
          </Card>
  
          {/* Top Selling Products */}
          <Card className="lg:col-span-3 border-none shadow-md">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Top 5 products by sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProductsChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {topProductsChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                        {product.id}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.category} • {product.vendor}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${product.price}</div>
                      <div className="text-xs text-muted-foreground">{product.sold} sold</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Vendor Performance */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Vendor Performance</CardTitle>
              <CardDescription>Top 5 vendors by revenue this month</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorPerformanceChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="products" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6">
              {vendorPerformance.map((vendor) => (
                <div key={vendor.id} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Avatar
                      className="h-10 w-10 border-2"
                      style={{ borderColor: vendor.change > 0 ? "#10b981" : "#ef4444" }}
                    >
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${vendor.id}`} alt={vendor.name} />
                      <AvatarFallback>{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{vendor.name}</div>
                        <div className="font-medium">${vendor.revenue.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div>{vendor.products} products</div>
                        <div className={vendor.change > 0 ? "text-green-500" : "text-red-500"}>
                          {vendor.change > 0 ? "+" : ""}
                          {vendor.change}% from last month
                        </div>
                      </div>
                    </div>
                  </div>
                  <Progress value={vendor.performance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md bg-gradient-to-br from-background to-background/90 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Create a new product listing with inventory tracking</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Product</Button>
            </CardFooter>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-background to-background/90 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Approve Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-2">
                <Store className="h-6 w-6 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">Review and approve pending vendor applications</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Review 5 Vendors</Button>
            </CardFooter>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-background to-background/90 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Sales Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground">Generate detailed sales reports and analytics</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Report</Button>
            </CardFooter>
          </Card>
          <Card className="border-none shadow-md bg-gradient-to-br from-background to-background/90 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Manage Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">Create and manage promotional campaigns</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Manage Promotions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }
  
  // Helper function to get badge variant based on order status
  function getOrderStatusVariant(status) {
    switch (status) {
      case "Completed":
        return "success"
      case "Processing":
        return "default"
      case "Pending":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }
  
  // Sample data
  const recentOrders = [
    { id: "ORD-7291", customer: "John Smith", date: "2 mins ago", amount: "129.99", items: 3, status: "Processing" },
    { id: "ORD-7290", customer: "Sarah Johnson", date: "34 mins ago", amount: "59.49", items: 1, status: "Completed" },
    { id: "ORD-7289", customer: "Michael Brown", date: "2 hours ago", amount: "299.99", items: 4, status: "Pending" },
    { id: "ORD-7288", customer: "Emily Davis", date: "5 hours ago", amount: "149.95", items: 2, status: "Completed" },
    { id: "ORD-7287", customer: "Robert Wilson", date: "Yesterday", amount: "79.99", items: 1, status: "Cancelled" },
  ]
  
  const topProducts = [
    {
      id: "P1",
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      vendor: "TechGear",
      price: "89.99",
      sold: 342,
    },
    { id: "P2", name: "Premium Yoga Mat", category: "Fitness", vendor: "FitLife", price: "45.99", sold: 276 },
    { id: "P3", name: "Organic Coffee Beans (1kg)", category: "Food", vendor: "BeanMaster", price: "24.99", sold: 253 },
    { id: "P4", name: "Smart Watch Series 5", category: "Electronics", vendor: "TechGear", price: "199.99", sold: 187 },
    {
      id: "P5",
      name: "Stainless Steel Water Bottle",
      category: "Lifestyle",
      vendor: "EcoGoods",
      price: "29.99",
      sold: 176,
    },
  ]
  
  const vendorPerformance = [
    { id: "V1", name: "TechGear", products: 128, revenue: 45890, change: 12.4, performance: 92 },
    { id: "V2", name: "FitLife", products: 94, revenue: 32450, change: 8.7, performance: 85 },
    { id: "V3", name: "HomeEssentials", products: 156, revenue: 28970, change: -2.3, performance: 78 },
    { id: "V4", name: "FashionHub", products: 215, revenue: 25680, change: 5.6, performance: 72 },
    { id: "V5", name: "EcoGoods", products: 87, revenue: 19450, change: 15.2, performance: 68 },
  ]
  
  // Chart data
  const salesData = [
    { name: "Jan", revenue: 4000, orders: 2400 },
    { name: "Feb", revenue: 3000, orders: 1398 },
    { name: "Mar", revenue: 2000, orders: 9800 },
    { name: "Apr", revenue: 2780, orders: 3908 },
    { name: "May", revenue: 1890, orders: 4800 },
    { name: "Jun", revenue: 2390, orders: 3800 },
    { name: "Jul", revenue: 3490, orders: 4300 },
    { name: "Aug", revenue: 4000, orders: 2400 },
    { name: "Sep", revenue: 3000, orders: 1398 },
    { name: "Oct", revenue: 2000, orders: 9800 },
    { name: "Nov", revenue: 2780, orders: 3908 },
    { name: "Dec", revenue: 3890, orders: 4800 },
  ]
  
  const topProductsChart = [
    { name: "Headphones", value: 342 },
    { name: "Yoga Mat", value: 276 },
    { name: "Coffee", value: 253 },
    { name: "Smart Watch", value: 187 },
    { name: "Water Bottle", value: 176 },
  ]
  
  const vendorPerformanceChart = [
    { name: "TechGear", revenue: 45890, products: 128 },
    { name: "FitLife", revenue: 32450, products: 94 },
    { name: "HomeEssentials", revenue: 28970, products: 156 },
    { name: "FashionHub", revenue: 25680, products: 215 },
    { name: "EcoGoods", revenue: 19450, products: 87 },
  ]
  
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]
  
  