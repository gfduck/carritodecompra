import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { auth as authFirebase } from "./../../firebase";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./../styles/style.css";
import { authAdmin } from "./../../redux/actions/authAdmin";
import { connect } from "react-redux";
const Menu = ({ dispatch, isFetchingAuth, estado, accion }) => {
  let history = useHistory();

  const cerrarsesion = () => {
    authFirebase.signOut().then(() => {
      history.push("/admin/login");
    });
  };
  useEffect(() => {
    authAdmin(dispatch);
    if (accion === true && estado === false) {
      history.push("/admin/login");
    }
  }, [accion]);
  return (
    <>
      <Navbar expand="sm" className="menu">
        <Navbar.Brand style={{ color: "#FFFFFF" }}>
          PANEL DE CONTROL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/admin/docs" className="link nav-link">
              Docs
            </NavLink>
            {isFetchingAuth === false && estado === true ? (
              <NavDropdown
                title={<span className="link">Gestionar</span>}
                id=""
              >
                <NavLink
                  to="/admin/categorias"
                  className="dropdown-item palabralink"
                >
                  Categorias
                </NavLink>
                <NavDropdown.Divider />
                <NavLink
                  to="/admin/productos"
                  className="dropdown-item palabralink"
                >
                  Productos
                </NavLink>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {isFetchingAuth === false && estado === true ? (
            <button
              className="btn btn-sm btn-dark float-right"
              onClick={() => cerrarsesion()}
            >
              Cerrar sesion
            </button>
          ) : (
            <NavLink
              className="btn btn-sm btn-dark float-right"
              to="/admin/login"
            >
              Login
            </NavLink>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isFetchingAuth: state.authAdmin.isFetching,
    estado: state.authAdmin.estado,
    accion: state.authAdmin.accion,
  };
};

export default connect(mapStateToProps)(Menu);
