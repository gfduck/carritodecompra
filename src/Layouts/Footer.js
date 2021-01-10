import React from "react";
import { Jumbotron } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Jumbotron
        style={{ background: "#515151", margin: "0px", borderRadius: "0" }}
      >
        <h1 className="text-center text-white">Duckwitz Gerardo Federico</h1>
        <p className="text-center text-white">Rio Negro, Argentina</p>
      </Jumbotron>
    </footer>
  );
};

export default Footer;
