import { Link } from "react-router-dom"
import "./Homepage.css"

export default function UserSelector() {
  return (
    <div className="user-selector">
      <Link
        to="/user/12"
        className="user-selector-button"
      >
        User #12 (Karl)
      </Link>
      <Link
        to="/user/18"
        className="user-selector-button"
      >
        User #18 (Cecilia)
      </Link>
    </div>
  )
}