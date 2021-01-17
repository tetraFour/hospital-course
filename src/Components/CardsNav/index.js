import React, { useEffect } from "react";

import { Button, Layout, Menu } from "antd";

import { UserOutlined, BookOutlined } from "@ant-design/icons";

import { ReactComponent as CardLogo } from "../../assets/images/card.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";

import { Link, useHistory } from "react-router-dom";
import { useNotification } from "../../hooks";

const { Sider } = Layout;

const BooksNav = ({ collapsed }) => {
  const history = useHistory();

  const notification = useNotification();

  const [isUser, setIsUser] = React.useState(false);

  useEffect(() => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    if (role === 1) {
      setIsUser(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    history.push("/");
    notification("success", "Успешный выход", `Вы вышли из аккаунта!`);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/home")}
      >
        <CardLogo />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<BookOutlined />}>
          <Link to="/home">Главная</Link>
        </Menu.Item>
        {!isUser && (
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/add-new-patient">Добавить пациента</Link>
          </Menu.Item>
        )}
        <Menu.Item
          key="4"
          icon={<LogoutIcon />}
          style={{ display: "flex", alignItems: "center" }}
        >
          <button className="exit-button" onClick={logoutHandler}>
            Выйти
          </button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default BooksNav;
