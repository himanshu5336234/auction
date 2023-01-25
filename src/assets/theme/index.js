const { createTheme } = require("@mui/material");

let theme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      // main:"#007bff"
      main: "rgba(25,79,125,.9)",
      light: "rgb(95 122 179 / 22%)",
      danger:"#dc3545",
      success:"#28a745",
      warning:"#ffc107"
    },
    Text: {
      main: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
  // palette: {
  //   mode: "light",
  //   palette: {
  //     primary: "#ff4400",
  //   },
  //   text: {
  //     primary: "#000"
  //   },
  //   common: {
  //     subTitleColor: "#5B86E5",
  //     labelColor: "#BDBDBD",
  //     borderColor: "#101010",
  //     inputbackground: "#4f4f4f40",
  //     viewBtnBorder: "#e6ebf1",
  //     disabledText: "#FCFCFC"
  //   }
  // },

  typography: {
    color:"rgba(25,79,125,.9)",
    fontFamily: "'Overpass',sans-serif",

    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      letterSpacing: "-0.24px",
      lineHeight: "3rem",
      color: "#fff",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      letterSpacing: "-0.24px",
      lineHeight: "3rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "-0.06px",
      lineHeight: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      letterSpacing: "-0.06px",
      lineHeight: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "-0.05px",
      lineHeight: "24px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "-0.05px",
      lineHeight: "1.5rem",
    },
  },

  error: {
    main: "#F46151",
  },
  cardshadow:
    "0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)",
});

export default theme;
