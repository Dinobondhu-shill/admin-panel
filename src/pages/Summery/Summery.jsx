
import { useState, useEffect } from "react"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Menu,
  User,
  ArrowUpRight,
  ArrowDownRight,
  LayoutGrid,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState("monthly")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [loading, setLoading] = useState(true)

  // Sample data - in a real app, this would come from an API
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    monthlyRevenue: 0,
    averageOrderValue: 0,
    salesTrend: [],
    ordersByDay: [],
    userGrowth: [],
    productCategories: [],
    revenueByMonth: [],
    orderValueTarget: 0,
  })

  // Simulate data loading
  useEffect(() => {
    setLoading(true)
    // This would be replaced with an actual API call
    setTimeout(() => {
      const data = {
        totalSales: 124500,
        totalOrders: 1453,
        totalUsers: 5240,
        totalProducts: 324,
        monthlyRevenue: 42300,
        averageOrderValue: 85.68,
        salesTrend: [42, 38, 45, 50, 54, 48, 52, 60, 65, 75, 70, 80],
        ordersByDay: [25, 30, 45, 35, 55, 40, 30],
        userGrowth: [4200, 4350, 4500, 4650, 4800, 5000, 5240],
        productCategories: [
          { name: "Electronics", count: 120 },
          { name: "Clothing", count: 85 },
          { name: "Home", count: 65 },
          { name: "Books", count: 54 },
        ],
        revenueByMonth: [35000, 38000, 36000, 40000, 39000, 42300],
        orderValueTarget: 100,
      }
      setDashboardData(data)
      setLoading(false)
    }, 1500)
  }, [timePeriod])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Simple chart component for sales trend
  const SimpleTrendChart = ({ data, color }) => {
    if (!data || data.length === 0) return null

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    return (
      <div className="flex items-end h-16 gap-1">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100
          return <div key={index} className={`${color} rounded-sm w-2`} style={{ height: `${height}%` }}></div>
        })}
      </div>
    )
  }

  // Simple bar chart for orders by day
  const SimpleBarChart = ({ data, color }) => {
    if (!data || data.length === 0) return null

    const max = Math.max(...data)

    return (
      <div className="flex items-end h-16 gap-2 justify-between">
        {data.map((value, index) => {
          const height = max === 0 ? 0 : (value / max) * 100
          return <div key={index} className={`${color} rounded-t-sm w-6`} style={{ height: `${height}%` }}></div>
        })}
      </div>
    )
  }

  // Simple line chart for user growth
  const SimpleLineChart = ({ data, color }) => {
    if (!data || data.length === 0) return null

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    // Create points for SVG path
    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="h-16 w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={color === "bg-violet-500" ? "#8b5cf6" : "#10b981"}
            strokeWidth="3"
          />
        </svg>
      </div>
    )
  }

  // Simple pie chart for product categories
  const SimplePieChart = ({ data }) => {
    if (!data || data.length === 0) return null

    const total = data.reduce((sum, item) => sum + item.count, 0)
    let currentAngle = 0

    const colors = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

    return (
      <div className="h-24 w-24 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#f3f4f6" />

          {data.map((item, index) => {
            const percentage = (item.count / total) * 100
            const angle = (percentage / 100) * 360

            // Calculate the SVG arc path
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle = endAngle

            const startX = 50 + 45 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const startY = 50 + 45 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const endX = 50 + 45 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const endY = 50 + 45 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`,
            ].join(" ")

            return <path key={index} d={pathData} fill={colors[index % colors.length]} />
          })}

          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
      </div>
    )
  }

  // Simple gauge chart for average order value
  const SimpleGaugeChart = ({ value, target, color }) => {
    const percentage = Math.min(100, (value / target) * 100)
    const angle = (percentage / 100) * 180 - 90

    return (
      <div className="h-24 w-full relative">
        <svg width="100%" height="100%" viewBox="0 0 100 50">
          {/* Background arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />

          {/* Value arc */}
          <path
            d={`M 10 50 A 40 40 0 ${percentage > 50 ? 1 : 0} 1 ${10 + 80 * (percentage / 100)} 50`}
            fill="none"
            stroke={color === "bg-teal-500" ? "#14b8a6" : "#8b5cf6"}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Needle */}
          <line
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos(angle * (Math.PI / 180))}
            y2={50 + 35 * Math.sin(angle * (Math.PI / 180))}
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Center point */}
          <circle cx="50" cy="50" r="3" fill="#374151" />
        </svg>

        <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>{target}</span>
        </div>
      </div>
    )
  }

  // Area chart for monthly revenue
  const SimpleAreaChart = ({ data, color }) => {
    if (!data || data.length === 0) return null

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min

    // Create points for SVG path
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = range === 0 ? 0 : 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })

    // Create the path for the area
    const areaPath = [
      `M 0,100`,
      `L 0,${100 - ((data[0] - min) / range) * 100}`,
      ...points.map((point) => `L ${point}`),
      `L 100,100`,
      `Z`,
    ].join(" ")

    return (
      <div className="h-16 w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={areaPath} fill={color === "bg-rose-500" ? "rgba(244, 63, 94, 0.2)" : "rgba(139, 92, 246, 0.2)"} />
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke={color === "bg-rose-500" ? "#f43f5e" : "#8b5cf6"}
            strokeWidth="3"
          />
        </svg>
      </div>
    )
  }

  // Time period options
  const timePeriodOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Time period selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Performance Overview</h2>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {timePeriodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dashboard cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Sales Card */}
            <Link to='/summery/total-sale' className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-emerald-700 dark:text-emerald-400">Total Sales</h3>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                    <DollarSign className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {formatCurrency(dashboardData.totalSales)}
                  </p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>12.5%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleTrendChart data={dashboardData.salesTrend} color="bg-emerald-500" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Total Orders Card */}
            <Link to="/summery/total-orders" className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-400">Total Orders</h3>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {dashboardData.totalOrders.toLocaleString()}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>8.2%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleBarChart data={dashboardData.ordersByDay} color="bg-blue-500" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Total Users Card */}
            <Link to="/users" className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-violet-700 dark:text-violet-400">Total Users</h3>
                  <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-full">
                    <Users className="h-6 w-6 text-violet-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {dashboardData.totalUsers.toLocaleString()}
                  </p>
                  <div className="flex items-center text-violet-600 dark:text-violet-400 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>24.8%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleLineChart data={dashboardData.userGrowth} color="bg-violet-500" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Jun</span>
                    <span>Now</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Total Products Card */}
            <Link to="/products" className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-amber-700 dark:text-amber-400">Total Products</h3>
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                    <Package className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {dashboardData.totalProducts.toLocaleString()}
                  </p>
                  <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>5.3%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <SimplePieChart data={dashboardData.productCategories} />
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    {dashboardData.productCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${index === 0 ? "bg-violet-500" : index === 1 ? "bg-pink-500" : index === 2 ? "bg-amber-500" : "bg-teal-500"}`}
                        ></div>
                        <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Monthly Revenue Card */}
            <Link to="/revenue" className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-rose-700 dark:text-rose-400">Monthly Revenue</h3>
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-full">
                    <BarChart className="h-6 w-6 text-rose-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {formatCurrency(dashboardData.monthlyRevenue)}
                  </p>
                  <div className="flex items-center text-rose-600 dark:text-rose-400 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>8.5%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleAreaChart data={dashboardData.revenueByMonth} color="bg-rose-500" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Jan</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Average Order Value Card */}
            <Link to="/analytics" className="block transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400">Avg. Order Value</h3>
                  <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-full">
                    <TrendingUp className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {formatCurrency(dashboardData.averageOrderValue)}
                  </p>
                  <div className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span>3.2%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleGaugeChart
                    value={dashboardData.averageOrderValue}
                    target={dashboardData.orderValueTarget}
                    color="bg-teal-500"
                  />
                  <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">
                      {Math.round((dashboardData.averageOrderValue / dashboardData.orderValueTarget) * 100)}%
                    </span>{" "}
                    of target
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Additional stats section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">New order #3245</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">John Smith purchased 3 items</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">2 min ago</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Payment received</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">$1,200 from Emma Johnson</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">15 min ago</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-full">
                    <Users className="h-5 w-5 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">New user registered</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sarah Williams created an account</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                    <Package className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Product added</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">New product "Premium Headphones" added</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">3 hours ago</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                View all activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

