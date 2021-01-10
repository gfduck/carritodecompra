import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { schemaActualizarProducto } from "../../Utils/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actualizar_producto } from "./../../redux/actions/actualizarProducto";
import { connect } from "react-redux";
import ModalBootstrap from "./../Components/ModalBootstrap";
import { useHistory } from "react-router-dom";
import { obtenerCategorias } from "./../../redux/actions/obtenerCategorias";

const EditarProducto = ({
  dispatch,
  isFetching,
  estado,
  estadoCategorias,
  listaCategorias,
}) => {
  let history = useHistory();
  // const { id } = useParams();
  let location = useLocation();
  // console.log("location es, ", location);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [validacionImagen, setValidacionImagen] = useState("");
  const [imageOriginal, setImageOriginal] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [estadoActual, setEstadoActual] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categoria, setCategoria] = useState("");
  const categoriaRef = useRef();
  useEffect(() => {
    obtenerCategorias(dispatch);
  }, []);

  const seleccionarArchivo = (e) => {
    if (e.target.files[0]?.name) {
      setValidacionImagen(e.target.files[0].name);
      console.log("nombre foto es, ", e.target.files[0].name);
    } else {
      setValidacionImagen(imageOriginal);
    }

    // guardarImagen(e.target.files[0]);
  };

  useEffect(() => {
    if (location.data) {
      setNombre(location.data.nombre);
      setImagen(location.data.imageUrl);
      setDescripcion(location.data.descripcion);
      setPrecio(location.data.precio);
      setValidacionImagen(location.data.nombreFoto);
      setImageOriginal(location.data.nombreFoto);
      setIdProducto(location.data.id);
      setCategoria(location.data.categoria);
    }
  }, [location]);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaActualizarProducto),
  });

  const actualizar = (objeto) => {
    // console.log("archivo length es, ", objeto.archivo.length);
    console.log("objeto es, ", objeto);
    actualizar_producto(dispatch, objeto);
  };

  useEffect(() => {
    setEstadoActual(estado);

    if (estadoActual === true) {
      history.push("/admin/productos");
      setEstadoActual(false);
    }
  }, [estado]);
  useEffect(() => {
    if (categoriaRef.current.value) {
      setNombreCategoria(
        categoriaRef.current.options[categoriaRef.current.selectedIndex].text
      );
    }
  }, [listaCategorias]);
  return (
    <>
      <Container>
        <Row>
          {location.data ? (
            <Col md={8} className="mx-auto d-block mt-5">
              <h3 className="text-center text-white mt-1 mb-3">
                Editar Producto
              </h3>

              <Form onSubmit={handleSubmit(actualizar)}>
                <Card style={{ width: "100%" }}>
                  <Form.Group>
                    <Form.File
                      label="Click para cambiar foto"
                      onChange={(e) => seleccionarArchivo(e)}
                      ref={register}
                      name="archivo"
                    />
                  </Form.Group>
                  <Card.Img variant="top" src={imagen} />
                  <Card.Body>
                    <Card.Title>
                      <Form.Group>
                        <Form.Label
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Nombre:
                        </Form.Label>
                        <Form.Control
                          name="nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          ref={register}
                        />
                        {errors.nombre && (
                          <Form.Text className="alert alert-danger">
                            {errors.nombre?.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Card.Title>
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
                          setCategoria(e.target.value);
                        }}
                        value={categoria}
                      >
                        {estadoCategorias &&
                          listaCategorias.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.categoria}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        Descripción:
                      </Form.Label>
                      <Form.Control
                        name="descripcion"
                        as="textarea"
                        rows={3}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        ref={register}
                      />
                      {errors.descripcion && (
                        <Form.Text className="alert alert-danger">
                          {errors.descripcion?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formBasicNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Escribir Nombre"
                        name="nombreCategoria"
                        ref={register}
                        value={nombreCategoria}
                        onChange={() => {}}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        Precio:
                      </Form.Label>
                      <Form.Control
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        ref={register}
                      />
                      {errors.precio && (
                        <Form.Text className="alert alert-danger">
                          {errors.precio?.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="mx-auto d-block"
                    >
                      Guardar
                    </Button>
                  </Card.Body>
                </Card>
                <input
                  type="hidden"
                  value={validacionImagen}
                  onChange={() => {}}
                  style={{ width: "100%" }}
                  ref={register}
                  name="nombreImagen"
                />
                <input
                  type="hidden"
                  value={imageOriginal}
                  onChange={() => {}}
                  style={{ width: "100%" }}
                  ref={register}
                  name="nombreImagenOriginal"
                />
                <input
                  type="hidden"
                  value={idProducto}
                  onChange={() => {}}
                  ref={register}
                  name="idProducto"
                />
              </Form>
            </Col>
          ) : (
            <div className="text-center text-dark mt-3">
              No se encontro ningun producto
            </div>
          )}
        </Row>
      </Container>

      {isFetching && <ModalBootstrap show={true} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.actualizarProducto.isFetching,
    estado: state.actualizarProducto.estado,
    listaCategorias: state.listaCategorias.data,
    estadoCategorias: state.listaCategorias.estado,
  };
};
export default connect(mapStateToProps)(EditarProducto);
