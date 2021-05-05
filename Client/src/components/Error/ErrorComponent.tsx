import { Typography } from "@material-ui/core";
import { ErrorProps } from "@redux-requests/react";
import React from "react";

export default function ErrorComponent({ error }: ErrorProps) {
  if (error.status < 500) {
    return (
      <Typography data-testid="Error" color="error">
        DATA ERROR: {error.body}
      </Typography>
    );
  } else {
    return (
      <Typography data-testid="Error" color="error">
        Please try again later.
      </Typography>
    );
  }
}
