import React from "react";

import { Layout } from "antd";

import AppHeader from "../../Components/Header";
import BooksList from "../../Components/BooksList";

const HomePage = ({ toggle, collapsed }) => {
  return (
    <Layout className="site-layout">
      <AppHeader toggle={toggle} collapsed={collapsed} />
      <BooksList />
    </Layout>
  );
};

export default HomePage;
