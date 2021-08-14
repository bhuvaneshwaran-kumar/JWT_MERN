import React, { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { baseURL } from '../utils/authFetch'
function SignupPage() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { auth } = useAuth();

  useLayoutEffect(() => {
    if (auth.user) {
      history.push("/");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = { username, password, email }
    try {
      const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const { ok, message, data } = await response.json()
      setPassword("")
      if (!ok) {
        return setError(message)
      }
      setEmail('')
      setPassword('')
      setError('Account created... now you can login')
    } catch (err) {
      console.error('Error while signing up', err)
    }
  };

  return (
    <div className="page">
      <h1>SignupPage</h1>
      <form onSubmit={handleSignup} autoComplete="off">
        <div>
          <input
            type="text"
            required
            minLength={3}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            required
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignupPage;
