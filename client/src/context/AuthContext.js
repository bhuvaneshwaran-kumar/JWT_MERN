import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

function AuthPovider({ children }) {

    const [auth, setAuth] = useState({ user: null })

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthPovider


// Note. 
// 1. Create_A_Context,
// 2. Provide_A_Context,
// 3. Use_A_Context