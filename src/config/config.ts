require("dotenv").config()

const config = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD
  },
  weather: {
    apiUrl: process.env.WEATHER_API_BASE_URL,
    apiKey: process.env.WEATHER_API_KEY
  },
  server: {
    port: process.env.SERVER_PORT
  }
}

export default config

