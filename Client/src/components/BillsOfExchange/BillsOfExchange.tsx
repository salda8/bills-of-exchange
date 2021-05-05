import { Box } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridPageChangeParams,
  GridRowParams,
  GridRowsProp,
} from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { http } from "../../api/api";
import { BillOfExchange, PagedResult } from "../../models";

const billColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "drawerId", headerName: "Drawer ID", width: 200 },
  { field: "beneficiaryId", headerName: "Beneficiary ID", width: 200 },
  { field: "amount", headerName: "Amount", width: 200 },
];

const BillsOfExchange: React.FC = () => {
  const history = useHistory();
  const [
    billOfExchangeRows,
    setBillOfExchangeRows,
  ] = React.useState<GridRowsProp>([]);
  const [billOfExchangePage, setBillOfExchangePage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);

  useEffect(() => {
    http
      .get("BillsOfExchange", {
        params: { Take: pageSize, Skip: billOfExchangePage * pageSize },
      })
      .then((response) => {
        if (response && response.data) {
          const result = response.data as PagedResult<BillOfExchange>;
          if (result && response.data) {
            setTotalItems(result.pager.totalItems);
            setBillOfExchangeRows(result.content);
          }
        }
        console.log(response);
      });
  }, [billOfExchangePage]);

  const handlePageChange = (params: GridPageChangeParams) => {
    setBillOfExchangePage(params.page);
  };

  function goToDetail(param: GridRowParams) {
    history.push("/bill-of-exchange/" + param.id);
  }

  const pageSize = 5;

  return (
    <Box style={{ height: 400 }} flexGrow={1} data-testid="BillsOfExchange">
      <h2>Bills of Exchange</h2>
      <DataGrid
        rows={billOfExchangeRows}
        columns={billColumns}
        pagination
        pageSize={pageSize}
        rowCount={totalItems}
        paginationMode="server"
        onRowClick={goToDetail}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default BillsOfExchange;
