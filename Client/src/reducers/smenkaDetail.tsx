import actions from '../actions/smenkaDetail';
import {Action} from "../types/action";

export interface Osoba {
    id: string;
    name: string;
}

export interface SmenkaDetail {
    vystavitel: Osoba;
    prvniVlastnik: Osoba;
    soucasniVlastnik: Osoba;
    rad: Osoba[];
}

export default function smenkaDetail(state: SmenkaDetail = {rad: [] as Osoba[]} as SmenkaDetail, action: Action) {
    switch (action.type) {
        case actions.SMENKA_DETAIL_LOAD: {
            return {
                prvniVlastnik: {id: action.payload.id, name: `Osoba ${action.payload.id}`},
                soucasniVlastnik: {id: action.payload.id, name: `Osoba ${action.payload.id}`},
                vystavitel: {id: action.payload.id, name: `Osoba ${action.payload.id}`},
                rad: [{
                    id: action.payload.id, name: `Osoba ${action.payload.id}`
                }, {
                    id: '22', name: `Osoba 22`
                }, {
                    id: action.payload.id, name: `Osoba ${action.payload.id}`
                }]
            };
        }
    }
    return state;
}