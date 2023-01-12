import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {course} = props
  return (
    <li>
      <Link to={`/courses/${course.id}`}>
        <div className="course-item-container">
          <img src={course.logoUrl} alt={course.name} className="course-logo" />
          <p className="course-name">{course.name}</p>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem
