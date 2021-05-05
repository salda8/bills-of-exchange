import { Box } from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridPageChangeParams,
  GridRowParams,
  GridRowsProp,
} from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { http } from "../../api/api";
import { useHistory } from "react-router-dom";
import { PagedResult, PartyDto } from "../../models";

const Party: React.FC = () => {
  const history = useHistory();
  const partyColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
  ];
  const [partyRows, setPartyRows] = React.useState<GridRowsProp>([]);
  const [page, setPage] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);

  useEffect(() => {
    http
      .get("Party", { params: { Take: pageSize, Skip: page * pageSize } })
      .then((response) => {
        if (response && response.data) {
          const result = response.data as PagedResult<PartyDto>;
          if (result) {
            setTotalItems(result.pager.totalItems);
            setPartyRows(result.content);
          }
        }
      });
  }, [page]);

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
      <DataGrid
        rows={partyRows}
        columns={partyColumns}
        disableMultipleSelection={true}
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

export default Party;
