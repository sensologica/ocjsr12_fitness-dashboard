import { useState, useEffect } from "react"
import fetchData from "../services/fetchData"
import modelData from "../services/modelData"

export default function useFetch(userId, dataSource) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData(userId, dataSource)
      .then(result => {
        setIsLoading(result.loading)
        setIsError(result.error)
        setErrorMessage(result.errorMessage)
        setData(modelData(result.data))
      })
  }, [userId, dataSource])

  return { isLoading, isError, errorMessage, data }
}