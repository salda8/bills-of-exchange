import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";

const Spinner: React.FC = () => {
  return (
    <Box data-testid="Spinner">
      <CircularProgress />
      <Typography>Spinning and working...</Typography>
    </Box>
  );
};

export default Spinner;
