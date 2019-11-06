import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegisterConnector from "../modules/register/RegisterConnector";
import LoginConnector from "../modules/login/LoginConnector";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={RegisterConnector} />
        <Route path="/login" component={LoginConnector} />
      </Switch>
    </BrowserRouter>
  );
};
