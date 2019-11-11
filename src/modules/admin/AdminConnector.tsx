import React from "react";
import { Layout, Spin } from "antd";
import { RouteChildrenProps, Route, Redirect } from "react-router";
import { reduxConnect } from "../../shared/hoc/reduxConnector/reduxConnect";
import SideBar from "./side-bar/SideBar";

import "./styles.css";
import Products from "./products/Products";

const { Content } = Layout;

const AdminConnector = ({
  currentProvider,
  isAuth,
  match: { path },
  ...props
}: // match
RouteChildrenProps & any) => {
  if (!currentProvider) {
    if (!isAuth) {
      return <Redirect to={"/login"} />;
    }
    return <Spin />;
  }
  return (
    <Layout>
      <SideBar provider={currentProvider} />
      <Content className="admin-content">
        <div className="admin-routes">
          {/*<Route path={`${path}/provider`} component={Provider} />*/}
          <Route path={`${path}/products`} component={Products} />
          {/*<Route*/}
          {/*  path={`${path}/deliveries/:deliveryId`}*/}
          {/*  component={Deliveries}*/}
          {/*/>*/}
        </div>
      </Content>
    </Layout>
  );
};

export default reduxConnect(
  AdminConnector,
  null,
  ({ auth: { isAuth, currentProvider } }: any) => ({ currentProvider, isAuth })
);
