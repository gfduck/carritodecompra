import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Button, Table, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { obtenerCategorias } from "./../redux/actions/obtenerCategorias";
import { clearCart, removeFromCart } from "./../redux/actions/cart";

const Carrito = ({ dispatch, contador, botonPagar }) => {
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    obtenerCategorias(dispatch);
    if (JSON.parse(localStorage.getItem("cart"))) {
      setLista(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      setLista(JSON.parse(localStorage.getItem("cart")));
    } else {
      setLista([]);
    }
  }, [contador]);
  useEffect(() => {
    setTotal(
      lista.reduce((acc, obj) => {
        return acc + obj.subtotal;
      }, 0)
    );
  }, [lista]);

  const cantidad = (cantidad, itemId) => {
    const newArray = lista.map((item) => {
      if (item.id === itemId) {
        item.cantidad = parseInt(cantidad);

        item.subtotal = parseInt(item.precio * cantidad);
      }
      return item;
    });
    setLista(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  };
  return (
    <Jumbotron fluid style={{ background: "#8b8b8b" }}>
      <Container style={{ padding: "0px" }}>
        <h1 className="text-center text-white" data-testid="tituloCarrito">
          Carrito de compra
        </h1>
        <p className="text-center" style={{ color: "#ebebeb" }}>
          Aca aparecen todos los productos agregados al carrito.
        </p>
        <Table striped bordered responsive variant="dark">
          <thead>
            {lista && lista.length > 0 ? (
              <tr>
                <th>Producto</th>
                <th>#</th>
                <th>$</th>
              </tr>
            ) : (
              <tr>
                <th>No hay ningun producto agregado al carrito</th>
              </tr>
            )}
          </thead>
          <tbody>
            {lista.length > 0 &&
              lista.map((item, index) => (
                <tr className="mt-2 mb-2" key={index}>
                  <td>{item.nombre}</td>
                  <td>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control
                          as="select"
                          style={{ display: "block" }}
                          value={item.cantidad}
                          onChange={(e) => cantidad(e.target.value, item.id)}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    ${item.subtotal}
                    <Button
                      variant="danger"
                      className="float-right"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div
          className="text-center bg-secondary mb-2 text-white"
          style={{ fontSize: "1.5rem" }}
        >
          Total:
          <b style={{ color: "#d3ed70" }} className="text-center ml-1">
            ${total}
          </b>
        </div>
        {lista && lista.length > 0 && (
          <>
            {!botonPagar ? (
              <Button
                className="float-left ml-2"
                variant="success"
                onClick={() => alert("Has hecho click en pagar")}
              >
                Pagar con Mercado Pago
              </Button>
            ) : (
              <NavLink to="/pagar">
                <Button variant="success" className="float-left ml-2">
                  Pagar
                </Button>
              </NavLink>
            )}

            <Button
              variant="info"
              className="float-right mr-2"
              onClick={() => dispatch(clearCart())}
            >
              Vaciar
            </Button>
          </>
        )}
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state) => {
  return {
    contador: state.cartReducer.contador,
  };
};

export default connect(mapStateToProps)(Carrito);
