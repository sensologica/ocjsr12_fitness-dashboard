import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import "./WidgetActivity.css"

function CustomTooltip({active, payload}) {
  // A tooltip becomes active on hover or click, depending on how it's
  // configured with props. The payload array is empty if the tooltip is
  // not active, that's why it's important to check that `active` is true, 
  // otherwise we get an error.
  if (active && payload) {
    const kg = `${payload[0].value} kg`
    const kCal = `${payload[1].value} kCal`
    return (
      <div className="widget-activity__tooltip">
        <div>{kg}</div>
        <div>{kCal}</div>
      </div>
    )
  }
}

export default function WidgetActivity({data}) {
  // We add a `number` property so we can label the ticks of the X-axis with it.
  const dataFormatted = data && data.data.sessions.map((element, index) => {
    return {
      ...element,
      number: index + 1
    }
  })

  // Allows us to wrap legend text in a `<span>` to style it.
  function legendFormatter(value) {
    return <span className="widget-activity__legend-text">{value}</span>
  }
  
  return (
    <div className="widget widget-activity">
      <ResponsiveContainer>
        <BarChart
          data={dataFormatted}
          margin={{
            top: 52,
            right: 20,
            left: 20,
            bottom: 20
          }}
          barSize={7}
          barGap={8}
        >
          <Tooltip 
            // We instruct the Tooltip component to use our custom tooltip.
            content={<CustomTooltip />}
          />
          <CartesianGrid
            vertical={false}
            strokeDasharray="2"
          />
          <Bar
            dataKey="kilogram"
            name="Poids (kg)"
            shape={<Rectangle radius={[100, 100, 0, 0]} />} // Rounds corners.
            fill="#282D30"
          />
          <Bar
            dataKey="calories"
            name="Calories brûlées (kCal)"
            shape={<Rectangle radius={[100, 100, 0, 0]} />} // Rounds corners.
            fill="#E60000"
            yAxisId={1} // Links these bars with the Y-axis for calories.
          />
          <XAxis
            dataKey="number"
            tickLine={false}
            tickMargin={10}
          />
          <YAxis 
            dataKey="kilogram"
            orientation="right"
            tickCount={3}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tickMargin={30}
            domain={["auto", "auto"]}
          />
          {/* 
            We create a second Y-axis with a unique ID and use this ID to link
            the calories bars with this axis. This is so we can scale the
            calories bars to fit alongside the kilograms bars, otherwise they
            go out of bounds. In other words, we have two Y-axes, one for each
            type of data, and this automatically scales all bars to fit on one
            graph without overflowing. We hide the Y-axes for the calories so
            only the kilograms axis is visible on the final graph.
           */}
          <YAxis
            dataKey="calories"
            yAxisId={1}
            hide={true}
          />
          <Legend 
            align="right"
            verticalAlign="top"
            iconSize={8}
            iconType="circle"
            wrapperStyle={{
              top: 16
            }}
            formatter={legendFormatter}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="widget__label">Activité quotidienne</div>
    </div>
  )
}