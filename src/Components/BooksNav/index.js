import React from "react";

import { Layout, Menu } from "antd";

import { UserOutlined, PlusOutlined, BookOutlined } from "@ant-design/icons";

import { ReactComponent as CardLogo } from "../../assets/images/card.svg";

import { Link, useHistory } from "react-router-dom";

const { Sider } = Layout;

const BooksNav = ({ collapsed }) => {
  const history = useHistory();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        <CardLogo />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<BookOutlined />}>
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/add-new-patient">Добавить пациента</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default BooksNav;
