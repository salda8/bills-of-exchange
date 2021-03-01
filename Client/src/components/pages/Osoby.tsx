import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from "react-router-dom";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Jméno', width: 130},
    {field: 'email', headerName: 'Email', width: 130},
];

const rows = [
    {id: 1, name: 'Snow Jon', email: 'test@gmail.com'},
    {id: 2, name: 'Lannister Cersei', email: 'test@gmail.com'},
    {id: 3, name: 'Lannister Jaime', email: 'test@gmail.com'},
    {id: 4, name: 'Stark Arya', email: 'test@gmail.com'},
    {id: 5, name: 'Targaryen Daenerys', email: 'test@gmail.com'},
    {id: 6, name: 'Meli Sandre', email: 'test@gmail.com'},
    {id: 7, name: 'Clifford Ferrara', email: 'test@gmail.com'},
    {id: 8, name: 'Frances Rossini', email: 'test@gmail.com'},
    {id: 9, name: 'Roxie Harvey', email: 'test@gmail.com'},
];

export default function Osoby() {
    let history = useHistory();

    return (
        <div style={{width: '100%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight={true}
                      onRowClick={(param: GridRowParams) => {
                          history.push(`/osoby/${param.getValue('id')}`)
                      }}/>
        </div>
    );
}