import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Dropdown, Button, Modal, Form } from "react-bootstrap";
import "./../styles/style.css";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { obtenerCategorias } from "./../redux/actions/obtenerCategorias";
import { auth as authFirebase } from "./../firebase";
import { authUser } from "./../redux/actions/authUser";

const Menu = ({
  dispatch,
  listaCategorias,
  estadoCategorias,
  carrito,
  accion,
  estado,
  isFetchingAuth,
}) => {
  const [lista, setLista] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("demo@demo.com");
  const [pass, setPass] = useState("123456");
  const [nameUser, setNameUser] = useState("");

  let history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerCategorias(dispatch);

    if (JSON.parse(localStorage.getItem("cart"))) {
      setLista(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    setNameUser(JSON.parse(localStorage.getItem("user")));
  }, [nameUser]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="arrowMenu nav-link"
      ref={ref}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span style={{ paddingLeft: "0.5rem", fontSize: "10px" }}>&#x25bc;</span>
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={`${className} drop`}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled " style={{ background: "#FFFFFF" }}>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const ingresar = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await authFirebase.signInWithEmailAndPassword(email, pass);

        localStorage.setItem("user", JSON.stringify(res.user.email));
        setNameUser(res.user.email);
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
    [email, pass]
  );

  // const cerrarsesion = () => {
  //   authFirebase.signOut().then(() => {
  //     history.push("/admin/login");
  //   });
  // };
  useEffect(() => {
    authUser(dispatch);
    // if (accion === true && estado === false) {
    //   history.push("/");
    // }
  }, [accion]);

  const cerrarsesion = () => {
    authFirebase.signOut().then(() => {
      localStorage.removeItem("user");
      history.push("/");
    });
  };
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="menuIndex justify-content-between"
      >
        <Navbar.Brand style={{ color: "#bae01f" }}>E-COMMERCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link link-menu">
              Inicio
            </NavLink>
            <NavLink to="/docs" className=" nav-link link-menu">
              Docs
            </NavLink>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                Productos
              </Dropdown.Toggle>
              {/* 
            <NavLink to="/motos/calle">
                <Dropdown.Item eventKey="1" active>
                  Calle
                </Dropdown.Item>
              </NavLink> */}
              <Dropdown.Menu as={CustomMenu}>
                {/* {estadoCategorias === false && <a>Cargando...</a>} */}
                {estadoCategorias === true ? (
                  listaCategorias.length > 0 &&
                  listaCategorias.map((item) => (
                    <NavLink
                      className="dropdown-item"
                      key={item.id}
                      to={{
                        pathname: `/productos/${item.categoria}`,
                        data: item.id,
                      }}
                    >
                      {item.categoria}
                    </NavLink>
                  ))
                ) : (
                  <Dropdown.Item eventKey="2">Cargando...</Dropdown.Item>
                )}

                {/* <NavLink to="/motos/calle" className="dropdown-item">
                Enduro
              </NavLink> */}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <div
          className="text-center  justify-content-center mr-5"
          style={{ color: "#ffffc6" }}
        >
          Duckwitz Gerardo Federico
        </div>
        {isFetchingAuth === false && estado === true ? (
          <>
            <span className="text-white nav-link link-menu">
              Bienvenido <strong>{nameUser}</strong> !
            </span>
            <button
              className="btn btn-sm btn-dark float-right"
              onClick={() => cerrarsesion()}
            >
              Cerrar sesion
            </button>
          </>
        ) : (
          <Button variant="" onClick={handleShow}>
            Ingresar
          </Button>
        )}
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1 className="text-center">Ingreso</h1>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ingresar}>
            <Form.Group>
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Escribe el Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
              />
              <Form.Text className="text-muted">
                Nunca compartas tus datos de acceso.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Escribe la Contraseña"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listaCategorias: state.listaCategorias.data,
    estadoCategorias: state.listaCategorias.estado,
    carrito: state.cartReducer.cart,
    isFetchingAuth: state.authUser.isFetching,
    estado: state.authUser.estado,
    accion: state.authUser.accion,
  };
};

export default connect(mapStateToProps)(Menu);
