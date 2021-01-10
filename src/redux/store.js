import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers"; // hace referencia al file index.js
import thunk from "redux-thunk";
//, applyMiddleware(thunk)

// import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./reducers"; // hace referencia al file index.js
// import thunk from "redux-thunk";
// const store = createStore(rootReducer, applyMiddleware(thunk));
// export default store;

// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
