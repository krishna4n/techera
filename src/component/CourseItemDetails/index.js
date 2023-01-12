import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'

class CourseItemDetails extends Component {
  state = {courseDetails: '', loadingStatus: 'LOADING'}

  loadingState = {loading: 'LOADING', success: 'SUCCESS', failed: 'FAILED'}

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    const response = await fetch(courseDetailsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const course = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: course,
        loadingStatus: this.loadingState.success,
      })
    } else {
      this.setState({
        loadingStatus: this.loadingState.failed,
      })
    }
  }

  renderingLoadingView = () => (
    <div className="loading-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  renderingSuccessView = () => {
    const {courseDetails} = this.state
    return (
      <div className="course-view-container">
        <img
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
          className="course-image"
        />
        <div className="course-details">
          <h4 className="course-details-name">{courseDetails.name}</h4>
          <p className="course-description">{courseDetails.description}</p>
        </div>
      </div>
    )
  }

  renderingFailedView = () => (
    <div className="failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
        className="failure-image"
      />
      <h3 className="failed-heading">Oops! Something Went Wrong </h3>
      <p className="failed-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="failed-button" onClick={this.getApiData}>
        Retry
      </button>
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
    return (
      <div className="course-details-container">
        <NavBar />
        {this.renderingOptions()}
      </div>
    )
  }
}

export default CourseItemDetails
