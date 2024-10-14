import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();

  const fetchImages = async (limit = 5) => {
    // here I'm using jsonplaceholder's fake api for images, we can replace this with "/images" if we have an backend api
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=" + limit
    );
    const data = await response.json();

    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Color's Carousel
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {images.length === 0 ? (
          <CircularProgress />
        ) : (
          <Box
            component="img"
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            sx={{
              objectFit: "cover",
              aspectRatio: "1/1",
              width: "min(90vw, 200px)",
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "min(90vw, 200px)",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            sx={{
              width: "48%",
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === images.length - 1}
            sx={{
              width: "48%",
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          height: "30vh",
          width: "100%",
        }}
      >
        {images.map((image, index) => (
          <Box
            component="img"
            key={image.id}
            src={image.url}
            alt={image.title}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: "10vmin",
              opacity: currentIndex === index ? 1 : 0.5,
              transition: "all 0.2s ease-in-out",
              cursor: "pointer",
              transform: currentIndex === index ? "scale(1.2)" : "none",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
