import React from "react";
import Menu from "./../Layouts/Menu";
import Footer from "./../Layouts/Footer";
import Carrito from "./../Components/Carrito";
import { Button } from "react-bootstrap";
import MercadoPago from "./../Images/mercadopago.png";
const Pagar = () => {
  return (
    <>
      <Menu />
      <br />
      <div
        className="text-white"
        style={{ fontSize: "20px", minHeight: "100vh" }}
      >
        <Carrito botonPagar={false} />

        <img
          src={MercadoPago}
          className="mx-auto d-block img-fluid mt-3 mb-3"
        />
      </div>
      <Footer />
    </>
  );
};

export default Pagar;
