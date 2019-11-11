import React, { useState } from "react";
import { Icon, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import "./styles.css";

const { Sider } = Layout;

const SideBar = ({ provider }: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      className="slider"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="me" disabled>
          <Icon type="setting" />
          <span className="admin-title">Admin Page</span>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/admin/provider">
            <Icon type="project" />
            <span>{provider.name}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/admin/products">
            <Icon type="appstore" />
            <span>Products</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="deliveries">
          <Link to="/admin/deliveries">
            <Icon type="car" />
            <span>Deliveries</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
