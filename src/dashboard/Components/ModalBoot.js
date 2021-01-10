import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import useCustomHookDelete from "./customHookDelete";

const ModalBoot = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.pass(false);
  };
  const [estadoDelete, handleDelete, error, isFetching] = useCustomHookDelete(
    null
  );
  useEffect(() => {
    if (estadoDelete === true) {
      setShow(false);
      if (props.coleccion === "categorias") {
        props.arrayFilter(props.idCategoria);
      } else if (props.coleccion === "productos") {
        props.arrayFilter(props.id);
      }
    }
  }, [estadoDelete]);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p>Hay un error</p>}
        {isFetching === false ? (
          props.coleccion === "categorias" ? (
            <p className="text-center">
              ¿Estas seguro que deseas eliminar esta categoria?
            </p>
          ) : (
            <p className="text-center">
              ¿Estas seguro que deseas eliminar este producto?
            </p>
          )
        ) : (
          <p>Cargando...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isFetching === false &&
          (props.coleccion === "categorias" ? (
            <Button
              variant="danger"
              onClick={(e) =>
                handleDelete(e, props.idCategoria, props.coleccion)
              }
              className="float-left"
            >
              Eliminar
            </Button>
          ) : (
            <>
              <Button
                variant="danger"
                onClick={(e) => handleDelete(e, props, props.coleccion)}
                className="float-left"
              >
                Eliminar
              </Button>

              <Button
                variant="success"
                onClick={handleClose}
                className="float-right"
              >
                Cancelar
              </Button>
            </>
          ))}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBoot;
