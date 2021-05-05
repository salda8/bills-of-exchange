import { Box } from "@material-ui/core";
import * as React from "react";
import { Wrapper } from "../../components";
import BillsOfExchange from "../../components/BillsOfExchange/BillsOfExchange";
import Party from "../../components/Party/Party";

export const Home: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Box display="flex" flexDirection="row" p={1} data-testid="home">
        <Box p={1} flexGrow={1}>
          <BillsOfExchange />
        </Box>
        <Box p={1} flexGrow={1}>
          <Party />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Home;
