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

function CustomCursor(props) {
  console.log(props)
  return (
    <rect
      className="widget-sessions__cursor"
      fill="#000000"
      opacity={0.1}
      height="100%"
      left="auto"
      right={0}
      width={props.points[0].x}
    />
  )
}

export default function WidgetSessions({data}) {
  const sessions = data ? data.data.data : null
  const days = ["L", "M", "M", "J", "V", "S", "D"]

  // Add a `dayOfWeek` property so we can label the ticks of the X-axis with it.
  const dataFormatted = sessions && sessions.map((element, index) => {
    return {
      ...element,
      dayOfWeek: days[index]
    }
  })

  return (
    <div className="widget widget-sessions">
      <ResponsiveContainer>
        <LineChart
          data={dataFormatted}
          margin={{
            top: 64, 
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
            dataKey="dayOfWeek"
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            padding={{ left: 16, right: 16 }}
          />
          <XAxis
            xAxisId={1}
            dataKey="kind"
            hide={true}
          />

          <defs>
            <linearGradient id="curve-gradient">
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
          </defs>

          <Line
            dataKey="value"
            xAxisId={1}
            type="bumpX"
            dot={false}
            activeDot={{ 
              stroke: "none",
              fill: "#FFFFFF", 
              r: 5
            }}
            strokeWidth={2.5}
            style={{ stroke: "url(#curve-gradient)" }}
          />
          <Tooltip 
            // We instruct the Tooltip component to use our custom tooltip.
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
            trigger="click"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="widget-sessions widget__label">
        Durée moyenne des sessions
      </div>
    </div>
  )
}