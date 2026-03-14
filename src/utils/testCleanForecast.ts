import { cleanForecastData } from "./cleanForecastData";

const mockRawData = {
    resolvedAddress: "Test Location",
    timezone: "UTC",
    description: "Test Description",
    currentConditions: {
        temp: 20,
        feelslike: 21,
        humidity: 50,
        windspeed: 10,
        icon: "clear-day",
        conditions: "Clear",
        uvindex: 5,
        precip: 0.5,
        precipprob: 20
    },
    days: [
        {
            datetime: "2023-10-27",
            tempmax: 25,
            tempmin: 15,
            temp: 20,
            feelslikemax: 26,
            feelslikemin: 16,
            description: "Sunny",
            icon: "clear-day",
            conditions: "Clear",
            precip: 0.1,
            precipprob: 10,
            hours: [
                {
                    datetime: "12:00:00",
                    temp: 22,
                    icon: "clear-day",
                    conditions: "Clear",
                    precip: 0.0,
                    precipprob: 0
                }
            ]
        }
    ]
};

const cleaned = cleanForecastData(mockRawData);
console.log(JSON.stringify(cleaned, null, 2));

if (cleaned.currentConditions.precip === 0.5 && cleaned.currentConditions.precipProb === 20) {
    console.log("SUCCESS: Precipitation data mapped correctly.");
} else {
    console.error("FAILURE: Precipitation data mapping failed.");
    process.exit(1);
}
