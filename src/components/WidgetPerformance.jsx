import {
  PolarAngleAxis,
  PolarGrid,
  Radar, 
  RadarChart,
  ResponsiveContainer
} from "recharts"
import "./WidgetPerformance.css"

export default function WidgetPerformance({data}) {
  return (
    <div className="widget widget-performance">
      <ResponsiveContainer>
        <RadarChart 
          data={data}
          margin={{top: 25, right: 25, bottom: 25, left: 25}}
          startAngle={-150}
          endAngle={210}
        >
          <PolarGrid 
            radialLines={false}
            stroke="#FFFFFF"
          />
          <PolarAngleAxis
            dataKey="kind.fr"
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