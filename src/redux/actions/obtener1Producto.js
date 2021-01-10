export const UNPRODUCTO_REQUEST = "UNPRODUCTO_REQUEST";
export const UNPRODUCTO_COMPLETADO = "UNPRODUCTO_COMPLETADO";
export const UNPRODUCTO_ERROR = "UNPRODUCTO_ERROR";

export const obtenerUnProducto = async (dispatch) => {
  dispatch({ type: UNPRODUCTO_REQUEST });

  try {
    const db = firebase.firestore();

    const data = await db.collection("productos").get();

    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch({
      type: UNPRODUCTO_COMPLETADO,
      payload: {
        data: arrayData,
      },
    });
  } catch (error) {
    console.log("error es", error);
    dispatch({
      type: UNPRODUCTO_ERROR,
    });
  }
};
