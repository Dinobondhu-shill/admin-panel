"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, ShoppingCart, Store, Package, User, Settings, X } from "lucide-react"

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState(allNotifications)

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with important alerts and messages</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            <X className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No notifications to display" />
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter((n) => !n.read).length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
            </div>
          ) : (
            <EmptyState message="No unread notifications" />
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {notifications.filter((n) => n.type === "alert").length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter((notification) => notification.type === "alert")
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
            </div>
          ) : (
            <EmptyState message="No alerts to display" />
          )}
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {notifications.filter((n) => n.type === "system").length > 0 ? (
            <div className="space-y-4">
              {notifications
                .filter((notification) => notification.type === "system")
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
            </div>
          ) : (
            <EmptyState message="No system notifications" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationCard({ notification, onMarkAsRead, onDelete }) {
  const getIcon = (category) => {
    switch (category) {
      case "order":
        return <ShoppingCart className="h-5 w-5" />
      case "vendor":
        return <Store className="h-5 w-5" />
      case "product":
        return <Package className="h-5 w-5" />
      case "customer":
        return <User className="h-5 w-5" />
      case "system":
        return <Settings className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className={`border-l-4 ${notification.read ? "border-l-muted" : "border-l-primary"} shadow-md`}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          {getIcon(notification.category)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{notification.title}</CardTitle>
            <div className="flex items-center gap-2">
              {!notification.read && <Badge variant="default" className="h-2 w-2 rounded-full p-0" />}
              <div className="text-xs text-muted-foreground">{notification.time}</div>
            </div>
          </div>
          <CardDescription>{notification.source}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center">
            {getTypeIcon(notification.type)}
          </div>
          <p className="text-sm">{notification.message}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!notification.read && (
          <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification.id)}>
            Mark as Read
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => onDelete(notification.id)}>
          Dismiss
        </Button>
        {notification.actionLabel && <Button size="sm">{notification.actionLabel}</Button>}
      </CardFooter>
    </Card>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Bell className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        You're all caught up! Check back later for new notifications.
      </p>
    </div>
  )
}

// Sample notification data
const allNotifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #ORD-7291 has been placed for $129.99. Requires processing.",
    time: "2 mins ago",
    read: false,
    type: "info",
    category: "order",
    source: "Order Management",
    actionLabel: "Process Order",
  },
  {
    id: 2,
    title: "Vendor Application",
    message: "New vendor 'Organic Essentials' has applied to join your marketplace.",
    time: "34 mins ago",
    read: false,
    type: "alert",
    category: "vendor",
    source: "Vendor Management",
    actionLabel: "Review Application",
  },
  {
    id: 3,
    title: "Low Stock Alert",
    message: "Product 'Wireless Bluetooth Headphones' is running low on stock (5 remaining).",
    time: "2 hours ago",
    read: false,
    type: "alert",
    category: "product",
    source: "Inventory Management",
    actionLabel: "Restock",
  },
  {
    id: 4,
    title: "Customer Complaint",
    message: "Customer Emily Davis has filed a complaint regarding order #ORD-7288.",
    time: "5 hours ago",
    read: true,
    type: "alert",
    category: "customer",
    source: "Customer Support",
    actionLabel: "View Details",
  },
  {
    id: 5,
    title: "System Update",
    message: "The platform will undergo maintenance on Sunday, March 15th from 2AM to 4AM UTC.",
    time: "Yesterday",
    read: true,
    type: "system",
    category: "system",
    source: "System Administration",
  },
  {
    id: 6,
    title: "Payment Processed",
    message: "Payment for order #ORD-7290 has been successfully processed.",
    time: "Yesterday",
    read: true,
    type: "success",
    category: "order",
    source: "Payment Processing",
  },
  {
    id: 7,
    title: "New Product Reported",
    message: "Product 'Premium Yoga Mat' has been reported for policy violation.",
    time: "2 days ago",
    read: true,
    type: "alert",
    category: "product",
    source: "Content Moderation",
    actionLabel: "Review Product",
  },
]


