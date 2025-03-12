import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Dashboard from "./pages/Home/Home";

export const router = createBrowserRouter([

  {
    path:'/',
    element:<Root />,
    children:[
      {
        path:'/',
        element:<Dashboard />
      }
    ]
  }
]);
