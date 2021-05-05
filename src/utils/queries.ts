import { WeatherResult } from "../types/openweather";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;

export const fiveDayWeatherMap = (cordinates: {
  lat: number | null;
  lng: number | null;
}) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cordinates.lat}&lon=${cordinates.lng}&appid=${API_KEY}`
  ).then((res) => res.json());

export const fiveDaysHistorical = (cordinates: { lat: string; lng: string }) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lng}&exclude=hourly,minutely,current&appid=${API_KEY}&cnt=5`
  ).then((res: any) => res.json() as Promise<WeatherResult>);
