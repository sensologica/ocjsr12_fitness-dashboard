import { useState, useEffect } from "react";
import NutritionCard from "./NutritionCard";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState();
  const url = "http://localhost:3000/user/18";

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(userData => {
        setData(userData);
        console.log(userData);
      });
  }, []); // The empty array instructs `useEffect` to only run once on first component render, and not on subsequent renders.

  return (
    <div className="dashboard">
      <div className="test x"></div>
      <div className="test z1"></div>
      <div className="test z2"></div>
      <div className="test z3">{data && (data.data.todayScore || data.data.score)}</div>
      <NutritionCard className="nutrition-card__calories" type="calories" value={data && data.data.keyData.calorieCount} />
      <NutritionCard className="nutrition-card__proteins" type="proteins" value={data && data.data.keyData.proteinCount} />
      <NutritionCard className="nutrition-card__carbs" type="carbs" value={data && data.data.keyData.carbohydrateCount} />
      <NutritionCard className="nutrition-card__fats" type="fats" value={data && data.data.keyData.lipidCount} />
    </div>
  );
}

export default Dashboard;