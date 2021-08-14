import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Error404Page from "./pages/Error404Page";
import { baseURL } from "./utils/authFetch";
import { setAccessToken } from "./utils/token";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const history = useHistory()
  const location = useLocation()
  const [loading, setLoading] = useState(true);

  const { setAuth } = useAuth()

  useEffect(() => {
    const path = location.pathname
    fetch(`${baseURL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(({ ok, message, data }) => {
        if (!ok) {
          console.error(message)
          const next = (path === '/login' || '/signup') ? "" : `/?next=${path}`
          history.replace(`/login${next}`)
        } else {
          if (path === '/login' || '/signup') history.replace('/')
          setAuth(data)
          setAccessToken(data.accessToken)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log("Erorr :", err)
        alert('something went wrong.... try refreshing')
      })
    //eslint-disable-next-line
  }, [history.setAuth])

  if (loading) return <h1>Loading...!</h1>;

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
