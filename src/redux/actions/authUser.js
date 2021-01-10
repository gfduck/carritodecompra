import { auth } from "./../../firebase";
export const USER_REQUEST = "USER_REQUEST";
export const USER_VALID = "USER_VALID";
export const USER_OUT = "USER_OUT";

export const authUser = (dispatch) => {
  dispatch({ type: USER_REQUEST });
  // var user = firebase.auth().currentUser;
  auth.onAuthStateChanged((user) => {
    // console.log(user);
    // var user = auth().currentUser;
    // auth.currentUser((user) => {
    if (user) {
      dispatch({
        type: USER_VALID,
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: USER_OUT,
        payload: {
          user,
        },
      });
    }
  });
};
