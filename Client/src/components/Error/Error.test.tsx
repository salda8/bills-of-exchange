import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Error from "./Error";

describe("<Error />", () => {
  test("it should mount", () => {
    render(<Error error={""} />);

    const error = screen.getByTestId("Error");

    expect(error).toBeInTheDocument();
  });
});
