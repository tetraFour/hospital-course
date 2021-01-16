import React from "react";

import { Switch, Route } from "react-router-dom";

import { Layout } from "antd";

import BooksNav from "./Components/BooksNav";
import HomePage from "./Pages/Home";
import CardPage from "./Pages/Card";
import AddCardPage from "./Pages/AddCard";
import AddPatientPage from "./Pages/AddPatient";
const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Layout>
      <BooksNav collapsed={collapsed} />
      <Switch>
        <Route exact path="/card/:id">
          <CardPage />
        </Route>
        <Route path="/add-new-card">
          <AddCardPage />
        </Route>
        <Route path="/add-new-patient">
          <AddPatientPage />
        </Route>
        <Route exact path="/">
          <HomePage toggle={toggle} collapsed={collapsed} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
