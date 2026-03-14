export interface forecast {
  date: string,
  temperature: number,
  description: string
}

export interface getWeatherForecastParams {
  location?: string,
  date1?: string,
  date2?: string
}

export interface CleanedWeatherData {
  resolvedAddress: string;
  timezone: string;
  description: string;
  currentConditions: {
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    icon: string;
    conditions: string;
    uvindex: number;
    precip: number;
    precipProb: number;
  };
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    feelslikemax: number;
    feelslikemin: number;
    description: string;
    icon: string;
    conditions: string;
    precip: number;
    precipProb: number;
    hours: Array<{
      datetime: string;
      temp: number;
      icon: string;
      conditions: string;
      precip: number;
      precipProb: number;
    }>;
  }>;
}

export interface getWeatherForecastResponse {
  message: string,
  data?: Array<forecast> | CleanedWeatherData
}