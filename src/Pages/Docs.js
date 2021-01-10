import React from "react";
import Menu from "./../Layouts/Menu";
import Footer from "./../Layouts/Footer";

const Docs = () => {
  return (
    <>
      <Menu />
      <br />
      <div
        className="text-white"
        style={{ fontSize: "20px", minHeight: "100vh" }}
      >
        <h1 className="text-center">Duckwitz Gerardo Federico</h1>
        <br />
        <p className="text-center ">
          Este sitio web esta hecho con la libreria React con lenguaje
          Javascript.
        </p>
        <p className="text-center ">
          El backend esta hecho con los servicios de Firebase de Google
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Docs;
