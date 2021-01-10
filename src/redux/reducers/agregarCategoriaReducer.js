import {
  PENDIENTE_CATEGORIA,
  COMPLETADO_CATEGORIA,
  ERROR_CATEGORIA,
} from "../actions/gestionarCategorias";

const initialState = {
  isFetchingModalCategoria: false,
  error: false,
  data: {},
  estado: false,
};

function agregar_categoria(state = initialState, actions) {
  switch (actions.type) {
    case PENDIENTE_CATEGORIA:
      return {
        ...state,
        isFetchingModalCategoria: true,
        error: false,
        estado: false,
      };

    case COMPLETADO_CATEGORIA:
      return {
        ...state,
        isFetchingModalCategoria: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case ERROR_CATEGORIA:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default agregar_categoria;
