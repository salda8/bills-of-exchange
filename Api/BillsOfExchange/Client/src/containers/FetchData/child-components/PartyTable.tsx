import React from 'react';
import { IParty } from '../../../store/party';
import { Link } from 'react-router-dom';
import { RoutesConfig } from '../../../config/routes.config';


type PartyTableProps = Readonly<{
    parties: IParty[];
}>;

const PartyTable = React.memo<PartyTableProps>(({ parties }) => (
  <table className='table is-fullwidth'>
    <thead>
      <tr>
        <th>Id</th>
                <th>Name</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
            {parties.map(({ id, name }) => (
            <tr key={id}>
              <td>{id}</td>
                    <td>{name}</td>
                    <td>
                        <Link className='button is-info' to={`${RoutesConfig.PartyDetail.path}/${id}`}>
                            Detail
                        </Link>
                    </td>
            </tr>
      ))}
    </tbody>
  </table>
));

PartyTable.displayName = 'PartyTable';

export default PartyTable;
