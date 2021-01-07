import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../../components';
import { isNullOrUndefined } from '../../utils';
import { IApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { Pagination, PartyTable } from './child-components';
import { actionCreators, reducer } from '../../store/party';
import { RoutesConfig } from '../../config/routes.config';

type PartyProps = ReturnType<typeof reducer>
  & typeof actionCreators
  & RouteComponentProps<{ page: string }>;

const FetchData: React.FC<PartyProps> = ({
    isLoading,
    parties,
    page,
  requestParty,
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
        requestParty(intNextStartIndex);
    }
  }, [page, nextStartIndex, requestParty]);

  return (
    <section className='section'>
      <div className='container'>
        <h3 className='title is-3'>Fetch Data</h3>
        <div className='box container-box'>
          <h3 className='title is-4'>Parties</h3>
          <h5 className='subtitle is-5'>
            List of parties
          </h5>
                  <Spinner isLoading={isLoading} />
                  <PartyTable parties={parties} />
                  <Pagination page={page} route={RoutesConfig.FetchData.path} />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IApplicationState) => state.parties;

export default connect(mapStateToProps, actionCreators)(FetchData);
