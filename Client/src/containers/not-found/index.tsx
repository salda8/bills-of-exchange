import * as React from "react";
import { Wrapper } from "../../components";

export const NotFound: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <div className="c-not-found">
        404
        <br />
        'Page not found'
      </div>
    </Wrapper>
  );
};

export default NotFound;
