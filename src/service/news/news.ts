import request from "../index";
enum NewsApi {
  News = "/news/getNews",
  searchNew = "/news/searchNew"
}
export function getNews() {
  return request.get({
    url: NewsApi.News,
    // isShowLoading: false
  });
}
export function searchNew(obj:any) {
  return request.get({
    url: NewsApi.searchNew,
    isShowLoading: false,
    params:{
      year:obj.year,
      month:obj.month
    }
  });
}