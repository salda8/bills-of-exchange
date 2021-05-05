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
import { fetchParties } from "../../api/actions";
import { useHistory } from "react-router-dom";
import { GET_PARTIES } from "../../api/constants";
import Spinner from "../Spinner/Spinner";

const Party: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery({ type: GET_PARTIES });
  const history = useHistory();
  const partyColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
  ];
  const [page, setPage] = React.useState(0);
  const [parties, setParties] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(0);

  useEffect(() => {
    dispatch(fetchParties(pageSize, page * pageSize));
  }, [page, dispatch]);

  useEffect(() => {
    if (data) {
      setParties(data.content);
      setItemCount(data.pager.totalItems);
    }
  }, [data]);

  const handlePageChange = (params: GridPageChangeParams) => {
    setPage(params.page);
  };

  const pageSize = 5;

  function goToDetail(param: GridRowParams) {
    history.push("/party/" + param.id);
  }

  return (
    <Box style={{ height: 400 }} flexGrow={1} data-testid="Party">
      <h2>Parties</h2>
      {!loading ? (
        <DataGrid
          rows={parties}
          columns={partyColumns}
          disableMultipleSelection={true}
          pagination
          page={page}
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
export default Party;
