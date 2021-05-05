import { render, screen } from "@testing-library/react";
import React from "react";
import RenderWithRouter from "../../utils/render-with-router";
import Party from "./Party";

describe("<Party />", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      useParams: jest.fn().mockReturnValue({ id: 1 }),
    }));
  });

  test("it should mount", () => {
    render(
      <RenderWithRouter>
        <Party />
      </RenderWithRouter>
    );

    const element = screen.getByTestId("Party");

    expect(element).toBeDefined();
  });
});
