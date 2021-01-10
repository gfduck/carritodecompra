import { firebase } from "./../../firebase";

export const PENDIENTE_CATEGORIA = "GUARDAR_CATEGORIA";
export const COMPLETADO_CATEGORIA = "COMPLETADO_CATEGORIA";
export const ERROR_CATEGORIA = "ERROR_CATEGORIA";
export const agregar_categoria = async (dispatch, objeto) => {
  dispatch({ type: PENDIENTE_CATEGORIA });

  try {
    const db = firebase.firestore();

    const data = await db.collection("categorias").add(objeto);

    dispatch({
      type: COMPLETADO_CATEGORIA,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: ERROR_CATEGORIA,
    });
  }
};
