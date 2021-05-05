import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorComponent from "./ErrorComponent";

describe("<Error />", () => {
  test("it should mount", () => {
    const error = { status: 200 };
    render(<ErrorComponent error={error} />);
    expect(screen.getByTestId("Error")).toBeInTheDocument();
  });
});
