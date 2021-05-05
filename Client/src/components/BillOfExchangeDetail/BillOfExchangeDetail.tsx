import { Box, makeStyles } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowParams } from "@material-ui/data-grid";
import { Query } from "@redux-requests/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchBill, fetchEndorsementsForBill } from "../../api/actions";
import { GET_BILL, GET_ENDORSEMENTS_FOR_BILL } from "../../api/constants";
import ErrorComponent from "../Error/ErrorComponent";
import { Wrapper } from "../index";
import Spinner from "../Spinner/Spinner";

const endorsementsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "billId", headerName: "Bill ID", width: 200 },
  {
    field: "previousEndorsementId",
    headerName: "Previous endorsement ID",
    width: 250,
  },
  { field: "newBeneficiary", headerName: "New beneficiary", width: 200 },
];

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    color: "blue",
  },
});

const BillOfExchangeDetail: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  let { billId }: any = useParams();

  useEffect(() => {
    dispatch(fetchEndorsementsForBill(billId));
    dispatch(fetchBill(billId));
  }, [billId, dispatch]);

  function goToDetail(param: GridRowParams) {
    goToPartyDetail(param.row.newBeneficiaryId);
  }

  function goToPartyDetail(id: number | undefined) {
    if (id) {
      history.push(`/party/${id}`);
    }
  }

  return (
    <Wrapper>
      <h2 className="o-shell">Bill of Exchange detail</h2>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        data-testid="BillOfExchangeDetail"
      >
        <h3>Bill detail with current owner</h3>
        <Query
          type={GET_BILL}
          errorComponent={ErrorComponent}
          loadingComponent={Spinner}
          noDataMessage={<p>There is no entity currently.</p>}
        >
          {({ data }) => {
            return (
              <Box p={1} display="flex" flexDirection="column">
                ID: {data.id}
                <span>
                  {" "}
                  Drawer ID:{" "}
                  <span
                    className={classes.root}
                    onClick={() => goToPartyDetail(data.drawerId)}
                  >
                    {data.drawerId}
                  </span>
                </span>
                <span>
                  Beneficiary ID:
                  <span
                    className={classes.root}
                    onClick={() => goToPartyDetail(data.beneficiaryId)}
                  >
                    {data.beneficiaryId}
                  </span>
                </span>
                <span>
                  {" "}
                  Owner Name:{" "}
                  <span
                    className={classes.root}
                    onClick={() => goToPartyDetail(data.ownerId)}
                  >
                    {data.ownerName}
                  </span>
                </span>
              </Box>
            );
          }}
        </Query>
        <Box p={1} style={{ height: 400, width: "100%" }}>
          <h3>Endorsements for bill</h3>
          <Query
            type={GET_ENDORSEMENTS_FOR_BILL}
            errorComponent={ErrorComponent}
            loadingComponent={Spinner}
          >
            {({ data }) => (
              <DataGrid
                rows={data}
                columns={endorsementsColumns}
                onRowClick={goToDetail}
              />
            )}
          </Query>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default BillOfExchangeDetail;
