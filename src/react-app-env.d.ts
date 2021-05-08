declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    readonly REACT_APP_OPEN_WEATHER_API: string;
    readonly REACT_APP_GOOGLE_API_KEY:string
  }
}
