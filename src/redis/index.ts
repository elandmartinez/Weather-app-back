import { createClient } from "redis"
import config from "../config/config"

const redisClient = createClient({
  url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
})

async function initRedis () {
  try {
    await redisClient.connect()
    redisClient.on("error", err => console.log("Redis client error", err))
  } catch (error) {
    console.error("Error connecting to Redis:", error)
  }
}

initRedis()

export default redisClient
