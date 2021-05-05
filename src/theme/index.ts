import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

export const theme: ThemeOptions = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3359DF",
      light: "#0A27A2",
    },
    secondary: {
      main: "#F2B460",
    },
    success: {
      main: "#53C696",
    },
    error: {
      main: "#EF7359",
    },
    info: {
      main: "#64C2F0",
    },
    warning: {
      main: "#F2B460",
    },
    background: {
      default: "#EBF0FE",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
  props: {
    MuiAppBar: {
      color: "secondary",
    },
    MuiTextField: {},
    MuiCard: {
      color: "red",
    },
    MuiCardContent: {
      color: "red",
    },
  },
});
