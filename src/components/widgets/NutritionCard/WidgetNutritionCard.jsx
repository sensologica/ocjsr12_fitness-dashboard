import iconCalories from "../../../assets/images/icon_calories.svg"
import iconProteins from "../../../assets/images/icon_proteins.svg"
import iconCarbs from "../../../assets/images/icon_carbs.svg"
import iconFats from "../../../assets/images/icon_fats.svg"
import "./WidgetNutritionCard.css"

export default function WidgetNutritionCard({type, value, className}) {
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
      "type": "fat",
      "icon": iconFats,
      "unit": "g",
      "label": "Lipides"
    }
  ]
  
  const thisType = types.find(item => item.type === type)

  return (
    <div className={`widget widget-nutrition-card ${className}`}>
      <div className="widget-nutrition-card__flex-child">
        <img className="widget-nutrition-card__icon" src={thisType.icon} alt="" />
      </div>
      <div className="widget-nutrition-card__flex-child">
        <p className="widget-nutrition-card__value">
          {new Intl.NumberFormat("en-US").format(value)}<wbr />{thisType.unit}
        </p>
        <p className="widget-nutrition-card__label">{thisType.label}</p>
      </div>
    </div>
  )
}
