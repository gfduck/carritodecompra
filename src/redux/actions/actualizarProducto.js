import { firebase, storage } from "./../../firebase";
const shortid = require("shortid");
export const ACTUALIZAR_PRODUCTO_REQUEST = "ACTUALIZAR_PRODUCTO_REQUEST";
export const ACTUALIZAR_PRODUCTO_COMPLETADO = "ACTUALIZAR_PRODUCTO_COMPLETADO";
export const ACTUALIZAR_PRODUCTO_ERROR = "ACTUALIZAR_PRODUCTO_ERROR";
export const ACTUALIZAR_PRODUCTO_COMPLETADO_ESTADO =
  "ACTUALIZAR_PRODUCTO_COMPLETADO_ESTADO";

const deleteImage = async (objeto) => {
  let estadoDelete = false;
  try {
    const nombreImagenOriginal = objeto.nombreImagenOriginal;

    const deleteFile = await storage
      .ref()
      .child(`productos/${nombreImagenOriginal}`)
      .delete();

    estadoDelete = true;
  } catch (error) {
    console.log("error en borrar foto, ", error);
    estadoDelete = false;
  }
  return { estadoDelete };
};

const uploadImage = async (archivo) => {
  let estadoUpload = false;
  let imagenUrl;
  let nuevoNombre;
  try {
    const id = await shortid.generate();
    nuevoNombre = id + archivo.name;
    const imagenRef = await storage.ref().child("productos").child(nuevoNombre);
    await imagenRef.put(archivo);
    imagenUrl = await imagenRef.getDownloadURL();
    estadoUpload = true;
  } catch (error) {
    imagenUrl = "imagenUrl";
    estadoUpload = false;
  }

  return { imagenUrl, nuevoNombre, estadoUpload };
};

export const actualizar_producto = async (dispatch, objeto) => {
  dispatch({ type: ACTUALIZAR_PRODUCTO_REQUEST });

  try {
    const { idProducto, archivo, ...nuevoObjeto } = objeto;
    let objetoUpload;
    if (archivo.length > 0) {
      //existe archivo
      const { estadoDelete } = await deleteImage(objeto);
      if (estadoDelete) {
        const { estadoUpload, imagenUrl, nuevoNombre } = await uploadImage(
          archivo[0]
        );
        objetoUpload = {
          ...nuevoObjeto,
          nombreFoto: nuevoNombre,
          imageUrl: imagenUrl,
          nombreImagenOriginal: nuevoNombre,
        };
      } else {
        objetoUpload = nuevoObjeto;
      }
    } else {
      objetoUpload = nuevoObjeto;
    }

    const db = firebase.firestore();
    await db.collection("productos").doc(idProducto).update(objetoUpload);
    dispatch({ type: ACTUALIZAR_PRODUCTO_COMPLETADO });
    dispatch({ type: ACTUALIZAR_PRODUCTO_COMPLETADO_ESTADO });
  } catch (error) {
    console.log(error);
    dispatch({ type: ACTUALIZAR_PRODUCTO_ERROR });
  }
};
