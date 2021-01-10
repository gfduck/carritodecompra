import React from "react";
import Imagen from "./../Images/loading.gif";

const Loading = () => {
  return (
    <img
      src={Imagen}
      className="img-fluid mx-auto d-block"
      style={{ width: "150px" }}
    />
  );
};

export default Loading;
