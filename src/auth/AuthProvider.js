import Cookies from 'js-cookie';
export const hasRole = (userRoles, roles) => userRoles.filter(role => roles.indexOf(role) > -1).length > 0
export const roleCheck = (userRoles, roles) => !roles || hasRole(userRoles, roles)

// Get auth token with localStorage fallback for mobile browsers
export const getAuth = () => {
    // Try to get from cookie first (preferred method)
    const cookieAuth = Cookies.get('auth')
    if (cookieAuth) {
        return cookieAuth
    }
    // Fallback to localStorage if cookie is not available (mobile browsers)
    return localStorage.getItem('auth')
}

// Store auth token in localStorage as fallback
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('auth', token)
    }
}

export const getRoles = () => {
    const raw = localStorage.getItem('roles')
    if (!raw) {
        return []
    }
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
    } catch (e) {
        return []
    }
}
export const logout = () => {
    clearAuth()
    clearAuthLocalStorage()
}
export const clearAuthLocalStorage = () => {
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('phone')
    localStorage.removeItem('email')
    localStorage.removeItem('type')
    localStorage.removeItem('roles')
    localStorage.removeItem('avatar')
    localStorage.removeItem('username')
    localStorage.removeItem('auth')
}
export const getUserType = () => localStorage.type;
export const isOrgUser = () => getUserType() === 'Organisation User'
export const isDistributor = () => getUserType() === 'Distributor'
export const clearAuth = () => {
    Cookies.remove('auth')
    Cookies.remove('auth', { path: '/', domain: '.victoryworld.in' })
    Cookies.remove('auth', { path: '/', domain: 'victoryworld.in' })
    Cookies.remove('auth', { path: '/', domain: 'www.victoryworld.in' })
}
export const isLoggedIn = () => {
    const token = getAuth()
    if (token) {
        return true
    }
    // HttpOnly auth cookies are not readable in JS.
    // Use persisted profile fields as a client-side login indicator.
    return Boolean(localStorage.getItem('type') && localStorage.getItem('username'))
}
export const getHomePage = (type = getUserType()) => type === "Distributor" ? "/dashboard" : "/admin"
export const getName = () => {
    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')
    return lastname ? `${firstname} ${lastname}` : firstname
}
export const getAvatar = () => localStorage.getItem('avatar')
export const getUsername = () => localStorage.getItem('username')
