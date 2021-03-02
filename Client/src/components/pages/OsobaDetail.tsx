import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@material-ui/data-grid';
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {osobaDetailActions} from "../../actions";


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Název', width: 230},
];

export default function OsobaDetail() {
    const history = useHistory();

    const dispatch = useDispatch();

    const params: any = useParams();

    const smenkyVystavene = useSelector((state: any) => state.osobaDetail.smenkyVystavene);
    const smenkyVlastni = useSelector((state: any) => state.osobaDetail.smenkyVlastni);

    useEffect(() => {
        dispatch({type: osobaDetailActions.OSOBA_DETAIL_LOAD, payload: {id: params.id}});
    }, [dispatch, params]);


    return (
        <div style={{width: '100%'}}>
            <h2>Vystavené</h2>
            <DataGrid rows={smenkyVystavene} columns={columns} pageSize={5} autoHeight={true}
                      onRowClick={(param: GridRowParams) => {
                          history.push(`/smenky/${param.getValue('id')}`);
                      }}/>
            <h2>Vlastní</h2>
            <DataGrid rows={smenkyVlastni} columns={columns} pageSize={5} autoHeight={true}
                      onRowClick={(param: GridRowParams) => {
                          history.push(`/smenky/${param.getValue('id')}`);
                      }}/>
        </div>
    );
}