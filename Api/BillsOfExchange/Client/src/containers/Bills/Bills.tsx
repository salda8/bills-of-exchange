import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../../components';
import { isNullOrUndefined } from '../../utils';
import { IApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { Pagination, BillTable } from './child-components';
import { actionCreators, reducer } from '../../store/bill';
import { RoutesConfig } from '../../config/routes.config';

type BillProps = ReturnType<typeof reducer>
    & typeof actionCreators
    & RouteComponentProps<{ page: string }>;

const BillsData: React.FC<BillProps> = ({
    isLoading,
    bills,
    page,
    requestBill,
    match: {
        params: {
            page: nextStartIndex
        }
    }
}) => {
    useEffect(() => {
        const intStartIndex = page || 1;
        const intNextStartIndex = parseInt(nextStartIndex || '1', 10);

        if (isNullOrUndefined(nextStartIndex) || (intStartIndex !== intNextStartIndex)) {
            requestBill(intNextStartIndex);
        }
    }, [page, nextStartIndex, requestBill]);

    return (
        <section className='section'>
            <div className='container'>
                <h3 className='title is-3'>Fetch Data</h3>
                <div className='box container-box'>
                    <h3 className='title is-4'>Bils</h3>
                    <h5 className='subtitle is-5'>
                        List of Bills
          </h5>
                    <Spinner isLoading={isLoading} />
                    <BillTable bills={bills} />
                    <Pagination page={page} route={RoutesConfig.Bills.path} />
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state: IApplicationState) => state.bills;

export default connect(mapStateToProps, actionCreators)(BillsData);
