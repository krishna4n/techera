import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import CourseItem from '../CourseItem'
import './index.css'

class Courses extends Component {
  state = {courseList: [], loadingStatus: 'LOADING'}

  loadingState = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(coursesApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const courses = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      this.setState({
        courseList: courses,
        loadingStatus: this.loadingState.success,
      })
    } else {
      this.setState({
        loadingStatus: this.loadingState.failed,
      })
    }
  }

  renderingFailedView = () => (
    <div className="failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h3 className="failed-heading">Oops! Something Went Wrong</h3>
      <p className="failed-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="failed-button" onClick={this.getApiData}>
        Retry
      </button>
    </div>
  )

  renderingSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="success-view-container">
        <h1 className="heading">Courses</h1>
        <ul className="courses-container">
          {courseList.map(each => (
            <CourseItem key={each.id} course={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderingLoadingView = () => (
    <div className="loading-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  renderingOptions = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case this.loadingState.loading:
        return this.renderingLoadingView()
      case this.loadingState.success:
        return this.renderingSuccessView()
      case this.loadingState.failed:
        return this.renderingFailedView()
      default:
        return ''
    }
  }

  render() {
    const {loadingStatus} = this.state
    console.log(loadingStatus)

    return (
      <div className="container">
        <NavBar />
        {this.renderingOptions()}
      </div>
    )
  }
}

export default Courses
