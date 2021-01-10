import {
  ACTUALIZAR_PRODUCTO_REQUEST,
  ACTUALIZAR_PRODUCTO_COMPLETADO,
  ACTUALIZAR_PRODUCTO_ERROR,
  ACTUALIZAR_PRODUCTO_COMPLETADO_ESTADO,
} from "../actions/actualizarProducto";

const initialState = {
  isFetching: false,
  error: false,
  estado: false,
};

function actualizarProducto(state = initialState, actions) {
  switch (actions.type) {
    case ACTUALIZAR_PRODUCTO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case ACTUALIZAR_PRODUCTO_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        error: false,
        estado: true,
      };

    case ACTUALIZAR_PRODUCTO_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };
    case ACTUALIZAR_PRODUCTO_COMPLETADO_ESTADO:
      return {
        ...state,
        estado: false,
      };
    default:
      return state;
  }
}

export default actualizarProducto;
