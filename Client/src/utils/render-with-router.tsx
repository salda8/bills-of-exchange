import React from "react";
import { MemoryRouter } from "react-router-dom";

const RenderWithRouter = ({ children }: any) => (
  <MemoryRouter initialEntries={["uri"]}>{children}</MemoryRouter>
);

export default RenderWithRouter;
