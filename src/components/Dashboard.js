import NutritionCard from "./NutritionCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="test x"></div>
      <div className="test z1"></div>
      <div className="test z2"></div>
      <div className="test z3"></div>
      <NutritionCard className="nutrition-card__calories" type="calories" value="1500" />
      <NutritionCard className="nutrition-card__proteins" type="proteins" value="90" />
      <NutritionCard className="nutrition-card__carbs" type="carbs" value="90" />
      <NutritionCard className="nutrition-card__fats" type="fats" value="90" />
    </div>
  );
}

export default Dashboard;