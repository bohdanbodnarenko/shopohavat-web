import React from "react";
import { Layout, Spin } from "antd";
import { connect } from "react-redux";
import { RouteChildrenProps } from "react-router";

// const { Content } = Layout;

const AdminConnector = ({
  currentProvider
}: // match
RouteChildrenProps & any) => {
  if (!currentProvider) {
    return <Spin />;
  }
  return <Layout>bla</Layout>;
};

const mapStateToProps = ({ auth: { currentProvider } }: any) => ({
  currentProvider
});

export default connect(mapStateToProps)(AdminConnector);
