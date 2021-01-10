import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_CART } from "./../actions/cart";

const initialState = {
  contador: 0,
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        contador: state.contador + 1,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        contador: state.contador + 1,
      };
    case REMOVE_CART:
      return {
        ...state,
        contador: state.contador + 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
