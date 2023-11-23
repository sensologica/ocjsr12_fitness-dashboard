import React from "react"
import ReactDOM from "react-dom/client"
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Homepage from "./pages/Homepage/Homepage"
import PageLayout from "./components/PageLayout"
import Dashboard from "./pages/Dashboard/Dashboard"
import RoutingError from "./components/RoutingError"
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route 
        path="/"
        element={<Homepage />}
        errorElement={<RoutingError />}
      />
      <Route element={<PageLayout />}>
        <Route
          path="/user/:userId"
          element={<Dashboard />}
          errorElement={<RoutingError />}
          loader={
            ({ params }) => {
              const userId = parseInt(params.userId)
              return isNaN(userId) 
                ? console.error("Error: Invalid user ID.")
                : userId
            }
          }
        />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
