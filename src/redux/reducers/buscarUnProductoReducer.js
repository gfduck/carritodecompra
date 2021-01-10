import {
  BUSCARUNPRODUCTO_REQUEST,
  BUSCARUNPRODUCTO_COMPLETADO,
  BUSCARUNPRODUCTO_ERROR,
} from "./../actions/buscarUnProducto";

const initialState = {
  isFetching: false,
  error: false,
  data: [],
  estado: false,
};

function buscar_un_producto(state = initialState, actions) {
  switch (actions.type) {
    case BUSCARUNPRODUCTO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case BUSCARUNPRODUCTO_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case BUSCARUNPRODUCTO_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default buscar_un_producto;
