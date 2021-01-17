import React from "react";

import { Layout } from "antd";

import AppHeader from "../../Components/Header";
import CardsList from "../../Components/CardsList";

const HomePage = ({ toggle, collapsed }) => {
  return (
    <Layout className="site-layout">
      <AppHeader toggle={toggle} collapsed={collapsed} />
      <CardsList />
    </Layout>
  );
};

export default HomePage;
