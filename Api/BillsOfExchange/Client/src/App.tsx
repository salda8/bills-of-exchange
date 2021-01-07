import React, { useEffect } from 'react';
import Layout from './Layout';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { RoutesConfig } from './config/routes.config';
import { ConnectedRouter } from 'connected-react-router';
import { Bills, FetchData, PartyDetail, BillDetail } from './containers';

const App: React.FC<{ history: History }> = ({ history }) => {
  useEffect(() => {
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Layout>
              <Switch>
                  <Route path={RoutesConfig.Bills.pathAbsolute} component={Bills} />
                  <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
                  <Route path={RoutesConfig.PartyDetail.pathAbsolute} component={PartyDetail} />
                  <Route path={RoutesConfig.BillDetail.pathAbsolute} component={BillDetail} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
};

export default hot(App);