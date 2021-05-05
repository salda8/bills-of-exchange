import { Box, makeStyles } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { http } from "../../api/api";
import { BillOfExchangeWithCurrentOwner, Endorsement } from "../../models";
import Error from "../Error/Error";
import { Wrapper } from "../index";

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
  const classes = useStyles();
  const history = useHistory();
  let { billId }: any = useParams();
  const [
    billEndorsements,
    setBillEndorsementsRows,
  ] = React.useState<GridRowsProp>([]);
  const [
    ownedBill,
    setOwnedBill,
  ] = React.useState<BillOfExchangeWithCurrentOwner>();

  useEffect(() => {
    http.get("Endorsements", { params: { BillId: billId } }).then(
      (response) => {
        if (response && response.data) {
          const result = response.data as Endorsement[];
          if (result) {
            setBillEndorsementsRows(result);
          }
        }
      },
      (x) => console.log(x)
    );
  }, [billId]);

  useEffect(() => {
    http.get(`BillsOfExchange/${billId}`).then((response) => {
      if (response && response.data) {
        const result = response.data as BillOfExchangeWithCurrentOwner;
        if (result) {
          setOwnedBill(result);
        }
      }
    });
  }, [billId]);

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
        {ownedBill ? (
          <Box p={1} display="flex" flexDirection="column">
            ID: {ownedBill.id}
            <span>
              {" "}
              Drawer ID:{" "}
              <span
                className={classes.root}
                onClick={() => goToPartyDetail(ownedBill.drawerId)}
              >
                {ownedBill.drawerId}
              </span>
            </span>
            <span>
              {" "}
              Beneficiary ID:{" "}
              <span
                className={classes.root}
                onClick={() => goToPartyDetail(ownedBill.beneficiaryId)}
              >
                {ownedBill.beneficiaryId}
              </span>
            </span>
            <span>
              {" "}
              Owner Name:{" "}
              <span
                className={classes.root}
                onClick={() => goToPartyDetail(ownedBill.ownerId)}
              >
                {ownedBill.ownerName}
              </span>
            </span>
          </Box>
        ) : (
          <Error error="ERROR: Data for this bill are either invalid or missing" />
        )}
        <Box p={1} style={{ height: 400, width: "100%" }}>
          <h3>Endorsements for bill</h3>
          <DataGrid
            rows={billEndorsements}
            columns={endorsementsColumns}
            onRowClick={goToDetail}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default BillOfExchangeDetail;
