import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "./../Layouts/Menu";
import Footer from "./../Layouts/Footer";
import Carrito from "./../Components/Carrito";
const Grid = ({ componente }) => {
  return (
    <>
      <Menu />
      <Container fluid style={{ paddingBottom: "0px", minHeight: "100vh" }}>
        <Row>
          <Col sm={7} md={8} lg={8}>
            {componente}
          </Col>
          <Col sm={5} md={4} lg={4}>
            <Carrito botonPagar={true} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Grid;
