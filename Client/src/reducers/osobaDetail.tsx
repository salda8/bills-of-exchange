import actions from '../actions/osobaDetail';
import {Action} from "../types/action";

export interface Smenka {
    id: string;
    name: string;
}

export interface OsobaDetail {
    smenkyVystavene: Smenka[];
    smenkyVlastni: Smenka[];
}

export default function osoby(state: OsobaDetail = {smenkyVystavene: [], smenkyVlastni: []}, action: Action) {
    switch (action.type) {
        case actions.OSOBA_DETAIL_LOAD: {
            return {
                smenkyVystavene: [
                    {id: action.payload.id, name: `Smenka ${action.payload.id}`},
                    action.payload.id !== '2' ? {id: 2, name: 'Smenka 2'} : {id: 3, name: 'Smenka 3'},
                ],
                smenkyVlastni: [
                    {id: action.payload.id, name: `Smenka ${action.payload.id}`}
                ]
            };
        }
    }
    return state;
}