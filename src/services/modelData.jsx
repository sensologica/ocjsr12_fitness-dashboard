export default function modelData(data) {
  if (data) {
    function mapSessions(sessions) {
      return sessions.map((session) => ({
        sessionDate: session.day,
        weightKgs: session.kilogram,
        caloriesBurnt: session.calories
      }))
    }

    function mapSessionDuration(sessions) {
      const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"]
      return sessions.map((session, index) => ({
        day: session.day,
        dayOfWeek: daysOfWeek[index],
        length: session.sessionLength
      }))
    }

    function mapPerformance(performance) {
      const frenchTranslation = {
        "cardio": "cardio",
        "energy": "énergie",
        "endurance": "endurance",
        "strength": "force",
        "speed": "vitesse",
        "intensity": "intensité"
      }

      return performance.data.map(i => ({
        value: i.value,
        kind: {
          en: performance.kind[i.kind],
          fr: frenchTranslation[performance.kind[i.kind]]
        }
      }))
    }
      
    const modelledData = {
      user: {
        id: data.profile.data.id,
        firstName: data.profile.data.userInfos.firstName,
        lastName: data.profile.data.userInfos.lastName
      },
      dailyActivity: mapSessions(data.activity.data.sessions), 
      nutrition: {
        calories: data.profile.data.keyData.calorieCount,
        carbs: data.profile.data.keyData.carbohydrateCount,
        fat: data.profile.data.keyData.lipidCount,
        protein: data.profile.data.keyData.proteinCount
      }, 
      dailyScore: data.profile.data.score || data.profile.data.todayScore,
      sessionDuration: mapSessionDuration(data.sessions.data.sessions), 
      performance: mapPerformance(data.performance.data)
    }
  
    return modelledData
  } else {
    console.log("Error: Data mapping could not be done.")
    return undefined
  }
}