import React from "react";

import { Layout, Typography, Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    render: text => <Typography>{text}</Typography>
  },
  {
    title: "Наименование болезни",
    dataIndex: "name",
    key: "name"
  }
];

const data = array => {
  return array.map(order => ({
    id: order.id,
    name: `${order.user.name ? order.user.name : "имени нет"}(логин: ${
      order.user.login
    })`,
    bookName: order.book.name,
    price: `${order.book.price} p.`
  }));
};
const BasketPage = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios("http://localhost:8060/api/orders");
      // console.log(data);
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        width: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Table columns={columns} dataSource={data(orders)} pagination={false} />
    </Layout>
  );
};

export default BasketPage;
