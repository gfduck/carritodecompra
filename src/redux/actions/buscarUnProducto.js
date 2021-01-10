import { firebase } from "./../../firebase";
export const BUSCARUNPRODUCTO_REQUEST = "BUSCARUNPRODUCTO_REQUEST";
export const BUSCARUNPRODUCTO_COMPLETADO = "BUSCARUNPRODUCTO_COMPLETADO";
export const BUSCARUNPRODUCTO_ERROR = "BUSCARUNPRODUCTO_ERROR";

export const buscarunproducto = async (dispatch, nombreProducto) => {
  dispatch({ type: BUSCARUNPRODUCTO_REQUEST });

  try {
    const db = firebase.firestore();

    console.log("nombre producto es ", nombreProducto);
    var data = await db
      .collection("productos")
      .where("nombre", "==", nombreProducto);
    const newArray = await data.get();
    const arrayData = newArray.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({
      type: BUSCARUNPRODUCTO_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("nombre producto es, ", nombreProducto);

    console.log("error2 es", error);
    dispatch({
      type: BUSCARUNPRODUCTO_ERROR,
    });
  }
};
