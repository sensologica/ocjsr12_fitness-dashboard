/**
  * Fetches data from the backend API or from a mock file.
  * @param {number} userId - The ID of a user whose data we want to fetch.
  * @param {string="API","MOCK"} [dataSource="API"] - Where to fetch from.
  * @return {object} - Object containing results of the fetch operation.
  */
export default async function fetchData(userId, dataSource = "API") {
  let fetchResult = {
    loading: true,
    error: false,
    data: {}
  }

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
      fetchResult = {
        loading: false,
        error: true
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
}