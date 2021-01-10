import React from "react";
import Upload from "../Components/Upload";

const NuevoProducto = () => {
  return (
    <>
      <h1 className="text-center mt-3" style={{ color: "#eeeeee" }}>
        Nuevo Producto
      </h1>
      <hr style={{ background: "#000000", height: "5px" }} />
      <br />

      <Upload />
    </>
  );
};

export default NuevoProducto;
