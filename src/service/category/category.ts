import request from "../index";
enum CategoryApi {
  AllCategory = "/category/getAllCategory",
}
export function getAllCategory() {
  return request.get({
    url: CategoryApi.AllCategory,
    // isShowLoading: false
  });
}
