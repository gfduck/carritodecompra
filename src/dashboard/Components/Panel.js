import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { withRouter } from "react-router-dom";
import Upload from "./Upload";
import { Provider } from "react-redux";
import store from "./redux/store";
const Panel = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      console.log("existe usuario");
    } else {
      props.history.push("/login");
      console.log("no existe usuario");
    }
  }, []);

  return <Provider store={store}></Provider>;
};
export default withRouter(Panel);
