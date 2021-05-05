import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import RenderWithRouter from "../../utils/render-with-router";
import "@testing-library/jest-dom/extend-expect";
import BillsOfExchange from "./BillsOfExchange";

describe("<BillsOfExchange />", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      useParams: jest.fn().mockReturnValue({ id: 1 }),
    }));
  });

  test("it should mount", () => {
    render(
      <Provider store={configureStore()}>
        <RenderWithRouter>
          <BillsOfExchange />
        </RenderWithRouter>
      </Provider>
    );

    const element = screen.getByTestId("BillsOfExchange");

    expect(element).toBeInTheDocument();
  });
});
