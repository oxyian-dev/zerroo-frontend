// const PROXY = 'http://localhost:8080'
// const PROXY = 'https://victoryworld.in'
// In development, use empty string to leverage package.json proxy.
// In production, use the current site origin so auth cookies stay on the same host.
const PROXY = process.env.NODE_ENV === 'production' ? window.location.origin : ''

export default PROXY
