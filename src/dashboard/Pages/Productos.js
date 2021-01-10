import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ItemProducto from "../Components/ItemProducto";
import { obtenerProductos } from "../../redux/actions/obtenerProductos";
import { obtenerCategorias } from "./../../redux/actions/obtenerCategorias";
import { buscarProductosPorCategoria } from "./../../redux/actions/buscarProductosPorCategoria";
import Loading from "./../../Components/Loading";
const Productos = ({
  dispatch,
  data,
  estado,
  estadoCategorias,
  listaCategorias,
  listaProductos,
  estadoProductos,
  isFetchingCat,
  isFetching,
}) => {
  const [lista, setLista] = useState([]);
  const [estadoFinal, setEstadoFinal] = useState(false);
  useEffect(() => {
    obtenerProductos(dispatch);
    obtenerCategorias(dispatch);
  }, []);
  useEffect(() => {
    setLista(data);

    setEstadoFinal(true);
  }, [estado]);

  //antes era estado

  useEffect(() => {
    setLista(listaProductos);
    setEstadoFinal(true);
  }, [listaProductos]);
  const arrayFilter = (id) => {
    const arrayFiltrado = lista.filter((item) => item.id !== id);
    setLista(arrayFiltrado);
  };

  return (
    <>
      <h1 className="text-center text-white mt-3 ">Productos</h1>
      <hr style={{ background: "#000000", height: "5px" }} />
      <NavLink to="/admin/productos/nuevoproducto">
        <Button className="mt-4">Agregar producto</Button>
      </NavLink>
      <Form>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="mt-4 mb-2"
        >
          <Form.Control
            as="select"
            onChange={(e) => {
              setLista([]);
              buscarProductosPorCategoria(dispatch, e.target.value);
            }}
          >
            <option>Elige una categoria</option>
            {estadoCategorias &&
              listaCategorias.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categoria}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <br />
      <Container>
        <Row>
          {/* {estado &&
            lista.length > 0 &&
            lista.map((item) => (
              <Col md={4} xs={12} lg={4} key={item.id} className="mt-3 mb-3">
                <ItemProducto {...item} arrayFilter={arrayFilter} />
              </Col>
            ))} */}
          {(isFetching || isFetchingCat) && <Loading />}
          {estadoFinal &&
            lista.length > 0 &&
            lista.map((item) => (
              <Col md={4} xs={12} lg={4} key={item.id} className="mt-3 mb-3">
                <ItemProducto {...item} arrayFilter={arrayFilter} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.obtenerProductos.data,
    estado: state.obtenerProductos.estado,
    isFetching: state.obtenerProductos.isFetching,
    listaCategorias: state.listaCategorias.data,
    estadoCategorias: state.listaCategorias.estado,
    listaProductos: state.obtenerProductosPorCategoria.data,
    estadoProductos: state.obtenerProductosPorCategoria.estado,
    isFetchingCat: state.obtenerProductosPorCategoria.isFetching,
  };
};

export default connect(mapStateToProps)(Productos);
