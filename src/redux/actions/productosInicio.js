import { firebase } from "./../../firebase";
export const PRODUCTOSINICIO_REQUEST = "PRODUCTOSINICIO_REQUEST";
export const PRODUCTOSINICIO_COMPLETADO = "PRODUCTOSINICIO_COMPLETADO";
export const PRODUCTOSINICIO_ERROR = "PRODUCTOSINICIO_ERROR";

export const productosInicio = async (dispatch) => {
  dispatch({ type: PRODUCTOSINICIO_REQUEST });

  try {
    const db = firebase.firestore();

    var data = await db.collection("productos").limit(12);
    const newArray = await data.get();
    const arrayData = newArray.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: PRODUCTOSINICIO_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: PRODUCTOSINICIO_ERROR,
    });
  }
};
