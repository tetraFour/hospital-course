import React, { useEffect } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { Layout, Button, Input } from "antd";
import { useNotification } from "../../hooks";

const AddAuthorPage = () => {
  const history = useHistory();

  const [data, setData] = React.useState({
    name: "",
    password: "",
    age: "",
    email: "",
    address: "",
    login: ""
  });

  const notification = useNotification();

  const onChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    if (role === 1) {
      history.push("/home");
    }
  }, [history]);

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/user/create-user", data);
      data.name = "";
      data.password = "";
      data.age = "";
      data.email = "";
      data.address = "";
      data.login = "";
      notification(
        "success",
        "Пациент создан",
        "Пациент и карта пациента успешно созданы"
      );
      history.push("/home");
    } catch (error) {}
  };

  return (
    <Layout
      className="site-layout"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: "600px" }}>
        <Input
          onChange={onChange}
          value={data.name}
          name="name"
          placeholder="имя пациента"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.email}
          name="email"
          placeholder="электронная почта"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.password}
          name="password"
          placeholder="пароль"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.login}
          name="login"
          placeholder="логин"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.address}
          name="address"
          placeholder="адрес"
          style={{ marginBottom: "15px" }}
        />
        <Input
          onChange={onChange}
          value={data.age}
          name="age"
          placeholder="возраст пациента"
          style={{ marginBottom: "15px" }}
        />
        <Button type="primary" htmlType="submit">
          добавить
        </Button>
      </form>
    </Layout>
  );
};

export default AddAuthorPage;
