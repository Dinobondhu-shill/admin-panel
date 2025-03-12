import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4">
              <Outlet />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
    );
};

export default Root;