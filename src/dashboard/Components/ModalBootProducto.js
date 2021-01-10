import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import useCustomHookDelete from "./customHookDelete";

const ModalBootProducto = (props) => {
  const coleccion = "productos";
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const [estadoDelete, handleDelete, error] = useCustomHookDelete(null);
  useEffect(() => {
    if (estadoDelete === true) {
      setShow(false);
    }
  }, [estadoDelete]);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p>Hay un error</p>}

        <p className="text-center">
          ¿Estas seguro que deseas eliminar este producto?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={(e) => handleDelete(e, props, coleccion)}
          className="float-left"
        >
          Eliminar
        </Button>
        <Button variant="success" onClick={handleClose} className="float-right">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBootProducto;
