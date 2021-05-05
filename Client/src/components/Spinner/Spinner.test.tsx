import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Spinner from "./Spinner";

describe("<Spinner />", () => {
  test("it should mount", () => {
    render(<Spinner />);
    expect(screen.getByTestId("Spinner")).toBeInTheDocument();
  });
});
