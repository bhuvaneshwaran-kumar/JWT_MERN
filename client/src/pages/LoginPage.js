import React, { useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {

    const history = useHistory()
    const { auth } = useAuth()

    useLayoutEffect(() => {
        if (auth.user) {
            history.push('/')
        }
    }, [])

    return (
        <div>
            LoginPage
        </div>
    )
}

export default LoginPage
