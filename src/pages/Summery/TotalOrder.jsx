"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Package,
  Search,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Link } from "react-router-dom"

export default function TotalOrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusChangeDialog, setStatusChangeDialog] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [viewOrderDialog, setViewOrderDialog] = useState(false)

  // Sample data - in a real app, this would come from an API
  const [ordersData, setOrdersData] = useState({
    orders: [],
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  })

  // Simulate data loading
  useEffect(() => {
    setLoading(true)
    // This would be replaced with an actual API call
    setTimeout(() => {
      const data = {
        totalOrders: 156,
        pendingOrders: 32,
        processingOrders: 45,
        shippedOrders: 28,
        deliveredOrders: 42,
        cancelledOrders: 9,
        orders: [
          {
            id: "ORD-3245",
            customer: "John Smith",
            email: "john.smith@example.com",
            date: "2023-06-15",
            amount: 120.5,
            status: "pending",
            items: 3,
            address: "123 Main St, Anytown, CA 12345",
            payment: "Credit Card",
          },
          {
            id: "ORD-3244",
            customer: "Emma Johnson",
            email: "emma.j@example.com",
            date: "2023-06-15",
            amount: 85.2,
            status: "processing",
            items: 2,
            address: "456 Oak Ave, Somewhere, NY 54321",
            payment: "PayPal",
          },
          {
            id: "ORD-3243",
            customer: "Michael Brown",
            email: "mbrown@example.com",
            date: "2023-06-14",
            amount: 210.75,
            status: "shipped",
            items: 4,
            address: "789 Pine Rd, Nowhere, TX 67890",
            payment: "Credit Card",
          },
          {
            id: "ORD-3242",
            customer: "Sophia Williams",
            email: "sophia.w@example.com",
            date: "2023-06-14",
            amount: 45.99,
            status: "delivered",
            items: 1,
            address: "101 Elm St, Anyplace, FL 34567",
            payment: "Bank Transfer",
          },
          {
            id: "ORD-3241",
            customer: "James Davis",
            email: "james.d@example.com",
            date: "2023-06-14",
            amount: 150.25,
            status: "pending",
            items: 3,
            address: "202 Maple Dr, Somewhere, WA 89012",
            payment: "Credit Card",
          },
          {
            id: "ORD-3240",
            customer: "Olivia Miller",
            email: "olivia.m@example.com",
            date: "2023-06-13",
            amount: 95.5,
            status: "processing",
            items: 2,
            address: "303 Cedar Ln, Nowhere, IL 45678",
            payment: "PayPal",
          },
          {
            id: "ORD-3239",
            customer: "Robert Wilson",
            email: "rwilson@example.com",
            date: "2023-06-13",
            amount: 65.75,
            status: "cancelled",
            items: 1,
            address: "404 Birch Blvd, Anytown, OH 23456",
            payment: "Credit Card",
          },
          {
            id: "ORD-3238",
            customer: "Ava Moore",
            email: "ava.moore@example.com",
            date: "2023-06-12",
            amount: 175.25,
            status: "delivered",
            items: 3,
            address: "505 Walnut St, Somewhere, GA 78901",
            payment: "Credit Card",
          },
          {
            id: "ORD-3237",
            customer: "William Taylor",
            email: "will.t@example.com",
            date: "2023-06-12",
            amount: 110.5,
            status: "shipped",
            items: 2,
            address: "606 Pineapple Ave, Nowhere, MI 12345",
            payment: "PayPal",
          },
          {
            id: "ORD-3236",
            customer: "Isabella Anderson",
            email: "isabella.a@example.com",
            date: "2023-06-11",
            amount: 90.25,
            status: "delivered",
            items: 2,
            address: "707 Orange Dr, Anyplace, AZ 67890",
            payment: "Bank Transfer",
          },
          {
            id: "ORD-3235",
            customer: "Ethan Thomas",
            email: "ethan.t@example.com",
            date: "2023-06-11",
            amount: 135.8,
            status: "pending",
            items: 3,
            address: "808 Grape Rd, Somewhere, NV 23456",
            payment: "Credit Card",
          },
          {
            id: "ORD-3234",
            customer: "Mia Jackson",
            email: "mia.j@example.com",
            date: "2023-06-10",
            amount: 55.3,
            status: "processing",
            items: 1,
            address: "909 Cherry Ln, Nowhere, PA 78901",
            payment: "PayPal",
          },
          {
            id: "ORD-3233",
            customer: "Alexander White",
            email: "alex.w@example.com",
            date: "2023-06-10",
            amount: 200.45,
            status: "shipped",
            items: 4,
            address: "1010 Apple Blvd, Anytown, OR 34567",
            payment: "Credit Card",
          },
          {
            id: "ORD-3232",
            customer: "Charlotte Harris",
            email: "charlotte.h@example.com",
            date: "2023-06-09",
            amount: 75.6,
            status: "delivered",
            items: 2,
            address: "1111 Banana St, Somewhere, WI 89012",
            payment: "Bank Transfer",
          },
          {
            id: "ORD-3231",
            customer: "Daniel Martin",
            email: "daniel.m@example.com",
            date: "2023-06-09",
            amount: 160.15,
            status: "cancelled",
            items: 3,
            address: "1212 Peach Ave, Nowhere, MN 45678",
            payment: "Credit Card",
          },
        ],
      }
      setOrdersData(data)
      setLoading(false)
    }, 1500)
  }, [])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
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

  // Handle status change
  const handleStatusChange = (orderId, status) => {
    setSelectedOrder(orderId)
    setNewStatus(status)
    setStatusChangeDialog(true)
  }

  // Confirm status change
  const confirmStatusChange = () => {
    // In a real app, this would make an API call to update the order status
    setOrdersData((prevData) => {
      const updatedOrders = prevData.orders.map((order) => {
        if (order.id === selectedOrder) {
          return { ...order, status: newStatus }
        }
        return order
      })
      return { ...prevData, orders: updatedOrders }
    })
    setStatusChangeDialog(false)
  }

  // Handle delete order
  const handleDeleteOrder = (orderId) => {
    setSelectedOrder(orderId)
    setDeleteDialog(true)
  }

  // Confirm delete order
  const confirmDeleteOrder = () => {
    // In a real app, this would make an API call to delete the order
    setOrdersData((prevData) => {
      const updatedOrders = prevData.orders.filter((order) => order.id !== selectedOrder)
      return { ...prevData, orders: updatedOrders, totalOrders: prevData.totalOrders - 1 }
    })
    setDeleteDialog(false)
  }

  // Handle view order details
  const handleViewOrder = (orderId) => {
    setSelectedOrder(orderId)
    setViewOrderDialog(true)
  }

  // Filter orders based on active tab and search query
  const filteredOrders = ordersData.orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "id") {
      comparison = a.id.localeCompare(b.id)
    } else if (sortColumn === "customer") {
      comparison = a.customer.localeCompare(b.customer)
    } else if (sortColumn === "date") {
      comparison = new Date(a.date) - new Date(b.date)
    } else if (sortColumn === "amount") {
      comparison = a.amount - b.amount
    } else if (sortColumn === "status") {
      comparison = a.status.localeCompare(b.status)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  // Pagination
  const itemsPerPage = 10
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Get the selected order details
  const getSelectedOrderDetails = () => {
    return ordersData.orders.find((order) => order.id === selectedOrder)
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
          >
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
          >
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
          >
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

        {/* Order Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          <Card
            className={`${activeTab === "all" ? "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("all")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.totalOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">All Orders</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`${activeTab === "pending" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("pending")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.pendingOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`${activeTab === "processing" ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("processing")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.processingOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Processing</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`${activeTab === "shipped" ? "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("shipped")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.shippedOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Shipped</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`${activeTab === "delivered" ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("delivered")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.deliveredOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card
            className={`${activeTab === "cancelled" ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : ""}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Button variant="ghost" className="w-full h-full p-2" onClick={() => setActiveTab("cancelled")}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {loading ? (
                      <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ) : (
                      ordersData.cancelledOrders
                    )}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Cancelled</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>
                  {activeTab === "all"
                    ? "All Orders"
                    : activeTab === "pending"
                      ? "Pending Orders"
                      : activeTab === "processing"
                        ? "Processing Orders"
                        : activeTab === "shipped"
                          ? "Shipped Orders"
                          : activeTab === "delivered"
                            ? "Delivered Orders"
                            : "Cancelled Orders"}
                </CardTitle>
                <CardDescription>
                  {`Manage and update ${activeTab === "all" ? "all" : activeTab} orders`}
                </CardDescription>
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
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("id")}>
                        <div className="flex items-center gap-1">
                          Order ID
                          {sortColumn === "id" && (
                            <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                        <div className="flex items-center gap-1">
                          Customer
                          {sortColumn === "customer" && (
                            <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                        <div className="flex items-center gap-1">
                          Date
                          {sortColumn === "date" && (
                            <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right cursor-pointer" onClick={() => handleSort("amount")}>
                        <div className="flex items-center justify-end gap-1">
                          Amount
                          {sortColumn === "amount" && (
                            <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                        <div className="flex items-center gap-1">
                          Status
                          {sortColumn === "status" && (
                            <ArrowUpDown className={`h-4 w-4 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Package className="h-8 w-8 text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">No orders found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                          <TableCell>
                            <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue>{getStatusBadge(order.status)}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">
                                  <Badge
                                    variant="outline"
                                    className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                                  >
                                    Pending
                                  </Badge>
                                </SelectItem>
                                <SelectItem value="processing">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                                  >
                                    Processing
                                  </Badge>
                                </SelectItem>
                                <SelectItem value="shipped">
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                                  >
                                    Shipped
                                  </Badge>
                                </SelectItem>
                                <SelectItem value="delivered">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                  >
                                    Delivered
                                  </Badge>
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                                  >
                                    Cancelled
                                  </Badge>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewOrder(order.id)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View order</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete order</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          {!loading && paginatedOrders.length > 0 && (
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <strong>
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)}
                </strong>{" "}
                of <strong>{filteredOrders.length}</strong> orders
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                })}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Status Change Dialog */}
      <Dialog open={statusChangeDialog} onOpenChange={setStatusChangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Order Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of order {selectedOrder} to {newStatus}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusChangeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Dialog */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete order {selectedOrder}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteOrder} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Order Dialog */}
      <Dialog open={viewOrderDialog} onOpenChange={setViewOrderDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Complete information about this order</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6 py-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</span>
                      <span className="text-sm font-semibold">{getSelectedOrderDetails()?.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date:</span>
                      <span className="text-sm">{formatDate(getSelectedOrderDetails()?.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</span>
                      <span className="text-sm">{getStatusBadge(getSelectedOrderDetails()?.status)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method:</span>
                      <span className="text-sm">{getSelectedOrderDetails()?.payment}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                      <span className="text-sm">{getSelectedOrderDetails()?.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="text-sm">{getSelectedOrderDetails()?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address:</span>
                      <span className="text-sm">{getSelectedOrderDetails()?.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{getSelectedOrderDetails()?.items} items</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(getSelectedOrderDetails()?.amount)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Select
                  value={getSelectedOrderDetails()?.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedOrder, value)
                    setViewOrderDialog(false)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Print Invoice</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

