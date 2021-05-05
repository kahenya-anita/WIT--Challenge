export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherListItem {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  weather: WeatherData[];
  wind: { speed: number; deg: number; gust: number };
}

export interface WeatherResult {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: WeatherListItem[];
}
