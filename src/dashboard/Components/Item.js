import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { actualizar_categoria } from "../../redux/actions/actualizarCategoria";
import ModalBoot from "./ModalBoot";
import { connect } from "react-redux";

const Item = ({
  nombre,
  idCategory,
  arrayFilter,
  estadoActualizar,
  dispatch,
  solounactualizar,
  itemActualizar,
  isFetching,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState(false);
  const [valor, setValor] = useState("");
  const [estadoBoton, setEstadoBoton] = useState("editar");
  const [idActualizar, setIdActualizar] = useState("");
  const agregarInput = () => {
    if (itemActualizar === false) {
      setEstadoBoton("actualizar");
      solounactualizar(true);
      setInput(true);
    }
  };
  const [idCategoria, setIdCategoria] = useState("");

  useEffect(() => {
    setValor(nombre);
  }, [nombre]);

  const actualizarInput = (idCategory) => {
    if (valor) {
      actualizar_categoria(dispatch, valor, idCategory);
      setIdActualizar(idCategory);
    }
  };

  useEffect(() => {
    if (estadoActualizar) {
      setEstadoBoton("editar");
      setInput(false);
      solounactualizar(false);
    }
  }, [estadoActualizar]);

  return (
    <>
      <Card>
        <Card.Img variant="top" />
        <Card.Body>
          {input ? (
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          ) : (
            <Card.Title>{valor}</Card.Title>
          )}
          {estadoBoton === "editar" ? (
            <>
              <Button variant="warning" onClick={agregarInput}>
                Editar
              </Button>
              <Button
                variant="danger"
                className="ml-2"
                onClick={() => {
                  setIdCategoria(idCategory);
                  setShowModal(true);
                }}
              >
                Eliminar
              </Button>
            </>
          ) : isFetching ? (
            <p>Cargando...</p>
          ) : (
            <Button
              variant="info"
              onClick={() => actualizarInput(idCategory)}
              className="mt-3"
            >
              Actualizar
            </Button>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <ModalBoot
          show={true}
          coleccion={"categorias"}
          pass={setShowModal}
          idCategoria={idCategoria}
          arrayFilter={arrayFilter}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    estadoActualizar: state.actualizarCategoria.estado,
    isFetching: state.actualizarCategoria.isFetching,
  };
};
export default connect(mapStateToProps)(Item);
