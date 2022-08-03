import request from "../index";
enum CartApi {
  addCart = "/cart/addCart",
  getCart = "/cart/getCart",
  removeCart = "/cart/removeCart",
  updateCart = "/cart/updateCart",

}
export function addCart(obj: any) {
  return request.post({
    url: CartApi.addCart,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}
export function getCart(obj: any) {
  return request.post({
    url: CartApi.getCart,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}

export function removeCart(obj: any) {
  return request.post({
    url: CartApi.removeCart,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}
export function updateCart(obj: any) {
  return request.post({
    url: CartApi.updateCart,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}
// export function checkInventory(obj: any) {
//   return request.post({
//     url: CartApi.checkInventory,
//     isShowLoading: false,
//     data: {shoppingcartProduct: obj.shoppingcartProduct},
//     headers: {
//       Authorization: obj.token,
//     },
//   });
// }