import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Filter, Printer, Share2 } from "lucide-react"

// Import chart components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export default function ReportsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reports Dashboard</h2>
          <p className="text-muted-foreground">Generate and export detailed reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Reports</TabsTrigger>
          <TabsTrigger value="customers">Customer Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Monthly sales performance with targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={salesPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="actual" fill="#8884d8" />
                    <Line type="monotone" dataKey="target" stroke="#ff7300" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentMethodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Sales Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line type="monotone" dataKey="growth" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>Current stock levels by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryLevelsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" />
                    <Bar dataKey="minimum" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Vendor Performance Comparison</CardTitle>
              <CardDescription>Revenue and product count by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={vendorComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="products" stroke="#ff7300" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Customer Acquisition Cost</CardTitle>
              <CardDescription>Monthly CAC and LTV comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerAcquisitionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="cac" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="ltv" stroke="#82ca9d" strokeWidth={2} />
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
const salesPerformanceData = [
  { name: "Jan", actual: 4000, target: 4500 },
  { name: "Feb", actual: 3000, target: 3500 },
  { name: "Mar", actual: 5000, target: 4500 },
  { name: "Apr", actual: 2780, target: 3000 },
  { name: "May", actual: 4890, target: 4000 },
  { name: "Jun", actual: 3890, target: 3500 },
  { name: "Jul", actual: 4490, target: 4000 },
  { name: "Aug", actual: 5000, target: 4500 },
  { name: "Sep", actual: 4000, target: 4000 },
  { name: "Oct", actual: 6000, target: 5000 },
  { name: "Nov", actual: 7000, target: 6000 },
  { name: "Dec", actual: 9000, target: 7500 },
]

const paymentMethodData = [
  { name: "Credit Card", value: 45000 },
  { name: "PayPal", value: 25000 },
  { name: "Bank Transfer", value: 15000 },
  { name: "Digital Wallet", value: 10000 },
  { name: "Crypto", value: 5000 },
]

const salesGrowthData = [
  { name: "Jan", growth: 5 },
  { name: "Feb", growth: 3 },
  { name: "Mar", growth: 7 },
  { name: "Apr", growth: 2 },
  { name: "May", growth: 8 },
  { name: "Jun", growth: 6 },
  { name: "Jul", growth: 9 },
  { name: "Aug", growth: 10 },
  { name: "Sep", growth: 8 },
  { name: "Oct", growth: 12 },
  { name: "Nov", growth: 15 },
  { name: "Dec", growth: 18 },
]

const inventoryLevelsData = [
  { name: "Electronics", current: 250, minimum: 100 },
  { name: "Clothing", current: 350, minimum: 150 },
  { name: "Home & Kitchen", current: 200, minimum: 80 },
  { name: "Beauty", current: 180, minimum: 70 },
  { name: "Sports", current: 120, minimum: 50 },
]

const vendorComparisonData = [
  { name: "TechGear", revenue: 45000, products: 120 },
  { name: "FitLife", revenue: 32000, products: 90 },
  { name: "HomeEssentials", revenue: 28000, products: 150 },
  { name: "FashionHub", revenue: 25000, products: 200 },
  { name: "EcoGoods", revenue: 18000, products: 80 },
]

const customerAcquisitionData = [
  { name: "Jan", cac: 25, ltv: 120 },
  { name: "Feb", cac: 28, ltv: 125 },
  { name: "Mar", cac: 26, ltv: 130 },
  { name: "Apr", cac: 30, ltv: 135 },
  { name: "May", cac: 32, ltv: 140 },
  { name: "Jun", cac: 35, ltv: 145 },
  { name: "Jul", cac: 33, ltv: 150 },
  { name: "Aug", cac: 30, ltv: 155 },
  { name: "Sep", cac: 28, ltv: 160 },
  { name: "Oct", cac: 25, ltv: 165 },
  { name: "Nov", cac: 22, ltv: 170 },
  { name: "Dec", cac: 20, ltv: 175 },
]

