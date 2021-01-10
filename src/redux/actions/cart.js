export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_CART = "REMOVE_CART";

export const addToCart = (product) => {
  //   localStorage.removeItem("product");
  //   localStorage.removeItem("cart");
  let array;
  if (localStorage.getItem("cart") !== null) {
    array = JSON.parse(localStorage.getItem("cart"));
  } else {
    array = [];
  }

  // const resultado = array.includes(product);

  if (array.some((item) => item.id === product.id)) {
  } else {
    // const newProduct = product;
    const newArray = [...array, product];
    localStorage.setItem("cart", JSON.stringify(newArray));
  }
  return {
    type: "ADD_TO_CART",
    payload: {
      product,
      quantity: 1,
    },
  };
};

export const removeFromCart = (product) => {
  let array;
  if (localStorage.getItem("cart") !== null) {
    array = JSON.parse(localStorage.getItem("cart"));
  } else {
    array = [];
  }
  const newArray = array.filter((item) => item.id != product.id);
  localStorage.setItem("cart", JSON.stringify(newArray));

  return {
    type: "REMOVE_FROM_CART",
  };
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  return {
    type: "REMOVE_CART",
  };
};
