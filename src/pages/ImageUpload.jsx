import {
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState({});

  const theme = useTheme();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      alert("Only image files are allowed!");
    }

    setSelectedFiles(validFiles);
  };

  const handleUpload = () => {
    selectedFiles.forEach((file, index) => {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress((prevProgress) => ({
            ...prevProgress,
            [index]: percentCompleted,
          }));
        }
      };

      xhr.open("POST", "/upload");

      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadedFiles((prevUploaded) => [...prevUploaded, file]);
          setSelectedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
          );
        }
      };

      xhr.send(formData);
    });
  };

  const togglePauseResume = (index) => {
    setIsPaused((prevPaused) => ({
      ...prevPaused,
      [index]: !prevPaused[index],
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4">Image Uploader</Typography>

      <Box>
        <input
          accept="image/*"
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" sx={{ m: 1 }}>
            Select Images
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isUploading || selectedFiles.length === 0}
          sx={{ m: 1 }}
        >
          Upload Files
        </Button>
      </Box>

      <Typography variant="h6">Selected Files</Typography>
      <List>
        {selectedFiles.map((file, index) => (
          <ListItem key={index}>
            {file.name} - {progress[index] || 0}%
            <LinearProgress
              variant="determinate"
              value={progress[index] || 0}
            />
            <Button onClick={() => togglePauseResume(index)}>
              {isPaused[index] ? "Resume" : "Pause"}
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6">Uploaded Files</Typography>
      <List>
        {uploadedFiles.map((file, index) => (
          <ListItem key={index}>{file.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ImageUpload;
