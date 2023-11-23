import "./DataSourceToast.css"

export default function DataSourceToast({dataSource}) {
  return (
    <div className="data-source-toast">
      Data source: <b>{dataSource}</b>
    </div>
  )
}