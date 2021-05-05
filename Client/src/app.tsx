import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Switch } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import BillOfExchangeDetail from "./components/BillOfExchangeDetail/BillOfExchangeDetail";
import PartyDetail from "./components/PartyDetail/PartyDetail";
import * as Loadables from "./loadables";
import { Routes } from "./routes";

export const lastVisitedUrlKey = "url";

export const App = hot(() => {
  let lastVisitedUrl = localStorage.getItem(lastVisitedUrlKey);

  return (
    <BrowserRouter>
      {lastVisitedUrl && lastVisitedUrl !== "/" && (
        <Redirect to={lastVisitedUrl!} />
      )}
      <Switch>
        <Route path={Routes.BASE} exact={true} component={Loadables.Home} />
        <Route exact={true} path={Routes.PARTY_DETAIL}>
          <PartyDetail />
        </Route>
        <Route exact={true} path={Routes.BILL_OF_EXCHANGE}>
          <BillOfExchangeDetail />
        </Route>
        <Route component={Loadables.NotFound} />
      </Switch>
    </BrowserRouter>
  );
});
