import { render, screen } from "@testing-library/react";
import React from "react";
import RenderWithRouter from "../../utils/render-with-router";
import BillsOfExchange from "./BillsOfExchange";

describe("<BillsOfExchange />", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      useParams: jest.fn().mockReturnValue({ id: 1 }),
    }));
  });

  test("it should mount", () => {
    render(
      <RenderWithRouter>
        <BillsOfExchange />
      </RenderWithRouter>
    );

    const element = screen.getByTestId("BillsOfExchange");

    expect(element).toBeDefined();
  });
});
