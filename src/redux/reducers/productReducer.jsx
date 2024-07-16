import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  productList: [],
  selectedItem: null
};

// function productReducer(state = initialState, action) {
//   let { type, payload } = action;
//   switch (type) {
//     case "GET_PRODUCT_SUCCESS":
//       return { ...state, productList: payload.data };
//     case "GET_SINGLE_PRODUCT_SUCCESS":
//       return { ...state, selectedItem: payload.data };
//     default:
//       return state;
//   }
// }
// export default productReducer;

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    getAllProducets(state,action){
      state.productList= action.payload.data
    },
    getSingleProuduct(state,action){
      state.selectedItem = action.payload.data
    }
  }
})

export default productSlice.reducer

export const productAcions = productSlice.actions
console.log("dd",productSlice)