export default function modelData(dataUnmapped) {
  if (dataUnmapped) {
    const profileBefore = dataUnmapped.profile
    const sessionsBefore = dataUnmapped.sessions
    const activityBefore = dataUnmapped.activity
    const performanceBefore = dataUnmapped.performance

    function mapSessions(sessionsBefore) {
      return sessionsBefore.map((session) => ({
        sessionDate: session.day,
        weightKgs: session.kilogram,
        caloriesBurnt: session.calories
      }))
    }

    console.clear()
    console.log("profileBefore:", profileBefore)
    // console.log("sessionsBefore:", sessionsBefore)
    // console.log("activityBefore:", activityBefore)
    // console.log("performanceBefore:", performanceBefore)


    const dataMapped = {
      userId: profileBefore.data.id,
      // dailyActivity: mapSessions(sessionsBefore)
    }

    console.log("RESULT", dataMapped)
    return dataMapped
  } else {
    console.log("Error: Data mapping could not be done.")
    return undefined
  }
}