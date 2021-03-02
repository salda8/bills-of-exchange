import * as React from 'react';
import {useParams, Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {smenkaDetailActions} from "../../actions";
import {Osoba} from "../../reducers/smenkaDetail";

export default function SmenkaDetail() {
    const dispatch = useDispatch();

    const params: any = useParams();

    const prvniVlastnik: Osoba = useSelector((state: any) => state.smenkaDetail.prvniVlastnik);
    const soucasniVlastnik: Osoba = useSelector((state: any) => state.smenkaDetail.soucasniVlastnik);
    const vystavitel: Osoba = useSelector((state: any) => state.smenkaDetail.vystavitel);
    const rad: Osoba[] = useSelector((state: any) => state.smenkaDetail.rad);

    useEffect(() => {
        dispatch({type: smenkaDetailActions.SMENKA_DETAIL_LOAD, payload: {id: params.id}});
    }, [dispatch, params]);


    return (
        <div style={{width: '100%'}}>
            <h2>První vlastník: <Link to={`/osoby/${prvniVlastnik?.id}`}>{prvniVlastnik?.name}</Link></h2>
            <h2>Současní vlastník: <Link to={`/osoby/${soucasniVlastnik?.id}`}>{soucasniVlastnik?.name}</Link></h2>
            <h2>Vystavitel: <Link to={`/osoby/${vystavitel?.id}`}>{vystavitel?.name}</Link></h2>
            <h2>Řad: {rad.map(o => <Link to={`/osoby/${o?.id}`}>{o?.name} &gt; </Link>)}</h2>
        </div>
    );
}