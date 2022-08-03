import request from "../index";
enum OrderApi {
  addOrder = "/order/addOrder",
  getOrder = "/order/getOrder",
  checkInventory="/order/checkInventory",
  insertOrderAfter="order/insertOrderAfter",
  uploadImgdata  = "order/uploadImgdata",
  shouhuo = "order/shouhuo"
}
export function addOrder(obj:any) {
  return request.post({
    url: OrderApi.addOrder,
    data:{
      addressid:obj.addressid,
      state:obj.state,
      phonenumber:obj.phonenumber,
      orderprice:obj.orderprice,
      shoppingcartProduct:obj.shoppingcartProduct,
    },
    headers: {
      Authorization: obj.token,
    },

    isShowLoading: false
  });
}
export function shouhuo(obj:any) {
  return request.post({
    url: OrderApi.shouhuo,
    data:{
      phonenumber:obj.phonenumber,
      orderid:obj.orderid
    },
    headers: {
      Authorization: obj.token,
    },

    isShowLoading: false
  });
}
export function getOrder(obj:any) {
  return request.post({
    url: OrderApi.getOrder,
    data:{
      phonenumber:obj.phonenumber,
    },
    headers: {
      Authorization: obj.token,
    },

    isShowLoading: false
  });
}
export function checkInventory(obj: any) {
  return request.post({
    url: OrderApi.checkInventory,
    isShowLoading: false,
    data: {shoppingcartProduct: obj.shoppingcartProduct},
    headers: {
      Authorization: obj.token,
    },
  });
}
export function insertOrderAfter(obj: any) {
  return request.post({
    url: OrderApi.insertOrderAfter,
    isShowLoading: false,
    data: {orderAfter: obj.orderAfter,state:obj.state,orderid:obj.orderid},
    headers: {
      Authorization: obj.token,
    },
  });
}
export function uploadImgdata(obj: any) {
  return request.post({
    url: OrderApi.uploadImgdata,
    isShowLoading: false,
    data: obj.formdata,
    headers: {
      'Authorization': obj.token,
      'Content-Type':'multipart/form-data'
    },
  });
}