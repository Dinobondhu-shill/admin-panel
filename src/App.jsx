import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Dashboard from "./pages/Home/Home";
import NotificationsTab from "./pages/Home/Tabs/Notifications";
import SummaryDashboard from "./pages/Summery/Summery";
import TotalSalesPage from "./pages/Summery/TotalSale";
import TotalOrdersPage from "./pages/Summery/TotalOrder";

export const router = createBrowserRouter([

  {
    path:'/',
    element:<Root />,
    children:[
      {
        path:'/',
        element:<Dashboard />
      },
      {
        path:'/summery',
        element:<SummaryDashboard />
      },
      {
        path:'/summery/total-sale',
        element:<TotalSalesPage />
      },
      {
        path:"/summery/total-orders",
        element:<TotalOrdersPage />
      },
      {
        path:'/notifications',
        element:<NotificationsTab />
      }
    ]
  }
]);
