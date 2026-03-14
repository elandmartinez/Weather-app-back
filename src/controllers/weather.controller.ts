import RedisRepository from "../repository/redis.repository";
import config from "../config/config";
import { cleanForecastData } from "../utils/cleanForecastData";

export default class WeatherController {

  private redisRepository = new RedisRepository();

  public async getWeatherForecast(location: string): Promise<any | void> {
    try {
      console.log("Checking cache for weather data...");
      const cachedWeatherForecast = await this.redisRepository.fetchWeatherForecast(location);

      if (cachedWeatherForecast) {
        console.log("Cache hit");
        return {
          message: "Weather data retrieved from cache",
          data: cachedWeatherForecast
        };
      }

      console.log("Cache miss");
      const headers = {
        "Content-Type": "application/json",
      }

      console.log("fetching url", `${config.weather.apiUrl}/${location}?key=${config.weather.apiKey}`);

      const data = await fetch(`${config.weather.apiUrl}/${location}?key=${config.weather.apiKey}&unitGroup=metric`, {
        method: "GET",
        headers
      });
      const rawWeatherData = await data.json();

      let weatherData;
      if (data.ok) {
        weatherData = cleanForecastData(rawWeatherData);
        await this.redisRepository.setWeatherForecast(location, weatherData);
      } else {
        // Fallback or error handling if needed, but for now assuming we return what we got if failed, or just throw
        // If data not ok, we probably shouldn't return success structure, but existing code returned weatherData
        weatherData = rawWeatherData;
      }

      return {
        message: "Weather data fetched successfully",
        data: weatherData
      }

    } catch (error) {
      console.error(error);
      return {
        message: "Internal server error while fetching weather data",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
}
