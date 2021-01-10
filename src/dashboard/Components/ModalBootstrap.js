import React from "react";
import { Modal } from "react-bootstrap";

const ModalBootstrap = ({ show }) => {
  return (
    <Modal show={show} backdrop="static" animation={false}>
      <Modal.Body>Cargando...</Modal.Body>
    </Modal>
  );
};

export default ModalBootstrap;
