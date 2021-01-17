import React from "react";

import { Switch, Route } from "react-router-dom";

import { Layout } from "antd";

// import CardsNav from "./Components/CardsNav";
import HomePage from "./Pages/Home";
import CardPage from "./Pages/Card";
import AddCardPage from "./Pages/AddCard";
import AddPatientPage from "./Pages/AddPatient";
import AuthPage from "./Pages/Auth";
// import AuthProvider from "./Components/AuthProvider";
import TestPage from "./Pages/Test";
import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  // const [collapsed, setCollapsed] = React.useState(false);
  //
  // const toggle = () => {
  //   setCollapsed(prev => !prev);
  // };

  return (
    <>
      {/*
    <Layout> */}
      {/*<CardsNav collapsed={collapsed} />*/}
      <Router>
        <Switch>
          <PrivateRoute path="/card/:id" exact Component={CardPage} />
          <PrivateRoute path="/add-new-card" Component={AddCardPage} />
          <PrivateRoute path="/add-new-patient" Component={AddPatientPage} />
          <PrivateRoute path="/home" Component={HomePage} />
          <PublicRoute path="/" exact Component={AuthPage} />
          {/*<Route exact path="/card/:id">*/}
          {/*  <CardPage />*/}
          {/*</Route>*/}
          {/*<Route path="/add-new-card">*/}
          {/*  <AddCardPage />*/}
          {/*</Route>*/}
          {/*<Route path="/add-new-patient">*/}
          {/*  <AddPatientPage />*/}
          {/*</Route>*/}
          {/*<Route exact path="/home">*/}
          {/*  <HomePage toggle={toggle} collapsed={collapsed} />*/}
          {/*</Route>*/}
        </Switch>
      </Router>
      {/*</Layout> */}
    </>
  );
};

export default App;
