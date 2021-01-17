import React from "react";

import { Layout, Input, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddHousePage = () => {
  const [address, setAddress] = React.useState("");

  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:8060/api/add-house", { address });
    history.push("/home");
  };

  const onChange = e => {
    setAddress(e.target.value);
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
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={address}
          placeholder="адрес"
          style={{ marginBottom: "15px" }}
        />

        <Button type="primary" htmlType="submit">
          добавить
        </Button>
      </form>
    </Layout>
  );
};

export default AddHousePage;
