// const PROXY = 'http://localhost:8080'
// const PROXY = 'https://victoryworld.in'
// In development, use empty string to leverage package.json proxy
// In production, use the full URL
const PROXY = process.env.NODE_ENV === 'production' ? 'https://www.victoryworld.in' : ''

export default PROXY