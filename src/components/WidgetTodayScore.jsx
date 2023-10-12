import * as d3 from "d3"
import "./WidgetTodayScore.css"

export default function WidgetTodayScore({value}) { 
  const valueFormatted = value ? `${value * 100}%` : null

  const viewBoxSize = 350

  const arcInnerRadius = 125
  const arcOuterRadius = 140
  const arcCornerRadius = (arcOuterRadius - arcInnerRadius) / 2

  const arc = d3.arc()
    .innerRadius(arcInnerRadius)
    .outerRadius(arcOuterRadius)
    .startAngle(0)
    .endAngle(- 2 * Math.PI * (value ? value : null))
    .cornerRadius(arcCornerRadius)

  return (
    <div className="widget-today-score">
      <svg height="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <g>
          <circle
            r={arcInnerRadius}
            cx="50%"
            cy="50%"
            fill="#FFFFFF"
          />
          <path
            className="widget-today-score__arc"
            d={arc()}
            transform={`translate(${viewBoxSize / 2} ${viewBoxSize / 2})`}
          />
        </g>
      </svg>
      <div className="widget-today-score__label">Score</div>
      <div className="widget-today-score__text">
        <p className="widget-today-score__percentage">{valueFormatted}</p>
        <p className="widget-today-score__description">de votre objectif</p>
      </div>
    </div>
  )
}