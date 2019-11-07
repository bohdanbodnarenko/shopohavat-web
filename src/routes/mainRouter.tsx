import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RegisterConnector from "../modules/register/RegisterConnector";
import LoginConnector from "../modules/login/LoginConnector";
import ForgotPassword from "../modules/forgot-password/ForgotPassword";
import Landing from "../modules/landing/Landing";
import AdminConnector from "../modules/admin/AdminConnector";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={RegisterConnector} />
        <Route path="/login" component={LoginConnector} />
        <Route path="/forgot-password/:recoverId" component={ForgotPassword} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/admin" component={AdminConnector} />
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};
