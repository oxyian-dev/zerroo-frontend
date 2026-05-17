import PROXY from "./proxy"
import Cookies from 'js-cookie';

const fetcher = (url, options) => {
    const update = {...options}
    update.headers = {
        ...update.headers
    }
    update.credentials = 'include'
    update.mode = 'cors'
    
    // Add Authorization header if cookie is not available (mobile browsers)
    const cookieAuth = Cookies.get('auth')
    if (!cookieAuth) {
        const localStorageAuth = localStorage.getItem('auth')
        if (localStorageAuth) {
            update.headers['Authorization'] = `Bearer ${localStorageAuth}`
        }
    }
    
    return fetch(PROXY + url, update)
}
export default fetcher;