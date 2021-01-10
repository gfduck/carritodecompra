import React from "react";
import { Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCategoria } from "../../Utils/schema";
import { agregar_categoria } from "../../redux/actions/gestionarCategorias";
import { connect } from "react-redux";
import ModalBootstrap from "../Components/ModalBootstrap";
/*  librerias para hacer las validaciones
    npm i react-hook-form
    yup genera un esquema consistente para poder validar en le front
    npm i @hookform/resolvers yup
    --Nota: el esquema de valildacón es propio de un componente */
//{ isFetchingModal, dispatch }
const NuevaCategoria = ({
  dispatch,
  isFetchingModalCategoria,
  error,
  estadoCategoria,
}) => {
  const { register, handleSubmit, errors, reset, estado } = useForm({
    resolver: yupResolver(schemaCategoria),
  });

  const registro = (objeto) => {
    console.log("registro es, ", objeto);
    agregar_categoria(dispatch, objeto);
    reset({
      categoria: "",
    });
  };

  return (
    <>
      <h1 className="text-center text-dark mt-3">Nueva Categoria</h1>
      <hr style={{ background: "#000000", height: "5px" }} />
      <br />
      {estadoCategoria && (
        <Alert variant={"success"}>Se guardo una categoria!</Alert>
      )}
      <Form onSubmit={handleSubmit(registro)}>
        <Form.Group controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre Categoria"
            name="categoria"
            ref={register}
          />
          <Form.Text className="text-muted">Nombre de la categoria.</Form.Text>
          {errors.categoria && (
            <Form.Text className="alert alert-danger">
              {errors.categoria?.message}
            </Form.Text>
          )}
        </Form.Group>
        <button
          type="submit"
          className="btn btn-success mx-auto d-block mt-3 mb-3 btn-block"
        >
          Guardar
        </button>
      </Form>

      {isFetchingModalCategoria && <ModalBootstrap show={true} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetchingModalCategoria: state.agregarCategoria.isFetchingModalCategoria,
    error: state.agregarCategoria.error,
    estadoCategoria: state.agregarCategoria.estado,
  };
};
export default connect(mapStateToProps)(NuevaCategoria);
