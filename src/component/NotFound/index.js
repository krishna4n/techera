import './index.css'
import NavBar from '../NavBar'

const NotFound = () => (
  <>
    <NavBar />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h3 className="not-found-heading">Page Not Found</h3>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </>
)

export default NotFound
