import { useState } from "react";
import { firebase, storage } from "./../../firebase";

const deleteImage = async (objeto) => {
  let estadoDelete = false;
  try {
    const nombreImagenOriginal = objeto.nombreFoto;

    await storage.ref().child(`productos/${nombreImagenOriginal}`).delete();

    estadoDelete = true;
  } catch (error) {
    console.log("error en borrar foto, ", error);
    estadoDelete = false;
  }
  return { estadoDelete };
};
const eliminar = async (id) => {
  try {
    const db = firebase.firestore();
    await db.collection("productos").doc(id).delete();

    // const arrayFiltrado = tareas.filter((item) => item.id !== id);
  } catch (error) {
    console.log(error);
  }
};
const useCustomHookDelete = () => {
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const handleDelete = async (e, props, coleccion) => {
    try {
      setIsFetching(true);
      const db = firebase.firestore();
      if (coleccion === "productos") {
        const { estadoDelete } = await deleteImage(props);
        if (estadoDelete) {
          await eliminar(props.id);
        }
      } else {
        await db.collection(coleccion).doc(props).delete();
      }
      // const arrayFiltrado = tareas.filter((item) => item.id !== id);
      setIsFetching(false);
      setState(true);
    } catch (error) {
      setIsFetching(false);
      console.log("error en custom Hook es", error);
      setState(false);
      setError(true);
    }
  };

  return [state, handleDelete, error, isFetching];
};

export default useCustomHookDelete;
