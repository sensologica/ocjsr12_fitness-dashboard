import { useState, useEffect } from "react"
import fetchData from "../services/fetchData"
import DashboardLoading from "../components/DashboardLoading"
import DashboardError from "../components/DashboardError"

export default function useFetch(userId, dataSource) {
  // I've opted to store data from all 4 endpoints as an object in a single
  // state variable instead of in separate state variables. It felt natural to
  // keep all of the data together because all of it is needed to render the
  // widgets of the dashboard.
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({})

  // For fetching the data, I've opted for the "all data or no data" approach.
  // This means fetching data from all 4 endpoints at once, in parallel, using
  // `Promise.all()`. Fetching in parallel should allow us to obtain the data
  // and show it to the user ASAP. The tradeoff of this decision is that if one
  // of the endpoints fails, none of the Dashboard Widgets will work.
  useEffect(() => {
    fetchData(userId, dataSource)
      .then(({ loading, error, data }) => {
        setIsLoading(loading)
        setIsError(error)
        setData(data)
      })
  }, [userId, dataSource])
  // The dependency array instructs `useEffect` to rerun every time `userId` or 
  // `dataSource` changes. 

  if (isLoading) {
    return (
      <div className="dashboard">
        <DashboardLoading />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="dashboard">
        <DashboardError />
      </div>
    )
  }

  return data
}