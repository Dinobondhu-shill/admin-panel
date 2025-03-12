import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import chart components
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Detailed insights into your e-commerce platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          {/* Sales Overview */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Revenue and order trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesAnalyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sales Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Sales by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line type="monotone" dataKey="rate" stroke="#ff7300" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Top performing products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    <Bar dataKey="profit" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Customer distribution by age group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerDemographicsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerDemographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Vendor Growth</CardTitle>
              <CardDescription>New vendors and revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vendorGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="vendors" stroke="#8884d8" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data for charts
const salesAnalyticsData = [
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

const categoryData = [
  { name: "Electronics", value: 35000 },
  { name: "Clothing", value: 25000 },
  { name: "Home & Kitchen", value: 18000 },
  { name: "Beauty", value: 15000 },
  { name: "Sports", value: 12000 },
]

const channelData = [
  { name: "Website", value: 45000 },
  { name: "Mobile App", value: 35000 },
  { name: "Marketplace", value: 20000 },
  { name: "Social Media", value: 15000 },
  { name: "In-store", value: 10000 },
]

const conversionData = [
  { name: "Jan", rate: 2.5 },
  { name: "Feb", rate: 2.8 },
  { name: "Mar", rate: 3.2 },
  { name: "Apr", rate: 3.0 },
  { name: "May", rate: 3.5 },
  { name: "Jun", rate: 3.7 },
  { name: "Jul", rate: 4.0 },
  { name: "Aug", rate: 4.2 },
  { name: "Sep", rate: 4.5 },
  { name: "Oct", rate: 4.3 },
  { name: "Nov", rate: 4.7 },
  { name: "Dec", rate: 5.0 },
]

const productPerformanceData = [
  { name: "Headphones", revenue: 25000, profit: 10000 },
  { name: "Smart Watch", revenue: 20000, profit: 8000 },
  { name: "Laptop", revenue: 35000, profit: 12000 },
  { name: "Smartphone", revenue: 40000, profit: 15000 },
  { name: "Camera", revenue: 18000, profit: 7000 },
]

const customerDemographicsData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 10 },
]

const vendorGrowthData = [
  { name: "Jan", vendors: 50, revenue: 20000 },
  { name: "Feb", vendors: 55, revenue: 22000 },
  { name: "Mar", vendors: 60, revenue: 25000 },
  { name: "Apr", vendors: 65, revenue: 27000 },
  { name: "May", vendors: 70, revenue: 30000 },
  { name: "Jun", vendors: 75, revenue: 32000 },
  { name: "Jul", vendors: 80, revenue: 35000 },
  { name: "Aug", vendors: 85, revenue: 37000 },
  { name: "Sep", vendors: 90, revenue: 40000 },
  { name: "Oct", vendors: 95, revenue: 42000 },
  { name: "Nov", vendors: 100, revenue: 45000 },
  { name: "Dec", vendors: 105, revenue: 48000 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28"]

