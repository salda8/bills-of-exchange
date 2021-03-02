import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {osobyActions} from "../../actions";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Jméno', width: 230},
    {field: 'email', headerName: 'Email', width: 230},
];

export default function Osoby() {
    const history = useHistory();

    const dispatch = useDispatch();

    const osoby = useSelector((state: any) => state.osoby);

    useEffect(() => {
        dispatch({type: osobyActions.OSOBY_LOAD});
    }, [dispatch]);


    return (
        <div style={{width: '100%'}}>
            <DataGrid rows={osoby} columns={columns} pageSize={5} autoHeight={true}
                      onRowClick={(param: GridRowParams) => {
                          history.push(`/osoby/${param.getValue('id')}`);
                      }}/>
        </div>
    );
}