import { Box } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowParams } from "@material-ui/data-grid";
import { Query } from "@redux-requests/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchIssuedBillsBy,
  fetchOwnedBillsBy,
  fetchParty,
} from "../../api/actions";
import {
  GET_ISSUED_BILLS_BY,
  GET_OWNED_BILLS_BY,
  GET_PARTY,
} from "../../api/constants";
import ErrorComponent from "../Error/ErrorComponent";
import { Wrapper } from "../index";
import Spinner from "../Spinner/Spinner";

const billColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "drawerId", headerName: "Drawer ID", width: 200 },
  { field: "beneficiaryId", headerName: "Beneficiary ID", width: 200 },
  { field: "amount", headerName: "Amount", width: 200 },
];

const PartyDetail: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { partyId }: any = useParams();

  useEffect(() => {
    // dispatch(fetchOwnedBillsBy(partyId));
  }, [partyId]);

  useEffect(() => {
    dispatch(fetchParty(partyId));
    dispatch(fetchOwnedBillsBy(partyId));
    dispatch(fetchIssuedBillsBy(partyId));
  }, [partyId, dispatch]);

  useEffect(() => {}, [partyId]);

  function goToDetail(param: GridRowParams) {
    history.push(`/bill-of-exchange/${param.id}`);
  }

  return (
    <Wrapper>
      <Box p={1} data-testid="PartyDetail">
        <Query
          type={GET_PARTY}
          errorComponent={ErrorComponent}
          loadingComponent={Spinner}
          noDataMessage={<p>Nothing to show</p>}
        >
          {({ data }) => <h2>Detail of {data.name}</h2>}
        </Query>
        <Box display="flex" flexDirection="row" p={1} minHeight={400}>
          <Box p={1} flexGrow={1}>
            <h3>Owned bills</h3>
            <Query
              type={GET_OWNED_BILLS_BY}
              errorComponent={ErrorComponent}
              loadingComponent={Spinner}
              noDataMessage={<p>Nothing to show</p>}
            >
              {({ data }) => (
                <DataGrid
                  rows={data}
                  columns={billColumns}
                  onRowClick={goToDetail}
                />
              )}
            </Query>
          </Box>
          <Box p={1} flexGrow={1}>
            <h3>Issued bills</h3>
            <Query
              type={GET_ISSUED_BILLS_BY}
              errorComponent={ErrorComponent}
              noDataMessage={<p>Nothing to show</p>}
            >
              {({ data }) => (
                <DataGrid
                  rows={data}
                  columns={billColumns}
                  onRowClick={goToDetail}
                />
              )}
            </Query>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default PartyDetail;
