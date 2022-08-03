import request from "../index";

enum UserApi {
  getUserInfo = "/user/accountLogin",
  phoneLogin = "/user/phoneLogin",
  getcode = "/user/getcode",
  addAddress = "/user/addAddress",
  updateAddress="/user/updateAddress",
  deleteAddress="/user/deleteAddress",
  uploadUserImg="/user/uploadUserImg",
  updateUserInfo="/user/updateUserInfo"
}
export function getUser(obj: any) {
  return request.post({
    url: UserApi.getUserInfo,
    isShowLoading: false,
    data: obj,
  });
}
export function phoneLogin(obj: any) {
  return request.post({
    url: UserApi.phoneLogin,
    isShowLoading: false,
    data: obj,
  });
}
export function getcode(obj: any) {
  return request.post({
    url: UserApi.getcode,
    isShowLoading: false,
    data: obj,
  });
}
export function addAddress(obj: any) {
  return request.post({
    url: UserApi.addAddress,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}
export function updateAddress(obj: any) {
  return request.post({
    url: UserApi.updateAddress,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
    },
  });
}export function deleteAddress(obj: any) {
  return request.post({
    url: UserApi.deleteAddress,
    isShowLoading: false,
    data: obj,
    headers: {
      Authorization: obj.token,
     
    },
  });
}
export function uploadUserImg(obj: any) {
  console.log('obj.fromdata',obj.formdata)
  return request.post({
    url: UserApi.uploadUserImg,
    isShowLoading: false,
    data: obj.formdata,
    //data: {...obj.fromdata, unused: 0 },
    headers: {
      'Authorization': obj.token,
      'Content-Type':'multipart/form-data'
    }
  });
}
export function updateUserInfo(obj: any) {
  return request.post({
    url: UserApi.updateUserInfo,
    isShowLoading: false,
    data: obj.userInfo,
    headers: {
      'Authorization': obj.token,
    }
  });
}