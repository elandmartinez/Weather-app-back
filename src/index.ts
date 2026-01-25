import express from "express"
import config from "./config/config"
import redisClient from "./redis/index"

const app = express()

app.get("/", async (req, res) => {
  try {
    await redisClient.set("test-key", "Bip bop boop")
    res.send("Hello World, this is my redis server!")

  } catch (error) {
    console.error("Error setting Redis key:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.get("/redis-test", async (req, res) => {
  try {
    const initialTestValue = await redisClient.get("test-key")
    res.send(`Initial test value from Redis: ${initialTestValue}`)

  } catch (error) {
    console.error("Error getting Redis key:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(config.server.port, () => {
  console.log(`Bip bop, Server is running on port ${config.server.port}`)
})    