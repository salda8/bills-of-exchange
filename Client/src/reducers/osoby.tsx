import React from "react";
import actions from '../actions/osoby';

export default function osobyReducer(state = [], action: any) {
    switch (action.type) {
        case actions.OSOBY_LOAD: {
            return [
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
        }
    }
    return state;
}