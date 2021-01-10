import {
  OBTENER_REQUEST,
  OBTENER_COMPLETADO,
  OBTENER_ERROR,
} from "./../actions/obtenerCategorias";

const initialState = {
  isFetchingCategoria: false,
  error: false,
  data: {},
  estado: false,
};

function obtenerCategoriasReducer(state = initialState, actions) {
  switch (actions.type) {
    case OBTENER_REQUEST:
      return {
        ...state,
        isFetchingCategoria: true,
        error: false,
        estado: false,
      };

    case OBTENER_COMPLETADO:
      return {
        ...state,
        isFetchingCategoria: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case OBTENER_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default obtenerCategoriasReducer;
