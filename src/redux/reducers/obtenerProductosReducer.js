import {
  LISTA_PRODUCTOS_REQUEST,
  LISTA_PRODUCTOS_COMPLETADO,
  LISTA_PRODUCTOS_ERROR,
} from "./../actions/obtenerProductos";

const initialState = {
  isFetching: false,
  error: false,
  data: {},
  estado: false,
};

function obtenerCategoriasProductos(state = initialState, actions) {
  switch (actions.type) {
    case LISTA_PRODUCTOS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case LISTA_PRODUCTOS_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case LISTA_PRODUCTOS_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default obtenerCategoriasProductos;
