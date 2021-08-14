import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authFetch, baseURL } from '../utils/authFetch'


function Nav() {

    const history = useHistory()
    const { auth, setAuth } = useAuth()

    const handleLogout = async () => {
        const response = await fetch(`${baseURL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        let { ok, message } = await response.json()
        if (!ok) {
            return alert(`something went wrong... try refreshing.`)
        }
        if (ok) {
            setAuth({ user: null, accessToken: null })
            history.replace('/login')
        }
        console.log('User logged out ')
    }

    if (!auth?.user) {
        return (
            <div>
                <Link className="nav__link" to="/login">Login </Link>
                <Link className="nav__link" to="/signup">
                    Sign Up
                </Link>
            </div>
        )
    }

    return (
        <div className="nav">
            <div>
                <Link className="nav__link" to="/">
                    Home
                </Link>
                <Link className="nav__link" to="/profile">
                    Profile
                </Link>
            </div>
            <div>
                <strong>{auth?.user?.username}</strong>
                <button className="nav__logoutBtn" onClick={handleLogout}> Logout </button>
            </div>

        </div>
    )
}

export default Nav
