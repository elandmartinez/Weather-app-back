import redisClient from "../redis/index"
import { CleanedWeatherData, getWeatherForecastResponse } from "../types/weather.types"

const DEFAULT_EXPIRATION = 3600

export default class RedisRepository {

  private async setStringValue(key: string, value: string) {
    await redisClient.set(key, value, { EX: DEFAULT_EXPIRATION })
  }

  private async getStringValue(key: string) {
    const value = await redisClient.get(key)
    return value
  }

  private async setObjectValue<T>(key: string, value: T) {
    await redisClient.set(key, JSON.stringify(value), { EX: DEFAULT_EXPIRATION })
  }

  private async getObjectValue<T>(key: string): Promise<T | null> {
    const value = await redisClient.get(key)
    return value ? JSON.parse(value) : null
  }

  public async fetchWeatherForecast(location: string): Promise<getWeatherForecastResponse | null> {
    try {
      const key = `weather-forecast:${location}`
      return this.getObjectValue<getWeatherForecastResponse>(key)
    } catch (error) {
      console.error("Error fetching weather forecast from Redis:", error)
      return null
    }
  }

  public async setWeatherForecast(location: string, weatherForecast: CleanedWeatherData): Promise<void> {
    try {
      const key = `weather-forecast:${location}`
      await this.setObjectValue(key, weatherForecast)
    } catch (error) {
      console.error("Error setting weather forecast in Redis:", error)
    }
  }

}