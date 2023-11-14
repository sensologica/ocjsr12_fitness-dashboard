import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import "./WidgetSessions.css"

function CustomTooltip({active, payload}) {
  // A tooltip becomes active on hover or click, depending on how it's
  // configured with props. The payload array is empty if the tooltip is
  // not active, that's why it's important to check that `active` is true, 
  // otherwise we get an error.
  if (active && payload) {
    const value = `${payload[0].value} min`
    return (
      <div className="widget-sessions__tooltip">
        <div>{value}</div>
      </div>
    )
  }
}

function CustomCursor({ points }) {
  return (
    <rect
      className="widget-sessions__cursor"
      fill="#000000"
      opacity={0.1}
      x={points[0].x}
      height="100%"
      width="100%"
    />
  )
}

export default function WidgetSessions({data}) {
  return (
    <div className="widget widget-sessions">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 64, 
            right: 0,
            bottom: 10,
            left: 0
          }}
        >
          <Tooltip 
            // We instruct the Tooltip component to use our custom tooltip.
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <YAxis
            dataKey="length"
            hide={true}
            domain={["dataMin - 10", "dataMax + 10"]}
          />
          <XAxis
            dataKey="dayOfWeek"
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            padding={{ left: 16, right: 16 }}
          />
          <defs>
            <linearGradient id="curve-gradient">
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>
          <Line
            dataKey="length"
            type="bump"
            dot={false}
            activeDot={{ 
              stroke: "none",
              fill: "#FFFFFF", 
              r: 5
            }}
            strokeWidth={2.5}
            style={{ stroke: "url(#curve-gradient)" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="widget-sessions widget__label">
        Durée moyenne des sessions
      </div>
    </div>
  )
}