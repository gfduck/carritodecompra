import { USER_REQUEST, USER_VALID, USER_OUT } from "./../actions/authUser";

const initialState = {
  isFetching: true,
  data: null,
  estado: false,
  accion: false,
};

function validar_user(state = initialState, actions) {
  switch (actions.type) {
    case USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        data: null,
      };

    case USER_VALID:
      return {
        ...state,
        isFetching: false,
        data: actions.payload.user,
        estado: true,
        accion: true,
      };

    case USER_OUT:
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

export default validar_user;
