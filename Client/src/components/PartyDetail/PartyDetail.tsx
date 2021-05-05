import { Box } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { http } from "../../api/api";
import { BillOfExchange, PartyDto } from "../../models";
import { Wrapper } from "../index";

const billColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "drawerId", headerName: "Drawer ID", width: 200 },
  { field: "beneficiaryId", headerName: "Beneficiary ID", width: 200 },
  { field: "amount", headerName: "Amount", width: 200 },
];

const PartyDetail: React.FC = () => {
  const history = useHistory();
  let { partyId }: any = useParams();

  const [ownedBillsRows, setOwnedBillsRows] = React.useState<GridRowsProp>([]);
  const [issuedBillsRows, setIssuedBillsRows] = React.useState<GridRowsProp>(
    []
  );
  const [partyDetail, setPartyDetail] = React.useState<PartyDto>();

  useEffect(() => {
    http
      .get("BillsOfExchange/owned-by", { params: { ownerId: partyId } })
      .then((groups) => {
        if (groups) {
          const result = groups.data as BillOfExchange[];
          if (result) {
            setOwnedBillsRows(result);
          }
        }
      });
  }, [partyId]);

  useEffect(() => {
    http.get(`Party/${partyId}`).then((groups) => {
      if (groups) {
        const result = groups.data as PartyDto;
        if (result) {
          setPartyDetail(result);
        }
      }
    });
  }, [partyId]);

  useEffect(() => {
    http
      .get("BillsOfExchange/issued-by", { params: { drawerId: partyId } })
      .then((response) => {
        if (response && response.data) {
          const result = response.data as BillOfExchange[];
          if (result) {
            setIssuedBillsRows(result);
          }
        }
      });
  }, [partyId]);

  function goToDetail(param: GridRowParams) {
    history.push(`/bill-of-exchange/${param.id}`);
  }

  return (
    <Wrapper>
      <Box p={1}>
        <h2>Detail of {partyDetail?.name}</h2>
        <Box display="flex" flexDirection="row" p={1} minHeight={400}>
          <Box p={1} flexGrow={1}>
            <h3>Owned bills</h3>
            <DataGrid
              rows={ownedBillsRows}
              columns={billColumns}
              onRowClick={goToDetail}
            />
          </Box>
          <Box p={1} flexGrow={1}>
            <h3>Issued bills</h3>
            <DataGrid
              rows={issuedBillsRows}
              columns={billColumns}
              onRowClick={goToDetail}
            />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default PartyDetail;
