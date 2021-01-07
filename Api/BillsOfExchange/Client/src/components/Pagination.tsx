import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PaginationProps = Readonly<{
    page?: number;
    route: string;
}>;

const Pagination = React.memo<PaginationProps>(({ route, page = 1 }) => (
    <p className='buttons pagination-group'>
        <Link className='button is-info' to={`${route}/${page > 1 ? page - 1 : 1}`}>
            <FontAwesomeIcon icon='angle-double-left' size='2x' />
        </Link>
        <Link className='button is-info' to={`${route}/${page + 1}`}>
            <FontAwesomeIcon icon='angle-double-right' size='2x' />
        </Link>
    </p>
));

Pagination.displayName = 'Pagination';

export default Pagination;