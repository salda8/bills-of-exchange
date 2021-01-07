import React from 'react';
import { IBill } from '../../../store/bill';
import { Link } from 'react-router-dom';
import { RoutesConfig } from '../../../config/routes.config';


type BillTableProps = Readonly<{
    bills: IBill[];
}>;

const BillTable = React.memo<BillTableProps>(({ bills }) => (
    <table className='table is-fullwidth'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Amount</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody>
            {bills.map(({ id, amount }) => (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{amount}</td>
                    <td>
                        <Link className='button is-info' to={`${RoutesConfig.BillDetail.path}/${id}`}>
                            Detail
                        </Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
));

BillTable.displayName = 'BillTable';

export default BillTable;
