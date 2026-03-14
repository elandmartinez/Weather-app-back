import express from "express";
import WeatherController from "../controllers/weather.controller";
import { validateForecastParams } from "../middlewares/validateForecastParams";

const router = express.Router();

router.get("/forecast", validateForecastParams, async (req, res) => {
  const weatherController = new WeatherController();
  const location = req.query.location as string;

  try {
    const data = await weatherController.getWeatherForecast(location);

    return res.status(200).json(data);
  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Internal server error while fetching weather data",
      error: error.message
    });
  }
});


export default router;