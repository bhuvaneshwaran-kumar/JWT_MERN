import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = useAuth()
    const isAuthenticated = auth?.user?.username ? true : false

    return (
        <Route
            {...rest}
            render={(props) => !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />}
        />
    )
}

export default PrivateRoute
