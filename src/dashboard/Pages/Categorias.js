import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { obtenerCategorias } from "../../redux/actions/obtenerCategorias";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../Components/Item";
import Loading from "./../../Components/Loading";

const Categorias = ({ dispatch, listaCategorias, estadoCategorias }) => {
  const [lista, setLista] = useState([]);
  const [itemActualizar, setItemActualizar] = useState(false);

  useEffect(() => {
    obtenerCategorias(dispatch);
  }, []);
  useEffect(() => {
    setLista(listaCategorias);
  }, [estadoCategorias]);
  const arrayFilter = (id) => {
    const arrayFiltrado = lista.filter((item) => item.id !== id);
    setLista(arrayFiltrado);
  };
  const solounactualizar = (valor) => {
    setItemActualizar(valor);
  };
  return (
    <>
      <h1 className="text-center text-dark mt-3">Categorias</h1>
      <hr style={{ background: "#000000", height: "5px" }} />
      <Container>
        <NavLink to="/admin/categorias/nuevacategoria">
          <Button className="mt-4 mb-3">Agregar Categoria</Button>
        </NavLink>
        {!estadoCategorias && <Loading />}
        <Row>
          {estadoCategorias &&
            lista.length > 0 &&
            lista.map((item) => (
              <Col md={4} xs={12} lg={3} key={item.id} className="mt-2 mb-2">
                <Item
                  nombre={item.categoria}
                  idCategory={item.id}
                  arrayFilter={arrayFilter}
                  solounactualizar={solounactualizar}
                  itemActualizar={itemActualizar}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listaCategorias: state.listaCategorias.data,
    estadoCategorias: state.listaCategorias.estado,
  };
};

export default connect(mapStateToProps)(Categorias);
