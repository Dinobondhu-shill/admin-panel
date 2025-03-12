import { Bell, MessageCircle, SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header
      className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
      <div className="flex items-center "> 
      <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div><Link to={'/'} className="text-3xl font-bold">Whatever</Link></div>

      </div>


        <div className="flex items-center text-end justify-end gap-5 w-full">
        <Button variant="outline" size="icon" className="relative">
           <Link to={'/notifications'}>
           <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              5
            </span>
            <span className="sr-only">Notifications</span>
           </Link>
          </Button>
          <Link to={'/messages'}>
          <Button variant="outline" size="icon">
          <MessageCircle />
          </Button>
          </Link>
        <SearchForm className="w-sm" />
        </div>
      </div>
    </header>
  );
}
