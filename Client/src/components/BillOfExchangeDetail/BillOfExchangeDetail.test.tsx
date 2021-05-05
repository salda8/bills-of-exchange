import { render, screen } from "@testing-library/react";
import React from "react";
import RenderWithRouter from "../../utils/render-with-router";
import BillOfExchangeDetail from "./BillOfExchangeDetail";

describe("<BillOfExchangeDetail />", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      useParams: jest.fn().mockReturnValue({ id: 1 }),
    }));
  });

  test("it should mount", () => {
    render(
      <RenderWithRouter>
        <BillOfExchangeDetail />
      </RenderWithRouter>
    );

    const element = screen.getByTestId("BillOfExchangeDetail");

    expect(element).toBeDefined();
  });
});
