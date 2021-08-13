import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <div className="App">
      <Nav />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </div>
  );
}

export default App;
