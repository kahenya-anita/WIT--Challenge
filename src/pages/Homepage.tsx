import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card } from "@material-ui/core";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import moment from "moment";

import { useMutation, useQuery } from "react-query";
import { QUERY_KEYS } from "../constants";
import { WeatherResult } from "../types/openweather";
import WeatherChart from "../components/WeatherChart";
import WeatherCard from "../components/WeatherCard";
import CustomSwitch from "../components/Switch";
import { convertToDegrees } from "../utils";
import { fiveDaysHistorical, fiveDayWeatherMap } from "../utils/queries";

const Homepage = () => {
  const [scale, setScale] = useState<"degrees" | "fahrenheit">("fahrenheit");
  const [chartData, setChartData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any>();
  const [fetchWeather, setFeatchWeather] = useState(false);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [cordinates, setCordindates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    convertData(originalData);
  }, [scale, originalData]);

  const convertData = (data: any) => {
    const cds: { [key: string]: WeatherResult[] } = {};
    data?.list
      .map((item: any) => ({
        ...item,
        dt_txt: item.dt_txt.substring(0, 10),
      }))
      .forEach((w: any) => {
        if (cds[w.dt_txt]) {
          cds[w.dt_txt] = [...cds[w.dt_txt], w];
        } else {
          cds[w.dt_txt] = [w];
        }
      });

    const chartDatas = Object.keys(cds).map((ds) => ({
      //TODO: check types
      data: cds[ds].map((d: any) => convertToDegrees(d.main.temp, scale)),
      name: moment(ds).format("dddd"),
      weather: cds[ds].map((d: any) => d.weather),
    }));

    setChartData(chartDatas);
  };
  //TODO: move to utils

  const fetchLocation = useMutation(
    "FETCH_LOCATION",
    (locationId: string) =>
      fetch(
        "https://findhao.herokuapp.com/api/v1/properties/get_location/" +
          locationId
      ).then((res) => res.json()),
    {
      onSuccess: (data) => {
        setCordindates(data.result.location);
        fetchLatLongData.mutate(data.result.location);
      },
    }
  );

  const fetchLatLongData = useMutation(
    QUERY_KEYS.FETCH_FIVE_DAYS,
    (cordinates: { lat: string; lng: string }) =>
      fiveDaysHistorical(cordinates),
    {
      onSuccess: (data) => {
        setWeeklyData((data as any).daily);
        setFeatchWeather(true);
      },
      onError: (error) => {},
    }
  );

  const { data: weatherData } = useQuery(
    QUERY_KEYS.FIVE_DAYS_MAP,
    () => fiveDayWeatherMap(cordinates),
    {
      onSuccess: (data) => {
        if ((data as any).cod === "404") {
          return;
        }
        setOriginalData(data as any);
        setFeatchWeather(false);
      },
      enabled: fetchWeather,
    }
  );

  return (
    <Box
      height="100vh"
      width="100vw"
      paddingTop="30px"
      paddingLeft="20px"
      paddingRight="20px"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Grid container spacing={3}>
          <Grid item md={12} justify="center" alignItems="center">
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              // marginBottom="20px"
            >
              <Box height="20px" width="300px">
                <GooglePlacesAutocomplete
                  apiOptions={{ language: "en", region: "ke" }}
                  apiKey="AIzaSyCyPbCcESQ995vcU8gGX64clnfhhqh1D6s"
                  selectProps={{
                    placeholder: "Type to search for location",
                    onChange: async (value: any) => {
                      const placeId = value.value.place_id as string;

                      fetchLocation.mutate(placeId);
                    },
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography variant="body1">Fahrenheit</Typography>
              </Box>
              <CustomSwitch
                onChange={(event: any) => {
                  scale === "degrees"
                    ? setScale("fahrenheit")
                    : setScale("degrees");
                }}
                checked={scale === "degrees"}
              />
              <Box>
                <Typography variant="body1">Degrees</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box marginTop="50px">
              <Grid container spacing={2} justify="center">
                {weeklyData.slice(0, 6).map((item, index) => (
                  <Grid key={item.dt} item md={2} xs={12} sm={6}>
                    <WeatherCard
                      dateString={moment.unix(item.dt).format("ddd")}
                      iconData={item.weather[0].icon}
                      description={item.weather[0].description}
                      temperature={convertToDegrees(item.temp.day, scale)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Card>
              <Box>
                {weatherData && !(weatherData as any).message && (
                  <WeatherChart
                    title={weatherData.city.name + " Weather"}
                    chartData={chartData}
                  />
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Homepage;
