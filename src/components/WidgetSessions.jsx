import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import "./WidgetSessions.css"

export default function WidgetSessions({data}) {
  const sessions = data ? data.data.data : null
  console.log("SESSIONS", sessions)
  return (
    <div className="widget widget-sessions">
      <ResponsiveContainer>
        <LineChart
          data={sessions}
          margin={{
            top: 52, 
            right: 0,
            bottom: 10,
            left: 0
          }}
        >
          <YAxis
            dataKey="value"
            hide={true}
          />
          <XAxis
            dataKey="kind"
            axisLine={false}
            tickLine={false}
          />

          <defs>
            <linearGradient id="curve-gradient">
              <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.5" />
              <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1" />
            </linearGradient>
          </defs>

          <Line
            dataKey="value"
            type="bumpX"
            dot={false}
            activeDot={{ stroke: "none", fill: "#FFFFFF", r: 5 }}
            strokeWidth={2.5}
            style={{ stroke: "url(#curve-gradient)" }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <div className="widget-sessions widget__label">
        Durée moyenne des sessions
      </div>
    </div>
  )
}