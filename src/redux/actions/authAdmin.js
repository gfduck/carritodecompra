import { auth } from "./../../firebase";
export const REQUEST = "REQUEST";
export const VALID = "VALID";
export const OUT = "OUT";

export const authAdmin = (dispatch) => {
  dispatch({ type: REQUEST });
  // var user = firebase.auth().currentUser;
  auth.onAuthStateChanged((user) => {
    // console.log(user);
    // var user = auth().currentUser;
    // auth.currentUser((user) => {
    if (user) {
      const user2 = auth.currentUser;
      // console.log("user2 es, ", user2);
      if (user2.email === "admin@demo.com") {
        dispatch({
          type: VALID,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: OUT,
          payload: {
            user,
          },
        });
      }
    } else {
      dispatch({
        type: OUT,
        payload: {
          user,
        },
      });
    }
  });
};
