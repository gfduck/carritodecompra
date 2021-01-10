import {
  BUSCARPRODUCTOSPORCATEGORIA_REQUEST,
  BUSCARPRODUCTOSPORCATEGORIA_COMPLETADO,
  BUSCARPRODUCTOSPORCATEGORIA_ERROR,
} from "./../actions/buscarProductosPorCategoria";

const initialState = {
  isFetching: false,
  error: false,
  data: [],
  estado: false,
};

function obtenerProductosPorCategoria(state = initialState, actions) {
  switch (actions.type) {
    case BUSCARPRODUCTOSPORCATEGORIA_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        estado: false,
      };

    case BUSCARPRODUCTOSPORCATEGORIA_COMPLETADO:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case BUSCARPRODUCTOSPORCATEGORIA_ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default obtenerProductosPorCategoria;
