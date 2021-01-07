import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../../store/billdetail';
import { RoutesConfig } from '../../config/routes.config';


type props = ReturnType<typeof reducer>
    & typeof actionCreators
    & RouteComponentProps<{ id: string }>;

const BillDetail: React.FC<props> = ({
    billDetail,
    id,
    requestBillDetail
}) => {
    return (
        <section className='section'>
            <div className='container'>
                {billDetail.drawerName}
            </div>
        </section>
    );
};

const mapStateToProps = (state: IApplicationState) => state.billDetail;

export default connect(mapStateToProps, actionCreators)(BillDetail);
