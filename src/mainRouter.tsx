import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegisterConnector from "./modules/register/RegisterConnector";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={RegisterConnector} />
      </Switch>
    </BrowserRouter>
  );
};
