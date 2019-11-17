import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { reduxConnect } from "../shared/hoc/reduxConnector/reduxConnect";

interface Props {
  isAuth: boolean;
  component: any;
}

const PrivateRoute = ({
  component: Component,
  isAuth,
  ...rest
}: Props & any) => (
  <Route
    {...rest}
    render={props => {
      return isAuth ? <Component {...props} /> : <Redirect to="/login" />;
    }}
  />
);

export default reduxConnect(PrivateRoute, null, ({ auth: { isAuth } }) => ({
  isAuth
})) as any;
