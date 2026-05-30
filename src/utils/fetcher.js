import PROXY from "./proxy"
import Cookies from 'js-cookie';

const fetcher = (url, options) => {
    const update = {...options}
    update.headers = {
        ...update.headers
    }
    update.credentials = 'include'
    update.mode = 'cors'
    
    // Always send explicit bearer token when available.
    // Backend prioritizes this over cookie to avoid cross-role auth conflicts.
    const localStorageAuth = localStorage.getItem('auth')
    if (localStorageAuth && !update.headers['Authorization']) {
        update.headers['Authorization'] = `Bearer ${localStorageAuth}`
    }
    
    return fetch(PROXY + url, update).then(async (response) => {
        if ((response.status === 401 || response.status === 403) && update.headers['Authorization']) {
            const retryUpdate = {
                ...update,
                headers: {
                    ...update.headers
                }
            }
            delete retryUpdate.headers['Authorization']
            localStorage.removeItem('auth')
            return fetch(PROXY + url, retryUpdate)
        }
        return response
    })
}
export default fetcher;
