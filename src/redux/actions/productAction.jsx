import { productAcions } from "../reducers/productSlice";

// function getProducts(searchQuery) {
//   return async (dispatch) => {
//     let url = `https://my-json-server.typicode.com/ohDASEUL/router-hnm/products?q=${searchQuery}`;
//     let response = await fetch(url);
//     let data = await response.json();
//     dispatch(productAcions.getAllProducets({data}));
//   };
// }

function getProductDetail(id) {
  return async (dispatch) => {
    let url = `https://my-json-server.typicode.com/ohDASEUL/router-hnm/products?q=${id}`;
    let response = await fetch(url);
    let data = await response.json();
    dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: { data } });
  };
}

export const productAction = { getProductDetail };
