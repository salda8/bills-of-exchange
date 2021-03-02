import actions from '../actions/smenky';

export default function smenky(state = [], action: any) {
    switch (action.type) {
        case actions.SMENKY_LOAD: {
            return [
                {id: 1, name: 'Snow Jon'},
                {id: 2, name: 'Lannister Cersei'},
                {id: 3, name: 'Lannister Jaime'},
                {id: 4, name: 'Stark Arya'},
                {id: 5, name: 'Targaryen Daenerys'},
                {id: 6, name: 'Meli Sandre'},
                {id: 7, name: 'Clifford Ferrara'},
                {id: 8, name: 'Frances Rossini'},
                {id: 9, name: 'Roxie Harvey'},
            ];
        }
    }
    return state;
}