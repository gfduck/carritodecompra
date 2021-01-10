import React, { useEffect, useState, useRef } from "react";
// import { storage } from "../firebase";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import useCustomForm from "../Services/useCustomForm";
import { schema } from "./../../Utils/schema";
import { connect } from "react-redux";
import { agregar_producto } from "./../../redux/actions/gestionarProductos";
import { obtenerCategorias } from "./../../redux/actions/obtenerCategorias";
import ModalBootstrap from "./ModalBootstrap";
/*  librerias para hacer las validaciones
    npm i react-hook-form
    yup genera un esquema consistente para poder validar en le front
    npm i @hookform/resolvers yup
    --Nota: el esquema de valildacón es propio de un componente */
//{ isFetchingModal, dispatch }
const Upload = ({
  dispatch,
  isFetchingModal,
  error,
  listaCategorias,
  estadoCategorias,
  estadoProducto,
}) => {
  const [input, setInput] = useState("");
  const [nombreCategoria, setNombreCategoria] = useState("");

  const categoriaRef = useRef();
  useEffect(() => {
    obtenerCategorias(dispatch);
  }, []);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const seleccionarArchivo = (e) => {
    setInput(e.target.files[0].name);
    console.log(e.target.files[0].name);
  };
  const registro = (objeto) => {
    agregar_producto(dispatch, objeto);

    reset({
      nombre: "",
      descripcion: "",
      precio: "",
      validacion: "",
    });
  };
  useEffect(() => {
    if (categoriaRef.current.value) {
      setNombreCategoria(
        categoriaRef.current.options[categoriaRef.current.selectedIndex].text
      );
    }
  }, [listaCategorias]);
  return (
    <Container>
      <Row>
        <Col sm={12} md={8} className="mx-auto d-block">
          {estadoProducto && (
            <Alert variant={"success"}>Se guardo un producto!</Alert>
          )}
          <Form onSubmit={handleSubmit(registro)}>
            <Form.Group controlId="formBasicNombre">
              <Form.Label className="text-white">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribir Nombre"
                name="nombre"
                ref={register}
              />
              <Form.Text style={{ color: "#e8e8e8" }}>
                Nombre del producto.
              </Form.Text>
              {errors.nombre && (
                <Form.Text className="alert alert-danger">
                  {errors.nombre?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="text-white">Categorias</Form.Label>
              <Form.Control
                as="select"
                ref={(e) => {
                  register(e);
                  categoriaRef.current = e;
                }}
                name="categoria"
                onChange={(e) => {
                  setNombreCategoria(
                    e.target.options[e.target.selectedIndex].text
                  );
                }}
              >
                {estadoCategorias &&
                  listaCategorias.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.categoria}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicNombre">
              <Form.Control
                type="hidden"
                placeholder="Escribir Nombre"
                name="nombreCategoria"
                ref={register}
                value={nombreCategoria}
                onChange={() => {}}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text-white">Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                as="textarea"
                rows={3}
                ref={register}
              />
              {errors.descripcion && (
                <Form.Text className="alert alert-danger">
                  {errors.descripcion?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicNombre">
              <Form.Label className="text-white">Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                placeholder="Escribir Precio"
                ref={register}
                // value={values.precio || 0}
                // onChange={handler}
              />
              <Form.Text style={{ color: "#e8e8e8" }}>
                Precio del producto.
              </Form.Text>
              {errors.precio && (
                <Form.Text className="alert alert-danger">
                  {errors.precio?.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Foto Producto"
                onChange={(e) => seleccionarArchivo(e)}
                ref={register}
                name="archivo"
                className="text-white"
              />
            </Form.Group>

            <button
              type="submit"
              className="btn btn-success mx-auto d-block mt-3 mb-3 btn-block"
            >
              Guardar
            </button>
            <input
              type="hidden"
              value={input}
              name="validacion"
              ref={register}
            />
          </Form>

          {isFetchingModal ? <ModalBootstrap show={true} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetchingModal: state.posts.isFetchingModal,
    error: state.posts.error,
    listaCategorias: state.listaCategorias.data,
    estadoCategorias: state.listaCategorias.estado,
    estadoProducto: state.posts.estado,
  };
};
//isFetchingModal: state.posts.isFetching,

export default connect(mapStateToProps)(Upload);
