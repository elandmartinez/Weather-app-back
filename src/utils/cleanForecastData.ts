import { CleanedWeatherData } from "../types/weather.types";

export const cleanForecastData = (data: any): CleanedWeatherData => {
    // Assuming the raw data structure from Visual Crossing
    // If 'currentConditions' is missing, we use the first day's data or look for it.

    const currentDay = data.days && data.days.length > 0 ? data.days[0] : {};

    // Sometimes current conditions are at top level data.currentConditions
    // If not, we fallback to first day.
    const currentSource = data.currentConditions || currentDay;

    return {
        resolvedAddress: data.resolvedAddress || "",
        timezone: data.timezone || "",
        description: data.description || "",
        currentConditions: {
            temp: currentSource.temp || 0,
            feelslike: currentSource.feelslike || 0,
            humidity: currentSource.humidity || 0,
            windspeed: currentSource.windspeed || 0,
            icon: currentSource.icon || "",
            conditions: currentSource.conditions || "",
            uvindex: currentSource.uvindex || 0,
            precip: currentSource.precip || 0,
            precipProb: currentSource.precipprob || 0 // API often uses 'precipprob'
        },
        days: (data.days || []).map((day: any) => ({
            datetime: day.datetime,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
            temp: day.temp,
            feelslikemax: day.feelslikemax,
            feelslikemin: day.feelslikemin,
            description: day.description,
            icon: day.icon,
            conditions: day.conditions,
            precip: day.precip || 0,
            precipProb: day.precipprob || 0,
            hours: (day.hours || []).map((hour: any) => ({
                datetime: hour.datetime,
                temp: hour.temp,
                icon: hour.icon,
                conditions: hour.conditions,
                precip: hour.precip || 0,
                precipProb: hour.precipprob || 0
            }))
        }))
    };
};
