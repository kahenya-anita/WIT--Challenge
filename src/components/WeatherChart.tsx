import React, { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Box from "@material-ui/core/Box/Box";
import { ApexOptions } from "apexcharts";

type WeatherChartProps = {
  //TODO: fix types here
  chartData: any[];
  title?: string;
};

const WeatherChart: FC<WeatherChartProps> = ({ chartData, title }) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      text: title ? title : "Weather Data",
      align: "center",
      style: {
        fontSize: "20px",
        color: "white",
      },
    },
    colors: ["#5465FF", "#333745", "#E63462", "#FF5714", "#7A28CB", "#895B1E"],
    yaxis: {
      labels: {
        style: {
          //   colors: "#fff",
        },
      },
      title: {
        text: "Temperature",
      },
    },
    xaxis: {
      labels: {
        style: {
          //   colors: "#fff",
        },
        minHeight: 30,
      },
      title: {
        text: "Time of Day",
        style: {},
      },
      categories: [
        "12:00 AM",
        "03:00AM",
        "06:00AM",
        "09:00AM",
        "12:00PM",
        "15:00PM",
        "18:00PM",
        "21:00PM",
      ],
    },

    legend: {
      labels: {
        useSeriesColors: true,
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    tooltip: {},
  });

  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      title: {
        ...chartOptions.title,
        text: title,
      },
    });
  }, [title]);

  return (
    <Box
      height="100%"
      width="100%"
      marginBottom="20px"
      marginRight="20px"
      marginLeft="20px"
    >
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="line"
        height={350}
      />
    </Box>
  );
};

export default WeatherChart;
