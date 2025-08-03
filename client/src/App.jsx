import { createBrowserRouter, RouterProvider } from "react-router-dom"

import {DashBoard, HomeLayOut, Login, Register, Users} from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>Something went wrong</h1>,
    element: <HomeLayOut />,
    children: [
      {
        index: true,
        element: <DashBoard/>
      },
      {
        path: "/users",
        element: <Users/>
      }
    ]
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  }
])

const App = () => {


  return <RouterProvider router={router} />
}

export default App