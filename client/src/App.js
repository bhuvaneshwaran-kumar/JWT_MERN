import { Redirect, Route, Switch } from 'react-router-dom'

import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Error404Page from './pages/Error404Page'

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/profile" exact component={ProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/404" component={Error404Page} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
