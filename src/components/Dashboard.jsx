import useFetch from "../hooks/useFetch"
import WidgetActivity from "./WidgetActivity"
import WidgetPerformance from "./WidgetPerformance"
import WidgetSessions from "./WidgetSessions"
import WidgetTodayScore from "./WidgetTodayScore"
import WidgetNutritionCard from "./WidgetNutritionCard"
import modelData from "../services/modelData"
import { useLoaderData } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard() {
  // Get `userId` value from URL using React Router.
  const userId = useLoaderData()
  
  // Use a custom hook to fetch data based on `userId`.
  const data = useFetch(userId, process.env.REACT_APP_DATA_SOURCE)
  console.log(data)
  // modelData(data)

  return (
    <div className="dashboard">
      <div className="dashboard-intro">
        <h1>Bonjour <span className="dashboard-intro__user-name">
          {data.profile && data.profile.data.userInfos.firstName}
        </span></h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="widgets">
        <WidgetActivity data={data.activity} />
        <WidgetSessions data={data.performance} />
        <WidgetPerformance data={data.performance} />
        <WidgetTodayScore
          value={
            data.profile &&
            (data.profile.data.todayScore || data.profile.data.score)
          }
        />
        <WidgetNutritionCard
          className="widget-nutrition-card__calories"
          type="calories"
          value={data.profile && data.profile.data.keyData.calorieCount} 
        />
        <WidgetNutritionCard
          className="widget-nutrition-card__proteins"
          type="proteins"
          value={data.profile && data.profile.data.keyData.proteinCount}
        />
        <WidgetNutritionCard
          className="widget-nutrition-card__carbs"
          type="carbs"
          value={data.profile && data.profile.data.keyData.carbohydrateCount}
        />
        <WidgetNutritionCard
          className="widget-nutrition-card__fats"
          type="fats"
          value={data.profile && data.profile.data.keyData.lipidCount}
        />
      </div>
    </div>
  )
}