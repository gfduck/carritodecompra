import { firebase, storage } from "./../../firebase";
const shortid = require("shortid");
export const REQUEST = "REQUEST2";
export const SUCCESS = "SUCCESS2";
export const ERROR = "ERROR2";

const guardarImagen = async (imagenEditada) => {
  let imagenUrl = "ImagenUrl";
  let nuevoNombre = "";
  try {
    const id = await shortid.generate();
    nuevoNombre = id + imagenEditada.name;
    const imagenRef = await storage.ref().child("productos").child(nuevoNombre);
    await imagenRef.put(imagenEditada);
    imagenUrl = await imagenRef.getDownloadURL();
    console.log("image Ref es, ");
  } catch (error) {
    imagenUrl = "imagenUrl";
  }
  return { imagenUrl, nuevoNombre };
};
export const agregar_producto = async (dispatch, objeto) => {
  dispatch({ type: REQUEST });
  try {
    const db = firebase.firestore();

    const { imagenUrl, nuevoNombre } = await guardarImagen(objeto.archivo[0]);

    delete objeto.archivo;
    delete objeto.validacion;
    const objetoNuevo = {
      ...objeto,
      imageUrl: imagenUrl,
      nombreFoto: nuevoNombre,
    };
    const data = await db.collection("productos").add(objetoNuevo);

    dispatch({
      type: SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.log("error es", error);
  }
};
