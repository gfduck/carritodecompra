import React, { useState, useEffect } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { buscarProductosPorCategoria } from "../redux/actions/buscarProductosPorCategoria";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addToCart } from "../redux/actions/cart";
import { firebase } from "../firebase";
import Loading from "./../Components/Loading";
const Productos = ({
  dispatch,
  listaProductos,
  estadoProductos,
  isFetching,
}) => {
  const [lista, setLista] = useState([]);
  const [idCategoria, setIdCategoria] = useState({});
  const { categoria } = useParams();
  let location = useLocation();

  useEffect(() => {
    setLista(listaProductos);
  }, [listaProductos]);

  useEffect(() => {
    setLista([]);
    const buscar = async () => {
      let arrayData;
      try {
        const db = await firebase.firestore();
        var data = await db
          .collection("categorias")
          .where("categoria", "==", categoria);
        const newArray = await data.get();
        arrayData = await newArray.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIdCategoria(arrayData[0].id);
      } catch (error) {
        console.log("error", error);
      }
      return arrayData;
    };

    buscar();
  }, [categoria]);

  useEffect(() => {
    buscarProductosPorCategoria(dispatch, idCategoria);
  }, [idCategoria]);
  // useEffect(() => {
  //   if (location.data) {
  //     buscarProductosPorCategoria(dispatch, idCategoria);
  //   }
  // }, [location]);

  return (
    <Container>
      <h1 className="text-center text-white"> {categoria}</h1>
      <Row>
        {isFetching && <Loading />}
        {estadoProductos &&
          lista.length > 0 &&
          lista.map((item) => (
            <Col md={4} key={item.id} className="mt-3 mb-3">
              <Card>
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <Card.Text>
                    <b>$ {item.precio}</b>
                  </Card.Text>
                  <Button
                    className="float-left"
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
                  <NavLink
                    to={{
                      pathname: `/categoria/${categoria}/${item.nombre}`,
                      item: { ...item },
                    }}
                  >
                    <Button variant="warning" className="mt-1 float-right">
                      Ver más
                    </Button>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    listaProductos: state.obtenerProductosPorCategoria.data,
    estadoProductos: state.obtenerProductosPorCategoria.estado,
    isFetching: state.obtenerProductosPorCategoria.isFetching,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (product) => {
//       dispatch(addToCart(product));
//     },
//     buscarProductosPorCategoria: (dispatch) =>{
//       dispatch(buscarProductosPorCategoria(dispatch)},

// };
export default connect(mapStateToProps)(Productos);
