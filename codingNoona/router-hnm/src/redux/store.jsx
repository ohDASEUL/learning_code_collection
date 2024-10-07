import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducers/authenticateReducer";
import productReducer from "./reducers/productSlice";


// let store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    product: productReducer,
  },
});

export default store;
