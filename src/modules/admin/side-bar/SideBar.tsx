import React, { useState } from "react";
import { Icon, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import "./styles.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

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
        <Menu.Item key="0" disabled>
          <Icon type="setting" />
          <span className="admin-title">Admin Page</span>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/admin/provider">
            <Icon type="project" />
            <span>{provider.name}</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="products"
          title={
            <span>
              <Icon type="appstore" />
              <span>Products</span>
            </span>
          }
        >
          {/*{displayProviderCategories(data)}*/}
          <Menu.Item key="5">
            <Link to="/admin/products/all">All products</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="deliveries"
          title={
            <span>
              <Icon type="car" />
              <span>Deliveries</span>
            </span>
          }
        >
          <Menu.Item key="6">Delivery 1</Menu.Item>
          <Menu.Item key="8">Delivery 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
