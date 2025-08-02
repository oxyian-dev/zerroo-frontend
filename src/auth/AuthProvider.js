import Cookies from 'js-cookie';
export const hasRole = (userRoles, roles) => userRoles.filter(role => roles.indexOf(role) > -1).length > 0
export const roleCheck = (userRoles, roles) => !roles || hasRole(userRoles, roles)
export const getAuth = () => Cookies.get('auth')
export const getRoles = () => JSON.parse(localStorage.roles)
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
}
export const isLoggedIn = () => Boolean(getAuth())
export const getUserType = () => localStorage.type;
export const isOrgUser = () => getUserType() === 'Organisation User'
export const isDistributor = () => getUserType() === 'Distributor'
export const clearAuth = () => {
    Cookies.remove('auth')
}
export const getHomePage = type => type || getUserType() === "Distributor" ? "/dashboard" : "/admin"
export const getName = () => {
    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')
    return lastname ? `${firstname} ${lastname}` : firstname
}
export const getAvatar = () => localStorage.getItem('avatar')
export const getUsername = () => localStorage.getItem('username')