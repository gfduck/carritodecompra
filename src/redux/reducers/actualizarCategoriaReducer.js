import {
  ACTUALIZAR_REQUEST,
  ACTUALIZAR_COMPLETADO,
  ACTUALIZAR_ERROR,
} from "../actions/actualizarCategoria";

const initialState = {
  isFetching: false,
  error: false,
  data: {},
  estado: false,
};

function actualizarCategoria(state = initialState, actions) {
  switch (actions.type) {
    case ACTUALIZAR_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case ACTUALIZAR_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case ACTUALIZAR_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default actualizarCategoria;
