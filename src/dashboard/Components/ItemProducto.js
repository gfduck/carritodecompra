import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ModalBoot from "./ModalBoot";

const ItemProducto = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [idProducto, setIdProducto] = useState("");
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={props.imageUrl}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{props.nombre}</Card.Title>
          <Card.Text>{props.descripcion}</Card.Text>

          <Button
            variant="danger"
            className="mt-4 mr-2"
            onClick={() => {
              setIdProducto(props.idProduct);
              setShowModal(true);
            }}
          >
            Eliminar
          </Button>
          <NavLink
            to={{
              pathname: `/admin/productos/editarproducto/${props.id}`,
              data: { ...props },
            }}
          >
            <Button variant="success" className="mt-4">
              Editar
            </Button>
          </NavLink>
        </Card.Body>
      </Card>

      {showModal && (
        <ModalBoot
          show={true}
          pass={setShowModal}
          idCategoria={idProducto}
          arrayFilter={props.arrayFilter}
          coleccion={"productos"}
          {...props}
        />
      )}
    </>
  );
};

export default ItemProducto;
