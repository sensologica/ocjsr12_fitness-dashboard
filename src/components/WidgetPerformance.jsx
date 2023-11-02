import {
  PolarAngleAxis,
  PolarGrid,
  Radar, 
  RadarChart,
  ResponsiveContainer
} from "recharts"
import "./WidgetPerformance.css"

export default function WidgetPerformance({data}) {
let USER_PERFORMANCE_NEW

  if (data) {
    const PERFORMANCE_INDICATORS = [
      {
        id: 1, 
        name: {
          en: "cardio", 
          fr: "cardio"
        }
      }, 
      {
        id: 2, 
        name: {
          en: "energy", 
          fr: "énergie"
        }
      },
      {
        id: 3, 
        name: {
          en: "endurance", 
          fr: "endurance"
        }
      },
      {
        id: 4, 
        name: {
          en: "strength", 
          fr: "force"
        }
      },
      {
        id: 5, 
        name: {
          en: "speed", 
          fr: "vitesse"
        }
      },
      {
        id: 6, 
        name: {
          en: "intensity", 
          fr: "intensité"
        }
      }
    ]

    const USER_PERFORMANCE = {
      data: data.data.data.map(i => ({
        value: i.value,
        performanceIndicatorId: i.kind
      })),
      userId: data.data.userId
    }

    USER_PERFORMANCE_NEW = USER_PERFORMANCE.data.map(dataItem => ({
      ...dataItem,
      performanceIndicatorName: PERFORMANCE_INDICATORS.filter(i => {
        return i.id === dataItem.performanceIndicatorId
      })[0].name
    }))
  }

  return (
    <div className="widget widget-performance">
      <ResponsiveContainer>
        <RadarChart 
          data={USER_PERFORMANCE_NEW}
          margin={{top: 25, right: 25, bottom: 25, left: 25}}
          startAngle={-150}
          endAngle={210}
        >
          <PolarGrid 
            radialLines={false}
            stroke="#FFFFFF"
          />
          <PolarAngleAxis
            dataKey="performanceIndicatorName.fr"
            axisLine={false}
          />
          <Radar 
            dataKey="value"
            fill="#FF0000"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}