import * as mockData from "../data/mockData.js"

/**
  * Fetches data from the backend API or from a mock file.
  * @param {number} userId - The ID of a user whose data we want to fetch.
  * @param {string="API","MOCK"} [dataSource="API"] - Where to fetch from.
  * @return {object} - Object containing results of the fetch operation.
  */
export default async function fetchData(userId, dataSource = "API") {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  let fetchResult = {
    loading: true,
    error: false,
    errorMessage: "Error.",
    data: null
  }

  if (dataSource === "API") {

    // The try-catch block allows us to handle any errors that may result if the
    // fetch request fails/rejects, for ex. if the API is not available.
    try {

      // The order of the values in the resulting Promise.all array is
      // maintained (the same order as the `fetch()` statements).
      const endpointData = (await Promise.all([
        fetch(`${apiBaseUrl}/user/${userId}`),
        fetch(`${apiBaseUrl}/user/${userId}/activity`),
        fetch(`${apiBaseUrl}/user/${userId}/average-sessions`),
        fetch(`${apiBaseUrl}/user/${userId}/performance`)
      ])).map(response => {

        // `response.ok` evaluates to true if the HTTP response status codes
        // fall in the range 200-299, which is indicative of success.
        if (!response.ok) {
          fetchResult = {
            loading: false,
            error: true, 
            errorMessage: `Error: Fetch unsuccessful. ${response.status}`
          }
        }
        return response.json()
      })

      const results = await Promise.all(endpointData)
      
      fetchResult = {
        loading: false,
        error: false,
        data: {
          profile: results[0],
          activity: results[1],
          sessions: results[2],
          performance: results[3]
        }
      }

      return fetchResult

    } catch (error) {
      fetchResult = {
        loading: false,
        error: true,
        errorMessage: "Error: Fetch request rejected or API not available. Switch to mocked data source or try again later.",
        data: null
      }
      return fetchResult 
    } 
  } else if (dataSource === "MOCK") {

    const currentUserProfile = mockData.USER_MAIN_DATA
      .filter(i => i.id === userId || i.userId === userId).shift()

    const currentUserActivity = mockData.USER_ACTIVITY
      .filter(i => i.id === userId || i.userId === userId).shift()

    const currentUserSessions = mockData.USER_AVERAGE_SESSIONS
      .filter(i => i.id === userId || i.userId === userId).shift()

    const currentUserPerformance = mockData.USER_PERFORMANCE
      .filter(i => i.id === userId || i.userId === userId).shift()
    
    fetchResult = {
      loading: false,
      error: false,
      data: {
        activity: {
          data: {
            sessions: currentUserActivity.sessions,
            userId: currentUserActivity.id
          }
        },
        performance: {
          data: {
            data: currentUserPerformance.data,
            kind: currentUserPerformance.kind,
            userId: currentUserPerformance.id
          }
        },
        profile: {
          data: {
            id: currentUserProfile.id,
            keyData: currentUserProfile.keyData,
            score: currentUserProfile.score || currentUserProfile.todayScore,
            userInfos: currentUserProfile.userInfos
          }
        },
        sessions: {
          data: {
            sessions: currentUserSessions.sessions,
            userId: currentUserSessions.id
          }
        }
      }
    }

    return fetchResult

  } else {

    fetchResult = {
      loading: false,
      error: true,
      errorMessage: "Error: Invalid data source.",
      data: null
    }

    return fetchResult
  }
}