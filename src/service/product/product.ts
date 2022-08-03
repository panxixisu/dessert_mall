import request from "../index";
enum ProductApi {
  AllProduct = "/product/getAllShowProduct",
}
export function getAllProduct() {
  return request.get({
    url: ProductApi.AllProduct,
    // isShowLoading: false
  });
}
