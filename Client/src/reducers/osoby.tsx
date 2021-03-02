import actions from '../actions/osoby';
import {Action} from "../types/action";

export interface Osoba {
    id: string;
    name: string;
    email: string;
}

export default function osoby(state: Osoba[] = [], action: Action) {
    switch (action.type) {
        case actions.OSOBY_LOAD: {
            return [
                {id: 1, name: 'Osoba 1', email: 'test@gmail.com'},
                {id: 2, name: 'Osoba 2', email: 'test@gmail.com'},
                {id: 3, name: 'Osoba 3', email: 'test@gmail.com'},
                {id: 4, name: 'Osoba 4', email: 'test@gmail.com'},
                {id: 5, name: 'Osoba 5', email: 'test@gmail.com'},
                {id: 6, name: 'Osoba 6', email: 'test@gmail.com'},
                {id: 7, name: 'Osoba 7', email: 'test@gmail.com'},
                {id: 8, name: 'Osoba 8', email: 'test@gmail.com'},
                {id: 9, name: 'Osoba 9', email: 'test@gmail.com'},
            ];
        }
    }
    return state;
}