import { render, screen } from "@testing-library/react";
import React from "react";
import RenderWithRouter from "../../utils/render-with-router";
import PartyDetail from "./PartyDetail";

describe("<PartyDetail />", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      useParams: jest.fn().mockReturnValue({ id: 1 }),
    }));
  });

  test("it should mount", () => {
    render(
      <RenderWithRouter>
        <PartyDetail />
      </RenderWithRouter>
    );

    const element = screen.getByTestId("PartyDetail");

    expect(element).toBeDefined();
  });
});
