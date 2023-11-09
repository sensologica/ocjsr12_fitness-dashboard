import { useState, useEffect } from "react"
import DashboardLoading from "../components/DashboardLoading"
import DashboardError from "../components/DashboardError"

export default function useFetch(userId) {
  // I've opted to store data from all 4 endpoints as an object in a single
  // state variable instead of in separate state variables. It felt natural to
  // keep all of the data together because all of it is needed to render the
  // widgets of the dashboard.
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // For fetching the data, I've opted for the "all data or no data" approach.
  // This means fetching data from all 4 endpoints at once, in parallel, using
  // `Promise.all()`. Fetching in parallel should allow us to obtain the data
  // and show it to the user ASAP. The tradeoff of this decision is that if one
  // of the endpoints fails, none of the Dashboard Widgets will work.
  useEffect(() => {
    setIsLoading(true)

    /**
    * Fetches data from the backend API or from a mock file.
    * @param {number} userId - The data of which user to fetch.
    * @param {string="API","mock"} [dataSource="API"] - Where to fetch from.
    * @return {}
    */
    async function fetchData(userId, dataSource = "API") {
      // Note: The order of the values in the resulting Promise.all array is
      // maintained (the same order as the `fetch()` statements).
      const endpointData = (await Promise.all([
        fetch(`http://localhost:3000/user/${userId}`),
        fetch(`http://localhost:3000/user/${userId}/activity`),
        fetch(`http://localhost:3000/user/${userId}/average-sessions`),
        fetch(`http://localhost:3000/user/${userId}/performance`)
      ])).map(response => {
        // `response.ok` evaluates to true if the HTTP response status codes
        // fall in the range 200-299, which is indicative of success.
        if (!response.ok) {
          setIsLoading(false)
          setIsError(true)
          return null
        }

        setIsError(false)
        return response.json()
      })

      const results = await Promise.all(endpointData)
      
      setData({
        profile: results[0],
        activity: results[1],
        sessions: results[2],
        performance: results[3]
      })

      setIsLoading(false)
    }

    fetchData(userId)
  }, [userId])
  // The dependency array instructs `useEffect` to rerun every time `userId` 
  // changes. 

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