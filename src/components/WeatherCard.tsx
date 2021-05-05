import React, { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    // backgroundColor: "#06162E",
  },
  root: {
    minHeight: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

type WeatherCardProps = {
  temperature: string;
  iconData: string;
  description: string;
  dateString: string;
};

const WeatherCard: FC<WeatherCardProps> = ({
  temperature,
  iconData,
  description,
  dateString,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Box marginBottom="10px">
          <Typography gutterBottom>{dateString}</Typography>
        </Box>
        <Typography
          variant="h5"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {temperature}
        </Typography>
        <Box
          marginTop="10px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img
            src={"http://openweathermap.org/img/w/" + iconData + ".png"}
            alt={description}
          />
          <Typography>{description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
