import React, { useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { baseURL } from "../utils/authFetch"
import { setAccessToken } from '../utils/token'

function LoginPage() {
  const location = useLocation();
  const history = useHistory();
  const { auth, setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (!loading) return;
    if (auth?.user) {
      history.push("/");
    } else {
      setLoading(false);
    }
  }, [auth, history, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const payload = { email, password };
    try {
      // api call
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const { ok, message, data } = await response.json()
      if (!ok) {
        setPassword('')
        return setError(message)
      }
      setAuth(data)
      setAccessToken(data.accessToken)

      // redirects to what page did user tries to see first.
      const search = location.search
      if (search) {
        const next = search.split('next=')[1] || '/'
        history.push(next)
      } else {
        history.push('/')
      }


    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="app_Loading">Loading...</h2>;

  return (
    <div className="page">
      <h1>LoginPage</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
