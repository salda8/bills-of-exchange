import { Typography } from "@material-ui/core";
import React from "react";

interface Props {
  error: string;
}

export default function Error(props?: Props) {
  if (props) {
    return <Typography data-testid="Error">{props.error}</Typography>;
  } else {
    return (
      <Typography data-testid="Error">
        Error. Please try again later.
      </Typography>
    );
  }
}
