import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Summery Card",
      url: "/summery",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Total Sale",
          url: "/summery/total-sale",
        },
        {
          title: "Total Order",
          url: "/summery/total-orders",
        },
        {
          title: "Total User",
          url: "/summery/total-user",
        },
        {
          title: "Total Product",
          url: "/summery/total-product",
        },
        {
          title: "Monthly Revenue",
          url: "/summery/monthly-revenues",
        },
      ],
    },
    {
      title: "Product Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Products",
          url: "/add-product",
        },
        {
          title: "View All Products",
          url: "/view-products",
        },
        {
          title: "Top Products",
          url: "/top-products",
        },
        {
          title: "Stock Management ",
          url: "/stocks-management",
        },
        {
          title: "Category Management ",
          url: "/category-management",
        },
      ],
    },
    {
      title: "Order Managements",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Order List",
          url: "/order-list",
        },
        {
          title: "Recent Orders",
          url: "/recent-order",
        },
        {
          title: "Add Order",
          url: "/add-order",
        },
        {
          title: "Customer Activity Tracking",
          url: "/activity-tracking",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "View All Users",
          url: "/all-user",
        },
        {
          title: "Refund Management",
          url: "/refund-management",
        },
        {
          title: "Payment Method Statistics",
          url: "#",
        },
    
      ],
    },
    {
      title: "Coupon & Discount Management",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Create New Coupons",
          url: "/all-transactions",
        },
        {
          title: "Refund Management",
          url: "/refund-management",
        },
        {
          title: "Payment Method Statistics",
          url: "#",
        },
    
      ],
    },
    {
      title: "Shipping & Delivery Management",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Shipping Methods Configuration ",
          url: "/all-transactions",
        },
        {
          title: "Track Shipments",
          url: "/refund-management",
        },
        {
          title: "Delivery Status Updates",
          url: "#",
        },
    
      ],
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  vendors: [
    {
      name: "Vendor Dashboard Overview",
      url: "/vendor-management",
      icon: Frame,
    },
    {
      name: "Vendor Registration & Approval",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Vendor Management Panel",
      url: "#",
      icon: Map,
    },
    {
      name: "Order & Fulfillment Tracking",
      url: "#",
      icon: Map,
    },
    {
      name: "Commission & Payout System",
      url: "#",
      icon: Map,
    },
    {
      name: "Vendor Analytics & Performance Monitoring",
      url: "#",
      icon: Map,
    },
    {
      name: "Dispute & Policy Management",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.vendors} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
