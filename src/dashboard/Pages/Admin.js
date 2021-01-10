import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { authAdmin } from "../../redux/actions/authAdmin";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
const Admin = ({ dispatch, estado, accion }) => {
  let history = useHistory();

  useEffect(() => {
    authAdmin(dispatch);
    if (accion === true && estado === false) {
      history.push("/admin/login");
    }
  }, [accion]);

  return (
    <>
      <Navbar />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.authAdmin.data,

    estado: state.authAdmin.estado,
    accion: state.authAdmin.accion,
  };
};
export default connect(mapStateToProps)(Admin);
