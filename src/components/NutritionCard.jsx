import iconCalories from "../assets/images/icon_calories.svg"
import iconProteins from "../assets/images/icon_proteins.svg"
import iconCarbs from "../assets/images/icon_carbs.svg"
import iconFats from "../assets/images/icon_fats.svg"
import "./NutritionCard.css"

export default function NutritionCard({type, value, className}) {
  const types = [
    {
      "type": "calories",
      "icon": iconCalories,
      "unit": "kCal",
      "label": "Calories"
    },
    { 
      "type": "proteins",
      "icon": iconProteins,
      "unit": "g",
      "label": "Proteines"
    }, 
    {
      "type": "carbs",
      "icon": iconCarbs,
      "unit": "g",
      "label": "Glucides"
    }, 
    {
      "type": "fats",
      "icon": iconFats,
      "unit": "g",
      "label": "Lipides"
    }
  ]
  
  const thisType = types.find(item => item.type === type)

  return (
    <div className={`nutrition-card ${className}`}>
      <div className="nutrition-card__flex-child">
        <img className="nutrition-card__icon" src={thisType.icon} alt="" />
      </div>
      <div className="nutrition-card__flex-child">
        <p className="nutrition-card__value">
          {new Intl.NumberFormat("en-US").format(value) + thisType.unit}
        </p>
        <p className="nutrition-card__label">{thisType.label}</p>
      </div>
    </div>
  )
}
