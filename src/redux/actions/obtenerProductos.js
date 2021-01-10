import { firebase } from "./../../firebase";

export const LISTA_PRODUCTOS_REQUEST = "LISTA_PRODUCTOS_REQUEST";
export const LISTA_PRODUCTOS_COMPLETADO = "LISTA_PRODUCTOS_COMPLETADO";
export const LISTA_PRODUCTOS_ERROR = "LISTA_PRODUCTOS_ERROR";

export const obtenerProductos = async (dispatch) => {
  dispatch({ type: LISTA_PRODUCTOS_REQUEST });

  try {
    const db = firebase.firestore();

    const data = await db.collection("productos").get();

    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch({
      type: LISTA_PRODUCTOS_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: LISTA_PRODUCTOS_ERROR,
    });
  }
};
