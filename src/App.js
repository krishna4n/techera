import {Route, Switch, Redirect} from 'react-router-dom'
import Courses from './component/Courses'
import './App.css'
import CourseItemDetails from './component/CourseItemDetails'
import NotFound from './component/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
