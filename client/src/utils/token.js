import jwtDecode from 'jwt-decode'

let accessToken = ""

export const getAccessToken = () => accessToken

export const setAccessToken = (token) => {
    accessToken = token
}

export const isTokenExpired = () => {
    const { exp } = jwtDecode(accessToken)
    const isExpaired = Date.now() >= exp * 1000
    return isExpaired
}