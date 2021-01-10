import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { buscarunproducto } from "./../redux/actions/buscarUnProducto";
import Loading from "./../Components/Loading";
import { addToCart } from "../redux/actions/cart";

const Producto = ({ dispatch, isFetching, producto }) => {
  const { categoria, nombreProducto } = useParams();
  const [item, setItem] = useState({});
  let location = useLocation();

  useEffect(() => {
    if (location.item) {
      setItem(location.item);
    } else {
      buscarunproducto(dispatch, nombreProducto);
    }
  }, []);

  useEffect(() => {
    if (location.item) {
      setItem(location.item);
    } else {
      setItem(producto[0]);
    }
  }, [producto]);
  return (
    <>
      {isFetching && <Loading />}
      {item?.nombre && (
        <Jumbotron
          style={{
            background: "#ebebeb",
            paddingTop: "20px",
            paddingBottom: "5px",
          }}
        >
          <h1 className="text-center" data-testid="producto">
            {item.nombre}
          </h1>
          <img
            alt="fotoProducto"
            src={item.imageUrl}
            className="img-fluid mx-auto d-block"
            style={{ width: "20vw" }}
          />
          <p className="text-center mt-2 mb-2">{item.descripcion}</p>
          <p>
            <Button
              className="mx-auto d-block"
              variant="primary"
              onClick={() =>
                dispatch(
                  addToCart({
                    ...item,
                    subtotal: item.precio,
                    cantidad: 1,
                  })
                )
              }
            >
              Agregar
            </Button>
          </p>
        </Jumbotron>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    producto: state.buscarUnProducto.data,
    isFetching: state.buscarUnProducto.isFetching,
  };
};
export default connect(mapStateToProps)(Producto);
