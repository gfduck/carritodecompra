import { firebase } from "./../../firebase";
export const BUSCARPRODUCTOSPORCATEGORIA_REQUEST =
  "BUSCARPRODUCTOSPORCATEGORIA_REQUEST";
export const BUSCARPRODUCTOSPORCATEGORIA_COMPLETADO =
  "BUSCARPRODUCTOSPORCATEGORIA_COMPLETADO";
export const BUSCARPRODUCTOSPORCATEGORIA_ERROR =
  "BUSCARPRODUCTOSPORCATEGORIA_ERROR";

export const buscarProductosPorCategoria = async (dispatch, idCategoria) => {
  dispatch({ type: BUSCARPRODUCTOSPORCATEGORIA_REQUEST });

  try {
    const db = firebase.firestore();

    var data = await db
      .collection("productos")
      .where("categoria", "==", idCategoria);
    const newArray = await data.get();
    const arrayData = newArray.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: BUSCARPRODUCTOSPORCATEGORIA_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: BUSCARPRODUCTOSPORCATEGORIA_ERROR,
    });
  }
};
