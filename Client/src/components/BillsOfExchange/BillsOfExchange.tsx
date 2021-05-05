import { Box } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridPageChangeParams,
  GridRowParams,
} from "@material-ui/data-grid";
import { useQuery } from "@redux-requests/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBills } from "../../api/actions";
import { GET_BILLS } from "../../api/constants";
import { BillOfExchange } from "../../models";
import Spinner from "../Spinner/Spinner";

const billColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "drawerId", headerName: "Drawer ID", width: 200 },
  { field: "beneficiaryId", headerName: "Beneficiary ID", width: 200 },
  { field: "amount", headerName: "Amount", width: 200 },
];

const BillsOfExchange: React.FC = () => {
  const pageSize = 5;
  const dispatch = useDispatch();
  const [billOfExchangePage, setBillOfExchangePage] = React.useState(0);
  const { data, loading } = useQuery({ type: GET_BILLS });
  const history = useHistory();
  const [bills, setBills] = React.useState<BillOfExchange[]>([]);
  const [itemCount, setItemCount] = React.useState(0);

  useEffect(() => {
    dispatch(fetchBills(pageSize, billOfExchangePage * pageSize));
  }, [billOfExchangePage, dispatch]);

  useEffect(() => {
    if (data) {
      setBills(data.content);
      setItemCount(data.pager.totalItems);
    }
  }, [data]);

  const handlePageChange = (params: GridPageChangeParams) => {
    setBillOfExchangePage(params.page);
  };

  function goToDetail(param: GridRowParams) {
    history.push("/bill-of-exchange/" + param.id);
  }

  return (
    <Box style={{ height: 400 }} flexGrow={1} data-testid="BillsOfExchange">
      <h2>Bills of Exchange</h2>
      {!loading ? (
        <DataGrid
          rows={bills}
          columns={billColumns}
          pagination
          page={billOfExchangePage}
          pageSize={pageSize}
          rowCount={itemCount}
          paginationMode="server"
          onRowClick={goToDetail}
          onPageChange={handlePageChange}
        />
      ) : (
        <Spinner />
      )}
    </Box>
  );
};
export default BillsOfExchange;
