"use client"

import { useState } from "react"
import { Bell, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import OverviewTab from "./Tabs/Overview"
import AnalyticsTab from "./Tabs/Analytics"
import ReportsTab from "./Tabs/Report"
import NotificationsTab from "./Tabs/Notifications"


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gradient-to-b from-background to-background/80 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          
          <div className="relative">
            <Input placeholder="Search..." className="w-[200px] md:w-[300px] pl-8 rounded-full" />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

