import { firebase } from "./../../firebase";
export const ACTUALIZAR_REQUEST = "ACTUALIZAR_REQUEST";
export const ACTUALIZAR_COMPLETADO = "ACTUALIZAR_COMPLETADO";
export const ACTUALIZAR_ERROR = "ACTUALIZAR_ERROR";

export const actualizar_categoria = async (dispatch, input, id) => {
  dispatch({ type: ACTUALIZAR_REQUEST });

  try {
    const db = firebase.firestore();
    await db.collection("categorias").doc(id).update({
      categoria: input,
    });

    dispatch({
      type: ACTUALIZAR_COMPLETADO,
      payload: {
        data: id,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ACTUALIZAR_ERROR,
    });
  }
};
