import React from "react";
import { Layout, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useNotification } from "../../hooks";

const styles = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const formStyle = {
  // maxWidth: "600px",
  width: "300px",
  display: "flex",
  flexDirection: "column"
};

const inputStyle = {
  marginBottom: "15px"
};

const AuthPage = () => {
  const history = useHistory();
  const notification = useNotification();

  const [authCred, setAuthCred] = React.useState({
    login: "",
    password: ""
  });

  const onChange = ({ target: { name, value } }) => {
    setAuthCred({ ...authCred, [name]: value });
  };
  const submitHandler = async e => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        "https://hospital-course-backend.herokuapp.com/api/auth/sign-in",
        {
          ...authCred
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      history.push("/home");
      notification("success", "Успешный вход", `Вы вошли как ${data.login}`);
    } catch (e) {
      notification("error", "Ошибка", `Что-то пошло не так!`);
    }

    // console.log(data);
  };

  return (
    <Layout style={styles}>
      <h1>Вход</h1>
      <form style={formStyle} onSubmit={submitHandler}>
        <Input
          style={inputStyle}
          name="login"
          value={authCred.login}
          onChange={onChange}
          placeholder="логин"
        />
        <Input.Password
          style={inputStyle}
          name="password"
          onChange={onChange}
          value={authCred.password}
          placeholder="пароль"
        />
        <Button type="primary" htmlType="submit">
          войти
        </Button>
        {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      </form>
    </Layout>
  );
};

export default AuthPage;
