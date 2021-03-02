import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@material-ui/data-grid';
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {smenkyActions} from "../../actions";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Název', width: 230},
];

export default function Smenky() {
    const history = useHistory();

    const dispatch = useDispatch();

    const smenky = useSelector((state: any) => state.smenky);

    useEffect(() => {
        dispatch({type: smenkyActions.SMENKY_LOAD});
    }, [dispatch]);


    return (
        <div style={{width: '100%'}}>
            <DataGrid rows={smenky} columns={columns} pageSize={5} autoHeight={true}
                      onRowClick={(param: GridRowParams) => {
                          history.push(`/smenky/${param.getValue('id')}`);
                      }}/>
        </div>
    );
}