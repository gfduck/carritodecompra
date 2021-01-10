import { SUCCESS, REQUEST, ERROR } from "./../actions/gestionarProductos";

const initialState = {
  isFetchingModal: false,
  error: false,
  data: {},
  estado: false,
};

function post(state = initialState, actions) {
  switch (actions.type) {
    case REQUEST:
      return {
        ...state,
        isFetchingModal: true,
        error: false,
        estado: false,
      };

    case SUCCESS:
      return {
        ...state,
        isFetchingModal: false,
        data: actions.payload.data,
        error: false,
        estado: true,
      };

    case ERROR:
      return {
        ...state,
        error: true,
        estado: false,
      };

    default:
      return state;
  }
}

export default post;
