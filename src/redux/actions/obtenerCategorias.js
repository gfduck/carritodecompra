import { firebase } from "./../../firebase";

export const OBTENER_REQUEST = "OBTENER_REQUEST";
export const OBTENER_COMPLETADO = "OBTENER_COMPLETADO";
export const OBTENER_ERROR = "OBTENER_ERROR";

export const obtenerCategorias = async (dispatch) => {
  dispatch({ type: OBTENER_REQUEST });

  try {
    const db = firebase.firestore();

    const data = await db.collection("categorias").get();

    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch({
      type: OBTENER_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: OBTENER_ERROR,
    });
  }
};
