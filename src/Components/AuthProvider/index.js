import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const qwe = localStorage.getItem("user");
    console.log(qwe);

    if (!qwe) {
      history.push("/");
    } else {
      history.push("/home");
    }
  });

  return children;
};

export default AuthProvider;
