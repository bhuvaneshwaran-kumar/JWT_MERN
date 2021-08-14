import { getAccessToken, setAccessToken, isTokenExpired } from './token'

export const baseURL = process.env.REACT_APP_NODE_ENV === 'production' ? '' : process.env.REACT_APP_API_URL


export const authFetch = async (url, options = {}) => {
    if (isTokenExpired()) {
        console.log('Token Expaired')

        try {
            const response = await fetch(`${baseURL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            })
            const { ok, message, data } = await response.json()
            if (!ok) {
                console.log(message)
                alert('some thing went wrong try loggind in again')
            } else {
                setAccessToken(data.accessToken)
            }
        }
        catch (err) {
            console.log("Error :", err)
            alert('some thing went wrong try loggind in again')
        }
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'authorization': `Bearer ${getAccessToken()}`
        }
    })

}