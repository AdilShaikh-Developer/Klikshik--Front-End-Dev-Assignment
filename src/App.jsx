import React, { useState } from "react";

import {
  Box,
  createTheme,
  CssBaseline,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Carousel from "./pages/Carousel";
import ImageUpload from "./pages/ImageUpload";

import "./stylesheet/app.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box sx={{ pt: 1, pl: 2 }}>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <Typography variant="h6">Dark Mode</Typography>
        </Box>

        <Carousel />
        <ImageUpload />
      </ThemeProvider>
    </div>
  );
};

export default App;
