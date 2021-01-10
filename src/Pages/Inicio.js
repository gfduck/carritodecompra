import React, { useEffect } from "react";
import { connect } from "react-redux";
import { productosInicio } from "./../redux/actions/productosInicio";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Loading from "./../Components/Loading";
import { addToCart } from "../redux/actions/cart";
import { NavLink } from "react-router-dom";
const Inicio = ({ dispatch, productos, isFetching, estadoProductos }) => {
  useEffect(() => {
    productosInicio(dispatch);
  }, []);
  return (
    <>
      <Container>
        <Row>
          {isFetching && <Loading />}
          {estadoProductos &&
            productos.length > 0 &&
            productos.map((item) => (
              <Col md={4} key={item.id} className="mt-3 mb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Card.Text>{item.descripcion}</Card.Text>
                    <Card.Text>
                      <b>$ {item.precio}</b>
                    </Card.Text>
                    <Button
                      className="float-left"
                      variant="primary"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...item,
                            subtotal: item.precio,
                            cantidad: 1,
                          })
                        )
                      }
                    >
                      Agregar
                    </Button>
                    <NavLink
                      to={{
                        pathname: `/categoria/${item.nombreCategoria}/${item.nombre}`,
                        item: { ...item },
                      }}
                    >
                      <Button variant="warning" className="mt-1 float-right">
                        Ver más
                      </Button>
                    </NavLink>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productos: state.productosInicioReducer.data,

    isFetching: state.productosInicioReducer.isFetching,
    estadoProductos: state.productosInicioReducer.estado,
  };
};
export default connect(mapStateToProps)(Inicio);
