import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";

const Landing = () => {
  return (
    <div>
      <Menu>
        <MenuItem>
          <Link to={"/admin"}>admin</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/login"}>login</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/register"}>register</Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/forgot-password"}>forgot-password</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Landing;
