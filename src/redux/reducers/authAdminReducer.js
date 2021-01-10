import { REQUEST, VALID, OUT } from "./../actions/authAdmin";

const initialState = {
  isFetching: true,
  data: null,
  estado: false,
  accion: false,
};

function validar(state = initialState, actions) {
  switch (actions.type) {
    case REQUEST:
      return {
        ...state,
        isFetching: true,
        data: null,
      };

    case VALID:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.user,
        estado: true,
        accion: true,
      };

    case OUT:
      return {
        ...state,
        isFetching: false,
        data: null,
        estado: false,
        accion: true,
      };

    default:
      return state;
  }
}

export default validar;
