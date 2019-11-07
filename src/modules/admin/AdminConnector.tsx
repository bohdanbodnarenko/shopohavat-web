import React from "react";
import { Layout, Spin } from "antd";
import { RouteChildrenProps } from "react-router";
import { reduxConnect } from "../../shared/hoc/reduxConnector/reduxConnect";

// const { Content } = Layout;

const AdminConnector = ({
  currentProvider,
  isAuth,
  ...props
}: // match
RouteChildrenProps & any) => {
  console.log(currentProvider, isAuth);
  if (!currentProvider) {
    return <Spin />;
  }
  return <Layout>bla</Layout>;
};

export default reduxConnect(
  AdminConnector,
  null,
  ({ auth: { isAuth, currentProvider } }: any) => ({ currentProvider, isAuth })
);
