import actions from '../actions/smenky';
import {Action} from "../types/action";

export interface Smenka {
    id: string;
    name: string;
}

export default function smenky(state: Smenka[] = [], action: Action) {
    switch (action.type) {
        case actions.SMENKY_LOAD: {
            return [
                {id: 1, name: 'Smenka 1'},
                {id: 2, name: 'Smenka 2'},
                {id: 3, name: 'Smenka 3'},
                {id: 4, name: 'Smenka 4'},
                {id: 5, name: 'Smenka 5'},
                {id: 6, name: 'Smenka 6'},
                {id: 7, name: 'Smenka 7'},
                {id: 8, name: 'Smenka 8'},
                {id: 9, name: 'Smenka 9'},
            ];
        }
    }
    return state;
}