import {
  PRODUCTOSINICIO_REQUEST,
  PRODUCTOSINICIO_COMPLETADO,
  PRODUCTOSINICIO_ERROR,
} from "./../actions/productosInicio";

const initialState = {
  isFetching: false,
  error: false,
  data: [],
  estado: false,
};

function productosInicioReducer(state = initialState, actions) {
  switch (actions.type) {
    case PRODUCTOSINICIO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case PRODUCTOSINICIO_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case PRODUCTOSINICIO_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default productosInicioReducer;
